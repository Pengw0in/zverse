<script lang="ts">
  import { onMount } from 'svelte';

  let { id, children } = $props();
  let el: HTMLElement;
  let isVisible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true;
        }
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<section {id} bind:this={el} class:visible={isVisible}>
  {@render children()}
</section>

<style>
  section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 2rem;
    box-sizing: border-box;
    
    /* Transition State: Hidden */
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
                transform 1s cubic-bezier(0.16, 1, 0.3, 1);

    /* Visuals */
    color: white;
    mix-blend-mode: difference;
    pointer-events: auto;
  }

  section.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>