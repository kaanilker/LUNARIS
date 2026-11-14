# Animasyon planı

> Sitenin hangi yerinde hangi animasyonun olacağının tek sahip belgesi. Sayfa içerikleri `docs/sayfalar.md`,
> sahne veri sözleşmesi `docs/mimari.md` §5, renk ve hareket ölçütleri `docs/tasarim.md`.
> Etiketler: **KARAR (brif)** ekip brifinden, **KARAR (kullanıcı)**, **KARAR (ajan, yetkiyle)** sunum
> ayrıntısı, **ONAY BEKLİYOR** kullanıcının henüz almadığı ek özelliğe bağlı. Güncellendi: 2026-11-14.

## 1. İlkeler (KARAR, brif)

1. **Animasyon süs değil, veridir.** Her hareket hesaplanmış bir değere bağlıdır (formül numarası tabloda).
   Veriyle bağı olmayan dekor hareketi yok.
2. **Tek saat.** Zaman oynatıcı ya da tarih kaydırıcısı oynayınca 3B sahne, panorama, grafikler ve metinler
   aynı anda değişir. Saat `web/durum`'da tektir; sahneler onu dinler, kendi saatini tutmaz.
3. **Hazır "wow" efekti yok;** gerçek veriyle çalışan özgün sahneler.
4. **Renk:** Güneş ve ışığı amber, Dünya mavi. Başka hiçbir hareketli öğe bu renkleri kullanmaz.
5. **Hareketi azalt** (`prefers-reduced-motion`) açıkken otomatik animasyon durur; her sahnenin aşağıdaki
   tablolarda yazan durağan bir karşılığı vardır. Bilgi hiçbir zaman yalnız hareketle verilmez.
6. **Mobil:** 3B sahneler düşük ayrıntı moduna geçer; düşük güç durumunda durağan kareye düşer.

## 2. Üç animasyon türü ve sahipleri

| Tür | Ne | Yapan | Teknik |
|---|---|---|---|
| **3B sahne** | Ay küresi, kutup arazisi, astronot görünümü | Animasyon ekibi | Three.js; veriyi yalnız sahne arayüzünden alır (`docs/mimari.md` §5) |
| **Veri animasyonu** | Panorama, harita, grafik, sayaç, liste geçişleri | Yazılım ekibi | SVG ya da canvas; durum deposundaki saati dinler |
| **Arayüz geçişi** | Sayfa geçişi, açılır panel, tur vurgusu | Yazılım ekibi | CSS; 300 ms'yi geçmez (KARAR, ajan, yetkiyle) |

## 3. Sayfa sayfa

### Ana Sayfa

| # | Animasyon | Ne gösterir | Veri | Tetik | Tür | Hareketi azalt |
|---|---|---|---|---|---|---|
| A1 | **Dönen tam Ay küresi** (KARAR, kullanıcı) | Ay'ın o anki evresi; ışık gerçek Güneş yönünden gelir; güney kutbu işaretli | 0.2, gökyüzü tablosu | Sürekli yavaş dönüş; fareyle ya da parmakla çevrilebilir | 3B | Dönüş durur, o anki evre durağan |
| A2 | **"Güney kutbu şu an" göstergeleri** | Enerji, inişe elverişlilik, Dünya görünürlüğü yüzdeleri; değer değişince sayı yumuşak geçer | S.6 (E, U, V) | Sayfa açılınca ve dakikada bir | Veri | Sayı doğrudan yazılır |
| A3 | **Anlatı 1: kutup neden zor** | Kutup arazisi, Güneş ufka yakın döner, uzun gölgeler kraterlerin üstünde kayar | 0.1, 0.3, 2.2 | Scroll | 3B | Seçilmiş tek kare |
| A4 | **Anlatı 2: iki güneş farkı** | Yan yana iki gök kubbesi: Dünya'da Güneş yüksek bir yay çizer, Ay kutbunda ufkun hemen üstünde bir halka | 2.1 | Scroll | Veri (2B) | İki yolun durağan çizimi |
| A5 | **Anlatı 3: küçük konum farkı** | 500 m arayla iki nokta; aynı anda biri aydınlık biri gölgede, zaman ilerledikçe durum değişir | 0.3, 0.4 | Scroll | 3B | İki noktanın yan yana durağan karesi |
| A6 | **Anlatı 4: Dünya'nın sallanması** | Kutuptan bakınca Dünya ikonunun yaklaşık 27 günde çizdiği sekiz biçimli yol; ufkun altına inip çıkışı | 4.1, libration | Scroll | Veri (2B) | Yolun tamamı durağan çizgi |
| A7 | AI yorumunun belirişi | Metin kutusu yumuşak açılır | — | Yorum gelince | Arayüz | Anında görünür |

