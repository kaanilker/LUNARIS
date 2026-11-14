# LUNARIS proje taslağı

> Yazılım ekibindeki arkadaşlar için projenin tamamını tek yerde anlatan rehber. Yazıldı: 2026-11-14.
> Repo: https://github.com/kaanilker/LUNARIS
>
> Bu belge bir özet ve yol gösterici. Her konunun ayrıntısı ve son hâli kendi sahip belgesinde durur
> (§14). Bu belgeyle sahip belge çelişirse sahip belge geçerlidir. **KARAR** ekibin onayladığı,
> **ÖNERİ** henüz onaylanmamış demektir.

## 1. Proje bir bakışta

**Challenge:** NASA Space Apps Challenge 2026. Ay'ın güney kutbunda iniş noktası ve tarihini hızla
karşılaştıran sezgisel bir araç istiyor. Tam metin `docs/kaynak/challenge.md`.

**Problem:** Kutupta Güneş ufkun hemen üstünde, neredeyse yatay hareket eder. Yakındaki bir tepe bile onu
kesebilir. Dünya da ufka yakın bir yerde sallanır (libration). Bu yüzden birkaç yüz metrelik konum farkı ya
da birkaç günlük tarih farkı güç (güneş paneli) ve doğrudan Dünya iletişimini tamamen değiştirir.
Görevlerin takvimi sık kayar ve mühendislerin alternatifleri hızla görmesi gerekir. NASA'nın Quickmap, Moon
Trek ve Horizons araçları ayrıntılı analiz için yapılmış, hızlı karşılaştırma için kullanmaları zor.

**LUNARIS:** Lunar Illumination & Communication Analysis System. Quasar Team'in web aracı. Güney kutbunu
parsellere böler; her parsel için Güneş ve Dünya'nın ufka göre durumunu önceden hesaplar; kullanıcıya en
uygun iniş parsellerini, tarihlerini ve nedenlerini anında gösterir.

**Hedef his:** jüri 10 saniyede problemi anlar, 60 saniyede çözüme inanır. Site bir sunum gibi değil,
bir görev planlamacısının yarın kullanabileceği doğrulanmış bir araç gibi hissettirir.

## 2. Ekipler ve şu anki aşama

| Ekip | Sorumluluğu |
|---|---|
| Temel bilimler | Denklemler, parametreler, tanımlar, site ve görev listeleri, doğrulama vakaları, metinler. **Bilimsel kararlar ve yöntemler bu ekipten çıkar.** |
| Yazılım | Veri hattı (Python), web sitesi (SvelteKit), AI yorum ucu (PHP), barındırma |
| Animasyon | 3B sahneler, scroll anlatısı görselleri, arayüz animasyonları |

**Aşama:** mimari ve hazırlık. Bilim ekibinin girdileri gelene kadar gerçek hesap yapılmıyor. Bilim
verisine bağlı olmayan işler (§12, Aşama 1) şimdi yapılabilir.

## 3. Değişmez ilkeler

Bunlar brifte ekip tarafından konmuş ilkeler (`docs/kaynak/LUNARIS_AGENT_BRIEF.md`). Her özellik bunlarla
ölçülür.

1. **Hız.** Tarih ya da site değişince sonuç anında görünür; "Analyzing..." ekranı yok.
2. **Bilimsel bilgi uydurulmaz.** Bilinmeyen değer yer tutucu kalır ve sitede "yer tutucu" yazar.
3. **Dürüstlük.** Sonuçlar Horizons ve literatürle doğrulanır. "Kesin", "nihai risk", "garanti" gibi
   ifadeler kullanılmaz. Sınırlamalar açıkça yazılır. Bu, SOLARIS projesinden çıkan bir ders.
4. **Canlı görseller.** Animasyon süs değil, gerçek veriyle hareket eder. Zaman kaydırıcısı oynayınca
   sahne, grafik ve metin birlikte değişir.
