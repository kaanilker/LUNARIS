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

	it('kafes görünen yolları ve kutbu verir', () => {
		const k = kafes(100, 100, 80, -25);
		expect(k.meridyenler).toHaveLength(12);
		expect(k.paraleller).toHaveLength(5);
		expect(k.kutup.y).toBeGreaterThan(160);
		for (const d of [...k.meridyenler, ...k.paraleller]) expect(d.startsWith('M')).toBe(true);
	});
});
