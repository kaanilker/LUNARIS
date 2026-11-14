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
