// docs/tasarim.md §2 ve §4 ölçütlerinin kodla denetlenen kısmı.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const BELIRTEC_DOSYASI = 'src/lib/stil/belirtecler.css';

// --gunes ve --dunya kullanan her dosya burada adıyla durur; yeni kullanım bu listeye eklenirken
// anlamın Güneş ya da Dünya olduğu gözle denetlenir (docs/tasarim.md §4 ölçüt 5).
const ANLAM_RENGI_KULLANABILIR = [
	'src/lib/stil/belirtecler.css',
	'src/lib/bilesenler/Gosterge.svelte',
	'src/lib/sayfa/SiteDetay.svelte'
];

function dosyalar(kok: string): string[] {
	return readdirSync(kok).flatMap((ad) => {
		const yol = join(kok, ad);
		return statSync(yol).isDirectory() ? dosyalar(yol) : /\.(svelte|css|ts)$/.test(ad) ? [yol] : [];
	});
}

function belirtecler(): Record<string, string> {
	const css = readFileSync(BELIRTEC_DOSYASI, 'utf8');
	const kok = css.slice(css.indexOf(':root'), css.indexOf('}'));
	return Object.fromEntries([...kok.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6});/g)].map((m) => [m[1], m[2]]));
}

function goreliParlaklik(hex: string): number {
	const [r, g, b] = [1, 3, 5].map((i) => {
		const c = parseInt(hex.slice(i, i + 2), 16) / 255;
		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function karsitlik(a: string, b: string): number {
	const [x, y] = [goreliParlaklik(a), goreliParlaklik(b)].sort((p, q) => q - p);
	return (x + 0.05) / (y + 0.05);
}

describe('tasarım belirteçleri', () => {
	it('renk değerleri yalnız belirteç dosyasında', () => {
		const ihlal = dosyalar('src')
			.filter((y) => !y.endsWith('belirtecler.css') && !y.endsWith('.test.ts'))
			.filter((y) => /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/.test(readFileSync(y, 'utf8')));
		expect(ihlal).toEqual([]);
	});

	it('amber ve mavi yalnız izinli dosyalarda', () => {
		const kullanan = dosyalar('src')
			.filter((y) => !y.endsWith('.test.ts'))
			.filter((y) => /var\(--(gunes|dunya)/.test(readFileSync(y, 'utf8')) || y === BELIRTEC_DOSYASI);
		expect(kullanan.sort()).toEqual([...ANLAM_RENGI_KULLANABILIR].sort());
	});

	it('WCAG 2.2 AA: metin 4,5:1, grafik ve büyük öğe 3:1', () => {
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
