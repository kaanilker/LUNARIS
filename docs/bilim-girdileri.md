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
| B4 | Parsel ağı: kapsanan bölge sınırı, parsel boyutu, izdüşüm (`docs/mimari.md` §3b) | Planlayıcı, Uzman, özel koordinat | BEKLENİYOR |
| B5 | Aydınlanma tanımı: Güneş diski kesri mi merkez mi; "kısmi" eşiği | Zaman çizelgesi (güneşli/kısmi/karanlık) | BEKLENİYOR |
| B6 | Ufuk hesabı: tarama yarıçapı, azimut adımı, Ay eğriliği yöntemi | Ufuk doğruluğu ve süresi | BEKLENİYOR |
| B7 | Dünya görünürlüğü tanımı: disk merkezi mi kenarı mı; anten maskesi var mı | İletişim penceresi | BEKLENİYOR |
| B8 | DSN istasyon koordinatları ve en düşük yükseklik maskesi, kaynağıyla | Gerçek iletişim penceresi | BEKLENİYOR |
| B9 | Metrik tanımları: güneş oranı, iletişim süresi, en uzun karanlık, eğim, buz bölgesine uzaklık (buz verisinin kaynağı) | Planlayıcı özeti, Uzman süzgeçleri | BEKLENİYOR |
| B10 | Panel ve batarya modeli denklemleri, varsayılan değerler | "Karanlığı atlatır mı?" | BEKLENİYOR |
| B11 | Doğrulama vakaları: Horizons'ta denenecek site/zamanlar; Quickmap'te karşılaştırılacak katmanlar; literatür çalışmaları ve karşılaştırılacak değerler | Doğrulama bölümü | BEKLENİYOR |
| B12 | Kabul toleransları: azimut/yükseklik farkı, aydınlanma oranı farkı | Altın dosya testi (`docs/mimari.md` §8) | BEKLENİYOR |
| B13 | Hazır site listesi: ad, enlem, boylam, yükseklik referansı, kaynak, görev durumu | Site seçimi | BEKLENİYOR |
| B14 | Tarihteki en önemli 10 Ay **iniş** görevi (Görevler sayfası, yalnız görsel): iniş tarihi ve saati (UTC), konum, sonuç (başarılı/kısmi/başarısız), kaynak (CSA Moon Exploration kullanılabilir) | Görevler ve doğrulama | BEKLENİYOR |
| B15 | İniş belirsizliği yarıçapı (görev tipine göre) | Belirsizlik analizi | BEKLENİYOR |
| B16 | Benzer site ölçütü: hangi metrikler, hangi uzaklık | Benzer site önerisi | BEKLENİYOR |
| B17 | Eğitim, yöntem ve sınırlama metinleri (TR ve EN) | Ana Sayfa anlatısı, Hakkında | BEKLENİYOR |
| B18 | Kalkış modeli (amaç: görev süresini en aza indirmek, KARAR 2026-11-14): Dünya'daki kalkış noktası ve fırlatma tarihi yolculuk süresini (görev süresi = fırlatmadan inişe kadar), Ay'a varış zamanını ve iniş koşullarını nasıl belirliyor; yanlış zamanda fırlatmanın rotayı ne kadar uzattığı (kullanıcı "~10 kat" diyor, ölçülmedi) (yörünge türü, yolculuk süresi, fırlatma pencereleri); hazır fırlatma üsleri listesi | Planlayıcı girdisi, gecikme kaydırıcısı, en uygun tarih | BEKLENİYOR |
| B19 | Ana Sayfa göstergeleri: "güney kutbu şu an ne kadar enerji alıyor" ve "inişe ne kadar elverişli" tanımı ve hangi bölge üzerinden hesaplandığı | Ana Sayfa paneli | BEKLENİYOR |
| B20 | Parsel sıralama yöntemi: hangi metrikler, hangi parsel değeri (merkez, ortalama, en iyi, en kötü), "en uygun tarih" ölçütü; görev süresinin sıralamaya nasıl girdiği | Planlayıcı sıralaması | BEKLENİYOR |

## Teslim biçimi (ÖNERİ)

Makinece okunan girdiler `bilim/` klasörüne JSON olarak gelir; böylece hat doğrudan okur ve elle kopyalama
olmaz. Önerilen dosyalar: `bilim/siteler.json` (B13), `bilim/gorevler.json` (B14),
`bilim/parametreler.json` (B3 ile B12, B15, B16). Her kayıtta `kaynak` alanı zorunludur. Şema, bilim
ekibiyle birlikte yazılır; örnek dosyalar yer tutucu değerlerle hazırlanabilir.
