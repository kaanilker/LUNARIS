<!--
	Tek sayılık gösterge kartı. anlam: 'gunes' ya da 'dunya' yalnız o gök cismine ait değerde verilir
	(docs/tasarim.md §2); renk tek başına anlam taşımasın diye simge de değişir.
	deger verilmezse boş değer işareti görünür; yer tutucu notu çağıran tarafın işidir.
-->
<script lang="ts">
	let {
		etiket,
		deger,
		birim,
		anlam = 'notr'
	}: { etiket: string; deger?: string; birim?: string; anlam?: 'gunes' | 'dunya' | 'notr' } =
		$props();
</script>

<div class="gosterge {anlam}">
	<span class="simge" aria-hidden="true">
		{#if anlam === 'gunes'}
			<svg viewBox="0 0 16 16" width="16" height="16"
				><circle cx="8" cy="8" r="3.5" fill="currentColor" /><g
					stroke="currentColor"
					stroke-width="1.4"
					stroke-linecap="round"
					><path
						d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3"
					/></g
				></svg
			>
		{:else if anlam === 'dunya'}
			<svg viewBox="0 0 16 16" width="16" height="16"
				><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.4" /><path
					d="M2 8h12M8 2c2 2 2 10 0 12M8 2c-2 2-2 10 0 12"
					fill="none"
					stroke="currentColor"
					stroke-width="1.1"
				/></svg
			>
		{:else}
			<svg viewBox="0 0 16 16" width="16" height="16"
				><circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.4" /><path
					d="M8 1v4M8 11v4M1 8h4M11 8h4"
					stroke="currentColor"
					stroke-width="1.4"
				/></svg
			>
		{/if}
	</span>
	<span class="etiket">{etiket}</span>
	<span class="deger sayi">{deger ?? '—'}{#if deger && birim}<small>{birim}</small>{/if}</span>
</div>

<style>
	.gosterge {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: var(--b2) var(--b3);
		padding: var(--b4) var(--b5);
		background: var(--yuzey);
		border: var(--cizgi-kalinlik) solid var(--cizgi);
		border-radius: var(--yaricap);
	}

	.simge {
		color: var(--metin-ikincil);
	}

	.gunes .simge {
		color: var(--gunes);
	}

	.dunya .simge {
		color: var(--dunya);
	}

	.etiket {
		color: var(--metin-ikincil);
		font-size: var(--boyut-kucuk);
	}

	.deger {
		grid-column: 1 / -1;
		font-size: 2rem;
		line-height: 1;
	}

	small {
		font-size: var(--boyut-kucuk);
		margin-left: var(--b1);
		color: var(--metin-ikincil);
	}
</style>
