<script lang="ts">
    import type { Snippet } from "svelte";
    
    interface Props {
        class?: string;
        children?: Snippet;
    }
    
    let { 
        class: className = "", 
        children 
    }: Props = $props();
</script>

<div
    class={className}
    style="transform-style: preserve-3d"
>
    {@render children?.()}
</div>