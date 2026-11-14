# LUNARIS web

SvelteKit + TypeScript + Tailwind CSS 4, statik çıktı (`adapter-static`). Mimari: `../docs/mimari.md` §7. Sayfalar ve adresler:
`../docs/sayfalar.md` (tek kaynak kodda `src/lib/sayfalar.ts`). Tasarım belirteçleri: `src/lib/stil/belirtecler.css` (Tailwind `@theme`; hazır renk paleti kapalı, yalnız `bg-yuzey`, `text-gunes` gibi adlar geçer). Kurallar ve ölçütler: `../docs/tasarim.md`.

```
npx npm@11.6.2 install     # npm 10.9 bu ağaçta düşüyor (../docs/dersler.md)
npm run dev                # geliştirme sunucusu
npx vitest --run           # birim testleri
npm run build              # build/ → cPanel public_html
npx playwright test        # build/ yerel Apache'de, masaüstü ve 375 px
```

Klasörler: `src/lib/sayfa` sayfa bileşenleri, `src/lib/bilesenler` ortak bileşenler (`Panel`, `Gosterge`, `YerTutucu`, `Rozet`), `src/lib/cizim` SVG çizimler, `src/lib/i18n` TR/EN
metinleri, `static/.htaccess` Apache kuralları. Bilim girdisi gelmemiş her yer `YerTutucu` ile işaretlidir.
