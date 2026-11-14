<!-- Görevler (docs/sayfalar.md §6): yalnız görsel sayfa; küre ve kamera uçuşu G1 animasyon ekibinden. -->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import { koordinat } from '$lib/bicim';
	import { BILINEN_GOREVLER, GOREV_SAYISI } from '$lib/veri/gorevler';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';

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

<div class="kap duzen">
	<div class="kure" aria-label={c.t('gorevler.kure')}>
		<YerTutucu metin={c.t('gorevler.kure_not')} girdi="G1" kutu yukseklik="100%" />
	</div>

	<section aria-labelledby="gorev-listesi">
		<h2 id="gorev-listesi" class="gorsel-gizli">{c.t('gorevler.baslik')}</h2>
		<YerTutucu metin={c.t('gorevler.liste_bekliyor')} girdi="B14" />
		<ol class="liste">
			{#each yuvalar as gorev, i (i)}
				<li class="kart" class:bos={!gorev}>
					<span class="ust-etiket sayi">{c.t('gorevler.sira')} {String(i + 1).padStart(2, '0')}</span>
					{#if gorev}
						<h3>{gorev.ad}</h3>
						<dl>
							<dt>{c.t('gorevler.inis_noktasi')}</dt>
							<dd class="sayi">{koordinat(gorev.enlem, gorev.boylam, c.dil, yon)}</dd>
							<dt>{c.t('gorevler.kaynak')}</dt>
							<dd>{gorev.kaynak}</dd>
						</dl>
					{:else}
						<p class="ikincil">{c.t('gorevler.gorev_bekliyor')}</p>
					{/if}
				</li>
			{/each}
		</ol>
	</section>
</div>

<style>
	.duzen {
		display: grid;
		gap: var(--b6);
		align-items: start;
	}

	.kure {
		display: grid;
		min-height: 20rem;
	}

	section {
		display: grid;
		gap: var(--b4);
	}

	.liste {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: var(--b3);
	}

	.bos {
		border-style: dashed;
		background: transparent;
	}

	dl {
		margin: 0;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--b1) var(--b4);
		font-size: var(--boyut-kucuk);
	}

	dt {
		color: var(--metin-ikincil);
	}

	dd {
		margin: 0;
	}

	@media (min-width: 60rem) {
		.duzen {
			grid-template-columns: 1fr 1fr;
		}

		.kure {
			position: sticky;
			top: 4.5rem;
			min-height: calc(100dvh - 6rem);
		}
	}
</style>
