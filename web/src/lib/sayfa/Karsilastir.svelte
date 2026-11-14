<!-- Karşılaştır (docs/sayfalar.md §5). Bileşenler Site Detay ile ortak olacak; şimdilik iki boş yuva. -->
<script lang="ts">
	import Scale from '@lucide/svelte/icons/scale';
	import { ceviri } from '$lib/i18n/baglam';
	import { SAYFA_SIMGESI } from '$lib/simgeler';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import Panel from '$lib/bilesenler/Panel.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';

	const c = ceviri();
	const METRIKLER = ['sutun_gunes', 'sutun_iletisim', 'sutun_karanlik'];
</script>

<SayfaBasi sayfa="karsilastir" simge={SAYFA_SIMGESI.karsilastir} baslik={c.t('karsilastir.baslik')} giris={c.t('karsilastir.giris')} />

<div class="kap grid grid-cols-12 gap-6" data-izgara>
	{#each ['A', 'B'] as taraf (taraf)}
		<Panel baslik={c.t('karsilastir.secim')} bekliyor sinif="col-span-12 md:col-span-6">
			{#snippet sag()}
				<span class="grid size-8 place-items-center rounded-kutu bg-yuzey-2 font-baslik text-sm font-semibold text-metin">{taraf}</span>
			{/snippet}
			<YerTutucu metin={c.t('karsilastir.secim_bekliyor')} girdi="K1" sinif="min-h-64" />
		</Panel>
	{/each}

	<Panel baslik={c.t('karsilastir.ozet')} simge={Scale} bekliyor sinif="col-span-12">
		<p class="-mt-2 text-sm text-metin-ikincil">{c.t('karsilastir.ozet_metin')}</p>
		<div class="overflow-x-auto rounded-kutu border border-cizgi">
			<table class="text-sm">
				<thead class="bg-yuzey-2 text-left text-xs text-metin-ikincil">
					<tr>
						<th class="px-4 py-3 font-medium">{c.t('karsilastir.sutun_metrik')}</th>
						<th class="px-4 py-3 font-medium">A</th>
						<th class="px-4 py-3 font-medium">B</th>
						<th class="px-4 py-3 font-medium">{c.t('karsilastir.sutun_fark')}</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-cizgi">
					{#each METRIKLER as m (m)}
						<tr>
							<td class="px-4 py-3 text-metin">{c.t(`planla.${m}`)}</td>
							<td class="px-4 py-3 text-metin-ikincil">—</td>
							<td class="px-4 py-3 text-metin-ikincil">—</td>
							<td class="px-4 py-3 text-metin-ikincil">—</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<YerTutucu satir metin={c.t('karsilastir.ozet_bekliyor')} girdi="B9 · 7.1 · K2" />
	</Panel>
</div>
