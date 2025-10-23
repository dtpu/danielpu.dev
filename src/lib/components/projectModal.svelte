 <script lang="ts">
    import CardContainer from '$lib/components/3dCard/cardContainer.svelte';
    import CardBody from '$lib/components/3dCard/cardBody.svelte';
    import { fade, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import type { Project } from '$lib/data/projects';
	import CardItem from './3dCard/cardItem.svelte';
    
    const { project, onClose } = $props<{
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
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
        class="w-full max-w-2xl"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <CardContainer containerClass="w-full" class="w-full">
            <CardBody class="w-full">
                <div class="relative bg-background border border-primary/30 rounded-xl shadow-2xl overflow-hidden" style="preserve-3d: transform;">
                    <!-- close btn -->
                    <button 
                        onclick={onClose}
                        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20 transition-colors border border-primary/20"
                        aria-label="Close modal"
                    >
                        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <div class="relative h-80 overflow-hidden">
                        <img 
                            src={project.image} 
                            alt={`${project.title} preview`}
                            class="w-full h-full object-cover"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    </div>
                    
                    <div class="p-8" style="preserve-3d: transform;">
                        <CardItem translateZ={100} as="div" class="text-3xl font-bold text-primary mb-4">
                            <h2>{project.title}</h2>

                        </CardItem>
                        
                        <p class="text-secondary text-base leading-relaxed mb-6">
                            {project.description}
                        </p>
                        
                        <!-- tech -->
                        <div class="mb-8">
                            <h3 class="text-sm font-semibold text-primary mb-3">Technologies</h3>
                            <div class="flex flex-wrap gap-2">
                                {#each project.tech as t}
                                    <span class="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium">
                                        {t}
                                    </span>
                                {/each}
                            </div>
                        </div>
                        
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Visit Project
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    </div>
</div>
