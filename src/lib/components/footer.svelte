<script lang="ts">
	import UWCSWebring from './UWCSWebring.svelte';
</script>

<footer>
	<div
		class="border-background border-l-4 text-secondary flex flex-col items-center justify-between gap-4 p-4 text-center text-sm md:flex-row md:p-8"
	>
		<div class="md:ml-24">
			<p class="font-content">
				Made with
				<span class="text-red-500" aria-label="love" role="img">♥</span>
				and
				<span aria-label="coffee" role="img">🍵</span>
				using
				<a
					href="https://svelte.dev/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:text-primary/70 underline">SvelteKit</a
				>,
				<a
					href="https://tailwindcss.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:text-primary/70 underline">TailwindCSS</a
				>, and
				<a
					href="https://live2d.com/en/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:text-primary/70 underline">Live2D</a
				>.
			</p>
		</div>
		<UWCSWebring />
	</div>
</footer>
