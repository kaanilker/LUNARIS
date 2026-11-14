// Sayı ve koordinat biçimleri. Saf işlevler; arayüzden ayrı test edilir.
import type { Dil } from '$lib/sayfalar';

export type YonHarfleri = { kuzey: string; guney: string; dogu: string; bati: string };

/** Enlem güneyde, boylam batıda negatif verilir; çıktı dilin ondalık ayırıcısını ve yön harflerini kullanır. */
export function koordinat(enlem: number, boylam: number, dil: Dil, yon: YonHarfleri): string {
	const sayi = new Intl.NumberFormat(dil, { maximumFractionDigits: 4 });
	const e = `${sayi.format(Math.abs(enlem))}°${enlem < 0 ? yon.guney : yon.kuzey}`;
	const b = `${sayi.format(Math.abs(boylam))}°${boylam < 0 ? yon.bati : yon.dogu}`;
	return `${e} ${b}`;
}
