<script lang="ts">
	import { type Snippet, setContext } from 'svelte';
	import { useMouseState } from './useMouseState.svelte';

	interface Props {
		class?: string;
		containerClass?: string;
		perspective?: string;
		children?: Snippet;
	}

	let {
		class: className = '',
		containerClass = '',
		perspective = '1000px',
		children
	}: Props = $props();

	let containerRef: HTMLElement | null = $state(null);

	const mouseState = useMouseState(); // Use the composable
	setContext('use3DCardMouseState', mouseState);

	$effect(() => {
		if (containerRef) {
			containerRef.style.transition = `transform 0.5s ease-out`;
		}
	});

	function handleMouseMove(e: MouseEvent) {
		if (!containerRef) return;
		const { left, top, width, height } = containerRef.getBoundingClientRect();
		const x = (e.clientX - left - width / 2) / 25;
		const y = (e.clientY - top - height / 2) / 25;
		containerRef.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
	}

	function handleMouseEnter() {
		if (!containerRef) return;
		mouseState.setMouseEntered(true);
	}

	function handleMouseLeave() {
		if (!containerRef) return;

		mouseState.setMouseEntered(false);
		containerRef.style.transform = `rotateY(0deg) rotateX(0deg)`;
		containerRef.style.transition = `transform 0.5s ease-out`;
	}
</script>

<div class="flex items-center justify-center {containerClass}" style="perspective: {perspective};">
	<div
		bind:this={containerRef}
		class="flex items-center justify-center {className}"
		style="transform-style: preserve-3d;"
		onmouseenter={handleMouseEnter}
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		role="group"
	>
		{@render children?.()}
	</div>
</div>
