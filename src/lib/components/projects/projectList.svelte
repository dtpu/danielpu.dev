<script lang="ts">
	import ProjectCard from '$lib/components/projects/projectCard.svelte';
	import ProjectModal from '$lib/components/projects/projectModal.svelte';
	import { projects } from '$lib/data/projects';
	import type { Project } from '$lib/data/projects';

	let selectedProject = $state<Project | null>(null);

	function openModal(project: Project) {
		selectedProject = project;
	}

	function closeModal() {
		selectedProject = null;
	}
</script>

<div class="p-2">
	<div
		class="bento-grid display-[grid] mx-auto grid max-w-[1200px] grid-flow-dense auto-rows-[200px] grid-cols-2 gap-1 sm:auto-rows-[220px] lg:auto-rows-[250px] lg:grid-cols-3"
	>
		{#each projects as project (project.title)}
			<ProjectCard {project} onclick={() => openModal(project)} />
		{/each}
	</div>
</div>

{#if selectedProject}
	<ProjectModal project={selectedProject} onClose={closeModal} />
{/if}
