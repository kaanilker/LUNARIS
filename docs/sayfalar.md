# Sayfa planı

> Sayfa listesi, sırası ve her sayfanın ana işlevi **KARAR** (kullanıcı, 2026-11-14). Sayfaların içindeki
> ayrıntılar aksi yazmadıkça **ÖNERİ**. Hesap yöntemlerine sonra karar verilecek; yöntem gerektiren her
> yer "yöntem: açık" diye işaretli. Demo akışının sahibi `SPEC.md`.
> Brif kaynağı: `docs/kaynak/LUNARIS_AGENT_BRIEF.md`.

## Özet: 7 sayfa

Menüdeki sıra hesaplama sayfalarından sonra görsel sayfalar şeklinde:

| # | Sayfa | Adres (TR / EN) | Kimin için |
|---|---|---|---|
| 1 | Ana Sayfa | `/tr/` · `/en/` | herkes |
| 2 | Planlayıcı | `/tr/planla` · `/en/plan` | herkes |
| 3 | Uzman Analiz | `/tr/uzman` · `/en/expert` | teknik kullanıcı |
| 4 | Site Detay | `/tr/site/<parsel>` · `/en/site/<parsel>` | herkes |
| 5 | Karşılaştır | `/tr/karsilastir` · `/en/compare` | herkes |
| 6 | Görevler | `/tr/gorevler` · `/en/missions` | herkes (görsel) |
| 7 | Hakkında | `/tr/hakkinda` · `/en/about` | herkes |

Sayfa olmayanlar: **Rehberli Tur** her sayfanın üstünde açılan katman. **Rapor** Site Detay ve
Karşılaştır sayfalarının yazdırma görünümü. Adreslerdeki dil öneki (`/tr/`, `/en/`) ÖNERİ.

## 1. Ana Sayfa

**KARAR:** Sahnede yalnız güney kutbu değil, Ay'ın tamamı var. Bilgilendirme kısa, ağırlık yorumda.

- **İlk ekran:** dönen tam Ay küresi. Güneş ışığı gerçek konumdan gelir, yani o anki evre görünür.
  Güney kutbu küre üzerinde işaretli. "Hangi gün, hangi noktaya inmeli?" sorusu, "Turu başlat" ve
  "Planlamaya başla" düğmeleri.
- **"Güney kutbu şu an" paneli:** ziyaret anına göre hesaplanmış birkaç gösterge:
  - Güney kutbu bölgesi şu an Güneş'ten ne kadar enerji alıyor (yöntem: açık, B19)
  - Şu an inişe ne kadar elverişli (yöntem: açık, B19)
  - Dünya şu an kutuptan görünüyor mu
