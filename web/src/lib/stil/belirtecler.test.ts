// docs/tasarim.md §2, §3 ve §4 ölçütlerinin kodla denetlenen kısmı.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const BELIRTEC_DOSYASI = 'src/lib/stil/belirtecler.css';

// gunes ve dunya renklerini kullanan her dosya burada adıyla durur; yeni kullanım eklenirken anlamın
// Güneş ya da Dünya olduğu gözle denetlenir (docs/tasarim.md §4 ölçüt 5).
const ANLAM_RENGI_KULLANABILIR = [
	'src/lib/bilesenler/Gosterge.svelte',
	'src/lib/bilesenler/Panel.svelte',
	'src/lib/sayfa/AnaSayfa.svelte',
	'src/lib/sayfa/SiteDetay.svelte'
];
const ANLAM_RENGI = /-(gunes|dunya)\b(?!_)|anlam="(gunes|dunya)"|ton="(gunes|dunya)"|--color-(gunes|dunya)/;

function dosyalar(kok: string): string[] {
	return readdirSync(kok).flatMap((ad: string) => {
		const yol = join(kok, ad);
		return statSync(yol).isDirectory() ? dosyalar(yol) : /\.(svelte|css|ts)$/.test(ad) ? [yol] : [];
	});
}

function belirtecler(): Record<string, string> {
	const css = readFileSync(BELIRTEC_DOSYASI, 'utf8');
	const tema = css.slice(css.indexOf('@theme'), css.indexOf('@media print'));
	return Object.fromEntries(
		[...tema.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6});/g)].map((m) => [m[1], m[2]])
	);
}

function goreliParlaklik(hex: string): number {
	const [r, g, b] = [1, 3, 5].map((i) => {
		const c = parseInt(hex.slice(i, i + 2), 16) / 255;
		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** CIELAB L*: algılanan açıklık (0 siyah, 100 beyaz). */
function lYildiz(hex: string): number {
	const y = goreliParlaklik(hex);
	return y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y;
}

function karsitlik(a: string, b: string): number {
	const [x, y] = [goreliParlaklik(a), goreliParlaklik(b)].sort((p, q) => q - p);
	return (x + 0.05) / (y + 0.05);
}

describe('tasarım belirteçleri', () => {
	it('renk değerleri yalnız belirteç dosyasında (favicon static/ altında)', () => {
		const ihlal = dosyalar('src')
			.filter((y) => y !== BELIRTEC_DOSYASI && !y.endsWith('.test.ts'))
			.filter((y) => /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(/.test(readFileSync(y, 'utf8')));
		expect(ihlal).toEqual([]);
	});

	it("Tailwind'in hazır renk ve köşe ölçeği kapalı", () => {
		const css = readFileSync(BELIRTEC_DOSYASI, 'utf8');
		expect(css).toContain('--color-*: initial;');
		expect(css).toContain('--radius-*: initial;');
	});

	it('amber ve mavi yalnız izinli dosyalarda (ölçüt 5)', () => {
		const kullanan = dosyalar('src')
			.filter((y) => y !== BELIRTEC_DOSYASI && !y.endsWith('.test.ts'))
			.filter((y) => ANLAM_RENGI.test(readFileSync(y, 'utf8')));
		expect(kullanan.sort()).toEqual([...ANLAM_RENGI_KULLANABILIR].sort());
	});

	it('zemin laciverde çalan siyah, katmanlar ayrışır (ölçüt 10)', () => {
		const b = belirtecler();
		const zemin = lYildiz(b['zemin']);
		expect(zemin).toBeGreaterThanOrEqual(1);
		expect(zemin).toBeLessThanOrEqual(4);
		// Lacivert: mavi kanal kırmızı ve yeşilden baskın.
		const [r, g, bl] = [1, 3, 5].map((i) => parseInt(b['zemin'].slice(i, i + 2), 16));
		expect(bl).toBeGreaterThan(Math.max(r, g));
		expect(lYildiz(b['yuzey']) - zemin).toBeGreaterThanOrEqual(3);
		expect(lYildiz(b['yuzey-2']) - lYildiz(b['yuzey'])).toBeGreaterThanOrEqual(3);
	});

	it('WCAG 2.2 AA: metin 4,5:1, grafik ve bileşen sınırı 3:1 (ölçüt 2)', () => {
		const b = belirtecler();
		for (const zemin of ['zemin', 'yuzey', 'yuzey-2']) {
			for (const metin of ['metin', 'metin-ikincil']) {
				expect(karsitlik(b[metin], b[zemin]), `${metin}/${zemin}`).toBeGreaterThanOrEqual(4.5);
			}
			for (const grafik of ['gunes', 'dunya', 'vurgu', 'uyari', 'hata', 'basari', 'cizgi-guclu']) {
				expect(karsitlik(b[grafik], b[zemin]), `${grafik}/${zemin}`).toBeGreaterThanOrEqual(3);
			}
		}
		expect(karsitlik(b['vurgu-uzerine'], b['vurgu'])).toBeGreaterThanOrEqual(4.5);
	});
});
