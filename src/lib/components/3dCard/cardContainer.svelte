<script lang="ts">
    import { type Snippet, setContext } from "svelte";
    import { useMouseState } from "./useMouseState.svelte";

    interface Props {
        class?: string;
        containerClass?: string;
        children?: Snippet;
    }

    let { 
        class: className = "", 
        containerClass = "", 
        children 
    }: Props = $props();

    let containerRef: HTMLElement | null = $state(null);

    const mouseState = useMouseState(); // Use the composable
    setContext("use3DCardMouseState", mouseState);

    function handleMouseMove(e: MouseEvent) {
        if (!containerRef) return;
        const { left, top, width, height } = containerRef.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }

    function handleMouseEnter() {
        mouseState.setMouseEntered(true);
    }

    function handleMouseLeave() {
        if (!containerRef) return;

        mouseState.setMouseEntered(false);
        containerRef.style.transform = `rotateY(0deg) rotateX(0deg)`;
        containerRef.style.transition = `transform 0.5s ease-out`;
    }
</script>

<div
    class="{containerClass}"
    style="perspective: 1000px"
  >
    <div
      bind:this={containerRef}
      class="
        relative flex items-center justify-center
        {className}"
      style="transform-style: preserve-3d; transition: transform 0.1s ease-out;"
      onmouseenter={handleMouseEnter}
      onmousemove={handleMouseMove}
      onmouseleave={handleMouseLeave}
        role="group"
    >
      {@render children?.()}
    </div>
  </div>
