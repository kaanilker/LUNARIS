// Sayfa listesi ve adresleri: tek doğruluk kaynağı. Sahip belge: docs/sayfalar.md.
// Menü sırası belgedeki sıradır; adres öneki dildir (/tr/, /en/).

export const DILLER = ['tr', 'en'] as const;
export type Dil = (typeof DILLER)[number];
export const VARSAYILAN_DIL: Dil = 'tr';

export function dilMi(deger: string): deger is Dil {
	return (DILLER as readonly string[]).includes(deger);
}

export const SAYFALAR = [
	'ana',
	'planla',
	'uzman',
	'site',
	'karsilastir',
	'gorevler',
	'hakkinda'
] as const;
export type Sayfa = (typeof SAYFALAR)[number];

// Ana sayfanın kendi parçası yok: /tr/ ve /en/.
const PARCALAR: Record<Exclude<Sayfa, 'ana'>, Record<Dil, string>> = {
	planla: { tr: 'planla', en: 'plan' },
	uzman: { tr: 'uzman', en: 'expert' },
	site: { tr: 'site', en: 'site' },
	karsilastir: { tr: 'karsilastir', en: 'compare' },
	gorevler: { tr: 'gorevler', en: 'missions' },
	hakkinda: { tr: 'hakkinda', en: 'about' }
};

/** Sayfanın verilen dildeki adresi. Site Detay için parsel kimliği eklenebilir. */
export function adres(dil: Dil, sayfa: Sayfa, parsel?: string): string {
	if (sayfa === 'ana') return `/${dil}/`;
	const temel = `/${dil}/${PARCALAR[sayfa][dil]}/`;
	if (sayfa === 'site' && parsel) return `${temel}${encodeURIComponent(parsel)}/`;
	return temel;
}

/** Adres parçasından sayfayı bulur; o dilde böyle bir parça yoksa null. */
export function parcadanSayfa(dil: Dil, parca: string): Exclude<Sayfa, 'ana'> | null {
	for (const [sayfa, diller] of Object.entries(PARCALAR)) {
		if (diller[dil] === parca) return sayfa as Exclude<Sayfa, 'ana'>;
	}
	return null;
}

/** Önceden üretilecek bütün [dil]/[sayfa] adresleri. */
export function tumParcalar(): { dil: Dil; sayfa: string }[] {
	return DILLER.flatMap((dil) => Object.values(PARCALAR).map((d) => ({ dil, sayfa: d[dil] })));
}

/** Bir adresin karşı dildeki eşi; dil değiştiricisi bunu kullanır. Sayfa ve parsel korunur. */
export function karsiDilAdresi(yol: string, hedef: Dil): string {
	const parcalar = yol.split('/').filter(Boolean);
	const [dil, parca, parsel] = parcalar;
	if (!dil || !dilMi(dil) || !parca) return adres(hedef, 'ana');
	const sayfa = parcadanSayfa(dil, parca);
	if (!sayfa) return adres(hedef, 'ana');
	return adres(hedef, sayfa, sayfa === 'site' ? parsel && decodeURIComponent(parsel) : undefined);
}
