// Görevler sayfasının iniş noktaları. Tek kaynak: docs/LUNARIS_bilim_parametre_seti.md §10
// ("Diğer görev noktaları"). Listenin tamamı, ülke, tarih ve sonuç bilim ekibinden gelecek (B14);
// gelene kadar kalan yerler boş kalır, uydurulmaz.

export type Gorev = {
	ad: string;
	/** Derece; güney negatif. */
	enlem: number;
	/** Derece; batı negatif. */
	boylam: number;
	kaynak: string;
};

export const GOREV_SAYISI = 10;

export const BILINEN_GOREVLER: Gorev[] = [
	{ ad: 'Chandrayaan-3', enlem: -69.373, boylam: 32.319, kaynak: 'LUNARIS_bilim_parametre_seti.md §10 [17]' },
	{ ad: 'IM-1 Odysseus', enlem: -80.297, boylam: 1.2613, kaynak: 'NASA/TM-20250010290' }
];