5. **İki dil:** Türkçe ve İngilizce. **Mobil:** telefonda da açılır. **Koyu tema.**
6. **Renk sözleşmesi:** Güneş her yerde amber, Dünya her yerde mavi. Bu iki renk başka anlamda kullanılmaz.
7. **AI yorumu** yalnız sitenin hesapladığı sonucu yorumlar, kendi sayı üretmez, "AI üretimi" etiketi
   taşır, gelmezse hazır metin görünür.

## 4. Verilmiş kararlar

| Konu | Karar | Sahip belge |
|---|---|---|
| Sayfa yapısı | 7 sayfa (§5) | `docs/sayfalar.md` |
| Parsel yöntemi | Güney kutbu eşit metrik parsellere bölünür, parsel başına birden çok değer tutulur | `docs/mimari.md` §3b |
| Planlayıcı girdisi | Fırlatma tarihi ve Dünya'daki kalkış noktası; amaç görev süresini (fırlatmadan inişe) en aza indirmek | `docs/sayfalar.md` §2 |
| Ön yüz | SvelteKit + TypeScript + Three.js, statik çıktı | `docs/mimari.md` §7 |
| Stil | Tailwind CSS; palet ve şekil dili SOLARIS referanslı | `docs/tasarim.md` |
| AI yorumu | Groq API (model sonra seçilecek) | `docs/mimari.md` §6 |
| Barındırma | cPanel (PHP 8.4) | `docs/mimari.md` §7 |
| NASA kaynakları | Horizons, Quickmap, Moon Trek, CSA Moon Exploration'ın hepsi kullanılır | `docs/mimari.md` §11 |
| Repo | Herkese açık, GPL-2.0 | `CLAUDE.md` |

ÖNERİ durumunda olanlar: veri hattında Python ve kütüphaneleri, AI ucunda PHP, adreslerde dil öneki,
veri paketinin biçimi, rehberli turun adımları.

## 5. Sayfalar ve kullanıcı yolculuğu

Ayrıntı `docs/sayfalar.md`. Menü sırası: önce hesap sayfaları, sonra görsel sayfalar.

| # | Sayfa | Ne yapar |
|---|---|---|
| 1 | **Ana Sayfa** | Dönen tam Ay küresi, gerçek Güneş konumuyla aydınlanmış. "Güney kutbu şu an" paneli: kutup şu an ne kadar enerji alıyor, inişe ne kadar elverişli, Dünya görünüyor mu. Ağırlık AI yorumunda, bilgi kısa. Dört bölümlük kısa anlatı. |
| 2 | **Planlayıcı** | Kullanıcı fırlatma tarihini ve Dünya'daki kalkış noktasını seçer. Sistem en uygun 5–10 parseli kutup haritasında sıralar; her biri için neden seçildiğini ve verilerini yazar. AI yorumu parselleri karşılaştırır. Gecikme kaydırıcısı fırlatma kayınca sıralamayı canlı değiştirir ve en uygun tarihi söyler. |
| 3 | **Uzman Analiz** | Ayrı sayfa. Eşik süzgeçleri, güç ve iletişim dengesi (Pareto), panel ve batarya modeli, DSN istasyonları, iniş belirsizliği, benzer parsel önerisi, aylık görünüm, bütün sayılar. |
| 4 | **Site Detay** | Seçilen noktanın 360° ufuk panoraması, gökyüzünde Güneş ve Dünya izleri. Gün batımı, Dünya batımı ve sonraki iletişim penceresi için geri sayım. Zaman çizelgesi, zaman oynatıcı, astronot görünümü. "Horizons'ta aç", "Quickmap'te aç", "Moon Trek'te aç" bağlantıları. Özel koordinat girişi. |
| 5 | **Karşılaştır** | İki parsel ya da aynı parselde iki tarih yan yana, farklar vurgulu, rapor çıktısı. |
| 6 | **Görevler** | Yalnız görsel. Dönen Ay küresinde tarihin en önemli 10 iniş görevi. |
| 7 | **Hakkında** | Veri kaynakları, yöntem, doğrulama tablosu (Horizons, Quickmap, literatür), sınırlamalar, ekip. |

Sayfa olmayanlar: **Rehberli Tur** her sayfadan açılan 60 saniyelik, 4 adımlık katman (problem → yöntem →
doğrulama → öneri). **Rapor** Site Detay ve Karşılaştır sayfalarının yazdırma görünümü.

