<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import SignatureAnimation from './signatureAnimation.svelte';
</script>

<div
	out:fade={{ duration: 600, easing: cubicOut }}
	class="bg-background text-primary fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center"
>
	<div class="loading-content w-[55%] md:w-[22%]">
		<SignatureAnimation duration={0.35} />
	</div>
</div>

<style>
	.loading-content {
		animation: scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
