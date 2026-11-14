# LUNARIS mimarisi

> Durum: **ÖNERİ** (2026-11-14, ajan). Kullanıcı onayladıkça maddeler **KARAR** olur ve tarihiyle
> işaretlenir. Bilimsel parametrelerin tek sahibi `docs/bilim-girdileri.md`; burada sayı yazılmaz,
> oraya bağlantı verilir. Kaynak brif: `docs/kaynak/LUNARIS_AGENT_BRIEF.md`.

## 1. Ana fikir: ağır hesap çevrimdışı, tarayıcıda yalnız okuma ve basit geometri

Brifin hız ilkesi ("Analyzing..." ekranı yok) ve challenge'ın "pre-computed datasets" önerisi aynı
sonuca çıkıyor: SPICE ve LOLA hesapları bir Python veri hattında önceden yapılır, tarayıcıya sürümlü
statik veri paketi olarak gelir. Tarayıcı hesap motoru değil, okuyucu ve süzgeçtir.

Bu bölünmeyi mümkün kılan geometri gözlemi (çıkarım, bilim ekibi onaylamalı):

- **Gök tarafı siteden bağımsızdır.** Güneş'in ve Dünya'nın Ay'a sabit çerçevedeki (ör. `MOON_ME`)
  konum vektörleri her zaman adımı için tek bir tablodur. Libration bu çerçevenin yöneliminde
  (binary PCK) kendiliğinden hesaba girer.
- **Yer tarafı zamandan bağımsızdır.** Bir noktanın ufuk profili (her azimut için arazinin yükseldiği
  açı) LOLA'dan bir kez çıkarılır, tarihle değişmez.
- **İkisinin buluşması ucuzdur.** Site konum vektörü çıkarılır (Dünya için paralaks önemlidir, bu yüzden
  yön değil konum vektörü saklanır), yerel doğu-kuzey-yukarı çerçevesine döndürülür, azimut ve yükseklik
  bulunur, o azimuttaki ufuk açısıyla karşılaştırılır. Bu, nokta başına zaman adımı başına birkaç işlem.

Sonuç: Site Detay sayfası için Güneş/Dünya izleri tarayıcıda anlık hesaplanabilir. Sıralama gibi çok
noktalı işler için günlük özet metrikler hat tarafında önceden çıkarılır.

## 2. Katmanlar

```
bilim/            Bilim ekibinin girdileri (siteler, görevler, parametreler). Tek sahip: bilim ekibi.
   │
hat/              Python veri hattı, çevrimdışı. Tek doğruluk kaynağı: geometri burada tanımlanır.
   │  efemeris     SPICE çekirdekleri → zaman adımı başına Güneş/Dünya konum vektörleri (Ay sabit çerçeve)
   │  ufuk         LOLA DEM → nokta başına 360° ufuk profili (Ay eğriliği dahil)
   │  metrik       ufuk + efemeris → aydınlanma oranı, kısmi disk, Dünya görünürlüğü, DSN penceresi
   │  ozet         nokta × gün özetleri (sıralama, gecikme kaydırıcısı, aylık görünüm, belirsizlik)
   │  dogrulama    Horizons ve literatüre karşı karşılaştırma → sonuclar/dogrulama-<kosu>.json
   │  paket        sürümlü statik paket + manifest
   ▼
veri/<surum>/     Üretilmiş paket. Git'e girmez (boyut); manifest ve özet sağlaması girer.
   │
web/              Statik ön yüz (TR/EN). Paketi okur, süzer, sıralar, çizer.
   │  durum        Tek zaman/senaryo deposu. URL ile eşlenir (paylaşım linki).
   │  motor        Saf TS: ufuk × efemeris geometrisi, süzgeç, sıralama. Arayüzden ayrı, test edilir.
   │  sahneler     Animasyon ekibinin 3B sahneleri. Veriyi yalnız "sahne arayüzü"nden alır (§5).
   │  sayfalar     Ana sayfa, Planlayıcı, Gelişmiş, Site Detay, Görevler, Yöntem, Tur
   ▼
api/              Yalnız AI yorumu için küçük PHP ucu, Groq'a vekil (§6). Site onsuz da tam çalışır.
```

