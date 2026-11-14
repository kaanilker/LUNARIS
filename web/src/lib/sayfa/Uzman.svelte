<!--
	Uzman Analiz (docs/sayfalar.md §3). Her bölümün formül numarası parametre setinden (§11).
	Yerleşim: geniş grafikler 8 sütun, yanındaki araçlar 4 sütun; satırlar 12'ye tamamlanır.
-->
<script lang="ts">
	import SlidersHorizontal from '@lucide/svelte/icons/sliders-horizontal';
	import ChartScatter from '@lucide/svelte/icons/chart-scatter';
	import BatteryMedium from '@lucide/svelte/icons/battery-medium';
	import SatelliteDish from '@lucide/svelte/icons/satellite-dish';
	import Crosshair from '@lucide/svelte/icons/crosshair';
	import Layers from '@lucide/svelte/icons/layers';
	import CalendarRange from '@lucide/svelte/icons/calendar-range';
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import Panel from '$lib/bilesenler/Panel.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';

	const c = ceviri();
	const BOLUMLER = [
		{ anahtar: 'pareto', simge: ChartScatter, girdi: 'S.8, U1', sinif: 'lg:col-span-8', yukseklik: 'min-h-72' },
		{ anahtar: 'suzgec', simge: SlidersHorizontal, girdi: 'M1–M4, M7', sinif: 'lg:col-span-4', yukseklik: 'min-h-72' },
		{ anahtar: 'batarya', simge: BatteryMedium, girdi: 'B10, 2.3, 3.1, U3', sinif: 'md:col-span-6 lg:col-span-4', yukseklik: 'min-h-48' },
		{ anahtar: 'dsn', simge: SatelliteDish, girdi: 'B8, S.5, 4.3', sinif: 'md:col-span-6 lg:col-span-4', yukseklik: 'min-h-48' },
		{ anahtar: 'belirsizlik', simge: Crosshair, girdi: 'B15, 1.2', sinif: 'lg:col-span-4', yukseklik: 'min-h-48' },
		{ anahtar: 'aylik', simge: CalendarRange, girdi: 'S.4, U2', sinif: 'lg:col-span-8', yukseklik: 'min-h-56' },
		{ anahtar: 'benzer', simge: Layers, girdi: 'B16, 7.2', sinif: 'lg:col-span-4', yukseklik: 'min-h-56' }
	];
</script>

<SayfaBasi sayfa="uzman" baslik={c.t('uzman.baslik')} giris={c.t('uzman.giris')} />

<div class="kap grid grid-cols-12 gap-6" data-izgara>
	{#each BOLUMLER as b (b.anahtar)}
		<Panel baslik={c.t(`uzman.${b.anahtar}`)} simge={b.simge} bekliyor sinif="col-span-12 {b.sinif}">
			<p class="-mt-2 text-sm text-metin-ikincil">{c.t(`uzman.${b.anahtar}_metin`)}</p>
			<YerTutucu metin={c.t('uzman.bekliyor')} girdi={b.girdi} sinif={b.yukseklik} />
		</Panel>
	{/each}
</div>
