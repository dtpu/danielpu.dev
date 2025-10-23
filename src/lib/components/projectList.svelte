<script lang="ts">
    import ProjectCard from '$lib/components/projectCard.svelte';
    import ProjectModal from '$lib/components/projectModal.svelte';
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

<div class="p-8">
    <div class="bento-grid">
        {#each projects as project}
            <ProjectCard 
                {project}
                onclick={() => openModal(project)}
            />
        {/each}
    </div>
</div>

{#if selectedProject}
    <ProjectModal 
        project={selectedProject}
        onClose={closeModal}
    />
{/if}

<style>
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 250px;
        grid-auto-flow: dense;
        gap: 16px;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    @media (max-width: 1024px) {
        .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 220px;
            gap: 12px;
        }
    }
    
    @media (max-width: 640px) {
        .bento-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 200px;
            gap: 12px;
        }
    }
</style>
