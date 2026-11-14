<!-- Her sayfada ortak üst çubuk (docs/sayfalar.md "Her sayfada ortak"): logo, 7 sayfa, dil, tur. -->
<script lang="ts">
	import { page } from '$app/state';
	import { ceviri } from '$lib/i18n/baglam';
	import { SAYFALAR, adres, karsiDilAdresi, type Sayfa } from '$lib/sayfalar';
	import { tur } from '$lib/tur.svelte';

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

<header class="ust">
	<a class="atla" href="#icerik">{c.t('menu.atla')}</a>
	<div class="satir kap">
		<a class="logo" href={adres(c.dil, 'ana')} aria-label={c.t('marka.ad')}>
			<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
				<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5" />
				<path d="M2 14.5c3.5 2.6 16.5 2.6 20 0" fill="none" stroke="currentColor" stroke-width="1.5" />
			</svg>
			<span>{c.t('marka.ad')}</span>
		</a>

		<button
			class="menu-dugme"
			aria-expanded={menuAcik}
			aria-controls="ana-menu"
			onclick={() => (menuAcik = !menuAcik)}
		>
			{menuAcik ? c.t('menu.kapat') : c.t('menu.ac')}
		</button>

		<nav id="ana-menu" class:acik={menuAcik} aria-label={c.t('menu.ana_menu')}>
			<ul>
				{#each SAYFALAR as sayfa (sayfa)}
					<li>
						<a href={adres(c.dil, sayfa)} aria-current={etkinMi(sayfa) ? 'page' : undefined}
							>{c.t(`menu.${sayfa}`)}</a
						>
					</li>
				{/each}
			</ul>
			<div class="araclar">
				<a
					class="dil"
					href={karsiDilAdresi(page.url.pathname, karsiDil)}
					hreflang={karsiDil}
					lang={karsiDil}
					data-sveltekit-noscroll>{c.t('menu.diger_dil')}</a
				>
				<button class="dugme ikinci tur" onclick={() => (tur.notAcik = !tur.notAcik)} aria-expanded={tur.notAcik}>
					{c.t('tur.baslat')}
				</button>
			</div>
		</nav>
	</div>
	{#if tur.notAcik}
		<p class="tur-notu kap" role="status">{c.t('tur.hazir_degil')}</p>
	{/if}
</header>

<style>
	.ust {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--zemin);
		border-bottom: var(--cizgi-kalinlik) solid var(--cizgi);
	}

	.atla {
		position: absolute;
		left: var(--b4);
		top: -10rem;
		padding: var(--b2) var(--b4);
		background: var(--vurgu);
		color: var(--vurgu-uzerine);
	}

	.atla:focus {
		top: var(--b2);
	}

	.satir {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--b3);
		min-height: 3.5rem;
	}

	.logo {
		display: inline-flex;
		align-items: center;
		gap: var(--b2);
		font-weight: 600;
		letter-spacing: 0.12em;
		text-decoration: none;
		min-height: 2.75rem;
	}

	.menu-dugme {
		min-height: 2.75rem;
		padding: 0 var(--b4);
		background: transparent;
		border: var(--cizgi-kalinlik) solid var(--cizgi-guclu);
		border-radius: var(--yaricap);
		cursor: pointer;
	}

	nav {
		display: none;
		flex-basis: 100%;
		padding-bottom: var(--b4);
	}

	nav.acik {
		display: grid;
		gap: var(--b4);
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
	}

	nav a:not(.dil) {
		display: flex;
		align-items: center;
		min-height: 2.75rem;
		text-decoration: none;
		color: var(--metin-ikincil);
		border-bottom: 2px solid transparent;
	}

	nav a:hover,
	nav a[aria-current='page'] {
		color: var(--metin);
	}

	nav a[aria-current='page'] {
		border-bottom-color: var(--vurgu);
	}

	.araclar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--b4);
	}

	.dil {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		font-size: var(--boyut-kucuk);
	}

	.tur-notu {
		padding-block: var(--b3);
		color: var(--metin-ikincil);
		font-size: var(--boyut-kucuk);
		max-width: none;
	}

	@media (min-width: 68rem) {
		.menu-dugme {
			display: none;
		}

		nav,
		nav.acik {
			display: flex;
			flex-basis: auto;
			align-items: center;
			gap: var(--b5);
			padding: 0;
		}

		ul {
			display: flex;
			gap: var(--b4);
		}

		nav a:not(.dil) {
			font-size: 0.9375rem;
		}
	}
</style>
