<!-- Güney kutbu haritasının boş çerçevesi: halkalar ve boylam çizgileri. Parsel ağı (B4) gelince üstüne çizilir. -->
<script lang="ts">
	let { etiketler }: { etiketler: [string, string, string, string] } = $props();
	const HALKA = [36, 72, 108];
	const ACILAR = [0, 30, 60, 90, 120, 150];
</script>

<svg viewBox="0 0 300 300" class="h-auto w-full max-w-xs" aria-hidden="true">
	<g class="fill-none stroke-cizgi" stroke-width="1">
		{#each HALKA as r (r)}<circle cx="150" cy="150" {r} />{/each}
		{#each ACILAR as a (a)}
			<line x1="150" y1="42" x2="150" y2="258" transform={`rotate(${a} 150 150)`} />
		{/each}
	</g>
	<circle cx="150" cy="150" r="108" class="fill-none stroke-cizgi-guclu" stroke-width="1.25" />
	<circle cx="150" cy="150" r="3" class="fill-metin-ikincil" />
	<g class="fill-metin-ikincil font-kod text-[11px]" text-anchor="middle">
		<text x="150" y="30">{etiketler[0]}</text>
		<text x="276" y="154">{etiketler[1]}</text>
		<text x="150" y="282">{etiketler[2]}</text>
		<text x="24" y="154">{etiketler[3]}</text>
	</g>
</svg>
