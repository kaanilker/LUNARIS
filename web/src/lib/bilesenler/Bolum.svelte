<!--
	Bilgi bölümü: teknik rapor düzeni (docs/tasarim.md §3). Solda başlık 3 sütun, sağda içerik 9 sütun.
	İçerik kendi 12 sütunlu ızgarasıdır (data-izgara); içindeki paneller onun çizgilerine oturur.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { baslik, aciklama, children }: { baslik: string; aciklama?: string; children: Snippet } = $props();
</script>

<section class="col-span-12 grid grid-cols-12 gap-x-6 gap-y-5 border-t border-cizgi pt-8">
	<header class="col-span-12 flex flex-col gap-2 lg:col-span-3">
		<h2 class="text-xl font-semibold text-metin">{baslik}</h2>
		{#if aciklama}<p class="max-w-prose text-sm text-metin-ikincil">{aciklama}</p>{/if}
	</header>
	<div class="col-span-12 grid grid-cols-12 content-start gap-6 lg:col-span-9" data-izgara>
		{@render children()}
	</div>
</section>
