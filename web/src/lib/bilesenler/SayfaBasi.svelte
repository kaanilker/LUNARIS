<!-- Sayfa başı: başlık, kısa giriş, tarayıcı başlığı ve açıklaması. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ceviri } from '$lib/i18n/baglam';
	import type { Sayfa } from '$lib/sayfalar';

	let {
		sayfa,
		ust,
		baslik,
		giris,
		children
	}: { sayfa: Sayfa; ust?: string; baslik: string; giris?: string; children?: Snippet } = $props();

	const c = ceviri();
</script>

<svelte:head>
	<title>{baslik} · {c.t('marka.ad')}</title>
	<meta name="description" content={c.t(`meta.${sayfa}`)} />
</svelte:head>

<header class="sayfa-basi kap">
	{#if ust}<p class="ust-etiket">{ust}</p>{/if}
	<h1>{baslik}</h1>
	{#if giris}<p class="giris">{giris}</p>{/if}
	{#if children}{@render children()}{/if}
</header>

<style>
	.sayfa-basi {
		display: grid;
		gap: var(--b4);
		padding-block: var(--b7) var(--b6);
	}

	.giris {
		font-size: var(--boyut-orta);
		color: var(--metin-ikincil);
		max-width: 48ch;
	}
</style>