## 3. Veri hattı (hat/)

- **Dil:** Python. SPICE için `spiceypy`, raster için `rasterio`/`numpy`. Kesin sürümler kurulumda
  `requirements.txt`'ye sabitlenir.
- **Belirlenimci:** Rastgelelik yok; aynı girdi aynı paketi üretir. Manifest şunları taşır: çekirdek
  listesi ve sağlamaları, DEM ürünü ve sağlaması, zaman aralığı ve adımı, ızgara tanımı, hat commit'i.
- **Çekirdek ve DEM seçimi** bilim ekibindedir (`docs/bilim-girdileri.md` B1, B2). Ham dosyalar
  `hat/ham/` altına indirilir, git'e girmez; indirme betiği URL ve sağlama ile birlikte repoda durur.
- **Ufuk hesabı** en pahalı adımdır. Izgara çözünürlüğü, ufuk tarama yarıçapı ve azimut adımı ölçülmeden
  süre ve boyut tahmini yapılmaz. İlk iş küçük bir pilotla (tek site, tek ufuk) süreyi ölçmektir.
- **Güneş diski:** Güneş nokta değil disktir; ufka yakın yükseklikte kısmi aydınlanma önemlidir. Tanım
  (disk kesri mi, merkez mi) bilim ekibinden gelir (B5).
- **Dünya görünürlüğü** iki katmanlıdır: (a) Dünya sitenin ufkunun üstünde mi, (b) en az bir DSN
  istasyonu Ay'ı kendi maske açısının üstünde görüyor mu. Gerçek iletişim penceresi (a) ve (b)'nin
  kesişimidir (B7, B8).

## 4. Veri paketi (veri/<surum>/)

ÖNERİ biçim; boyutlar ölçülmeden kesinleşmez.

| Dosya | İçerik | Kullanan |
|---|---|---|
| `manifest.json` | sürüm, kaynaklar, sağlamalar, birimler, zaman ekseni | hepsi |
| `efemeris.bin` | zaman adımı başına Güneş ve Dünya konumu (Ay sabit çerçeve, km), Float64 | motor |
| `siteler.json` | hazır siteler: ad, koordinat, kaynak, ufuk profili | Detay, Görevler |
| `izgara/ufuk-<parca>.bin` | ızgara noktalarının ufuk profilleri, nicemlenmiş | özel koordinat, belirsizlik |
| `izgara/ozet-<parca>.bin` | nokta × gün metrikleri | Planlayıcı, gecikme, aylık |
| `dsn.bin` | zaman adımı başına istasyon görünürlüğü | Gelişmiş, Detay |
| `dogrulama.json` | Horizons/literatür karşılaştırması, fark ve kaynak | Görevler, Yöntem |

Parçalı yükleme: Planlayıcı yalnız seçilen bölgenin parçalarını ister. Paket sürümü URL'de taşınır;
eski paylaşım linki eski sürümle açılır ya da kullanıcıya sürüm farkı söylenir.

## 5. Sahne arayüzü (animasyon ekibiyle sözleşme)

Animasyon ekibi sahneleri ayrı hazırlıyor; sahneler veriyi siteden alacak (brif). Bağlantıyı tek bir
sözleşmeye indirmek, iki ekibin birbirini beklemeden çalışmasını sağlar.

- Sahne bir modüldür: `bagla(kap, abonelik)` ile kurulur, `birak()` ile temizlenir.
- Sahne veriyi yalnız abonelikten okur: `{ zaman, site, gunesVektoru, dunyaVektoru, ufukProfili,
  aydinlanma, dil, hareketAzalt }`. Kendi hesap yapmaz, ağdan veri çekmez.
- Zaman oynatıcı tek yerdedir (`web/durum`); panorama, grafik, kart ve 3B sahne aynı saati dinler.
- `prefers-reduced-motion` ve mobil düşük güç durumunda sahne sade moda geçer.
- Animasyon ekibine sahte veriyle çalışan bir örnek abonelik verilir; gerçek paket gelince yalnız
  kaynak değişir.

