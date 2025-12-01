<script lang="ts">
  import { onMount } from 'svelte';
  
  let { children } = $props();
  let headerHidden = $state(false);
  let scrollContainer: HTMLElement | null = null;
  let lastScrollY = $state(0);

  function goBack() {
    window.location.hash = '#/writeups';
  }

  onMount(() => {
    const handleScroll = () => {
      if (!scrollContainer) return;
      const currentScrollY = scrollContainer.scrollTop;
      
      if (currentScrollY > 100) {
        headerHidden = true;
      } else {
        headerHidden = false;
      }
      
      lastScrollY = currentScrollY;
    };

    setTimeout(() => {
      scrollContainer = document.querySelector('.writeup-scroll-container');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
      }
    }, 50);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  });
</script>

<div class="writeup-page" class:header-hidden={headerHidden}>
  <div class="writeup-scroll-container">
    <div class="writeup-content-wrapper">
      <div class="article-container">
        <button class="close-btn" onclick={goBack}>✕</button>
        {@render children()}
      </div>
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .writeup-page {
    position: relative;
    z-index: 10;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 5rem;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: padding-top 0.3s ease;
  }

  .writeup-page.header-hidden {
    padding-top: 1rem;
  }

  .writeup-scroll-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 2rem 2rem;
    
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }

  .writeup-scroll-container::-webkit-scrollbar {
    width: 8px;
  }

  .writeup-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .writeup-scroll-container::-webkit-scrollbar-thumb {
    background: transparent;
  }

  .writeup-scroll-container::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }

  .writeup-content-wrapper {
    max-width: 900px;
    margin: 0 auto;
    color: #ffffff;
    position: relative;
    z-index: 1;
  }

  .article-container {
    background: #050505;
    border: 2px solid #ffffff;
    border-radius: 0;
    padding: 4rem;
    position: relative;
    overflow: hidden;
  }

  .article-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 6px 6px;
    pointer-events: none;
    z-index: 0;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 36px;
    height: 36px;
    background: #050505;
    border: 2px solid #fff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: all 0.15s ease;
  }

  .close-btn:hover {
    background: #fff;
    color: #000;
    box-shadow: 4px 4px 0px #00AEEF;
    transform: translate(-2px, -2px);
  }

  .writeup-content-wrapper :global(article) {
    position: relative;
    z-index: 1;
  }

  .writeup-content-wrapper :global(.content) {
    line-height: 1.8;
    font-size: 1.1rem;
    color: #eeeeee;
    position: relative;
    z-index: 1;
  }

  .writeup-content-wrapper :global(.content h1) {
    font-family: 'JetBrainsMonoNL Nerd Font Mono', 'JetBrains Mono', monospace;
    font-size: 2.5rem;
    font-weight: 800;
    margin: 3rem 0 1.5rem;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: -0.03em;
    text-shadow: 3px 3px 0px #9C27B0;
  }

  .writeup-content-wrapper :global(.content h1:first-child) {
    margin-top: 0;
  }

  .writeup-content-wrapper :global(.content h2) {
    font-family: 'JetBrainsMonoNL Nerd Font Mono', 'JetBrains Mono', monospace;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 2.5rem 0 1.25rem;
    color: #ffffff;
    text-transform: uppercase;
    border-bottom: 2px solid #333;
    padding-bottom: 0.5rem;
  }

  .writeup-content-wrapper :global(.content h3) {
    font-family: 'JetBrainsMonoNL Nerd Font Mono', 'JetBrains Mono', monospace;
    font-size: 1.4rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
    color: #00AEEF;
  }

  .writeup-content-wrapper :global(.content p) {
    margin: 1.25rem 0;
  }

  .writeup-content-wrapper :global(.content ul),
  .writeup-content-wrapper :global(.content ol) {
    margin: 1.25rem 0;
    padding-left: 2rem;
  }

  .writeup-content-wrapper :global(.content li) {
    margin: 0.75rem 0;
  }

  .writeup-content-wrapper :global(.content a) {
    color: #FFD700;
    text-decoration: none;
    background: rgba(255, 215, 0, 0.1);
    padding: 0 4px;
    border: 1px solid rgba(255, 215, 0, 0.3);
    transition: all 0.2s ease;
    font-weight: 600;
  }

  .writeup-content-wrapper :global(.content a:hover) {
    background: #FFD700;
    color: #000;
    box-shadow: 4px 4px 0px #fff;
    transform: translate(-2px, -2px);
  }

  .writeup-content-wrapper :global(.content code) {
    font-family: 'JetBrainsMonoNL Nerd Font Mono', 'JetBrains Mono', monospace;
    font-size: 0.9em;
    background: #1a1a1a;
    color: #FF4081;
    padding: 0.2rem 0.5rem;
    border: 1px solid #333;
  }

  .writeup-content-wrapper :global(.content pre) {
    background: #0a0a0a;
    border: 1px solid #333;
    padding: 1.5rem;
    border-radius: 0;
    overflow-x: auto;
    margin: 2rem 0;
    box-shadow: 8px 8px 0px #1a1a1a;
    position: relative;
  }

  .writeup-content-wrapper :global(.content pre code) {
    font-family: 'JetBrainsMonoNL Nerd Font Mono', 'JetBrains Mono', monospace;
    background: none;
    border: none;
    padding: 0;
    font-size: 0.9rem;
    line-height: 1.7;
    color: #e0e0e0;
  }

  .writeup-content-wrapper :global(.content strong) {
    font-weight: 700;
    color: #FFD700;
  }

  .writeup-content-wrapper :global(.content em) {
    color: #9C27B0;
    font-style: italic;
  }

  .writeup-content-wrapper :global(.content blockquote) {
    border-left: 4px solid #FFD700;
    margin: 2rem 0;
    padding: 1rem 1.5rem;
    background: #111;
    color: #ddd;
    font-style: italic;
  }

  .writeup-content-wrapper :global(.loading),
  .writeup-content-wrapper :global(.not-found) {
    text-align: center;
    padding: 4rem 2rem;
  }

  @media (max-width: 768px) {
    .writeup-page {
      padding-top: 4rem;
    }

    .writeup-page.header-hidden {
      padding-top: 0.5rem;
    }

    .writeup-scroll-container {
      padding: 0 1rem 1rem;
    }

    .article-container {
      padding: 2rem 1.5rem;
    }

    .close-btn {
      top: 0.75rem;
      right: 0.75rem;
      width: 32px;
      height: 32px;
      font-size: 0.9rem;
    }

    .writeup-content-wrapper :global(.content h1) {
      font-size: 1.75rem;
    }

    .writeup-content-wrapper :global(.content h2) {
      font-size: 1.5rem;
    }

    .writeup-content-wrapper :global(.content pre) {
      padding: 1rem;
    }
  }
</style>