<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import CardContainer from '$lib/components/3dCard/cardContainer.svelte';
	import CardBody from '$lib/components/3dCard/cardBody.svelte';
	import CardItem from '$lib/components/3dCard/cardItem.svelte';

	const { project, onclick }: { project: Project; onclick?: () => void } = $props<{
		project: Project;
		onclick?: () => void;
	}>();

	// Parse gridSize to get column and row spans (reactive so it updates when `project` changes)
	let colSpan = $state(1);
	let rowSpan = $state(1);
	$effect(() => {
		const [c, r] = (project?.gridSize ?? '1x1').split('x').map(Number);
		colSpan = c;
		rowSpan = r;
	});
</script>

<div style="grid-column: span {colSpan}; grid-row: span {rowSpan};" class="project-card-wrapper">
	<CardContainer
		containerClass="w-full h-full"
		class="h-full w-full"
		perspective="{colSpan * rowSpan * 300}px"
	>
		<CardBody
			class="card-body border-secondary/20 relative h-full w-full cursor-pointer overflow-hidden rounded-lg border bg-gray-900"
			{onclick}
			onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && onclick?.()}
			role="button"
		>
			<CardItem translateZ={0} class="absolute inset-0">
				<img
					src={project.thumbnail}
					alt={project.title}
					class="h-full w-full object-cover transition-transform duration-500 ease-out"
					loading="lazy"
					style={project.imageFilter ? 'filter: var(--filter-settings);' : ''}
				/>
				<div
					class="from-background via-background/95 absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent"
				></div>
				<div class="gradient-backdrop-blur absolute inset-x-0 bottom-0 h-1/2"></div>
			</CardItem>

			<CardBody class="pointer-events-none absolute right-0 bottom-0 left-0 p-6">
				<CardItem
					as="h3"
					translateZ={25}
					translateY={-12}
					class="text-primary font-title text-xl font-bold md:text-2xl"
				>
					{project.title}
				</CardItem>

				<CardItem
					as="p"
					translateZ={15}
					translateY={-4}
					class="text-secondary font-content mt-2 line-clamp-2 text-sm"
				>
					{project.oneLiner ? project.oneLiner : project.description}
				</CardItem>
			</CardBody>
		</CardBody>
	</CardContainer>
</div>

<style>
	.project-card-wrapper {
		width: 100%;
		height: 100%;
		cursor: pointer;
		min-height: 0;
		min-width: 0;
	}

	.project-card-wrapper :global(.card-body) {
		transition:
			box-shadow 300ms cubic-bezier(0.22, 1, 0.36, 1),
			border-color 300ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.project-card-wrapper:hover :global(.card-body) {
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.15),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
	}

	.project-card-wrapper:hover :global(img) {
		transform: scale(1.03);
	}

	.gradient-backdrop-blur {
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		-webkit-mask-image: linear-gradient(to top, black, transparent);
		mask-image: linear-gradient(to top, black, transparent);
	}
</style>
