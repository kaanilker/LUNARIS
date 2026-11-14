# LUNARIS — Bilimsel Parametre, Formül ve Kriter Seti

> NASA Space Apps Challenge 2026 · Ay güney kutbu iniş sahası ve tarih karşılaştırma aracı · Quasar Team
> Sürüm: 2026-11-14 · Durum: **ÖNERİ** (bilim ekibinin onayı bekleniyor)
> Repo: https://github.com/kaanilker/LUNARIS · Önerilen yer: `docs/bilim-parametre-seti.md`

> **Proje notu (2026-11-14):** Kullanıcı bu dosyayı bilimsel değerlerin ana kaynağı yaptı (KARAR). Siteye
> entegrasyon kullanıcı kararlarına göre yapılır; çelişkide `docs/sayfalar.md` ve `docs/mimari.md` geçerlidir.
> Bağımsız doğrulama ve düzeltme önerileri: `docs/parametre-seti-dogrulama.md` (B-1…B-9). Girdi durumu:
> `docs/bilim-girdileri.md`. Bu not dışında dosyanın içeriği değiştirilmedi.

Bu dosya LUNARIS'in bütün hesap katmanını tek yerde toplar. Her parametre için **değeri, ne için kullanıldığı ve kaynağı**; her formül için **ne hesapladığı ve senaryoda ne işe yaradığı**; her modül için **kriterleri ve arayüz işlevi** yazılıdır. Sonda site planına eşleme, NASA aday bölgeleri ve devralan ajan için teslim notu vardır.

**Etiketler**

| Etiket | Anlamı | Sitede nasıl görünür |
| --- | --- | --- |
| [K] | Ekibin yüklediği kaynaklarda var | Normal |
| [T] | LUNARIS tasarım önerisi, bilim ekibi karar verir | "LUNARIS varsayımı" rozeti |
| [G] | Genel bilinen fiziksel değer, kaynak henüz eklenmedi | Kaynak girilene kadar "yer tutucu" |
| [D] | Claude'un düzeltmesi ya da eklemesi | Onaya kadar [T] gibi |
| [W] | Wueller vd. 2026 açık verisinden hesaplandı | Normal, kaynak gösterilir |

Formül numaraları: `0.1–7.2` modül denklemleri; `S.1–S.10` site için sonradan eklenen denklemler (ilgili modülün içinde durur). Numaralar önceki taslaklarla aynıdır.

---

## İçindekiler

1. Son kontrol özeti
2. Modül 0 — Efemeris, ufuk maskesi, zaman (çekirdek)
3. Modül 1 — İniş güvenliği
4. Modül 2 — Güneşlenme, güç, termal
5. Modül 3 — Ay kışı, depolama, tarih esnekliği, kalkış modeli
6. Modül 4 — İletişim (DTE), DSN, görelilik
7. Modül 5 — PSR erişimi ve bilimsel değer
8. Modül 6 — Toz ve altyapı
9. Modül 7 — Bileşik skor, karşılaştırma, Pareto
10. NASA Artemis aday bölgeleri, koordinatlar, jeoloji, erişilebilirlik
11. Site planına eşleme (7 sayfa)
12. Bilim girdileri B1–B20 durumu
13. Proje ilkeleriyle uyum
14. Veri ürünleri
15. Yarışma metniyle uyum
16. Açık işler
17. Teslim notu (devralan ajan için)
18. Kaynaklar

---

## 1. Son kontrol özeti

Bütün sayısal sonuçlar Python ile yeniden hesaplandı ve doğru çıktı:

| Hesap | Sonuç |
| --- | --- |
| Gölge katsayısı 1/tan 1,54° | 37,2 |
| Panel hücre tavanı 36 × 1.365 × 0,32 | 15,72 kW |
| Radyo ufku (4 m + 1,5 m) | 3,73 + 2,28 = 6,01 km |
| Regolit kalkan basıncı (4 m) | 12,3 kPa |
| Ay saati konum kayması | 16,8 km/gün |
| Maks. güneş yüksekliği 89,45°G / 88°G / 85°G | 2,09° / 3,54° / 6,54° |
| Eğrilik düşüşü 10 / 50 / 150 km | 0,16° / 0,82° / 2,47° |
| Termal denge 1,54° / 3° / 6,5° | 156 / 185 / 224 K |
| Batarya (1 kW; 68 / 73 / 117 saat) | 89 / 96 / 154 kWh |
| X-bant serbest uzay kaybı (384.400 km) | 222,6 dB |
| Kutup kapağı alanı 83°G → 90°G | ≈ 141.000 km² |
| Wueller verisi, ≥10 gün güneşli saha 2031 / 2032 | 44 / 98 (makale: 44 / 97) |

Son kontrolde düzeltilenler:

| # | Sorun | Düzeltme |
| --- | --- | --- |
| 1 | "min. 10 kWe garanti" ifadesi (ilke 3) | "10 kWe tasarım hedefi" |
| 2 | "Geçersiz iniş bölgesi", "Kritik hata" (ilke 3) | "Eşik dışı", "Toz riski" |
| 3 | Modül 1, 4, 6'daki **sarı** uyarı rengi (ilke 6: amber yalnız Güneş) | Ayrı bir uyarı tonu (öneri: macenta) + ikon |
| 4 | Parsel sınırı 84°G yazıyordu, 2024 bölgeleri 83,4°G'ye uzanıyor | 83°G; parsel sayısı ≈ 141.000 |
| 5 | Hız hesabında eski 72.000 parsel sayısı | 141.000 |
| 6 | Erişilebilirlik ve jeoloji "kapsam dışı" görünüyordu | Vekil kural + USGS eşlemesi (Bölüm 10) |
| 7 | Görevler sayfasında hiç koordinat yoktu | Chandrayaan-3 ve IM-1 eklendi |

---

## 2. Modül 0 — Efemeris, ufuk maskesi, zaman (çekirdek) [D]

Bütün modüller bu modülün çıktısını kullanır: her saha ve zaman için Güneş ve Dünya'nın yüksekliği (e), azimutu (A) ve o azimuttaki arazi ufku H(A). Plan §6'daki "gökyüzü tablosu + ufuk profili" mimarisi bu modülün kendisidir.

### Parametreler

| Parametre | Değer | Ne için kullanılır | Etiket |
| --- | --- | --- | --- |
| Efemeris | JPL DE440 + Ay yönelim çekirdeği (SPICE), Horizons doğrulama | Güneş/Dünya vektörlerini Ay sabit çerçevesinde bulmak | [K], sürüm [G] |
| Çerçeve | MOON_ME (LOLA ile aynı) | DEM ile efemerisin aynı koordinatta olması | [T] |
| Sapma düzeltmesi | LT+S (ışık zamanı + yıldız sapması) | Görünen konum | [T] |
| Ay ortalama yarıçapı R | 1.737,4 km | Eğrilik, radyo ufku, izdüşüm | [K] |
| Topografya (yakın) | LOLA güney kutup DEM, 5 m/piksel | Yakın ufuk, eğim | [K] |
| Topografya (uzak) | LOLA kutup DEM, 20–60 m/piksel | 150 km'ye kadar uzak ufuk | [T] |
| Sinodik ay | 29,53 gün | Bir Ay günü; Güneş azimutu 360° döner | [G] |
| Güneş azimut hızı ω | 0,508°/saat ≈ 12,2°/gün | Kalan süre tahmini | [D] |
| Güneş açısal yarıçapı r☉ | ≈ 0,267° | Disk kısmi görünürlüğü | [G] |
| Dünya açısal yarıçapı r⊕ | ≈ 0,95° | Dünya'nın ufukta kısmi görünmesi | [G] |
| Dünya–Ay mesafesi | 356.500–406.700 km (ort. 384.400) | Link bütçesi, ışık gecikmesi | [G] |
| Zaman aralığı | 2026-01-01 → 2033-12-31 | "Şu an" ve 2031/2032 doğrulama vakaları kapsansın | [T] |
| Zaman adımı | 1 saat (tablo), 10 dk (geri sayım inceltme) | Hesap yükü / hassasiyet | [T] |
| Azimut çözünürlüğü | 0,5° (720 ışın) | Ufuk panoraması | [T] |
| Ufuk tarama mesafesi | 150 km | Uzak dağların etkisi | [T] |
| Hedef ufuk hatası ε_H | 0,05° | Ray örnekleme adımı | [T] |
| Ufuk yükseklikleri h_g | 2 / 10 / 20 m | Direk kaydırıcısı için 3 ayrı profil | [T] |

### Formüller

**0.1 — Sahadan görülen yükseklik ve azimut (vektör yöntemi)**

```math
\hat{s} = \frac{\vec r_{\text{cisim}} - \vec r_{\text{saha}}}{\lVert \vec r_{\text{cisim}} - \vec r_{\text{saha}} \rVert}, \qquad e = \arcsin(\hat{s}\cdot\hat{u}), \qquad A = \operatorname{atan2}(\hat{s}\cdot\hat{e},\ \hat{s}\cdot\hat{n})
```

û yukarı, ê doğu, n̂ kuzey birim vektörüdür (S.2). Cisim Güneş ya da Dünya.
**Senaryoda:** efemeris verisini "gökyüzünde nerede" bilgisine çevirir. Gök kubbesi, panorama ve 3B sahnedeki Güneş/Dünya konumu buradan gelir. Dünya'nın ~1°'lik paralaksı yalnız bu vektör yöntemiyle doğru çıkar.

