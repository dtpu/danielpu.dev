<script lang="ts">
    import type { Project } from '$lib/data/projects';
    import CardContainer from '$lib/components/3dCard/cardContainer.svelte';
    import CardBody from '$lib/components/3dCard/cardBody.svelte';
    import CardItem from '$lib/components/3dCard/cardItem.svelte';
    
    const { 
        project, 
        onclick
    } = $props<{
        project: Project;
        onclick?: () => void;
    }>();
    
    // Parse gridSize to get column and row spans
    const [colSpan, rowSpan] = project.gridSize.split('x').map(Number);
</script>

<div
    style="grid-column: span {colSpan}; grid-row: span {rowSpan};"
    class="project-card-wrapper"
>
    <CardContainer containerClass="w-full h-full" class="w-full h-full !flex-none !block">
        <CardBody class="w-full h-full">
            <div 
                class="relative w-full h-full rounded-lg border border-primary/50 overflow-hidden cursor-pointer bg-gray-900"
                onclick={onclick}
                onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && onclick?.()}
                role="button"
                tabindex="0"
            >
                <!-- Image background -->
                <CardItem translateZ={0} class="absolute inset-0">
                    <img 
                        src={project.image} 
                        alt={project.title}
                        class="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </CardItem>
                
                <!-- Title and description -->
                <CardItem translateZ={100} class="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <h3 class="font-bold text-white text-shadow text-2xl">
                        {project.title}
                    </h3>
                    <p class="text-white/80 text-sm mt-2 text-shadow line-clamp-2">
                        {project.description}
                    </p>
                </CardItem>
            </div>
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
    
    .text-shadow {
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
    }
    
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    /* Override CardContainer flex behavior */
    .project-card-wrapper :global(.card-container-inner) {
        display: block !important;
    }
</style>

