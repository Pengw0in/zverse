<script lang="ts">
  import { onMount } from 'svelte';

  let { id, children } = $props();
  let el: HTMLElement;
  let isVisible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  });
</script>

<section {id} bind:this={el} class:visible={isVisible} class:no-blend={id === 'writeups' || id === 'contacts'}>
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
    
    /* Simple fade and slide up animation */
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, 
                transform 0.6s ease-out;

    /* Visuals */
    color: white;
    mix-blend-mode: difference;
    pointer-events: auto;
    
    /* Add will-change for smoother animations */
    will-change: opacity, transform;
  }

  section.no-blend {
    mix-blend-mode: normal;
  }

  section.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>