**S.2 — Saha vektörü ve yerel eksenler (ENU)**

```math
\vec r_{\text{saha}} = (R+z)\begin{pmatrix}\cos\varphi\cos\lambda\\ \cos\varphi\sin\lambda\\ \sin\varphi\end{pmatrix},\quad \hat u = \frac{\vec r_{\text{saha}}}{\lVert\vec r_{\text{saha}}\rVert},\quad \hat e = \begin{pmatrix}-\sin\lambda\\ \cos\lambda\\ 0\end{pmatrix},\quad \hat n = \begin{pmatrix}-\sin\varphi\cos\lambda\\ -\sin\varphi\sin\lambda\\ \cos\varphi\end{pmatrix}
```

z DEM yüksekliğidir. **Senaryoda:** 0.1'in eksik parçası; motorun her saha için yerel ekseni kurmasını sağlar.

**0.2 — Alt-nokta yaklaşımı (hızlı analitik sürüm)**

```math
\sin e = \sin\beta\,\sin\varphi + \cos\beta\,\cos\varphi\,\cos(\lambda-\lambda_s), \qquad \tan A = \frac{\sin(\lambda_s-\lambda)\cos\beta}{\cos\varphi\sin\beta - \sin\varphi\cos\beta\cos(\lambda_s-\lambda)}
```

(β, λ_s) Güneş için alt-Güneş noktası, Dünya için alt-Dünya noktası (libration).
**Senaryoda:** öğretici mod ve Ana Sayfa'daki Ay küresinin aydınlatılması. Paralaks içermediği için hassas Dünya hesabında 0.1 kullanılır.

**0.3 — Ufuk maskesi (LOLA + eğrilik)**

```math
H(A) = \max_{0<d\le d_{\max}} \left[ \arctan\!\left(\frac{z(A,d) - z_0 - h_g}{d}\right) - \frac{d}{2R} \right]
```

z(A,d) A azimutunda d uzaklıktaki DEM yüksekliği, z₀ saha yüksekliği, h_g panel/anten yüksekliği. d/(2R) eğrilik nedeniyle ufkun alçalmasıdır.
**Senaryoda:** atmosfer olmadığı için kırılma yoktur, ufuk yalnız arazidir. 360° panoramanın silüeti budur. Her parsel için bir kez, çevrimdışı hesaplanır; plandaki "en pahalı adım"dır.

**S.10 — Ufuk ışını örnekleme adımı**

```math
\Delta d(d) = \max\big(\Delta_{\text{piksel}},\ d\cdot\tan\varepsilon_H\big), \qquad \varepsilon_H = 0{,}05^\circ
```

10 km'de 8,7 m, 100 km'de 87 m. Işın başına ≈ 5.000, nokta başına (720 ışın) ≈ 3,5 milyon örnek. 1 km kaba parselle (≈ 141.000 parsel) makul; 100 m ince noktalar yalnız seçili parsellerde.
**Senaryoda:** pilot ölçümün (Aşama 1a) neyi ölçeceğini ve parsel boyutunu belirler.

**0.4 — Diskin görünür kesri**

```math
x = \operatorname{clip}\!\left(\frac{e - H(A)}{r},\,-1,\,1\right), \qquad f = \frac{\arccos(-x) + x\sqrt{1-x^2}}{\pi}
```

r Güneş için 0,267°, Dünya için 0,95°. f = 1 tam görünür, 0,5 yarı batmış, 0 ufkun altında.
**Senaryoda:** kutupta Güneş ufkun 1–2° üstünde sürünür ve disk sık sık kısmen kapanır. Güç hesabında doğrudan çarpandır; yoksa güç açık-kapalı gibi yanlış şekilde zıplar.

**0.5 — Kalan süre (sunset / Earthset)**

```math
t_{\text{batış}} = \min\{\, t > t_0 \;:\; e(t) - H(A(t)) < -r \,\}, \qquad \Delta t \approx \frac{A_{\text{kesişim}} - A(t_0)}{\omega}
```

Zaman adımıyla ileri yürünür, işaret değişince ikiye bölme ile dakikaya inceltilir. Sağdaki yaklaşım yalnız Güneş için geçerli; Dünya gökyüzünde neredeyse sabittir, ~27,2 günlük libration döngüsüyle iner/çıkar.
**Senaryoda:** yarışma metnindeki "time remaining before sunset or Earthset" sayacının kendisi.

**S.3 — Zaman ölçeği ve tablo ara değerlemesi**

```math
ET \approx UTC + \Delta AT + 32{,}184\ \text{s}, \qquad \hat s(t) = \frac{(1-u)\,\hat s_k + u\,\hat s_{k+1}}{\lVert (1-u)\,\hat s_k + u\,\hat s_{k+1}\rVert}, \quad u = \frac{t - t_k}{\Delta t}
```

SPICE ET (TDB) ile çalışır, kullanıcı UTC girer; ΔAT artık saniye toplamı (şu an 37 s [G]), fark ≈ 69,2 s. Hat dönüşümü artık saniye çekirdeğiyle yapar, pakete UTC ekseni yazar.
**Senaryoda:** zaman oynatıcının saniye hassasiyetinde akıcı çalışması; tarayıcı tabloyu ara değerler, yeniden hesaplamaz (ilke 1: hız).

**S.1 — Kutup stereografik izdüşüm (parsel ağı)**

```math
\rho = 2R\tan\!\left(\frac{\pi}{4} + \frac{\varphi}{2}\right), \quad x = \rho\sin\lambda, \quad y = \rho\cos\lambda; \qquad \varphi = 2\arctan\frac{\rho}{2R} - \frac{\pi}{2}, \quad \lambda = \operatorname{atan2}(x, y)
```

Güney kutup için (φ negatif). Ölçek hatası k = 2/(1 − sin φ): 83°G'de %0,37. Parametreler LOLA DEM'in kendi izdüşümüyle aynı olmalı [G].
**Senaryoda:** parsel ↔ enlem/boylam dönüşümü, kutup haritası, özel koordinatın parselini bulma.

**S.9 — Direk yüksekliği ve özel koordinat için ufuk ara değerlemesi**

```math
H(A; h) = H(A; h_i) + \frac{h - h_i}{h_{i+1} - h_i}\big[H(A; h_{i+1}) - H(A; h_i)\big], \quad h_i \in \{2, 10, 20\}\ \text{m}; \qquad H_{\text{özel}}(A) = \frac{\sum_i H_i(A)/d_i^2}{\sum_i 1/d_i^2}
```

Solda: paket her noktada 3 yükseklikte ufuk tutar, kaydırıcı aradaki değeri doğrusal bulur. Sağda: özel koordinatta 4 en yakın ince noktanın ufku uzaklıkla ağırlıklandırılır; komşu ufuklar arasında fark 0,5°'yi aşarsa "yaklaşık sonuç" uyarısı.
**Senaryoda:** tarayıcıda DEM olmadan direk kaydırıcısını ve özel koordinat girişini mümkün kılar.

### Arayüz işlevi

- Site Detay: 360° panorama (0.3 silüeti), üstünde Güneş (amber) ve Dünya (mavi) izleri (0.1).
- Gün batımı / Dünya batımı geri sayımı (0.5).
- Zaman oynatıcı ve zaman çizelgesi (S.3); tek saat, bütün bileşenler aynı saati dinler.

---

## 3. Modül 1 — İniş güvenliği

Bir saha, 100 m'lik elips içinde eğim belirsizlik payı eklendikten sonra bile 8°'yi aşmıyorsa geçer. Bu modül **sert kısıttır** (geçti/kaldı), puan vermez.

### Parametreler ve kriterler

| Parametre | Değer | Ne için kullanılır | Etiket |
| --- | --- | --- | --- |
| İniş elipsi yarıçapı | 100 m | Eğim ve aydınlanma elips içindeki dağılımla değerlendirilir. NASA'nın "bölge içinde ≈100 m yarıçaplı saha" tanımıyla aynı | [K] Barker, NASA 2022 |
| Maks. zemin eğimi (kriter) | < 8° (HLS); Artemis III adayları için < 5° | Eğim filtresi | [K] Wueller, Doc 3 |
| Tampon (kriter) | ≥ 8° eğimlerden ≥ 100 m uzak | Dik yamaçtan uzak durma | [K] Wueller |
| DEM belirsizliği σ_θ | 0,30–0,50 m yükseklik, 1,5–2,5° eğim (5 m/piksel) | Eğim sonucuna güvenlik payı | [K] Barker |
| Güvenlik katsayısı k | 1 (nominal) / 2 (muhafazakâr) | Etkin eğim | [T] |
| Elips içi istatistik | Ortalama yerine 10. yüzdelik | Kötü koşulda iniş noktasını kapsamak | [T] |
| Krater ≤ 1,2 m, kaya ≤ 32 cm, düz alan ≥ 24 × 24 m | Varsayımsal tehlike katmanı | Chandrayaan-3 (Vikram) kriteri, genel HLS kriteri değil | [K] Suresh & Amitabh |
| NDL: Δh 0,15 m, Δv 0,012 m/s (3σ) | Navigasyon sensörü bağlamı | IM-1'de ölçülen performans, gereksinim değil | [K] NASA/TM-20250010290 |

### Formüller

**1.1 — DEM'den eğim** [D]

```math
\theta = \arctan\sqrt{\left(\frac{\partial z}{\partial x}\right)^2 + \left(\frac{\partial z}{\partial y}\right)^2}
```

