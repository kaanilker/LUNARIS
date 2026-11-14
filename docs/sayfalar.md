# Sayfa planı

> Durum: **ÖNERİ** (2026-11-14, ajan; kullanıcıyla birlikte netleşecek). Kaynak: brifteki "Site taslağı"
> (`docs/kaynak/LUNARIS_AGENT_BRIEF.md`). Brifle ayrıldığım yerler **[brif farkı]** etiketi taşır.
> Demo akışının sahibi `SPEC.md`; burada yalnız sayfa yapısı var.

## Özet: 6 sayfa ve 2 katman

| # | Sayfa | Adres (TR / EN) | Brifteki karşılığı | Demo adımı |
|---|---|---|---|---|
| 1 | Ana Sayfa | `/tr/` · `/en/` | 1 | 1 |
| 2 | Planlayıcı | `/tr/planla` · `/en/plan` | 2 + 3 **[brif farkı]** | 2, 3 |
| 3 | Site Detay | `/tr/site/<id>` · `/en/site/<id>` | 3b | 4 |
| 4 | Karşılaştır | `/tr/karsilastir` · `/en/compare` | 3b (A/B) | 5 |
| 5 | Görevler | `/tr/gorevler` · `/en/missions` | 4 | — |
| 6 | Yöntem ve Doğrulama | `/tr/yontem` · `/en/method` | 4 (doğrulama) + 5 **[brif farkı]** | 6 |

Sayfa olmayanlar: **Rehberli Tur** her sayfanın üstünde açılan bir katmandır. **Rapor** Site Detay ve
Karşılaştır sayfalarının yazdırma görünümüdür.

Senaryo bilgisi (site, tarih, gecikme, süzgeç) adresin sorgu kısmında taşınır; paylaşım linki budur.
Dil değişince aynı senaryo öbür dilde açılır.

## Sayfalar

### 1. Ana Sayfa
- **Amaç:** jüri 10 saniyede problemi anlasın.
- **İlk ekran:** güney kutbu 3B sahnesi, "Hangi gün, hangi noktaya inmeli?", "Turu başlat" ve
  "Planlamaya başla" düğmeleri.
- **"Ay şu an":** bugünün evresi, hazır sitelerde Güneş ve Dünya'nın şu anki durumu, AI yorumu.
- **Scroll anlatısı:** dört bölüm (kutup neden zor, iki güneşin farkı, küçük konum farkı, Dünya'nın
  sallanması). Her bölüm bir canlı görselle; metin bilim ekibinden (B17).
- **Veri:** efemeris tablosu ve hazır sitelerin ufukları. Izgara paketi yüklenmez; sayfa hafif açılır.

### 2. Planlayıcı (Hızlı ve Uzman katmanı)
- **[brif farkı]** Brifte "Hızlı Planlayıcı" ve "Gelişmiş Analiz" iki ayrı sayfa. Burada tek sayfa,
  üstte **Hızlı / Uzman** anahtarı var. Gerekçe: iki sayfa aynı harita, aynı tarih ve aynı gecikme
  kaydırıcısını kullanıyor. Ayrı sayfa olursa kullanıcı ayarlarını kaybeder ve kod iki kez yazılır.
  Challenge'ın "farklı beceri seviyeleri" maddesi de aynı ekranda iki derinlik olarak karşılanmış olur.
- **Hızlı katman:** tarih, haritada bölge, puanlanmış noktalar, en iyi 5–10 site (her satırda tek
  cümle), gecikme kaydırıcısı, AI yorumu, paylaş düğmesi.
- **Uzman katmanı:** eşik süzgeçleri, güç ve iletişim Pareto grafiği, aylık görünüm, DSN istasyonları,
  iniş belirsizliği, benzer site önerisi, panel ve batarya modeli, tüm sayılar.
- **Mobil:** harita üstte, liste altta; Uzman katmanındaki grafikler alt alta.
- **Veri:** seçilen bölgenin ızgara parçaları (özet metrikler).

