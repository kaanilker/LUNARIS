<!--
	AI yorum kutusu. Kural (docs/mimari.md §6): yalnız hesaplanan sonucu yorumlar, "AI üretimi" etiketi taşır,
	yorum yoksa boş kutu değil yedek metin görünür. Yorum hattı henüz yok; metin verilmezse yedek gösterilir.
-->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';

	let { metin }: { metin?: string } = $props();
	const c = ceviri();
</script>

<aside class="ai" aria-label={c.t('ai.baslik')}>
	<header>
		<span class="ust-etiket">{c.t('ai.baslik')}</span>
		<span class="etiket sayi">{c.t('ai.etiket')}</span>
	</header>
	<p class:yedek={!metin}>{metin ?? c.t('ai.yedek')}</p>
</aside>

<style>
	.ai {
		display: grid;
		gap: var(--b3);
		padding: var(--b5);
		border-left: 2px solid var(--vurgu);
		background: var(--yuzey);
		border-radius: 0 var(--yaricap) var(--yaricap) 0;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--b2);
	}

	.etiket {
		font-size: 0.75rem;
		padding: 0 var(--b2);
		border: var(--cizgi-kalinlik) solid var(--cizgi-guclu);
		border-radius: var(--yaricap-kucuk);
	}

	p {
		font-size: var(--boyut-orta);
		line-height: 1.45;
	}

	.yedek {
		font-size: var(--boyut-govde);
		color: var(--metin-ikincil);
	}
</style>
