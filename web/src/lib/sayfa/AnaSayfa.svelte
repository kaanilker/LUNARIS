<!-- Ana Sayfa (docs/sayfalar.md §1, docs/animasyonlar.md "Ana Sayfa"). -->
<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import CirclePlay from '@lucide/svelte/icons/circle-play';
	import Telescope from '@lucide/svelte/icons/telescope';
	import { ceviri } from '$lib/i18n/baglam';
	import { adres } from '$lib/sayfalar';
	import { tur } from '$lib/tur.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';
	import Rozet from '$lib/bilesenler/Rozet.svelte';
	import AiYorum from '$lib/bilesenler/AiYorum.svelte';
	import Gosterge from '$lib/bilesenler/Gosterge.svelte';
	import KureCizim from '$lib/cizim/KureCizim.svelte';

	const c = ceviri();
	const ANLATI = [
		{ anahtar: 'anlati_1', sahne: 'A3' },
		{ anahtar: 'anlati_2', sahne: 'A4' },
		{ anahtar: 'anlati_3', sahne: 'A5' },
		{ anahtar: 'anlati_4', sahne: 'A6' }
	];
</script>

<svelte:head>
	<title>{c.t('marka.ad')} · {c.t('ana.soru')}</title>
	<meta name="description" content={c.t('meta.ana')} />
</svelte:head>

<div class="kap grid grid-cols-12 gap-6 pt-6 sm:pt-8" data-izgara>
	<!-- Giriş paneli -->
	<section
		data-panel
		class="col-span-12 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-kart border border-cizgi bg-yuzey bg-linear-to-br from-vurgu/10 via-yuzey to-yuzey p-6 sm:p-10 lg:grid-cols-12 lg:gap-6 lg:p-12"
	>
		<div class="flex flex-col gap-6 lg:col-span-7">
			<p class="inline-flex w-fit items-center gap-2 rounded-full border border-cizgi bg-zemin/50 px-3 py-1 text-xs font-medium text-metin-ikincil">
				<Telescope class="size-3.5 text-vurgu" aria-hidden="true" />{c.t('ana.ust')}
			</p>
			<h1 class="text-4xl leading-[1.05] font-semibold tracking-tight text-metin sm:text-5xl lg:text-6xl">
				{c.t('ana.soru')}
			</h1>
			<p class="max-w-xl text-lg text-metin-ikincil">{c.t('ana.alt')}</p>
			<div class="flex flex-wrap gap-3">
				<a class="dugme-birincil h-11 px-5" href={adres(c.dil, 'planla')}>
					{c.t('ana.planla')}<ArrowRight class="size-4" aria-hidden="true" />
				</a>
				<button class="dugme-ikincil h-11 px-5" onclick={() => (tur.notAcik = true)}>
					<CirclePlay class="size-4" aria-hidden="true" />{c.t('tur.baslat')}
				</button>
			</div>
		</div>
		<figure class="flex flex-col items-center gap-4 lg:col-span-5" aria-label={c.t('ana.sahne')}>
			<KureCizim kutupEtiketi={c.t('ana.kutup_isaret')} />
			<figcaption class="flex max-w-sm flex-col items-center gap-2 text-center">
				<Rozet tur="yer">{c.t('yer_tutucu.etiket')} · A1</Rozet>
				<span class="text-xs text-metin-ikincil">{c.t('ana.sahne_not')}</span>
			</figcaption>
		</figure>
	</section>

	<!-- Güney kutbu şu an -->
	<header class="col-span-12 mt-10 flex flex-col gap-1">
		<h2 class="text-2xl font-semibold text-metin">{c.t('ana.kutup_baslik')}</h2>
		<p class="text-sm text-metin-ikincil">{c.t('ana.kutup_alt')}</p>
	</header>
	<Gosterge sinif="col-span-12 md:col-span-4" etiket={c.t('ana.gosterge_enerji')} formul="S.6 · E" anlam="gunes" />
	<Gosterge sinif="col-span-12 md:col-span-4" etiket={c.t('ana.gosterge_inis')} formul="S.6 · U" />
	<Gosterge sinif="col-span-12 md:col-span-4" etiket={c.t('ana.gosterge_dunya')} formul="S.6 · V" anlam="dunya" />
	<div class="col-span-12">
		<YerTutucu satir metin={c.t('ana.gosterge_bekliyor')} girdi="B19 · S.6 · B3" />
	</div>
	<AiYorum sinif="col-span-12" />

	<!-- Kısa anlatı -->
	<header class="col-span-12 mt-10">
		<h2 class="text-2xl font-semibold text-metin">{c.t('ana.anlati_baslik')}</h2>
	</header>
	{#each ANLATI as bolum, i (bolum.anahtar)}
		<article data-panel class="col-span-12 flex flex-col gap-4 rounded-kart border border-cizgi bg-yuzey p-5 md:col-span-6 xl:col-span-3">
			<span class="grid size-8 place-items-center rounded-kutu bg-yuzey-2 font-kod text-xs text-metin-ikincil">0{i + 1}</span>
			<h3 class="text-lg leading-snug font-semibold text-metin">{c.t(`ana.${bolum.anahtar}`)}</h3>
			<YerTutucu metin={c.t('ana.anlati_bekliyor')} girdi={`B17 · ${bolum.sahne}`} sinif="min-h-44" />
		</article>
	{/each}
</div>
