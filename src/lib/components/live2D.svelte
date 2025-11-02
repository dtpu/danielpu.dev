<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let live2DCanvas: HTMLCanvasElement | null;
	let lappDelegate: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
	let live2dManager: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

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
		// clean after use
		if (lappDelegate) {
			lappDelegate.releaseInstance();
		}
	});

	// change expression
	// Happy, Smug, peeking, what, sad, Normal
	/* eslint-disable @typescript-eslint/no-unused-vars */
	function setExpression(expressionName: string) {
		if (live2dManager) {
			live2dManager.setExpression(expressionName);
		}
	}
	/* eslint-enable @typescript-eslint/no-unused-vars */
</script>

<canvas
	{...$$restProps}
	bind:this={live2DCanvas}
	id="live2d4"
	class="h-[50vh] w-full md:h-[65vh] md:w-[40vw]"
	style="filter: var(--filter-settings);"
></canvas>
