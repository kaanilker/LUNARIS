<!--
	Planlayıcı (docs/sayfalar.md §2, hesap tarafı docs/oneri-ve-dogrulama.md).
	Girdiler şimdilik yalnız sayfa içinde tutulur; senaryo deposu ve adres eşlemesi ayrı iş (docs/mimari.md §7).
-->
<script lang="ts">
	import { ceviri } from '$lib/i18n/baglam';
	import SayfaBasi from '$lib/bilesenler/SayfaBasi.svelte';
	import YerTutucu from '$lib/bilesenler/YerTutucu.svelte';
	import AiYorum from '$lib/bilesenler/AiYorum.svelte';

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
</script>

<SayfaBasi sayfa="planla" baslik={c.t('planla.baslik')} giris={c.t('planla.giris')} />

<div class="kap duzen">
	<form class="girdiler kart" onsubmit={(e) => e.preventDefault()} aria-labelledby="senaryo">
		<h2 id="senaryo" class="ust-etiket">{c.t('planla.senaryo')}</h2>

		<label class="alan">
			<span>{c.t('planla.tarih')}</span>
			<input type="date" bind:value={tarih} />
		</label>

		<label class="alan">
			<span>{c.t('planla.kalkis')}</span>
			<select disabled>
				<option>{c.t('planla.kalkis_sec')}</option>
			</select>
		</label>
		<YerTutucu metin={c.t('planla.kalkis_bekliyor')} girdi="B18" />
		<p class="ikincil kucuk">{c.t('planla.kalkis_etki')}</p>

		<fieldset>
			<legend>{c.t('planla.yol')}</legend>
			<div class="secenekler">
				{#each YOLLAR as y (y)}
					<label class="secenek">
						<input type="radio" name="yol" value={y} bind:group={yol} />
						<span>{c.t(`planla.yol_${y}`)}</span>
					</label>
				{/each}
			</div>
		</fieldset>
		<YerTutucu metin={c.t('planla.yol_sure')} girdi="S.7" />

		<label class="alan">
			<span>{c.t('planla.gecikme')} · {c.t('planla.gecikme_soru')}</span>
			<input type="range" disabled />
		</label>
		<YerTutucu metin={c.t('planla.gecikme_bekliyor')} girdi="S.7 · 3.2" />
	</form>

	<div class="sonuclar">
		<section class="kart" aria-labelledby="tarihler">
			<h2 id="tarihler" class="ust-etiket">{c.t('planla.tarihler')}</h2>
			<dl class="tarihler">
				<div>
					<dt>{c.t('planla.tarih_secilen')}</dt>
					<dd class="sayi">{tarihYazisi}</dd>
				</div>
				<div>
					<dt>{c.t('planla.tarih_yakin')}</dt>
					<dd class="sayi">—</dd>
				</div>
				<div>
					<dt>{c.t('planla.tarih_onerilen')}</dt>
					<dd class="sayi">—</dd>
				</div>
			</dl>
			<YerTutucu metin={c.t('planla.tarih_hesap')} girdi="B3 · B18" />
		</section>

		<section class="harita" aria-labelledby="harita">
			<h2 id="harita" class="ust-etiket">{c.t('planla.harita')}</h2>
			<YerTutucu metin={c.t('planla.harita_not')} girdi="B4 · P1 · 7.1" kutu yukseklik="20rem">
				<svg viewBox="0 0 200 200" class="kutup-izgara" aria-hidden="true">
					{#each [30, 55, 80] as r (r)}
						<circle cx="100" cy="100" {r} fill="none" stroke="var(--cizgi)" />
					{/each}
					{#each [0, 45, 90, 135] as a (a)}
						<line
							x1="100"
							y1="20"
							x2="100"
							y2="180"
							stroke="var(--cizgi)"
							transform={`rotate(${a} 100 100)`}
						/>
					{/each}
				</svg>
			</YerTutucu>
		</section>

		<section aria-labelledby="sonuc">
			<div class="bolum-basi">
				<h2 id="sonuc">{c.t('planla.sonuc')}</h2>
				<p class="ikincil">{c.t('planla.sonuc_not')}</p>
			</div>
			<div class="tablo-kap">
				<table>
					<thead>
						<tr>
							<th>{c.t('planla.sutun_sira')}</th>
							<th>{c.t('planla.sutun_parsel')}</th>
							<th>{c.t('planla.sutun_gunes')}</th>
							<th>{c.t('planla.sutun_iletisim')}</th>
							<th>{c.t('planla.sutun_karanlik')}</th>
							<th>{c.t('planla.sutun_rozet')}</th>
						</tr>
					</thead>
					<tbody>
						{#each { length: ADAY_SATIRI }, i (i)}
							<tr class="bos">
								<td class="sayi">{i + 1}</td>
								<td class="sayi">—</td>
								<td class="sayi">—</td>
								<td class="sayi">—</td>
								<td class="sayi">—</td>
								<td class="sayi">T1 T2 T3 T4</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<YerTutucu metin={c.t('planla.sonuc_bekliyor')} girdi="B9 · B20 · 7.1" />
		</section>

		<AiYorum />

		<p><button class="dugme ikinci" disabled>{c.t('planla.paylas')}</button></p>
	</div>
</div>

<style>
	.duzen {
		display: grid;
		gap: var(--b5);
		align-items: start;
	}

	.girdiler {
		gap: var(--b4);
	}

	.kucuk {
		font-size: var(--boyut-kucuk);
	}

	.secenekler {
		display: flex;
		flex-wrap: wrap;
		gap: var(--b2) var(--b4);
	}

	.secenek {
		display: inline-flex;
		align-items: center;
		gap: var(--b2);
		min-height: 2.75rem;
		cursor: pointer;
	}

	.secenek input {
		min-height: auto;
		width: 1.5rem;
		height: 1.5rem;
		accent-color: var(--vurgu);
	}

	input[type='range'] {
		padding: 0;
		accent-color: var(--vurgu);
	}

	.sonuclar {
		display: grid;
		gap: var(--b6);
		min-width: 0;
	}

	.sonuclar > section {
		display: grid;
		gap: var(--b4);
	}

	.tarihler {
		margin: 0;
		display: grid;
		gap: var(--b3);
	}

	.tarihler div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--b2);
		padding-bottom: var(--b3);
		border-bottom: var(--cizgi-kalinlik) solid var(--cizgi);
	}

	dt {
		color: var(--metin-ikincil);
	}

	dd {
		margin: 0;
	}

	.kutup-izgara {
		width: min(100%, 16rem);
	}

	.bos td {
		color: var(--metin-ikincil);
	}

	@media (min-width: 60rem) {
		.duzen {
			grid-template-columns: minmax(18rem, 22rem) 1fr;
		}

		.girdiler {
			position: sticky;
			top: 4.5rem;
		}
	}
</style>
