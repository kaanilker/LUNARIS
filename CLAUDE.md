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
Bilim girdileri taslak olarak geldi (parametre seti, 2026-11-14; bilim ekibi onayı bekleniyor).
Sıradaki işler veri hattı pilotu ve site iskeleti. Açık iş `.ajan/aktif-is.md`.

## Belgeler ve sahipleri
| Ne | Tek sahibi |
|---|---|
| Challenge, brif ve NASA kaynak metni (değişmez) | `docs/kaynak/` |
| Problem, demo akışı, kapsam | `SPEC.md` |
| Yazılım ekibi için projenin tamamının özeti (sahip belgelere bağlanır) | `docs/proje-taslagi.md` |
| Mimari kararlar ve öneriler | `docs/mimari.md` |
| Sayfa yapısı ve adresler | `docs/sayfalar.md` |
| Planlayıcı hesabı: aday doğrulama, en iyi tarih önerisi | `docs/oneri-ve-dogrulama.md` |
| Görsel tasarım, belirteçler, kabul ölçütleri, tasarım skill'leri | `docs/tasarim.md` |
| Hangi sayfada hangi animasyon, sahibi, durağan karşılığı | `docs/animasyonlar.md` |
| Bilimsel parametre, formül, kriter (ana kaynak) | `docs/LUNARIS_bilim_parametre_seti.md` |
| Bilim girdilerinin takibi (B1…B20) · doğrulama bulguları | `docs/bilim-girdileri.md` · `docs/parametre-seti-dogrulama.md` |
| Bilim ekibine istek mektubu (durum tutmaz) | `docs/bilim-ekibine.md` |
| Bilim dışı açık sorular | `docs/acik-sorular.md` (S1…) |
| Teslim öncesi kontrol | `DEMO.md` |
| Fikir ajanı brifi · onaylanmamış fikirler | `docs/fikir-ajani-brifi.md` · `docs/fikirler/` (ÖNERİ) |

## Karar yetkisi
**KARAR (kullanıcı, 2026-11-14):** Teknik ve tasarım ayrıntılarında ajan karar verir ve uygular; kullanıcıya
sormaz. Kapsam: çizim ve gösterim biçimi, kütüphane ve araç seçimi, adres ve dosya yapısı, algoritma
ayrıntısı, tasarım belirteçlerinin `docs/tasarim.md` §4 ölçütleriyle seçimi. Ajan bunları sahip belgeye
"KARAR (ajan, yetkiyle)" etiketi ve tek cümle gerekçeyle yazar.
Kapsam dışı, kullanıcıya sorulur: ürün kapsamı ve yön (yeni sayfa ya da özellik, Planlayıcı girdileri,
parametre setinin önerdiği ek özellikler), geri alması pahalı ya da dışa dönük adımlar. Bilimsel değer ve
yöntem bilim ekibinden gelir (parametre seti).

## Bu projeye özgü kurallar
- **Bilimsel sayı uydurulmaz.** Koordinat, tarih, eşik, tolerans yalnız parametre setinden
  (`docs/LUNARIS_bilim_parametre_seti.md`) gelir; sitede kullanım biçimini kullanıcı kararları belirler. Yoksa yer tutucu kalır ve arayüzde "yer tutucu" yazar. (Brif ilkesi.)
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
(`docs/mimari.md` §3, §6, §7). Test komutu `.ajan/test-komutu`'nda (web: birim testi, derleme, gerçek tarayıcı testi).
```
python3 -m venv .venv && .venv/bin/python -m pip install -r hat/requirements.txt   # veri hattı ortamı
.venv/bin/python ...                                                                # hep bu yorumlayıcı
```
Makinede Node 22 var (ön yüz için). Paket kurulumu `npx npm@11.6.2 install` ile (`docs/dersler.md`).
```
cd web && npx vitest --run && npm run build && npx playwright test   # web kabulü (Apache: httpd gerekir)
```

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