### 3. Site Detay
- **Amaç:** challenge'ın kalbi; tek sitenin tek tarihteki tüm koşulları.
- **İçerik:** 360° ufuk panoraması (Güneş ve Dünya izleriyle), gün batımı ve Dünya batımı geri sayımı,
  sonraki iletişim penceresi, zaman çizelgesi (güneşli, kısmi, karanlık; iletişim), zaman oynatıcı,
  astronot görünümü, "Karşılaştır'a ekle" düğmesi, rapor çıktısı.
- **Dış bağlantılar:** aynı konum ve tarihle "Horizons'ta aç", "Quickmap'te aç", "Moon Trek'te aç"
  (`docs/mimari.md` §11).
- **Özel koordinat** buradan girilir: hazır site seçmek yerine enlem ve boylam yazılır.
- **Veri:** efemeris tablosu ve tek bir ufuk profili. Hesap tarayıcıda anlık.

### 4. Karşılaştır
- **Amaç:** iki site ya da aynı sitede iki tarih yan yana.
- **İçerik:** iki sütun (mobilde üst üste), ortak zaman oynatıcı, farkların vurgulandığı özet tablo,
  rapor çıktısı.
- **Neden ayrı sayfa:** Site Detay'ın içinde yapılırsa mobilde sığmaz ve link paylaşımı karışır.
  Bileşenler Site Detay ile ortaktır, yeniden yazılmaz.

### 5. Görevler
- **Amaç:** eğitim. "Apollo neden ekvatora indi, şimdi neden herkes kutba gidiyor?"
- **İçerik:** dönen Ay küresi üzerinde 10 görev (liste B14), scroll anlatısı. Her görevde "LUNARIS o gün
  ne derdi?" kartı; karta tıklayınca o görevin tarihiyle Site Detay açılır. AI yorumu.
- Başarısız ve kısmen başarılı görevler de listede (brif). CSA Moon Exploration anlatıya kaynak.

### 6. Yöntem ve Doğrulama
- **[brif farkı]** Brifte doğrulama Görevler bölümünde, yöntem ise Hakkında'da. Burada doğrulama
  tablosu Yöntem sayfasına taşınıyor, Görevler kartları ise bu tabloya bağlantı veriyor. Gerekçe:
  rehberli turun 3. adımı (doğrulama) teknik bir jüri üyesinin aradığı tek yere gitmeli. Horizons ile
  karşılaştırma eğitim anlatısının içinde kaybolmamalı.
- **İçerik:** veri kaynakları (challenge'ın dört kaynağı dahil, `docs/mimari.md` §11), yöntemin sade
  anlatımı, Horizons, Quickmap ve literatür karşılaştırma tablosu
  (fark ve kaynak), varsayımlar, sınırlamalar, ekip, GitHub, demo videosu.
- Metinler bilim ekibinden (B17).

## Her sayfada ortak
- Üst çubuk: logo, 6 sayfa, dil (TR/EN), "Turu başlat".
- AI yorum kutusu: "AI üretimi" etiketi, gelmezse hazır metin.
- Yer tutucu etiketi: bilim girdisi gelmemiş değerin yanında.

## Rehberli Tur (katman)
60 saniye, 4 adım. Her adım kendi sayfasına gider ve hazır bir senaryo açar:
1. Problem → Ana Sayfa scroll anlatısı
2. Yöntem → Site Detay (panorama ve zaman oynatıcı)
3. Doğrulama → Yöntem ve Doğrulama tablosu
4. Öneri → Planlayıcı, gecikme kaydırıcısı oynarken

Tur senaryolarındaki site ve tarihler bilim ekibinden gelir.

## Açık noktalar
- **P1:** Planlayıcı ve Gelişmiş Analiz'i tek sayfada birleştirmek (yukarıda gerekçesi var).
- **P2:** Doğrulamayı Yöntem sayfasına taşımak.
- **P3:** Adreslerde dil öneki (`/tr/`, `/en/`). Alternatif: tek adres ve dil seçimi tarayıcıda saklanır.
  Önek paylaşılan linkin dilini korur.
