<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	// Define interfaces
	interface PixelData {
		x: number;
		y: number;
		color: string;
	}

	interface AnimatedPixel extends PixelData {
		r: number;
	}

	// Props
	let {
		value = $bindable(''),
		placeholders = ['Placeholder 1', 'Placeholder 2', 'Placeholder 3'],
		onsubmit,
		onchange
	}: {
		value?: string;
		placeholders?: string[];
		onsubmit?: (text: string) => void;
		onchange?: (event: { target: { value: string } }) => void;
	} = $props();

	// Reactive state
	let canvasRef: HTMLCanvasElement | undefined = $state();
	let inputRef: HTMLInputElement | undefined = $state();
	let currentPlaceholder = $state(0);
	let animating = $state(false);
	let intervalId: number | null = $state(null);
	let newDataRef: AnimatedPixel[] = $state([]);
	let animationFrameId: number | null = $state(null);

	// Show placeholder when there's no text
	let showPlaceholder = $derived(!value);

	function changePlaceholder(): void {
		intervalId = window.setInterval(() => {
			currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
		}, 3000);
	}

	function handleVisibilityChange(): void {
		if (document.visibilityState !== 'visible' && intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		} else if (document.visibilityState === 'visible') {
			changePlaceholder();
		}
	}

	function draw(): void {
		if (!inputRef || !canvasRef) return;

		const canvas = canvasRef;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const computedStyles = getComputedStyle(inputRef);

		canvas.width = 800;
		canvas.height = 800;
		ctx.clearRect(0, 0, 800, 800);

		const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'));
		ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
		ctx.fillStyle = '#FFF';
		ctx.fillText(value, 16, 40);

		const imageData = ctx.getImageData(0, 0, 800, 800);
		const pixelData = imageData.data;
		const newData: PixelData[] = [];

		for (let t = 0; t < 800; t++) {
			let i = 4 * t * 800;
			for (let n = 0; n < 800; n++) {
				let e = i + 4 * n;
				if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
					newData.push({
						x: n,
						y: t,
						color: `rgba(${pixelData[e]}, ${pixelData[e + 1]}, ${pixelData[e + 2]}, ${pixelData[e + 3]})`
					});
				}
			}
		}
		newDataRef = newData.map(({ x, y, color }) => ({ x, y, r: 1, color }));
	}

	function animate(start: number = 0): void {
		animationFrameId = requestAnimationFrame(() => {
			const newArr: AnimatedPixel[] = [];
			for (const current of newDataRef) {
				if (current.x < start) {
					newArr.push(current);
				} else {
					if (current.r <= 0) {
						current.r = 0;
						continue;
					}
					current.x += Math.random() > 0.5 ? 1 : -1;
					current.y += Math.random() > 0.5 ? 1 : -1;
					current.r -= 0.05 * Math.random();
					newArr.push(current);
				}
			}
			newDataRef = newArr;
			const ctx = canvasRef?.getContext('2d');
			if (ctx) {
				ctx.clearRect(start, 0, 800, 800);
				newDataRef.forEach(({ x, y, r, color }) => {
					if (x > start) {
						ctx.beginPath();
						ctx.rect(x, y, r, r);
						ctx.fillStyle = color;
						ctx.strokeStyle = color;
						ctx.stroke();
					}
				});
			}
			if (newDataRef.length > 0) {
				animate(start - 8);
			} else {
				value = '';
				animating = false;
				setTimeout(() => {
					inputRef?.focus();
				}, 100);
			}
		});
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (value === '') return;
		if (e.key === 'Enter' && !animating) {
			vanishAndSubmit();
		}
	}

	function vanishAndSubmit(): void {
		animating = true;
		draw();
		if (value) {
			const maxX = Math.max(...newDataRef.map(({ x }) => x));
			animate(maxX);
			onsubmit?.(value);
		}
	}

	function handleSubmit(e: Event): void {
		e.preventDefault();
		vanishAndSubmit();
	}

	function handleInput(e: Event): void {
		if (!animating) {
			onchange?.({ target: { value: (e.target as HTMLInputElement).value } });
		}
	}

	onMount(() => {
		inputRef?.focus();
		changePlaceholder();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});
</script>

<form
	class="relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 dark:bg-zinc-800 {value
		? 'bg-gray-50'
		: ''}"
	onsubmit={handleSubmit}
>
	<!-- Canvas Element -->
	<canvas
		bind:this={canvasRef}
		class="pointer-events-none absolute top-[20%] left-2 origin-top-left scale-50 pr-20 text-base invert sm:left-8 dark:invert-0 {animating
			? 'opacity-100'
			: 'opacity-0'}"
	></canvas>

	<!-- Text Input -->
	<input
		bind:this={inputRef}
		bind:value
		disabled={animating}
		type="text"
		class="relative z-50 size-full rounded-full border-none bg-transparent pr-20 pl-4 text-sm text-black focus:ring-0 focus:outline-none sm:pl-10 sm:text-base dark:text-white {animating
			? 'text-transparent dark:text-transparent'
			: ''}"
		onkeydown={handleKeyDown}
		oninput={handleInput}
	/>

	<!-- Submit Button -->
	<button
		disabled={!value}
		type="submit"
		class="absolute top-1/2 right-2 z-50 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black transition duration-200 disabled:bg-gray-100 dark:bg-zinc-900 dark:disabled:bg-zinc-700"
		aria-label="Submit"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="size-4 text-gray-300"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M5 12l14 0"
				style="stroke-dasharray: 50%; stroke-dashoffset: {value
					? '0'
					: '50%'}; transition: stroke-dashoffset 0.3s linear;"
			/>
			<path d="M13 18l6 -6" />
			<path d="M13 6l6 6" />
		</svg>
	</button>

	<!-- Placeholder Text -->
	<div class="pointer-events-none absolute inset-0 flex items-center rounded-full">
		{#if showPlaceholder}
			{#key currentPlaceholder}
				<p
					class="w-[calc(100%-2rem)] truncate pl-4 text-left text-sm font-normal text-neutral-500 sm:pl-10 sm:text-base dark:text-zinc-500"
					in:fly={{ y: 16, duration: 300, delay: 300 }}
					out:fly={{ y: -16, duration: 300 }}
				>
					{placeholders[currentPlaceholder]}
				</p>
			{/key}
		{/if}
	</div>
</form>
