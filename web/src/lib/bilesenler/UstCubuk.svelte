<!--
	Her sayfada ortak üst çubuk (docs/sayfalar.md "Her sayfada ortak"): logo, 7 sayfa, dil, tur.
	Bilerek ekrana yapışık ve bulanık değil, simgesiz, sağda düğme yok (docs/tasarim.md §3a).
-->
<script lang="ts">
	import { page } from '$app/state';
	import { ceviri } from '$lib/i18n/baglam';
	import { SAYFALAR, adres, karsiDilAdresi, type Sayfa } from '$lib/sayfalar';
	import { tur } from '$lib/tur.svelte';
	import Logo from './Logo.svelte';

	const c = ceviri();
	let menuAcik = $state(false);
	const karsiDil = $derived(c.dil === 'tr' ? 'en' : 'tr');

	function etkinMi(sayfa: Sayfa): boolean {
		const yol = page.url.pathname;
		const hedef = adres(c.dil, sayfa);
		return sayfa === 'ana' ? yol === hedef : yol.startsWith(hedef);
	}

	$effect(() => {
		// Sayfa değişince mobil menü kapanır.
		void page.url.pathname;
		menuAcik = false;
	});
</script>

{#snippet baglantilar(mobil: boolean)}
	<ul class={mobil ? 'grid' : 'flex items-center gap-5'}>
		{#each SAYFALAR as sayfa (sayfa)}
			<li>
				<a
					href={adres(c.dil, sayfa)}
					aria-current={etkinMi(sayfa) ? 'page' : undefined}
					class="flex items-center border-b text-sm whitespace-nowrap transition-colors {mobil
						? 'h-11 border-transparent'
						: 'h-16 border-b-2'} {etkinMi(sayfa)
						? 'border-vurgu text-metin'
						: 'border-transparent text-metin-ikincil hover:text-metin'}"
				>
					{c.t(`menu.${sayfa}`)}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet araclar()}
	<a
		href={karsiDilAdresi(page.url.pathname, karsiDil)}
		hreflang={karsiDil}
		lang={karsiDil}
		data-sveltekit-noscroll
		class="inline-flex h-9 items-center text-sm text-metin-ikincil underline-offset-4 hover:text-metin hover:underline"
		>{c.t('menu.diger_dil')}</a
	>
	<button
		class="inline-flex h-9 items-center text-sm text-metin underline decoration-cizgi-guclu underline-offset-4 hover:decoration-metin"
		onclick={() => (tur.notAcik = !tur.notAcik)}
		aria-expanded={tur.notAcik}>{c.t('tur.baslat')}</button
	>
{/snippet}

<header class="kap">
	<a href="#icerik" class="dugme-birincil absolute top-2 left-4 -translate-y-20 focus:translate-y-0">{c.t('menu.atla')}</a>
	<div class="flex h-16 items-center gap-10 border-b border-cizgi">
		<a href={adres(c.dil, 'ana')} class="flex shrink-0 items-center gap-2.5" aria-label={c.t('marka.ad')}>
			<Logo />
			<span class="font-baslik text-lg font-semibold text-metin [font-stretch:125%]">{c.t('marka.ad')}</span>
		</a>
		<nav class="hidden xl:block" aria-label={c.t('menu.ana_menu')}>{@render baglantilar(false)}</nav>
		<div class="ml-auto hidden items-center gap-5 xl:flex">{@render araclar()}</div>
		<button
			class="dugme-ikincil ml-auto h-10 xl:hidden"
			aria-expanded={menuAcik}
			aria-controls="mobil-menu"
			onclick={() => (menuAcik = !menuAcik)}
		>
			{menuAcik ? c.t('menu.kapat') : c.t('menu.ac')}
		</button>
	</div>

	{#if menuAcik}
		<nav id="mobil-menu" class="grid gap-4 border-b border-cizgi py-4 xl:hidden" aria-label={c.t('menu.ana_menu')}>
			{@render baglantilar(true)}
			<div class="flex flex-wrap items-center gap-5">{@render araclar()}</div>
		</nav>
	{/if}

	{#if tur.notAcik}
		<p class="border-b border-cizgi py-3 text-sm text-metin-ikincil" role="status">{c.t('tur.hazir_degil')}</p>
	{/if}
</header>
