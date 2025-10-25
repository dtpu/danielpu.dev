<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, id, children, contentXPadding } = $props<{
		title: string;
		id: string;
		children: Snippet;
		contentXPadding?: boolean;
	}>();
</script>

<section {id} class="px-8 pt-20">
	<div class="mx-auto max-w-6xl">
		<h2 class="font-title text-secondary mb-12 text-4xl">{title}</h2>
		<div
			class="text-primary font-content text-xl leading-relaxed {contentXPadding
				? 'px-4 md:px-16'
				: ''}"
		>
			{@render children()}
		</div>
	</div>
</section>
