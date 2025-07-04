<script lang="ts">
	import { IconMoon, IconSun } from '@tabler/icons-svelte';
	import { mode, toggleMode } from 'mode-watcher';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import type { WithClass } from '$lib/types';
	import { cn } from '$lib/utils/core';

	let { class: className }: WithClass = $props();
</script>

<button
	onclick={toggleMode}
	role="switch"
	aria-checked={mode.current === 'light'}
	title={mode.current === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
	class={cn(
		'rounded-input hover:bg-dark-10 focus-visible:ring-foreground focus-visible:ring-offset-background relative inline-flex h-10 w-10 cursor-pointer items-center justify-center px-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
		className,
	)}
>
	{#if mode.current === 'dark'}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{
				delay: 50,
				duration: 200,
				start: 0.7,
				easing: cubicOut,
			}}
		>
			<IconSun class="size-6" aria-hidden />
		</div>
	{:else}
		<div
			class="absolute inline-flex h-full w-full items-center justify-center"
			transition:scale={{
				delay: 50,
				duration: 200,
				start: 0.7,
				easing: cubicOut,
			}}
		>
			<IconMoon class="size-6" aria-hidden />
		</div>
	{/if}
</button>
