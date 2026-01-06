<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, id, children, contentXPadding } = $props<{
		title?: string;
		id: string;
		children: Snippet;
		contentXPadding?: boolean;
	}>();
</script>

<section {id} class="section-container px-8 pt-16 md:pt-20">
	<div class="mx-auto max-w-6xl">
		{#if title}
			<h2
				class="font-title text-secondary mb-10 text-3xl tracking-wide uppercase md:mb-12 md:text-4xl"
			>
				{title}
			</h2>
		{/if}
		<div
			class="text-primary font-content text-lg leading-relaxed md:text-xl {contentXPadding
				? 'px-4 md:px-12'
				: ''}"
		>
			{@render children()}
		</div>
	</div>
</section>
