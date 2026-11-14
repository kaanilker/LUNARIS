# Planlayıcı: aday doğrulama ve en iyi tarih önerisi

> **KARAR (kullanıcı, 2026-11-14):** (1) Planlayıcı'nın önerdiği 5–10 parsel, formül çıktısına doğrudan
> güvenilmeden ayrıca test edilir. (2) Kullanıcının seçtiği fırlatma tarihine karşı en iyi tarihi öneren bir
> algoritma olur.
> **KARAR (kullanıcı, 2026-11-14):** T4 bağımsız kaynak skoru §2.1'deki gibi NASA'nın 9 bölgesine benzerlik ×
> bölgenin iniş uyum skoru olarak hesaplanır. En iyi tarih önerisi (§3) onaylandı.
> Diğer ayrıntılar (T1–T3, formüldeki seçimler) **ÖNERİ** (ajan, 2026-11-14). Formül numaraları
> `docs/LUNARIS_bilim_parametre_seti.md`'den; sayısal eşikler ve aralıklar oradan ya da bilim ekibinden gelir,
> yoksa yer tutucu. Bu belge Planlayıcı'nın hesap tarafının sahibi; sayfa düzeni `docs/sayfalar.md` §2'de.

## 1. Akış

```
kullanıcı: fırlatma tarihi t_u, kalkış noktası, (geçiş profili)
   │
   ▼
A. Tarih taraması (§3): pencere içindeki her t_f için varış, iniş ve görev süresi M
   │
   ▼
B. Parsel sıralaması: sert kısıtlar → 7.1 skoru → ilk K aday (K > 10, ör. 30)
   │
   ▼
C. Aday doğrulama (§2): her aday dört testten geçer; geçemeyen aşağı iner ya da işaretlenir
   │
   ▼
Ekran: doğrulanmış ilk 5–10 parsel + rozetler; "seçtiğin tarih" ile "önerilen tarih" yan yana
```

Hız ilkesi: A, B ve C'nin hepsi **çevrimdışı** hesaplanır (zaman aralığındaki her gün ve her profil için).
Tarayıcı yalnız sonucu okur. Uzman sayfasında ağırlıklar değiştirilirse sıralama tarayıcıda yeniden
yapılır; doğrulama rozetleri o durumda "varsayılan ağırlıklar için" notuyla gösterilir.

## 2. Aday doğrulama: dört test

Her aday parsel-tarih çifti için çevrimdışı koşulur. Sonuç parselin yanında rozet olarak görünür.

| Test | Ne yapar | Geçme koşulu |
|---|---|---|
| **T1 İnce çözünürlük** | Aday, paketteki kaba değerler yerine ince noktalarla (S.10, 100 m), tam DEM ve 10 dakikalık adımla yeniden hesaplanır | Sert kısıtlar yine geçiyor ve skor farkı tolerans içinde (B12) |
| **T2 Belirsizliğe dayanıklılık** | Monte Carlo: DEM yükseklik hatası, 100 m iniş sapması (parsel içindeki en kötü nokta), ağırlıklarda küçük oynama örneklenir; sıralama yeniden yapılır. Sabit tohum. | Aday senaryoların en az %P'sinde ilk 10'da (P bilim ekibinden) |
| **T3 Eşik payı** | Her sert kısıtta adayın eşiğe uzaklığı: Dünya yüksekliği payı (e − H − 2°), güneş penceresi payı (W − 10 gün), eğim payı (8° − θ_etkin), aydınlanma payı | Bütün paylar pozitif; en küçük pay ekranda gösterilir |
| **T4 Bağımsız kaynak skoru** | Adayın NASA'nın 9 bölgesine benzerliği × o bölgenin o yılki iniş uyum skoru (§2.1) Yalnız gösterilir; sıralamaya ve elemeye girmez (KARAR, 2026-11-14) |

**Kural:** T1 ya da T3'ten kalan aday listeden çıkar ve yerine sıradaki doğrulanmış aday gelir. T2'de
zayıf kalan aday listede kalır ama "belirsizliğe duyarlı" rozeti taşır. Ekranda hiçbir aday doğrulama
yapılmadan "en uygun" diye gösterilmez.

### 2.1 T4: NASA bölgelerine benzerlik × bölge uyum skoru (KARAR)

```
B(p, t) = max_j [ sim(p, j) · U_j(yıl(t)) ]        j = NASA'nın 9 bölgesi, B ∈ [0, 1]
```

- **U_j(yıl): bölgenin iniş uyum skoru.** Bağımsızlığın kaynağı burası, bu yüzden bizim 7.1 skorumuzdan
  **hesaplanmaz**. Kaynak: Wueller vd. 2026 açık verisi (parametre seti §10, [W]). Öneri: bölgedeki
  sahalardan o yıl ≥ 10 ardışık gün Güneş ve Dünya'yı birlikte görenlerin oranı (`SunEarthYY`). Veri
  dosyası henüz repoda yok (doğrulama B-6); gelene kadar yer tutucu.
