<script lang="ts">
	import CardContainer from '$lib/components/3dCard/cardContainer.svelte';
	import CardBody from '$lib/components/3dCard/cardBody.svelte';
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { Project } from '$lib/data/projects';
	import CardItem from '$lib/components/3dCard/cardItem.svelte';
	import Github from '$lib/components/icons/github.svelte';
	import Devpost from '$lib/components/icons/devpost.svelte';
	import Website from '$lib/components/icons/website.svelte';
	import Link from '$lib/components/link.svelte';
	const { project, onClose }: { project: Project; onClose: () => void } = $props<{
		project: Project;
		onClose: () => void;
	}>();

	function handleBackdropClick() {
		onClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4"
	onclick={handleBackdropClick}
	onkeydown={(e) => e.key === 'Enter' && handleBackdropClick()}
	transition:fade={{ duration: 250, easing: cubicOut }}
	role="button"
	tabindex="0"
>
	<div
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		transition:scale={{ duration: 400, start: 0.9, easing: cubicOut }}
		class="w-[90%] max-w-md sm:max-w-lg"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<CardContainer containerClass="w-full" class="w-full" perspective="1500px">
			<CardBody
				class="bg-background border-primary/30 font-content relative w-full rounded-xl border shadow-2xl"
			>
				<CardItem translateZ={100} translateX={-20} class="absolute top-4 right-4 z-20">
					<button
						onclick={onClose}
						class="bg-background/80 hover:bg-primary/20 border-primary/20 rounded-full border p-2 backdrop-blur-sm transition-colors"
						aria-label="Close modal"
					>
						<svg class="text-primary h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</CardItem>

				<CardBody class="p-6 sm:p-8">
					<CardBody class="mb-4 sm:mb-4">
						<CardItem
							translateZ={60}
							as="h2"
							class="text-primary font-title text-2xl font-bold sm:text-3xl"
						>
							{project.title}
						</CardItem>

						{#if project.subTitle}
							<CardItem
								translateZ={50}
								as="h3"
								class="text-secondary font-title text-base font-normal italic sm:text-lg"
							>
								{project.subTitle}
							</CardItem>
						{/if}
					</CardBody>

					<CardItem
						translateZ={40}
						as="p"
						class="text-secondary mb-5 text-sm leading-relaxed sm:mb-6 sm:text-base"
					>
						{project.description}
					</CardItem>

					<CardItem translateZ={80} class="mb-6 rounded-xl shadow-2xl sm:mb-8">
						<img
							src={project.fullImage ? project.fullImage : project.thumbnail}
							alt={`${project.title} preview`}
							class="h-36 w-full rounded-xl object-cover sm:h-48"
							style={project.imageFilter ? 'filter: var(--filter-settings);' : ''}
						/>
					</CardItem>

					<!-- tech -->
					<CardItem translateZ={30} class="mb-6 sm:mb-8">
						<h3 class="text-primary mb-2 text-xs font-semibold sm:mb-3 sm:text-sm">Technologies</h3>
						<div class="flex flex-wrap gap-1.5 sm:gap-2">
							{#each project.tech as t (t)}
								<span
									class="bg-primary/10 text-primary rounded-lg px-2.5 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm"
								>
									{t}
								</span>
							{/each}
						</div>
					</CardItem>

					<CardItem translateZ={50}>
						<div class="flex flex-wrap items-center gap-2 sm:gap-3">
							{#if project.link}
								<Link
									href={project.link}
									rel="noopener noreferrer"
									class="flex items-center gap-1 py-1.5 text-xs font-medium transition-colors sm:gap-1 sm:py-2 sm:text-sm"
									aria-label="Visit project website"
								>
									<Website class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									Website
								</Link>
							{/if}
							{#if project.github}
								<Link
									href={project.github}
									rel="noopener noreferrer"
									class="flex items-center gap-1 py-1.5 text-xs font-medium transition-colors sm:gap-1 sm:py-2 sm:text-sm"
									aria-label="View on GitHub"
								>
									<Github class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									GitHub
								</Link>
							{/if}
							{#if project.devpost}
								<Link
									href={project.devpost}
									rel="noopener noreferrer"
									class="mx-2 flex items-center gap-1 py-1.5 text-xs font-medium transition-colors sm:gap-1 sm:py-2 sm:text-sm"
									aria-label="View on Devpost"
								>
									<Devpost class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									Devpost
								</Link>
							{/if}
						</div>
					</CardItem>
				</CardBody>
			</CardBody>
		</CardContainer>
	</div>
</div>
