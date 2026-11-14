<!--
	Enstrüman paneli: gösterge, harita, tablo, form (docs/tasarim.md §3). Metin bölümleri panel değildir (Bolum).
	data-panel: ızgara hizası testi (tests/sayfalar.e2e.ts) bu öğelerin kenarlarını ölçer.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ceviri } from '$lib/i18n/baglam';
	import Rozet from './Rozet.svelte';

	let {
		baslik,
		bekliyor = false,
		sinif = '',
		sag,
		children
	}: { baslik?: string; bekliyor?: boolean; sinif?: string; sag?: Snippet; children: Snippet } = $props();

	const c = ceviri();
</script>

<section data-panel class="flex min-w-0 flex-col gap-5 rounded-kart border border-cizgi bg-yuzey p-5 sm:p-6 {sinif}">
	{#if baslik}
		<header class="flex flex-wrap items-center gap-3">
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
