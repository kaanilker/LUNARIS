# NASA Artemis III bölgelerinden öğrenen iniş yeri skoru (PU öğrenme)

Durum: kullanım biçimi, bölge seti (9) ve zamanlama **KARAR** (kullanıcı, 2026-11-14); kalan uygulama ayrıntıları ÖNERİ · Öneren: kullanıcı (plan belgesi), ajan (değerlendirme)

**KARAR (kullanıcı, 2026-11-14):** model seçilen parsellerin yanında yalnız bilgi olarak durur: "bu yerin NASA'nın
seçtiği iniş bölgelerine benzerliği". Hesapta yeri yoktur; sıralamaya, elemeye ve en uygun tarih seçimine girmez.
Plandaki "önce statik skora göre en iyi N nokta" akışı bu yüzden uygulanmaz.
**KARAR (ajan, yetkiyle):** model, T4'teki elle kurulan Gauss benzerliğinin (sim) yerini alır
(`docs/oneri-ve-dogrulama.md` §2.1); bölge uyum skoruyla (U, Wueller) birleştirme ayrıntısı uygulamada yazılır.

**Tek cümle:** NASA'nın aday bölgelerini pozitif örnek, kalan kutup alanını etiketsiz sayan açıklanabilir bir
model (lojistik regresyon, sığ ağaç, gradient boosting) eğitip her noktaya "NASA'nın seçimine benzerlik" skoru
vermek; bölge dışarıda bırakılarak doğrulamak.

## Ajanın değerlendirmesi (ÖNERİ)

**Yöntem sağlam.** Sentetik çoğaltma yok, bölge dışı kesin negatif sayılmıyor (PU), uzamsal bölme (leave one
group out), basit taban çizgileriyle karşılaştırma, zayıf sonucu da dürüst raporlama. Projenin dürüstlük ilkesiyle
uyumlu. Önceki ML fikrinin (`2026-11-14-ml-sentetik-simulasyon.md`) sorunu olan döngüsellik burada yok, çünkü
etiket bağımsız bir kaynaktan (NASA'nın uzman seçimi) geliyor.

**Önerilen yer: sıralamaya değil, T4'e.** Plan statik skoru sıralamanın ilk katmanı yapıyor ("önce statik skora göre
en iyi N nokta"). Bu üç mevcut kayıtla çelişir:
1. `docs/oneri-ve-dogrulama.md` §2.1 KARAR (kullanıcı): NASA bölgelerine benzerlik (T4) yalnız gösterilir,
   sıralamaya ve elemeye girmez. Gerekçe: 9 bölge Artemis kısıtlarıyla yapılmış bir daraltma, bütün iyi
   yerlerin listesi değil.
2. `docs/mimari.md` §9.1 doğrulama zinciri halka 5: NASA bölgeleri ölçütlerimizin makullüğünü sınayan **bağımsız**
   kaynak. Sıralama NASA bölgelerinden öğrenirse bu sınav döngüsel olur.
3. Sıralama yöntemi (B20, parametre seti 7.1) bilimsel yöntemdir; CLAUDE.md'ye göre bilim ekibinden gelir.

Bu yüzden model T4'teki elle kurulan Gauss benzerliğinin (σ bilim ekibinden bekleniyor) **yerine** geçebilir:
"NASA'nın seçimine benzerlik" rozeti, skor katmanı ve "neden yüksek" açıklaması olarak. Sıralama 7.1'de kalır.
Uyumsuzluk analizi ("modelin sevdiği ama NASA'nın seçmediği yerler") Hakkında sayfasında güçlü bir dürüstlük
bulgusu olur.

**Plandaki düzeltilmesi gereken olgular:**
- Plan 2022'deki 13 bölgeyi kullanıyor. Ekim 2024'te liste **9 bölgeye** indi (parametre seti §10, NTRS
  20250011660); çıkarılan 4'ü NASA "uygunsuz değil" diyor. Öneri: güncel 9'u pozitif almak, çıkarılanları ayrı
  bir duyarlılık koşusunda denemek; ikisi de raporda.
- Poligonları görselden elle çizmek gerekmeyebilir: resmi 15 km sınırlar USGS ScienceBase'de (DOI
  10.5066/P1MEQ6UK, oturum istiyor, elle indirilir) ve Wueller 2026 açık verisinde 130 saha noktası var.
