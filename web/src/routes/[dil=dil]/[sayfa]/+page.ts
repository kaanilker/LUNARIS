import { error } from '@sveltejs/kit';
import { parcadanSayfa, tumParcalar, type Dil } from '$lib/sayfalar';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => tumParcalar();

export const load: PageLoad = ({ params }) => {
	const sayfa = parcadanSayfa(params.dil as Dil, params.sayfa);
	if (!sayfa) error(404);
	return { sayfa };
};