**Demo akışı** (`SPEC.md`): tam Ay ve "kutup şu an" → Planlayıcı'da en uygun parseller → gecikme
kaydırıcısı → Site Detay'da ufuk ve geri sayımlar → Karşılaştır → Hakkında'da doğrulama.

## 6. Mimarinin ana fikri

Ayrıntı `docs/mimari.md` §1.

"Güneş bu noktada şu an görünüyor mu?" sorusu iki bilgiye bağlı:

1. **Gökyüzü:** Güneş ve Dünya o an Ay'a göre nerede? Bu, kutup bölgesindeki noktaya neredeyse bağlı
   değildir ve tek bir zaman tablosudur. NASA SPICE'tan bir kez hesaplanır. Libration bu tabloya kendiliğinden girer.
2. **Arazi:** noktanın etrafındaki tepeler hangi yönde, ne kadar yüksek? Bu zamanla değişmez. Her parsel
   için LOLA yükseklik haritasından bir kez "ufuk profili" (360° silüet) çıkarılır.

İkisini birleştirmek ucuzdur: Güneş'in o anki yönü ve yüksekliği, o yöndeki ufuk açısıyla karşılaştırılır.
Dünya için konum vektörü kullanılır, çünkü Ay yarıçapı kadar kayma (paralaks) Dünya'nın görünen yerini
değiştirir.

Sonuç: **ağır hesap önceden ve çevrimdışı yapılır, tarayıcı yalnız okur ve basit geometri yapar.**

```
 ÖNCEDEN (bizim bilgisayarda, bir kez)
   SPICE çekirdekleri ──▶ gökyüzü tablosu ─┐
   LOLA yükseklik    ──▶ parsel ufukları  ─┼──▶ parsel × gün metrikleri ──▶ veri paketi
   Horizons          ──▶ karşılaştırma    ─┘                                  │
                                                                              ▼
 cPanel (Apache)                                                   public_html/ + veri paketi
   api/yorum.php ◀───── Groq API                                              │
        ▲                                                                     ▼
 TARAYICI   sayfalar ◀── durum (tek saat, URL) ◀── motor (Web Worker) ◀── paket
            sahneler ◀── sahne arayüzü
```

## 7. Bileşenler

### 7.1 Veri hattı (`hat/`, Python, çevrimdışı)
- **Görev:** SPICE ile gökyüzü tablosu; LOLA ile parsel ufukları; parsel × gün metrikleri; Horizons ve
  literatürle karşılaştırma; sürümlü veri paketi.
- **Araçlar (ÖNERİ):** `spiceypy`, `numpy`, `rasterio`. Sürümler `requirements.txt`'de sabitlenir.
- **Belirlenimci:** aynı girdi aynı paketi üretir. Paketteki `manifest.json` kullanılan çekirdekleri,
  DEM ürününü, zaman aralığını, parsel ağını, sağlamaları ve hat commit'ini taşır.
- **Ham veri** (SPICE çekirdekleri, DEM) git'e girmez; indirme betiği URL ve sağlamayla repoda durur.
- **En pahalı adım ufuk hesabıdır.** Parsel boyutu bu yüzden pilot ölçümünden sonra seçilir.

### 7.2 Parsel yöntemi (KARAR)
- Parseller enlem-boylam karesi değil, **kutup stereografik izdüşümünde metre cinsinden eşit kareler**.
  Enlem-boylam kareleri kutba yaklaştıkça daralır ve kutupta tanımsız olur.
- Parsel tek sayıya indirgenmez: **merkez, ortalama, en iyi nokta, en kötü nokta, eşiği geçen alan oranı**
  tutulur. Kutupta birkaç yüz metre içinde aydınlanma çok değiştiği için gerekli. İniş belirsizliği bu
  yayılımdan çıkar.
- İki katman: sıralama için kaba parseller, Site Detay için parselin içinde ince noktalar.
- Eğim ve buz bölgesine uzaklık da parsel özelliğidir.
- Parsel boyutu, bölge sınırı ve sıralama yöntemi bilim ekibinden (B4, B20).

