# Oturum durumu — nerede kaldık

> Tek blok. Yeni durum yazarken eskisini sil. Yalnız `/kapanis` ile yazılır. Kalıcı kural buraya değil
> `CLAUDE.md`'ye gider.

## 2026-11-14 · Site iskeleti ve tasarım bitti, sırada veri kaynakları
### İnenler
- **Site iskeleti** (`web/`, SvelteKit 2 + Svelte 5 + Tailwind 4, statik): 7 sayfa TR/EN, eksikler "Yer tutucu" ile, `.htaccess`
  (parsel adresleri 200.html'e). İlk commit fb201d5; son site commit'i e8da810.
- **Tasarım dört tur** (docs/tasarim.md §3, §3a, §4): Ay paleti (siyah gökyüzü, gri regolit, gümüş vurgu; renkli yalnız Güneş ve
  Dünya), Archivo, ufuk çizgisi imza öğesi, rapor düzeni, okuma şeridi. frontend-design skill'i kuruldu (`.claude/skills/`,
  anthropics/skills@2c5958e). Yapay zekâ işi görünüm işaretleri web'den araştırıldı, kaynaklarıyla §3a'da.
- **Hareket** (docs/animasyonlar.md §1a, kullanıcı kararı): sayfa geçişi, açılış dizisi, belirme, simge tepkileri, dönen küre;
  hareketi azalt açıkken hepsi durur. Commit 142434d.
- **NASA bölgelerine benzerlik modeli** (docs/fikirler/2026-11-14-ml-nasa-bolge-skoru.md): yalnız bilgi, hesapta yeri yok;
  9 güncel bölge; veri hattından sonra. Site Detay'da yer tutucu kartı. Commit'ler 5b8d09b…6a9b4d5.
- **Doğrulama** (ölçüldü 2026-11-14 · bu makine · borusuz, son koşu e8da810 üstünde): `npx vitest --run` 19/19; `npm run check`
  0 hata; `npm run build` çıkış 0; `npx playwright test` 105 geçti, 3 atlandı (masaüstüne özel testler mobilde). Testler yerel
  Apache 2.4 + .htaccess üstünde, 1280 ve 375 px. Ölçütler 1–13 (docs/tasarim.md §4) testlere bağlı.
- Hepsi origin/main'de (son push 6a9b4d5).
### Sıradakiler
1. Açık iş: veri kaynakları (`.ajan/aktif-is.md`). Başlangıç: parametre setinin §14 "Veri ürünleri" ve §18 "Kaynaklar" bölümleri,
   docs/bilim-girdileri.md B1, B2, B11, B13; çıktı yeni `docs/veri-kaynaklari.md`.
2. Veri hattı pilotu (Aşama 1a): SPICE + Horizons karşılaştırması, sentetik arazi testi, tek ufuk süresi ölçümü.
3. Sahne arayüzü ve sahte abonelik (Aşama 1c), animasyon ekibi için.
4. Güncel parametre dosyası gelince: eski sürümle diff, `.venv/bin/python hat/kontrol/parametre_seti_kontrol.py` yeniden koşulur.
### Kullanıcıda bekleyen
- 21st.dev MCP bu oturumda görünmedi; yapılandırma dosyalarında kayıt yok. Claude Code yeniden başlatılmalı; yine yoksa
  `npx @21st-dev/cli@latest init --client claude` yeniden. Anahtar sohbete yazılmaz.
- cPanel'e deneme yüklemesi (dışa dönük adım, kullanıcı onayı).
- Parametre setinin ek özellikleri (direk kaydırıcısı, müsaitlik şeridi, termal gösterge, hazır ağırlıklar): cevap yok.
- Groq anahtarı daha önce sohbette açık yazıldı: konsoldan yenilenip `.env`'ye yazılmalı.
- Bilim ekibi: yöntem ve parametre onayı, doğrulama bulguları, eksik veri dosyaları (Wueller, jeoloji), 10 görev listesi, fırlatma üsleri.
- Animasyon kuralının arayüz katmanında genişletildiği (docs/animasyonlar.md §1a) ekibe duyurulmalı.
- Push: ajan yapıyor (CLAUDE.md "Git ve push"); bekleyen push yok.
### Bu oturumda ölçülen tuzaklar
- npm 10.9.7 SvelteKit ağacında `edgesOut` hatasıyla düşüyor; `npx npm@11.6.2 install` kuruyor (docs/dersler.md).
- `pkill -f <desen>` kendi kabuğunu öldürür; sunucu PID ile durdurulur (docs/dersler.md).
- Tailwind dinamik sınıf adını (`md:grid-cols-{n}`) göremez; açık eşleme gerekir (web/src/lib/bilesenler/OkumaSeridi.svelte).
- IntersectionObserver ile belirme: Playwright tam sayfa ekran görüntüsünde kaydırılmayan paneller gizli görünür; görsel denetimde
  kaydırmak ya da `reducedMotion: 'reduce'` kullanmak gerekir (ölçüldü 2026-11-14 · scratchpad goruntu.mjs).
- Kabuk profili her Bash çağrısında fastfetch basıyor (önceki oturumdan, hâlâ geçerli).
