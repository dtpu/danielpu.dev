<script lang="ts">
	import Link from '$lib/components/link.svelte';
	import ImageIcon from '$lib/components/icons/imageIcon.svelte';

	let { name, src, href } = $props<{ name: string; src: string; href: string }>();
</script>

<Link {href}>
	<span class="flex items-center">
		<ImageIcon {src} />
		{name}
	</span>
</Link>
