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
| Stil aracı: **Tailwind CSS** | **KARAR** (kullanıcı, 2026-11-14; önceki kayıtlarda yazılı değildi, bu turda yazıldı) |
| Görsel referans: SOLARIS (solaris.quasacode.com) paleti ve şekil dili; zemin "siyah ama bu kadar koyu değil" | **KARAR** (kullanıcı, 2026-11-14) |
| Kesin renk değerleri, yazı tipleri, boşluk ölçeği | **KARAR** (ajan, yetkiyle, 2026-11-14, ikinci tur; §3) |
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

## 3. Tasarım belirteçleri (KARAR, ajan, yetkiyle, 2026-11-14, ikinci tur)

Değerlerin tek yeri `web/src/lib/stil/belirtecler.css` içindeki Tailwind `@theme` bloğu. Tailwind'in hazır renk
paleti kapalıdır (`--color-*: initial`); sınıflarda yalnız bu belirteçler geçer (`bg-yuzey`, `text-gunes`).
Bu tablo değer kopyalamaz, seçimin gerekçesini tutar.

**İlk turun sorunu (ölçüldü 2026-11-14 · ekran görüntüsü pikseli · CIELAB L\*):** LUNARIS zemini L\* 3,3,
renksiz ve kartlar zeminden ayrılmıyordu. SOLARIS zemini L\* 5–9 ama mora çalan lacivert tonda ve hafif
degradeli, kartları L\* yaklaşık 12. "Açık" hissi parlaklıktan çok ton ve katman farkından geliyor.

| Belirteç | Seçim | Gerekçe |
|---|---|---|
| `zemin`, `yuzey`, `yuzey-2`, `cizgi` | laciverde çalan koyu arduvaz (slate) katmanlar | SOLARIS'in kardeşi gibi durur; zemin, kart ve girdi katmanları arasında görünür fark (§4 ölçüt 10) |
| `cizgi-guclu` | açık arduvaz | form ve ikincil düğme kenarı; WCAG 1.4.11 için en az 3:1 |
| `metin`, `metin-ikincil` | slate-200 ve slate-400 tonları | her zeminde en az 4,5:1 |
| `gunes` amber, `dunya` gök mavisi | | yalnız §2 anlamında; kullanan dosyalar testteki izin listesinde |
| `vurgu` | menekşe | SOLARIS'in çivit vurgusuyla aile bağı; ton olarak amber ve gök mavisinden ayrı. Vurgu yalnız birincil düğme, etkin menü ve odak halkasında; mor degrade yazı ve parıltı yok (yapay zekâ görünümünün en tanıdık işareti) |
| `uyari` pembe-macenta, `hata` kırmızı, `basari` zümrüt | | parametre setinin macenta önerisi; renk her zaman simgeyle birlikte |
| Yazı tipleri | Outfit (başlık), Inter (gövde), IBM Plex Mono (kod ve girdi etiketi) | Outfit ve Inter SOLARIS'le aynı aile; sayılar Inter'in eşit genişlikli rakamlarıyla. Hepsi yerel paket, internetsiz demoda da yüklenir |
| Şekil dili | kart 12 px köşe, iç kutu 8 px, rozet tam yuvarlak; 1 px kenar; gölge yok | SOLARIS'teki ölçülmüş köşe değerleri (12, 8, 9999 px) |
| Simge | Lucide çizgi simgeleri, kart başında 32 px renkli kutu içinde | SOLARIS'in kart başı düzeni; renk anlamı simgeyle tekrarlanır |
| Izgara | 12 sütun, 24 px aralık, en çok 1280 px içerik; her panel sütun çizgisine oturur | rastgele konum yok (§4 ölçüt 11) |
| Yer tutucu biçimi | kart başında kesikli "Yer tutucu" rozeti, kartın içinde ortalanmış boş durum ve beklenen girdi kodu | eksik değer gerçek değerle karıştırılmaz (CLAUDE.md); notlar kartın dışına saçılmaz |

## 4. Kabul ölçütleri (ÖNERİ; 10–12 KARAR, ajan, yetkiyle, 2026-11-14)

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
10. Katmanlar ayrışır: zemin L\* 7 ile 12 arası (saf siyah değil), kart zeminden en az 3 L\* açık, girdi
    alanı karttan en az 3 L\* açık. `belirtecler.test.ts` ölçer.
11. Rastgele konum yok: her panelin sol ve sağ kenarı 12 sütunlu ızgaranın bir sütun çizgisine ±1 px oturur
    (masaüstü ve 375 px). `tests/sayfalar.e2e.ts` ölçer.
12. Tek şekil dili: görünen öğelerin köşe yarıçapı yalnız 0, 8, 12 px ya da tam yuvarlak; renkler yalnız
    belirteçlerden. Test ölçer.

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
