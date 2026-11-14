<!-- Ana Sayfa (docs/sayfalar.md §1, docs/animasyonlar.md "Ana Sayfa"). -->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import { adres } from '$lib/sayfalar';
	import { tur } from '$lib/tur.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';
	import AiYorum from '$lib/bilesenler/AiYorum.svelte';
	import Gosterge from '$lib/bilesenler/Gosterge.svelte';

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

<section class="giris kap">
	<div class="metin">
		<p class="ust-etiket">{c.t('ana.ust')}</p>
		<h1>{c.t('ana.soru')}</h1>
		<p class="alt">{c.t('ana.alt')}</p>
		<div class="dugmeler">
			<a class="dugme" href={adres(c.dil, 'planla')}>{c.t('ana.planla')}</a>
			<button class="dugme ikinci" onclick={() => (tur.notAcik = true)}>{c.t('tur.baslat')}</button>
		</div>
	</div>

	<div class="sahne" aria-label={c.t('ana.sahne')}>
		<YerTutucu metin={c.t('ana.sahne_not')} girdi="A1 · 0.2" kutu yukseklik="100%">
			<svg viewBox="0 0 200 200" class="kure" aria-hidden="true">
				<circle cx="100" cy="100" r="80" fill="none" stroke="var(--cizgi-guclu)" stroke-width="1" />
				<ellipse cx="100" cy="100" rx="80" ry="22" fill="none" stroke="var(--cizgi)" stroke-dasharray="3 4" />
				<line x1="100" y1="20" x2="100" y2="180" stroke="var(--cizgi)" stroke-dasharray="3 4" />
				<circle cx="100" cy="176" r="3.5" fill="var(--vurgu)" />
				<text x="100" y="196" text-anchor="middle" class="kutup">{c.t('ana.kutup_isaret')}</text>
			</svg>
		</YerTutucu>
	</div>
</section>

<section class="bolum kap" aria-labelledby="kutup-baslik">
	<div class="bolum-basi">
		<h2 id="kutup-baslik">{c.t('ana.kutup_baslik')}</h2>
		<p class="ikincil">{c.t('ana.kutup_alt')}</p>
	</div>
	<div class="izgara">
		<Gosterge etiket={c.t('ana.gosterge_enerji')} anlam="gunes" />
		<Gosterge etiket={c.t('ana.gosterge_inis')} />
		<Gosterge etiket={c.t('ana.gosterge_dunya')} anlam="dunya" />
	</div>
	<YerTutucu metin={c.t('ana.gosterge_bekliyor')} girdi="B19 · S.6 · B3" />
	<AiYorum />
</section>

<section class="bolum kap" aria-labelledby="anlati-baslik">
	<h2 id="anlati-baslik">{c.t('ana.anlati_baslik')}</h2>
	<ol class="anlati">
		{#each ANLATI as bolum, i (bolum.anahtar)}
			<li class="kart">
				<span class="ust-etiket sayi">0{i + 1}</span>
				<h3>{c.t(`ana.${bolum.anahtar}`)}</h3>
				<YerTutucu metin={c.t('ana.anlati_bekliyor')} girdi={`B17 · ${bolum.sahne}`} kutu yukseklik="10rem" />
			</li>
		{/each}
	</ol>
</section>

<style>
	.giris {
		display: grid;
		gap: var(--b6);
		padding-block: var(--b6) var(--b8);
	}

	.metin {
		display: grid;
		gap: var(--b4);
		align-content: center;
	}

	h1 {
		max-width: 14ch;
	}

	.alt {
		font-size: var(--boyut-orta);
		color: var(--metin-ikincil);
		max-width: 44ch;
	}

	.dugmeler {
		display: flex;
		flex-wrap: wrap;
		gap: var(--b3);
		margin-top: var(--b2);
	}

	.sahne {
		min-height: 18rem;
		display: grid;
	}

	.kure {
		width: min(100%, 22rem);
	}

	.kutup {
		font-family: var(--yazi-sayi);
		font-size: 9px;
		fill: var(--metin-ikincil);
	}

	.anlati {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: var(--b4);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
	}

	@media (min-width: 56rem) {
		.giris {
			grid-template-columns: 1.1fr 1fr;
			min-height: calc(100dvh - 3.5rem);
			padding-block: var(--b6);
		}

		.sahne {
			min-height: 28rem;
		}
	}
</style>
