<!--
	Tek sayılık gösterge kartı (SOLARIS'in parametre kartı düzeni). anlam 'gunes' ya da 'dunya' yalnız o gök
	cismine ait değerde verilir (docs/tasarim.md §2); renk tek başına anlam taşımasın diye simge de değişir.
	deger verilmezse boş değer ve "Yer tutucu" rozeti görünür.
-->
<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Earth from '@lucide/svelte/icons/earth';
	import Crosshair from '@lucide/svelte/icons/crosshair';
	import { ceviri } from '$lib/i18n/baglam';
	import Rozet from './Rozet.svelte';

	let {
		etiket,
		formul,
		deger,
		birim,
		anlam = 'notr',
		sinif = ''
	}: {
		etiket: string;
		/** Parametre setindeki formül numarası (S.6, 0.5); değer değil, kaynağı gösterir. */
		formul?: string;
		deger?: string;
		birim?: string;
		anlam?: 'gunes' | 'dunya' | 'notr';
		sinif?: string;
	} = $props();

	const c = ceviri();
	const SIMGE = { gunes: Sun, dunya: Earth, notr: Crosshair };
	const KUTU = {
		gunes: 'bg-gunes/15 text-gunes',
		dunya: 'bg-dunya/15 text-dunya',
		notr: 'bg-yuzey-2 text-metin-ikincil'
	};
	const Simge = $derived(SIMGE[anlam]);
</script>

<div data-panel class="flex min-w-0 flex-col gap-5 rounded-kart border border-cizgi bg-yuzey p-5 {sinif}">
	<div class="flex items-center justify-between gap-3">
		<span class="grid size-8 place-items-center rounded-kutu {KUTU[anlam]}" aria-hidden="true">
			<Simge class="size-4" />
		</span>
		{#if !deger}<Rozet tur="yer">{c.t('yer_tutucu.etiket')}</Rozet>{/if}
	</div>
	<div class="flex flex-col gap-1">
		<p class="font-baslik text-3xl font-semibold text-metin tabular-nums">
			{deger ?? '—'}{#if deger && birim}<span class="ml-1 text-sm font-normal text-metin-ikincil">{birim}</span>{/if}
		</p>
		<p class="text-sm text-metin">{etiket}</p>
		{#if formul}<p class="font-kod text-xs text-metin-ikincil">{c.t('yer_tutucu.formul')} {formul}</p>{/if}
	</div>
</div>
