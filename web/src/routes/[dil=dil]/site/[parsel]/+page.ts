import type { PageLoad } from './$types';

// Parsel kimlikleri parsel ağıyla gelecek (B4); o zamana dek bu sayfa 200.html yedeğiyle istemcide açılır.
export const prerender = false;

export const load: PageLoad = ({ params }) => ({ parsel: params.parsel });