Türevler 3×3 komşulukta (Horn yöntemi) 5 m aralıkla alınır.
**Senaryoda:** eğim haritasının kendisi; elips içindeki maksimum, iniş eğimidir. Modül 5'teki yol eğimi de aynı formülle hesaplanır.

**1.2 — Güvenlik paylı etkin eğim** [T]

```math
\theta_{\text{etkin}} = \max_{\text{elips}}\theta + k\,\sigma_\theta, \qquad \sigma_\theta \in [1{,}5^\circ,\ 2{,}5^\circ]
```

**Senaryoda:** 6,5° ölçülen bir saha k = 1 ile 8–9° olabilir. Renk etkin eğime göre verilir; kullanıcı belirsizliğin sonucu nasıl değiştirdiğini görür (Uzman sayfasında k değiştirilebilir).

### Arayüz işlevi

- Seçilen noktanın etrafında 100 m çember; içindeki maks. eğim ve θ_etkin.
- Renk: θ_etkin < 5° yeşil; 5–8° uyarı tonu (amber değil); > 8° ya da ≥ 8° yamaç < 100 m ise kırmızı, etiket "Eşik dışı: eğim > 8° (belirsizlik dahil)". 8° sınırı [K], 5° ayrımı [T].
- Kaya ve krater katmanı "varsayımsal" etiketli: 5 m LDEM'in ~%90'ı enterpolasyondur, 32 cm kaya DEM'den çıkarılamaz [K, Barker / Peña-Asensio].

---

## 4. Modül 2 — Güneşlenme, güç, termal

Kutupta Güneş en fazla (90° − |φ|) + 1,54° yükselir. Bu yüzden güç, güneş yüksekliğinden çok ufuk maskesine ve direk yüksekliğine bağlıdır.

### Parametreler ve kriterler

