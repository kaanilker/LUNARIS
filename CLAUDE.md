# LUNARIS — proje kuralları

> Global kurallar `~/.claude/CLAUDE.md`'dedir, burada tekrarlanmaz. Yalnız bu projeye özgü ve uzun süre
> değişmeyen şeyler.

## Proje
LUNARIS (Lunar Illumination & Communication Analysis System): NASA Space Apps Challenge 2026 için Quasar
Team'in web aracı. Ay güney kutbunda iniş noktası ve tarihini Güneş (güç) ve Dünya (iletişim) koşullarına
göre hızlıca karşılaştırır. Kullanıcı: görev planlamacısı, eğitimci, halk; demo izleyicisi jüri.

Tür: ürün (web) + hackathon teslimi. Özellik teslim etmeden önce `/urun-bitti`; teslime yakın `/hackathon`.
Bilimsel sonuç raporlanırken ayrıca `/arastirma-bitti` (sabit girdi, neye karşı ölçüldüğü).

## Aşama
Şu an mimari aşaması: bilim ekibinin girdileri gelene kadar site yapılmaz. Açık iş `.ajan/aktif-is.md`.

## Belgeler ve sahipleri
| Ne | Tek sahibi |
|---|---|
| Challenge ve brif metni (değişmez) | `docs/kaynak/` |
| Problem, demo akışı, kapsam | `SPEC.md` |
| Mimari kararlar ve öneriler | `docs/mimari.md` |
| Bilimsel parametre, site, görev, tolerans | `docs/bilim-girdileri.md` (B1…) |
| Bilim dışı açık sorular | `docs/acik-sorular.md` (S1…) |
| Teslim öncesi kontrol | `DEMO.md` |
| Fikir ajanı brifi · onaylanmamış fikirler | `docs/fikir-ajani-brifi.md` · `docs/fikirler/` (ÖNERİ) |

## Bu projeye özgü kurallar
- **Bilimsel sayı uydurulmaz.** Koordinat, tarih, eşik, tolerans yalnız `docs/bilim-girdileri.md`'den
  gelir. Yoksa yer tutucu kalır ve arayüzde "yer tutucu" yazar. (Brif ilkesi.)
- **Abartılı ifade yok.** "Kesin", "nihai risk", "garanti" yazılmaz; sınırlama açıkça yazılır.
  (SOLARIS'ten çıkan ders, brif.)
- **Geometrinin başvurusu Python hattıdır.** TS motoru altın dosyaya karşı test edilir; iki yerde ayrı
  doğruluk yazılmaz (`docs/mimari.md` §8).
- **Renk:** Güneş amber, Dünya mavi; bu iki renk başka anlamda kullanılmaz.
- **İki dil:** kullanıcıya görünen her metin TR ve EN anahtar dosyasında; kodda düz metin yok.
- **AI yorumu** yalnız hesaplanan sonucu yorumlar, "AI üretimi" etiketi taşır, yedek metni vardır.
- Her sayının yanında neye karşı ölçüldüğü yazar (Horizons, literatür, simülasyon).

## Komutlar
Henüz kod yok. Yığın seçilince buraya ve `.ajan/test-komutu`'na yazılır.

## Git ve push
Uzak: `origin` = https://github.com/kaanilker/LUNARIS (herkese açık, GPL-2.0). Dal: `main`.
**KARAR (kullanıcı, 2026-11-14):** repo herkese açık kalır; brif ve mimari belgeleri repoda yayımlanır.

**KARAR (kullanıcı, 2026-11-14):** Bu projede push ajana açık; global "push kullanıcıda" kuralının
istisnası. Kullanıcının koşulu "bazı şeyler kesin bitince". Ajanın bu koşuldan çıkardığı ölçütler
(kullanıcı düzeltebilir):
- Bir iş bitti: `.ajan/aktif-is.md` içindeki KABUL karşılandı ya da kendi başına tamamlanmış bir parça var.
  Yarım iş (WIP) push edilmez.
- Doğrulama komutu borusuz koşuldu ve yeşil; çalışma ağacı temiz (K1).
- Repo herkese açık: push öncesi diff'te sır, `.env`, ham veri ya da bilim ekibinin yayımlanmamış verisi yok.
- `--force` yok, push edilmiş geçmiş yeniden yazılmaz.
- Push başarısızsa açıkça söylenir; sonucu `durum.md`'ye yazılır.

## Ortam
- Canlı ortam: yok. Sırlar (AI API anahtarı) `.env`'de, `.env` `.gitignore`'da.
- Ham veri (SPICE çekirdekleri, LOLA DEM) ve üretilmiş paket git'e girmez.

## Dosyalar
- Açık iş: `.ajan/aktif-is.md` · Son durum: `.ajan/durum.md` (yalnız `/kapanis` ile)
- Ölçülmüş dersler: `docs/dersler.md`
- `Claude-Sistem/`: çalışma sistemi kurulum paketi, projenin parçası değil (git'e girmez).
