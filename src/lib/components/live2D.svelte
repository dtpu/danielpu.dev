<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createAvatarReactor } from './live2dReaction';

	let live2DCanvas: HTMLCanvasElement | null;
	let lappDelegate: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
	let live2dManager: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

	let announcement = '';

	const reactor = createAvatarReactor({
		setExpression,
		setTimer: (fn, ms) => setTimeout(fn, ms),
		clearTimer: (id) => clearTimeout(id)
	});

	onMount(async () => {
		const { Live2DCubismCore } = await import('$lib/live2d/Core/live2dcubismcore.min.js');

		globalThis.Live2DCubismCore = Live2DCubismCore;

		const { LAppDelegate } = await import('$lib/live2d/utils/lappdelegate');
		lappDelegate = LAppDelegate;

		const delegate = LAppDelegate.getInstance();
		if (delegate.initialize()) {
			delegate.run();
			live2dManager = delegate.getLive2DManager();
		}
	});

	onDestroy(() => {
		reactor.dispose();
		// clean after use
		if (lappDelegate) {
			lappDelegate.releaseInstance();
		}
	});

	// change expression
	// Happy, Smug, peeking, what, sad, Normal
	function setExpression(expressionName: string) {
		if (live2dManager) {
			live2dManager.setExpression(expressionName);
		}
	}

	function onAvatarClick() {
		announcement = reactor.react().announcement;

		if (live2DCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			live2DCanvas.animate(
				[
					{ transform: 'scale(1)' },
					{ transform: 'scale(0.985, 1.015)' },
					{ transform: 'scale(1)' }
				],
				{ duration: 300, easing: 'ease-out' }
			);
		}
	}
</script>

<!-- Static (non-positioned) wrapper: the gaze tracking relies on the canvas's offsetParent. -->
<button
	type="button"
	class="block w-full cursor-pointer touch-manipulation rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
	aria-label="Poke Daniel's avatar"
	on:click={onAvatarClick}
>
	<canvas
		{...$$restProps}
		bind:this={live2DCanvas}
		id="live2d4"
		class="h-[50vh] w-full md:h-[65vh] md:w-[40vw]"
		style="filter: var(--filter-settings);"
	></canvas>
</button>

<span class="sr-only" aria-live="polite">{announcement}</span>
