# Bilim ekibi derlemesi: okuma notları

> **Yalnız bilgi, karar değil.** Kullanıcı (2026-11-14): kararlar ve bilimsel mimari temel bilimler
> ekibinden çıkar. Bu notlar hiçbir belgeye KARAR olarak taşınmaz; değer kullanılacaksa bilim ekibi
> `docs/bilim-girdileri.md`'ye kaynağıyla yazar.
>
> Belge: "Ay Güney Kutbu İniş Teknolojileri" (Google Docs, yayımlanmış, sürekli güncelleniyor)
> https://docs.google.com/document/d/e/2PACX-1vROAWKJLgBK_MHdGoDpT5g1eSh0GDsXywo_hDFo7lhLheZxY5r6r-eF7UBbDoTjaSYZ7tf2PWRs2BGY/pub
> Okundu: 2026-11-14, özetleyici araçla iki parça hâlinde. Sayılar belgeden aktarıldı, belgenin aslıyla
> tek tek karşılaştırılmadı.

## Belgenin kapsamı
Dört bölüm ve bir kontrol listesi: iç yapı ve jeoloji, iniş ve navigasyon, iletişim ve zaman, enerji.
Kaynakça yaklaşık 157 madde.

## Bizim araçla ilgili olabilecekler (girdi adayı, bilim ekibi seçer)
- **Aydınlanma:** yüksek sırtlar yılın %77,7–85'inden fazlasında güneş alıyor; Mazarico 2011 ve Barker
  2020 (LOLA tabanlı) çalışmaları anılıyor. Doğrulama vakası adayı (B11).
- **DEM:** LOLA 5 m/piksel ve 20 m modeller anılıyor (B2 adayı).
- **Site ve görev adayları (B13, B14):** Malapert A 80,297°G 1,2613°D (IM-1); Mons Mouton (IM-2);
  Chandrayaan-3 69,373°G 32,319°D; Shackleton sırtı; Chang'e-7 aday alanları SR1, CR1; Cabeus (LCROSS).
- **İletişim:** güney kutbunda yaklaşık iki hafta Dünya görünür, iki hafta görünmez; kalıcı gölge
  tabanları Dünya'yı hiç görmez. DSN Ka-bandı bilgileri.
- **Enerji (B10 adayı):** dikey güneş paneli (VSAT, 10 kWe), çok eklemli PV %32, Li-ion ~160 Wh/kg,
  rejeneratif yakıt hücresi 320–650 Wh/kg.
- **Süzgeç adayları (B9):** kontrol listesinde sırt eğimi <5°–15°, kalıcı gölgeye <1 km.

## Belgede olmayanlar (bizim için öncelikli)
SPICE, JPL Horizons, libration, Güneş yükseklik açısının hesabı ve ufuk profili yöntemi belgede yok.
Bunlar challenge'ın çekirdeği ve `docs/bilim-girdileri.md` B1–B8'e karşılık geliyor.

## Kapsam dışında kalanlar
Röle uyduları (ELFO, NRHO, Queqiao-2) belgede ayrıntılı; LUNARIS doğrudan Dünya iletişimini
değerlendiriyor, röle modeli kapsam dışı (`SPEC.md`).
