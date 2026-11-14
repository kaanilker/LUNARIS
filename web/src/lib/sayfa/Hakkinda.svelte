<!-- Hakkında (docs/sayfalar.md §7). Animasyon yok (docs/animasyonlar.md "Hakkında"). Teknik rapor düzeni. -->
<script lang="ts">
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import CodeXml from '@lucide/svelte/icons/code-xml';
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import Bolum from '$lib/bilesenler/Bolum.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';

	const c = ceviri();
	const REPO = 'https://github.com/kaanilker/LUNARIS';

	const KAYNAKLAR = [
		{ ad: 'NASA SPICE', url: 'https://naif.jpl.nasa.gov/naif/', anahtar: 'kaynak_spice' },
		{ ad: 'LRO LOLA', url: 'https://pds-geosciences.wustl.edu/missions/lro/lola.htm', anahtar: 'kaynak_lola' },
		{ ad: 'JPL Horizons', url: 'https://ssd.jpl.nasa.gov/horizons/', anahtar: 'kaynak_horizons' },
		{ ad: 'Quickmap', url: 'https://quickmap.lroc.asu.edu/', anahtar: 'kaynak_quickmap' },
		{ ad: 'Moon Trek', url: 'https://trek.nasa.gov/moon/', anahtar: 'kaynak_moontrek' },
		{
			ad: 'CSA Moon Exploration',
			url: 'https://www.asc-csa.gc.ca/eng/astronomy/moon-exploration/',
			anahtar: 'kaynak_csa'
		}
	];

	// Doğrulama zincirinin halkaları: docs/mimari.md §9.1.
	const HALKALAR = ['gok', 'ufuk', 'gozlem', 'inis'];
</script>

<SayfaBasi sayfa="hakkinda" baslik={c.t('hakkinda.baslik')} giris={c.t('hakkinda.giris')} />

<div class="kap grid grid-cols-12 gap-y-16">
	<Bolum baslik={c.t('hakkinda.kaynaklar')}>
		<ul class="col-span-12 divide-y divide-cizgi border-y border-cizgi">
			{#each KAYNAKLAR as k (k.ad)}
				<li>
					<a
						href={k.url}
						rel="noopener"
						target="_blank"
						class="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 py-4 transition-colors hover:bg-yuzey"
					>
						<span class="col-span-12 flex items-center gap-2 font-semibold text-metin sm:col-span-4">
							{k.ad}<ExternalLink
								class="size-3.5 text-metin-ikincil transition-transform duration-200 ease-egri group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-metin"
								aria-hidden="true"
							/>
						</span>
						<span class="col-span-12 text-sm text-metin-ikincil sm:col-span-8">{c.t(`hakkinda.${k.anahtar}`)}</span>
					</a>
				</li>
			{/each}
		</ul>
	</Bolum>

	<Bolum baslik={c.t('hakkinda.yontem')}>
		<div class="col-span-12"><YerTutucu metin={c.t('hakkinda.yontem_bekliyor')} girdi="B17" cerceve sinif="min-h-36" /></div>
	</Bolum>

	<Bolum baslik={c.t('hakkinda.dogrulama')} aciklama={c.t('hakkinda.dogrulama_metin')}>
		<div class="col-span-12 overflow-x-auto rounded-kutu border border-cizgi" data-panel>
			<table class="text-sm">
				<thead class="bg-yuzey text-left text-xs text-metin-ikincil">
					<tr>
						<th class="px-4 py-3 font-medium">{c.t('hakkinda.sutun_ne')}</th>
						<th class="px-4 py-3 font-medium">{c.t('hakkinda.sutun_karsi')}</th>
						<th class="px-4 py-3 font-medium">{c.t('hakkinda.sutun_fark')}</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-cizgi">
					{#each HALKALAR as h (h)}
						<tr>
							<td class="px-4 py-3 text-metin">{c.t(`hakkinda.halka_${h}`)}</td>
							<td class="px-4 py-3 text-metin-ikincil">{c.t(`hakkinda.halka_${h}_karsi`)}</td>
							<td class="px-4 py-3 text-metin-ikincil">—</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="col-span-12"><YerTutucu satir metin={c.t('hakkinda.dogrulama_bekliyor')} girdi="B11, B12" /></div>
	</Bolum>

	<Bolum baslik={c.t('hakkinda.sinirlamalar')}>
		<div class="col-span-12"><YerTutucu metin={c.t('hakkinda.sinirlamalar_bekliyor')} girdi="B17" cerceve sinif="min-h-36" /></div>
	</Bolum>

	<Bolum baslik={c.t('hakkinda.ekip')}>
		<div class="col-span-12 flex flex-col items-start gap-5">
			<p class="max-w-2xl leading-relaxed text-metin-ikincil">{c.t('hakkinda.ekip_metin')}</p>
			<a href={REPO} rel="noopener" class="dugme-ikincil"><CodeXml class="size-4" aria-hidden="true" />{c.t('alt.kaynak')}</a>
		</div>
	</Bolum>

	<Bolum baslik={c.t('hakkinda.video')}>
		<div class="col-span-12"><YerTutucu metin={c.t('hakkinda.video_bekliyor')} cerceve sinif="min-h-32" /></div>
	</Bolum>
</div>
