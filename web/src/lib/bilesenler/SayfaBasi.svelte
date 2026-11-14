<!-- Sayfa başı: başlık, kısa giriş ve sitenin imzası olan ufuk çizgisi; tarayıcı başlığı ve açıklaması. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ceviri } from '$lib/i18n/baglam';
	import type { Sayfa } from '$lib/sayfalar';
	import UfukCizgisi from '$lib/cizim/UfukCizgisi.svelte';

	let {
		sayfa,
		baslik,
		giris,
		children
	}: { sayfa: Sayfa; baslik: string; giris?: string; children?: Snippet } = $props();

	const c = ceviri();
</script>

<svelte:head>
	<title>{baslik} | {c.t('marka.ad')}</title>
	<meta name="description" content={c.t(`meta.${sayfa}`)} />
</svelte:head>

<header class="kap flex flex-col gap-4 pt-12 pb-10 sm:pt-16">
	<h1 class="text-4xl font-semibold text-metin sm:text-5xl">{baslik}</h1>
	{#if giris}<p class="max-w-2xl text-lg text-metin-ikincil">{giris}</p>{/if}
	{#if children}{@render children()}{/if}
	<div class="mt-6"><UfukCizgisi /></div>
</header>