- **AI yorumu:** panelin hemen altında, göstergeleri sade dille yorumlar. Sayfanın ana metni budur.
- **Kısa anlatı:** dört bölüm kısaltılarak kalır (kutup neden zor, iki güneşin farkı, küçük konum farkı,
  Dünya'nın sallanması). Her bölüm bir görsel ve bir iki cümle.
- **Gereken:** efemeris tablosunun ziyaret anını kapsaması (B3).

## 2. Planlayıcı

**KARAR:** Kullanıcı tarih ve **Dünya'daki kalkış noktasını** seçer. Bölgeyi sistem seçer.

- **Girdiler:** fırlatma tarihi, Dünya'da kalkış noktası (hazır fırlatma üsleri listesi ya da harita).
- **Sonuç:**
  - En uygun 5–10 parsel, kutup haritasında işaretli ve sıralı (yöntem: açık).
  - Her parsel için **neden seçildiği** düz bir cümleyle ve **verileri**: güneş oranı, iletişim
    süresi, en uzun karanlık gibi metrikler (tanımlar B9).
  - **AI yorumu:** seçilen parselleri birbiriyle karşılaştırarak yorumlar.
- **Gecikme kaydırıcısı:** fırlatma kayarsa sıralama canlı değişir. Sistem ayrıca **en uygun tarihi**
  söyler: "Bu kalkış noktası için en uygun fırlatma tarihi şu, çünkü ..." (yöntem: açık).
- Listedeki parsele tıklayınca Site Detay açılır. Senaryo link olarak paylaşılır.
- **Açık bilimsel soru (B18):** kalkış noktası ve fırlatma tarihi, Ay'a varış zamanını ve iniş
  koşullarını nasıl belirliyor? Bu model gelmeden kalkış noktası girdisi sonucu değiştirmez.

## 3. Uzman Analiz

**KARAR:** Planlayıcı'dan ayrı sayfa; daha fazla ayrıntı.

- Eşik süzgeçleri: en az güneş oranı, en az iletişim süresi, en uzun karanlık, eğim, buz bölgesine uzaklık
- Güç ve iletişim dengesi grafiği (Pareto); tek skora indirgenmez
- Panel ve batarya modeli: "bu parsel, bu tarih, bu batarya karanlığı atlatır mı?"
- Deep Space Network istasyonları: hangisi o an Ay'ı görüyor, gerçek iletişim penceresi
- İniş belirsizliği: parsel içindeki ve komşu parsellerdeki değişim
- Benzer parsel önerisi: "bu olmazsa şunlara bak"
- Aylık görünüm: önümüzdeki aylarda hangi parsel hangi günlerde iyi
- Bütün sayılar, birimleri ve tanımları açık
- Planlayıcı'daki senaryo (tarih, kalkış noktası) link ile buraya taşınır, kullanıcı baştan girmez.

## 4. Site Detay

**KARAR:** 360° panorama, güney kutbunda seçilen noktanın ufkunu gösterir.

- **360° ufuk panoraması:** seçilen parselin merkezinden bakınca görünen arazi silüeti, gökyüzünde
  Güneş'in (amber) ve Dünya'nın (mavi) izleri.
- **Geri sayımlar:** gün batımına, Dünya batımına, sonraki iletişim penceresine kalan süre.
- **Zaman çizelgesi:** güneşli, kısmi, karanlık dönemler; iletişim pencereleri.
- **Zaman oynatıcı:** panorama, 3B sahne ve kartlar birlikte hareket eder.
- **Astronot görünümü:** noktaya inmiş biri gibi etrafa bakılan 3B sahne.
- **Dış bağlantılar:** aynı konum ve tarihle "Horizons'ta aç", "Quickmap'te aç", "Moon Trek'te aç"
  (`docs/mimari.md` §11).
- Özel koordinat girişi, "Karşılaştır'a ekle", rapor çıktısı.
- **Zenginleştirme (ÖNERİ, sonra seçilecek):** parselin içindeki en iyi ve en kötü nokta farkı; eğim;
  en yakın buz bölgesi; bu parselin bir yıl boyunca aylık aydınlanması.

## 5. Karşılaştır

- İki parsel ya da aynı parselde iki tarih yan yana (mobilde üst üste), ortak zaman oynatıcı.
- Farkların vurgulandığı özet tablo, rapor çıktısı.
- Bileşenler Site Detay ile ortak; yeniden yazılmaz.

## 6. Görevler

**KARAR:** Hesaplama sayfalarından sonra gelen, yalnız görsel bir sayfa. Tarihteki en önemli 10 Ay
**iniş** görevi görselleştirilir.

- Dönen Ay küresi üzerinde 10 iniş noktası, scroll ile görevden göreve geçiş.
- Her görevde: ad, ülke, tarih, sonuç (başarılı, kısmi, başarısız), kısa açıklama.
- Liste ve bilgiler bilim ekibinden (B14); CSA Moon Exploration kaynaklardan biri.
- Brifteki "LUNARIS o gün ne derdi?" hesabı bu sayfadan çıkarıldı, çünkü sayfa yalnız görsel olacak.

## 7. Hakkında

**KARAR:** Son sayfanın adı "Hakkında".

- Veri kaynakları (challenge'ın dört kaynağı dahil), yöntemin sade anlatımı
- Doğrulama: Horizons, Quickmap ve literatürle karşılaştırma tablosu, fark ve kaynağıyla
  (doğrulama ayrı sayfa olmadığı için burada bir bölüm; ÖNERİ)
- Varsayımlar ve sınırlamalar
- Ekip, GitHub, demo videosu
- Metinler bilim ekibinden (B17)

## Her sayfada ortak

- Üst çubuk: logo, 7 sayfa, dil (TR/EN), "Turu başlat".
- AI yorum kutusu: "AI üretimi" etiketi, gelmezse hazır metin.
- Yer tutucu etiketi: bilim girdisi gelmemiş değerin yanında.

## Rehberli Tur (ÖNERİ)

60 saniye, 4 adım: problem (Ana Sayfa) → yöntem (Site Detay, panorama ve oynatıcı) → doğrulama
(Hakkında, doğrulama tablosu) → öneri (Planlayıcı, gecikme kaydırıcısı oynarken). Tur senaryolarındaki
tarih ve kalkış noktası bilim ekibinden gelir.
