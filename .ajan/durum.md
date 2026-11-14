# Oturum durumu — nerede kaldık

> Tek blok. Yeni durum yazarken eskisini sil. Yalnız `/kapanis` ile yazılır. Kalıcı kural buraya değil
> `CLAUDE.md`'ye gider.

## 2026-11-14 · Kurulum ve mimari önerisi
### İnenler
- origin = github.com/kaanilker/LUNARIS bağlandı, yerel commit uzak LICENSE commit'inin üstüne taşındı.
- Çalışma sistemi kuruldu (global skill'ler, inceleyici/literatur ajanları; proje: ürün profili + SPEC/DEMO).
- Brif ve challenge metni docs/kaynak/ altına kaydedildi.
- docs/mimari.md (ÖNERİ), docs/bilim-girdileri.md, docs/acik-sorular.md, SPEC.md yazıldı. Kod yok, test yok.
### Sıradakiler
1. Kullanıcıyla docs/mimari.md üzerinden geçmek, maddeleri KARAR/ret yapmak.
2. S2 cevaplanınca iskelet: hat/ için pilot (tek site efemeris + ufuk süresi ölçümü), web/ için sahne arayüzü taslağı.
3. bilim/ JSON şemalarını yer tutucu örneklerle hazırlamak.
### Bende bekleyen
- Açık sorular S1…S7 (docs/acik-sorular.md), özellikle S2 ön yüz çatısı.
- Bilim ekibine docs/bilim-girdileri.md listesinin iletilmesi.
- Push yapılamıyor: gh girişi var ama github_pat_ jetonu LUNARIS'e yazamıyor (git push --dry-run → 403, ölçüldü 2026-11-14). Jeton düzeltilmeli ya da gh auth login web tarayıcı akışıyla yenilenmeli.
### Bu oturumda ölçülen tuzaklar
- Kabuk profili her Bash çağrısında fastfetch basıyor; bağlamı dolduruyor (ölçüldü 2026-11-14 · her Bash çıktısı).
