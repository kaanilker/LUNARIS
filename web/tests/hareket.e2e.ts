// docs/animasyonlar.md §1a: arayüz hareketi var, "hareketi azalt" açıkken durur, içerik hiç kaybolmaz.
import { expect, test } from '@playwright/test';

const kureYolu = (page: import('@playwright/test').Page) =>
	page.locator('figure svg path').first().getAttribute('d');

test('menüde her sekmenin simgesi var', async ({ page }) => {
	test.skip(page.viewportSize()!.width < 1280, 'masaüstü menüsü');
	await page.goto('/tr/');
	const baglantilar = page.locator('header nav a');
	await expect(baglantilar).toHaveCount(7);
	for (const a of await baglantilar.all()) await expect(a.locator('svg')).toHaveCount(1);
});

test('paneller görünüme girince belirir, aşağı inince hepsi görünür olur', async ({ page }) => {
	await page.goto('/tr/uzman/');
	const paneller = page.locator('[data-panel]');
	const son = paneller.last();
	await expect(son).not.toHaveClass(/belirdi/);
	for (let i = 0; i < 10; i++) await page.mouse.wheel(0, 900);
	await expect(son).toHaveClass(/belirdi/);
	await expect.poll(() => son.evaluate((o) => getComputedStyle(o).opacity)).toBe('1');
});

test('dönen küre zamanla değişiyor', async ({ page }) => {
	await page.goto('/tr/');
	const once = await kureYolu(page);
	await page.waitForTimeout(600);
	expect(await kureYolu(page)).not.toBe(once);
});

test.describe('hareketi azalt açıkken', () => {
	test.use({ reducedMotion: 'reduce' });

	test('her panel anında görünür, küre durur', async ({ page }) => {
		await page.goto('/tr/hakkinda/');
		const opaklik = await page
			.locator('[data-panel]')
			.evaluateAll((l) => l.map((o) => getComputedStyle(o).opacity));
		expect(opaklik.every((o) => o === '1')).toBe(true);

		await page.goto('/tr/');
		const once = await kureYolu(page);
		await page.waitForTimeout(600);
		expect(await kureYolu(page)).toBe(once);
	});
});

test('sayfa geçişinde etkin sekme çizgisi yeni sekmeye geçer', async ({ page }) => {
	test.skip(page.viewportSize()!.width < 1280, 'masaüstü menüsü');
	await page.goto('/tr/');
	await page.locator('header nav a', { hasText: 'Planlayıcı' }).click();
	await expect(page).toHaveURL(/\/tr\/planla\/$/);
	const cizgi = page.locator('header nav a[aria-current="page"] span[class*="etkin-sekme"]');
	await expect(cizgi).toHaveCount(1);
	await expect(page.locator('header nav a[aria-current="page"]')).toContainText('Planlayıcı');
});
