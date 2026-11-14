<!-- Karşılaştır (docs/sayfalar.md §5). Bileşenler Site Detay ile ortak olacak; şimdilik iki boş yuva. -->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';

	const c = ceviri();
	const METRIKLER = ['sutun_gunes', 'sutun_iletisim', 'sutun_karanlik'];
</script>

<SayfaBasi sayfa="karsilastir" baslik={c.t('karsilastir.baslik')} giris={c.t('karsilastir.giris')} />

<div class="kap duzen">
	<div class="ikili">
		{#each ['A', 'B'] as taraf (taraf)}
			<section class="kart" aria-labelledby={`taraf-${taraf}`}>
				<h2 id={`taraf-${taraf}`} class="taraf sayi">{taraf}</h2>
				<p class="ust-etiket">{c.t('karsilastir.secim')}</p>
				<YerTutucu metin={c.t('karsilastir.secim_bekliyor')} girdi="K1" kutu yukseklik="10rem" />
			</section>
		{/each}
	</div>

	<section class="ozet" aria-labelledby="ozet">
		<div class="bolum-basi">
			<h2 id="ozet">{c.t('karsilastir.ozet')}</h2>
			<p class="ikincil">{c.t('karsilastir.ozet_metin')}</p>
		</div>
		<div class="tablo-kap">
			<table>
				<thead>
					<tr>
						<th>{c.t('karsilastir.sutun_metrik')}</th>
						<th class="sayi">A</th>
						<th class="sayi">B</th>
						<th>{c.t('karsilastir.sutun_fark')}</th>
					</tr>
				</thead>
				<tbody>
					{#each METRIKLER as m (m)}
						<tr>
							<td>{c.t(`planla.${m}`)}</td>
							<td class="sayi ikincil">—</td>
							<td class="sayi ikincil">—</td>
							<td class="sayi ikincil">—</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<YerTutucu metin={c.t('karsilastir.ozet_bekliyor')} girdi="B9 · 7.1 · K2" />
	</section>
</div>

<style>
	.duzen {
		display: grid;
		gap: var(--b7);
	}

	.ikili {
		display: grid;
		gap: var(--b4);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
	}

	.taraf {
		font-size: var(--boyut-baslik-2);
	}

	.ozet {
		display: grid;
		gap: var(--b4);
	}
</style>