- **sim(p, j): benzerlik.** Parselin ve bölgenin aynı fiziksel özellik vektörü (normalize edilmiş:
  aydınlanma I, Dünya görünürlüğü D, etkin eğim, en uzun karanlık t_d, PSR uzaklığı) karşılaştırılır.
  Bölgenin vektörü, bölgedeki Wueller sahalarında bizim hesapladığımız değerlerin ortalaması.
  **Gauss çekirdeği** `sim = exp(−‖a − b‖² / 2σ²)`: KARAR (ajan, yetkiyle). Parametre setindeki kosinüs benzerliği (7.2)
  büyüklüğe bakmaz: aydınlanması yarı yarıya olan bir parsel aynı oranlarla "çok benzer" çıkabilir
  (parametre seti 7.2 bu sınırı kendisi yazıyor). σ bilim ekibinden; yoksa yer tutucu.
- **Kullanım (KARAR, kullanıcı 2026-11-14):** skor yalnız rozet olarak gösterilir, sıralamaya ve elemeye
  girmez. Gerekçe: NASA'nın 9 bölgesi Artemis kısıtlarıyla yapılmış bir daraltma, bütün iyi yerlerin listesi değil.
- **Okuma:** "Bu parsel, NASA uzmanlarının seçtiği bölgelere fiziksel olarak ne kadar benziyor ve o bölgeler
  o yıl ne kadar uygun?" Bağımsızlık iki yerden gelir: bölgeleri NASA seçti, uyum skorunu Wueller verisi
  verdi. Benzerlik özellikleri bizim hesabımızdan geldiği için skor tam bağımsız değil, yarı bağımsızdır;
  Hakkında sayfasında böyle yazılır.

Bu dört test, iddianın genel doğrulama zincirinin (`docs/mimari.md` §9.1: Horizons, LRO görüntüleri, gerçek
iniş araçları) her öneri için ayrıca koşulan parçasıdır. Zincir yöntemin doğruluğunu, bu testler tek tek
önerilerin sağlamlığını gösterir.

## 3. En iyi tarih önerisi

**Girdi:** kullanıcının fırlatma tarihi t_u, kalkış noktası ve seçtiği yol (geçiş profili, varsayılan doğrudan).
**Arama penceresi:** t_u'dan önce ve sonra en az bir sinodik ay (29,53 gün). Gerekçe: Güneş azimutu bir
sinodik ayda bütün yönleri dolaşır; pencere bunu kapsamazsa bazı ışık düzenleri hiç denenmez. Pencerenin
kesin genişliği bilim ekibi ya da kullanıcı kararı (yer tutucu).

**Her aday fırlatma günü t_f için (günlük adım, sonra saatlik inceltme):**
1. Varış: t_varış = t_f + T_t(profil) (S.7).
2. İniş: t_iniş = t_varış'tan sonraki ilk an ki en az bir parsel bütün sert kısıtları geçiyor
   (≥ 10 gün güneş penceresi dahil).
3. Görev süresi: M(t_f) = t_iniş − t_f (KARAR: en aza indirilen büyüklük).
4. O gün için doğrulanmış en iyi parselin skoru S*(t_f) ve T2 dayanıklılığı.

**Seçim (sözlük sıralı):**
1. Uygun olmayan günler elenir (hiç parsel geçmiyor).
2. En küçük M.
3. Eşitlikte daha yüksek S*.
4. Eşitlikte **pencere ortası tercihi**: t_f'den önceki ve sonraki günler de uygunsa o gün daha sağlamdır.
   Fırlatma birkaç gün kayarsa görev yine uygun kalır. Ölçü: t_f'nin çevresindeki kesintisiz uygun gün
   sayısı.

**Ekranda üç tarih yan yana:**

| Satır | Anlamı |
|---|---|
| Seçtiğin tarih (t_u) | Kullanıcının tarihi: uygun mu, M kaç gün, en iyi parsel |
| En yakın uygun tarih | t_u'ya en yakın uygun gün |
| Önerilen tarih | Yukarıdaki sıralamayla pencerenin en iyisi; "neden" cümlesi: "görev süresi X gün kısa, fırlatma ±Y gün kaysa da uygun kalıyor" |

Gecikme kaydırıcısı bu üç satırı canlı günceller. Müsaitlik şeridi (pencere boyunca her günün uygun ya da
uygun değil durumu) önerilen tarihin neden seçildiğini görsel olarak gösterir.

## 4. Açık kalanlar

- Arama penceresinin genişliği, T2 için senaryo sayısı N ve eşik P, T1 toleransı (B12), T4 için σ.
- Hesap yükü: gün sayısı × profil × aday sayısı; pilot ölçümünden sonra kestirilir.
