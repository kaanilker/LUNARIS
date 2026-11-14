# LUNARIS — Proje ve Site Taslağı

> Kaynak: ekibin ajana verdiği brif, kullanıcı tarafından 2026-11-14 oturumunda verildi. Olduğu gibi
> saklanır. Yorum ve kararlar `SPEC.md` ve `docs/mimari.md`'dedir.

> Bu dosya, sitemizi geliştirecek agent için genel bir bilgilendirmedir. Challenge'ı, ne yaptığımızı ve sitenin nasıl görünmesini istediğimizi anlatır.
>
> Bilimsel hesaplar (denklemler, parametreler, eşik değerleri) ekibimizin temel bilimler grubundan ayrıca gelecek.

---

## Challenge

NASA Space Apps Challenge 2026'ya Ay'ın güney kutbunda iniş noktası seçimiyle ilgili challenge ile katılıyoruz.

**Problem.** Ay'ın güney kutbu, su buzu ve bilimsel değeri yüzünden gelecekteki görevlerin çoğunun hedefi. Ama bu bölgede ışık ve iletişim koşulları çok zor. Bir iniş noktası ve tarihi seçilirken iki şeye bakılır:

- **Güneş'in konumu:** Güneş panellerinin enerji üretip üretemeyeceğini ve ekipmanın ısıl koşullarını belirler.
- **Dünya'nın konumu:** Dünya ufkun üstünde değilse, röle uydusu olmadan doğrudan iletişim kurulamaz.

Kutupta Güneş ufkun hemen üstünde, neredeyse yatay hareket eder. Bu yüzden yakındaki bir tepe bile güneşi tamamen kesebilir. Dünya da ufka yakın bir yerde sallanır. Konumdaki ya da tarihteki küçük bir değişiklik, güç ve iletişim koşullarını tamamen değiştirebilir.

Gerçek görevlerde takvim neredeyse hiç sabit kalmaz. Donanım gecikmeleri ve fırlatma ertelemeleri olur. Böyle durumlarda mühendislerin alternatif noktaları ya da alternatif tarihleri hızlıca değerlendirebilmesi gerekir. NASA'nın mevcut araçları (Quickmap, Moon Trek, JPL Horizons) bu bilgiyi veriyor ama ayrıntılı analiz için yapılmışlar; hızlı karşılaştırma için kullanmaları zor.

**Challenge'ın istediği.** Görev planlamacılarının, eğitimcilerin ve halkın iniş noktalarını ve tarihlerini hızlıca karşılaştırabileceği, sezgisel bir araç. Challenge'ın önerdiği özellikler:

- **Site seçimi:** Hazır site listesi (Apollo, CLPS, diğer ülkelerin görevleri) ve özel koordinat girişi.
- **Karşılaştırma:** Siteler arasında yan yana karşılaştırma.
- **Tarih esnekliği:** Koşulların günler ve mevsimler boyunca nasıl değiştiğini gösterme.
- **Güneş ve Dünya'nın ufka göre konumu:** Gün batımına ve Dünya batımına kalan süreyle birlikte.
- **Güç ve iletişim metrikleri:** Güneş yükseklik açısı, güneşlenme süresi, Dünya'nın görünür olduğu pencereler.
- **Görselleştirme:** 2B/3B görseller, animasyonlar ve zaman çizelgeleri.
- **Farklı kullanıcı seviyeleri:** Uzman planlamacıdan meraklı öğrenciye kadar herkes kullanabilmeli.
- **Gerçekçi veri:** Gerçek topografya (LOLA) ve Ay'ın salınımı (libration) hesaba katılmalı.

---

## Ne yapıyoruz

**LUNARIS** (Lunar Illumination & Communication Analysis System), Quasar Team'in bu challenge için geliştirdiği web aracıdır. Önceki hackathon projemiz SOLARIS'in (solaris.quasacode.com) kardeş projesi olarak tasarlanıyor.

Çekirdeğinde gerçek veriler var: NASA SPICE ephemeris'i ile Güneş ve Dünya'nın konumları, LOLA yükseklik haritalarından çıkarılan ufuk profilleri. Bunların üzerinde site sıralama, karşılaştırma, belirsizlik analizi ve benzer site önerisi gibi karar destek özellikleri bulunuyor.

