<script lang="ts">
  import { onMount } from 'svelte';
  import { getWriteups, type WriteupMetadata } from '$lib/utils/markdown';
  import GlitchText from '$lib/GlitchText.svelte';
  
  let writeups = $state<WriteupMetadata[]>([]);
  let loading = $state(true);
  let hoveredSlug = $state<string | null>(null);

  // Group writeups by year and month
  function groupWriteups(writeups: WriteupMetadata[]) {
    const grouped: Record<string, Record<string, WriteupMetadata[]>> = {};
    
    writeups.forEach(writeup => {
      const date = new Date(writeup.date);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('en-US', { month: 'long' });
      
      if (!grouped[year]) {
        grouped[year] = {};
      }
      if (!grouped[year][month]) {
        grouped[year][month] = [];
      }
      grouped[year][month].push(writeup);
    });
    
    return grouped;
  }

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
  }

  onMount(async () => {
    writeups = await getWriteups();
    loading = false;
  });

  const groupedWriteups = $derived(groupWriteups(writeups));
  const years = $derived(Object.keys(groupedWriteups).sort((a, b) => Number(b) - Number(a)));
</script>

<div class="container">
  <h2>Writeups</h2>
  
  {#if loading}
    <div class="loading">Loading writeups...</div>
  {:else if writeups.length === 0}
    <div class="empty">No writeups available yet.</div>
  {:else}
    <div class="writeups-list">
      {#each years as year}
        <div class="year-group">
          <div class="year-label">
            <GlitchText text={year} intensity="normal" halftone={false} />
          </div>
          
          {#each Object.entries(groupedWriteups[year]) as [month, monthWriteups]}
            <div class="month-group">
              <div class="month-label">{month}</div>
              
              <div class="month-items">
                {#each monthWriteups as writeup}
                  <a 
                    href={`#/writeups/${encodeURIComponent(writeup.slug)}`}
                    class="writeup-item"
                    class:hovered={hoveredSlug === writeup.slug}
                    on:mouseenter={() => hoveredSlug = writeup.slug}
                    on:mouseleave={() => hoveredSlug = null}
                  >
                    <span class="writeup-title">
                      {writeup.title}
                      {#if writeup.category}
                        <span class="writeup-category">[{writeup.category}]</span>
                      {/if}
                    </span>
                    <span class="writeup-date">{formatDate(writeup.date)}</span>
                  </a>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    text-align: left;
    padding: 4rem 2rem;
    max-width: 900px;
    margin: 0 auto;
    min-height: 100vh;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 4rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .writeups-list {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .year-group {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .year-label {
    font-size: 5rem;
    font-weight: 800;
    color: rgb(255, 255, 255);
    line-height: 1;
    letter-spacing: -0.02em;
    margin-bottom: -1rem;
  }

  .month-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .month-label {
    font-size: 1.5rem;
    font-weight: 600;
    color: rgb(255, 255, 255);
    line-height: 1;
    letter-spacing: -0.01em;
    margin-bottom: 0.5rem;
  }

  .month-items {
    display: flex;
    flex-direction: column;
  }

  .writeup-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 1rem 0;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.85);
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .writeup-item:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .writeup-item:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.02);
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: -1rem;
    margin-right: -1rem;
  }

  .writeup-item:hover .writeup-category {
    color: #00AEEF;
  }

  .writeup-title {
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .writeup-category {
    font-size: 0.85rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.35);
    transition: color 0.2s ease;
  }

  .writeup-date {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.35);
    white-space: nowrap;
    font-family: 'JetBrains Mono', monospace;
  }

  .loading,
  .empty {
    padding: 4rem 2rem;
    font-size: 1.2rem;
    opacity: 0.6;
    text-align: center;
  }

  @media (max-width: 768px) {
    .container {
      padding: 2rem 1.5rem;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 2.5rem;
    }

    .year-label {
      font-size: 3rem;
    }

    .month-label {
      font-size: 1.25rem;
    }

    .writeup-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 1.25rem 0;
    }

    .writeup-item:hover {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      margin-left: -0.75rem;
      margin-right: -0.75rem;
    }

    .writeup-title {
      font-size: 1rem;
    }

    .writeup-date {
      font-size: 0.8rem;
    }
  }
</style>