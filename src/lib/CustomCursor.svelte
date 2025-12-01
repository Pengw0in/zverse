<script lang="ts">
  import { onMount } from 'svelte';
  
  let cursorX = $state(0);
  let cursorY = $state(0);
  let isClicking = $state(false);
  let isHovering = $state(false);
  
  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      const target = e.target as HTMLElement;
      isHovering = !!(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.writeup-item') ||
        target.closest('.contact-card') ||
        target.closest('.content-image')
      );
    };
    const handleMouseDown = () => { isClicking = true; };
    const handleMouseUp = () => { isClicking = false; };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });
</script>

<div 
  class="cursor"
  class:clicking={isClicking}
  class:hovering={isHovering}
  style="left: {cursorX}px; top: {cursorY}px"
>
  <svg class="cursor-layer cyan-layer" width="28" height="28" viewBox="0 0 24 24">
    <path d="M0,0 L0,20 L5,15 L14,15 L0,0 Z" fill="#00AEEF" />
  </svg>
  <svg class="cursor-layer magenta-layer" width="28" height="28" viewBox="0 0 24 24">
    <path d="M0,0 L0,20 L5,15 L14,15 L0,0 Z" fill="#9C27B0" />
  </svg>
  <svg class="cursor-layer yellow-layer" width="28" height="28" viewBox="0 0 24 24">
    <path d="M0,0 L0,20 L5,15 L14,15 L0,0 Z" fill="#FFD700" />
  </svg>
  <svg class="cursor-main" width="28" height="28" viewBox="0 0 24 24">
    <path 
      d="M0,0 L0,20 L5,15 L14,15 L0,0 Z" 
      fill="#4ADE80" 
      stroke="#000" 
      stroke-width="1" 
      shape-rendering="crispEdges"
    />
  </svg>
</div>

<style>
  :global(body) {
    cursor: none !important;
  }
  :global(a, button, .clickable, img, .content-image, .writeup-item) {
    cursor: none !important;
  }
  :global(*) {
    cursor: none !important;
  }
  .cursor {
    position: fixed;
    width: 28px;
    height: 28px;
    pointer-events: none;
    z-index: 10000;
    transform: translate(0, 0);
    will-change: left, top;
  }
  .cursor-layer, .cursor-main {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.1s ease-out, opacity 0.1s ease;
  }
  .cyan-layer {
    opacity: 0.6;
    transform: translate(-2px, -1px);
  }
  .magenta-layer {
    opacity: 0.6;
    transform: translate(2px, 1px);
  }
  .yellow-layer {
    opacity: 0.6;
    transform: translate(1px, -2px);
  }
  .cursor-main {
    z-index: 10;
  }
  .cursor.hovering .cursor-main {
    transform: scale(1.1);
  }
  .cursor.clicking .cyan-layer {
    transform: translate(-4px, -3px);
    opacity: 0.8;
  }
  .cursor.clicking .magenta-layer {
    transform: translate(4px, 3px);
    opacity: 0.8;
  }
  .cursor.clicking .yellow-layer {
    transform: translate(3px, -4px);
    opacity: 0.8;
  }
  .cursor.clicking .cursor-main {
    transform: scale(0.9);
  }
  @media (max-width: 768px) {
    .cursor {
      display: none;
    }
    :global(body) {
      cursor: auto !important;
    }
    :global(*) {
      cursor: auto !important;
    }
  }
</style>