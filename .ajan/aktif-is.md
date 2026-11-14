İŞ: Siteye geçiş: SvelteKit iskeleti (Aşama 1b). 7 sayfanın boş hâli, TR/EN, koyu tema ve tasarım belirteçleri, `.htaccess`; bilinen eksiklerle başlanır, eksikler yer tutucu olarak görünür.
SAHİP BELGE: docs/sayfalar.md (sayfalar, adresler), docs/tasarim.md (belirteçler, §4 kabul ölçütleri), docs/animasyonlar.md, docs/mimari.md §5 ve §7, docs/proje-taslagi.md §11 (repo yapısı)
NEDEN BU İŞ: Kullanıcı kararı (2026-11-14): bazı eksiklerle siteye geçiliyor. İskelet tasarım denemelerinin, sahne arayüzünün ve cPanel denemesinin ön koşulu.
KABUL: `web/` altında `npm run build` borusuz yeşil; 7 sayfa /tr/ ve /en/ önekleriyle gerçek tarayıcıda açılıyor ve 375 px'te yatay kaydırma yok; renk belirteçleri tek yerde; test komutu CLAUDE.md'ye ve .ajan/test-komutu'na yazıldı.
BAŞLANGIÇ: 2026-11-14

Bilinen eksikler (iskeleti bekletmez): güncel parametre dosyası ve veri kaynakları listesi kullanıcıdan gelecek; renk ve yazı tipi değerleri seçilmedi (docs/tasarim.md §3, ajan yetkisiyle seçer); parametre setinin ek özellikleri kullanıcı onayında; veri hattı ve gerçek veri yok.

Başka işe geçmek için önce bu dosyayı değiştir ve sebebini commit mesajına yaz.
