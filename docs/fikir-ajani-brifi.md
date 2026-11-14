# LUNARIS: yenilikçi fikir geliştirecek ajan için brif

> Bu dosya, LUNARIS'e yeni özellik fikirleri üretecek yazılımcının ve onun yapay zekâ ajanının ilk
> okuyacağı belgedir. Kendi başına okunabilir. Ayrıntının sahibi olan belgeler aşağıda bağlantılıdır;
> çelişki görürsen o belgeler geçerlidir.
>
> Yazıldı: 2026-11-14 · Repo: https://github.com/kaanilker/LUNARIS

## 1. Görevin

LUNARIS'e jürinin aklında kalacak, ama gerçek veriye dayanan ve görev planlamacısının gerçekten
işine yarayacak **fikirler** öner. Kod yazman beklenmiyor; fikir onaylanırsa ayrı bir iş olarak
yazılır. Çıktın, aşağıdaki biçimde yazılmış fikir dosyalarıdır (§7).

## 2. Problem (kısaca)

NASA Space Apps Challenge 2026. Ay'ın güney kutbunda Güneş ufkun hemen üstünde, neredeyse yatay hareket
eder ve Dünya ufka yakın bir yerde sallanır (libration). Bu yüzden birkaç yüz metrelik konum farkı ya da
birkaç günlük tarih farkı güç (güneş paneli) ve doğrudan Dünya iletişimini tamamen değiştirebilir.
Görevlerin takvimi sık kayar. Mühendislerin alternatif siteyi ya da alternatif tarihi hızla
karşılaştırması gerekir. NASA'nın mevcut araçları (Quickmap, Moon Trek, JPL Horizons) ayrıntılı analiz
için yapılmış; hızlı karşılaştırmada kullanmaları zor.

Challenge'ın istediği: planlamacı, eğitimci ve halkın siteleri ve tarihleri hızla karşılaştırabildiği,
Güneş ve Dünya'nın ufka göre konumunu gösteren sezgisel bir araç.

Tam metinler: `docs/kaynak/challenge.md` (challenge), `docs/kaynak/LUNARIS_AGENT_BRIEF.md` (ekip brifi).

## 3. LUNARIS nedir

Quasar Team'in web aracı. Önceki projemiz SOLARIS'in (solaris.quasacode.com) kardeşi. Üç ekip var:
temel bilimler (denklemler, parametreler, site ve görev listeleri, doğrulama), yazılım (veri hattı ve
site), animasyon (3B sahneler).

**Hedef his:** jüri 10 saniyede problemi anlar, 60 saniyede çözüme inanır. Site sunum gibi değil,
planlamacının yarın kullanabileceği doğrulanmış bir araç gibi hissettirir.

## 4. Değişmez ilkeler (fikir bunlara uymuyorsa elenir)

1. **Hız.** Tarih ya da site değişince sonuç anında görünür; "Analyzing..." ekranı yok. Ağır hesap
   önceden yapılır.
2. **Bilimsel bilgi uydurulmaz.** Koordinat, tarih, eşik, parametre bilinmiyorsa fikirde "bilim ekibinden
   gelecek" yazılır. Fikrin içine sayı koyacaksan kaynağını yaz ya da "tahmin" etiketi koy.
3. **Dürüstlük.** "Kesin", "nihai risk", "garanti" gibi ifadeler yok. Sınırlamalar açıkça yazılır.
   Bu, SOLARIS'ten çıkan bir ders.
4. **Canlı görseller süs değil.** Animasyon gerçek veriyle hareket eder; zaman kaydırıcısı oynayınca
   sahne, grafik ve metin birlikte değişir. Hazır "wow" efekti yerine gerçek veriyle çalışan özgün sahne.
5. **İki dil (TR/EN), mobilde açılır, koyu tema.**
6. **Renk sözleşmesi:** Güneş her yerde amber, Dünya her yerde mavi; bu iki renk başka anlamda kullanılmaz.
7. **AI yorumu** yalnız sitenin hesapladığı sonucu yorumlar, kendi sayı üretmez, "AI üretimi" etiketi
   taşır, gelmezse hazır metin görünür.

## 5. Mimari sınırlar (fikrin uygulanabilirliğini bununla ölç)

Ayrıntı: `docs/mimari.md` (şu an ÖNERİ aşamasında, kesinleşmedi).

- **Python veri hattı, çevrimdışı:** NASA SPICE ile Güneş ve Dünya konumları, LOLA yükseklik haritasından
  her noktanın 360° ufuk profili, bunlardan günlük metrikler. Sonuç sürümlü statik bir paket olarak
  tarayıcıya gelir.
- **Tarayıcıda elde olan veri:**
  - Zaman adımı başına Güneş ve Dünya'nın Ay'a göre konumu (siteden bağımsız tek tablo)
  - Hazır siteler ve bir ızgaradaki noktalar için ufuk profili (zamandan bağımsız)
  - Nokta × gün özet metrikleri (güneş oranı, iletişim süresi, en uzun karanlık vb.; tanımlar bilim
    ekibinden)
  - DSN yer istasyonlarının Ay'ı görüp görmediği
  - Horizons ve literatürle doğrulama farkları
- **Tarayıcı ucuz geometri yapabilir:** ufuk profili + Güneş/Dünya konumu ile herhangi bir an için
  azimut, yükseklik ve "ufkun üstünde mi" hesabı anlıktır.
