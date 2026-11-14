# Temel bilimler ekibinden beklenen girdiler

> Bilimsel parametrelerin **tek sahibi** bu dosyadır. Kod ve diğer belgeler buraya kod numarasıyla
> (B1, B2...) bağlantı verir, sayıyı kopyalamaz. Bir girdi gelince: değer, kaynağı (makale, ürün sayfası,
> hesap) ve geliş tarihi yazılır, durum `GELDİ` olur. Değer gelmeden hat ve site bu girdiyi yer tutucuyla
> kullanır ve arayüzde "yer tutucu" etiketi gösterir.
>
> Brif kuralı: koordinat, tarih ya da parametre bilinmiyorsa uydurulmaz.

| Kod | Girdi | Neden gerekli (mimari bağı) | Durum |
|---|---|---|---|
| B1 | SPICE çekirdek listesi (gezegen efemerisi, Ay yönelimi PCK, Ay çerçeve FK, LSK) ve sürümleri | Gök tarafı ve libration (`docs/mimari.md` §3) | BEKLENİYOR |
| B2 | LOLA DEM ürünü (ad, çözünürlük, kapsama enlemi, referans yüzey) | Ufuk profili, eğim | BEKLENİYOR |
| B3 | Zaman aralığı (başlangıç, bitiş) ve zaman adımı | Paket boyutu, gecikme kaydırıcısının menzili | BEKLENİYOR |
| B4 | Planlayıcı ızgarası: bölge sınırı ve nokta aralığı | Planlayıcı, özel koordinat | BEKLENİYOR |
| B5 | Aydınlanma tanımı: Güneş diski kesri mi merkez mi; "kısmi" eşiği | Zaman çizelgesi (güneşli/kısmi/karanlık) | BEKLENİYOR |
| B6 | Ufuk hesabı: tarama yarıçapı, azimut adımı, Ay eğriliği yöntemi | Ufuk doğruluğu ve süresi | BEKLENİYOR |
| B7 | Dünya görünürlüğü tanımı: disk merkezi mi kenarı mı; anten maskesi var mı | İletişim penceresi | BEKLENİYOR |
| B8 | DSN istasyon koordinatları ve en düşük yükseklik maskesi, kaynağıyla | Gerçek iletişim penceresi | BEKLENİYOR |
| B9 | Metrik tanımları: güneş oranı, iletişim süresi, en uzun karanlık, eğim, buz bölgesine uzaklık (buz verisinin kaynağı) | Planlayıcı özeti, Gelişmiş süzgeçler | BEKLENİYOR |
| B10 | Panel ve batarya modeli denklemleri, varsayılan değerler | "Karanlığı atlatır mı?" | BEKLENİYOR |
| B11 | Doğrulama vakaları: Horizons'ta denenecek site/zamanlar; literatür çalışmaları ve karşılaştırılacak değerler | Doğrulama bölümü | BEKLENİYOR |
| B12 | Kabul toleransları: azimut/yükseklik farkı, aydınlanma oranı farkı | Altın dosya testi (`docs/mimari.md` §8) | BEKLENİYOR |
| B13 | Hazır site listesi: ad, enlem, boylam, yükseklik referansı, kaynak, görev durumu | Site seçimi | BEKLENİYOR |
| B14 | Tarihteki 10 Ay görevi: iniş tarihi ve saati (UTC), konum, sonuç (başarılı/kısmi/başarısız), kaynak | Görevler ve doğrulama | BEKLENİYOR |
| B15 | İniş belirsizliği yarıçapı (görev tipine göre) | Belirsizlik analizi | BEKLENİYOR |
| B16 | Benzer site ölçütü: hangi metrikler, hangi uzaklık | Benzer site önerisi | BEKLENİYOR |
| B17 | Eğitim, yöntem ve sınırlama metinleri (TR ve EN) | Ana sayfa anlatısı, Yöntem | BEKLENİYOR |

## Teslim biçimi (ÖNERİ)

Makinece okunan girdiler `bilim/` klasörüne JSON olarak gelir; böylece hat doğrudan okur ve elle kopyalama
olmaz. Önerilen dosyalar: `bilim/siteler.json` (B13), `bilim/gorevler.json` (B14),
`bilim/parametreler.json` (B3 ile B12, B15, B16). Her kayıtta `kaynak` alanı zorunludur. Şema, bilim
ekibiyle birlikte yazılır; örnek dosyalar yer tutucu değerlerle hazırlanabilir.
