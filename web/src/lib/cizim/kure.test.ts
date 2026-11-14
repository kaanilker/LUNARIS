import { describe, expect, it } from 'vitest';
import { izdus, kafes } from './kure';

describe('küre izdüşümü', () => {
	it('egim 0: ekvator ve sıfır boylam merkezde, kutuplar kenarda', () => {
		const m = izdus(0, 0, 0);
		expect(m.x).toBeCloseTo(0);
		expect(m.y).toBeCloseTo(0);
		expect(izdus(-90, 0, 0).y).toBeCloseTo(1);
		expect(izdus(90, 0, 0).y).toBeCloseTo(-1);
	});

	it('negatif eğim güney kutbunu öne ve ekranın alt yarısına getirir', () => {
		const k = izdus(-90, 0, -25);
		expect(k.gorunur).toBe(true);
		expect(k.y).toBeGreaterThan(0.85);
		expect(izdus(90, 0, -25).gorunur).toBe(false);
	});

	it('kayma meridyenleri döndürür, kutup yerinde kalır', () => {
		const a = kafes(100, 100, 80, -25, 30, 0);
		const b = kafes(100, 100, 80, -25, 30, 10);
		expect(b.meridyenler[0]).not.toBe(a.meridyenler[0]);
		expect(b.kutup.x).toBeCloseTo(a.kutup.x);
		expect(b.kutup.y).toBeCloseTo(a.kutup.y);
		// 30° adımlı kafes 30° dönünce kendisiyle çakışır.
		expect(kafes(100, 100, 80, -25, 30, 30).meridyenler).toEqual(expect.arrayContaining([a.meridyenler[1]]));
	});

	it('kafes görünen yolları ve kutbu verir', () => {
		const k = kafes(100, 100, 80, -25);
		expect(k.meridyenler).toHaveLength(12);
		expect(k.paraleller).toHaveLength(5);
		expect(k.kutup.y).toBeGreaterThan(160);
		for (const d of [...k.meridyenler, ...k.paraleller]) expect(d.startsWith('M')).toBe(true);
	});
});