**Hedef his:** Jüri siteyi açtığında 10 saniyede problemi anlamalı, 60 saniyede çözüme inanmalı. Site "güzel bir sunum" gibi değil, gerçek bir görev planlamacısının yarın kullanabileceği, doğrulanmış bir araç gibi hissettirmeli.

### Bizim için önemli olan ilkeler
- **Hız.** Kullanıcı tarih ya da site değiştirdiğinde sonuç anında görünmeli. Ağır hesaplar önceden yapılıp tarayıcıya hazır veri olarak gelmeli; "Analyzing..." gibi bekleme ekranları olmamalı.
- **Canlı görseller.** Animasyonlar süs değil. Tarih kaydırıcısı oynadığında 3D sahne, grafikler ve metinler birlikte değişmeli. Animasyon ekibi sahneleri hazırlıyor; sahneler veriyi siteden alacak.
- **Dürüstlük.** Sonuçlar doğrulanmalı (JPL Horizons ve literatürle karşılaştırma). Sınırlamalar açıkça yazılmalı. Abartılı ifadeler ("nihai risk", "kesin" gibi) kullanılmamalı. Bu, SOLARIS'ten çıkardığımız bir ders.
- **İki dil.** Site Türkçe ve İngilizce olacak; jüri uluslararası.
- **Mobil.** Site mobilde de açılmalı.
- **Bilimsel bilgi uydurulmamalı.** Koordinat, tarih ya da parametre bilinmiyorsa yer tutucu bırakılmalı; bunlar temel bilimler ekibinden gelecek.

---

## Site taslağı

### 0. Rehberli Tur
Her sayfadan açılabilen bir "Turu başlat" butonu. Kullanıcıyı ve özellikle jüriyi 60 saniyede 4 adımdan geçirir: **problem → yöntem → doğrulama → öneri**. Kullanıcı istediği an turdan çıkabilir.

### 1. Ana Sayfa
- **Açılış ekranı:** Güney kutbunun canlı bir 3D sahnesi var: yatay gelen güneş ışığı, krater kenarlarında gezinen uzun gölgeler. Üstünde tek bir cümle durur: *"Hangi gün, hangi noktaya inmeli?"* Altında "Turu başlat" ve "Planlamaya başla" butonları. Uzun bir giriş metni olmaz.
- **"Ay şu an" bölümü:** Ay'ın güncel evresi ve bilinen kutup sitelerinde Güneş ile Dünya'nın şu anki durumu. Yanında kısa bir AI yorumu.
- **Scroll ile ilerleyen kısa anlatı:**
  - Kutup neden zor?
  - Dünya'daki güneş ile Ay kutbundaki güneş arasındaki fark
  - Konumdaki küçük bir değişikliğin neden büyük fark yarattığı
  - Dünya'nın Ay'ın gökyüzünde neden sallandığı

### 2. Hızlı Planlayıcı (herkes için)
- **Girdiler:** Kullanıcı bir tarih ve haritada bir bölge seçer.
- **Sonuç:**
  - Kutup haritasında puanlanmış noktalar
  - En uygun 5–10 iniş noktasının sıralı listesi; her satırda tek cümlelik özet (güneş oranı, iletişim süresi, en uzun karanlık)
  - AI yorumu
- **Gecikme kaydırıcısı:** "Fırlatma birkaç hafta kayarsa ne olur?" sorusunu cevaplar. Sıralama canlı olarak değişir. Bu, challenge'daki "takvim kayması" senaryosunun doğrudan karşılığı ve sitenin en güçlü demo anlarından biri.
- **Paylaşım:** Senaryo link olarak paylaşılabilir.
- Listedeki bir noktaya tıklanınca Site Detay sayfası açılır.
- **Açık soru:** Ekipte geçen "kalkış noktası" ifadesi şimdilik "Ay'daki bölge merkezi" olarak yorumlandı.

### 3. Gelişmiş Analiz (teknik kullanıcılar için)
- **Filtreler:** En az %70 güneş ışığı gibi eşikler, minimum iletişim süresi, en uzun karanlık, eğim, buz bölgelerine uzaklık.
- **Güç–iletişim dengesi:** Tek bir skora indirgenmez. Sitelerin bu iki ihtiyacı nasıl dengelediğini gösteren bir grafik (Pareto).
- **Panel ve batarya modeli:** "Bu site, bu tarih ve bu batarya ile karanlığı atlatır mı?"
- **Yer istasyonları:** Dünya'daki Deep Space Network istasyonlarından hangisinin o anda Ay'ı gördüğü. Dünya'nın ufkun üstünde olması tek başına yetmez; bu bilgiyle gerçek iletişim penceresi görülür.
- **İniş belirsizliği:** "Hedeften birkaç yüz metre saparsan sonuç ne kadar değişir?"
- **Benzer site önerisi:** "Bu site olmazsa şunlara bak." SOLARIS'teki benzerlik motorunun karşılığı.
- **Aylık görünüm:** Önümüzdeki aylarda hangi sitenin hangi günlerde iyi olduğu.
- **Uzman modu:** Tüm sayıları ve açıklamaları açar.

