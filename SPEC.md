# SPEC — LUNARIS

> Durum: brif ve challenge metninden çıkarılmış **ÖNERİ** (2026-11-14). Kaynaklar `docs/kaynak/`.
> Ayrıntılı sayfa listesi brifte; burada yalnız jürinin göreceği çekirdek ve kapsam sınırı var.

**Problem (tek cümle):** Ay güney kutbunda Güneş ve Dünya ufka çok yakın gezdiği için küçük bir konum ya
da tarih değişikliği güç ve iletişimi tamamen değiştirir; mevcut araçlarla (Quickmap, Moon Trek, Horizons)
senaryoları hızlıca karşılaştırmak zordur.
**Kimin problemi:** görev planlamacıları (birincil), eğitimciler ve halk (ikincil).
**Çözüm (tek cümle):** SPICE efemerisi ve LOLA ufuk profilleri önceden hesaplanmış, site ve tarihleri
anında karşılaştıran, takvim kaymasını canlı gösteren iki dilli web aracı.
**Neden biz:** SOLARIS deneyimi (benzerlik motoru, dürüstlük dersi), ayrı bilim ve animasyon ekipleri.

## Demo akışı (ÖNERİ, jürinin göreceği sırayla)
1. Açılış: güney kutbu sahnesi ve tek soru, "Hangi gün, hangi noktaya inmeli?" (10 saniyede problem).
2. Planlayıcı: tarih ve bölge seç, sıralı siteler gelir.
3. Gecikme kaydırıcısı: fırlatma kayınca sıralama canlı değişir (takvim kayması senaryosu).
4. Site Detay: ufuk panoraması, Güneş ve Dünya izleri, gün batımı ve Dünya batımı geri sayımı.
5. A/B karşılaştırma: iki site ya da iki tarih yan yana.
6. Doğrulama: Horizons ve literatür farkı açıkça gösterilir (60 saniyede güven).

## Kapsam içi (MVP, ÖNERİ)
- Veri hattı: efemeris, ufuk, metrik, doğrulama, sürümlü paket (`docs/mimari.md`)
- Planlayıcı + gecikme kaydırıcısı + paylaşım linki
- Site Detay: panorama, zaman çizelgesi, geri sayım, zaman oynatıcı, A/B
- Hazır site listesi ve özel koordinat
- Doğrulama sayfası, Yöntem/Sınırlamalar
- TR/EN, mobilde açılır, koyu tema

## Sonraya (demo akışında yoksa sona kalır)
- Gelişmiş Analiz'in tamamı (Pareto, batarya, DSN, belirsizlik, benzer site, aylık görünüm)
- Astronot görünümü, Görevler scroll anlatısı, rehberli tur, rapor çıktısı, canlı AI yorumu

Bu ayrım kullanıcı onayı bekliyor; brifte hepsi var, öncelik sırası henüz verilmedi.

## Kapsam dışı (bilerek yapmıyoruz)
- Kullanıcı hesabı ve veritabanı
- Tarayıcıda SPICE ya da DEM işleme
- Röle uydusu üzerinden iletişim modeli

## Riskler ve yedek plan
- Bilim girdileri geç gelir → hat ve site yer tutucuyla uçtan uca çalışır, değer gelince yalnız
  `bilim/` dosyaları değişir.
- Ufuk hesabı uzun sürer → önce pilot ölçümü; ızgara küçültülür ya da hazır sitelerle sınırlanır.
- Paket büyük çıkar → parçalı yükleme, nicemleme; ölçülmeden karar yok.
- AI API'si demo sırasında çöker → önceden üretilmiş yorum ve şablon yedek.
- İnternet yok → yerel derleme ve ekran kaydı (`DEMO.md`).
