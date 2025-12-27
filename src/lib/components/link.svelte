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
	class="after:bg-secondary/20 hover:after:bg-secondary/80 relative mx-1 inline-block w-fit no-underline after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-colors after:duration-300 after:content-[''] {className}"
	{...others}
>
	<span class="flex items-center">
		{@render children()}
	</span>
</a>
