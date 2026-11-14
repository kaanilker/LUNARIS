<script lang="ts">
	import SiteDetay from '$lib/sayfa/SiteDetay.svelte';

	let { data } = $props();
</script>

<SiteDetay parsel={data.parsel} />
