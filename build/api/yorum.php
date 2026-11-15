<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const MODEL = 'openai/gpt-oss-20b';
const CACHE_TTL = 604800;
const MAX_BODY = 8192;
const PROMPT_VERSION = 'istem-6';
/** IP başına saatlik Groq isteği sınırı; önbellek vuruşları sayılmaz (sayım önbellek denetiminden sonradır). */
const RATE_LIMIT_PER_HOUR = 120;
const RATE_WINDOW_SECONDS = 3600;
const METRICS = ['sunlight_pct', 'earth_visibility_pct', 'dark_hours'];

function cevap(int $durum, array $icerik): never
{
    http_response_code($durum);
    echo json_encode($icerik, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function sayisalMi(mixed $deger, float $alt, float $ust): bool
{
    return (is_int($deger) || is_float($deger)) && is_finite((float)$deger)
        && $deger >= $alt && $deger <= $ust;
}

/**
 * Her ölçüt için en iyi değeri paylaşan sahalar. `adet` istemcinin bildirdiği gerçek eşit saha sayısıyla
 * gönderilen kümedeki sayının büyüğüdür (istemci listeyi kırpar); `idler` kimlik sırasıyla ilk en çok 2 saha.
 */
function liderler(array $parseller, array $esit): array
{
    $yonler = ['sunlight_pct' => 'max', 'earth_visibility_pct' => 'max', 'dark_hours' => 'min'];
    $sonuc = [];
    foreach ($yonler as $alan => $yon) {
        $degerler = array_column($parseller, $alan);
        $uc = $yon === 'max' ? max($degerler) : min($degerler);
        $kimlikler = [];
        foreach ($parseller as $parsel) {
            if ((float)$parsel[$alan] === (float)$uc) $kimlikler[] = $parsel['id'];
        }
        sort($kimlikler, SORT_STRING);
        $sonuc[$alan] = [
            'deger' => $uc,
            'adet' => max(count($kimlikler), (int)($esit[$alan] ?? 0)),
            'idler' => array_slice($kimlikler, 0, 2),
        ];
    }
    return $sonuc;
}

function kimlikGecerMi(string $metin, string $id): bool
{
    return preg_match('/(?<![A-Za-z0-9])' . preg_quote($id, '/') . '(?![A-Za-z0-9])/', $metin) === 1;
}

/** Yorum yalnız bildirilen kimlikleri anar, hepsini anar ve bir cümlede 3'ten fazla kimlik yazmaz. */
function liderKimlikleriUygunMu(string $yorum, array $tumKimlikler, array $lider): bool
{
    $izinli = [];
    foreach ($lider as $l) {
        foreach ($l['idler'] as $id) {
            $izinli[$id] = true;
            if (!kimlikGecerMi($yorum, $id)) return false;
        }
    }
    foreach ($tumKimlikler as $id) {
        if (!isset($izinli[$id]) && kimlikGecerMi($yorum, $id)) return false;
    }
    foreach (preg_split('/(?<=[.!?])\s+/u', $yorum) ?: [] as $cumle) {
        $say = 0;
        foreach ($tumKimlikler as $id) if (kimlikGecerMi($cumle, $id)) $say++;
        if ($say > 3) return false;
    }
    return true;
}

/** Yorumdaki her sayı, girdi değerlerinin gösterim biçimlerinden (tamsayı, 1 ve 2 ondalık) biri olmalı. */
function sayilarGirdidenMi(string $metin, array $parseller, array $lider): bool
{
    $izinli = [];
    foreach ($lider as $l) {
        $izinli[(string)$l['adet']] = true;
        if ($l['adet'] >= 3) $izinli[(string)($l['adet'] - 2)] = true;
    }
    foreach ($parseller as $parsel) {
        foreach (['sunlight_pct', 'earth_visibility_pct', 'dark_hours'] as $alan) {
            $v = (float)$parsel[$alan];
            foreach ([0, 1, 2] as $basamak) $izinli[number_format(round($v, $basamak), $basamak, '.', '')] = true;
            $izinli[rtrim(rtrim(number_format($v, 4, '.', ''), '0'), '.')] = true;
            $izinli[(string)(int)round($v)] = true;
        }
    }
    preg_match_all('/\d+(?:[.,]\d+)?/', $metin, $bulunan);
    foreach ($bulunan[0] as $sayi) {
        $duz = str_replace(',', '.', $sayi);
        $sade = str_contains($duz, '.') ? rtrim(rtrim($duz, '0'), '.') : $duz;
        if (!isset($izinli[$duz]) && !isset($izinli[$sade])) return false;
    }
    return true;
}

function adlar(array $l, string $dil): string
{
    [$a, $b] = [$l['idler'][0], $l['idler'][1] ?? ''];
    if ($l['adet'] <= 1) return $a;
    if ($l['adet'] === 2) return $dil === 'en' ? "$a and $b" : "$a ve $b";
    $kalan = $l['adet'] - 2;
    return $dil === 'en'
        ? "{$l['adet']} sites ($a, $b and $kalan more)"
        : "{$l['adet']} saha ($a, $b ve $kalan saha daha)";
}

function sayiMetni(float $v, string $dil): string
{
    $metin = rtrim(rtrim(number_format($v, 2, '.', ''), '0'), '.');
    return $dil === 'tr' ? str_replace('.', ',', $metin) : $metin;
}

/** Modele verilen hazır cümle: eşit saha sayısına göre tek, iki ya da çok saha biçimi ve gösterim biçimli değer. */
function iskeletCumle(string $alan, array $l, string $dil): string
{
    $tr = $dil === 'tr';
    $sayi = sayiMetni((float)$l['deger'], $dil);
    $deger = match ($alan) {
        'dark_hours' => $tr ? "$sayi saat" : "$sayi hours",
        default => $tr ? "%$sayi" : "$sayi%",
    };
    $baslik = match ($alan) {
        'sunlight_pct' => $tr ? 'Görev penceresi boyunca yüzey güneş enerjisi sürekliliğini gösteren en yüksek Güneş aydınlanma payı' : 'The highest window sunlight share governing surface solar power continuity is',
        'earth_visibility_pct' => $tr ? 'Yerel LOLA arazi ufku üzerinde doğrudan görüş süresini gösteren en yüksek Dünya görünürlük payı' : 'The highest geometric Earth visibility share above the local terrain horizon is',
        default => $tr ? 'Batarya ve ısıl dayanım ihtiyacını belirleyen en kısa kesintisiz karanlık aralığı' : 'The shortest continuous dark interval governing battery and thermal storage is',
    };
    [$a, $b] = [$l['idler'][0], $l['idler'][1] ?? ''];
    $adet = $l['adet'];
    $kalan = $adet - 2;
    if ($tr) {
        if ($adet <= 1) return "$baslik $a sahasında $deger düzeyindedir.";
        if ($adet === 2) return "$baslik $a ve $b sahalarında $deger düzeyindedir.";
        return "$baslik $adet sahada $deger düzeyindedir ($a, $b ve $kalan saha daha).";
    }
    if ($adet <= 1) return "$baslik at $a at $deger.";
    if ($adet === 2) return "$baslik at $a and $b at $deger.";
    return "$baslik at $adet sites at $deger ($a, $b and $kalan more).";
}

function yedekYorum(array $lider, string $dil): string
{
    if ($dil === 'en') {
        return iskeletCumle('sunlight_pct', $lider['sunlight_pct'], $dil) . ' '
            . iskeletCumle('earth_visibility_pct', $lider['earth_visibility_pct'], $dil) . ' '
            . iskeletCumle('dark_hours', $lider['dark_hours'], $dil);
    }
    return iskeletCumle('sunlight_pct', $lider['sunlight_pct'], $dil) . ' '
        . iskeletCumle('earth_visibility_pct', $lider['earth_visibility_pct'], $dil) . ' '
        . iskeletCumle('dark_hours', $lider['dark_hours'], $dil);
}

function yedekCevap(array $lider, string $dil, string $neden): never
{
    error_log('lunaris-yorum yedek: ' . $neden . (isset($GLOBALS['comment']) && str_starts_with($neden, 'reject_') ? ' | ' . substr((string)$GLOBALS['comment'], 0, 300) : ''));
    $icerik = ['comment' => yedekYorum($lider, $dil), 'source' => 'fallback'];
    if (getenv('LUNARIS_DEBUG') === '1') $icerik['reason'] = $neden;
    cevap(200, $icerik);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    cevap(405, ['error' => 'method_not_allowed']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $requestHost = parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST);
    if (!is_string($originHost) || !is_string($requestHost)
        || strtolower($originHost) !== strtolower($requestHost)) {
        cevap(403, ['error' => 'origin_not_allowed']);
    }
}

$icerikTuru = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if ($icerikTuru !== 'application/json') cevap(415, ['error' => 'json_required']);
$ham = file_get_contents('php://input', false, null, 0, MAX_BODY + 1);
if (!is_string($ham) || strlen($ham) > MAX_BODY) cevap(413, ['error' => 'request_too_large']);
$girdi = json_decode($ham, true);
if (!is_array($girdi) || !isset($girdi['language'], $girdi['parcels'])
    || !in_array($girdi['language'], ['tr', 'en'], true)
    || !is_array($girdi['parcels']) || count($girdi['parcels']) < 2 || count($girdi['parcels']) > 10) {
    cevap(400, ['error' => 'invalid_input']);
}

$parseller = [];
$gorulen = [];
foreach ($girdi['parcels'] as $satir) {
    $expectedKeys = ['id', 'sunlight_pct', 'earth_visibility_pct', 'dark_hours'];
    if (!is_array($satir) || array_diff($expectedKeys, array_keys($satir)) || array_diff(array_keys($satir), $expectedKeys)) {
        cevap(400, ['error' => 'invalid_input']);
    }
    $id = $satir['id'];
    if (!is_string($id) || !preg_match('/^[A-Za-z0-9]{1,16}(?:[_-][A-Za-z0-9]{1,16})?$/D', $id) || isset($gorulen[$id])
        || !sayisalMi($satir['sunlight_pct'], 0, 100)
        || !sayisalMi($satir['earth_visibility_pct'], 0, 100)
        || !sayisalMi($satir['dark_hours'], 0, 10000)) {
        cevap(400, ['error' => 'invalid_input']);
    }
    $gorulen[$id] = true;
    $parseller[] = [
        'id' => $id,
        'sunlight_pct' => round((float)$satir['sunlight_pct'], 4),
        'earth_visibility_pct' => round((float)$satir['earth_visibility_pct'], 4),
        'dark_hours' => round((float)$satir['dark_hours'], 4),
    ];
}
usort($parseller, fn(array $a, array $b): int => strcmp($a['id'], $b['id']));
$dil = $girdi['language'];
$esit = [];
if (isset($girdi['ties'])) {
    if (!is_array($girdi['ties'])) cevap(400, ['error' => 'invalid_input']);
    foreach (METRICS as $alan) {
        $adet = $girdi['ties'][$alan] ?? null;
        if (!is_int($adet) || $adet < 1 || $adet > 100000) cevap(400, ['error' => 'invalid_input']);
        $esit[$alan] = $adet;
    }
}
$lider = liderler($parseller, $esit);
$privateRoot = getenv('LUNARIS_PRIVATE_DIR') ?: dirname(__DIR__, 2);
$storage = rtrim($privateRoot, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'lunaris-ai';
$cacheKey = hash('sha256', json_encode([$dil, $parseller, $lider, MODEL, PROMPT_VERSION], JSON_UNESCAPED_UNICODE));

if (!is_dir($storage . '/cache') && !@mkdir($storage . '/cache', 0700, true) && !is_dir($storage . '/cache')) {
    yedekCevap($lider, $dil, 'no_cache_dir');
}
if (!is_dir($storage . '/rate') && !@mkdir($storage . '/rate', 0700, true) && !is_dir($storage . '/rate')) {
    yedekCevap($lider, $dil, 'no_rate_dir');
}
$cacheFile = $storage . '/cache/' . $cacheKey . '.json';
if (is_file($cacheFile) && time() - (int)filemtime($cacheFile) < CACHE_TTL) {
    $cached = json_decode((string)file_get_contents($cacheFile), true);
    if (is_array($cached) && isset($cached['comment']) && is_string($cached['comment'])) {
        cevap(200, ['comment' => $cached['comment'], 'source' => 'ai', 'cached' => true]);
    }
}

$rateId = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rateHandle = @fopen($storage . '/rate/' . $rateId . '.json', 'c+');
if ($rateHandle === false || !flock($rateHandle, LOCK_EX)) yedekCevap($lider, $dil, 'rate_file');
$rateRaw = stream_get_contents($rateHandle);
$times = is_string($rateRaw) ? json_decode($rateRaw, true) : [];
if (!is_array($times)) $times = [];
$times = array_values(array_filter($times, fn($t): bool => is_int($t) && $t > time() - RATE_WINDOW_SECONDS));
if (count($times) >= RATE_LIMIT_PER_HOUR) {
    flock($rateHandle, LOCK_UN);
    fclose($rateHandle);
    yedekCevap($lider, $dil, 'rate_limit');
}
$times[] = time();
rewind($rateHandle);
ftruncate($rateHandle, 0);
fwrite($rateHandle, json_encode($times));
fflush($rateHandle);
flock($rateHandle, LOCK_UN);
fclose($rateHandle);

$apiKey = getenv('GROQ_API_KEY') ?: '';
if ($apiKey === '') {
    $candidates = array_filter([
        getenv('GROQ_SECRET_FILE') ?: '',
        rtrim($privateRoot, DIRECTORY_SEPARATOR) . '/groq-secrets.php',
        dirname(__DIR__, 3) . '/groq-secrets.php',
    ]);
    foreach ($candidates as $secretFile) {
        if (is_file($secretFile)) {
            $secret = require $secretFile;
            $apiKey = is_array($secret) ? (string)($secret['GROQ_API_KEY'] ?? '') : (is_string($secret) ? $secret : '');
            if ($apiKey !== '') break;
        }
    }
}
if ($apiKey === '' && is_file(dirname(__DIR__, 3) . '/.env')) {
    foreach (file(dirname(__DIR__, 3) . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
        if (str_starts_with(trim($line), 'GROQ_API_KEY=')) {
            $apiKey = trim(substr(trim($line), strlen('GROQ_API_KEY=')));
            break;
        }
    }
}
if ($apiKey === '') yedekCevap($lider, $dil, 'no_key');
if (!function_exists('curl_init')) yedekCevap($lider, $dil, 'no_curl');

$sema = '{"comment":"..."}';
$system = $dil === 'en'
    ? 'You explain computed lunar landing-site metrics clearly and neutrally. Input JSON: parcels (computed values) and verified_leaders, one entry per metric with value, site_count (sites sharing that value), ids (at most two site IDs) and skeleton, a ready explanatory sentence. Write comment as three clear English sentences, one per metric in the order sunlight share (explaining surface solar illumination continuity), Earth visibility share (explaining geometric line-of-sight above the local horizon), and shortest dark interval (explaining shadow duration for energy storage). Keep every ID, count and value of the skeleton exactly as written and add no other IDs or numbers. Percent values keep the percent sign after the number (100%, 76.1%). Never rank, recommend, or call a site best. Reply with one JSON object of this shape: ' . $sema
    : 'Hesaplanmış Ay iniş yeri değerlerini açıkla ve verinin ne anlama geldiğini tarafsızca anlat. Girdi JSON: parcels (hesaplanan değerler) ve verified_leaders; her ölçüt için deger, site_count (o değeri paylaşan saha sayısı), idler (en çok iki kimlik) ve iskelet (hazır açıklayıcı cümle). comment alanına üç açıklayıcı Türkçe cümle yaz: sırayla Güneş aydınlanma payı (yüzey güneş enerjisi sürekliliği anlamıyla), Dünya görünürlük payı (yerel ufuk üzerindeki geometrik görüş anlamıyla) ve en kısa karanlık aralığı (gölge geçişi ve batarya dayanımı anlamıyla). İskeletteki her kimliği, sayıyı ve değeri aynen koru, başka kimlik ya da sayı ekleme. Yüzde yalnız "%100" biçiminde, işaret sayının başında yazılır; "100%" yazma. Ondalık ayracı virgüldür (%76,1). "lider" kelimesini kullanma, hiçbir sahaya en iyi deme. Tek bir JSON nesnesi döndür: ' . $sema;
$liderGirdisi = [];
foreach ($lider as $alan => $l) {
    $liderGirdisi[$alan] = [
        'deger' => $l['deger'],
        'site_count' => $l['adet'],
        'idler' => $l['idler'],
        ($dil === 'en' ? 'skeleton' : 'iskelet') => iskeletCumle($alan, $l, $dil),
    ];
}
$olgular = ['parcels' => $parseller, 'verified_leaders' => $liderGirdisi];
$payload = [
    'model' => MODEL,
    'messages' => [
        ['role' => 'system', 'content' => $system],
        ['role' => 'user', 'content' => json_encode($olgular, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)],
    ],
    'temperature' => 0.2,
    'max_completion_tokens' => 1500,
    'reasoning_effort' => 'low',
    'response_format' => ['type' => 'json_object'],
];
$curl = curl_init('https://api.groq.com/openai/v1/chat/completions');
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 18,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $apiKey, 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
]);
$response = curl_exec($curl);
$status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlHata = curl_errno($curl);
curl_close($curl);
if (!is_string($response)) yedekCevap($lider, $dil, 'curl_err_' . $curlHata);
if ($status < 200 || $status >= 300) {
    $hataIleti = (string)(json_decode($response, true)['error']['message'] ?? '');
    $hataIleti = preg_replace('/gsk_[A-Za-z0-9]+/', '[anahtar]', substr($hataIleti, 0, 200));
    error_log('lunaris-yorum groq: ' . $hataIleti);
    yedekCevap($lider, $dil, 'http_' . $status);
}

$decoded = json_decode($response, true);
$content = $decoded['choices'][0]['message']['content'] ?? null;
$result = is_string($content) ? json_decode($content, true) : null;
if (!is_array($result)) yedekCevap($lider, $dil, 'reject_json');
$comment = trim((string)($result['comment'] ?? ''));
$comment = str_replace(["'", ' · ', '→'], ['’', ', ', '-'], $comment);
$idler = array_keys($gorulen);
usort($idler, fn(string $a, string $b): int => strlen($b) <=> strlen($a));
$commentWithoutIds = str_replace($idler, '', $comment);
if (preg_match('/guarantee|certain|safest|best|recommend|kesin|garanti|en iyi|öneri/iu', $commentWithoutIds) === 1) {
    yedekCevap($lider, $dil, 'reject_forbidden');
}
if (!sayilarGirdidenMi($commentWithoutIds, $parseller, $lider)) yedekCevap($lider, $dil, 'reject_digits');
if ($dil === 'tr' && preg_match('/\d\s?%/u', $comment) === 1) yedekCevap($lider, $dil, 'reject_format');
if (!liderKimlikleriUygunMu($comment, $idler, $lider)) yedekCevap($lider, $dil, 'reject_leader');
$hasSite = false;
foreach ($idler as $id) if (str_contains($comment, $id)) $hasSite = true;
if ($comment === '') { error_log('lunaris-yorum bos: ' . substr((string)$content, 0, 300)); yedekCevap($lider, $dil, 'reject_empty'); }
if (!$hasSite) yedekCevap($lider, $dil, 'reject_site');
$commentLength = function_exists('mb_strlen') ? mb_strlen($comment, 'UTF-8') : strlen($comment);
if ($commentLength > 1400) yedekCevap($lider, $dil, 'reject_len');

$answer = ['comment' => $comment, 'source' => 'ai'];
@file_put_contents($cacheFile, json_encode($answer, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
@chmod($cacheFile, 0600);
cevap(200, $answer);
