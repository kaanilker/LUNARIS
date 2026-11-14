# Parametre setinin doğrulaması

> İncelenen: `docs/LUNARIS_bilim_parametre_seti.md` (sürüm 2026-11-14, durum ÖNERİ).
> İnceleyen: yazılım ajanı, 2026-11-14. Bu rapor karar vermez; bulguları ve önerileri bilim ekibine sunar.
> Sayısal kontrol: `.venv/bin/python hat/kontrol/parametre_seti_kontrol.py` (tohum 20261114).
> Son koşu: ölçüldü 2026-11-14 · yerel makine · 47 sayıdan 46'sı tuttu, 8 formül testinin 8'i geçti, çıkış 1.

## 1. Sonuç

Belgedeki hesapların neredeyse hepsi doğru. Formüllerin matematiği tutarlı. Bulduğum sorunlar sayı
hatasından çok **tanım, kapsam ve durum etiketi** sorunları. Bunlardan biri (paralaks) fizik hatası,
biri (batış tanımı) iki formül arasında çelişki, biri (kalkış modeli) kullanıcı kararıyla gerilim.

## 2. Sayısal kontrol

Bölüm 1'deki ve modüllerdeki 47 sayı bağımsız olarak yeniden hesaplandı.

- **46 tuttu:** gölge katsayısı, panel tavanı, radyo ufku, regolit basıncı, Ay saati, maksimum güneş
  yüksekliği, eğrilik düşüşü, termal denge, batarya kapasitesi ve kütlesi, serbest uzay kaybı, kutup
  kapağı alanı, azimut hızı, açısal yarıçaplar, ışık gecikmesi, ET−UTC, stereografik ölçek hatası, ışın
  örnekleme, balistik menzil, yörünge ve kaçış hızı, PSR yürüyüşü, libration, ağırlık toplamı.
- **1 tutmadı: saha sayısı.** Bölüm 10'daki 9 güncel bölge tablosunun "Saha" sütunu toplamı **78**.
  Belgenin başka yerleri (Modül 5, jeoloji) **130 saha** diyor. Çıkarım: 130, 2022'deki 13 bölgenin
  tamamı; 78, 2024'teki 9 bölgeninki. Hangi sayının nerede kastedildiği belgeye yazılmalı. Modül 5'teki
  "130 sahadan 21'i" oranı da hangi kümeye ait, belirtilmeli.
- Küçük not: serbest uzay kaybının perije ve apoje farkı simetrik değil (+0,65 / −0,49 dB). "±0,6 dB"
  yaklaşık olarak kabul edilebilir.

## 3. Formül testleri (hepsi geçti)

| Formül | Test |
|---|---|
| 0.4 disk kesri | Uç değerler (0, 0,5, 1), tekdüzelik ve sayısal alan hesabıyla aynı sonuç |
| S.2 ENU eksenleri | 200 rastgele kutup noktasında birim, dik ve sağ elli |
| 0.2 alt-nokta formülü | Sonsuz uzaklıktaki cisim için 0.1 vektör yöntemiyle aynı (500 nokta, fark 1e−15 rad) |
| S.1 stereografik | İleri ve ters dönüşüm tutarlı; PROJ kütüphanesinin kutup stereografiğiyle metre düzeyinde aynı |
| 0.3 eğrilik terimi | d/(2R), küre geometrisinin tam sonucuyla aynı (150 km'de 2,4733°) |

Not: 0.2'deki azimut `tan A` olarak yazılmış. Kodda dörtte bir bölgeyi doğru bulmak için `atan2`
kullanılmalı. Test `atan2` ile geçti.

## 4. Bulgular

### B-1 · Dünya paralaksı ~1° değil, ~0,26° (fizik hatası)
Modül 0, formül 0.1: "Dünya'nın ~1°'lik paralaksı". Ay yüzeyindeki bir sahadan bakınca Dünya'nın yönü, Ay
merkezinden bakışa göre en fazla R_Ay / d kadar kayar: **0,245–0,279°** (mesafeye göre). ~0,95°, Ay'ın
**Dünya yüzeyinden** görülen yatay paralaksıdır; bu, DSN istasyonunun Ay'ı nerede gördüğünü (S.5)
etkiler, sahanın Dünya'yı nerede gördüğünü değil. Vektör yöntemi (0.1) iki durumu da kendiliğinden doğru
hesaplar, yani **kod etkilenmez**; düzeltilmesi gereken açıklama metni.

### B-2 · "Günlük libration ±1°" Dünya'nın Ay göğündeki yerine uygulanmaz
Modül 4 tablosu. Günlük (paralaktik) libration, gözlemcinin **Dünya yüzeyinde** dönmesinden doğar. Ay
yüzeyinden bakan bir sahada Dünya'nın yeri, yer merkezli optik ve fiziksel libration (enlem ±6,68°,
boylam ±7,9°) ile sahanın kendi paralaksından (B-1) oluşur. Belgedeki "16,5° / 18°" değerinin günlük
libration eklenmiş Dünya'dan görülen toplam olduğu tahmini makul (çıkarım). Öneri: Dünya görünürlüğü
parametrelerinden "günlük libration" satırı çıkarılsın ya da "yalnız DSN tarafı" diye işaretlensin.

