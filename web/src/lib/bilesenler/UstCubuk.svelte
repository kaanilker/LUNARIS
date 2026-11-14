<!--
	Her sayfada ortak üst çubuk (docs/sayfalar.md "Her sayfada ortak"): logo, 7 sayfa, dil, tur.
	Bilerek ekrana yapışık ve bulanık değil, sağda düğme yok (docs/tasarim.md §3a). Simgeler kullanıcı isteğiyle.
	Etkin sekme çizgisi sayfa geçişinde bir sekmeden ötekine kayar (view-transition-name, animasyonlar H4).
-->
<script lang="ts">
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import Languages from '@lucide/svelte/icons/languages';
	import CirclePlay from '@lucide/svelte/icons/circle-play';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import { sure } from '$lib/hareket';
	import { SAYFA_SIMGESI } from '$lib/simgeler';
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
			{@const Simge = SAYFA_SIMGESI[sayfa]}
			{@const etkin = etkinMi(sayfa)}
			<li>
				<a
					href={adres(c.dil, sayfa)}
					aria-current={etkin ? 'page' : undefined}
					class="group relative flex items-center gap-2 text-sm whitespace-nowrap transition-colors duration-150 {mobil
						? 'h-11'
						: 'h-16'} {etkin ? 'text-metin' : 'text-metin-ikincil hover:text-metin'}"
				>
					<Simge
						class="size-4 shrink-0 transition-transform duration-200 ease-egri group-hover:-translate-y-0.5 group-hover:-rotate-6 {etkin
							? 'text-vurgu'
							: ''}"
						aria-hidden="true"
					/>
					{c.t(`menu.${sayfa}`)}
					{#if etkin && !mobil}
						<span class="absolute inset-x-0 -bottom-px h-0.5 bg-vurgu [view-transition-name:etkin-sekme]"></span>
					{/if}
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
		class="simgeli inline-flex h-9 items-center gap-2 text-sm text-metin-ikincil transition-colors duration-150 hover:text-metin"
		><Languages class="size-4" aria-hidden="true" />{c.t('menu.diger_dil')}</a
	>
	<button
		class="simgeli inline-flex h-9 items-center gap-2 text-sm text-metin transition-colors duration-150"
		onclick={() => (tur.notAcik = !tur.notAcik)}
		aria-expanded={tur.notAcik}><CirclePlay class="size-4" aria-hidden="true" />{c.t('tur.baslat')}</button
	>
{/snippet}

<header class="kap [view-transition-name:ust-cubuk]">
	<a href="#icerik" class="dugme-birincil absolute top-2 left-4 -translate-y-20 focus:translate-y-0">{c.t('menu.atla')}</a>
	<div class="flex h-16 items-center gap-8 border-b border-cizgi">
		<a href={adres(c.dil, 'ana')} class="group flex shrink-0 items-center gap-2.5" aria-label={c.t('marka.ad')}>
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
			{#if menuAcik}<X class="size-4" aria-hidden="true" />{:else}<Menu class="size-4" aria-hidden="true" />{/if}
			{menuAcik ? c.t('menu.kapat') : c.t('menu.ac')}
		</button>
	</div>

	{#if menuAcik}
		<nav
			id="mobil-menu"
			class="grid gap-4 border-b border-cizgi py-4 xl:hidden"
			aria-label={c.t('menu.ana_menu')}
			transition:slide={{ duration: sure(220) }}
		>
			{@render baglantilar(true)}
			<div class="flex flex-wrap items-center gap-5">{@render araclar()}</div>
		</nav>
	{/if}

	{#if tur.notAcik}
		<p
			class="border-b border-cizgi py-3 text-sm text-metin-ikincil"
			role="status"
			transition:slide={{ duration: sure(220) }}
		>
			{c.t('tur.hazir_degil')}
		</p>
	{/if}
</header>
