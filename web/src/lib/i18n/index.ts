// Kullanıcıya görünen bütün metin tr.json ve en.json'dadır; kodda düz metin yazılmaz (CLAUDE.md).
import tr from './tr.json';
import en from './en.json';
import type { Dil } from '$lib/sayfalar';

type Agac = { [anahtar: string]: string | Agac };

const SOZLUKLER: Record<Dil, Agac> = { tr, en };

function bul(agac: Agac, anahtar: string): string | undefined {
	let dugum: string | Agac | undefined = agac;
	for (const parca of anahtar.split('.')) {
		if (typeof dugum !== 'object') return undefined;
		dugum = dugum[parca];
	}
	return typeof dugum === 'string' ? dugum : undefined;
}

/** Noktalı anahtardan metin. Eksik anahtar sessiz geçmez: anahtarın kendisi görünür ve uyarı düşer. */
export function cevirmen(dil: Dil) {
	return (anahtar: string): string => {
		const metin = bul(SOZLUKLER[dil], anahtar);
		if (metin === undefined) {
			console.warn(`[i18n] eksik anahtar (${dil}): ${anahtar}`);
			return anahtar;
		}
		return metin;
	};
}

/** Testler için: sözlükteki bütün yaprak anahtarlar. */
export function anahtarlar(dil: Dil): string[] {
	const sonuc: string[] = [];
	const gez = (agac: Agac, onek: string) => {
		for (const [k, v] of Object.entries(agac)) {
			const tam = onek ? `${onek}.${k}` : k;
			if (typeof v === 'string') sonuc.push(tam);
			else gez(v, tam);
		}
	};
	gez(SOZLUKLER[dil], '');
	return sonuc.sort();
}
