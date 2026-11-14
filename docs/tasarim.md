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
| Görsel referans: SOLARIS (solaris.quasacode.com) şekil dili | **KARAR** (kullanıcı, 2026-11-14) |
| Palet koyu laciverde ve siyaha kayar (ikinci turdaki arduvaz yerine) | **KARAR** (kullanıcı, 2026-11-14, üçüncü tur) |
| Mor kalkar; palet Ay'a yakın olur | **KARAR** (kullanıcı, 2026-11-14, dördüncü tur) |
| Yapay zekâ işi görünüm işaretleri web'den araştırılır ve site ona göre düzeltilir (§3a) | **KARAR** (kullanıcı, 2026-11-14) |
| Tasarım skill'i: **frontend-design** kurulur ve kullanılır | **KARAR** (kullanıcı, 2026-11-14); `.claude/skills/frontend-design/`, commit `2c5958e` |
| 21st.dev bileşenleri kullanılır | **KARAR** (kullanıcı, 2026-11-14); bağlantı kullanıcının API anahtarını bekliyor (§5) |
| Kesin renk değerleri, yazı tipleri, boşluk ölçeği | **KARAR** (ajan, yetkiyle, 2026-11-14, üçüncü tur; §3) |
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

## 3. Tasarım planı ve belirteçler (KARAR, ajan, yetkiyle, 2026-11-14, dördüncü tur)

frontend-design skill'inin süreciyle yazıldı: plan, plana karşı denetim, kod, ekran görüntüsüyle eleştiri.
Değerlerin tek yeri `web/src/lib/stil/belirtecler.css` içindeki Tailwind `@theme` bloğu; Tailwind'in hazır renk
paleti kapalı (`--color-*: initial`). Bu bölüm değer kopyalamaz, kararın gerekçesini tutar.

**Konu ve dil.** Ay güney kutbunda iniş planlama aracı; kullanıcı görev planlamacısı, izleyici jüri. Konunun kendi
dünyası: ufkun hemen üstünde yatay giden Güneş, uzun gölgeler, kutup stereografik haritası, efemeris tabloları,
görev kontrol konsolu. Ayırt edici öğe buradan seçildi: **ufuk çizgisi**. Her sayfanın başı, 0°'den 360°'ye azimut
işaretli ince bir ufukla biter; Ana Sayfa'da bu çizgi bütün genişliği kaplar. Cesaret yalnız burada harcanır,
gerisi sakin.

**Renk: Ay'da renk yoktur (kullanıcı: mor kalksın, Ay'a yakın palet).** Gökyüzü siyah, yüzey gri regolit, ışık
gümüş; sahnede renkli olan yalnız Güneş ve Dünya. Palet bunu aynen taşır: `zemin` gökyüzü (laciverde çok hafif
çalan siyah, L\* 1,9), `yuzey` ve `yuzey-2` koyu regolit grisi (panel, girdi), `metin` ay ışığı, `metin-ikincil`
regolit grisi, `vurgu` ay gümüşü (birincil düğme, etkin menü, odak halkası). Böylece sitedeki tek renkli öğeler
amber Güneş ve mavi Dünya olur; §2'deki renk kuralı tasarımın ana fikrine dönüşür. Mor yok.

**Yazı.** Tek aile, iki rol: **Archivo** değişken yazı tipi. Başlıklar genişlik ekseninde açık (`font-stretch`
%118) ve yarı kalın: mühendislik çizimi ve görev yaması etiketi gibi; gövde normal genişlikte. Sayılar eşit
genişlikli rakamla aynı aileden; ayrı eşit genişlikli yazı tipi yok.

**Yerleşim.** Sola hizalı. Bilgi bölümleri iki sütunlu: solda bölüm başlığı (3 sütun), sağda içerik (9 sütun),
aralarında ince yatay çizgi. Bu bir teknik rapor düzeni. Kart yalnız enstrümana verilir: gösterge, harita, tablo,
form. Metin bölümleri kart değildir; böylece hiyerarşi kart ile düz yüzey arasındaki farktan okunur.

```
[logo] [menü ...............................] [dil] [tur]
Hangi gün, hangi                         ( tel kafes Ay )
noktaya inmeli?
paragraf
[Planlamaya başla] [Turu başlat]
K────┼────┼────D────┼────┼────G────┼────┼────B────┼────┼────K   ufuk 0°
─────────────────────────────────────────────────────────────
Güney kutbu şu an  │ [gösterge] [gösterge] [gösterge]
                   │ [yorum ...........................]
─────────────────────────────────────────────────────────────
Kutbu anlamak      │ 1 başlık  [görsel yeri]   2 başlık [görsel yeri]
```