Ayrıntılı tip tanımı, ön yüz çatısı seçildikten sonra `web/src/sahneler/ARAYUZ.md`'ye yazılır.

## 6. AI yorumları

Kurallar brifte (yalnız hesaplanan sonucu yorumlar, boş kutu yok, "AI üretimi" etiketi).

**KARAR (kullanıcı, 2026-11-14):** AI sağlayıcısı Groq API. Model ve bütçe açık (`docs/acik-sorular.md` S7).
**ÖNERİ:** Uç cPanel'de PHP ile yazılır (`api/yorum.php`), çünkü cPanel'de PHP neredeyse her zaman vardır
ve Node desteği barındırıcıya bağlıdır (çıkarım, S8 ile doğrulanacak). Groq anahtarı `public_html`
dışındaki bir dosyadan okunur, tarayıcıya hiç gitmez. İstek sınırı tek sunucuda dosya tabanlı tutulur.

Mimari:

1. **Önceden üretilmiş yorumlar** (varsayılan): hazır siteler ve demo senaryoları için yorumlar paket
   üretilirken bir kez oluşturulur, insan gözünden geçer, pakete girer. Demo internet ya da API'ye
   bağlı kalmaz.
2. **Canlı yorum** (özel senaryo): `api/yorum` ucuna yalnız sayısal sonuç nesnesi gider, serbest metin
   gitmez. Yanıt senaryo özetinin sağlamasıyla önbelleğe alınır. API anahtarı yalnız sunucuda durur.
   İstek sınırı ve girdi şeması doğrulaması uçta yapılır.
3. **Yedek:** her iki yol da başarısızsa şablon metin (sayılar yerine konur) gösterilir.

Yorumda modelin uydurduğu sayıyı yakalamak için: çıktıdaki her sayı girdideki sayılarla karşılaştırılır,
eşleşmeyen sayı varsa yorum atılır ve yedek gösterilir.

## 7. Ön yüz

- **Statik site.** Sunucu durumu yok; herhangi bir statik barındırıcıda çalışır.
  **KARAR (kullanıcı, 2026-11-14):** site bitince cPanel'e yüklenir (Apache). Derleme çıktısı
  `public_html`'e kopyalanır. Temiz adresler için `.htaccess` yönlendirmesi gerekir (ÖNERİ).
  Veri paketinin boyutu barındırıcının disk ve bant sınırıyla karşılaştırılır (S8).
- **Senaryo URL'de:** site(ler), tarih, gecikme, süzgeçler, dil. Paylaşım linki budur, veritabanı yok.
- **Ağır iş Web Worker'da:** paket çözme ve sıralama ana iş parçacığını kilitlemez.
- **İki dil:** metinler anahtar-değer dosyalarında (`tr.json`, `en.json`); kodda metin yok.
- **Renk sözleşmesi:** Güneş amber, Dünya mavi; bu iki renk başka anlamda kullanılmaz. Tasarım
  belirteçlerinde (CSS değişkenleri) tek yerde tanımlanır.
- **Rapor:** tek sayfalık çıktı tarayıcının yazdırma görünümüyle üretilir (ayrı PDF sunucusu yok).
- **Çatı:** açık soru (`docs/acik-sorular.md` S2). ÖNERİ: Vite + TypeScript + Three.js.

## 8. İki uygulama riski ve önlemi

Geometri hem Python'da (hat) hem TypeScript'te (motor) yazılırsa iki doğruluk kaynağı olur.
Önlem: Python başvurudur. Hat, sabit girdilerle bir **altın dosya** üretir
(`veri/<surum>/altin.json`: birkaç site × zaman için beklenen azimut, yükseklik, aydınlanma).
TS motorunun testi bu dosyaya karşı koşar; tolerans bilim ekibinden gelir (B12). Fark tolerans dışındaysa
derleme düşer.

## 9. Doğrulama hattı

- **Horizons:** seçilen site ve zamanlar için Horizons'tan Güneş ve Dünya azimut/yükseklik alınır
  (Ay yüzeyinde kullanıcı tanımlı konum). Bizim değerle fark tabloya girer. Horizons arazi ufku
  hesaplamaz; bu karşılaştırma yalnız gök tarafını doğrular.
