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
| Challenge, brif ve NASA kaynak metni (değişmez) | `docs/kaynak/` |
| Problem, demo akışı, kapsam | `SPEC.md` |
| Yazılım ekibi için projenin tamamının özeti (sahip belgelere bağlanır) | `docs/proje-taslagi.md` |
| Mimari kararlar ve öneriler | `docs/mimari.md` |
| Sayfa yapısı ve adresler | `docs/sayfalar.md` |
| Görsel tasarım, belirteçler, kabul ölçütleri, tasarım skill'leri | `docs/tasarim.md` |
| Bilimsel parametre, site, görev, tolerans | `docs/bilim-girdileri.md` (B1…) |
| Bilim ekibine istek mektubu (durum tutmaz) | `docs/bilim-ekibine.md` |
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
- **Renk:** Güneş amber, Dünya mavi; bu iki renk başka anlamda kullanılmaz (`docs/tasarim.md` §2).
- **İki dil:** kullanıcıya görünen her metin TR ve EN anahtar dosyasında; kodda düz metin yok.
- **AI yorumu** yalnız hesaplanan sonucu yorumlar, "AI üretimi" etiketi taşır, yedek metni vardır.
- Her sayının yanında neye karşı ölçüldüğü yazar (Horizons, literatür, simülasyon).

## Komutlar
Yığın: ön yüz SvelteKit + TypeScript + Three.js (statik), veri hattı Python, AI ucu PHP
(`docs/mimari.md` §3, §6, §7). Test komutu ilk testler yazılınca buraya ve `.ajan/test-komutu`'na yazılır.
```
python3 -m venv .venv && .venv/bin/python -m pip install -r hat/requirements.txt   # veri hattı ortamı
.venv/bin/python ...                                                                # hep bu yorumlayıcı
```
Makinede Node 22 var (ön yüz için).

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
- Canlı ortam: henüz yok; site bitince cPanel'e yüklenecek. AI yorumu Groq API ile.
- Sırlar (Groq anahtarı) yerelde `.env`'de, `.env` `.gitignore`'da; cPanel'de `public_html` dışında.
- Ham veri (SPICE çekirdekleri, LOLA DEM) ve üretilmiş paket git'e girmez.

## Dosyalar
- Açık iş: `.ajan/aktif-is.md` · Son durum: `.ajan/durum.md` (yalnız `/kapanis` ile)
- Ölçülmüş dersler: `docs/dersler.md`
- `Claude-Sistem/`: çalışma sistemi kurulum paketi, projenin parçası değil (git'e girmez).