**Plana karşı denetim (skill'in "varsayılan" listesi).** Önceki turda bulunup bu turda kaldırılanlar:
büyük harfli ve harf aralığı açılmış üst etiketler; orta noktayla birleştirilmiş meta yazılar ("A · B · C");
düğme metnine eklenen ok; her bloğu aynı karta bölen ve degrade yıkamalı SaaS kart düzeni; küçük veri
etiketlerinde eşit genişlikli yazı tipi; Inter; sayfa başlığını tekrarlayan hap etiket; her kart başında renkli
simge kutusu (renkli kutu artık yalnız Güneş ve Dünya göstergelerinde, anlam taşıdığı yerde). Bilerek tutulan:
koyu zemin ve lacivert ton (kullanıcı kararı), anlatı bölümlerindeki sıra numarası (içerik gerçekten sıralı bir
anlatı).

**Şekil.** Kart 6 px, iç kutu 4 px, rozet tam yuvarlak; 1 px kenar; gölge, degrade, bulanık cam yok. Mühendislik
aracı sertliği; her öğede aynı yuvarlak köşe olmasın diye kademeli. Hareket yalnız kullanıcı eylemine yanıt olarak.

**Okuma şeridi.** Yan yana aynı göstergeler üç ayrı kart değil, tek panelde dikey çizgilerle bölünmüş bir konsol
okuma şerididir. Simge yalnız işlevi olan yerde (oynat, yazdır, dış bağlantı, dil) ve anlam taşıyan Güneş ve
Dünya işaretinde ve menüde (menü simgeleri kullanıcı isteğiyle geri geldi, 2026-11-14); panel başlıklarında simge yok.
Hareket kuralları `docs/animasyonlar.md` §1a.

**Yer tutucu.** Kesikli kenarlı "Yer tutucu" rozeti ve kısa açıklama; beklenen girdiler virgülle yazılır. Panel
içinde ikinci bir çerçeve çizilmez (kart içinde kart); kesikli çerçeve yalnız panel dışındaki boş görsel yerinde.

### 3a. Yapay zekâ işi görünüm işaretleri (araştırma, 2026-11-14)

Kaynaklar çoğunlukla tasarım ajansı ve araç blogu; bağımsız ölçüm yok, liste sezgisel (kaynaklar da bunu yazıyor).
Ama listeler büyük ölçüde örtüşüyor. Okunanlar: Laith0003/ux-skill "Anti AI slop ban list", Nutlope/hallmark
anti-pattern kataloğu, 925studios "AI slop design tells", Fountain Institute "7 tells", utsubo "12 signals",
21st.dev "website not look AI generated", frontend-design SKILL.md.

| İşaret | LUNARIS'te durum (dördüncü tur) |
|---|---|
| Mor-mavi degrade, mor vurgu | kaldırıldı; vurgu ay gümüşü |
| Inter her yerde | kaldırıldı (üçüncü tur); Archivo |
| Logo solda, bağlantılar, sağda düğme, ekrana yapışık bulanık şerit | menü yapışık ve bulanık değil, bağlantılar logonun yanında, sağda düğme yerine metin bağlantısı |
| Yan yana üç eşit kart, simge kutulu özellik kartı | okuma şeridi; simge kutusu yalnız Güneş ve Dünya |
| Her öğede aynı 12 px köşe | 6, 4 px ve rozet |
| Kart içinde kart | panel içi yer tutucu çerçevesiz |
| Lucide simgeleri her yerde | işlevli düğmelerde ve menüde (menü: kullanıcı kararı, 2026-11-14); panel başlıklarında yok |
| Bölüm başına büyük harfli üst etiket, orta nokta, ok | kaldırıldı (üçüncü tur), test ölçüyor |
| Sırası anlamsız numaralı liste (01, 02) | Görevler'den kaldırıldı; anlatıda kaldı (gerçek sıra) |
| Her kelimesi büyük harfle başlayan başlık | İngilizce başlıklar cümle düzeninde |
| Düz tırnak ve kesme işareti | kıvrık kesme işareti (’) |
| Saf siyah zemin, cam efekti, parıltı, degrade yazı, yüzen küre süsü | yok |
| Uydurma metrik, emoji simge, Jane Doe, sahte marka | yok; bilimsel sayı uydurulmaz kuralı zaten var |


## 4. Kabul ölçütleri (ÖNERİ; 10–13 KARAR, ajan, yetkiyle, 2026-11-14)

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
10. Katmanlar ayrışır: zemin L\* 1 ile 4 arası (siyah gökyüzü; kullanıcı kararı, üçüncü ve dördüncü tur), kart
    zeminden en az 3 L\* açık, girdi alanı karttan en az 3 L\* açık. `belirtecler.test.ts` ölçer.
11. Rastgele konum yok: her panelin sol ve sağ kenarı 12 sütunlu ızgaranın bir sütun çizgisine ±1 px oturur
    (masaüstü ve 375 px). `tests/sayfalar.e2e.ts` ölçer.
12. Tek şekil dili: görünen öğelerin köşe yarıçapı yalnız 0, 4, 6 px ya da tam yuvarlak; renkler yalnız
    belirteçlerden. Test ölçer.
13. Şablon işaretleri yok (§3a): görünen metinde orta nokta ayırıcı (" · "), ok ("→") ve düz kesme işareti (')
    yok; hiçbir öğe büyük harfe çevrilmiyor; degrade arka plan, bulanık cam (`backdrop-filter`) ve gölge yok;
    üst çubuk ekrana yapışık değil. `tests/sayfalar.e2e.ts` ölçer.

## 5. Tasarım araçları (KARAR, 2026-11-14)

| Rol | Araç | Neden |
|---|---|---|
| Üretim | **frontend-design** (Anthropic, `anthropics/skills`); **kuruldu** 2026-11-14, `.claude/skills/frontend-design/`, commit `2c5958e` | resmî; sıradan yapay zekâ görünümünden kaçınmaya yönlendirir |
| Bileşen kaynağı | **21st.dev** (kullanıcı kararı); MCP bağlantısı kullanıcının API anahtarıyla kurulur, anahtar sohbete yazılmaz. Bileşenler React/shadcn ya da HTML/Tailwind taslağı olarak gelir, Svelte'e çevrilerek ve §3 planına uydurularak alınır; her bileşenin lisansı alınmadan önce okunur | hazır desen kaynağı |
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
