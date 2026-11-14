<!--
	Sitenin imza öğesi (docs/tasarim.md §3): 0°'den 360°'ye azimut işaretli ufuk çizgisi.
	Yalnız geometri; arazi silüeti ve gök cisimleri yok. Site Detay panoraması aynı ekseni kullanır.
	buyuk: Ana Sayfa'da bütün genişlikte, yön harfleri ve ölçek etiketiyle.
-->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';

	let { buyuk = false }: { buyuk?: boolean } = $props();
	const c = ceviri();

	const YONLER = ['kuzey', 'dogu', 'guney', 'bati', 'kuzey'];
	// 10° aralıklı çentik; 30° katları orta, 90° katları uzun.
	const CENTIKLER = Array.from({ length: 37 }, (_, i) => i * 10);
	const boy = (az: number) => (az % 90 === 0 ? 1 : az % 30 === 0 ? 0.55 : 0.28);
</script>

<div class="flex flex-col gap-2" aria-hidden="true">
	<div class="relative {buyuk ? 'h-5' : 'h-3'}">
		<div class="absolute inset-x-0 top-0 border-t border-cizgi-guclu"></div>
		{#each CENTIKLER as az (az)}
			<span
				class="absolute top-0 w-px bg-cizgi-guclu"
				style:left={`${(az / 360) * 100}%`}
				style:height={`${boy(az) * 100}%`}
			></span>
		{/each}
	</div>
	{#if buyuk}
		<div class="relative h-4 text-xs text-metin-ikincil">
			{#each YONLER as y, i (i)}
				<span
					class="absolute {i === 0 ? '' : i === 4 ? '-translate-x-full' : '-translate-x-1/2'}"
					style:left={`${i * 25}%`}>{c.t(`yon.${y}`)}</span
				>
			{/each}
		</div>
	{/if}
</div>
