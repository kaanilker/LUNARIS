<!--
	AI yorum kutusu. Kural (docs/mimari.md §6): yalnız hesaplanan sonucu yorumlar, "AI üretimi" etiketi taşır,
	yorum yoksa boş kutu değil yedek metin görünür.
-->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import Panel from './Panel.svelte';
	import Rozet from './Rozet.svelte';

	let { metin, sinif = '' }: { metin?: string; sinif?: string } = $props();
	const c = ceviri();
</script>

<Panel baslik={c.t('ai.baslik')} {sinif}>
	{#snippet sag()}<Rozet tur="ai">{c.t('ai.etiket')}</Rozet>{/snippet}
	{#if metin}
		<p class="text-lg leading-relaxed text-metin">{metin}</p>
	{:else}
		<p class="text-sm leading-relaxed text-metin-ikincil">{c.t('ai.yedek')}</p>
	{/if}
</Panel>
