<script lang="ts">
	import CodeXml from '@lucide/svelte/icons/code-xml';
	import { ceviri } from '$lib/i18n/baglam';

	const c = ceviri();
	const REPO = 'https://github.com/kaanilker/LUNARIS';
</script>

<footer class="mt-20 border-t border-cizgi">
	<div class="kap flex flex-col items-center justify-between gap-3 py-8 text-sm text-metin-ikincil sm:flex-row">
		<p>
			<span class="mr-3 font-baslik font-semibold text-metin [font-stretch:118%]">{c.t('marka.ad')}</span>{c.t('alt.metin')}
		</p>
		<p class="flex items-center gap-4">
			<a href={REPO} rel="noopener" class="inline-flex h-9 items-center gap-2 transition-colors hover:text-metin">
				<CodeXml class="size-4" aria-hidden="true" />{c.t('alt.kaynak')}
			</a>
			<span>{c.t('alt.lisans')}</span>
		</p>
	</div>
</footer>
