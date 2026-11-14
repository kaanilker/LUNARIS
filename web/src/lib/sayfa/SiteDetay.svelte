<!--
	Site Detay (docs/sayfalar.md §4, animasyonlar S1–S6). Panorama 2B SVG (KARAR, ajan).
	Şimdilik yalnız çerçeve: azimut ekseni ve yön harfleri. Silüet ve izler veri hattından gelecek.
-->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
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
	ust={parsel ? `${c.t('site.parsel')} · ${parsel}` : c.t('site.parsel_yok')}
	baslik={c.t('site.baslik')}
	giris={parsel ? undefined : c.t('site.parsel_yok_metin')}
/>

<div class="kap duzen">
	<section class="genis" aria-labelledby="panorama">
		<h2 id="panorama" class="ust-etiket">{c.t('site.panorama')}</h2>
		<div class="panorama">
			<svg viewBox={`0 -10 ${GENISLIK} 150`} preserveAspectRatio="none" aria-hidden="true">
				<line x1="0" y1="100" x2={GENISLIK} y2="100" stroke="var(--cizgi-guclu)" />
				{#each { length: 13 }, i (i)}
					<line x1={x(i * 30)} y1="100" x2={x(i * 30)} y2="106" stroke="var(--cizgi-guclu)" />
				{/each}
			</svg>
			<ol class="yonler" aria-hidden="true">
				{#each YONLER as y, i (i)}
					<li style:left={`${(y.az / 360) * 100}%`}>{c.t(`yon.${y.anahtar}`)}</li>
				{/each}
			</ol>
		</div>
		<ul class="lejant">
			<li><span class="cizgi gunes"></span>{c.t('site.gunes_izi')}</li>
			<li><span class="cizgi dunya"></span>{c.t('site.dunya_izi')}</li>
		</ul>
		<YerTutucu metin={c.t('site.panorama_not')} girdi="B2 · B6 · 0.3 · 0.1 · 0.4 · S1" />
	</section>

	<section class="genis" aria-labelledby="geri-sayim">
		<h2 id="geri-sayim" class="ust-etiket">{c.t('site.geri_sayim')}</h2>
		<div class="izgara">
			<Gosterge etiket={c.t('site.gun_batimi')} anlam="gunes" />
			<Gosterge etiket={c.t('site.dunya_batimi')} anlam="dunya" />
			<Gosterge etiket={c.t('site.iletisim')} anlam="dunya" />
		</div>
		<YerTutucu metin={c.t('site.geri_sayim_bekliyor')} girdi="B5 · 0.5 · S.5" />
	</section>

	<section class="genis" aria-labelledby="cizelge">
		<h2 id="cizelge" class="ust-etiket">{c.t('site.cizelge')}</h2>
		<p class="ikincil">{c.t('site.cizelge_metin')}</p>
		<YerTutucu metin={c.t('site.oynatici_bekliyor')} girdi="S.3 · S.4 · S.5 · S3" kutu yukseklik="6rem" />
		<div class="oynatici" role="group" aria-label={c.t('site.oynatici')}>
			<button class="dugme ikinci" disabled>{c.t('site.geri')}</button>
			<button class="dugme ikinci" disabled>{c.t('site.oynat')}</button>
			<button class="dugme ikinci" disabled>{c.t('site.ileri')}</button>
			<input type="range" disabled aria-label={c.t('site.oynatici')} />
		</div>
	</section>

	<section aria-labelledby="astronot">
		<h2 id="astronot" class="ust-etiket">{c.t('site.astronot')}</h2>
		<YerTutucu metin={c.t('site.astronot_not')} girdi="S4" kutu yukseklik="14rem" />
	</section>

	<section class="kart" aria-labelledby="koordinat">
		<h2 id="koordinat" class="ust-etiket">{c.t('site.koordinat')}</h2>
		<form class="koordinat" onsubmit={(e) => e.preventDefault()}>
			<label class="alan"><span>{c.t('site.enlem')}</span><input inputmode="decimal" disabled /></label>
			<label class="alan"><span>{c.t('site.boylam')}</span><input inputmode="decimal" disabled /></label>
			<button class="dugme" disabled>{c.t('site.hesapla')}</button>
		</form>
		<YerTutucu metin={c.t('site.koordinat_not')} girdi="S.1 · S.9" />
	</section>

	<section class="kart" aria-labelledby="dis">
		<h2 id="dis" class="ust-etiket">{c.t('site.dis')}</h2>
		<ul class="dis">
			{#each DIS_ARACLAR as arac (arac.ad)}
				<li><a href={arac.url} rel="noopener" target="_blank">{arac.ad}</a></li>
			{/each}
		</ul>
		<YerTutucu metin={c.t('site.dis_not')} />
		<div class="eylemler">
			<button class="dugme ikinci" disabled>{c.t('site.karsilastira_ekle')}</button>
			<button class="dugme ikinci" onclick={() => window.print()}>{c.t('site.rapor')}</button>
		</div>
	</section>
</div>

<style>
	.duzen {
		display: grid;
		gap: var(--b7);
	}

	section {
		display: grid;
		gap: var(--b4);
		align-content: start;
		min-width: 0;
	}

	.panorama {
		position: relative;
		padding-bottom: var(--b5);
		border: var(--cizgi-kalinlik) solid var(--cizgi);
		border-radius: var(--yaricap);
		background: var(--yuzey);
	}

	.panorama svg {
		width: 100%;
		height: 12rem;
	}

	.yonler {
		list-style: none;
		margin: 0;
		padding: 0;
		position: absolute;
		inset: auto var(--b4) var(--b2) var(--b4);
		height: 1.25rem;
		font-family: var(--yazi-sayi);
		font-size: var(--boyut-kucuk);
		color: var(--metin-ikincil);
	}

	.yonler li {
		position: absolute;
		transform: translateX(-50%);
	}

	.lejant {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--b5);
		font-size: var(--boyut-kucuk);
		color: var(--metin-ikincil);
	}

	.lejant li {
		display: inline-flex;
		align-items: center;
		gap: var(--b2);
	}

	.cizgi {
		display: inline-block;
		width: 1.5rem;
		height: 0;
		border-top: 2px solid;
	}

	.cizgi.gunes {
		border-color: var(--gunes);
	}

	/* Dünya izi kesikli: iki iz renk dışında da ayırt edilir (docs/tasarim.md §2). */
	.cizgi.dunya {
		border-color: var(--dunya);
		border-top-style: dashed;
	}

	.oynatici {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--b2);
	}

	.oynatici input {
		flex: 1 1 12rem;
		padding: 0;
	}

	.koordinat {
		display: grid;
		gap: var(--b3);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
		align-items: end;
	}

	.dis {
		margin: 0;
		padding-left: var(--b5);
		display: grid;
		gap: var(--b1);
	}

	.dis a {
		display: inline-block;
		padding-block: var(--b2);
	}

	.eylemler {
		display: flex;
		flex-wrap: wrap;
		gap: var(--b3);
	}

	@media (min-width: 60rem) {
		.duzen {
			grid-template-columns: 1fr 1fr;
			gap: var(--b7) var(--b6);
		}

		.genis {
			grid-column: 1 / -1;
		}
	}
</style>
