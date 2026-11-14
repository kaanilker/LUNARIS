<!--
	Ay küresinin tel kafes çizimi; A1 sahnesi gelene kadar yerini tutar. Işık ve evre bilerek yok.
	donsun: A1'deki "sürekli yavaş dönüş" (kullanıcı kararı); hareketi azalt açıkken ve sekme gizliyken durur.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { hareketAzaltildi } from '$lib/hareket';
	import { kafes } from './kure';

	let { kutupEtiketi, donsun = false }: { kutupEtiketi: string; donsun?: boolean } = $props();

	const R = 120;
	const DERECE_SANIYE = 6;
	let kayma = $state(0);
	const k = $derived(kafes(160, 150, R, -28, 30, kayma));

	onMount(() => {
		if (!donsun || hareketAzaltildi()) return;
		let kare = 0;
		let onceki = performance.now();
		const adim = (simdi: number) => {
			if (!document.hidden) kayma = (kayma + ((simdi - onceki) / 1000) * DERECE_SANIYE) % 360;
			onceki = simdi;
			kare = requestAnimationFrame(adim);
		};
		kare = requestAnimationFrame(adim);
		return () => cancelAnimationFrame(kare);
	});
</script>

<svg viewBox="0 0 320 320" class="h-auto w-full max-w-sm" role="img" aria-label={kutupEtiketi}>
	<circle cx="160" cy="150" r={R} class="fill-yuzey-2/50 stroke-cizgi-guclu" stroke-width="1.25" />
	<g class="fill-none stroke-cizgi" stroke-width="1">
		{#each k.paraleller as d, i (i)}<path {d} />{/each}
		{#each k.meridyenler as d, i (i)}<path {d} />{/each}
	</g>
	<circle cx={k.kutup.x} cy={k.kutup.y} r="9" class="fill-none stroke-vurgu/60" stroke-width="1" />
	<circle cx={k.kutup.x} cy={k.kutup.y} r="3.5" class="fill-vurgu" />
	<line x1={k.kutup.x} y1={k.kutup.y + 10} x2={k.kutup.x} y2="296" class="stroke-cizgi-guclu" stroke-dasharray="2 3" />
	<text x={k.kutup.x} y="312" text-anchor="middle" class="fill-metin-ikincil text-[11px]">{kutupEtiketi}</text>
</svg>
