<!-- Sayfa başı: küçük bölüm etiketi, başlık, kısa giriş; tarayıcı başlığı ve açıklaması. -->
<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { ceviri } from '$lib/i18n/baglam';
	import type { Sayfa } from '$lib/sayfalar';

	let {
		sayfa,
		simge,
		ust,
		baslik,
		giris,
		children
	}: {
		sayfa: Sayfa;
		simge?: Component<{ class?: string; "aria-hidden"?: boolean | "true" }>;
		ust?: string;
		baslik: string;
		giris?: string;
		children?: Snippet;
	} = $props();

	const c = ceviri();
</script>

<svelte:head>
	<title>{baslik} · {c.t('marka.ad')}</title>
	<meta name="description" content={c.t(`meta.${sayfa}`)} />
</svelte:head>

<header class="kap flex flex-col gap-4 pt-10 pb-8 sm:pt-14 sm:pb-10">
	<p class="inline-flex w-fit items-center gap-2 rounded-full border border-cizgi bg-yuzey px-3 py-1 text-xs font-medium text-metin-ikincil">
		{#if simge}{@const Simge = simge}<Simge class="size-3.5" aria-hidden="true" />{/if}
		{ust ?? c.t(`menu.${sayfa}`)}
	</p>
	<h1 class="text-4xl font-semibold tracking-tight text-metin sm:text-5xl">{baslik}</h1>
	{#if giris}<p class="max-w-2xl text-lg text-metin-ikincil">{giris}</p>{/if}
	{#if children}{@render children()}{/if}
</header>
