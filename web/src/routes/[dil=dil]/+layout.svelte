<script lang="ts">
	import { page } from '$app/state';
	import { ceviriKur } from '$lib/i18n/baglam';
	import { DILLER, karsiDilAdresi } from '$lib/sayfalar';
	import UstCubuk from '$lib/bilesenler/UstCubuk.svelte';
	import AltBilgi from '$lib/bilesenler/AltBilgi.svelte';

	let { data, children } = $props();

	ceviriKur(() => data.dil);

	// 200.html yedeğiyle açılan sayfalarda <html lang> sunucuda yazılamaz; istemcide düzeltilir.
	$effect(() => {
		document.documentElement.lang = data.dil;
	});
</script>

<svelte:head>
	{#each DILLER as dil (dil)}
		<link rel="alternate" hreflang={dil} href={karsiDilAdresi(page.url.pathname, dil)} />
	{/each}
</svelte:head>

<UstCubuk />
<main id="icerik" tabindex="-1">
	{@render children()}
</main>
<AltBilgi />

<style>
	main:focus {
		outline: none;
	}
</style>
