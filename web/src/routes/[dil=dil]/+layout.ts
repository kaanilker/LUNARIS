import type { Dil } from '$lib/sayfalar';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => ({ dil: params.dil as Dil });
