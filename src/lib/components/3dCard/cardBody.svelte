<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children, ...rest }: Props & SvelteHTMLElements['div'] = $props();
</script>

<div class={className} style="transform-style: preserve-3d" {...rest}>
	{@render children?.()}
</div>
