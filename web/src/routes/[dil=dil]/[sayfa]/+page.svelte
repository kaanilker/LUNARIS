<script lang="ts">
	import Planlayici from '$lib/sayfa/Planlayici.svelte';
	import Uzman from '$lib/sayfa/Uzman.svelte';
	import SiteDetay from '$lib/sayfa/SiteDetay.svelte';
	import Karsilastir from '$lib/sayfa/Karsilastir.svelte';
	import Gorevler from '$lib/sayfa/Gorevler.svelte';
	import Hakkinda from '$lib/sayfa/Hakkinda.svelte';

	let { data } = $props();

	const BILESENLER = {
		planla: Planlayici,
		uzman: Uzman,
		site: SiteDetay,
		karsilastir: Karsilastir,
		gorevler: Gorevler,
		hakkinda: Hakkinda
	};
	const Bilesen = $derived(BILESENLER[data.sayfa]);
</script>

<Bilesen />
