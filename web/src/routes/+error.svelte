<script lang="ts">
	import { page } from '$app/state';
	import { cevirmen } from '$lib/i18n';
	import { VARSAYILAN_DIL, adres, dilMi } from '$lib/sayfalar';

	const ilk = $derived(page.url.pathname.split('/')[1] ?? '');
	const dil = $derived(dilMi(ilk) ? ilk : VARSAYILAN_DIL);
	const t = $derived(cevirmen(dil));
</script>

<svelte:head>
	<title>{t('hata.baslik')} · {t('marka.ad')}</title>
</svelte:head>

<main class="hata kap" lang={dil}>
	<p class="ust-etiket sayi">{page.status}</p>
	<h1>{t('hata.baslik')}</h1>
	<p class="ikincil">{t('hata.metin')}</p>
	<p><a class="dugme" href={adres(dil, 'ana')}>{t('hata.don')}</a></p>
</main>

<style>
	.hata {
		display: grid;
		gap: var(--b4);
		padding-block: var(--b9);
	}
</style>
