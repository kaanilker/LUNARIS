<!--
	Site Detay (docs/sayfalar.md §4, animasyonlar S1–S6). Panorama 2B SVG (KARAR, ajan).
	Şimdilik yalnız çerçeve: azimut ekseni ve yön harfleri. Silüet ve izler veri hattından gelecek.
-->
<script lang="ts">
	import Mountain from '@lucide/svelte/icons/mountain';
	import Clock from '@lucide/svelte/icons/clock';
	import Camera from '@lucide/svelte/icons/camera';
	import Crosshair from '@lucide/svelte/icons/crosshair';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import SkipBack from '@lucide/svelte/icons/skip-back';
	import SkipForward from '@lucide/svelte/icons/skip-forward';
	import Play from '@lucide/svelte/icons/play';
	import Plus from '@lucide/svelte/icons/plus';
	import Printer from '@lucide/svelte/icons/printer';
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import Panel from '$lib/bilesenler/Panel.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';
	import Gosterge from '$lib/bilesenler/Gosterge.svelte';

	let { parsel }: { parsel?: string } = $props();
	const c = ceviri();

	const GENISLIK = 720;
	const YONLER = [
		{ az: 0, anahtar: 'kuzey' },
		{ az: 90, anahtar: 'dogu' },
		{ az: 180, anahtar: 'guney' },
		{ az: 270, anahtar: 'bati' },
		{ az: 360, anahtar: 'kuzey' }
	];
	const x = (az: number) => (az / 360) * GENISLIK;

	// Dış araçların ana adresleri. Konum ve tarihle açma biçimi doğrulanınca eklenecek (docs/mimari.md §11).
	const DIS_ARACLAR = [
		{ ad: 'JPL Horizons', url: 'https://ssd.jpl.nasa.gov/horizons/' },
		{ ad: 'Quickmap', url: 'https://quickmap.lroc.asu.edu/' },
		{ ad: 'Moon Trek', url: 'https://trek.nasa.gov/moon/' }
	];
</script>

<SayfaBasi
	sayfa="site"
	baslik={parsel ? `${c.t('site.parsel')} ${parsel}` : c.t('site.baslik')}
	giris={parsel ? c.t('site.baslik') : `${c.t('site.parsel_yok')}. ${c.t('site.parsel_yok_metin')}`}
/>

