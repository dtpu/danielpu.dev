<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import { useMouseState } from './useMouseState.svelte';
	import { isMobile } from '$lib/stores/isMobile.svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface Props {
		as?: string;
		class?: string;
		translateX?: number | string;
		translateY?: number | string;
		translateZ?: number | string;
		rotateX?: number | string;
		rotateY?: number | string;
		rotateZ?: number | string;
		children?: Snippet;
	}

	let {
		as = 'div',
		class: className = '',
		translateX = 0,
		translateY = 0,
		translateZ = 0,
		rotateX = 0,
		rotateY = 0,
		rotateZ = 0,
		children,
		...rest
	}: Props & SvelteHTMLElements['div'] = $props();

	let refElement: HTMLElement | null = $state(null);

	const mouseState = getContext<ReturnType<typeof useMouseState>>('use3DCardMouseState');

	function handleAnimation(isMouseEntered: boolean) {
		if (!refElement) return;

		// Disable 3D transforms on mobile
		if (isMobile()) {
			refElement.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
			return;
		}

		if (isMouseEntered) {
			refElement.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
		} else {
			refElement.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
		}
	}

	$effect(() => {
		if (refElement) {
			refElement.style.transition =
				'transform 0.5s ease-out, color 1000ms cubic-bezier(0.4, 0, 0.2, 1)';
		}
	});

	$effect(() => {
		if (mouseState) {
			handleAnimation(mouseState.isMouseEntered);
		}
	});
</script>

<svelte:element
	this={as}
	bind:this={refElement}
	class="transition duration-500 ease-in-out {className}"
	{...rest}
>
	{@render children?.()}
</svelte:element>
