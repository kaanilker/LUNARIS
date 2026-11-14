// Kabul (.ajan/aktif-is.md): 7 sayfa /tr/ ve /en/ önekleriyle açılıyor, 375 px'te yatay kaydırma yok.
// docs/tasarim.md §4 ölçüt 1, 3, 7, 8, 11, 12 ve 13 burada ölçülür.
import { expect, test, type Page } from '@playwright/test';

const SAYFALAR: Record<'tr' | 'en', string[]> = {
	tr: ['/tr/', '/tr/planla/', '/tr/uzman/', '/tr/site/', '/tr/karsilastir/', '/tr/gorevler/', '/tr/hakkinda/'],
	en: ['/en/', '/en/plan/', '/en/expert/', '/en/site/', '/en/compare/', '/en/missions/', '/en/about/']
};

function hatalariTopla(page: Page): string[] {
	const hatalar: string[] = [];
	page.on('pageerror', (e) => hatalar.push(e.message));
	page.on('console', (m) => {
		if (m.type() === 'error' || m.text().includes('[i18n]')) hatalar.push(m.text());
	});
	return hatalar;
}

for (const [dil, yollar] of Object.entries(SAYFALAR)) {
	for (const yol of yollar) {
		test(`${yol} açılıyor, taşmıyor, yer tutucu görünüyor`, async ({ page }) => {
			const hatalar = hatalariTopla(page);
			const yanit = await page.goto(yol);
			expect(yanit?.status()).toBe(200);
			await expect(page.locator('html')).toHaveAttribute('lang', dil);
			await expect(page.locator('h1')).toBeVisible();
			await expect(page.locator('[data-yer-tutucu]').first()).toBeVisible();

			const tasma = await page.evaluate(
				() => document.documentElement.scrollWidth - document.documentElement.clientWidth
			);
			expect(tasma, 'yatay kaydırma').toBeLessThanOrEqual(0);
			expect(hatalar).toEqual([]);
		});
	}
}

test('ana soru ve iki düğme ilk ekranda (ölçüt 7)', async ({ page }) => {
	await page.goto('/tr/');
	const ekran = page.viewportSize()!;
	for (const hedef of [page.locator('h1'), page.getByRole('link', { name: 'Planlamaya başla' }), page.getByRole('main').getByRole('button', { name: 'Turu başlat' })]) {
		const kutu = await hedef.boundingBox();
		expect(kutu).not.toBeNull();
		expect(kutu!.y + kutu!.height).toBeLessThanOrEqual(ekran.height);
	}
});