<div class="kap grid grid-cols-12 items-start gap-6" data-izgara>
	<Panel baslik={c.t('site.panorama')} simge={Mountain} bekliyor sinif="col-span-12">
		{#snippet sag()}
			<ul class="flex items-center gap-4 text-xs text-metin-ikincil">
				<li class="flex items-center gap-2"><span class="w-5 border-t-2 border-gunes"></span>{c.t('site.gunes_izi')}</li>
				<!-- Dünya izi kesikli: iki iz renk dışında da ayırt edilir (docs/tasarim.md §2). -->
				<li class="flex items-center gap-2"><span class="w-5 border-t-2 border-dashed border-dunya"></span>{c.t('site.dunya_izi')}</li>
			</ul>
		{/snippet}
		<div class="relative rounded-kutu border border-cizgi bg-zemin/40 px-4 pt-4 pb-8">
			<svg viewBox={`0 0 ${GENISLIK} 140`} preserveAspectRatio="none" class="h-48 w-full" aria-hidden="true">
				{#each [35, 70] as y (y)}
					<line x1="0" y1={y} x2={GENISLIK} y2={y} class="stroke-cizgi" stroke-dasharray="2 6" />
				{/each}
				<line x1="0" y1="110" x2={GENISLIK} y2="110" class="stroke-cizgi-guclu" />
				{#each { length: 13 }, i (i)}
					<line x1={x(i * 30)} y1="110" x2={x(i * 30)} y2={i % 3 === 0 ? 120 : 116} class="stroke-cizgi-guclu" />
				{/each}
			</svg>
			<ol class="absolute inset-x-4 bottom-2 h-5 text-xs text-metin-ikincil" aria-hidden="true">
				{#each YONLER as y, i (i)}
					<li class="absolute -translate-x-1/2" style:left={`${(y.az / 360) * 100}%`}>{c.t(`yon.${y.anahtar}`)}</li>
				{/each}
			</ol>
		</div>
		<YerTutucu satir metin={c.t('site.panorama_not')} girdi="B2, B6, 0.3, 0.1, 0.4, S1" />
	</Panel>

	<Gosterge sinif="col-span-12 md:col-span-4" etiket={c.t('site.gun_batimi')} formul="0.5" anlam="gunes" />
	<Gosterge sinif="col-span-12 md:col-span-4" etiket={c.t('site.dunya_batimi')} formul="0.5" anlam="dunya" />
	<Gosterge sinif="col-span-12 md:col-span-4" etiket={c.t('site.iletisim')} formul="S.5" anlam="dunya" />

	<Panel baslik={c.t('site.cizelge')} simge={Clock} bekliyor sinif="col-span-12">
		<p class="-mt-2 text-sm text-metin-ikincil">{c.t('site.cizelge_metin')}</p>
		<YerTutucu metin={c.t('site.oynatici_bekliyor')} girdi="S.3, S.4, S.5, S3" sinif="min-h-32" />
		<div class="flex flex-wrap items-center gap-3" role="group" aria-label={c.t('site.oynatici')}>
			<button class="dugme-ikincil w-10 px-0" disabled aria-label={c.t('site.geri')}><SkipBack class="size-4" /></button>
			<button class="dugme-ikincil" disabled><Play class="size-4" aria-hidden="true" />{c.t('site.oynat')}</button>
			<button class="dugme-ikincil w-10 px-0" disabled aria-label={c.t('site.ileri')}><SkipForward class="size-4" /></button>
			<input class="min-w-40 flex-1" type="range" disabled aria-label={c.t('site.oynatici')} />
		</div>
	</Panel>

	<Panel baslik={c.t('site.astronot')} simge={Camera} bekliyor sinif="col-span-12 lg:col-span-8">
		<YerTutucu metin={c.t('site.astronot_not')} girdi="S4" sinif="min-h-80" />
	</Panel>

	<div class="col-span-12 flex flex-col gap-6 lg:col-span-4">
		<Panel baslik={c.t('site.koordinat')} simge={Crosshair}>
			<form class="grid grid-cols-2 gap-3" onsubmit={(e) => e.preventDefault()}>
				<label class="flex flex-col gap-2 text-sm font-medium"
					>{c.t('site.enlem')}<input inputmode="decimal" disabled /></label
				>
				<label class="flex flex-col gap-2 text-sm font-medium"
					>{c.t('site.boylam')}<input inputmode="decimal" disabled /></label
				>
				<button class="dugme-birincil col-span-2" disabled>{c.t('site.hesapla')}</button>
			</form>
			<YerTutucu satir metin={c.t('site.koordinat_not')} girdi="S.1, S.9" />
		</Panel>

		<Panel baslik={c.t('site.dis')} simge={ExternalLink}>
			<ul class="flex flex-col divide-y divide-cizgi rounded-kutu border border-cizgi">
				{#each DIS_ARACLAR as arac (arac.ad)}
					<li>
						<a
							href={arac.url}
							rel="noopener"
							target="_blank"
							class="flex h-11 items-center justify-between px-4 text-sm text-metin transition-colors hover:bg-yuzey-2"
						>
							{arac.ad}<ExternalLink class="size-3.5 text-metin-ikincil" aria-hidden="true" />
						</a>
					</li>
				{/each}
			</ul>
			<YerTutucu satir metin={c.t('site.dis_not')} />
			<div class="grid grid-cols-2 gap-3">
				<button class="dugme-ikincil" disabled><Plus class="size-4" aria-hidden="true" />{c.t('site.karsilastira_ekle')}</button>
				<button class="dugme-ikincil" onclick={() => window.print()}
					><Printer class="size-4" aria-hidden="true" />{c.t('site.rapor')}</button
				>
			</div>
		</Panel>
	</div>
</div>