| Parametre | Değer | Ne için kullanılır | Etiket |
| --- | --- | --- | --- |
| Ay ekseninin ekliptiğe eğikliği | ≈ 1,54° | Alt-Güneş enlemi β☉ bu aralıkta salınır | [K] |
| Güneş akısı Φ | 1.365 W/m² (aralık 1.358–1.410) | Panel gücü. Güncel TSI ≈ 1.361 W/m², fark %0,3 | [K], [G] |
| Hücre verimi η | %32 (çok eklemli) | Panel gücü | [K] |
| VSAT paneli | 36 m² (2 paket × 8 panel × 3 m × 0,75 m), alt kenar ≥ 10 m, direk ≤ 20 m | Referans tasarım, **10 kWe tasarım hedefi** | [K] |
| Direk yüksekliği h_g | 2–20 m kaydırıcı | Ufuk maskesini (0.3) düşürür | [K] aralık |
| Sistem kayıpları η_sis | ≈ 0,64 (15,7 kW tavandan 10 kWe hedefe) | Anlık gücü gerçeğe yaklaştırmak | [D] türetildi |
| Aydınlanma oranı I(h) | En iyi sırtlarda %77,7–85+ (Gläser CR1 2 m'de %92,27) | Gözlenen değer, kriter değil. Yıllık mı teyit edilmeli | [K] |
| **Alt sınır (kriter)** | Yıllık ortalama > %25 | Sert eleme | [K] Doc 3 |
| İyi saha hedefi | Yıllık ≥ %70 | Puanlamada üst referans | [T] |
| Aydınlık sayılma eşiği | f ≥ 0,5 | Zaman serisi metrikleri (S.4) | [T] |
| Regolit albedosu a | ≈ 0,12 | Termal denge | [G] |
| Yüzey yayınlığı ε | ≈ 0,95 | Termal denge | [G] |

### Formüller

**2.1 — Güneş yüksekliği ve maksimumu**

```math
\alpha = \arcsin(\sin\delta\sin\varphi + \cos\delta\cos\varphi\cos HRA), \qquad \alpha_{\max} \approx (90^\circ - |\varphi|) + 1{,}54^\circ
```

0.2'nin Güneş hali. 89,45°G'de 2,09°, 88°G'de 3,54°, 85°G'de 6,54°. Görünmesi için ayrıca α > H(A).
**Senaryoda:** yarışmanın öne çıkardığı "solar elevation angle" metriği; Site Detay'da büyük gösterilir.

**2.2 — Gölge uzunluğu**

```math
L = \frac{h}{\tan\theta}
```

θ = 1,54° için L ≈ 37,2·h: 10 m engel 372 m gölge. (Dünya'da öğlen 60° güneşte L = 0,58·h.)
**Senaryoda:** Ana Sayfa anlatısı ve öğretici mod; "küçük tepe neden büyük sorun" sorusunu tek sayıyla açıklar.

**2.3 — Anlık ve ortalama güç**

```math
P(t) = A\,\Phi\,\eta\,\eta_{\text{sis}}\,\cos\theta_{\text{sapma}}\,f(t), \qquad \bar P = \frac{1}{T}\int_0^T P(t)\,dt \approx P_{\text{anlık}}\cdot I(h_g)
```

f(t) disk kesri (0.4). Dikey panel ufka yakın Güneşe baktığı için cos θ_sapma ≈ 1, ama panel azimutta Güneşi izlemelidir. 36 × 1.365 × 0,32 = 15,7 kW hücre tavanı; η_sis ile 10 kWe.
**Senaryoda:** güç paneli ve Planlayıcı'nın güç metriği. "2 m'de 0 kW" gibi ikili çıktı yerine I(h) eğrisiyle sürekli değer verir.

**2.4 — Termal denge sıcaklığı** [D]

```math
T_{\text{eq}} = \left[\frac{(1-a)\,\Phi\,\sin\alpha\cdot f}{\varepsilon\,\sigma}\right]^{1/4}, \qquad \sigma = 5{,}67\times10^{-8}\ \text{W m}^{-2}\text{K}^{-4}
```

Düz zemin, iletim ve IR yansımaları ihmal. 1,54°'de ≈ 156 K, 3°'de ≈ 185 K, 6,5°'de ≈ 224 K; gölgede 40–100 K.
**Senaryoda:** yarışma metnindeki "thermal conditions for equipment"; ekipman ısıtıcı ihtiyacının kaba göstergesi.

### Arayüz işlevi

- Direk kaydırıcısı 2–20 m; kaydırınca panoramadaki maske çizgisi ve I(h) eğrisi birlikte değişir (S.9).
- Yükseklik etkisi eğri olarak: Mazarico'ya göre 2 m bile iyileştirir; Fincannon'a göre 100 m kule depolama ihtiyacını %15–21 azaltır; Bryant'a göre 2.500 m'den kısa kuleyle %100 aydınlanan yer yok [K].
- Termal çubuk: T_eq, Dünya'daki öğlen sıcaklığıyla yan yana [T].

---

## 5. Modül 3 — Ay kışı, depolama, tarih esnekliği, kalkış modeli

Ay'ın mevsimi yaklaşık 346,6 günlük bir döngüdür. Tarih kaydırılınca hem Güneş azimutu (29,5 gün) hem alt-Güneş enlemi (346,6 gün) değişir; "küçük tarih değişikliği, büyük etki" buradan gelir.

### Parametreler ve kriterler

| Parametre | Değer | Anlamı / kullanımı | Etiket |
| --- | --- | --- | --- |
| Depolama ihtiyacı t_d | Shackleton A1, en kötü Ay günü: 73–117 saat | Batarya süresi (LCSP değil). Şarj oranı 0,25'te 73, 4'te 117 saat | [K] Fincannon |
| Şarj oranı | 0,25 / 0,5 / 1 / 2 / 4 | 1 saat deşarj için gereken şarj saati | [K] |
| Gerçek LCSP | SR1 ≈ 2,5 gün, SP-01 ≈ 1,5 gün | En uzun kesintisiz gölge | [K] Wei, Mazarico |
| **Güneş penceresi (kriter)** | ≥ 10 ardışık güneşli gün | 6,5 günlük NASA yüzey görevi + tampon. Sert kısıt | [K] Wueller, NASA 2022 |
| A1 + B bağlantısı | Aydınlanma 0,71 → 0,84; depolama 117 → 68 saat (oran 4) | B sahası ~10 km uzakta | [K] Fincannon |
| Bağlı depolama (oran 4/2/1/0,5/0,25) | 68 / 62 / 58 / 58 / 58 saat | "Node 2 bağla" düğmesinin çıktısı | [K] |
| Ay mevsim periyodu | ≈ 346,6 gün (tutulma yılı) | β☉'nin ±1,54° salınımı | [G][D] |
| Desen tekrarı | ≈ 18,03 yıl (Saros) — kaynakta 18,6 yıl | Yıldan yıla fark. Teyit edilmeli | [G][D] |
| Yıllık fark örneği | ≥ 10 gün güneşli saha: 2031'de 44, 2032'de 97 | Tarih aracının gerekçesi | [K] Wueller |
| Yük gücü P_yük | 1 kW (gece hayatta kalma, örnek) | Batarya boyutu | [T] |
| DoD, η_d | 0,8 ve 0,95 | Batarya boyutu | [T] |
| Özgül enerji | 150–200 Wh/kg (Li-iyon hücre) | Batarya kütlesi | [G] |
| Geçiş profili T_t | Doğrudan ≈ 7 gün (IM-1), faz döngülü ≈ 40 gün (Chandrayaan-3), ≈ 46 gün (Blue Ghost M1), düşük enerji ≈ 4,5 ay (Hakuto-R M1) | Kalkış modeli (S.7) | [G] teyit |

### Formüller

**3.1 — Batarya kapasitesi ve kütlesi** [D]

```math
E = \frac{P_{\text{yük}}\cdot t_d}{\mathrm{DoD}\cdot\eta_d}, \qquad m_{\text{bat}} = \frac{E}{e_{\text{özgül}}}
```

1 kW için: 73 saat → 96 kWh (≈ 480–640 kg); 117 saat → 154 kWh (≈ 770–1.030 kg); 68 saat → 89 kWh.
**Senaryoda:** depolama saatini mühendisin anladığı kütleye çevirir; "Node 2 bağla"nın kazancı kg olarak görünür.

**3.2 — Tarih kaydırmada açı değişimi** [D]

```math
\Delta A_\odot \approx 360^\circ\cdot\frac{\Delta t}{29{,}53\ \text{gün}}, \qquad \beta_\odot(t) \approx 1{,}54^\circ\,\sin\!\left(2\pi\,\frac{t - t_0}{346{,}6\ \text{gün}}\right)
```

14 gün ileri sarmak ΔA ≈ 171° yapar: Güneş arazinin karşı tarafından bakar, gölgeler tamamen değişir.
**Senaryoda:** "tarih değişince saha neden bozuluyor" sorusunun iki sayılık cevabı (öğretici mod). Hassas hesapta Modül 0 kullanılır.

**S.4 — Zaman serisinden parsel metrikleri**

```math
I = \frac{1}{N}\sum_k f_k, \quad D = \frac{1}{N}\sum_k \mathbb{1}[e_{\oplus,k} - H_k \ge 2^\circ], \quad t_d \approx \Delta t\cdot\max(\text{ardışık } f_k < 0{,}5), \quad W(t_L) = \Delta t\cdot\#\{t_L\text{'den itibaren ardışık } f_k \ge 0{,}5\}
```

I aydınlanma oranı, D Dünya görünürlük oranı, t_d en uzun karanlık, W inişten sonraki güneş penceresi (≥ 10 gün kısıtı).
**Senaryoda:** literatürde yalnız Shackleton A1 için verilen depolama değerini **her parsel için** hesaplanabilir yapar. Sınırlama: Fincannon'un şarj oranı etkisini içermez (Hakkında'da yazılır).

**S.7 — Kalkış modeli (B18, taslak)**

```math
t_{\text{varış}} = t_f + T_t(\text{profil}), \qquad t_{\text{iniş}} = \min\{t \ge t_{\text{varış}} : \text{sert kısıtlar}(p, t)\}, \qquad M = t_{\text{iniş}} - t_f \to \min
```

t_f fırlatma, T_t geçiş süresi, M görev süresi (planlayıcının en aza indirdiği). Fırlatma enlemi park yörüngesi eğimini (i ≥ |φ_L|) ve günlük fırlatma saatini belirler; varış gününü 1 günlük çözünürlükte genelde değiştirmez.
**Öneri:** Planlayıcının asıl girdisi **geçiş profili** olsun; kalkış noktası bilgi amaçlı kalsın, ekranda "etkisi saat mertebesinde" yazsın (ilke 3).
**Senaryoda:** Planlayıcının ve gecikme kaydırıcısının çekirdeği; "en uygun tarih" = M'yi en küçük yapan t_f.

### Arayüz işlevi

- Tarih aracı: gün/hafta/ay adımlarıyla ileri-geri. Doğru açıklama sinodik aydır ("presesyon nedeniyle 14 günde" yanlıştı).
- Güneş penceresi 10 günün altına düşünce alarm [K].
- "Node 2 bağla": depolama 117 → 68 saat, batarya kütlesi düşer. Metin "ihtiyaç düşer" der, "görevi kurtarır" demez.
- "En yakın uygun tarih": seçili sahada bütün sert kısıtları geçen bir sonraki iniş tarihi [T].

---

## 6. Modül 4 — İletişim (DTE), DSN, görelilik

Kutupta Dünya yaklaşık 14 gün ufkun üstünde, 14 gün altındadır; ritmi enlem libration'ı belirler. DTE için Dünya'nın görünmesi yetmez: link bütçesi ve bir DSN istasyonu da gerekir.

### Parametreler ve kriterler

| Parametre | Değer | Ne için kullanılır | Etiket |
| --- | --- | --- | --- |
| Dünya görünürlüğü | ≈ 14 gün üstte / 14 gün altta (−85° civarında ≈ 19 güne kadar) | DTE penceresi | [K] Vanoutryve, De Rosa |
| **Min. Dünya yüksekliği (kriter)** | e⊕ − H(A⊕) ≥ 2° | Kullanılabilirliği en fazla %5 düşürür | [K] De Rosa |
| **Zaman kriteri** | Zamanın ≥ %50'sinde Dünya görünür | Sert kısıt | [K] Doc 3 |
| Optik libration | Enlem ±6,68°, boylam ±7,9° → tepe-tepe ≈ 13,4° × 15,8° | Alt-Dünya noktası. Doc 3'teki 13 × 15° ile uyumlu | [G][D] |
| Günlük libration | ≈ ±1° | PDF'teki ≈16,5°/18° muhtemelen bunun eklenmiş hali. De Rosa 2012'den teyit | [G][D] |
| Enlem libration periyodu | ≈ 27,21 gün | Earthset/Earthrise ritmi | [G] |
| Işık gecikmesi | Tek yön ≈ 1,28 s, gidiş-dönüş ≈ 2,56 s | Teleoperasyon | [G][D] |
| Frekans bantları | S ≈ 2,2 GHz, X ≈ 8,4 GHz, Ka ≈ 26 GHz | Link bütçesi | [G] |
| DSN istasyonları | Goldstone, Madrid, Canberra (~120° aralıklı) | Ay'ın Dünya'dan görünürlüğü | [K] PDF Böl. 6 |
| DSN maskesi | Ay yüksekliği ≥ 10° | S.5 | [T] |
| Link payı | ≥ 3 dB | Bağlantının güvenilir sayılması | [T] |
| Radyo ufku | 4 m direk + 1,5 m alıcı ≈ 6,0 km | Yüzey görüş hattı üst sınırı | [K] |
| Yüzey içi menzil | 300–500 m (UHF/Wi-Fi/4G-LTE) | Pratik kapsama | [K] |
| Ay saati kayması | 56,02 µs/gün (TCL için 58,72) | Navigasyon hata sayacı | [K] Ashby & Patla 2024 |

### Formüller

**4.1 — Dünya'nın yüksekliği** [D]

0.1 (hassas) ya da 0.2 (alt-Dünya noktası β⊕, λ⊕ ile). Tam kutupta e⊕ ≈ −β⊕; Dünya ufkun en fazla ~6,7° üstüne çıkar.
**Senaryoda:** gök kubbesindeki Dünya ikonu ve Earthset sayacı (0.5).

**4.2 — Radyo ufku**

```math
d = \sqrt{2Rh_1} + \sqrt{2Rh_2}, \qquad R = 1.737{,}4\ \text{km}
```

3,73 + 2,28 = 6,0 km. Pürüzsüz küre varsayımı; gerçek arazide kırınım ve krater duvarı değiştirir (LunaRF: sırt direkleri PSR zeminlerinin ≈ %61'ine ulaşır).
**Senaryoda:** iniş aracı–rover bağlantısının üst sınırı; haritada 6 km çemberi.

**4.3 — Serbest uzay kaybı ve link bütçesi** [D]

```math
L_{fs} = 20\log_{10}\!\left(\frac{4\pi d}{\lambda}\right), \qquad \frac{E_b}{N_0} = \mathrm{EIRP} - L_{fs} - L_{\text{diğer}} + \frac{G}{T} + 228{,}6 - 10\log_{10}R_b
```

384.400 km'de X-bant ≈ 222,6 dB, S-bant ≈ 211,0 dB; perije–apoje farkı ±0,6 dB.
**Senaryoda:** "Dünya görünüyor" ile "bağlanabiliyor" arasındaki farkı sayıya döker; uzman modda elde edilebilir veri hızı.

**4.4 — Çok yollu sönümleme** (JPL IPN 42-240A)

```math
P_{\text{alıcı}} = P\,\left|1 + \rho\,e^{\,j\Delta\varphi(t)}\right|^2
```

Güç (1−ρ)² ile (1+ρ)² arasında dalgalanır.
**Senaryoda:** Dünya ufka yakınken (< 2–5°) link kalitesinin neden dalgalandığını açıklar; 4.3'teki L_diğer'e pay olarak girer.

**4.5 — Ay saati (görelilik)**

```math
\Delta\tau(N) = 56{,}02\ \mu\text{s/gün}\times N, \qquad \Delta x \approx c\,\Delta\tau \approx 16{,}8\ \text{km/gün}
```

56,02 µs/gün bir hız farkıdır; birikmiş sapma gün sayısıyla çarpılır.
**Senaryoda:** "navigasyon hata payı" sayacı; eğitim modunda çekici bir öğe.

**S.5 — DSN görünürlüğü ve sonraki iletişim penceresi**

```math
L(t) = \mathbb{1}\big[e_\oplus(t) - H(A_\oplus(t)) \ge 2^\circ\big]\cdot\mathbb{1}\big[\max_j e_{\text{Ay},j}(t) \ge 10^\circ\big], \qquad t_{\text{sonraki}} = \min\{t > t_0 : L(t)=1,\ L(t-\Delta t)=0\}
```

e_Ay,j Ay'ın j istasyonundan yüksekliğidir (0.1, Dünya'daki istasyon için). Hat önceden hesaplayıp `dsn.bin`'e yazar.
**Senaryoda:** Site Detay'daki "sonraki iletişim penceresi" geri sayımı ve Uzman'daki DSN paneli.

### Arayüz işlevi

- İletişim barı: e⊕ − H < 2° kırmızı [K]; 2–5° uyarı tonu (çok yollu risk) [T]; link payı < 3 dB turuncu [T]. "İyi" durum mavi olabilir (Dünya'nın rengi).
- Haritada iki daire: 300–500 m LTE menzili ve 6 km radyo ufku [T].
- "Dünya görünüyor ≠ bağlanabiliyor" notu [K, PDF Böl. 6].
- Libration görseli: Dünya ikonunun 27 günlük sekiz-şekilli yolu [T].

---

## 7. Modül 5 — PSR erişimi ve bilimsel değer

Saha, 2 km içinde < 15° yolla ulaşılan ve yazın < 110 K kalan bir kalıcı gölge bölgesi (PSR) varsa rozet alır. Wueller'e göre 130 sahadan yalnız 21'i bunu sağlar (125 K'de 9 saha daha); rozet nadir olmalıdır.

### Parametreler ve kriterler

| Kriter | Değer | Ne için kullanılır | Etiket |
| --- | --- | --- | --- |
| EVA süresi | 6 ± 2 saat | Yürüyüş + çalışma bütçesi | [K] Artemis III, Peña-Asensio |
| **PSR'ye gidiş-dönüş** | < 2 saat | Erişilebilirlik kısıtı | [K] |
| **İniş noktasından PSR mesafesi** | ≤ 2 km (alternatifler 2–3, 5, 8 km) | Tarama yarıçapı | [K] Wueller, Doc 3, Losekamm, Jia |
| **Yol eğimi** | < 15° (PSR'lerin %94'üne kenardan bu eğimle ulaşılır) | Yol filtresi | [K] Peña-Asensio |
| **PSR yaz maks. sıcaklığı** | < 110 K (alternatif 125 K) | Su buzunun kararlılığı | [K] Wueller |
| Yürüme hızı v | ≈ 2 km/saat | Gidiş-dönüş süresi | [T] |
| Yol kıvrım katsayısı k_y | ≈ 1,3 | Kuş uçuşunu gerçek yola çevirmek | [T] |
| Buz bolluğu referansı | LCROSS: %5,6 ± 2,9 kütlece; geniş saf buz yok | Rozet metninin dili | [K] |

### Formüller

**5.1 — Gidiş-dönüş süresi** [T]

```math
t_{gd} = \frac{2\,k_y\,d}{v} + t_{\text{çalışma}}, \qquad t_{gd} \le 2\ \text{saat}
```

d = 2 km, k_y = 1,3, v = 2 km/saat için yürüyüş 2,6 saat eder, kriteri aşar. **≤ 2 km ile < 2 saat kriterleri birbirini tutmuyor**: pratikte d ≈ 1,5 km ya da rover gerekir (karar bilim ekibinde).
**Senaryoda:** mesafe kriterini zaman kriterine bağlar; kullanıcı yürüyüş/rover seçerek sonucu görür.

**5.2 — Yol eğimi kontrolü**

Yol boyunca 1.1 uygulanır, maks(θ_yol) < 15° aranır. En kısa uygun yol, eğimi 15°'yi aşan pikselleri yasaklayan A* aramasıyla bulunur [T].
**Senaryoda:** Site Detay'da iniş noktasından PSR'ye çizilen gerçekçi rota.

### Arayüz işlevi

- 2 km tarama; < 15° yolla erişilen < 110 K PSR varsa "su buzu potansiyeli" rozeti. Ad "potansiyel" kalır: buzun varlığı kesin değil.
- 110–125 K için soluk rozet [T].
- Rota uzunluğu, maks. eğim ve t_gd yan yana.
- Veri notu: Wueller veri dosyasındaki `coldest_te` alanı makale tablosuyla uyuşmuyor; rozet için makale tablosu esas alınır (Bölüm 10).

---

## 8. Modül 6 — Toz ve altyapı

Altyapı iniş noktasının en az 1 km uzağında olmalıdır. Ama 1 km mutlak güvenli sınır değildir: vakumda düşük açıyla fırlayan 300 m/s'lik parçacık 2 km'yi aşar.

### Parametreler

| Parametre | Değer | Anlamı / kullanımı | Etiket |
| --- | --- | --- | --- |
| Parçacık hızı v | 300–2.000 m/s | İlk 50 m içinde | [K] NTRS 20230003195 |
| Fırlatma açısı γ | ≈ 1–3° | Balistik menzil | [G] |
| Fırlatma mesafesi | 20–1.000 m | 1 km keep-out kuralının kaynağı | [K] |
| **Keep-out (kriter)** | İniş noktasına ≥ 1 km | Sert kısıt | [K] |
| Ay yörünge / kaçış hızı | ≈ 1,68 / 2,38 km/s | Daha hızlı parçacıklar yörüngeye gider | [G][D] |
| Taşıma kapasitesi | ≈ 6.000 kPa (1 m'lik temel) | Temel tasarımı | [K] Apollo 17 |
| Regolit | ρ ≈ 1.900 kg/m³, g = 1,62 m/s² | Kalkan basıncı | [K] |
| Habitat iç basıncı | 80–100 kPa | Karşılaştırma | [K] |
| Direk devrilme sınırı | Zemin eğimi ≤ 15° | Direk yerleşimi | [K] Blandino & Haste |
| Nükleer reaktör mesafesi | 1 km (40 kWe, < 5 rem/yıl) | Ayrı radyasyon kuralı | [K] |

### Formüller

**6.1 — Balistik menzil (düz Ay, vakum)** [D]

```math
R = \frac{v^2\sin(2\gamma)}{g}
```

v = 300 m/s: γ = 1°'de ≈ 1,9 km, γ = 3°'de ≈ 5,8 km. Yalnız v ≪ 1,68 km/s için geçerli.
**Senaryoda:** 1 km kuralının kütlenin çoğunu kapsadığını ama ince, hızlı tozun daha uzağa gittiğini gösterir.

**6.2 — Regolit kalkan basıncı**

```math
p_v = h\,\rho\,g
```

4 m × 1.900 × 1,62 = 12,3 kPa; taşıma kapasitesinin çok altında, habitat basıncını dengelemez.
**Senaryoda:** iniş/tarih seçimiyle ilgisiz; **sitede yeri yok**, sunumda bonus slayt.

**6.3 — Termal bükülme (direk ucu sapması)**

```math
u(L) = c\,M_T\,L^2
```

Güneş direğin tek yüzünü ısıtır, M_T termal momenti ucu yanal saptırır. Devrilme değil yapısal sapmadır [K]. (Önceki taslaklarda v(L) yazıyordu; parçacık hızıyla karışmasın diye u.)
**Senaryoda:** direk kaydırıcısının bedeli; 10 → 20 m sapmayı 4 katına çıkarır. c·M_T bilinmediği için yalnız göreli bar.

### Arayüz işlevi

- İniş noktası etrafında 1 km keep-out çemberi. Panel/altyapı çemberin **içine** girerse "Toz riski: 1 km keep-out içinde, panel hasarı olası".
- 1–2 km arası uyarı tonunda "ince toz riski" halkası [T].
- Direk uzadıkça "yapısal sapma" barı L² ile yükselir; "devrilme" denmez [T].
- Reaktör kuralı ayrı katmanda.

---

## 9. Modül 7 — Bileşik skor, karşılaştırma, Pareto [T]

Her saha-tarih çifti önce sert kısıtlardan geçer, geçenler 0–100 skorla sıralanır. Gecikme senaryosunda en benzer alternatif kosinüs benzerliğiyle önerilir.

### Sert kısıtlar (biri bile kalırsa kırmızı)

| Kısıt | Eşik | Modül |
| --- | --- | --- |
| Etkin eğim (100 m elips) | ≤ 8° ve ≥ 8° yamaçtan ≥ 100 m | 1 |
| Yıllık aydınlanma | > %25 | 2 |
| Güneş penceresi | ≥ 10 ardışık gün | 3 |
| Dünya görünürlüğü | Zamanın ≥ %50'si, e − H ≥ 2° | 4 |
| Altyapı mesafesi | İniş noktasına ≥ 1 km | 6 |
| Erişilebilirlik (isteğe bağlı filtre) | NASA'nın 9 bölgesinin içinde | 10 |

### Yumuşak metrikler ve ağırlıklar

| Metrik x_i | Normalize aralığı (kötü → iyi) | Ağırlık w_i |
| --- | --- | --- |
| Ortalama güç P̄ (aydınlanma) | %25 → %90 | 0,30 |
| DTE payı D | %50 → %100 | 0,25 |
| Etkin eğim | 8° → 0° | 0,15 |
| Depolama ihtiyacı t_d | 120 → 50 saat | 0,15 |
| PSR erişimi | rozet yok → < 110 K rozet | 0,15 |

Ağırlıklar öneridir; Uzman sayfasında "mühendis" ve "bilim" hazır ayarlarıyla değişir. "En eski yüzey" (jeoloji) skora girmez, rozet olarak gösterilir.

### Formüller

**7.1 — Normalize skor**

```math
n_i = \operatorname{clip}\!\left(\frac{x_i - x_{i,\text{kötü}}}{x_{i,\text{iyi}} - x_{i,\text{kötü}}},\,0,\,1\right), \qquad S = 100\sum_i w_i\,n_i, \quad \sum_i w_i = 1
```

**Senaryoda:** farklı birimlerdeki metrikleri tek sıralamaya çevirir. Planlayıcı'daki "neden seçildi" metni her metriğin w_i·n_i katkısından yazılır.

**7.2 — Senaryo benzerliği (kosinüs)**

```math
\operatorname{sim}(\mathbf a,\mathbf b) = \frac{\mathbf a\cdot\mathbf b}{\lVert\mathbf a\rVert\,\lVert\mathbf b\rVert}, \qquad \mathbf a = (n_1, \dots, n_5)
```

**Senaryoda:** "Fırlatma 3 hafta kaydı, aynı profile en yakın saha hangisi?" Sert kısıtları geçen en yüksek sim'li üç aday önerilir. Kosinüs büyüklüğe bakmaz; öneri listesinde S de gösterilir.

**S.8 — Pareto cephesi (güç–iletişim)**

```math
a \succ b \iff \bar P_a \ge \bar P_b \,\wedge\, D_a \ge D_b \,\wedge\, (\bar P_a > \bar P_b \,\vee\, D_a > D_b), \qquad F = \{\, p : \nexists\, q,\ q \succ p \,\}
```

**Senaryoda:** ağırlık seçmeden "hiçbir parselin ikisinde birden geçemediği" parselleri gösterir; Uzman sayfası.

**S.6 — "Güney kutbu şu an" göstergeleri**

```math
E_{\text{şimdi}} = \frac{1}{|P|}\sum_{p\in P} f_p(t_{\text{şimdi}}), \qquad U_{\text{şimdi}} = \frac{|\{p : \text{sert kısıtlar}(p, t_{\text{şimdi}})\}|}{|P|}, \qquad V_{\text{şimdi}} = \frac{|\{p : e_\oplus - H \ge 2^\circ\}|}{|P|}
```

E: bölgenin güneş alan kısmı, U: şimdi inilse geçen parsel oranı, V: Dünya'yı gören parsel oranı.
**Senaryoda:** Ana Sayfa panelinin üç yüzdesi. Birim % yazılır, kW değil.

---

## 10. NASA Artemis aday bölgeleri, koordinatlar, jeoloji, erişilebilirlik

NASA'nın 2022 duyurusu 13 bölge listeliyordu; Ekim 2024'te liste **9 bölgeye** indi. Site güncel 9'u "güncel aday", çıkarılan bölgeleri "literatür doğrulama sahası" olarak etiketler (literatür değerlerimizin çoğu, ör. Shackleton A1 ve Connecting Ridge, çıkarılan bölgelerde). NASA, çıkarılan bölgelerin gelecek görevler için uygunsuz olmadığını belirtiyor.

### NASA'dan gelen parametreler

| Parametre | Değer | Kullanımı | Kaynak |
| --- | --- | --- | --- |
| Bölge boyutu | ≈ 15 × 15 km | Parselleri bölgeye gruplama | NASA 2022 |
| İniş sahası | Bölge içinde ≈ 100 m yarıçap | Modül 1 elipsini doğrular | NASA 2022 |
| Enlem sınırı | 2022: kutbun 6° içi; 2024: 83,4°G'ye uzanıyor | Parsel bölgesi 83°G → 90°G | NASA 2022, Wueller verisi |
| Yüzey görevi | 6,5 gün, sürekli güneş | Modül 3 pencere kriterinin dayanağı | NASA 2022 |
| Birden fazla bölge | Yıl boyu fırlatma esnekliği için şart | Bölge müsaitlik şeridi | NTRS 20250011660 |
| DTE tercihi | DTE mimarisinde Dünya görünürlüğü yüksek bölge tercih edilir | DTE ağırlığının gerekçesi | NTRS 20250011660 |
| Görev adı | Universe Today'e göre mürettebatlı iniş Artemis IV'e kaydı | Sitede "Artemis III" yazmadan önce teyit | Universe Today |

### 9 güncel bölge [W]

| Bölge | Kod | Saha | Merkez (enlem, boylam) | En iyi saha (Güneş + Dünya) | ≥ 10 gün güneşli saha: en kötü / en iyi yıl | Baskın jeolojik birim |
| --- | --- | --- | --- | --- | --- | --- |
| Malapert Massif | MMA | 5 | 86,05°G, 0,15°D | MMA_K2023: 85,992°G, 2,056°D | 2 / 5 | pNbm |
| Mons Mouton | MMO | 10 | 85,40°G, 31,18°D | MMO01: 85,416°G, 31,851°D | 2 / 9 | pNb |
| Mons Mouton Plateau | MMP | 11 | 84,53°G, 30,65°D | MMP02: 84,805°G, 24,887°D | 0 / 10 | pNb |
| Nobile Rim 1 | NR1 | 9 | 85,19°G, 37,24°D | NR101: 85,295°G, 36,917°D | 2 / 9 | pNc |
| Nobile Rim 2 | NR2 | 9 | 83,89°G, 58,40°D | NR207: 83,918°G, 59,327°D | 0 / 9 | pNc |
| Haworth | HW | 11 | 86,80°G, 22,90°B | HW06: 87,050°G, 24,240°B | 3 / 9 | pNb |
| de Gerlache Rim 2 | dGR2 | 7 | 88,17°G, 68,79°B | dGR2_K2023: 88,450°G, 67,859°B | 0 / 7 | Nc |
| Slater Plain | SP | 11 | 87,21°G, 126,61°D | SP07: 87,131°G, 127,857°D | 1 / 10 | pNb (6), Ntp (5) |
| Peak near Cabeus B | PCB | 5 | 83,58°G, 69,08°B | PCB04: 83,369°G, 67,665°B | 0 / 4 | pNc |

- Kaynak: Wueller vd. 2026, JGR Planets (10.1029/2025JE009434), açık veri Zenodo 17084058. Yıllar 2025–2032.
- "Merkez" = sahaların küresel ortalaması, **NASA'nın resmi merkezi değil**. Resmi 15 km sınırları USGS ScienceBase'de (DOI 10.5066/P1MEQ6UK); dosya oturum istiyor, elle indirilmeli.
- B = batı, D = doğu. Veri dosyasında enlem güneyde negatiftir.
- **Planlayıcı için bulgu:** 2031'de Mons Mouton Plateau ve Nobile Rim 2'de ≥ 10 günlük hiç saha yok, de Gerlache Rim 2'de 7 sahanın 6'sı uygun. NASA'nın "birden fazla bölge" mantığının sayısal kanıtı; bölge müsaitlik şeridi bu veriyle hemen yapılabilir.

### Diğer görev noktaları (Görevler sayfası)

| Görev | Koordinat | Kaynak |
| --- | --- | --- |
| Chandrayaan-3, Shiv Shakti noktası | 69,373°G, 32,319°D | Araştırma dokümanı [17] |
| IM-1 Odysseus, Malapert A yakını | 80,297°G, 1,2613°D | NASA/TM-20250010290 |

Kalan 8 görevin listesi bilim ekibinden bekleniyor.

### Jeoloji ("Ay'ın en eski bölgeleri")

130 saha, USGS Unified Geologic Map of the Moon (1:5M, Fortezzo vd. 2020) birimleriyle nokta-poligon testiyle eşlendi. 9 bölgeden 8'i baskın olarak Pre-Nektaryen birimlerde; de Gerlache Rim 2 çoğunlukla Nektaryen kraterde.

| Kod | Birim | Dönem | Yaş |
| --- | --- | --- | --- |
| pNb | Havza, ayrılmamış | Pre-Nektaryen | > 4,1 milyar yıl |
| pNbm | Havza masifi | Pre-Nektaryen | > 4,1 milyar yıl |
| pNc | Krater | Pre-Nektaryen | > 4,1 milyar yıl |
| Nc | Krater | Nektaryen | 3,9–4,1 milyar yıl |
| Ntp | Ova ve örtü, terra | Nektaryen | 3,9–4,1 milyar yıl |

**Sitede:** Pre-Nektaryen parsellere "en eski yüzey" rozeti. **Sınırlama:** 1:5M ölçekte birim sınırları km mertebesinde; rozet bölge düzeyinde okunur. Wueller verisindeki PSR krater yaşları (Soderblom difüzyon modeli) ikinci bir bilim göstergesi olabilir.

### Araç erişilebilirliği (vekil kural)

SLS/Orion performansı ve Δv bütçeleri kamuya açık değil. NASA bölgeleri bu araçların birleşik yörünge yetenekleriyle değerlendirdiği için: **NASA'nın 9 bölgesinin içindeki parsel "erişilebilir" bayrağı alır, dışındaki "değerlendirilmedi" görünür.** Bayrak skor değil filtredir.
Bilgi amaçlı kısıtlar (araştırma dokümanı, NTRS IAC-25): Gateway 9:2 NRHO, periyot ≈ 6,5 gün, aposelen ≈ 70.000 km ve güney kutbunun üstünde; Starship HLS ile 6,5 gün yüzey.

### NASA kriterleri → LUNARIS

| NASA kriteri | Karşılayan | Durum |
| --- | --- | --- |
| Güvenli iniş: eğim | Modül 1 | Var |
| Güvenli iniş: Dünya iletişimi | Modül 4, S.5 | Var |
| Güvenli iniş: aydınlanma | Modül 2, S.4 | Var |
| Tehlikeli yüzey (krater, kaya) | Modül 1 varsayımsal katman | Kısmi: 5 m DEM kaya çözünürlüğünde değil |
| Fırlatma penceresi uygunluğu | S.7, bölge müsaitlik şeridi | Var |
| Araç erişilebilirliği | Vekil kural | Vekil |
| Moonwalk mesafesinde PSR | Modül 5 | Var |
| İnişte numuneyi bozmama | Modül 6 | Kısmi |
| En eski bölgeler (jeoloji) | USGS eşlemesi | Var (1:5M) |

---

## 11. Site planına eşleme (7 sayfa)

34 özellikten 28'i bu dosyadaki formüllerle hesaplanabilir (bir kısmı ağırlık onayı bekliyor); 5'i veri ya da karar bekliyor; 1'i bilim dışı.

| Sayfa | Özellik | Formül / parametre | Durum |
| --- | --- | --- | --- |
| Ana Sayfa | Gerçek Güneşle aydınlanan Ay küresi | 0.2, gökyüzü tablosu | Var |
| Ana Sayfa | "Kutup şu an ne kadar enerji alıyor" | S.6 (E) | Var |
| Ana Sayfa | "İnişe ne kadar elverişli" | S.6 (U) | Var |
| Ana Sayfa | "Dünya görünüyor mu" | S.6 (V), 4.1 | Var |
| Ana Sayfa | Dört bölümlük anlatı | 2.2, 2.1, 3.2 | Var |
| Planlayıcı | Fırlatma tarihi → varış zamanı | S.7 | Taslak, onay bekliyor |
| Planlayıcı | En uygun 5–10 parsel | 7.1 | Var (ağırlıklar onay bekliyor) |
| Planlayıcı | Parsel metrikleri | S.4, 2.3, 4.1, 3.1 | Var |
| Planlayıcı | "Neden seçildi" metni | 7.1 katkıları w_i·n_i | Var |
| Planlayıcı | Gecikme kaydırıcısı, en uygun tarih | S.7, 3.2, 7.1 | Var (S.7'ye bağlı) |
| Planlayıcı | Bölge müsaitlik şeridi (yeni) | Bölüm 10, S.4 | Var |
| Uzman | Eşik süzgeçleri | Modül 1–4, 7 | Var |
| Uzman | Güç–iletişim dengesi (Pareto) | S.8 | Var |
| Uzman | Panel ve batarya modeli | 2.3, 3.1, 6.3 | Var |
| Uzman | DSN istasyonları | S.5, 4.3 | Var |
| Uzman | İniş belirsizliği | 1.2, parsel en iyi/en kötü | Var |
| Uzman | Benzer parsel önerisi | 7.2 | Var |
| Uzman | Aylık görünüm | S.4 zaman serisi toplamı | Var |
| Uzman | Navigasyon saati, çok yollu, link payı | 4.3, 4.4, 4.5 | Var |
| Site Detay | 360° ufuk panoraması | 0.3 | Var |
| Site Detay | Güneş ve Dünya izleri | 0.1, S.2, 0.4 | Var |
| Site Detay | Gün batımı / Dünya batımı geri sayımı | 0.5 | Var |
| Site Detay | Sonraki iletişim penceresi | S.5 | Var |
| Site Detay | Zaman çizelgesi, oynatıcı | S.3 | Var |
| Site Detay | Direk yüksekliği kaydırıcısı | S.9 | Veri bekliyor: paket 3 yükseklikte ufuk tutmalı |
| Site Detay | Termal gösterge | 2.4 | Var |
| Site Detay | Astronot görünümü | 0.1 + 3B arazi | Veri bekliyor: 3B mesh (animasyon ekibi) |
| Site Detay | Özel koordinat | S.1, S.9 | Var (yaklaşık, uyarılı) |
| Site Detay | Horizons / Quickmap / Moon Trek bağlantıları | Koordinat → URL | Bilim dışı |
| Karşılaştır | İki parsel ya da iki tarih | 7.1, fark = x_a − x_b | Var |
| Görevler | En önemli 10 iniş görevi | Görev listesi | Veri bekliyor: 2/10 koordinat var |
| Hakkında | Doğrulama tablosu | B11, B12 önerileri | Karar bekliyor |
| Hakkında | Sınırlamalar | Bölüm 13 ve 16 | Var |
| Rehberli tur / Rapor | 4 adım; yazdırma görünümü | 2.2, 0.3, B11, 7.1 | Var |

**Sitede yeri olmayan formüller:** 6.2 regolit basıncı (çıkar, bonus slayt); 6.1 toz menzili (Site Detay'da bilgi halkası); 6.3 direk sapması (Uzman'da göreli bar); 5.1–5.2 rota (yalnız Site Detay'da seçili saha için).

---

## 12. Bilim girdileri B1–B20 durumu

Taslakta adı geçen 13 girdi; B8, B10, B14–B17, B19'un adları `docs/bilim-girdileri.md`'de, görülmedi.

| B | Girdi | Bu dosyada | Öneri [T] | Durum |
| --- | --- | --- | --- | --- |
| B1 | SPICE | Modül 0 | DE440, MOON_ME, LT+S, artık saniye çekirdeği | Öneri |
| B2 | LOLA | Modül 0 | Yakın 5 m, uzak 20–60 m | Öneri |
| B3 | Zaman aralığı | Modül 0 | 2026-01-01 → 2033-12-31, 1 saat | Öneri |
| B4 | Parsel ağı | S.1, S.10 | Kaba 1 km, ince 100 m, 83°G → kutup (≈ 141.000 parsel) | Öneri, pilotla kesinleşir |
| B5 | Aydınlanma tanımı | 0.4, S.4 | I = ortalama f; aydınlık f ≥ 0,5; h_g 2 ve 10 m | Öneri |
| B6 | Ufuk yöntemi | 0.3, S.10 | 0,5° azimut, 150 km, ε_H 0,05° | Tamam |
| B7 | Dünya görünürlüğü | 0.1, 4.1 | e − H ≥ 2° | Tamam |
| B9 | Metrikler | S.4, Modül 7 | 5 metrik | Tamam |
| B11 | Doğrulama vakaları | — | Horizons: 3 nokta × 5 zaman; Gläser CR1 %92,27 (2 m); Chang'e-7 CR1 %77,7, SR1 %79,7; Fincannon A1 73–117 saat; Wueller 2031 = 44, 2032 = 97 | Öneri |
| B12 | Tolerans | — | Horizons'a karşı ≤ 0,01°; TS–Python ≤ 0,001° ve ≤ 1 dk; aydınlanma ±5 puan | Öneri |
| B13 | Siteler | Bölüm 10 | 9 bölge + 130 saha (Wueller) + literatür sahaları | Hazır, onay bekliyor |
| B18 | Kalkış modeli | S.7 | Geçiş profili girdisi | Taslak |
| B20 | Sıralama | 7.1, 7.2, S.8 | Ağırlıklar onay bekliyor | Tamam |

---

## 13. Proje ilkeleriyle uyum

| İlke (taslak §3) | Bu dosyadaki karşılığı |
| --- | --- |
| 1 Hız | Ağır hesap (0.3, S.4, S.5) çevrimdışı; tarayıcı yalnız S.3 ara değerleme, 0.5 arama, 7.x sıralama yapar. 141.000 parsel × 5 boyut Worker'da milisaniye mertebesi |
| 2 Uydurma yok | [G] değerler kaynak girilene kadar "yer tutucu"; bölge koordinatları yalnız Wueller verisi/USGS'den |
| 3 Dürüstlük | "garanti", "geçersiz", "kritik hata" çıkarıldı; sınırlamalar Bölüm 16'da; kalkış noktası etkisizse ekranda yazar |
| 4 Canlı görseller | Panorama, sayaçlar, grafikler aynı saati (S.3) dinler |
| 6 Renk sözleşmesi | Güneş amber, Dünya mavi; uyarı için ayrı ton (öneri macenta) + ikon |
| 7 AI yorumu | Yalnız 7.1 katkıları ve hesaplanmış metrikleri yorumlar |

---

## 14. Veri ürünleri

| Veri | Neden gerekli | Kullanan | Kaynak (teyit) | Durum |
| --- | --- | --- | --- | --- |
| SPICE: DE440, Ay PA + çerçeve, LSK, PCK | Gökyüzü tablosu, MOON_ME, UTC↔ET | Hat | NAIF generic_kernels | İndirilecek |
| SPICE: Dünya yönelimi + DSN istasyonları | S.5, `dsn.bin` | Hat | NAIF generic_kernels | İndirilecek |
| LOLA 5 m güney kutup DEM | Yakın ufuk, eğim | Hat | PDS LOLA | İndirilecek |
| LOLA 20–60 m kutup DEM | Uzak ufuk (≤ 150 km) | Hat | PDS LOLA | İndirilecek |
| PSR sınırları + Diviner yaz maks. sıcaklığı | Modül 5, "buz bölgesine uzaklık" | Hat | LRO Diviner, LOLA PSR | İndirilecek |
| Ortalama aydınlanma haritası | B11 doğrulama | Hat | Mazarico vd., Quickmap | İndirilecek |
| Wueller 130 saha | Bölüm 10, doğrulama | Hat, Web | Zenodo 17084058 | **Hazır:** `wueller2026_130_saha.csv` |
| USGS jeoloji eşlemesi | "En eski yüzey" rozeti | Web | USGS Unified Geologic Map 1:5M | **Hazır:** `saha_jeoloji.csv` |
| USGS 9 bölge sınırı | Bölge katmanı | Web | ScienceBase 10.5066/P1MEQ6UK | Elle indirilecek (oturum) |
| Görev listesi (10) | Görevler sayfası | Web | Bilim ekibi | 2/10 hazır |
| 3B arazi mesh'i | Astronot görünümü | Animasyon | LOLA'dan türetilir | Bekliyor |

Veri paketine (plan §7.3) eklenecekler: `izgara/ufuk-<parça>.bin` her noktada 3 yükseklik (2/10/20 m); PSR ve jeoloji özellikleri için `ozet` içinde alan; bölge kodu alanı.

---

## 15. Yarışma metniyle uyum

| Yarışma hedefi | Karşılayan |
| --- | --- |
| Hazır site listesi + özel koordinat | Bölüm 10, S.1, S.9 |
| Yan yana karşılaştırma | 7.1 |
| Tarih/saat esnekliği, gecikme senaryosu | 3.2, S.7, 7.2, bölge müsaitlik şeridi |
| Güneş ve Dünya'nın ufka göre konumu | 0.1, 0.2, 0.3 |
| Sunset/Earthset'e kalan süre | 0.5 |
| Güneş yüksekliği, güneşli süre | 2.1, 2.3, S.4 |
| Dünya görünürlük penceresi | 4.1, S.5 |
| LOLA topografyası, atmosfer yokluğu | 0.3 |
| Libration | 0.2, Modül 4 |
| Termal koşullar | 2.4 |
| Zaman çizelgesi / animasyon | S.3 |
| Farklı kullanıcı seviyeleri | 0.2 / 2.2 / 3.2 öğretici; 4.3 / 7.1 / S.8 uzman |
| Bonus | Modül 1, 5, 6; jeoloji |

---

## 16. Açık işler

**Karar bekleyenler (bilim ekibi)**

- [ ] Modül 7 ağırlıkları (0,30 / 0,25 / 0,15 / 0,15 / 0,15) ve eşikler (yeşil < 5°, k = 1, f ≥ 0,5, link payı ≥ 3 dB, DSN 10°)
- [ ] B3 zaman aralığı, B4 parsel boyutu (pilottan sonra), B12 toleranslar
- [ ] S.7: kalkış noktası yerine geçiş profili girdisi
- [ ] Modül 5: ≤ 2 km ile < 2 saat gerilimi (1,5 km ya da rover)
- [ ] Uzak ufuk DEM'i ve 3 yükseklikte ufuk önerisi

**Teyit bekleyenler**

- [ ] Libration: 13 × 15° ile 16,5/18° (De Rosa 2012)
- [ ] Desen tekrarı: kaynaktaki 18,6 yıl ile Saros 18,03 yıl (Wueller metni)
- [ ] Aydınlanma oranları (%77,7–85+) yıllık mı dönemlik mi
- [ ] Bütün [G] değerleri için birer kaynak (TSI, libration, açısal çaplar, ΔAT, geçiş süreleri, DSN)
- [ ] Görev adı: Artemis III mü IV mü (NASA'nın kendi duyurusu)
- [ ] Araştırma dokümanındaki 2026 tarihli kaynaklar (bazı arXiv numaraları gerçek dışı görünüyor)

**Yapılacaklar**

- [ ] SPICE ve LOLA indir; 3–5 saha için H(A) pilotu, süre ölçümü (S.10)
- [ ] USGS 9 bölge sınır dosyasını elle indir
- [ ] `wueller2026_130_saha.csv` ve `saha_jeoloji.csv`'yi `bilim/`'e koy
- [ ] Görevler listesinin kalan 8 görevi

**Bilinen sınırlamalar (Hakkında sayfasına)**

- Kaya/krater katmanı varsayımsal (5 m DEM).
- Depolama metriği şarj oranı etkisini içermez.
- Araç performansı modellenmedi; erişilebilirlik NASA listesinden.
- Jeoloji 1:5M ölçekte.
- Bölge merkezleri resmi değil, Wueller sahalarının ortalaması.
- Özel koordinat sonucu yakın noktalardan ara değerlenir.

---

## 17. Teslim notu (devralan ajan için)

**Bu dosya nedir:** LUNARIS'in bilimsel hesap katmanının birleşik öneri seti. Daha önce üç sekmeli bir Claude dokümanında (parametre seti, site eşlemesi, teslim notu) duruyordu; bu dosya hepsini tek yerde, son kontrolden geçmiş haliyle toplar ve **onlardan daha günceldir**. Hiçbir değer bilim ekibince onaylanmadı. Proje kuralı: bu dosya ile bir "sahip belge" çelişirse sahip belge geçerlidir.

**Girdi kaynakları**

- İlk parametre metni ("LUNARIS: doğrulanmış modül metni", 6 modül). Kendisi dört kaynaktan derlenmişti (rehber; Wueller/Fincannon/Barker özetli PDF; Space Apps metni; literatür metni). **Bu dört kaynak Claude'a verilmedi**; [K] etiketleri o metnin beyanına dayanır.
- Space Apps challenge metni (repo: `docs/kaynak/challenge.md`).
- Proje taslağı `proje-taslagi.md` (repo kaanilker/LUNARIS).
- NASA 2022 duyurusu; Ekim 2024 güncellemesi (web araması, NTRS 20250011660).
- Kullanıcının deep research Google dokümanı (yayımlanmış, her 5 dk güncellenir). Yalnız Chandrayaan-3 ve IM-1 koordinatları ile NRHO bilgisi oradan alındı. 2026 tarihli bazı kaynakları gerçek dışı görünüyor.

**Claude'un ürettiği veri**

- Wueller 2026 Zenodo verisi (`LandingSites.shp`): alanlar `Landing_Re` (bölge kodu), `Latitude/Longitude` (güney negatif), `SunDaysYY` (yaz ortası ardışık güneşli gün), `SunEarthYY` (Güneş ve Dünya birlikte). Yorum makaleye karşı test edildi (2031: 44/44, 2032: 98/97). `coldest_te` alanı makale tablosuyla uyuşmuyor, kullanmayın.
- USGS Unified Geologic Map v2 `GeoUnits.shp`: eşit aralıklı silindirik, **birim metre** (x = R·λ, y = R·φ, R = 1.737,4 km). İlk denemede derece/metre karışıklığı bütün sahaları yanlışlıkla mare yapmıştı; düzeltildi.
- Çıktılar: `wueller2026_130_saha.csv`, `saha_jeoloji.csv` (sütunlar: bölge, saha, enlem, boylam, gunes_2025…2032, gunes_dunya_2025…2032, psr_en_soguk, psr_alan_m2, jeolojik_birim, donem, birim_adi).
- Ulaşılamayan: USGS 9 bölge sınır dosyası (oturum), Wiley makale sayfası.

**Kurallar**

- Doğrulanmış hesapları (Bölüm 1) yeniden türetmeye gerek yok.
- Bölge koordinatı uydurmayın; tek kaynak Wueller CSV'si ya da USGS sınır dosyası.
- [G]/[T] değerleri sitede onaylı gibi göstermeyin.
- Formül numaralarını değiştirmeyin; ekip bunlarla konuşuyor. 6.3'teki sapma artık u(L).
- Belgeler Türkçe; PSR, DTE, NRHO, HLS, LCSP İngilizce kısaltmayla kalır.

---

## 18. Kaynaklar

- NASA (2022), *NASA Identifies Candidate Regions for Landing Next Americans on Moon* — https://www.nasa.gov/news-release/nasa-identifies-candidate-regions-for-landing-next-americans-on-moon/
- George, Rubio, Lawrence, Curell, *Artemis III Site Selection Update: Downselection From Thirteen to Nine Candidate Regions*, NTRS 20250011660 — https://ntrs.nasa.gov/citations/20250011660
- Wueller vd. (2026), JGR Planets, 10.1029/2025JE009434 — https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2025JE009434
- Wueller vd. (2026) açık verisi, Zenodo 17084058 — https://zenodo.org/records/17084058
- USGS, *Down Selected Artemis III Candidate Landing Site Navigational Grids*, DOI 10.5066/P1MEQ6UK — https://www.sciencebase.gov/catalog/item/671a6fa8d34efed5620f89f8
- Fortezzo, Spudis, Harrel (2020), *Unified Geologic Map of the Moon, 1:5M* — https://astrogeology.usgs.gov/search/map/unified_geologic_map_of_the_moon_1_5m_2020
- NASA/TM-20250010290 (IM-1) — https://ntrs.nasa.gov/api/citations/20250010290/downloads/NASA%20TM%2020250010290.pdf
- NTRS IAC-25 B3.1 (NRHO, HLS) — https://ntrs.nasa.gov/api/citations/20250008727/downloads/IAC%2025%20B3%201%20v3.pdf
- Universe Today, *NASA narrows Artemis landing sites to 9 key regions* — https://www.universetoday.com/articles/nasa-narrows-artemis-landing-sites-to-9-key-regions
- Kullanıcının araştırma dokümanı — https://docs.google.com/document/d/e/2PACX-1vROAWKJLgBK_MHdGoDpT5g1eSh0GDsXywo_hDFo7lhLheZxY5r6r-eF7UBbDoTjaSYZ7tf2PWRs2BGY/pub
- İlk parametre metnindeki kaynaklar (Barker, Wueller, Fincannon, Gläser, Mazarico, Bryant, De Rosa, Vanoutryve, Peña-Asensio, Ashby & Patla 2024, Blandino & Haste, Suresh & Amitabh, JPL IPN 42-240A, NTRS 20230003195): tam künyeleri ekibin kaynak dosyalarında.
