# Açık sorular (bilim dışı)

> Bilimsel parametreler burada değil, `docs/bilim-girdileri.md`'dedir. Cevap gelince satır KARAR olur,
> ilgili belge aynı turda düzeltilir, soru buradan silinir.

| Kod | Soru | Kimde | Ajanın önerisi |
|---|---|---|---|
| S6 | Veri paketi nerede barınacak (git dışı, boyutu ölçülünce) | yazılım ekibi | Boyut ölçülünce karar |
| S7 | Groq'ta hangi model, aylık bütçe ya da istek sınırı (kullanıcı: sonra karar verilecek) | kullanıcı | Önceden üretilmiş yorum varsayılan, canlı uç isteğe bağlı |
| S8 | cPanel barındırıcısı: Node var mı, disk ve bant sınırı, alan adı (PHP 8.4, kullanıcı 2026-11-14) | kullanıcı | PHP ucu; boyut ölçülünce karşılaştırılır |

## Kapanan
- S1 teslim tarihi: kullanıcı takip edilmesini istemedi (KARAR, 2026-11-14).
- S3 barındırma: cPanel; AI sağlayıcısı Groq (KARAR, 2026-11-14). Ayrıntı `docs/mimari.md` §6, §7.
- S5 kalkış noktası: Dünya'daki fırlatma noktası; brifteki "Ay'daki bölge merkezi" yorumu geçersiz (KARAR, 2026-11-14). Etkisinin modeli B18.
- S2 ön yüz çatısı: SvelteKit + TypeScript + Three.js, statik çıktı (KARAR, 2026-11-14; `docs/mimari.md` §7).
- S9 görev süresi: fırlatmadan Ay'a inişe kadar geçen yolculuk süresi (KARAR, 2026-11-14). Kullanıcının
  gerekçesi: yanlış zamanda fırlatılırsa rota çok uzar ("10 katına falan", kullanıcı ifadesi; tahmin,
  bilim ekibi B18 ile doğrulayacak).
- S4 GitHub: `origin` bağlandı; repo herkese açık kalacak (KARAR, 2026-11-14).
