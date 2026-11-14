<!-- Kök adres: dil seçimi. Tarayıcı dili İngilizce değilse Türkçe açılır (varsayılan dil). -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { cevirmen } from '$lib/i18n';
	import { DILLER, VARSAYILAN_DIL, adres } from '$lib/sayfalar';

	onMount(() => {
		const tercih = navigator.language?.toLowerCase().startsWith('en') ? 'en' : VARSAYILAN_DIL;
		goto(adres(tercih, 'ana'), { replaceState: true });
	});
</script>

<svelte:head>
	<title>{cevirmen(VARSAYILAN_DIL)('marka.ad')}</title>
</svelte:head>

<main class="kok kap">
	<h1>{cevirmen(VARSAYILAN_DIL)('marka.ad')}</h1>
	<p class="ikincil">{cevirmen('tr')('kok.sec')} · {cevirmen('en')('kok.sec')}</p>
	<ul>
		{#each DILLER as dil (dil)}
			<li lang={dil}>
				<a class="dugme ikinci" href={adres(dil, 'ana')}>{cevirmen(dil)('kok.dil_adi')}</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	.kok {
		display: grid;
		gap: var(--b6);
		place-content: center;
		min-height: 100dvh;
		text-align: center;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--b4);
	}
</style>
