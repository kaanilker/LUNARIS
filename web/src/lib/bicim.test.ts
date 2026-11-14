import { describe, expect, it } from 'vitest';
import { koordinat } from './bicim';

const TR = { kuzey: 'K', guney: 'G', dogu: 'D', bati: 'B' };
const EN = { kuzey: 'N', guney: 'S', dogu: 'E', bati: 'W' };

describe('koordinat', () => {
	it('dilin ondalık ayırıcısı ve yön harfi', () => {
		expect(koordinat(-69.373, 32.319, 'tr', TR)).toBe('69,373°G 32,319°D');
		expect(koordinat(-69.373, 32.319, 'en', EN)).toBe('69.373°S 32.319°E');
		expect(koordinat(-86.8, -22.9, 'en', EN)).toBe('86.8°S 22.9°W');
	});
});
