<!--
	Uzman Analiz (docs/sayfalar.md §3). Her bölümün formül numarası parametre setinden (§11).
	Yerleşim: geniş grafikler 8 sütun, yanındaki araçlar 4 sütun; satırlar 12'ye tamamlanır.
-->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import Panel from '$lib/bilesenler/Panel.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';

	const c = ceviri();
	const BOLUMLER = [
		{ anahtar: 'pareto', girdi: 'S.8, U1', sinif: 'lg:col-span-8', yukseklik: 'min-h-72' },
		{ anahtar: 'suzgec', girdi: 'M1–M4, M7', sinif: 'lg:col-span-4', yukseklik: 'min-h-72' },
		{ anahtar: 'batarya', girdi: 'B10, 2.3, 3.1, U3', sinif: 'md:col-span-6 lg:col-span-4', yukseklik: 'min-h-48' },
		{ anahtar: 'dsn', girdi: 'B8, S.5, 4.3', sinif: 'md:col-span-6 lg:col-span-4', yukseklik: 'min-h-48' },
		{ anahtar: 'belirsizlik', girdi: 'B15, 1.2', sinif: 'lg:col-span-4', yukseklik: 'min-h-48' },
		{ anahtar: 'aylik', girdi: 'S.4, U2', sinif: 'lg:col-span-8', yukseklik: 'min-h-56' },
		{ anahtar: 'benzer', girdi: 'B16, 7.2', sinif: 'lg:col-span-4', yukseklik: 'min-h-56' }
	];
</script>

<SayfaBasi sayfa="uzman" baslik={c.t('uzman.baslik')} giris={c.t('uzman.giris')} />

<div class="kap grid grid-cols-12 gap-6" data-izgara>
	{#each BOLUMLER as b (b.anahtar)}
		<Panel baslik={c.t(`uzman.${b.anahtar}`)} bekliyor sinif="col-span-12 {b.sinif}">
			<p class="-mt-2 text-sm text-metin-ikincil">{c.t(`uzman.${b.anahtar}_metin`)}</p>
			<YerTutucu metin={c.t('uzman.bekliyor')} girdi={b.girdi} sinif={b.yukseklik} />
		</Panel>
	{/each}
</div>
