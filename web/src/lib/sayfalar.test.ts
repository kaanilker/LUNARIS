import { describe, expect, it } from 'vitest';
import { DILLER, SAYFALAR, adres, karsiDilAdresi, parcadanSayfa, tumParcalar } from './sayfalar';

describe('sayfa adresleri', () => {
	it('docs/sayfalar.md tablosundaki adresler', () => {
		expect(adres('tr', 'ana')).toBe('/tr/');
		expect(adres('en', 'planla')).toBe('/en/plan/');
		expect(adres('tr', 'karsilastir')).toBe('/tr/karsilastir/');
		expect(adres('en', 'hakkinda')).toBe('/en/about/');
		expect(adres('tr', 'site', 'P-12')).toBe('/tr/site/P-12/');
	});

	it('her dilde 7 sayfa, parçalar benzersiz ve geri çözülür', () => {
		expect(SAYFALAR).toHaveLength(7);
		for (const dil of DILLER) {
			const parcalar = SAYFALAR.filter((s) => s !== 'ana').map((s) => adres(dil, s).split('/')[2]);
			expect(new Set(parcalar).size).toBe(parcalar.length);
			for (const p of parcalar) expect(parcadanSayfa(dil, p)).not.toBeNull();
		}
		expect(tumParcalar()).toHaveLength(12);
	});

	it('başka dilin parçası kabul edilmez', () => {
		expect(parcadanSayfa('tr', 'plan')).toBeNull();
		expect(parcadanSayfa('en', 'planla')).toBeNull();
	});

	it('dil değiştirince sayfa ve parsel korunur', () => {
		expect(karsiDilAdresi('/tr/planla/', 'en')).toBe('/en/plan/');
		expect(karsiDilAdresi('/en/site/P%2012/', 'tr')).toBe('/tr/site/P%2012/');
		expect(karsiDilAdresi('/tr/', 'en')).toBe('/en/');
		expect(karsiDilAdresi('/tr/yok/', 'en')).toBe('/en/');
	});
});
