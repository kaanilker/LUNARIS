<!--
	Kart: sitedeki bütün içerik blokları bu biçimdedir (docs/tasarim.md §3 şekil dili).
	data-panel: ızgara hizası testi (tests/sayfalar.e2e.ts) bu öğelerin kenarlarını ölçer.
	ton: başlıktaki simge kutusunun rengi; gunes ve dunya yalnız o gök cismine ait panelde verilir.
-->
<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { ceviri } from '$lib/i18n/baglam';
	import Rozet from './Rozet.svelte';

	type Ton = 'notr' | 'vurgu' | 'gunes' | 'dunya';

	let {
		baslik,
		simge,
		ton = 'notr',
		bekliyor = false,
		sinif = '',
		sag,
		children
	}: {
		baslik?: string;
		simge?: Component<{ class?: string; "aria-hidden"?: boolean | "true" }>;
		ton?: Ton;
		bekliyor?: boolean;
		sinif?: string;
		sag?: Snippet;
		children: Snippet;
	} = $props();

	const c = ceviri();
	const TON: Record<Ton, string> = {
		notr: 'bg-yuzey-2 text-metin-ikincil',
		vurgu: 'bg-vurgu/15 text-vurgu',
		gunes: 'bg-gunes/15 text-gunes',
		dunya: 'bg-dunya/15 text-dunya'
	};
</script>

<section data-panel class="flex min-w-0 flex-col gap-5 rounded-kart border border-cizgi bg-yuzey p-5 sm:p-6 {sinif}">
	{#if baslik}
		<header class="flex flex-wrap items-center gap-3">
			{#if simge}
				{@const Simge = simge}
				{#if ton === 'gunes' || ton === 'dunya'}
					<!-- Renkli kutu yalnız anlam taşıdığı yerde: Güneş ve Dünya. -->
					<span class="grid size-8 shrink-0 place-items-center rounded-kutu {TON[ton]}" aria-hidden="true">
						<Simge class="size-4" />
					</span>
				{:else}
					<Simge class="size-4 shrink-0 {ton === 'vurgu' ? 'text-vurgu' : 'text-metin-ikincil'}" aria-hidden="true" />
				{/if}
			{/if}
			<h2 class="text-base font-semibold text-metin">{baslik}</h2>
			{#if bekliyor || sag}
				<div class="ml-auto flex flex-wrap items-center gap-2">
					{#if bekliyor}<Rozet tur="yer">{c.t('yer_tutucu.etiket')}</Rozet>{/if}
					{@render sag?.()}
				</div>
			{/if}
		</header>
	{/if}
	{@render children()}
</section>
