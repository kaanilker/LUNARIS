<!-- Uzman Analiz (docs/sayfalar.md §3). Her bölümün formül numarası parametre setinden (§11). -->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';

	const c = ceviri();
	const BOLUMLER = [
		{ anahtar: 'suzgec', girdi: 'M1–M4 · M7' },
		{ anahtar: 'pareto', girdi: 'S.8 · U1' },
		{ anahtar: 'batarya', girdi: 'B10 · 2.3 · 3.1 · U3' },
		{ anahtar: 'dsn', girdi: 'B8 · S.5 · 4.3' },
		{ anahtar: 'belirsizlik', girdi: 'B15 · 1.2' },
		{ anahtar: 'benzer', girdi: 'B16 · 7.2' },
		{ anahtar: 'aylik', girdi: 'S.4 · U2' }
	];
</script>

<SayfaBasi sayfa="uzman" baslik={c.t('uzman.baslik')} giris={c.t('uzman.giris')} />

<div class="kap izgara bolumler">
	{#each BOLUMLER as b (b.anahtar)}
		<section class="kart" aria-labelledby={`uzman-${b.anahtar}`}>
			<h2 id={`uzman-${b.anahtar}`} class="baslik">{c.t(`uzman.${b.anahtar}`)}</h2>
			<p class="ikincil">{c.t(`uzman.${b.anahtar}_metin`)}</p>
			<YerTutucu metin={c.t('uzman.bekliyor')} girdi={b.girdi} kutu yukseklik="9rem" />
		</section>
	{/each}
</div>

<style>
	.bolumler {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
	}

	.baslik {
		font-size: var(--boyut-baslik-3);
	}
</style>
