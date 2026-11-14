// Kabul (.ajan/aktif-is.md): 7 sayfa /tr/ ve /en/ önekleriyle açılıyor, 375 px'te yatay kaydırma yok.
// docs/tasarim.md §4 ölçüt 1, 3, 7 ve 8 burada ölçülür.
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
	await expect(page.getByText('Parsel · P-0042')).toBeVisible();
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
				.map((o) => ({ ad: o.textContent?.trim() || o.tagName, k: o.getBoundingClientRect() }))
				.filter(({ k }) => k.width < 24 || k.height < 24)
				.map(({ ad, k }) => `${ad} ${Math.round(k.width)}×${Math.round(k.height)}`)
		);
		expect(kucukler, yol).toEqual([]);
	}
});
