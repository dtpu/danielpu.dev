<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLinkAttributes } from 'svelte/elements';

	let {
		href,
		children,
		class: className = '',
		...others
	} = $props<{ href: string; class?: string; children: Snippet } & HTMLLinkAttributes>();

	// External link - no need for resolve()
	/* eslint-disable svelte/no-navigation-without-resolve */
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="link-hover relative mx-1 inline-block w-fit no-underline {className}"
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
		left: 50%;
		width: 0;
		height: 2px;
		background-color: rgb(var(--color-secondary) / 0.6);
		transition:
			width 200ms cubic-bezier(0.22, 1, 0.36, 1),
			left 200ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.link-hover:hover::after {
		width: 100%;
		left: 0;
	}

	.link-hover:hover {
		transform: translateY(-1px);
	}
</style>
