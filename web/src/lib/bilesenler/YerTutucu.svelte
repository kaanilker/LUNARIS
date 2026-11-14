<!--
	Bilim girdisi ya da sahne gelmemiş her yerde görünen işaret (CLAUDE.md: "yer tutucu" yazar).
	girdi: beklenen girdinin kodu (B19, S.6, A1 gibi); docs/bilim-girdileri.md ve docs/animasyonlar.md'deki kodlar.
	kutu: true ise alan kaplayan çerçeve olur (sahne, grafik); değilse satır içi not.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ceviri } from '$lib/i18n/baglam';

	let {
		metin,
		girdi,
		kutu = false,
		yukseklik,
		children
	}: {
		metin: string;
		girdi?: string;
		kutu?: boolean;
		yukseklik?: string;
		children?: Snippet;
	} = $props();

	const c = ceviri();
</script>

<div class="yt" class:kutu style:min-height={yukseklik} data-yer-tutucu={girdi ?? ''}>
	{#if children}
		<div class="icerik">{@render children()}</div>
	{/if}
	<p class="not">
		<span class="rozet">{c.t('yer_tutucu.etiket')}</span>
		<span>{metin}</span>
		{#if girdi}
			<span class="girdi sayi">{c.t('yer_tutucu.girdi')}: {girdi}</span>
		{/if}
	</p>
</div>

<style>
	.yt {
		display: grid;
		gap: var(--b3);
		color: var(--metin-ikincil);
		font-size: var(--boyut-kucuk);
	}

	.kutu {
		position: relative;
		align-content: end;
		padding: var(--b4);
		border: var(--cizgi-kalinlik) dashed var(--cizgi-guclu);
		border-radius: var(--yaricap);
		background: repeating-linear-gradient(
			135deg,
			transparent 0 10px,
			var(--yuzey) 10px 11px
		);
	}

	.icerik {
		display: grid;
		place-items: center;
		flex: 1;
	}

	.not {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--b1) var(--b2);
		max-width: none;
	}

	.rozet {
		font-family: var(--yazi-sayi);
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.0625rem var(--b2);
		border: var(--cizgi-kalinlik) dashed var(--cizgi-guclu);
		border-radius: var(--yaricap-kucuk);
		color: var(--metin);
	}

	.girdi {
		font-size: 0.75rem;
	}
</style>
