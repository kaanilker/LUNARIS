<script lang="ts">
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { ceviriKur } from '$lib/i18n/baglam';
	import { DILLER, karsiDilAdresi } from '$lib/sayfalar';
	import { belirmeyiBaslat, hareketAzaltildi } from '$lib/hareket';
	import UstCubuk from '$lib/bilesenler/UstCubuk.svelte';
	import AltBilgi from '$lib/bilesenler/AltBilgi.svelte';

	let { data, children } = $props();

	ceviriKur(() => data.dil);

	// 200.html yedeğiyle açılan sayfalarda <html lang> sunucuda yazılamaz; istemcide düzeltilir.
	$effect(() => {
		document.documentElement.lang = data.dil;
	});

	// Sayfa geçişi (docs/animasyonlar.md H2, H4): tarayıcı destekliyorsa View Transitions.
	onNavigate((gezinme) => {
		if (!document.startViewTransition || hareketAzaltildi()) return;
		return new Promise((bitti) => {
			document.startViewTransition(async () => {
				bitti();
				await gezinme.complete;
			});
		});
	});

	// Görünüme giren paneller (H6). Her gezinmede yeni sayfanın öğeleri için yeniden kurulur.
	let birak = () => {};
	afterNavigate(() => {
		birak();
		birak = belirmeyiBaslat(document.getElementById('icerik')!);
	});
</script>

<svelte:head>
	{#each DILLER as dil (dil)}
		<link rel="alternate" hreflang={dil} href={karsiDilAdresi(page.url.pathname, dil)} />
	{/each}
</svelte:head>

<UstCubuk />
<main id="icerik" tabindex="-1" class="outline-none">
	{@render children()}
</main>
<AltBilgi />
