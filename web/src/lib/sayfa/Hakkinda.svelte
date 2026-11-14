<!-- Hakkında (docs/sayfalar.md §7). Animasyon yok (docs/animasyonlar.md "Hakkında"). -->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
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

<div class="kap">
	<section class="bolum" aria-labelledby="kaynaklar">
		<h2 id="kaynaklar">{c.t('hakkinda.kaynaklar')}</h2>
		<ul class="izgara kaynaklar">
			{#each KAYNAKLAR as k (k.ad)}
				<li class="kart">
					<a href={k.url} rel="noopener" target="_blank"><strong>{k.ad}</strong></a>
					<p class="ikincil">{c.t(`hakkinda.${k.anahtar}`)}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="bolum" aria-labelledby="yontem">
		<h2 id="yontem">{c.t('hakkinda.yontem')}</h2>
		<YerTutucu metin={c.t('hakkinda.yontem_bekliyor')} girdi="B17" kutu yukseklik="8rem" />
	</section>

	<section class="bolum" aria-labelledby="dogrulama">
		<div class="bolum-basi">
			<h2 id="dogrulama">{c.t('hakkinda.dogrulama')}</h2>
			<p class="ikincil">{c.t('hakkinda.dogrulama_metin')}</p>
		</div>
		<div class="tablo-kap">
			<table>
				<thead>
					<tr>
						<th>{c.t('hakkinda.sutun_ne')}</th>
						<th>{c.t('hakkinda.sutun_karsi')}</th>
						<th>{c.t('hakkinda.sutun_fark')}</th>
					</tr>
				</thead>
				<tbody>
					{#each HALKALAR as h (h)}
						<tr>
							<td>{c.t(`hakkinda.halka_${h}`)}</td>
							<td class="ikincil">{c.t(`hakkinda.halka_${h}_karsi`)}</td>
							<td class="sayi ikincil">—</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<YerTutucu metin={c.t('hakkinda.dogrulama_bekliyor')} girdi="B11 · B12" />
	</section>

	<section class="bolum" aria-labelledby="sinirlamalar">
		<h2 id="sinirlamalar">{c.t('hakkinda.sinirlamalar')}</h2>
		<YerTutucu metin={c.t('hakkinda.sinirlamalar_bekliyor')} girdi="B17" kutu yukseklik="8rem" />
	</section>

	<section class="bolum" aria-labelledby="ekip">
		<h2 id="ekip">{c.t('hakkinda.ekip')}</h2>
		<p>{c.t('hakkinda.ekip_metin')}</p>
		<p><a href={REPO} rel="noopener">{c.t('alt.kaynak')}: github.com/kaanilker/LUNARIS</a></p>
		<h3>{c.t('hakkinda.video')}</h3>
		<YerTutucu metin={c.t('hakkinda.video_bekliyor')} />
	</section>
</div>

<style>
	.kaynaklar {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.kaynaklar a {
		display: inline-block;
		padding-block: var(--b1);
	}

	h3 {
		margin-top: var(--b4);
	}
</style>
