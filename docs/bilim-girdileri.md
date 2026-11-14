# Bilim girdileri: takip listesi

> **KARAR (kullanıcı, 2026-11-14):** bilimsel parametrelerin, formüllerin ve kriterlerin **ana kaynağı**
> `docs/LUNARIS_bilim_parametre_seti.md`. Değerler orada yaşar, burada kopyalanmaz. Siteye entegrasyon
> kullanıcı kararlarına göre yapılır (`docs/sayfalar.md`, `docs/mimari.md`); parametre setindeki bir öneri
> kullanıcı kararıyla çelişirse kullanıcı kararı geçerlidir.
>
> Bu dosya yalnız B1–B20 girdilerinin nerede karşılandığını ve durumunu tutar. Doğrulama bulguları:
> `docs/parametre-seti-dogrulama.md` (B-1…B-9).
>
> Durumlar: **TASLAK** = parametre setinde var, bilim ekibi onaylamadı (değerlerin çoğu [T] ya da [G]).
> **ONAYLI** = bilim ekibi onayladı. **EKSİK** = parametre setinde yok ya da yarım.
> Kural değişmedi: bilinmeyen değer uydurulmaz; [G] değerler kaynak girilene kadar sitede "yer tutucu".

| Kod | Girdi | Parametre setinde | Durum | Not |
|---|---|---|---|---|
| B1 | SPICE çekirdekleri | Modül 0, §14 | TASLAK | DE440, MOON_ME, LT+S; dosya adları ve sürümleri indirmede kesinleşir |
| B2 | LOLA DEM ürünü | Modül 0, §14 | TASLAK | yakın 5 m, uzak 20–60 m; ürün adları yok |
| B3 | Zaman aralığı ve adımı | Modül 0 | TASLAK | |
| B4 | Parsel ağı | S.1, S.10, §12 | TASLAK | kaba ve ince ölçek pilot ölçümünden sonra kesinleşir |
| B5 | Aydınlanma tanımı | 0.4, S.4 | TASLAK | batış tanımıyla çelişki: doğrulama B-3 |
| B6 | Ufuk yöntemi | 0.3, S.10 | TASLAK | |
| B7 | Dünya görünürlüğü | 0.1, 4.1, Modül 4 | TASLAK | paralaks ve günlük libration metni: doğrulama B-1, B-2 |
| B8 | DSN istasyonları ve maske | Modül 4, S.5 | EKSİK | istasyon adları ve 10° maske var; koordinatlar yok (SPICE'tan alınabilir) |
| B9 | Metrik tanımları | S.4, Modül 7 | TASLAK | |
| B10 | Panel ve batarya modeli | 2.3, 3.1 | TASLAK | η_sis türetilmiş: doğrulama B-9 |
| B11 | Doğrulama vakaları | §12 | TASLAK | Horizons vakalarının nokta ve zamanları belirtilmemiş |
| B12 | Kabul toleransları | §12 | TASLAK | |
| B13 | Hazır siteler | §10 | EKSİK | 9 bölge tablosu var; kaynak veri dosyaları repoda yok, saha sayısı 78/130: doğrulama sayısal kontrol ve B-6 |
| B14 | 10 iniş görevi | §10 | EKSİK | 2/10 koordinat |
| B15 | İniş belirsizliği | Modül 1 | TASLAK | 100 m elips |
| B16 | Benzer parsel ölçütü | 7.2 | TASLAK | kosinüs benzerliği |
| B17 | Ana Sayfa ve Hakkında metinleri (TR/EN) | — | EKSİK | sınırlamalar listesi §16'da var |
| B18 | Kalkış modeli | S.7 | TASLAK | girdi: kalkış noktası + yol seçimi (KARAR 2026-11-14); profil süreleri teyit bekliyor |
| B19 | Ana Sayfa göstergeleri | S.6 | TASLAK | |
| B20 | Sıralama yöntemi | 7.1, S.8, Modül 7 | TASLAK | ağırlıklar onay bekliyor |

## Teslim biçimi

Makinece okunan girdiler `bilim/` klasörüne JSON ya da CSV olarak gelir; şablonlar `docs/bilim-ekibine.md`
§6'da. Parametre setinin andığı veri dosyaları (`wueller2026_130_saha.csv`, `saha_jeoloji.csv`) da
`bilim/` altına konmalı. Herkese açık repoya koymadan önce verinin lisansı kontrol edilir.