### 7.3 Veri paketi (`veri/<sürüm>/`, ÖNERİ biçim)

| Dosya | İçerik | Kullanan |
|---|---|---|
| `manifest.json` | sürüm, kaynaklar, sağlamalar, birimler, zaman ekseni | hepsi |
| `efemeris.bin` | zaman adımı başına Güneş ve Dünya konumu (Ay sabit çerçeve, km) | motor |
| `siteler.json` | hazır siteler ve ufukları | Site Detay |
| `izgara/ufuk-<parça>.bin` | parsel ufuk profilleri | Site Detay, özel koordinat |
| `izgara/ozet-<parça>.bin` | parsel × gün metrikleri | Planlayıcı, Uzman |
| `dsn.bin` | istasyon görünürlüğü | Uzman, Site Detay |
| `dogrulama.json` | Horizons ve literatür farkları | Hakkında |
| `altin.json` | birkaç nokta × zaman için beklenen sonuç | TS motor testleri |

Planlayıcı yalnız gereken parçaları ister. Paket boyutu ölçülünce cPanel disk ve bant sınırıyla
karşılaştırılır.

### 7.4 Ön yüz (`web/`, SvelteKit, statik)
- **SvelteKit + TypeScript**, `adapter-static`: her sayfa düz HTML olarak üretilir, cPanel'e kopyalanır.
  Seçim gerekçesi: öğrenmesi kolay, yönlendirme ve dil öneki hazır, sunucuda Node gerekmez.
- **Durum deposu:** tek saat ve tek senaryo (parsel, tarih, kalkış noktası, gecikme, süzgeçler, dil).
  Panorama, grafik, kart ve 3B sahne aynı saati dinler. Senaryo adrese yazılır; paylaşım linki budur.
- **Motor:** saf TypeScript modülü. Ufuk × gökyüzü geometrisi, süzgeç ve sıralama. Arayüzden ayrı,
  test edilir. Ağır işler Web Worker'da, sayfa takılmaz.
- **İki dil:** metinler `tr.json` ve `en.json` dosyalarında; kodda kullanıcıya görünen metin yok.
  Adresler `/tr/...` ve `/en/...` (ÖNERİ).
- **Tasarım belirteçleri:** Tailwind `@theme` bloğunda tek yerde (`web/src/lib/stil/belirtecler.css`); Güneş amber, Dünya mavi.
- **Rapor:** tarayıcının yazdırma görünümü; ayrı PDF sunucusu yok.

### 7.5 Sahne arayüzü (animasyon ekibiyle sözleşme)
- Sahne düz bir TypeScript modülüdür, Svelte bilmesi gerekmez: `bagla(kap, abonelik)` ile kurulur,
  `birak()` ile temizlenir.
- Veriyi yalnız abonelikten okur: `{ zaman, site, gunesVektoru, dunyaVektoru, ufukProfili, aydinlanma,
  dil, hareketAzalt }`. Kendi hesabını yapmaz, ağdan veri çekmez.
- `prefers-reduced-motion` ve mobil düşük güç durumunda sade moda geçer.
- Animasyon ekibine sahte veriyle çalışan örnek abonelik verilir; gerçek paket gelince yalnız kaynak değişir.

### 7.6 AI yorum ucu (`api/yorum.php`)
- Groq API'ye vekil. Groq anahtarı `public_html` dışında bir dosyada, tarayıcıya hiç gitmez.
- Uca yalnız hesaplanmış sayısal sonuç gider, serbest metin gitmez. Girdi şeması doğrulanır, istek sınırı
  uygulanır (tek sunucu, dosya tabanlı).
- **Üç katman:** hazır siteler ve demo senaryoları için önceden üretilmiş yorum (demo internete bağlı
  kalmaz); özel senaryo için canlı yorum (önbellekli); ikisi de olmazsa şablon metin.
- **Uydurma sayı kontrolü:** yorumdaki her sayı girdideki sayılarla karşılaştırılır; uyuşmayan varsa yorum
  atılır, yedek gösterilir.

