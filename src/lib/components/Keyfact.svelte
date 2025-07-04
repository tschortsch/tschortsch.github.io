<script lang="ts" module>
	export type KeyfactType = {
		IconComponent: Icon;
		description: string;
	} & WithClass;
</script>

<script lang="ts">
	import { type Icon } from '@tabler/icons-svelte';
	import type { WithClass } from '$lib/types';
	import { cn } from '$lib/utils/core';

	type Props = KeyfactType;

	let { description, class: className, IconComponent }: Props = $props();
</script>

<IconComponent stroke={1.5} class={cn(['text-muted shrink-0', className])} />
<div>
	{@html description}
</div>
