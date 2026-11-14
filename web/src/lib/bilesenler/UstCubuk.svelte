<!-- Her sayfada ortak üst çubuk (docs/sayfalar.md "Her sayfada ortak"): logo, 7 sayfa, dil, tur. -->
<script lang="ts">
	import { page } from '$app/state';
	import Languages from '@lucide/svelte/icons/languages';
	import CirclePlay from '@lucide/svelte/icons/circle-play';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import InfoIcon from '@lucide/svelte/icons/info';
	import { ceviri } from '$lib/i18n/baglam';
	import { SAYFALAR, adres, karsiDilAdresi, type Sayfa } from '$lib/sayfalar';
	import { SAYFA_SIMGESI } from '$lib/simgeler';
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
	<ul class={mobil ? 'grid gap-1' : 'flex items-center gap-0.5'}>
		{#each SAYFALAR as sayfa (sayfa)}
			{@const Simge = SAYFA_SIMGESI[sayfa]}
			<li>
				<a
					href={adres(c.dil, sayfa)}
					aria-current={etkinMi(sayfa) ? 'page' : undefined}
					class="flex items-center gap-2 rounded-kutu px-2.5 text-sm font-medium whitespace-nowrap transition-colors {mobil
						? 'h-11'
						: 'h-9'} {etkinMi(sayfa)
						? 'bg-yuzey-2 text-metin'
						: 'text-metin-ikincil hover:bg-yuzey hover:text-metin'}"
				>
					<Simge class="size-4 shrink-0 {etkinMi(sayfa) ? 'text-vurgu' : ''}" aria-hidden="true" />
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
		class="inline-flex h-9 items-center gap-2 rounded-full border border-cizgi px-3 text-sm text-metin-ikincil transition-colors hover:border-cizgi-guclu hover:text-metin"
	>
		<Languages class="size-4" aria-hidden="true" />{c.t('menu.diger_dil')}
	</a>
	<button class="dugme-ikincil h-9" onclick={() => (tur.notAcik = !tur.notAcik)} aria-expanded={tur.notAcik}>
		<CirclePlay class="size-4" aria-hidden="true" />{c.t('tur.baslat')}
	</button>
{/snippet}

<header class="sticky top-0 z-20 border-b border-cizgi bg-zemin/85 backdrop-blur-md">
	<a
		href="#icerik"
		class="dugme-birincil absolute top-2 left-4 -translate-y-20 focus:translate-y-0">{c.t('menu.atla')}</a
	>
	<div class="kap flex h-16 items-center justify-between gap-4">
		<a href={adres(c.dil, 'ana')} class="flex items-center gap-2.5" aria-label={c.t('marka.ad')}>
			<Logo />
			<span class="font-baslik text-lg font-semibold tracking-wide text-metin">{c.t('marka.ad')}</span>
		</a>

		<nav class="hidden xl:block" aria-label={c.t('menu.ana_menu')}>{@render baglantilar(false)}</nav>
		<div class="hidden items-center gap-2 xl:flex">{@render araclar()}</div>

		<button
			class="dugme-ikincil h-10 xl:hidden"
			aria-expanded={menuAcik}
			aria-controls="mobil-menu"
			onclick={() => (menuAcik = !menuAcik)}
		>
			{#if menuAcik}<X class="size-4" aria-hidden="true" />{:else}<Menu class="size-4" aria-hidden="true" />{/if}
			{menuAcik ? c.t('menu.kapat') : c.t('menu.ac')}
		</button>
	</div>

	{#if menuAcik}
		<nav id="mobil-menu" class="kap grid gap-4 border-t border-cizgi py-4 xl:hidden" aria-label={c.t('menu.ana_menu')}>
			{@render baglantilar(true)}
			<div class="flex flex-wrap items-center gap-2">{@render araclar()}</div>
		</nav>
	{/if}

	{#if tur.notAcik}
		<div class="border-t border-cizgi bg-yuzey">
			<p class="kap flex items-center gap-2 py-2.5 text-sm text-metin-ikincil" role="status">
				<InfoIcon class="size-4 shrink-0 text-vurgu" aria-hidden="true" />{c.t('tur.hazir_degil')}
			</p>
		</div>
	{/if}
</header>
