<!-- Görevler (docs/sayfalar.md §6): yalnız görsel sayfa; küre ve kamera uçuşu G1 animasyon ekibinden. -->
<script lang="ts">
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
	<Panel baslik={c.t('gorevler.kure')} bekliyor sinif="col-span-12 lg:col-span-5 lg:sticky lg:top-24">
		<YerTutucu metin={c.t('gorevler.kure_not')} girdi="G1">
			<KureCizim kutupEtiketi={c.t('ana.kutup_isaret')} />
		</YerTutucu>
	</Panel>

	<Panel baslik={c.t('gorevler.baslik')} bekliyor sinif="col-span-12 lg:col-span-7">
		<YerTutucu satir metin={c.t('gorevler.liste_bekliyor')} girdi="B14" />
		<ul class="flex flex-col divide-y divide-cizgi border-y border-cizgi">
			{#each yuvalar as gorev, i (i)}
				<li class="flex flex-col gap-1 px-4 py-4">
					{#if gorev}
						<h3 class="font-semibold text-metin">{gorev.ad}</h3>
						<p class="text-sm text-metin-ikincil">
							{c.t('gorevler.inis_noktasi')}: <span class="text-metin">{koordinat(gorev.enlem, gorev.boylam, c.dil, yon)}</span>
						</p>
						<p class="text-xs break-all text-metin-ikincil">{c.t('gorevler.kaynak')}: {gorev.kaynak}</p>
					{:else}
						<p class="text-sm text-metin-ikincil">{c.t('gorevler.gorev_bekliyor')}</p>
					{/if}
				</li>
			{/each}
		</ul>
	</Panel>
</div>
