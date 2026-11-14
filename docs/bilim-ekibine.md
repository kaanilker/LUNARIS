# Temel bilimler ekibine: yazılımın sizden beklediği girdiler

> Yazılım ekibinden, 2026-11-14. Bu dosya bir istek mektubu. Girdilerin güncel durumunu (BEKLENİYOR,
> GELDİ) tutan tek yer `docs/bilim-girdileri.md`; aşağıdaki B kodları oradaki satırlarla aynı.
> Repo: https://github.com/kaanilker/LUNARIS

> **Güncelleme (2026-11-14):** İsteklerin çoğu `docs/LUNARIS_bilim_parametre_seti.md` ile taslak olarak
> karşılandı. Kalanlar ve onay bekleyenler `docs/bilim-girdileri.md`'de; düzeltme önerilerimiz
> `docs/parametre-seti-dogrulama.md`'de.

## 1. Kısaca ne yapıyoruz

LUNARIS, Ay'ın güney kutbunda bir iniş noktası ve tarihi seçildiğinde Güneş'in (güç) ve Dünya'nın
(doğrudan iletişim) ufka göre nerede olduğunu hızlıca gösteren bir web aracı. Güney kutbunu parsellere
bölüyoruz. Her parsel için önceden hesaplanmış veriyle sitede şunları göstereceğiz:

- Planlayıcı: fırlatma tarihi ve Dünya'daki kalkış noktasına göre en uygun 5–10 parsel, nedenleriyle
- Gecikme kaydırıcısı: fırlatma kayarsa sıralamanın nasıl değiştiği ve en uygun tarih
- Site Detay: seçilen noktanın 360° ufku, Güneş ve Dünya'nın izleri, gün batımına ve Dünya batımına
  kalan süre
- Hakkında: sonuçlarımızın JPL Horizons ve literatürle karşılaştırması

Hesaplar sizin vereceğiniz tanımlar ve parametrelerle yapılacak. **Biz sayı uydurmuyoruz.** Bir değer
gelmediyse sitede "yer tutucu" yazar.

## 2. Derlemeniz için teşekkür ve tek bir not

"Ay Güney Kutbu İniş Teknolojileri" derlemesini okuduk; notlarımız `docs/kaynak/bilim-derlemesi-notlar.md`.
Aydınlanma oranları (Mazarico 2011, Barker 2020), site koordinatları, panel ve batarya değerleri ve eğim
sınırları işimize yarayacak.

Derlemede challenge'ın çekirdeği henüz yok: Güneş ve Dünya'nın konumunun hesabı (SPICE, Horizons),
libration ve ufuk profilinin LOLA'dan nasıl çıkarılacağı. Aşağıdaki **Öncelik 1** bunlar. Bunlar gelmeden
yazılımın ilk deneme hesabı (pilot) bile doğrulanamıyor.

## 3. Öncelik 1: çekirdek hesap (en acil)

| Kod | Ne istiyoruz | Neden |
|---|---|---|
| B1 | Kullanılacak SPICE çekirdekleri: gezegen efemerisi, Ay yönelimi (PCK), Ay çerçevesi (FK), zaman (LSK). Adları ve sürümleri. | Güneş ve Dünya'nın Ay'a göre konumu ve libration buradan gelir. |
| B2 | Kullanılacak LOLA yükseklik ürünü: adı, çözünürlüğü, kapsadığı enlem, izdüşümü. | Her parselin ufku bundan çıkar. |
| B5 | "Güneşli", "kısmi", "karanlık" tanımı. Güneş diskinin ne kadarı görünürse güneşli sayılır? | Zaman çizelgesi ve güneş oranı bu tanıma bağlı. |
| B6 | Ufuk hesabının yöntemi: ne kadar uzağa bakılacak, kaç derecelik azimut adımı, Ay'ın eğriliği nasıl hesaba katılacak. | Ufuk doğruluğunu ve hesap süresini belirler. |
| B7 | "Dünya görünür" tanımı: disk merkezi mi, kenarı mı ufkun üstünde olmalı? Anten için bir alt açı var mı? | İletişim penceresi bu tanıma bağlı. |
| B11 | Doğrulama vakaları: Horizons'ta deneyeceğimiz nokta ve zamanlar; karşılaştıracağımız literatür değerleri. | Sitenin "güvenilir" olduğunu bununla gösteriyoruz. |
| B12 | Kabul toleransı: bizim sonucumuz Horizons'tan ne kadar farklı olursa hâlâ doğru sayılır? | Testlerimiz bu eşiğe göre geçer ya da kalır. |

## 4. Öncelik 2: Planlayıcı

