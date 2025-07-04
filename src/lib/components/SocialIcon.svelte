<script lang="ts" module>
	export type SocialIconType = {
		IconComponent: Icon;
		label: string;
		url: string;
	} & WithClass;
</script>

<script lang="ts">
	import { type Icon } from '@tabler/icons-svelte';
	import type { WithClass } from '$lib/types';

	type Props = SocialIconType;

	let { url, label, class: className, IconComponent }: Props = $props();
</script>

<a
	href={url}
	title={label}
	class={[
		'rounded-full bg-black p-3 text-white transition-transform duration-300 hover:scale-105 hover:shadow-md',
		className,
	]}
>
	<IconComponent stroke={1.5} />
</a>
