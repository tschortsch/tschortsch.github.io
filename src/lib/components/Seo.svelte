<script lang="ts">
	// @ts-expect-error enhanced images with imagetools options are not correctly typed
	import AvatarImage from '$lib/assets/juerg.jpg?enhanced&w=1200&h=630&fit=contain';

	interface SeoProps {
		title: string;
		description: string;
		robots?: string;
		disableIndexing?: boolean;
		twitterCard?: string;
	}

	let {
		title = '',
		description = '',
		robots = 'index,follow',
		disableIndexing = false,
		twitterCard = 'summary_large_image',
	}: SeoProps = $props();
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="robots" content={disableIndexing ? 'noindex,nofollow' : robots} />
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta name="twitter:card" content={twitterCard} />
	<meta property="og:image" content={AvatarImage.img.src} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
</svelte:head>
