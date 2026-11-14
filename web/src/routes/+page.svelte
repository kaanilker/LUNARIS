<!-- Kök adres: dil seçimi. Tarayıcı dili İngilizce değilse Türkçe açılır (varsayılan dil). -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { cevirmen } from '$lib/i18n';
	import { DILLER, VARSAYILAN_DIL, adres } from '$lib/sayfalar';
	import Logo from '$lib/bilesenler/Logo.svelte';

	onMount(() => {
		const tercih = navigator.language?.toLowerCase().startsWith('en') ? 'en' : VARSAYILAN_DIL;
		goto(adres(tercih, 'ana'), { replaceState: true });
	});
</script>

<svelte:head>
	<title>{cevirmen(VARSAYILAN_DIL)('marka.ad')}</title>
</svelte:head>

<main class="kap grid min-h-dvh place-items-center">
	<div class="flex flex-col items-center gap-6 rounded-kart border border-cizgi bg-yuzey p-10 text-center">
		<Logo />
		<h1 class="text-3xl font-semibold text-metin">{cevirmen(VARSAYILAN_DIL)('marka.ad')}</h1>
		<p class="text-sm text-metin-ikincil"><span lang="tr">{cevirmen('tr')('kok.sec')}</span><br /><span lang="en">{cevirmen('en')('kok.sec')}</span></p>
		<ul class="flex flex-wrap justify-center gap-3">
			{#each DILLER as dil (dil)}
				<li lang={dil}><a class="dugme-ikincil" href={adres(dil, 'ana')}>{cevirmen(dil)('kok.dil_adi')}</a></li>
			{/each}
		</ul>
	</div>
</main>