### 3b. Site Detay ve Karşılaştırma
**Challenge'ın kalbi bu sayfadır.** Planlayıcıdaki ve Gelişmiş Analiz'deki sonuçlar buraya açılır.
- **360° ufuk panoraması:** Sitenin etrafındaki arazi silüeti ve gökyüzünde Güneş ile Dünya'nın izleri.
- **Geri sayımlar:** Gün batımına, Dünya batımına ve bir sonraki iletişim penceresine kalan süre.
- **Zaman çizelgesi:** Güneşli, kısmi ve karanlık dönemler; iletişim pencereleri.
- **Zaman oynatıcı:** Kaydırıcıyla zaman ilerletildiğinde panorama, 3D sahne ve kartlar birlikte hareket eder.
- **Astronot görünümü:** Siteye inmiş biri gibi etrafa bakılan birinci şahıs 3D sahne.
- **A/B karşılaştırma:** İki site ya da aynı sitede iki tarih yan yana, farklar vurgulanmış halde.
- **Rapor:** Mühendisin toplantıya götürebileceği tek sayfalık bir çıktı.
- **Özel koordinat girişi.**

### 4. Tarihteki Ay Görevleri ve Doğrulama
- **Görevler:** Tarihin en önemli 10 Ay görevi, scroll anlatısı ve dönen bir Ay küresi üzerinde görselleştirilir. Nihai liste temel bilimler ekibinden gelecek. Başarısız ve kısmen başarılı görevler de listede olacak, çünkü kutbun zorluğunu dürüstçe gösterirler.
- **"LUNARIS o gün ne derdi?":** Her görevin tarihi ve konumu bizim motorumuzdan geçirilir. Böylece bu bölüm hem eğitim içeriği hem de aracımızın doğrulaması olur. "Apollo neden ekvatora indi, şimdi neden herkes kutba gidiyor?" sorusu da kendiliğinden cevaplanır.
- **Doğrulama:** Sonuçlarımız JPL Horizons ve bilimsel literatürle karşılaştırılır ve aradaki fark açıkça gösterilir.

### 5. Hakkında / Yöntem
- Veri kaynakları ve yöntemin sade bir anlatımı
- Varsayımlar ve **dürüstçe yazılmış sınırlamalar**
- Literatür, ekip, GitHub ve demo videosu
- Metinler temel bilimler ekibinden gelecek.

### AI yorumları
Sitede genel verinin bulunduğu yerlerde (Ana Sayfa, Planlayıcı, Gelişmiş Analiz, Görevler) AI destekli kısa yorumlar olacak.
- AI yalnızca sitenin hesapladığı sonuçları yorumlar; kendi başına sayı üretmez.
- Yorum gelmezse kullanıcı boş bir kutu görmez, hazır bir metin görür.
- Her yorumun AI tarafından üretildiği belirtilir.

---

## Tasarım yönü

- **Tema ve renkler:**
  - Koyu tema, sade ve bilimsel bir görünüm.
  - **Güneş her yerde amber, Dünya her yerde mavi.** Bu iki renk sitede başka bir anlamda kullanılmaz.
- **Yerleşim:** Büyük başlıklar, kısa cümleler, bol boşluk. Paragraf yerine görsel tercih edilir.
- **Etki:** Hazır "wow" efektleri yerine gerçek veriyle çalışan özgün sahneler.
- **Animasyonlar:** Animasyon ekibi sahneleri ayrı bir brifle hazırlıyor.

---

## Ekipler

- **Temel bilimler:** Denklemler, parametreler, site ve görev listeleri, doğrulama, eğitim ve yöntem metinleri.
- **Yazılım:** Veri hattı ve web sitesi.
- **Animasyon:** 3D sahneler, scroll anlatısı görselleri, arayüz animasyonları.
