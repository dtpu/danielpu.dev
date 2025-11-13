<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import CardContainer from '$lib/components/3dCard/cardContainer.svelte';
	import CardBody from '$lib/components/3dCard/cardBody.svelte';
	import CardItem from '$lib/components/3dCard/cardItem.svelte';

	const { project, onclick }: { project: Project; onclick?: () => void } = $props<{
		project: Project;
		onclick?: () => void;
	}>();

	// Parse gridSize to get column and row spans
	const [colSpan, rowSpan] = project.gridSize.split('x').map(Number);
</script>

<div style="grid-column: span {colSpan}; grid-row: span {rowSpan};" class="project-card-wrapper">
	<CardContainer
		containerClass="w-full h-full"
		class="h-full w-full"
		perspective="{colSpan * rowSpan * 250}px"
	>
		<CardBody
			class="border-primary/50 relative h-full w-full cursor-pointer border bg-gray-900"
			{onclick}
			onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && onclick?.()}
			role="button"
		>
			<CardItem translateZ={0} class="absolute inset-0">
				<img
					src={project.thumbnail}
					alt={project.title}
					class="h-full w-full object-cover"
					loading="lazy"
					style={project.imageFilter ? 'filter: var(--filter-settings);' : ''}
				/>
				<div
					class="from-background via-background/90 absolute right-0 bottom-0 left-0 h-50 bg-gradient-to-t to-transparent"
				></div>
				<div
					class="gradient-backdrop-blur absolute right-0 bottom-0 left-0 h-50 bg-gradient-to-t"
				></div>
			</CardItem>

			<CardBody class="pointer-events-none absolute right-0 bottom-0 left-0 p-6">
				<CardItem
					as="h3"
					translateZ={20}
					translateY={-15}
					class="text-primary text-shadow font-title text-2xl font-bold "
				>
					{project.title}
				</CardItem>

				<CardItem
					as="p"
					translateZ={10}
					translateY={-5}
					class="text-secondary text-shadow font-content mt-2 line-clamp-2 text-sm"
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

	.gradient-backdrop-blur {
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		-webkit-mask-image: linear-gradient(to top, black, transparent);
		mask-image: linear-gradient(to top, black, transparent);
	}
</style>