### Planlayıcı

| # | Animasyon | Ne gösterir | Veri | Tetik | Tür | Hareketi azalt |
|---|---|---|---|---|---|---|
| P1 | **Kutup haritası parsel renkleri** | Parsellerin uygunluk renkleri; tarih değişince renkler geçişle değişir | 7.1, S.4 | Tarih, yol, kalkış noktası | Veri | Renk doğrudan değişir |
| P2 | **Sıralamanın yeniden dizilişi** (demonun ana anı) | Gecikme kaydırıcısı çekilince liste satırları yeni yerlerine kayar; yükselen ve düşen parsel izlenebilir | 7.1, `docs/oneri-ve-dogrulama.md` | Gecikme kaydırıcısı | Veri | Liste kaymadan yenilenir; değişen satırlar işaretlenir |
| P3 | **Üç tarih satırı** | Seçilen, en yakın uygun ve önerilen tarih; değer değişince vurgulanır | §3 tarih algoritması | Kaydırıcı | Veri | Vurgu yalnız renk ve simgeyle |
| P4 | **Bölge müsaitlik şeridi** (ONAY BEKLİYOR) | Pencere boyunca her günün uygunluğu; imleç seçilen günde | S.4, parametre seti §10 | Kaydırıcı | Veri | İmleç atlar |
| P5 | Doğrulama rozetlerinin belirişi | T1–T4 rozetleri aday satırında | `docs/oneri-ve-dogrulama.md` §2 | Liste güncellenince | Arayüz | Anında |

### Uzman Analiz

| # | Animasyon | Ne gösterir | Veri | Tetik | Tür | Hareketi azalt |
|---|---|---|---|---|---|---|
| U1 | Pareto grafiği | Noktalar süzgeç ya da ağırlık değişince yeni yerlerine kayar; Pareto cephesi çizgisi yeniden çizilir | S.8 | Süzgeç, ağırlık | Veri | Doğrudan yeniden çizim |
| U2 | Aylık görünüm | Parsel × gün ısı haritası; imleç seçilen günde | S.4 | Tarih | Veri | İmleç atlar |
| U3 | Batarya grafiği | Karanlık süresince batarya seviyesinin düşüşü | 3.1, S.4 | Parsel, tarih | Veri | Son durum durağan |

Uzman sayfası bilerek sade: hareket yalnız değer değişince olur.

### Site Detay

| # | Animasyon | Ne gösterir | Veri | Tetik | Tür | Hareketi azalt |
|---|---|---|---|---|---|---|
| S1 | **360° ufuk panoraması** (KARAR, kullanıcı; 2B, KARAR ajan) | Seçilen noktanın ufuk silüeti; Güneş (amber) ve Dünya (mavi) simgeleri izleri boyunca kayar; Güneş silüetin arkasına girince disk kesri azalarak kararır | 0.3, 0.1, 0.4 | Zaman oynatıcı | Veri (SVG) | Simgeler oynatıcıyla atlar, otomatik oynatma yok |
| S2 | **Geri sayımlar** | Gün batımı, Dünya batımı, sonraki iletişim penceresi | 0.5, S.5 | Saat | Veri | Değer her dakika güncellenir, akış yok |
| S3 | **Zaman çizelgesi imleci** | Güneşli, kısmi, karanlık dönemler ve iletişim pencereleri üstünde ilerleyen imleç | S.4, S.5 | Zaman oynatıcı | Veri | İmleç atlar |
| S4 | **Astronot görünümü** | Noktaya inmiş biri gibi birinci şahıs bakış: arazi, gökyüzünde Güneş ve Dünya, gölgeler | 0.1, 3B arazi | Fare ya da parmakla bakış; zaman oynatıcı | 3B | Tek bakış yönünde durağan kare |
| S5 | **Direk yüksekliği kaydırıcısı** (ONAY BEKLİYOR) | Kaydırıcı yükseldikçe panoramadaki silüet alçalır, güneşli süre uzar | S.9 | Kaydırıcı | Veri | Doğrudan yeniden çizim |
| S6 | Oynat düğmesi | Zamanı seçilebilir hızda ileri akıtır (ör. 1 saat = 1 saniye) | S.3 ara değerleme | Kullanıcı | Veri | Otomatik akış kapalı; adım adım ilerleme |