- Kapsam 84°G değil 83°G olmalı; 2024 bölgeleri 83,4°G'ye uzanıyor (parametre seti §1 düzeltme 4).
- Bağımsız örnek 9 bölge (gruplanınca daha az); plan bunu sınırlama olarak yazıyor, doğru.

**Bağımlılık:** Özelliklerin çoğu (ortalama aydınlanma, en uzun aydınlık süre, Dünya görünürlüğü) ufuk ve
efemeris hesabından gelir; yani veri hattı (Aşama 1a pilotu, Aşama 2) olmadan model eğitilemez. Plan "mevcut
LUNARIS hesabını yeniden kullan" diyor; bu hesap henüz yok. Şimdi yapılabilecek kısım: bölge sınırlarının
indirilmesi, ızgara şablonu, eğim ve PSR uzaklığı gibi yalnız DEM'den gelen özellikler.

**Repo yerleşimi:** `lunaris/ml/` yerine `hat/ml/`. Özellikler hattın tek geometri kaynağından okunur
(`docs/mimari.md` §8, iki doğruluk kaynağı olmaz). Sonuç raporlanırken `/arastirma-bitti` (sabit tohum, koşu
kimliği, neye karşı ölçüldüğü).

**Sunum cümlesi önerisi:** "seçtiğimiz özelliklerle, hiç görmediği NASA bölgelerini kutbun en iyi %X'lik dilimine
yerleştiriyor; bu NASA'nın seçimine benzerliği ölçer, mutlak uygunluğu değil."

## Öldürme ölçütü
Leave one group out sonucunda model, yalnız `illum_mean_pct` ile yapılan sıralamayı geçemiyorsa skor katmanı
siteye eklenmez; bulgu Hakkında'da "basit aydınlanma oranı NASA'nın seçimini zaten açıklıyor" diye yazılır.

## Karar bekleyen
1. ~~Sıralamaya mı girsin, yalnız bilgi mi olsun?~~ Yalnız bilgi (KARAR, kullanıcı, 2026-11-14).
2. ~~Pozitifler: 9 mu, 13 mü?~~ **KARAR (kullanıcı, 2026-11-14):** NASA'nın güncel (Ekim 2024) 9 bölgesi. Plandaki
   13 bölge listesi ve 13'lü duyarlılık koşusu uygulanmaz.
3. ~~Zamanlama~~ **KARAR (kullanıcı, 2026-11-14):** model veri hattından sonra yapılır (Aşama 2 sonrası); şimdi
   bu iş için çalışma yapılmaz.

---

## Ek: kullanıcının plan belgesi (olduğu gibi, 2026-11-14)

# LUNARIS — NASA Artemis III Bölgelerinden Öğrenen İniş Yeri Skorlama Modeli

> **Agent için görev tanımı.** Bu belge, LUNARIS projesine (repo: `github.com/kaanilker/LUNARIS`) eklenecek makine öğrenmesi tabanlı iniş yeri skorlama modülünün uygulama planıdır. Adımları sırayla uygula, her adımın sonundaki kabul kriterlerini kontrol et, belirsiz bir noktada varsayımını `NOTES.md` dosyasına yaz ve devam et.

---

## 0. Bağlam ve karar

- LUNARIS, Ay güney kutbu iniş yerlerini Güneş ve Dünya görünürlüğüne göre (güç + doğrudan iletişim) karşılaştıran bir araçtır.
- **Karar:** Parametreleri fuzzy logic üyelik fonksiyonlarına çevirme planı **iptal edildi.** Yerine, NASA'nın Artemis III için açıkladığı 13 aday bölgeden öğrenen, açıklanabilir bir ML modeli kullanılacak.
- **Kaynak:** NASA haber bülteni — https://www.nasa.gov/news-release/nasa-identifies-candidate-regions-for-landing-next-americans-on-moon/
- **NASA'nın 13 bölgesi:** Faustini Rim A, Peak Near Shackleton, Connecting Ridge, Connecting Ridge Extension, de Gerlache Rim 1, de Gerlache Rim 2, de Gerlache-Kocher Massif, Haworth, Malapert Massif, Leibnitz Beta Plateau, Nobile Rim 1, Nobile Rim 2, Amundsen Rim.
- **NASA'nın açıkladığı kriterler:** eğim/güvenli iniş, Dünya ile iletişim, 6,5 günlük görev boyunca sürekli aydınlanma, fırlatma penceresi, araç erişilebilirliği (SLS/Orion/Starship), bilim (kalıcı gölgeli bölgelere yakınlık, jeolojik çeşitlilik). Tüm bölgeler güney kutbunun 6° enlem yakınında.

