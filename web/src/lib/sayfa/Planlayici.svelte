<!--
	Planlayıcı (docs/sayfalar.md §2, hesap tarafı docs/oneri-ve-dogrulama.md).
	Girdiler şimdilik yalnız sayfa içinde tutulur; senaryo deposu ve adres eşlemesi ayrı iş (docs/mimari.md §7).
-->
<script lang="ts">
	import Share2 from '@lucide/svelte/icons/share-2';
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import Panel from '$lib/bilesenler/Panel.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';
	import AiYorum from '$lib/bilesenler/AiYorum.svelte';
	import KutupIzgara from '$lib/cizim/KutupIzgara.svelte';

	const c = ceviri();
	const YOLLAR = ['dogrudan', 'faz', 'dusuk'] as const;
	const ADAY_SATIRI = 5;

	let tarih = $state(new Date().toISOString().slice(0, 10));
	let yol = $state<(typeof YOLLAR)[number]>('dogrudan');

	const tarihYazisi = $derived(
		tarih
			? new Intl.DateTimeFormat(c.dil, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(tarih))
			: '—'
	);
	const yonler = $derived([
		'0°',
		`90° ${c.t('yon.dogu')}`,
		'180°',
		`90° ${c.t('yon.bati')}`
	] as [string, string, string, string]);
</script>

<SayfaBasi sayfa="planla" baslik={c.t('planla.baslik')} giris={c.t('planla.giris')} />

<div class="kap grid grid-cols-12 items-start gap-6" data-izgara>
	<!-- Senaryo -->
	<Panel baslik={c.t('planla.senaryo')} sinif="col-span-12 lg:col-span-4 lg:sticky lg:top-24">
		<form class="flex flex-col gap-6" onsubmit={(e) => e.preventDefault()}>
			<label class="flex flex-col gap-2">
				<span class="text-sm font-medium text-metin">{c.t('planla.tarih')}</span>
				<input type="date" bind:value={tarih} />
			</label>

			<div class="flex flex-col gap-2">
				<label class="flex flex-col gap-2">
					<span class="text-sm font-medium text-metin">{c.t('planla.kalkis')}</span>
					<select disabled><option>{c.t('planla.kalkis_sec')}</option></select>
				</label>
				<YerTutucu satir metin={c.t('planla.kalkis_bekliyor')} girdi="B18" />
				<p class="text-xs text-metin-ikincil">{c.t('planla.kalkis_etki')}</p>
			</div>

			<fieldset class="flex flex-col gap-2">
				<legend class="mb-2 text-sm font-medium text-metin">{c.t('planla.yol')}</legend>
				<div class="grid grid-cols-3 gap-1 rounded-kutu border border-cizgi bg-zemin/40 p-1">
					{#each YOLLAR as y (y)}
						<label
							class="flex min-h-9 cursor-pointer items-center justify-center rounded-kutu px-2 text-center text-xs font-medium transition-colors has-checked:bg-yuzey-2 has-checked:text-metin has-focus-visible:outline-2 has-focus-visible:outline-vurgu {yol ===
							y
								? ''
								: 'text-metin-ikincil hover:text-metin'}"
						>
							<input class="sr-only" type="radio" name="yol" value={y} bind:group={yol} />
							{c.t(`planla.yol_${y}`)}
						</label>
					{/each}
				</div>
				<YerTutucu satir metin={c.t('planla.yol_sure')} girdi="S.7" />
			</fieldset>

			<div class="flex flex-col gap-2">
				<label class="flex flex-col gap-3">
					<span class="text-sm font-medium text-metin">{c.t('planla.gecikme')}</span>
					<input type="range" disabled />
				</label>
				<p class="text-xs text-metin-ikincil">{c.t('planla.gecikme_soru')}</p>
				<YerTutucu satir metin={c.t('planla.gecikme_bekliyor')} girdi="S.7, 3.2" />
			</div>
		</form>
	</Panel>

	<!-- Sonuçlar -->
	<div class="col-span-12 flex min-w-0 flex-col gap-6 lg:col-span-8">
		<Panel baslik={c.t('planla.tarihler')} bekliyor>
			<dl class="grid gap-3 sm:grid-cols-3">
				<div class="flex flex-col gap-1 rounded-kutu border border-cizgi bg-yuzey-2 p-4">
					<dt class="text-xs text-metin-ikincil">{c.t('planla.tarih_secilen')}</dt>
					<dd class="font-baslik text-lg font-semibold text-metin tabular-nums">{tarihYazisi}</dd>
				</div>
				<div class="flex flex-col gap-1 rounded-kutu border border-dashed border-cizgi p-4">
					<dt class="text-xs text-metin-ikincil">{c.t('planla.tarih_yakin')}</dt>
					<dd class="font-baslik text-lg font-semibold text-metin-ikincil">—</dd>
				</div>
				<div class="flex flex-col gap-1 rounded-kutu border border-dashed border-cizgi p-4">
					<dt class="text-xs text-metin-ikincil">{c.t('planla.tarih_onerilen')}</dt>
					<dd class="font-baslik text-lg font-semibold text-metin-ikincil">—</dd>
				</div>
			</dl>
			<YerTutucu satir metin={c.t('planla.tarih_hesap')} girdi="B3, B18" />
		</Panel>

		<Panel baslik={c.t('planla.harita')} bekliyor>
			<YerTutucu metin={c.t('planla.harita_not')} girdi="B4, P1, 7.1">
				<KutupIzgara etiketler={yonler} />
			</YerTutucu>
		</Panel>

		<Panel baslik={c.t('planla.sonuc')} bekliyor>
			<p class="-mt-2 text-sm text-metin-ikincil">{c.t('planla.sonuc_not')}</p>
			<div class="overflow-x-auto rounded-kutu border border-cizgi">
				<table class="text-sm">
					<thead class="bg-yuzey-2 text-left text-xs text-metin-ikincil">
						<tr>
							<th class="px-4 py-3 font-medium">{c.t('planla.sutun_sira')}</th>
							<th class="px-4 py-3 font-medium">{c.t('planla.sutun_parsel')}</th>
							<th class="px-4 py-3 font-medium whitespace-nowrap">{c.t('planla.sutun_gunes')}</th>
							<th class="px-4 py-3 font-medium whitespace-nowrap">{c.t('planla.sutun_iletisim')}</th>
							<th class="px-4 py-3 font-medium whitespace-nowrap">{c.t('planla.sutun_karanlik')}</th>
							<th class="px-4 py-3 font-medium">{c.t('planla.sutun_rozet')}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-cizgi text-metin-ikincil">
						{#each { length: ADAY_SATIRI }, i (i)}
							<tr>
								<td class="px-4 py-3 tabular-nums">{i + 1}</td>
								<td class="px-4 py-3">—</td>
								<td class="px-4 py-3">—</td>
								<td class="px-4 py-3">—</td>
								<td class="px-4 py-3">—</td>
								<td class="px-4 py-3">
									<span class="flex gap-1">
										{#each ['T1', 'T2', 'T3', 'T4'] as test (test)}
											<span class="rounded-full border border-dashed border-cizgi-guclu px-2 py-0.5 text-[11px]">{test}</span>
										{/each}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<YerTutucu satir metin={c.t('planla.sonuc_bekliyor')} girdi="B9, B20, 7.1" />
		</Panel>

		<AiYorum />

		<div>
			<button class="dugme-ikincil" disabled><Share2 class="size-4" aria-hidden="true" />{c.t('planla.paylas')}</button>
		</div>
	</div>
</div>