### B-3 · Gün batımı iki farklı tanımla hesaplanıyor (iç çelişki)
- 0.5 geri sayımı: batış = diskin **tamamen** kaybolması, `e − H < −r` (yani f = 0).
- S.4 metrikleri: aydınlık = **f ≥ 0,5** (yarım disk).

Aynı sahada geri sayım "gün batımına 3 saat" derken zaman çizelgesi çok daha önce "karanlık"a geçebilir.
Kutupta Güneş neredeyse sabit yükseklikte yatay döner; batışı, ufuk yüksekliğinin azimutla değişmesi yapar.
f = 0,5'ten f = 0'a geçiş süresi ≈ r☉ / (ω · dH/dA). Örnek: ufuk eğimi dH/dA = 0,1°/° ise
0,267 / (0,508 × 0,1) ≈ 5,3 saat (hesap; eğim değeri örnektir, ölçülmedi). Öneri: tek tanım seçilsin
ya da arayüz iki ayrı olay göstersin (ör. "güç düşüşü f < 0,5" ve "tam batış f = 0").

### B-4 · Kalkış modeli önerisi kullanıcı kararıyla gerilim içinde
S.7, belgenin önerisi: Planlayıcı'nın asıl girdisi **geçiş profili** olsun, kalkış noktası "etkisi saat
mertebesinde" diye bilgi amaçlı kalsın. Kullanıcı kararı (`docs/sayfalar.md` §2, 2026-11-14): girdi
**Dünya'daki kalkış noktası**, amaç görev süresini en aza indirmek; kullanıcının gerekçesi yanlış zamanda
fırlatmanın rotayı çok uzatması. İki görüş aslında aynı fiziği söylüyor olabilir: rotayı uzatan, fırlatma
**zamanı** ve seçilen **profil**; fırlatma **yeri** ise park yörüngesi eğimini ve günlük fırlatma saatini
belirler. Bu bir yön kararı; kullanıcı ve bilim ekibinde. Öneri: girdiler "kalkış noktası + geçiş profili"
olsun; ikisi birlikte görev süresini belirler.

### B-5 · Durum etiketleri belgenin kendi beyanıyla çelişiyor
Bölüm 12'de B6, B7, B9, B20 "Tamam" görünüyor. Bölüm 17 "hiçbir değer bilim ekibince onaylanmadı"
diyor. Değerlerin çoğu [T] (tasarım önerisi). Öneri: bilim ekibi onaylayana kadar hepsi "Öneri".

### B-6 · "Hazır" denen veri dosyaları repoda yok
Bölüm 14: `wueller2026_130_saha.csv` ve `saha_jeoloji.csv` "Hazır". Makinede ve repoda yoklar
(arandı 2026-11-14). Bölüm 10'daki 9 bölge tablosu ve "2031: 44 / 2032: 98" doğrulaması bu dosyalara
dayanıyor; dosyalar gelmeden bu değerler yeniden üretilemez. Ayrıca Wueller verisinin lisansı, herkese
açık repoya konmadan önce kontrol edilmeli.

### B-7 · Saros (18,03 yıl) ile 18,6 yıl farkı
Belgenin [D] notu makul. 18,6 yıl Ay yörünge düğümünün dönme süresidir; alt-Güneş enleminin yıl içindeki
takvim tarihine göre kaymasını belirler. Saros (223 sinodik ay ≈ 19 tutulma yılı ≈ 18,03 yıl), hem Güneş
azimutunun (sinodik ay) hem alt-Güneş enleminin (tutulma yılı) birlikte tekrarlandığı süredir. Aydınlanma
deseninin tekrarı için Saros daha uygun görünüyor (çıkarım; kaynakla teyit edilmeli).

### B-8 · Mimari not: S.3 ara değerlemesi
S.3 sahadan görülen yön vektörü ŝ'yi tablo adımları arasında ara değerliyor. Mimaride tablo siteden
bağımsız tutuluyor (Güneş ve Dünya'nın Ay merkezli konumu). Öneri: Ay merkezli konum vektörleri ara
değerlensin, ŝ her an 0.1 ile hesaplansın. Bir saatlik adımda iki yolun farkı çok küçük (Güneş 0,508°/sa
döner); amaç her saha için ayrı tablo tutmamak.

### B-9 · Küçük notlar
- η_sis ≈ 0,64, 10 kWe tasarım hedefinden geri hesaplanmış ([D] türetildi). 10 kWe'nin hangi koşulda
  (güneş yüksekliği, ömür başı ya da sonu) tanımlandığı bilinmeden bu katsayı yer tutucu sayılmalı.
- S.2 tam kutupta (φ = −90°) doğu ve kuzey eksenleri tanımsızdır. Kutup parseli için özel durum gerekir.
- Uyarı rengi için önerilen "macenta" bir tasarım kararı; `docs/tasarim.md` §3'te `--uyari` seçilirken
  değerlendirilir.
- Belge kendi kaynaklarında 2026 tarihli bazı atıfların gerçek dışı göründüğünü yazıyor. Bu kontrol
  kaynakları açmadı; [K] etiketleri belgenin beyanına dayanıyor.

## 5. Kontrol edilmeyenler

- [K] değerlerinin kaynaklarda gerçekten öyle yazıp yazmadığı (kaynak belgeler verilmedi).
- Wueller verisinden türetilen bölge tablosu (veri dosyası yok, B-6).
- SPICE ile gerçek efemeris hesabı ve Horizons karşılaştırması (çekirdekler henüz indirilmedi; pilotun işi).