### Yapılmayacak şeyler (önemli)
- ❌ 13 bölgeyi SMOTE, gürültü ekleme vb. ile **sentetik olarak çoğaltma.** Bu yeni bilgi eklemez, model gürültüyü öğrenir.
- ❌ Bölge dışındaki pikselleri **kesin negatif** sayma. Bunlar *etiketsiz*dir (Positive-Unlabeled problemi).
- ❌ Pikselleri **rastgele** train/test'e bölme. Uzamsal otokorelasyon skoru şişirir.
- ❌ Derin öğrenme modeli. Bağımsız örnek sayısı ~8–9 bölge; ezberler.

---

## 1. Hedef mimari

İki katmanlı skorlama:

| Katman | Soru | Yöntem |
|---|---|---|
| **Statik (YENİ)** | "Bu nokta genel olarak iyi bir iniş yeri mi?" | PU-learning ile eğitilmiş ML modeli → 0–1 skor |
| **Dinamik (MEVCUT)** | "Seçilen tarihte Güneş ve Dünya görünüyor mu?" | LUNARIS'in mevcut geometrik hesabı |

Arayüzde: önce statik skora göre en iyi N nokta → sonra kullanıcının seçtiği tarih aralığında dinamik filtre/sıralama.

---

## 2. Önerilen klasör yapısı

```
lunaris/
  ml/
    config.yaml            # çözünürlük, kapsam, yollar, random seed
    data/
      raw/                 # indirilen ham veriler (git'e girmez)
      processed/           # grid, feature tablosu (parquet)
      regions/
        nasa_artemis3_regions.geojson
    src/
      download.py          # ham veri indirme
      grid.py              # kutup stereografik grid oluşturma
      features.py          # özellik çıkarma
      labels.py            # pozitif/arka plan etiketleme
      train.py             # model eğitimi
      validate.py          # leave-one-region-out
      explain.py           # katsayılar, eşikler, SHAP
      export.py            # LUNARIS arayüzü için skor haritası
    notebooks/
      eda.ipynb
    reports/
      validation_report.md
      figures/
    NOTES.md               # agent'ın varsayımları ve açık sorular
```

---

## 3. Adımlar

### Adım 1 — Grid ve kapsam
- Kapsam: **84°S – 90°S** (NASA bölgelerinin tamamını ve çevresini kapsar).
- Projeksiyon: Ay güney kutup stereografik (IAU Moon 2015 küresi, R = 1737.4 km). Tüm katmanlar bu projeksiyona getirilecek.
- Çözünürlük: **başlangıçta 60 m/piksel**, pipeline çalıştıktan sonra 20 m'ye indirilebilir (`config.yaml` ile ayarlanabilir).

**Kabul:** Tek bir `grid.npz` / GeoTIFF şablonu; tüm sonraki katmanlar bu şablona birebir hizalı.

### Adım 2 — Ham veri
Aşağıdaki veri setlerini NASA PDS Geosciences Node / LOLA RDR arşivinden bul ve indir. Kesin dosya adlarını ve URL'leri `NOTES.md` dosyasına yaz.

| Veri | Amaç | Not |
|---|---|---|
| LOLA güney kutup DEM (polar stereografik, ~20–60 m) | Yükseklik, eğim, pürüzlülük, ufuk | PDS LOLA RDR "polar" ürünleri |
| LOLA tabanlı ortalama aydınlanma haritası | Güç | Hazır ürün varsa kullan, yoksa Adım 3'te DEM'den hesapla |
| Kalıcı gölgeli bölge (PSR) haritası | Bilim kriteri | PDS'te LOLA/LRO tabanlı PSR ürünleri |
| Güneş ve Dünya efemerisi | Aydınlanma / Dünya görünürlüğü zaman serisi | SPICE kernel'leri (spiceypy) veya Skyfield; LUNARIS'te zaten kullanılan çözüm tercih edilsin |

**Kabul:** `download.py` idempotent çalışır; ham veriler `data/raw/` içinde; `NOTES.md`'de kaynak listesi var.

### Adım 3 — Özellik çıkarma (`features.py`)
Her grid hücresi için:

| Özellik | Hesap |
|---|---|
| `slope_deg` | DEM gradyanı (piksel boyutuna göre) |
| `roughness` | 3×3 veya 5×5 pencerede yükseklik std'si |
| `elevation_m` | DEM |
| `illum_mean_pct` | Ortalama aydınlanma yüzdesi (hazır harita veya ufuk + Güneş efemerisi, ≥1 drakonik yıl örnekleme) |
| `illum_max_continuous_days` | En uzun kesintisiz aydınlık süre (6,5 gün kriteri için kritik) |
| `earth_vis_pct` | Dünya'nın ufkun üstünde olduğu zaman yüzdesi |
| `dist_to_psr_km` | En yakın PSR pikseline Öklid mesafesi (distance transform) |
| `lat_deg` | Kontrol değişkeni |

- Ufuk hesabı pahalıdır: önce her piksel için **ufuk profili** (ör. 360 azimut × açı) bir kez hesaplanıp önbelleğe alınsın, aydınlanma ve Dünya görünürlüğü bu profilden türetilsin.
- Mümkünse LUNARIS'in mevcut Güneş/Dünya hesaplama kodunu **yeniden kullan**, yeniden yazma.

**Kabul:** `data/processed/features.parquet` (piksel_id, x, y, lat, lon, tüm özellikler). EDA notebook'unda her özelliğin haritası ve histogramı.

