# Sentetik simülasyon ve makine öğrenmesiyle en uygun seçeneği bulmak
Durum: ÖNERİ · Öneren: kullanıcı (fikir), ajan (değerlendirme) · Tarih: 2026-11-14

**Tek cümle:** NASA verisine dayanan sentetik bir simülasyonla veri üretip makine öğrenmesi modeli eğitmek ve
en uygun parsel, tarih ya da rotayı bu modelle bulmak.

## Ajanın değerlendirmesi

**Sıralama ve en uygun tarih için: önerilmiyor.**
- Cevap belirlenimci fizik hesabından tam olarak çıkıyor (parametre seti Modül 0, S.4, 7.1). Bütün parsel ×
  gün metrikleri çevrimdışı bir kez hesaplanıyor; tarayıcı sıralar ve tarar (`docs/mimari.md` §1). Model bu
  tam cevabın yaklaşığını öğrenir, hata ekler.
- Simülasyondan üretilen veriyle eğitilen model simülasyonu taklit eder; yeni bilgi gelmez.
- "Neden seçildi" açıklaması (7.1'de w_i · n_i katkıları) kaybolur.
- Horizons ve literatürle doğrulama zorlaşır; ilke 3 (dürüstlük) ve global kural (sentetik sonuç gerçek
  diye sunulmaz) açısından risk.

**Sentetik veri için: önerilir, test amacıyla.**
Cevabı analitik bilinen sentetik araziler (tek tepe, düzgün krater, eğimli düzlem) üzerinde veri hattı
koşulur; ufuk (0.3), disk kesri (0.4) ve batış süresi (0.5) bilinen cevapla karşılaştırılır. Gerçek LOLA
verisinden önce hattın doğruluğunu kanıtlar. Pilotla birlikte kurulabilir.

**Makine öğrenmesi için tek aday yer: kalkış modeli (B18, S.7).**
Gerçek bir yörünge aracının (ör. GMAT) çıktılarıyla eğitilmiş yaklaşık model, tarayıcıda yolculuk süresini
anında tahmin edebilir. Koşul: eğitim verisi gerçek bir yörünge çözücüsünden gelmeli. Hackathon için daha
basit seçenek: parametre setindeki geçiş profilleri tablosu.

## Öldürme ölçütü
Tablo tabanlı kalkış modeli Planlayıcı'nın sorusunu yeterince cevaplıyorsa makine öğrenmesi eklenmez.

## Karar bekleyen
Bilim ekibinin yöntemi geldiğinde birlikte değerlendirilecek.

## Ek: optimum iddiasını makine öğrenmesiyle test etmek (kullanıcı, 2026-11-14)

**Fikir:** "En uygun rota" iddiasını simülasyonda eğitilmiş bir modelle sınamak.

**Değerlendirme: önerilmiyor, çünkü döngüsel.** Model bizim simülasyonumuzun çıktısıyla eğitilirse bizim
hesabımızı öğrenir. Aynı sonucu bulması kanıt değildir; farklı bulması büyük olasılıkla modelin hatasıdır.
Test, iddiayı üreten sistemden bağımsız bir kaynağa karşı yapılmalı.

**Önerilen yerine (ÖNERİ):**
1. **Tam tarama:** bütün parsel × tarih × profil seçenekleri denenir; sonuç seçilen ölçütlere göre kesin
   olarak en iyisidir. İddia "ölçütlerimize göre en iyi" diye yazılır.
2. **Dış doğrulama:** Horizons (gök tarafı); literatür değerleri (parametre seti B11: Gläser CR1 %92,27,
   Fincannon A1 73–117 saat, Wueller 2031/2032 saha sayıları).
3. **Monte Carlo sağlamlık testi:** her koşuda belirsiz girdiler örneklenir (DEM yükseklik hatası 0,30–0,50 m,
   iniş sapması 100 m elips, fırlatma gecikmesi, ağırlıklarda küçük oynama), sıralama yeniden hesaplanır.
   Çıktı: "önerilen parsel N senaryonun %X'inde ilk 5'te". Sabit tohumla yeniden üretilebilir; sonuç koşu
   kimliğiyle sonuç dosyasına yazılır. Uzman sayfasındaki iniş belirsizliğine bağlanır.

Örnekleme dağılımları ve N bilim ekibinden gelir; değerler parametre setinde yoksa yer tutucu.

## Ek 2: gerçek görev verisini sentetik veriyle çoğaltmak (kullanıcı açıklaması, 2026-11-14)

**Fikrin netleşmiş hâli:** NASA ve diğer ajansların Ay'da (özellikle güney kutbunda) topladığı gerçek veriler
kullanılacak; sentetik veri bu kısıtlı veriyi çoğaltmak için.

**Değerlendirme (ajan, ÖNERİ):**
- **Aydınlanma ve görünürlük hesabı veri kıtlığı yaşamıyor.** LOLA ve SPICE çok büyük gerçek veri
  kaynakları; sonuç bunlardan fizikle tam hesaplanıyor. Burada çoğaltmanın ve modelin katkısı yok.
- **Kıt olan veri iniş sonuçları.** Kutup bölgesinde birkaç deneme var (IM-1, IM-2, Luna-25; Chandrayaan-3
  başarılı ama 69°G). Bu sayıyla model eğitilmez. Sentetik çoğaltma bilgi eklemez: sentetik etiket yine
  bizim hesabımızdan gelir (döngüsellik). Ayrıca bu sonuçlarda belirleyici olan iniş sistemi ve navigasyon;
  bizim hesapladığımız ışık ve iletişim değil (çıkarım; görev raporlarıyla teyit edilmeli).

**Gerçek verinin değer kattığı yerler (ÖNERİ):**
1. **Gözlenmiş aydınlanmayla doğrulama:** LRO kamera görüntülerinde (LROC) görülen aydınlık ve gölge ile
   bizim hesabımızın karşılaştırılması. Literatürde örnek: Speyerer ve Robinson 2013 (LROC ile kutup
   aydınlanması). Hangi ürünlerin indirilebilir olduğu araştırılacak.
2. **Kaya ve krater katmanı:** LROC NAC görüntülerinden makine öğrenmesiyle yapılmış yayımlanmış tespit
   ürünleri kullanılabilir; Modül 1'in "varsayımsal" katmanını gerçek veriye çevirir. Kendi modelimizi
   eğitmek hackathon için ağır.

**Sıralama ve en uygun seçim** fizik hesabı ve tam taramayla kalır.