### Karşılaştır

| # | Animasyon | Ne gösterir | Veri | Tetik | Tür | Hareketi azalt |
|---|---|---|---|---|---|---|
| K1 | İki panorama ortak saatle | İki parsel ya da iki tarih aynı anda oynar; birinde güneş batarken öbüründe sürer | S1 ile aynı | Ortak zaman oynatıcı | Veri | Adım adım |
| K2 | Fark vurgusu | Özet tablodaki farklı değerler değişince vurgulanır | 7.1 | Saat, seçim | Arayüz | Yalnız renk ve simge |

### Görevler (yalnız görsel; KARAR, kullanıcı)

| # | Animasyon | Ne gösterir | Veri | Tetik | Tür | Hareketi azalt |
|---|---|---|---|---|---|---|
| G1 | **Dönen Ay küresi ve kamera uçuşu** | Scroll ile görevden göreve geçilir; kamera iniş noktasına süzülür; nokta işareti sonuca göre (başarılı, kısmi, başarısız) | Görev listesi (B14) | Scroll | 3B | Küre durağan, seçilen görev işaretli |
| G2 | Görev kartı belirişi | Ad, ülke, tarih, sonuç | B14 | Scroll | Arayüz | Anında |

Not: işaret biçimi sonucu yalnız renkle değil, simgeyle de ayırt eder. Amber ve mavi işaret rengi olarak kullanılmaz.

### Hakkında

Animasyon yok (KARAR, ajan, yetkiyle). Doğrulama tablosu ve yöntem anlatısı durağan; güven sayfası
dikkat dağıtmamalı.

### Her sayfada

| # | Animasyon | Ne | Tür |
|---|---|---|---|
| H1 | **Rehberli tur vurgusu** | Turun her adımında ilgili öğenin etrafında vurgu halkası, sayfalar arası yumuşak geçiş | Arayüz |
| H2 | Sayfa geçişi | Kısa solma | Arayüz |
| H3 | Bekleme | Yok: veri önceden hazır (ilke 1, hız). Parça yüklenirken iskelet görünümü gösterilir, "Analyzing..." yazmaz | Arayüz |

## 4. Animasyon ekibinin teslim edeceği sahneler

A1, A3, A5, S4, G1. Hepsi sahne arayüzüne bağlanır: `bagla(kap, abonelik)` ve `birak()`; veri
`{ zaman, site, gunesVektoru, dunyaVektoru, ufukProfili, aydinlanma, dil, hareketAzalt }`. Gerçek veri
gelmeden sahte abonelikle çalışılır (Aşama 1c). Her sahne "hareketi azalt" ve düşük güç durumu için durağan
kare üretir.

3B arazi (A3, A5, S4) LOLA'dan türetilir (parametre seti §14, "3B arazi mesh'i: bekliyor"). Ay küresinin dokusu
için Moon Trek ya da LROC kaynakları değerlendirilir; kullanım koşulları kontrol edilecek (`docs/mimari.md` §11).

## 5. Açık

- P4 ve S5 kullanıcı onayına bağlı (parametre setinin ek özellikleri).
- 3B arazi mesh'inin çözünürlüğü ve boyutu: pilot ve animasyon ekibiyle.
- Ana Sayfa anlatısındaki örnek noktalar ve tarihler (A3, A5) bilim ekibinden; uydurulmaz.
