<script lang="ts">
	import {
		IconBalloon,
		IconBrandBluesky,
		IconBrandFacebook,
		IconBrandGithub,
		IconBrandLinkedin,
		IconBrandX,
		IconBriefcase,
		IconCode,
		IconHeartFilled,
		IconHome,
		IconMapPin,
		IconSchool,
	} from '@tabler/icons-svelte';
	import { getYear } from 'date-fns';
	import DarkModeToggler from '$lib/components/DarkModeToggler.svelte';
	import Keyfact, { type KeyfactType } from '$lib/components/Keyfact.svelte';
	import SocialIcon, { type SocialIconType } from '$lib/components/SocialIcon.svelte';
	import { getAge } from '$lib/utils/core.js';

	const socialIcons: SocialIconType[] = [
		{
			IconComponent: IconBrandGithub,
			label: 'GitHub',
			url: 'https://github.com/tschortsch',
			class: 'bg-github',
		},
		{
			IconComponent: IconBrandLinkedin,
			label: 'LinkedIn',
			url: 'https://www.linkedin.com/in/juerghunziker',
			class: 'bg-linkedin',
		},
		{
			IconComponent: IconBrandBluesky,
			label: 'Bluesky',
			url: 'https://bsky.app/profile/tschortsch85.bsky.social',
			class: 'bg-bsky',
		},
		{
			IconComponent: IconBrandX,
			label: 'X',
			url: 'https://x.com/tschortsch85',
			class: 'bg-x',
		},
		{
			IconComponent: IconBrandFacebook,
			label: 'Facebook',
			url: 'https://www.facebook.com/juerg.hunziker',
			class: 'bg-facebook',
		},
	];

	const keyfacts: KeyfactType[] = [
		{
			IconComponent: IconMapPin,
			description: 'Eglisau, Switzerland',
		},
		{
			IconComponent: IconBalloon,
			description: `${getAge(new Date('1985-05-02'))} years old`,
		},
		{
			IconComponent: IconBriefcase,
			description: 'Co-founder & Software Developer at <a href="https://neovo.ch">Neovo AG</a>',
		},
		{
			IconComponent: IconSchool,
			description:
				'Bachelor of Science in Information Technology / OST Ostschweizer Fachhochschule (formerly HSR Hochschule für Technik Rapperswil)',
		},
		{
			IconComponent: IconHome,
			description:
				'Developing the web, logging the web, loving the web... and sometimes I even go outside.',
		},
	];
</script>

<main class="mx-auto flex max-w-[500px] flex-col items-center px-5 py-10">
	<DarkModeToggler
		class="bg-background/30 fixed top-0 right-0 m-5 rounded-full p-4 backdrop-blur-xs"
	/>

	<div class="mb-5 aspect-square w-full max-w-[250px]">
		<enhanced:img
			src="$lib/assets/juerg.jpg?aspect=1:1&w=250;500"
			sizes="(min-width: 250px) 250px, 100vw"
			alt="Jürg Hunziker"
			class="aspect-square w-full max-w-[250px] rounded-full object-cover shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:shadow-white/10 dark:hover:shadow-white/10"
		/>
	</div>

	<h1 class="mb-5">Jürg Hunziker</h1>
	<ul class="mb-10 flex flex-wrap justify-center gap-3">
		{#each socialIcons as socialIcon, index (index)}
			<li class="flex gap-3">
				<SocialIcon {...socialIcon} />
			</li>
		{/each}
	</ul>
	<div class="w-full">
		<ul>
			{#each keyfacts as keyfact, index (index)}
				<li class="mb-2 flex gap-3">
					<Keyfact {...keyfact} />
				</li>
			{/each}
		</ul>
	</div>

	<footer class="mt-10 w-full">
		<hr class="mb-3" />
		<p class="text-muted flex items-center justify-center text-sm">
			&copy; {getYear(Date.now())}
			<IconCode size={16} stroke={1.5} aria-label="built" class="mx-1" /> with <IconHeartFilled
				size={16}
				stroke={1.5}
				aria-label="love"
				class="mx-1"
			/> by Jürg Hunziker
		</p>
	</footer>
</main>
