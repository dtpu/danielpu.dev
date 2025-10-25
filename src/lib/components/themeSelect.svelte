<script lang="ts">
	import { themeStore } from '$lib/stores/themeStore.svelte';
	import { themes } from '$lib/data/themes';

	const themePrimaries: { [key: string]: string } = {};
	for (const themeName of Object.keys(themes)) {
		const theme = themes[themeName];
		themePrimaries[themeName] = `rgb(${theme[0].join(',')})`;
	}
</script>

<div class="flex flex-row gap-4 md:w-10 md:flex-col">
	{#each Object.entries(themePrimaries) as [themeName, colour] (themeName)}
		<button
			onclick={() => themeStore.setTheme(themeName)}
			aria-label="Change Theme to {themeName}"
			class={`bg-primary relative aspect-square h-4 w-4
            items-center justify-center overflow-hidden rounded-full border-2
            border-gray-400/10 p-4 hover:border-black/20 focus:outline-none ${themeStore.name === themeName ? 'ring-primary ring-2 ring-offset-2' : ''}`}
			style="background-color: {colour};"
		>
		</button>
	{/each}
	<h6 class="font-title cursor-vertical-text align-middle text-2xl [writing-mode:vertical-lr]">
		{themeStore.name}
	</h6>
</div>
