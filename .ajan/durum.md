# Oturum durumu — nerede kaldık

> Tek blok. Yeni durum yazarken eskisini sil. Yalnız `/kapanis` ile yazılır. Kalıcı kural buraya değil
> `CLAUDE.md`'ye gider.

## 2026-11-14 · Mimari ve kararlar tamam, siteye geçiş
### İnenler
- Bütün mimari, sayfa, Planlayıcı, tasarım ve animasyon kararları belgelerde; son commit öncesi fc25b0f, hepsi origin/main'de.
  Sahip belgeler: CLAUDE.md "Belgeler ve sahipleri" tablosu.
- Parametre seti ana kaynak yapıldı (ab14737). Bağımsız doğrulama: `.venv/bin/python hat/kontrol/parametre_seti_kontrol.py`
  → 47 sayıdan 46 tuttu, 8/8 formül testi geçti, çıkış 1 (bilinen fark: saha toplamı 78 / belge 130). Bulgular docs/parametre-seti-dogrulama.md.
- Python ortamı `.venv` (hat/requirements.txt, 8 kütüphane, içe aktarma doğrulandı). Node 22 var.
- Groq: model gpt-oss-20b (kullanıcı); anahtar yalnız `.env`'de (git dışı, izin 600). Deneme `api/deneme/groq_yorum_deneme.py`:
  sayı uydurma yok ama karşılaştırma hatası görüldü (n=1); yorum hattı kuralları docs/mimari.md §6.
- Teknik ve tasarım ayrıntısında karar yetkisi ajanda (CLAUDE.md "Karar yetkisi").
### Sıradakiler
1. Açık iş: SvelteKit iskeleti (.ajan/aktif-is.md). Başlangıç: `web/` klasörü, docs/proje-taslagi.md §11 yapısı, docs/sayfalar.md adresleri.
2. Kullanıcıdan gelecek güncel parametre dosyası: eski sürümle diff, kontrol betiğini yeniden koş, doğrulama bulgularını (B-1…B-9) yeniden değerlendir.
3. Kullanıcıdan gelecek veri kaynakları listesi: docs/veri-kaynaklari.md (erişim, boyut, lisans, B eşlemesi) ve indirme betiği.
4. Veri hattı pilotu (Aşama 1a): SPICE + Horizons karşılaştırması, sentetik arazi testleri, tek ufuk süresi ölçümü.
### Bende bekleyen
- Parametre setinin ek özellikleri: ajanın önerisi ilk dördü al (direk kaydırıcısı, müsaitlik şeridi, termal gösterge, hazır ağırlıklar), kalanı sonra (docs/sayfalar.md sonu). Kullanıcı cevap vermedi.
- Groq anahtarı sohbette açık yazıldı: kullanıcı konsoldan yenileyip `.env`'ye yazmalı.
- Bilim ekibi: yöntem, parametre onayı, doğrulama raporundaki düzeltmeler, eksik veri dosyaları (Wueller, jeoloji), 8 görev koordinatı.
- Push: ajan yapıyor (CLAUDE.md "Git ve push"); bekleyen push yok.
### Bu oturumda ölçülen tuzaklar
- Kabuk profili her Bash çağrısında fastfetch basıyor; bağlamı dolduruyor (ölçüldü 2026-11-14 · her Bash çıktısı). Çözüm kullanıcıda: ~/.bashrc'de fastfetch'i etkileşimsiz kabukta çalıştırmamak.
- gpt-oss-20b doğru sayılarla yanlış karşılaştırma yazabiliyor (ölçüldü 2026-11-14 · api/deneme/groq_yorum_deneme.py ve ilk düz deneme · n=1).
- Parametre setinin "hazır" dediği veri dosyaları repoda yok (arandı 2026-11-14).
