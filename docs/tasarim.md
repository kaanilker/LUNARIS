# Tasarım sistemi ve araçlar

> Görsel tasarımın tek sahip belgesi. Her tasarım işi ve her tasarım skill'i bu belgeye uyar; skill'in
> kendi zevki bu belgeyle çelişirse belge geçerlidir. Sayfa içerikleri `docs/sayfalar.md`'de.
> Güncellendi: 2026-11-14.

## 1. Durum özeti

| Konu | Durum |
|---|---|
| Koyu tema, sade ve bilimsel görünüm | **KARAR** (ekip brifi) |
| Güneş amber, Dünya mavi; bu renkler başka anlamda kullanılmaz | **KARAR** (ekip brifi) |
| Büyük başlık, kısa cümle, bol boşluk, paragraf yerine görsel | **KARAR** (ekip brifi) |
| Hazır "wow" efekti yok; gerçek veriyle çalışan özgün sahne | **KARAR** (ekip brifi) |
| Animasyon süs değil; zaman kaydırıcısıyla sahne, grafik ve metin birlikte değişir | **KARAR** (ekip brifi) |
| İki dil (TR/EN), mobilde açılır | **KARAR** (ekip brifi) |
| Ana Sayfa'da tam Ay küresi; bilgi kısa, yorum ağırlıklı | **KARAR** (kullanıcı, 2026-11-14) |
| Tasarım araçları (§5) | **KARAR** (kullanıcı onayı, 2026-11-14) |
| Kesin renk değerleri, yazı tipleri, boşluk ölçeği | **seçilmedi** (§3) |
| Kabul ölçütleri (§4) | **ÖNERİ** |
| Ürün metni kuralı: tireyle madde ve ara cümle dizilmez, düz cümle | **KARAR** (global kural) |

Kaynak: `docs/kaynak/LUNARIS_AGENT_BRIEF.md` "Tasarım yönü" ve "Bizim için önemli olan ilkeler".

## 2. Anlam renkleri (sabit kurallar)

- **Güneş: amber.** Güneş'in kendisi, izi, aydınlanma, güç ve enerji göstergeleri.
- **Dünya: mavi.** Dünya'nın kendisi, izi, görünürlük ve iletişim pencereleri.
- Bu iki renk başka hiçbir şey için kullanılmaz: düğme, bağlantı, seçim, uyarı ya da marka rengi olamaz.
  Arayüzün vurgu rengi ikisinden de ayrı seçilir.
- Karanlık ve gölge, koyu zeminin kendisiyle anlatılır; ayrı bir "karanlık rengi" gerekmez.
- Renk tek başına anlam taşımaz: güneşli, kısmi, karanlık durumları renk dışında desen, etiket ya da
  simgeyle de ayırt edilir (renk körlüğü).

## 3. Tasarım belirteçleri (seçilecek)

Değerler `web/` iskeletinde CSS değişkenleri olarak tek yerde tanımlanır. Henüz seçilmedi; seçimden önce
§4'teki ölçütler sağlanmalı.

| Belirteç | Değer | Not |
|---|---|---|
| `--zemin`, `--yuzey`, `--yuzey-2` | seçilecek | koyu tema katmanları |
| `--metin`, `--metin-ikincil` | seçilecek | zemine karşı karşıtlık §4 |
| `--gunes` (amber), `--gunes-soluk` | seçilecek | yalnız Güneş anlamında |
| `--dunya` (mavi), `--dunya-soluk` | seçilecek | yalnız Dünya anlamında |
| `--vurgu` | seçilecek | arayüz etkileşimi; amber ve maviden ayrı |
| `--uyari`, `--hata`, `--basari` | seçilecek | amber ve maviyle karışmayacak tonlar |
| Yazı tipleri (başlık, gövde, sayı) | seçilecek | sayılar için eşit genişlikli rakam |
| Boşluk ve yazı boyutu ölçeği | seçilecek | |
| Köşe yarıçapı, gölge, çizgi kalınlığı | seçilecek | |

## 4. Kabul ölçütleri (ÖNERİ)

Bir tasarım işi bunlar sağlanmadan bitmiş sayılmaz. Her biri ölçülebilir.

1. 375 px genişlikte hiçbir sayfada yatay kaydırma yok.
2. Metin karşıtlığı WCAG 2.2 AA: normal metin en az 4,5:1, büyük metin ve grafik öğeleri en az 3:1.
3. Dokunma hedefleri en az 24×24 CSS px (WCAG 2.2, 2.5.8).
4. `prefers-reduced-motion` açıkken sahneler sade moda geçer, otomatik animasyon durur.
5. Amber ve mavi yalnız §2'deki anlamlarda geçer (kod araması ve görsel inceleme).
6. Güneşli, kısmi ve karanlık durumları gri tonlamada da ayırt edilir.
7. Ana Sayfa'da ana soru ve iki düğme ilk ekranda, kaydırmadan görünür (masaüstü ve 375 px).
8. Her sayfa iki dilde taşma ve kesilme olmadan görünür (İngilizce ve Türkçe metin uzunlukları farklı).
9. Arayüze dokunan iş gerçek tarayıcıda açılarak denetlenir (§5, görsel denetim).

## 5. Tasarım araçları (KARAR, 2026-11-14)

| Rol | Araç | Neden |
|---|---|---|
| Üretim | **frontend-design** (Anthropic, `anthropics/skills`) | resmî; sıradan yapay zekâ görünümünden kaçınmaya yönlendirir |
| Kod denetimi | **web-design-guidelines** (Vercel, `vercel-labs/agent-skills`) | kurala dayalı; dosya ve satır bildirir; §4 ölçütleriyle uyumlu |
| Görsel denetim | Playwright ile tek bir inceleme skill'i: **impeccable** (`/critique`, `/polish`) ya da **web-design-reviewer** (`github/awesome-copilot`); hangisi olduğu kurulumdan önce içerik okunarak seçilir | gerçek tarayıcıda bakmadan arayüz işi bitmez |
| Grafikler | **dataviz** (Anthropic; bu oturumda kurulu) | Pareto, zaman çizelgesi, aylık görünüm, metrik kartları; renk ve renk körlüğü kuralları |

Kurulmayanlar: **ui-ux-pro-max** (büyük stil ve palet kataloğu sabit renklerimizle çelişir),
**taste-skill** (frontend-design ile aynı rolde; ikisi çelişen kurallar verir).

Kurulum kuralları:
- Üçüncü taraf skill kurulmadan önce `SKILL.md` ve betikleri okunur; hook çalıştıran varsa ne yaptığı
  yazılır. Belirli bir commit ya da sürüme sabitlenir.
- Proje düzeyinde `.claude/skills/` altına kurulur ki ekip ve ajanlar aynı araçları kullansın.
- 3B sahneler (Ay küresi, ufuk panoraması, astronot görünümü) bu araçların kapsamında değil; animasyon
  ekibinin işi ve sahne arayüzüne bağlı (`docs/mimari.md` §5).

## 6. Zevk tartışması çıkarsa

Tek bir bileşen (ör. Site Detay geri sayım kartı) farklı yaklaşımlarla üretilir, §4 ölçütleriyle yan yana
karşılaştırılır, kazanan tutulur. Ölçütsüz tasarım turu açılmaz.
