import type { Handle } from '@sveltejs/kit';
import { VARSAYILAN_DIL, dilMi } from '$lib/sayfalar';

// <html lang> önceden üretilen her sayfada adresteki dile göre yazılır (app.html: %dil%).
export const handle: Handle = ({ event, resolve }) => {
	const ilk = event.url.pathname.split('/')[1] ?? '';
	const dil = dilMi(ilk) ? ilk : VARSAYILAN_DIL;
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%dil%', dil) });
};
