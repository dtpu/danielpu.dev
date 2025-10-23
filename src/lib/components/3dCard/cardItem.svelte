

<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { useMouseState } from "./useMouseState.svelte";

interface Props {
  as?: string;
  class?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  children?: Snippet;
}

let { 
  as = "div", 
  class: className = "", 
  translateX = 0, 
  translateY = 0, 
  translateZ = 0, 
  rotateX = 0, 
  rotateY = 0, 
  rotateZ = 0,
  children 
}: Props = $props();

let refElement: HTMLElement | null = $state(null);

const mouseState = getContext<ReturnType<typeof useMouseState>>("use3DCardMouseState");

function handleAnimation(isMouseEntered: boolean) {
  if (!refElement) return;

  if (isMouseEntered) {
    refElement.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  } else {
    refElement.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
  }
}

$effect(() => {
  if (mouseState) {
    handleAnimation(mouseState.isMouseEntered);
  }
});
</script>

<svelte:element 
  this={as} 
  bind:this={refElement}
  class="transition duration-500 ease-in-out {className}"
>
  {@render children?.()}
</svelte:element>