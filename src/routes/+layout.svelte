<script lang="ts">
	import '../app.css';
	import { themeStore } from '$lib/stores/themeStore.svelte';
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { browser } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics();

	let { children } = $props();

	function getColour(color: number[]) {
		return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
	}

	// Update CSS variables when theme changes
	$effect(() => {
		if (browser) {
			const root = document.documentElement;
			root.style.setProperty('--color-primary', getColour(themeStore.palette[0]));
			root.style.setProperty('--color-secondary', getColour(themeStore.palette[1]));
			root.style.setProperty('--color-background', getColour(themeStore.palette[2]));
			root.style.setProperty('--filter-settings', themeStore.filter);
		}
	});
</script>

<div in:fade={{ duration: 400, easing: cubicOut }} class="bg-background h-full min-h-screen w-full">
	{@render children()}
</div>
