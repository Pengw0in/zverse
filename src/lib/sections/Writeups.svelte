<script lang="ts">
  import { onMount } from 'svelte';
  import WriteupCard from '../WriteupCard.svelte';
  import { getWriteups, type WriteupMetadata } from '$lib/utils/markdown';
  
  let writeups = $state<WriteupMetadata[]>([]);
  let hoveredCard = $state<number | null>(null);
  let glitchingCard = $state<number | null>(null);
  let loading = $state(true);

  onMount(async () => {
    // Load writeups from markdown files
    writeups = await getWriteups();
    loading = false;

    const triggerRandomGlitch = () => {
      if (writeups.length === 0) return;
      glitchingCard = Math.floor(Math.random() * writeups.length);
      setTimeout(() => {
        glitchingCard = null;
      }, 150 + Math.random() * 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.65) {
        triggerRandomGlitch();
      }
    }, 2000 + Math.random() * 2500);

    return () => clearInterval(interval);
  });
</script>

<div class="container" id="socials">
  <h2>Writeups</h2>
  <p class="subtitle">CTF solutions & security research</p>
  
  {#if loading}
    <div class="loading">Loading writeups...</div>
  {:else if writeups.length === 0}
    <div class="empty">No writeups available yet.</div>
  {:else}
    <div class="writeups-scroll-container">
      <div class="writeups-grid">
        {#each writeups as writeup, i}
          <WriteupCard 
            {writeup}
            isGlitching={glitchingCard === i}
            isHovered={hoveredCard === i}
            onMouseEnter={() => hoveredCard = i}
            onMouseLeave={() => hoveredCard = null}
          />
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    text-align: center;
    padding: 4rem 2rem;
    max-width: 1600px; /* Increased from 1400px */
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 4rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.6;
    margin-bottom: 2rem;
  }

  .writeups-scroll-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem 0.5rem;
    max-height: 70vh; /* Increased from 60vh */
    
    /* Custom scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0) transparent;
  }

  .writeups-scroll-container::-webkit-scrollbar {
    width: 6px;
  }

  .writeups-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .writeups-scroll-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  .writeups-scroll-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .writeups-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding-bottom: 4rem; /* Increased from 2rem */
  }

  @media (max-width: 1400px) { /* Added new breakpoint */
    .writeups-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2.5rem;
    }

    .writeups-scroll-container {
      max-height: 55vh; /* Increased from 50vh */
    }

    .writeups-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  .loading,
  .empty {
    padding: 4rem 2rem;
    font-size: 1.2rem;
    opacity: 0.6;
  }
</style>