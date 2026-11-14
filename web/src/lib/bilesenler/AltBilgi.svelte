<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';

	const c = ceviri();
	const REPO = 'https://github.com/kaanilker/LUNARIS';
</script>

<footer class="alt">
	<div class="kap satir">
		<p>
			<strong>{c.t('marka.ad')}</strong>
			<span class="ikincil">{c.t('marka.acilim')}</span>
		</p>
		<p class="ikincil">{c.t('alt.metin')}</p>
		<p class="ikincil">
			<a href={REPO} rel="noopener">{c.t('alt.kaynak')}</a> · {c.t('alt.lisans')}
		</p>
	</div>
</footer>

<style>
	.alt {
		margin-top: var(--b9);
		border-top: var(--cizgi-kalinlik) solid var(--cizgi);
		padding-block: var(--b6);
		font-size: var(--boyut-kucuk);
	}

	.satir {
		display: grid;
		gap: var(--b2);
	}

	strong {
		letter-spacing: 0.12em;
		margin-right: var(--b2);
	}

	a {
		display: inline-block;
		padding-block: var(--b1);
	}
</style>