| Kod | Ne istiyoruz | Neden |
|---|---|---|
| B3 | Hesaplanacak zaman aralığı (başlangıç, bitiş) ve zaman adımı. | Gecikme kaydırıcısının ne kadar ileri gidebileceği buna bağlı. Ana Sayfa'daki "şu an" göstergesi için bugünü de kapsamalı. |
| B4 | Parsel ağı: güney kutbunun hangi bölgesi, parsel boyutu, izdüşüm. | Parsel sayısı hesap süresini ve veri boyutunu belirler. Boyutu birlikte, pilot ölçümünden sonra seçmeyi öneriyoruz. |
| B9 | Metrik tanımları: güneş oranı, iletişim süresi, en uzun karanlık, eğim, buz bölgesine uzaklık (buz verisinin kaynağı). | Sıralama ve süzgeçler bunları kullanır. |
| B13 | Hazır site listesi: ad, enlem, boylam, kaynak. | Site seçimi ve karşılaştırma. |
| B18 | Kalkış modeli: Dünya'daki kalkış noktası ve fırlatma tarihi yolculuk süresini ve Ay'a varış zamanını nasıl belirliyor? Hazır fırlatma üsleri listesi. Amacımız görev süresini (fırlatmadan inişe) en aza indirmek. | Planlayıcının girdisi. Bu model gelmeden kalkış noktası sonucu değiştiremez. |
| B20 | Sıralama yöntemi: hangi metrikler, parselin hangi değeri (merkez, ortalama, en iyi, en kötü nokta), "en uygun tarih" ölçütü ve görev süresinin sıralamaya etkisi. | Planlayıcının en uygun 5–10 parseli bununla seçilir. |

## 5. Öncelik 3: diğer sayfalar

| Kod | Ne istiyoruz | Nerede kullanılır |
|---|---|---|
| B8 | DSN istasyonlarının koordinatları ve en düşük yükseklik açısı. | Uzman Analiz: gerçek iletişim penceresi |
| B10 | Panel ve batarya modelinin denklemleri ve varsayılan değerleri. | Uzman Analiz: "karanlığı atlatır mı?" |
| B15 | İniş sapması yarıçapı (görev türüne göre). | Uzman Analiz: iniş belirsizliği |
| B16 | Benzer parsel ölçütü: hangi metrikler, hangi uzaklık. | Uzman Analiz: benzer parsel önerisi |
| B19 | Ana Sayfa göstergeleri: "güney kutbu şu an ne kadar enerji alıyor" ve "inişe ne kadar elverişli" nasıl hesaplanacak, hangi bölge üzerinden. | Ana Sayfa |
| B14 | Tarihteki en önemli 10 Ay iniş görevi: ad, ülke, tarih, konum, sonuç (başarılı, kısmi, başarısız), kaynak. | Görevler sayfası (yalnız görsel) |
| B17 | Ana Sayfa anlatısı ve Hakkında sayfasının metinleri; yöntem ve sınırlamalar. TR ve EN. | Ana Sayfa, Hakkında |

## 6. Nasıl teslim etmeli

Makinece okunan girdileri JSON dosyası olarak `bilim/` klasörüne koyun (ya da bize gönderin, biz
koyalım). Böylece değerler elle kopyalanmaz ve yanlış aktarılmaz. Tanım ve yöntem gibi metin girdileri
düz bir belge olarak gelebilir.

**Her kayıtta kaynak zorunlu.** Makale, ürün sayfası ya da kendi hesabınız; hangisiyse yazın.

**Birimler ve yönler:**
- Enlem derece; güney negatif (ör. 80,297°G → `-80.297`).
- Boylam derece; doğu pozitif. Hangi aralığı kullandığınızı (−180…180 ya da 0…360) yazın.
- Zaman UTC, ISO 8601 biçiminde (ör. `2027-03-01T12:00:00Z`).
- Açılar derece, uzunluklar metre ya da kilometre; birim her alanın adında ya da yanında yazsın.

**Örnek kalıplar** (değerler boş; doldurmak sizde):

`bilim/siteler.json` (B13)
```json
[
  {
    "id": "",
    "ad": { "tr": "", "en": "" },
    "enlem_derece": null,
    "boylam_derece": null,
    "kaynak": ""
  }
]
```

`bilim/gorevler.json` (B14)
```json
[
  {
    "ad": "",
    "ulke": "",
    "inis_zamani_utc": "",
    "enlem_derece": null,
    "boylam_derece": null,
    "sonuc": "basarili | kismi | basarisiz",
    "kaynak": ""
  }
]
```

`bilim/parametreler.json` (B3, B4, B5, B7, B9, B12, B15 gibi sayısal değerler)
```json
{
  "zaman_araligi": { "baslangic_utc": "", "bitis_utc": "", "adim_saat": null, "kaynak": "" },
  "tolerans": { "aci_derece": null, "kaynak": "" }
}
```

Alan adları ve yapı sizinle birlikte değişebilir. Önemli olan her değerin yanında kaynağının olması.

## 7. Birlikte çalışma

- Bir değer kesin değilse "tahmin" diye işaretleyin; sitede de öyle görünür.
- Bir girdinin neden gerektiği ya da nasıl kullanılacağı belirsizse sorun. Gereksiz bir şey istiyorsak
  da söyleyin, listeden çıkaralım.
- Teslim ettiğiniz her girdi `docs/bilim-girdileri.md`'de GELDİ olarak işaretlenir.