- **Yapılmayanlar:** tarayıcıda SPICE ya da DEM işleme, sunucuda gerçek zamanlı hesap, kullanıcı hesabı
  ve veritabanı (paylaşım URL ile yapılır).
- **Sahneler** veriyi tek bir "sahne arayüzü"nden alır (zaman, site, Güneş/Dünya vektörü, ufuk profili,
  aydınlanma). Animasyon ekibi bu arayüze göre çalışır.

- **Challenge'ın kaynakları kesin kullanılacak:** JPL Horizons, Quickmap, Moon Trek, CSA Moon
  Exploration (`docs/kaynak/nasa-kaynaklari.md`, roller `docs/mimari.md` §11). Bunları kullanan
  fikirler artı puan alır.

Fikir bu verilerle yapılabiliyorsa ucuzdur. Yeni veri istiyorsa hangi veri, nereden, kim üretecek, bunu
yaz. Bilimsel girdilerin listesi ve durumu: `docs/bilim-girdileri.md`.

## 6. Zaten planlananlar (tekrar önerme; geliştirmek serbest)

- **Rehberli tur:** problem, yöntem, doğrulama, öneri; 60 saniyede 4 adım.
- **Ana sayfa:** canlı güney kutbu sahnesi ve "Hangi gün, hangi noktaya inmeli?" sorusu. Yanında
  "Ay şu an" bölümü ve scroll anlatısı.
- **Hızlı Planlayıcı:**
  - Tarih ve bölge seçilir, puanlanmış harita ve en iyi 5–10 site listelenir.
  - Gecikme kaydırıcısı ile fırlatma kayınca sıralama canlı değişir.
  - Senaryo link olarak paylaşılır.
- **Gelişmiş Analiz:**
  - Eşik süzgeçleri.
  - Güç ve iletişim dengesi Pareto grafiğiyle gösterilir.
  - Panel ve batarya modeli.
  - DSN istasyonları.
  - İniş belirsizliği.
  - Benzer site önerisi.
  - Aylık görünüm ve uzman modu.
- **Site Detay:**
  - 360° ufuk panoraması.
  - Gün batımı, Dünya batımı ve sonraki iletişim penceresi için geri sayımlar.
  - Zaman çizelgesi ve zaman oynatıcı.
  - Astronot görünümü.
  - A/B karşılaştırma.
  - Tek sayfalık rapor ve özel koordinat girişi.
- **Tarihteki Ay görevleri:** "LUNARIS o gün ne derdi?" sorusu, doğrulama bölümünü de besler.
- **Hakkında / Yöntem:** veri kaynakları ve sınırlamalar.

Güncel kapsam ve demo akışı: `SPEC.md`.

## 7. Fikir dosyası biçimi

Her fikir ayrı dosya: `docs/fikirler/<YYYY-AA-GG>-<kisa-ad>.md`. Başına `Durum: ÖNERİ` yaz; ekip
onaylamadan karar sayılmaz.

```
# <Fikir adı>
Durum: ÖNERİ · Öneren: <ad> · Tarih: <tarih>

**Tek cümle:** ne yapıyor.
**Kimin hangi problemi:** planlamacı / eğitimci / halk; hangi an, hangi zorluk.
**Challenge bağı:** challenge metnindeki hangi madde (alıntıla).
**Demo anı:** jüri bunu hangi adımda, kaç saniyede görür? Demo akışında yoksa yaz.
**Veri:** §5'teki hangi veriyle yapılır; yeni veri gerekiyorsa ne, kaynağı, kim üretir.
**Neden mevcut araçlarda yok:** Quickmap, Moon Trek, Horizons ve benzeri projelerde en yakın karşılığı.
  Bulamadıysan "bulamadım" yaz, "ilk biz yapıyoruz" yazma.
**Maliyet:** kaba iş tahmini (tahmin olduğunu yaz) ve hangi ekip.
**Risk ve öldürme ölçütü:** hangi durumda bu fikirden vazgeçeriz.
**İlkelere uyum:** §4'teki hangi ilkeye dokunuyor, nasıl uyuyor.
```

## 8. İyi fikrin ölçütleri (sıralamada bunlara bakılır)

1. Challenge'daki bir maddeyi doğrudan karşılıyor.
2. Demo'da görünür ve 60 saniyelik inanma süresine katkı veriyor.
3. Elimizdeki ya da elde edilebilir gerçek veriyle çalışıyor; uydurma gerektirmiyor.
4. Kutbun "küçük değişiklik, büyük fark" doğasını sezgisel gösteriyor.
5. Uzmanla öğrenciye aynı anda hitap edebiliyor (katmanlı anlatım).
6. Ucuz: mevcut paket ve sahne arayüzüyle yapılabiliyor.

Önce az sayıda güçlü fikir ver. Her fikri yazmadan önce en yakın mevcut çalışmayı ara. Zayıf yanını
kendin yaz.

## 9. Yapma

- Bilimsel sayı, koordinat, görev tarihi uydurma.
- Mimariyi tek başına değiştiren fikri karar gibi yazma; "mimari değişikliği gerektirir" diye işaretle.
- Mevcut belgeleri (`SPEC.md`, `docs/mimari.md`, `docs/bilim-girdileri.md`) düzenleme; önerini fikir
  dosyasına yaz, sahip belge ekip onayıyla güncellenir.
- Ürün metninde tireyle madde ve ara cümle dizme; düz cümle kur.
