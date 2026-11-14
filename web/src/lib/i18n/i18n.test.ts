import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { anahtarlar, cevirmen } from './index';

function dosyalar(kok: string, uzanti: RegExp): string[] {
	return readdirSync(kok).flatMap((ad) => {
		const yol = join(kok, ad);
		return statSync(yol).isDirectory() ? dosyalar(yol, uzanti) : uzanti.test(ad) ? [yol] : [];
	});
}

describe('i18n', () => {
	it('TR ve EN aynı anahtarları taşır', () => {
		expect(anahtarlar('en')).toEqual(anahtarlar('tr'));
	});

	it('JSON dosyalarında yinelenen anahtar yok (sonraki öncekini sessizce siler)', () => {
		for (const dil of ['tr', 'en'] as const) {
			const ham = readFileSync(`src/lib/i18n/${dil}.json`, 'utf8');
			const yapraklar = ham.match(/"[^"]+":\s*"/g) ?? [];
			expect(yapraklar.length, dil).toBe(anahtarlar(dil).length);
		}
	});

	it('hiçbir metin boş değil', () => {
		for (const dil of ['tr', 'en'] as const) {
			const t = cevirmen(dil);
			for (const a of anahtarlar(dil)) expect(t(a).trim(), `${dil}:${a}`).not.toBe('');
		}
	});

	it('kodda geçen her sabit anahtar sözlükte var', () => {
		const var_olan = new Set(anahtarlar('tr'));
		const eksik: string[] = [];
		for (const yol of dosyalar('src', /\.(svelte|ts)$/)) {
			const kod = readFileSync(yol, 'utf8');
			for (const m of kod.matchAll(/\bt\)?\(\s*'([a-z_]+\.[a-z0-9_.]+)'\s*\)/g)) {
				if (!var_olan.has(m[1])) eksik.push(`${yol}: ${m[1]}`);
			}
		}
		expect(eksik).toEqual([]);
	});

	it('ürün metninde tireyle ara cümle yok (global tasarım kuralı)', () => {
		for (const dil of ['tr', 'en'] as const) {
			const t = cevirmen(dil);
			for (const a of anahtarlar(dil)) expect(t(a), `${dil}:${a}`).not.toMatch(/\s[-–—]\s/);
		}
	});
});
