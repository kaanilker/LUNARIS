// Tel kafes küre için ortografik izdüşüm. Yalnız geometri çizer: ışık ve evre yok, çünkü evre gerçek Güneş
// konumundan hesaplanacak (A1, docs/animasyonlar.md). Saf işlev; kure.test.ts.

const RAD = Math.PI / 180;

export type Nokta = { x: number; y: number; gorunur: boolean };

/**
 * Enlem ve boylamı (derece) ekrana izdüşürür. egim < 0 güney kutbunu izleyiciye çevirir.
 * Ekran ekseni: x sağa, y aşağı; merkez (0, 0), yarıçap 1.
 */
export function izdus(enlem: number, boylam: number, egim: number): Nokta {
	const e = enlem * RAD;
	const b = boylam * RAD;
	const t = egim * RAD;
	const x = Math.cos(e) * Math.sin(b);
	const y = Math.sin(e);
	const z = Math.cos(e) * Math.cos(b);
	const y2 = y * Math.cos(t) - z * Math.sin(t);
	const z2 = y * Math.sin(t) + z * Math.cos(t);
	return { x, y: -y2, gorunur: z2 >= -1e-9 };
}

/** Görünen kısımları SVG yol verisi olarak döndürür; arka yüze geçen parça yeni alt yol başlatır. */
function yol(noktalar: Nokta[], cx: number, cy: number, r: number): string {
	let d = '';
	let acik = false;
	for (const n of noktalar) {
		if (!n.gorunur) {
			acik = false;
			continue;
		}
		const komut = acik ? 'L' : 'M';
		d += `${komut}${(cx + n.x * r).toFixed(2)} ${(cy + n.y * r).toFixed(2)}`;
		acik = true;
	}
	return d;
}

export type Kafes = { paraleller: string[]; meridyenler: string[]; kutup: { x: number; y: number } };

export function kafes(cx: number, cy: number, r: number, egim: number, adim = 30): Kafes {
	const ornek = Array.from({ length: 121 }, (_, i) => i * 3);
	const paraleller: string[] = [];
	for (let enlem = -60; enlem <= 60; enlem += adim) {
		paraleller.push(yol(ornek.map((b) => izdus(enlem, b, egim)), cx, cy, r));
	}
	const meridyenler: string[] = [];
	const enlemler = Array.from({ length: 61 }, (_, i) => -90 + i * 3);
	for (let boylam = 0; boylam < 360; boylam += adim) {
		meridyenler.push(yol(enlemler.map((e) => izdus(e, boylam, egim)), cx, cy, r));
	}
	const k = izdus(-90, 0, egim);
	return { paraleller, meridyenler, kutup: { x: cx + k.x * r, y: cy + k.y * r } };
}
