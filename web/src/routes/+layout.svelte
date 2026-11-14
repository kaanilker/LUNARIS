<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource-variable/outfit';
	import '@fontsource/ibm-plex-mono/400.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

{@render children()}
