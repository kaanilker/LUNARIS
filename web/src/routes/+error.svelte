<script lang="ts">
	import { page } from '$app/state';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { cevirmen } from '$lib/i18n';
	import { VARSAYILAN_DIL, adres, dilMi } from '$lib/sayfalar';

	const ilk = $derived(page.url.pathname.split('/')[1] ?? '');
	const dil = $derived(dilMi(ilk) ? ilk : VARSAYILAN_DIL);
	const t = $derived(cevirmen(dil));
</script>

<svelte:head>
	<title>{t('hata.baslik')} · {t('marka.ad')}</title>
</svelte:head>

<main class="kap grid min-h-dvh place-items-center" lang={dil}>
	<div class="flex max-w-md flex-col items-center gap-4 rounded-kart border border-cizgi bg-yuzey p-10 text-center">
		<p class="rounded-full border border-cizgi bg-yuzey-2 px-3 py-1 font-kod text-xs text-metin-ikincil">{page.status}</p>
		<h1 class="text-3xl font-semibold text-metin">{t('hata.baslik')}</h1>
		<p class="text-metin-ikincil">{t('hata.metin')}</p>
		<a class="dugme-birincil mt-2" href={adres(dil, 'ana')}><ArrowLeft class="size-4" aria-hidden="true" />{t('hata.don')}</a>
	</div>
</main>