- **Arazi tarafı:** literatürdeki kutup aydınlanma çalışmalarıyla karşılaştırılır. Hangi çalışmalar ve
  hangi değerler, bilim ekibinden gelir (B11).
- **Görevler bölümü:** her görevin tarihi ve konumu aynı hattan geçer; sonuç `dogrulama.json`'a girer.
- Her karşılaştırma satırı neye karşı ölçüldüğünü taşır (Horizons, makale, simülasyon).

## 10. Test ve kabul (ilk sürüm hedefi)

| Katman | Kabul |
|---|---|
| hat | `pytest` borusuz yeşil; altın dosya yeniden üretildiğinde değişmiyor |
| motor | birim testi altın dosyaya karşı yeşil |
| web | gerçek tarayıcıda açılış, tarih kaydırıcısı ve dil değişimi; mobil genişlikte yatay kaydırma yok |
| api | anahtar istemciye sızmıyor; sınır ve şema reddi testli; yedek metin API kapalıyken görünüyor |

Hız hedefi (tarih değişince yeniden çizim süresi) ölçülmeden sayı yazılmaz; ilk iskelette ölçülür.

## 11. Challenge kaynaklarının rolleri

**KARAR (kullanıcı, 2026-11-14):** challenge'ın sunduğu dört kaynağın hepsi kullanılır
(`docs/kaynak/nasa-kaynaklari.md`). Aşağıdaki roller **ÖNERİ**dir. "Doğrulanacak" yazan yetenekler henüz
kaynağın kendisinde denenmedi (çıkarım).

| Kaynak | Rolü | Sitede nerede görünür |
|---|---|---|
| **JPL Horizons** | Gök tarafının bağımsız doğrulaması: seçilen site ve zamanlarda Güneş ve Dünya azimut/yüksekliği, bizim SPICE sonucumuzla fark (§9). Her site ve tarih için "Horizons'ta aç" bağlantısı, uzman tek tıkla kontrol edebilsin. Horizons API'nin Ay yüzeyinde kullanıcı koordinatıyla gözlemci kabul ettiği **doğrulanacak**. | Yöntem ve Doğrulama tablosu, Site Detay (uzman katmanı) |
| **Quickmap** | Arazi tarafının görsel karşılaştırması: bizim ufuk ve aydınlanma sonucumuzla Quickmap'teki LRO/LOLA katmanları. DEM ürünü seçiminde (B2) başvuru. Her site için "Quickmap'te aç" bağlantısı. Kutup aydınlanma katmanı ve koordinatlı bağlantı biçimi **doğrulanacak**. | Yöntem ve Doğrulama, Site Detay |
| **Moon Trek** | 3B bağlam: sitenin geniş arazi görünümü için "Moon Trek'te aç" bağlantısı. Animasyon ekibi için doku ya da yükseklik karosu kaynağı olabilir; karo servisi ve kullanım koşulları **doğrulanacak**. | Site Detay, Ana Sayfa sahnesi (karo kullanılırsa) |
| **CSA Moon Exploration** | Eğitim içeriği: geçmiş ve gelecek görevler, Artemis'e katkılar. Görev listesine (B14) ve anlatıya kaynak. | Görevler, Ana Sayfa anlatısı, Yöntem (kaynakça) |

İlke: bu araçların yerini almıyoruz. Brif ve challenge onları "ayrıntılı analiz için" sayıyor. LUNARIS
hızlı karşılaştırma yapar ve ayrıntı için kullanıcıyı doğru konum ve tarihle bu araçlara gönderir.

## 12. Bilerek dışarıda bırakılanlar (ÖNERİ)

- Tarayıcıda SPICE çalıştırmak: paket boyutu ve karmaşıklık; tablo yeterli.
- Kullanıcı hesabı, veritabanı: paylaşım URL ile çözülüyor.
- Gerçek zamanlı sunucu hesabı: hız ilkesine ve tek sunucu kuralına aykırı.
