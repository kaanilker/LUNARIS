<!-- Görevler (docs/sayfalar.md §6): yalnız görsel sayfa; küre ve kamera uçuşu G1 animasyon ekibinden. -->
<script lang="ts">
	import Orbit from '@lucide/svelte/icons/orbit';
	import ListOrdered from '@lucide/svelte/icons/list-ordered';
	import { ceviri } from '$lib/i18n/baglam';
	import { koordinat } from '$lib/bicim';
	import { BILINEN_GOREVLER, GOREV_SAYISI } from '$lib/veri/gorevler';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import Panel from '$lib/bilesenler/Panel.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';
	import KureCizim from '$lib/cizim/KureCizim.svelte';

	const c = ceviri();
	const yon = $derived({
		kuzey: c.t('yon.kuzey'),
		guney: c.t('yon.guney'),
		dogu: c.t('yon.dogu'),
		bati: c.t('yon.bati')
	});
	const yuvalar = Array.from({ length: GOREV_SAYISI }, (_, i) => BILINEN_GOREVLER[i]);
</script>

<SayfaBasi sayfa="gorevler" baslik={c.t('gorevler.baslik')} giris={c.t('gorevler.giris')} />

<div class="kap grid grid-cols-12 items-start gap-6" data-izgara>
	<Panel baslik={c.t('gorevler.kure')} simge={Orbit} bekliyor sinif="col-span-12 lg:col-span-5 lg:sticky lg:top-24">
		<YerTutucu metin={c.t('gorevler.kure_not')} girdi="G1">
			<KureCizim kutupEtiketi={c.t('ana.kutup_isaret')} />
		</YerTutucu>
	</Panel>

	<Panel baslik={c.t('gorevler.baslik')} simge={ListOrdered} bekliyor sinif="col-span-12 lg:col-span-7">
		<YerTutucu satir metin={c.t('gorevler.liste_bekliyor')} girdi="B14" />
		<ol class="flex flex-col divide-y divide-cizgi rounded-kutu border border-cizgi">
			{#each yuvalar as gorev, i (i)}
				<li class="flex items-start gap-4 p-4">
					<span
						class="grid size-8 shrink-0 place-items-center rounded-kutu text-xs {gorev
							? 'bg-yuzey-2 text-metin'
							: 'border border-dashed border-cizgi-guclu text-metin-ikincil'}">{String(i + 1).padStart(2, '0')}</span
					>
					{#if gorev}
						<div class="flex min-w-0 flex-col gap-1">
							<h3 class="font-semibold text-metin">{gorev.ad}</h3>
							<p class="text-sm text-metin-ikincil">
								{c.t('gorevler.inis_noktasi')}: <span class="text-metin tabular-nums">{koordinat(gorev.enlem, gorev.boylam, c.dil, yon)}</span>
							</p>
							<p class="text-xs break-all text-metin-ikincil">{c.t('gorevler.kaynak')}: <span class="tabular-nums">{gorev.kaynak}</span></p>
						</div>
					{:else}
						<p class="self-center text-sm text-metin-ikincil">{c.t('gorevler.gorev_bekliyor')}</p>
					{/if}
				</li>
			{/each}
		</ol>
	</Panel>
</div>