test('dil değiştirince aynı sayfa öbür dilde açılır', async ({ page }) => {
	await page.goto('/tr/planla/');
	const menu = page.getByRole('button', { name: 'Menü' });
	if (await menu.isVisible()) await menu.click();
	await page.getByRole('link', { name: 'English' }).click();
	await expect(page).toHaveURL(/\/en\/plan\/$/);
	await expect(page.locator('h1')).toHaveText('Planner');
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('parsel adresi istemci yedeğiyle açılır (.htaccess)', async ({ page }) => {
	const yanit = await page.goto('/tr/site/P-0042/');
	expect(yanit?.status()).toBe(200);
	await expect(page.locator('h1')).toHaveText('Parsel P-0042');
	await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});

test('bilinmeyen adres 404 döner ve hata sayfası görünür', async ({ page }) => {
	const yanit = await page.goto('/tr/yok-boyle-sayfa/');
	expect(yanit?.status()).toBe(404);
	await expect(page.locator('h1')).toHaveText('Sayfa bulunamadı');
});

test('sondaki eğik çizgi olmadan da açılır', async ({ page }) => {
	await page.goto('/en/about');
	await expect(page).toHaveURL(/\/en\/about\/$/);
	await expect(page.locator('h1')).toHaveText('About');
});

test('dokunma hedefleri en az 24×24 px (ölçüt 3)', async ({ page }) => {
	for (const yol of ['/tr/', '/tr/planla/', '/tr/site/']) {
		await page.goto(yol);
		const kucukler = await page.evaluate(() =>
			[...document.querySelectorAll('a, button, input, select')]
				.filter((o) => (o as HTMLElement).offsetParent !== null)
				// Görsel olarak gizli girdide dokunma hedefi onu saran etikettir.
				.map((o) => (o.classList.contains('sr-only') && o.closest('label') ? o.closest('label')! : o))
				.map((o) => ({ ad: o.textContent?.trim() || o.tagName, k: o.getBoundingClientRect() }))
				.filter(({ k }) => k.width < 24 || k.height < 24)
				.map(({ ad, k }) => `${ad} ${Math.round(k.width)}×${Math.round(k.height)}`)
		);
		expect(kucukler, yol).toEqual([]);
	}
});

// Ölçüt 11: her panel en yakın 12 sütunlu ızgaranın sütun çizgilerine oturur.
async function hizaHatalari(page: Page): Promise<string[]> {
	return page.evaluate(() => {
		const hatalar: string[] = [];
		for (const panel of document.querySelectorAll<HTMLElement>('[data-panel]')) {
			const izgara = panel.closest<HTMLElement>('[data-izgara]');
			if (!izgara || panel.offsetParent === null) continue;
			const stil = getComputedStyle(izgara);
			const sutunlar = stil.gridTemplateColumns.split(' ').map(parseFloat);
			const aralik = parseFloat(stil.columnGap);
			const sol0 = izgara.getBoundingClientRect().left + parseFloat(stil.paddingLeft);
			const baslar: number[] = [];
			const bitisler: number[] = [];
			let x = sol0;
			for (const g of sutunlar) {
				baslar.push(x);
				bitisler.push(x + g);
				x += g + aralik;
			}
			const k = panel.getBoundingClientRect();
			const yakin = (d: number, l: number[]) => l.some((v) => Math.abs(v - d) <= 1);
			if (!yakin(k.left, baslar) || !yakin(k.right, bitisler)) {
				const ad = panel.querySelector('h2,h3')?.textContent?.trim() ?? panel.className.slice(0, 40);
				hatalar.push(`${ad}: ${Math.round(k.left)}–${Math.round(k.right)}`);
			}
		}
		return hatalar;
	});
}

// Ölçüt 12: köşe yarıçapı yalnız 0, 8, 12 px ya da tam yuvarlak.
async function koseHatalari(page: Page): Promise<string[]> {
	return page.evaluate(() => {
		const izinli = new Set(['0px', '8px', '12px']);
		const hatalar = new Set<string>();
		for (const o of document.querySelectorAll<HTMLElement>('body *')) {
			if (o.offsetParent === null && getComputedStyle(o).position !== 'fixed') continue;
			const r = getComputedStyle(o).borderTopLeftRadius;
			const deger = parseFloat(r);
			const k = o.getBoundingClientRect();
			const tamYuvarlak = deger >= Math.min(k.width, k.height) / 2 - 0.5;
			if (!izinli.has(r) && !tamYuvarlak) hatalar.add(`${o.tagName.toLowerCase()} ${r}`);
		}
		return [...hatalar];
	});
}

for (const yollar of Object.values(SAYFALAR)) {
	for (const yol of yollar) {
		test(`${yol} paneller ızgaraya oturuyor, şekil dili tek (ölçüt 11, 12)`, async ({ page }) => {
			await page.goto(yol);
			expect(await page.locator('[data-panel]').count()).toBeGreaterThan(0);
			expect(await hizaHatalari(page)).toEqual([]);
			expect(await koseHatalari(page)).toEqual([]);
		});
	}
}

test('üst çubuk içerik kabının içinde kalıyor (1280 px, Türkçe)', async ({ page }) => {
	test.skip(page.viewportSize()!.width < 1280, 'masaüstü menüsü yalnız 1280 px ve üstünde');
	await page.goto('/tr/gorevler/');
	const sag = await page.evaluate(() => {
		const satir = document.querySelector('header .kap')!;
		const sinir = satir.getBoundingClientRect().right - parseFloat(getComputedStyle(satir).paddingRight);
		const enSag = Math.max(...[...satir.querySelectorAll('a, button')].map((o) => o.getBoundingClientRect().right));
		return enSag - sinir;
	});
	expect(sag).toBeLessThanOrEqual(0.5);
});

// Ölçüt 13: frontend-design skill'inin saydığı şablon işaretleri görünen sayfada yok.
for (const yollar of Object.values(SAYFALAR)) {
	for (const yol of yollar) {
		test(`${yol} şablon işareti yok (ölçüt 13)`, async ({ page }) => {
			await page.goto(yol);
			const bulgu = await page.evaluate(() => {
				const metin = document.body.innerText;
				const buyukHarf = [...document.querySelectorAll<HTMLElement>('body *')].filter(
					(o) => o.offsetParent !== null && getComputedStyle(o).textTransform === 'uppercase'
				).length;
				return { ortaNokta: metin.includes(' · '), ok: metin.includes('→'), buyukHarf };
			});
			expect(bulgu).toEqual({ ortaNokta: false, ok: false, buyukHarf: 0 });
		});
	}
}
