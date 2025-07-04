<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Seo from '$lib/components/Seo.svelte';

	let { children } = $props();
</script>

<Seo title="Jürg Hunziker - Portfolio" description="Portfolio page of Jürg Hunziker" />

<ModeWatcher />

{@render children()}
