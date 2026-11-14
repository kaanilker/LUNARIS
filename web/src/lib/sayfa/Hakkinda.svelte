<!-- Hakkında (docs/sayfalar.md §7). Animasyon yok (docs/animasyonlar.md "Hakkında"). -->
<script lang="ts">
	import Database from '@lucide/svelte/icons/database';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Users from '@lucide/svelte/icons/users';
	import CodeXml from '@lucide/svelte/icons/code-xml';
	import Video from '@lucide/svelte/icons/video';
	import { ceviri } from '$lib/i18n/baglam';
	import { SAYFA_SIMGESI } from '$lib/simgeler';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import Panel from '$lib/bilesenler/Panel.svelte';
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

<SayfaBasi sayfa="hakkinda" simge={SAYFA_SIMGESI.hakkinda} baslik={c.t('hakkinda.baslik')} giris={c.t('hakkinda.giris')} />

<div class="kap grid grid-cols-12 gap-6" data-izgara>
	<header class="col-span-12 flex items-center gap-3">
		<span class="grid size-8 place-items-center rounded-kutu bg-yuzey-2 text-metin-ikincil" aria-hidden="true"><Database class="size-4" /></span>
		<h2 class="text-xl font-semibold text-metin">{c.t('hakkinda.kaynaklar')}</h2>
	</header>
	{#each KAYNAKLAR as k (k.ad)}
		<a
			data-panel
			href={k.url}
			rel="noopener"
			target="_blank"
			class="group col-span-12 flex flex-col gap-2 rounded-kart border border-cizgi bg-yuzey p-5 transition-colors hover:border-cizgi-guclu hover:bg-yuzey-2 md:col-span-6 lg:col-span-4"
		>
			<span class="flex items-center justify-between font-semibold text-metin">
				{k.ad}<ExternalLink class="size-4 text-metin-ikincil group-hover:text-metin" aria-hidden="true" />
			</span>
			<span class="text-sm text-metin-ikincil">{c.t(`hakkinda.${k.anahtar}`)}</span>
		</a>
	{/each}

	<Panel baslik={c.t('hakkinda.yontem')} simge={FlaskConical} bekliyor sinif="col-span-12 md:col-span-6">
		<YerTutucu metin={c.t('hakkinda.yontem_bekliyor')} girdi="B17" sinif="min-h-40" />
	</Panel>
	<Panel baslik={c.t('hakkinda.sinirlamalar')} simge={BookOpen} bekliyor sinif="col-span-12 md:col-span-6">
		<YerTutucu metin={c.t('hakkinda.sinirlamalar_bekliyor')} girdi="B17" sinif="min-h-40" />
	</Panel>

	<Panel baslik={c.t('hakkinda.dogrulama')} simge={ShieldCheck} bekliyor sinif="col-span-12">
		<p class="-mt-2 text-sm text-metin-ikincil">{c.t('hakkinda.dogrulama_metin')}</p>
		<div class="overflow-x-auto rounded-kutu border border-cizgi">
			<table class="text-sm">
				<thead class="bg-yuzey-2 text-left text-xs text-metin-ikincil">
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
		<YerTutucu satir metin={c.t('hakkinda.dogrulama_bekliyor')} girdi="B11 · B12" />
	</Panel>

	<Panel baslik={c.t('hakkinda.ekip')} simge={Users} sinif="col-span-12 md:col-span-6">
		<p class="text-sm leading-relaxed text-metin-ikincil">{c.t('hakkinda.ekip_metin')}</p>
		<a href={REPO} rel="noopener" class="dugme-ikincil w-fit"><CodeXml class="size-4" aria-hidden="true" />{c.t('alt.kaynak')}</a>
	</Panel>
	<Panel baslik={c.t('hakkinda.video')} simge={Video} bekliyor sinif="col-span-12 md:col-span-6">
		<YerTutucu metin={c.t('hakkinda.video_bekliyor')} sinif="min-h-32" />
	</Panel>
</div>
