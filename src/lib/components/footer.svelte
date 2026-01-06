<script lang="ts">
	import ContentSection from '$lib/components/contentSection.svelte';
	import UWCSWebring from './UWCSWebring.svelte';
	import { onMount } from 'svelte';
	let lastUpdated: string = $state('tomorrow');
	onMount(async () => {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const res = await fetch(`/api/repo/last-updated?timezone=${timezone}`);
		lastUpdated = await res.text();
	});
</script>

<footer class="border-secondary/10 mt-16 border-t">
	<ContentSection id="footer">
		<div class="font-content text-secondary space-y-2 text-sm">
			<p>
				Made with
				<span class="text-red-500" aria-label="love" role="img">♥</span>
				and
				<span aria-label="matcha" role="img">🍵</span>
				using
				<a
					href="https://svelte.dev/"
					target="_blank"
					rel="noopener noreferrer"
					class="footer-link text-primary">SvelteKit</a
				>,
				<a
					href="https://tailwindcss.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="footer-link text-primary">TailwindCSS</a
				>, and
				<a
					href="https://live2d.com/en/"
					target="_blank"
					rel="noopener noreferrer"
					class="footer-link text-primary">Live2D</a
				>.
			</p>
			<p class="text-secondary/70">
				Last updated: <span class="text-secondary">{lastUpdated}</span>
			</p>
		</div>
		<div class="mt-6">
			<UWCSWebring />
		</div>
	</ContentSection>
</footer>

<style>
	.footer-link {
		text-decoration: underline;
		text-underline-offset: 2px;
		transition:
			opacity 150ms ease-out,
			color 800ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.footer-link:hover {
		opacity: 0.7;
	}
</style>
