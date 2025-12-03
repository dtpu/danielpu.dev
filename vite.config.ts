import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		external: ['@resvg/resvg-js', 'pixel-profile', 'pixel-profile-server', 'pixel-profile-utils']
	}
});