### Adım 4 — NASA bölge poligonları (`regions/`)
- NASA haber metni koordinat poligonu **vermiyor**; bölgeler yalnızca harita görseliyle yayımlandı.
- Yapılacak: NASA'nın resmi bölge haritası görselini QGIS'te (veya Python'da kontrol noktalarıyla) georeference et, 13 poligonu çiz → `nasa_artemis3_regions.geojson`.
- Her poligona özellik ekle: `name`, `group` (aşağıya bak).
- **Gruplama** (birbirinin uzantısı olanlar aynı grup):
  - `nobile` = Nobile Rim 1 + Nobile Rim 2
  - `degerlache` = de Gerlache Rim 1 + de Gerlache Rim 2 (+ de Gerlache-Kocher Massif ayrı mı birlikte mi → görsel yakınlığa göre karar ver, `NOTES.md`'ye yaz)
  - `connecting_ridge` = Connecting Ridge + Connecting Ridge Extension
  - Diğerleri kendi grubunda.
- ⚠️ Bu adım **insan kontrolü** gerektirir: poligonlar çizildikten sonra harita üzerinde NASA görseliyle yan yana bir kontrol figürü üret (`reports/figures/regions_check.png`) ve kullanıcıdan onay bekle.

**Kabul:** Geçerli GeoJSON; kontrol figürü; gruplama kararları `NOTES.md`'de.

### Adım 5 — Etiketleme (`labels.py`)
- **Pozitif (y=1):** Poligon içindeki pikseller.
- **Arka plan (y=0, "etiketsiz"):** Poligon dışından rastgele örneklenen pikseller, pozitif sayısının **5–10 katı** (`config.yaml`).
- Arka plan örneklemesi kapsam alanıyla aynı enlem bandından yapılsın (84–90°S) ki model sadece "kutba yakınlık" öğrenmesin.
- Pozitifler bölge büyüklüğüne göre dengesiz olabilir → **bölge başına ağırlıklandırma** (her grubun toplam ağırlığı eşit) seçeneği eklensin.

**Kabul:** `labels.parquet` (piksel_id, y, group, weight).

### Adım 6 — Modeller (`train.py`)
Sırayla, hepsi aynı arayüzle (`fit`, `predict_proba`):

1. **Lojistik regresyon** (standartlaştırılmış özellikler, L2) — ana/baseline model.
2. **Sığ karar ağacı** (max_depth 3–4) — insan okunur eşik kuralları.
3. **Gradient Boosting** (LightGBM veya sklearn HistGB) — kontrol modeli, SHAP için.
4. *(Opsiyonel)* **MaxEnt** benzeri yaklaşım (ör. `elapid` paketi) — PU literatürüyle karşılaştırma.

Hepsinde `random_state` sabit, hiperparametreler `config.yaml`'da.

### Adım 7 — Doğrulama (`validate.py`) — EN KRİTİK ADIM
- **Leave-One-Group-Out** (Adım 4'teki gruplar): bir grubu tamamen dışarıda bırak → kalanlarla eğit → tüm haritayı skorla.
- **Ana metrik — yüzdelik sıra:** Dışarıda bırakılan grubun piksellerinin ortalama skoru, tüm kapsam alanındaki piksellerin hangi yüzdeliğinde? (ör. "en iyi %3")
- Ek metrikler: grup bazında AUC (pozitif vs. arka plan), Boyce index.
- **Karşılaştırma tabanı (baseline):** Sadece `illum_mean_pct` ile sıralama ve sadece `slope_deg` ile sıralama. Model bunları geçemiyorsa raporda açıkça yazılsın.
- ❌ Rastgele piksel bölmesi raporda **yalnızca** "neden yanıltıcı olduğunu göstermek için" karşılaştırma olarak yer alabilir.

**Kabul:** `reports/validation_report.md` — her grup için tablo (yüzdelik sıra, AUC), model karşılaştırması, baseline karşılaştırması.

### Adım 8 — Yorum (`explain.py`)
Çıktılar:
- Lojistik regresyon katsayıları (standartlaştırılmış) + güven aralıkları (bootstrap, grup bazında).
- Karar ağacının kuralları metin olarak (ör. `slope < 8° AND illum_mean > 0.7 AND dist_to_psr < 15 km`).
- Gradient Boosting için SHAP özet grafiği + bağımlılık grafikleri.
- **Uyumsuzluk analizi:**
  - Modelin en yüksek skor verdiği ama NASA bölgesi **olmayan** ilk 10 küme (bağlı bileşen olarak).
  - NASA bölgesi olup modelin **düşük** skor verdiği bölgeler.
  - Her biri için kısa yorum: haritadan görünmeyen kriterler (fırlatma penceresi, araç erişimi, bilimsel hedef) olası açıklama mı?

**Kabul:** `reports/` altında figürler + `validation_report.md`'ye "Yorum" bölümü.

### Adım 9 — LUNARIS entegrasyonu (`export.py`)
- Final model tüm gruplarla eğitilsin → tüm kapsam için **statik skor haritası** (GeoTIFF + web için tile'lar veya düşük çözünürlüklü PNG/JSON).
- Her piksel için açıklama verisi: ilk 3 katkı (lojistik katsayı × özellik veya SHAP) → arayüzde "Bu nokta neden yüksek puan aldı?" paneli.
- Arayüz akışı: statik skor haritası katmanı → kullanıcı nokta/bölge seçer → mevcut dinamik hesap (tarih bazlı Güneş/Dünya) çalışır → iki skor yan yana.
- NASA'nın 13 bölgesi harita üzerinde ayrı bir katman olarak açılıp kapanabilir olsun.

**Kabul:** Web arayüzünde skor katmanı görünür; bir noktaya tıklayınca statik skor + açıklama + dinamik sonuç gösterilir.

---

## 4. Teslim edilecekler (özet)

- [ ] `ml/` modülü, çalışır pipeline (`python -m ml.src.<adım>` ile adım adım)
- [ ] `nasa_artemis3_regions.geojson` + kontrol figürü (kullanıcı onaylı)
- [ ] `features.parquet`, `labels.parquet`
- [ ] `validation_report.md` (leave-one-group-out sonuçları, baseline karşılaştırması, yorum, uyumsuzluk analizi)
- [ ] Statik skor haritası + açıklama verisi
- [ ] Arayüz entegrasyonu
- [ ] `NOTES.md` (veri kaynakları, varsayımlar, açık sorular)
- [ ] `README` güncellemesi: yöntemin kısa açıklaması, sınırlamalar

## 5. Sunum için hedef cümle
> "LUNARIS'in skorlama modeli NASA'nın Artemis III bölgelerinden öğrendi. Leave-one-region-out testinde, hiç görmediği bölgeleri güney kutbunun en iyi **%X**'lik dilimine yerleştiriyor."

X değeri Adım 7'den gelecek. Sonuç zayıf çıkarsa da dürüstçe raporlanacak; uyumsuzluk analizi bu durumda ana bulgu olur.

## 6. Sınırlamalar (README'ye yazılacak)
- Bağımsız örnek sayısı düşük (~8–10 grup); sonuçlar keşifsel niteliktedir.
- Poligonlar NASA görselinden elle çıkarıldı; sınır hataları var.
- Fırlatma penceresi, araç erişilebilirliği ve bazı bilimsel hedefler haritadan türetilemez; model bunları yakalayamaz.
- Model "NASA'nın seçimine benzerlik" ölçer, "mutlak uygunluk" değil.
