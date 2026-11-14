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
1. Açılış: dönen tam Ay, "güney kutbu şu an" göstergeleri ve AI yorumu (10 saniyede problem).
2. Planlayıcı: fırlatma tarihi ve Dünya'daki kalkış noktası seçilir; sistem en uygun 5–10 parseli nedenleriyle verir.
3. Gecikme kaydırıcısı: fırlatma kayınca sıralama canlı değişir, sistem en uygun tarihi söyler.
4. Site Detay: seçilen noktanın 360° ufku, Güneş ve Dünya izleri, gün batımı ve Dünya batımı geri sayımı.
5. Karşılaştır: iki parsel ya da iki tarih yan yana.
6. Hakkında: Horizons ve literatür farkı açıkça gösterilir (60 saniyede güven).

Sayfa yapısı: `docs/sayfalar.md` (7 sayfa, KARAR 2026-11-14).

## Kapsam içi (MVP, ÖNERİ)
- Veri hattı: efemeris, ufuk, metrik, doğrulama, sürümlü paket (`docs/mimari.md`)
- Ana Sayfa: tam Ay, güney kutbu göstergeleri, AI yorumu
- Planlayıcı (tarih + kalkış noktası) + gecikme kaydırıcısı + en uygun tarih + paylaşım linki
- Site Detay: 360° ufuk, zaman çizelgesi, geri sayım, zaman oynatıcı; Karşılaştır
- Özel koordinat
- Hakkında: yöntem, doğrulama tablosu, sınırlamalar
- TR/EN, mobilde açılır, koyu tema

## Sonraya (demo akışında yoksa sona kalır)
- Uzman Analiz sayfasının tamamı (Pareto, batarya, DSN, belirsizlik, benzer parsel, aylık görünüm)
- Astronot görünümü, Görevler sayfası (görsel), rehberli tur, rapor çıktısı

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
