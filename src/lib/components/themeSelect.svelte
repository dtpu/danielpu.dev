<script lang="ts">
	import { themeStore } from '$lib/stores/themeStore.svelte';
	import { themes } from '$lib/data/themes';

	const themePrimaries: { [key: string]: string } = {};
	for (const themeName of Object.keys(themes)) {
		const theme = themes[themeName];
		themePrimaries[themeName] = `rgb(${theme[0].join(',')})`;
	}
</script>

<div class="flex flex-row gap-3 md:w-10 md:flex-col">
	{#each Object.entries(themePrimaries) as [themeName, colour] (themeName)}
		<button
			onclick={() => themeStore.setTheme(themeName)}
			aria-label="Change Theme to {themeName}"
			title={themeName}
			class="theme-btn group border-secondary/20 hover:border-secondary/50 relative aspect-square h-4 w-4 items-center justify-center overflow-hidden rounded-full border-2 p-4 hover:scale-110 focus:outline-none active:scale-95 {themeStore.name ===
			themeName
				? 'ring-primary active ring-offset-background ring-2 ring-offset-2'
				: ''}"
			style="background-color: {colour};"
		>
			<span class="expand-circle"></span>
		</button>
	{/each}
	<h6
		class="font-title text-secondary cursor-vertical-text align-middle text-xl tracking-wide [writing-mode:vertical-lr]"
	>
		{themeStore.name}
	</h6>
</div>

<style>
	.theme-btn {
		transition:
			transform 150ms cubic-bezier(0.22, 1, 0.36, 1),
			border-color 150ms cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 150ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.theme-btn:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.expand-circle {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100%;
		aspect-ratio: 1;
		transform: translate(-50%, -50%) scale(0);
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.3);
		transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.active .expand-circle {
		transform: translate(-50%, -50%) scale(1.5);
	}
</style>
