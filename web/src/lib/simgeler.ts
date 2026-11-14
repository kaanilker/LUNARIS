// Her sayfanın menü ve sayfa başı simgesi; iki yerde aynı simge kullanılsın diye tek yerde.
import House from '@lucide/svelte/icons/house';
import Route from '@lucide/svelte/icons/route';
import ChartScatter from '@lucide/svelte/icons/chart-scatter';
import MapPin from '@lucide/svelte/icons/map-pin';
import Columns2 from '@lucide/svelte/icons/columns-2';
import Rocket from '@lucide/svelte/icons/rocket';
import Info from '@lucide/svelte/icons/info';
import type { Sayfa } from './sayfalar';

export const SAYFA_SIMGESI: Record<Sayfa, typeof House> = {
	ana: House,
	planla: Route,
	uzman: ChartScatter,
	site: MapPin,
	karsilastir: Columns2,
	gorevler: Rocket,
	hakkinda: Info
};
