<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		as?: string;
		childSelector?: string;
		delay?: number;
		class?: string;
		style?: string;
		children?: Snippet;
	}

	let {
		as = 'ul',
		childSelector = ':scope > *',
		delay = 150,
		class: className = '',
		style = '',
		children,
		...restProps
	}: Props = $props();

	let containerElement: HTMLElement;
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const allItems = Array.from(containerElement.querySelectorAll(childSelector));
						const index = allItems.indexOf(entry.target as HTMLElement);

						setTimeout(() => {
							entry.target.classList.add('visible');
						}, index * delay);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px 50px 0px'
			}
		);

		// Wait for DOM to be ready, then observe items
		setTimeout(() => {
			const items = containerElement.querySelectorAll(childSelector);
			items.forEach((item) => {
				item.classList.add('fade-in-item');
				observer.observe(item);
			});
		}, 100);

		return () => observer?.disconnect();
	});
</script>

<svelte:element this={as} bind:this={containerElement} class={className} {style} {...restProps}>
	{@render children?.()}
</svelte:element>

<style>
	:global(.fade-in-item) {
		opacity: 0;
		transform: translateY(12px);
		filter: blur(4px);
		transition:
			opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			filter 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	:global(.fade-in-item.visible) {
		opacity: 1;
		transform: translateY(0);
		filter: blur(0);
	}
</style>
