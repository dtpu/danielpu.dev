<script lang="ts">
	import Link from '$lib/components/link.svelte';
	import ImageIcon from '$lib/components/icons/imageIcon.svelte';

	let { name, src, href } = $props<{ name: string; src: string; href: string }>();
</script>

<Link {href} class="inline-flex items-center gap-0.5">
	<ImageIcon {src} />
	<span class="font-medium">{name}</span>
</Link>
