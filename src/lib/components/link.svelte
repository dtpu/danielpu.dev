<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLinkAttributes } from 'svelte/elements';

	let {
		href,
		children,
		class: className = '',
		...others
	} = $props<{ href: string; class?: string; children: Snippet } & HTMLLinkAttributes>();

	let linkElement: HTMLAnchorElement | undefined = $state();
	let gradientPosition = $state(50);

	function handleMouseMove(e: MouseEvent) {
		if (!linkElement) return;
		const rect = linkElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		gradientPosition = (x / rect.width) * 100;
	}

	function handleMouseLeave() {
		gradientPosition = 50;
	}

	// External link - no need for resolve()
	/* eslint-disable svelte/no-navigation-without-resolve */
</script>

<a
	bind:this={linkElement}
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="link-hover relative mx-1 inline-block w-fit no-underline {className}"
	style="--gradient-pos: {gradientPosition}%"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	{...others}
>
	<span class="flex items-center">
		{@render children()}
	</span>
</a>

<style>
	.link-hover {
		transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.link-hover::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--color-secondary);
		transition:
			height 300ms cubic-bezier(0.22, 1, 0.36, 1),
			transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.link-hover:hover::after {
		height: 2px;
		transform: translateY(1px);
		background: radial-gradient(
			circle at var(--gradient-pos) 50%,
			var(--color-primary) 0%,
			var(--color-secondary) 70%
		);
	}

	.link-hover:hover {
		transform: translateY(-1px);
	}
</style>