### 7.7 Barındırma (cPanel)
- Derleme çıktısı `public_html`'e kopyalanır. Temiz adresler için `.htaccess` gerekir.
- PHP 8.4 var. Node gerekmez. Veritabanı yok.

## 8. Bir etkileşimde ne olur

**Planlayıcı'da gecikme kaydırıcısı çekilince:**
1. Durum deposunda fırlatma tarihi değişir, adres güncellenir.
2. Motor (Worker) kalkış modeliyle varış zamanını bulur (B18), parsel × gün tablosundan o güne ait
   metrikleri okur ve sıralar (B20).
3. Harita ve liste yeniden çizilir; "en uygun tarih" güncellenir.
4. Yeni sıralama hazır yorumlarla eşleşmiyorsa AI ucuna istek gider; cevap gelene kadar şablon metin görünür.

**Site Detay'da zaman oynatıcı ilerleyince:**
1. Durum deposunda saat değişir.
2. Motor gökyüzü tablosundan o anki Güneş ve Dünya konumunu alır, parselin ufkuyla karşılaştırır.
3. Panorama, geri sayımlar, zaman çizelgesi imleci ve 3B sahne aynı anda güncellenir.

## 9. Bilim ekibine bağımlılıklar

Bilimsel değerlerin ana kaynağı `docs/LUNARIS_bilim_parametre_seti.md` (KARAR, 2026-11-14); doğrulaması
`docs/parametre-seti-dogrulama.md`. Girdi durumu `docs/bilim-girdileri.md` (B1–B20). Bilim ekibine giden istek mektubu `docs/bilim-ekibine.md`.

| Neyi bekletiyor | Gereken girdiler |
|---|---|
| Hesabın doğrulanması | B1 SPICE, B2 LOLA, B5 aydınlanma tanımı, B6 ufuk yöntemi, B7 Dünya görünürlüğü, B11 doğrulama vakaları, B12 tolerans |
| Planlayıcı | B3 zaman aralığı, B4 parsel ağı, B9 metrikler, B13 siteler, B18 kalkış modeli, B20 sıralama |
| Uzman, Ana Sayfa, Görevler, Hakkında | B8, B10, B14, B15, B16, B17, B19 |

Bilim ekibinin literatür derlemesine dair okuma notları (yalnız bilgi): `docs/kaynak/bilim-derlemesi-notlar.md`.

## 10. Doğrulama ve test

- **Gök tarafı:** seçilen nokta ve zamanlarda bizim Güneş ve Dünya açılarımız Horizons'la karşılaştırılır.
- **Arazi tarafı:** Quickmap katmanları ve literatürdeki kutup aydınlanma değerleriyle karşılaştırılır.
- **İki uygulama riski:** geometri hem Python'da hem TypeScript'te var. Python başvurudur; TS motoru
  Python'un ürettiği `altin.json`'a karşı test edilir, tolerans B12. Fark tolerans dışındaysa derleme düşer.
- **Kabul:** hat için `pytest` borusuz yeşil; motor için altın dosya testi; web için gerçek tarayıcıda
  açılış, kaydırıcı ve dil değişimi, mobilde yatay kaydırma yok; AI ucu için anahtarın sızmadığı, sınır ve
  şema reddinin, API kapalıyken yedek metnin testi.
- Her sayının yanında neye karşı ölçüldüğü yazar (Horizons, literatür, simülasyon).

## 11. Repo yapısı (ÖNERİ; `web/` iskeleti 2026-11-14'te kuruldu)

```
bilim/           bilim ekibinin JSON girdileri (siteler, görevler, parametreler)
hat/             Python veri hattı; hat/ham/ indirilen ham veri (git dışı)
veri/<sürüm>/    üretilmiş paket (git dışı, manifest hariç)
web/             SvelteKit uygulaması
  src/routes/    sayfalar (/[dil]/...)
  src/lib/durum  tek saat ve senaryo deposu
  src/lib/motor  saf TS geometri, süzgeç, sıralama + testleri
  src/lib/sahneler  animasyon ekibinin sahneleri ve ARAYUZ.md
  src/lib/i18n   tr.json, en.json
api/             yorum.php (Groq vekili)
docs/            belgeler
```

