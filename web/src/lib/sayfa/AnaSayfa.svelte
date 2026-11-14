<!-- Ana Sayfa (docs/sayfalar.md §1, docs/animasyonlar.md "Ana Sayfa", tasarım planı docs/tasarim.md §3). -->
<script lang="ts">
	import CirclePlay from '@lucide/svelte/icons/circle-play';
	import { ceviri } from '$lib/i18n/baglam';
	import { adres } from '$lib/sayfalar';
	import { tur } from '$lib/tur.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';
	import Rozet from '$lib/bilesenler/Rozet.svelte';
	import AiYorum from '$lib/bilesenler/AiYorum.svelte';
	import OkumaSeridi from '$lib/bilesenler/OkumaSeridi.svelte';
	import Bolum from '$lib/bilesenler/Bolum.svelte';
	import KureCizim from '$lib/cizim/KureCizim.svelte';
	import UfukCizgisi from '$lib/cizim/UfukCizgisi.svelte';

	const c = ceviri();
	const ANLATI = [
		{ anahtar: 'anlati_1', sahne: 'A3' },
		{ anahtar: 'anlati_2', sahne: 'A4' },
		{ anahtar: 'anlati_3', sahne: 'A5' },
		{ anahtar: 'anlati_4', sahne: 'A6' }
	];
</script>

<svelte:head>
	<title>{c.t('marka.ad')} | {c.t('ana.soru')}</title>
	<meta name="description" content={c.t('meta.ana')} />
</svelte:head>

<!-- Giriş: kart değil, sayfanın kendisi. Ufuk çizgisi bütün genişliği kaplar. -->
<section class="kap grid grid-cols-12 items-center gap-6 pt-10 sm:pt-16">
	<div class="col-span-12 flex flex-col gap-7 lg:col-span-7">
		<h1 class="text-[2.5rem] leading-[1.02] font-semibold text-metin [font-stretch:108%] sm:text-6xl sm:[font-stretch:125%] xl:text-7xl">
			{c.t('ana.soru')}
		</h1>
		<p class="max-w-xl text-lg leading-relaxed text-metin-ikincil">{c.t('ana.alt')}</p>
		<div class="flex flex-wrap gap-3">
			<a class="dugme-birincil h-11 px-5" href={adres(c.dil, 'planla')}>{c.t('ana.planla')}</a>
			<button class="dugme-ikincil h-11 px-5" onclick={() => (tur.notAcik = true)}>
				<CirclePlay class="size-4" aria-hidden="true" />{c.t('tur.baslat')}
			</button>
		</div>
	</div>
	<figure class="col-span-12 flex flex-col items-center gap-3 lg:col-span-5" aria-label={c.t('ana.sahne')}>
		<KureCizim kutupEtiketi={c.t('ana.kutup_isaret')} />
		<figcaption class="flex max-w-xs flex-col items-center gap-2 text-center text-xs text-metin-ikincil">
			<Rozet tur="yer">{c.t('yer_tutucu.etiket')}</Rozet>
			<span>{c.t('ana.sahne_not')}</span>
		</figcaption>
	</figure>
	<div class="col-span-12 mt-6 flex flex-col gap-2">
		<UfukCizgisi buyuk />
		<p class="text-xs text-metin-ikincil">{c.t('ufuk.etiket')}</p>
	</div>
</section>

<div class="kap mt-16 grid grid-cols-12 gap-y-16">
	<Bolum baslik={c.t('ana.kutup_baslik')} aciklama={c.t('ana.kutup_alt')}>
		<OkumaSeridi
			sinif="col-span-12"
			olcumler={[
				{ etiket: c.t('ana.gosterge_enerji'), formul: 'S.6, E', anlam: 'gunes' },
				{ etiket: c.t('ana.gosterge_inis'), formul: 'S.6, U' },
				{ etiket: c.t('ana.gosterge_dunya'), formul: 'S.6, V', anlam: 'dunya' }
			]}
		/>
		<div class="col-span-12">
			<YerTutucu satir metin={c.t('ana.gosterge_bekliyor')} girdi="B19, S.6, B3" />
		</div>
		<AiYorum sinif="col-span-12" />
	</Bolum>

	<Bolum baslik={c.t('ana.anlati_baslik')}>
		<ol class="col-span-12 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
			{#each ANLATI as bolum, i (bolum.anahtar)}
				<li class="flex flex-col gap-4">
					<h3 class="flex items-baseline gap-3 text-lg leading-snug font-semibold text-metin">
						<span class="text-metin-ikincil tabular-nums">{i + 1}</span>{c.t(`ana.${bolum.anahtar}`)}
					</h3>
					<YerTutucu metin={c.t('ana.anlati_bekliyor')} girdi={`B17, ${bolum.sahne}`} cerceve sinif="min-h-48" />
				</li>
			{/each}
		</ol>
	</Bolum>
</div>
