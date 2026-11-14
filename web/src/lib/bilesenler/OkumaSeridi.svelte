<!--
	Konsol okuma şeridi: yan yana göstergeler tek panelde, dikey çizgilerle bölünmüş (docs/tasarim.md §3).
	anlam 'gunes' ya da 'dunya' yalnız o gök cismine ait değerde verilir (§2); renk tek başına anlam taşımasın
	diye yanında simge de durur. deger verilmezse boş değerin yanında "Yer tutucu" rozeti görünür.
-->
<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Earth from '@lucide/svelte/icons/earth';
	import { ceviri } from '$lib/i18n/baglam';
	import Rozet from './Rozet.svelte';

	type Olcum = {
		etiket: string;
		deger?: string;
		birim?: string;
		/** Parametre setindeki formül numarası; değer değil, kaynağı gösterir. */
		formul?: string;
		anlam?: 'gunes' | 'dunya';
	};

	let { olcumler, sinif = '' }: { olcumler: Olcum[]; sinif?: string } = $props();
	const c = ceviri();
	// Tailwind sınıf adını kaynakta tam görmeli; dinamik birleştirme çalışmaz.
	const SUTUN: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };
</script>

<div data-panel class="flex min-w-0 flex-col rounded-kart border border-cizgi bg-yuzey {sinif}">
	<dl class="grid divide-y divide-cizgi md:divide-x md:divide-y-0 {SUTUN[olcumler.length]}">
		{#each olcumler as o (o.etiket)}
			<div class="flex flex-col gap-3 p-5 sm:p-6">
				<dt class="flex items-center gap-2 text-sm text-metin-ikincil">
					{#if o.anlam === 'gunes'}<Sun class="size-4 text-gunes" aria-hidden="true" />{/if}
					{#if o.anlam === 'dunya'}<Earth class="size-4 text-dunya" aria-hidden="true" />{/if}
					{o.etiket}
				</dt>
				<dd class="flex flex-col gap-1">
					<span class="flex items-center gap-3">
						<span class="font-baslik text-3xl font-semibold text-metin [font-stretch:112%]">
							{o.deger ?? '—'}{#if o.deger && o.birim}<span class="ml-1 text-sm font-normal text-metin-ikincil">{o.birim}</span>{/if}
						</span>
						{#if !o.deger}<Rozet tur="yer">{c.t('yer_tutucu.etiket')}</Rozet>{/if}
					</span>
					{#if o.formul}<span class="text-xs text-metin-ikincil">{c.t('yer_tutucu.formul')} {o.formul}</span>{/if}
				</dd>
			</div>
		{/each}
	</dl>
</div>