## 12. Yol haritası

| Aşama | Ne | Bekliyor mu |
|---|---|---|
| 0 | Kurulum, mimari, sayfa planı, bilim istek listesi | **bitti** |
| 1 | **Şimdi yapılabilir:** (a) veri hattı pilotu: SPICE ile tek deneme noktası için Güneş ve Dünya konumu, Horizons'la karşılaştırma, tek ufuk hesabının süresinin ölçümü; (b) SvelteKit iskeleti: 7 boş sayfa, TR/EN, koyu tema, renk belirteçleri, `.htaccess`, cPanel'e deneme yüklemesi; (c) sahne arayüzü ve sahte veri; (d) `bilim/` JSON kalıpları; (e) Groq ucu iskeleti (sınır, yedek, uydurma kontrolü) | bilim verisi beklemez |
| 2 | Gerçek efemeris ve ufuk hattı, doğrulama tablosu, altın dosya, Site Detay | Öncelik 1 girdileri |
| 3 | Parsel ağı, metrikler, Planlayıcı, gecikme kaydırıcısı, en uygun tarih, Karşılaştır | Öncelik 2 girdileri |
| 4 | Uzman Analiz, Ana Sayfa göstergeleri, Görevler, Hakkında, rehberli tur, rapor | Öncelik 3 girdileri |
| 5 | Cilalama, `DEMO.md` kontrol listesi (demo 5 kez baştan sona), cPanel yayını | hepsi |

Aşama 1'deki işler birbirinden bağımsız; farklı kişiler aynı anda yapabilir. Aynı dosyaya iki kişi
aynı anda yazmasın; mümkünse herkes kendi dalında çalışsın.

## 13. Riskler ve yedek planlar

| Risk | Yedek plan |
|---|---|
| Bilim girdileri geç gelir | Hat ve site yer tutucuyla uçtan uca çalışır; değer gelince yalnız `bilim/` dosyaları değişir |
| Ufuk hesabı çok uzun sürer | Pilotla ölçülür; parsel büyütülür ya da bölge daraltılır |
| Veri paketi büyük çıkar | Parçalı yükleme, nicemleme; cPanel sınırıyla karşılaştırma |
| Kalkış noktası sonucu değiştirmez | B18 modeli gelmeden girdi ekranda durur ama etkisiz olduğu açıkça yazılır |
| Groq demo sırasında çöker | Önceden üretilmiş yorum ve şablon metin |
| İnternet yok | Yerel derleme ve ekran kaydı (`DEMO.md`) |
| TS ve Python sonuçları ayrışır | Altın dosya testi derlemeyi düşürür |

## 14. Belge haritası

| Ne | Nerede |
|---|---|
| Challenge, brif, NASA kaynakları (değişmez metinler) | `docs/kaynak/` |
| Problem, demo akışı, kapsam | `SPEC.md` |
| Mimari | `docs/mimari.md` |
| Sayfalar | `docs/sayfalar.md` |
| Tasarım sistemi ve tasarım skill'leri | `docs/tasarim.md` |
| Animasyon planı | `docs/animasyonlar.md` |
| Bilimsel parametreler ve formüller (ana kaynak) | `docs/LUNARIS_bilim_parametre_seti.md` |
| Bilim girdileri durumu · doğrulama | `docs/bilim-girdileri.md` · `docs/parametre-seti-dogrulama.md` |
| Bilim ekibine mektup | `docs/bilim-ekibine.md` |
| Bilim dışı açık sorular | `docs/acik-sorular.md` |
| Fikir geliştirme brifi ve fikir dosyaları | `docs/fikir-ajani-brifi.md`, `docs/fikirler/` |
| Teslim öncesi kontrol | `DEMO.md` |
| Proje kuralları (yapay zekâ ajanları için de) | `CLAUDE.md` |

## 15. Açık sorular

- Groq'ta hangi model ve bütçe (sonra karar verilecek)
- cPanel'de disk ve bant sınırı, alan adı
- Kalkış noktasının etkisinin modeli ve parsel sıralama yöntemi (bilim ekibi, B18, B20)

Güncel liste `docs/acik-sorular.md`.
