<script lang="ts">
  let { 
    writeup, 
    isGlitching = false,
    isHovered = false,
    onMouseEnter,
    onMouseLeave
  } = $props<{
    writeup: {
      title: string;
      description: string;
      date: string;
      category: string;
      slug: string;
      tags: string[];
    };
    isGlitching?: boolean;
    isHovered?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }>();
</script>

<a 
  href={`#/writeups/${writeup.slug}`}
  class="writeup-card"
  class:glitching={isGlitching}
  onmouseenter={onMouseEnter}
  onmouseleave={onMouseLeave}
>
  <div class="category">{writeup.category}</div>
  <h3 class="title">{writeup.title}</h3>
  <p class="description">{writeup.description}</p>
  
  <div class="meta">
    <span class="date">{writeup.date}</span>
    <div class="tags">
      {#each writeup.tags as tag}
        <span class="tag">{tag}</span>
      {/each}
    </div>
  </div>
</a>

<style>
  .writeup-card {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid white;
    text-decoration: none;
    color: white;
    transition: all 0.2s ease;
    gap: 1rem;
  }

  .writeup-card:hover {
    background: rgba(0, 0, 0, 0.95);
    transform: translate(-4px, -4px);
    box-shadow: 4px 4px 0 #00AEEF;
  }

  .category {
    display: inline-block;
    align-self: flex-start;
    padding: 0.3rem 0.8rem;
    background: rgba(255, 215, 0, 0.2);
    border: 1px solid #FFD700;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
  }

  .description {
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.8;
    margin: 0;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .date {
    font-size: 0.85rem;
    opacity: 0.6;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tag {
    padding: 0.25rem 0.6rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  /* Simple glitch effect */
  .writeup-card.glitching {
    animation: simple-glitch 0.3s ease;
  }

  @keyframes simple-glitch {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(-2px, 2px); }
    50% { transform: translate(2px, -2px); }
    75% { transform: translate(-2px, -2px); }
  }

  @media (max-width: 768px) {
    .writeup-card {
      padding: 1.5rem;
    }

    .title {
      font-size: 1.3rem;
    }
  }
</style>