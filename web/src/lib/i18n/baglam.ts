// Etkin dil bileşenlere bağlamla ulaşır; dil değişince getter'lar yeni değeri verir.
import { getContext, setContext } from 'svelte';
import { cevirmen } from './index';
import type { Dil } from '$lib/sayfalar';

const ANAHTAR = Symbol('ceviri');

export type Ceviri = { readonly dil: Dil; readonly t: (anahtar: string) => string };

export function ceviriKur(dilAl: () => Dil): void {
	setContext<Ceviri>(ANAHTAR, {
		get dil() {
			return dilAl();
		},
		get t() {
			return cevirmen(dilAl());
		}
	});
}

export function ceviri(): Ceviri {
	const c = getContext<Ceviri | undefined>(ANAHTAR);
	if (!c) throw new Error('ceviri(): [dil] düzeninin dışında çağrıldı');
	return c;
}
