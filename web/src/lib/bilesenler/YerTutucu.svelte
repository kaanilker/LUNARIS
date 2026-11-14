<!--
	Bilim girdisi ya da sahne gelmemiş yer (CLAUDE.md: arayüzde "yer tutucu" yazar).
	girdi: beklenen girdinin kodu (B19, S.6, A1); docs/bilim-girdileri.md ve docs/animasyonlar.md'deki kodlar.
	satir: alan altında tek satırlık not; değilse kartın içinde ortalanmış boş durum.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ceviri } from '$lib/i18n/baglam';
	import Rozet from './Rozet.svelte';

	let {
		metin,
		girdi,
		satir = false,
		sinif = '',
		children
	}: { metin: string; girdi?: string; satir?: boolean; sinif?: string; children?: Snippet } = $props();

	const c = ceviri();
</script>

{#if satir}
	<p class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-metin-ikincil" data-yer-tutucu={girdi ?? ''}>
		<Rozet tur="yer">{c.t('yer_tutucu.etiket')}</Rozet>
		<span>{metin}</span>
		{#if girdi}<span class="tabular-nums">{girdi}</span>{/if}
	</p>
{:else}
	<div
		class="flex flex-1 flex-col items-center justify-center gap-4 rounded-kutu border border-dashed border-cizgi bg-zemin/40 px-5 py-8 text-center {sinif}"
		data-yer-tutucu={girdi ?? ''}
	>
		{#if children}{@render children()}{/if}
		<Rozet tur="yer">{c.t('yer_tutucu.etiket')}</Rozet>
		<p class="max-w-sm text-sm text-metin-ikincil">{metin}</p>
		{#if girdi}
			<p class="text-xs text-metin-ikincil">{c.t('yer_tutucu.girdi')}: {girdi}</p>
		{/if}
	</div>
{/if}
