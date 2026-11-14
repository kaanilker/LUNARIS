<!-- Hap biçimli küçük etiket. yer: bilim girdisi bekleyen değer; ai: AI üretimi metin. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sparkles from '@lucide/svelte/icons/sparkles';

	let { tur = 'notr', children }: { tur?: 'notr' | 'yer' | 'ai'; children: Snippet } = $props();

	const BICIM = {
		notr: 'border-cizgi bg-yuzey-2 text-metin-ikincil',
		yer: 'border-dashed border-cizgi-guclu text-metin-ikincil',
		ai: 'border-vurgu/40 bg-vurgu/10 text-vurgu'
	};
</script>

<span
	class="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap {BICIM[
		tur
	]}"
>
	{#if tur === 'yer'}
		<span class="size-1.5 rounded-full border border-current" aria-hidden="true"></span>
	{:else if tur === 'ai'}
		<Sparkles class="size-3" aria-hidden="true" />
	{/if}
	{@render children()}
</span>
