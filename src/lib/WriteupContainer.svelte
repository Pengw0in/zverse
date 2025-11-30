<script lang="ts">
  let { children } = $props();
</script>

<div class="writeup-page">
  <div class="writeup-scroll-container">
    <div class="writeup-content-wrapper">
      {@render children()}
    </div>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  .writeup-page {
    position: relative;
    z-index: 10;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 6rem;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .writeup-scroll-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 2rem 2rem;
    
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }

  .writeup-scroll-container::-webkit-scrollbar {
    width: 6px;
  }

  .writeup-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .writeup-scroll-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }

  .writeup-scroll-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .writeup-content-wrapper {
    max-width: 850px;
    margin: 0 auto;
    color: #f8f9fa;
  }

  /* Content styles */
  .writeup-content-wrapper :global(.content) {
    line-height: 1.75;
    font-size: 1.0625rem;
    color: #e9ecef;
  }

  .writeup-content-wrapper :global(.content h1) {
    font-size: 2rem;
    font-weight: 700;
    margin: 2.5rem 0 1.25rem;
    color: #ffffff;
  }

  .writeup-content-wrapper :global(.content h2) {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 2.5rem 0 1rem;
    color: #ffffff;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .writeup-content-wrapper :global(.content h3) {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 2rem 0 0.875rem;
    color: #f1f3f5;
  }

  .writeup-content-wrapper :global(.content p) {
    margin: 1.25rem 0;
  }

  .writeup-content-wrapper :global(.content ul),
  .writeup-content-wrapper :global(.content ol) {
    margin: 1.25rem 0;
    padding-left: 1.75rem;
  }

  .writeup-content-wrapper :global(.content li) {
    margin: 0.5rem 0;
  }

  .writeup-content-wrapper :global(.content a) {
    color: #00AEEF;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .writeup-content-wrapper :global(.content a:hover) {
    color: #4CC9FF;
  }

  /* Minimalistic inline code */
  .writeup-content-wrapper :global(.content code) {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875em;
    background: rgba(255, 255, 255, 0.08);
    color: #4CC9FF;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
  }

  /* Minimalistic code blocks - like the terminal image */
  .writeup-content-wrapper :global(.content pre) {
    background: #1a1d23;
    padding: 1.25rem 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .writeup-content-wrapper :global(.content pre code) {
    font-family: 'JetBrains Mono', monospace;
    background: none;
    padding: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #adb5bd;
  }

  /* Terminal prompt styling */
  .writeup-content-wrapper :global(.content pre code .prompt),
  .writeup-content-wrapper :global(.content pre code)::first-line {
    color: #FFD700;
  }

  .writeup-content-wrapper :global(.content strong) {
    font-weight: 600;
    color: #FFD700;
  }

  .writeup-content-wrapper :global(.content blockquote) {
    border-left: 3px solid #9C27B0;
    margin: 1.5rem 0;
    padding: 0.75rem 1.25rem;
    background: rgba(156, 39, 176, 0.08);
    color: #dee2e6;
  }

  .writeup-content-wrapper :global(.loading),
  .writeup-content-wrapper :global(.not-found) {
    text-align: center;
    padding: 4rem 2rem;
  }

  .writeup-content-wrapper :global(.writeup-nav) {
    margin-bottom: 2rem;
  }

  .writeup-content-wrapper :global(.back-btn),
  .writeup-content-wrapper :global(.not-found button) {
    background: transparent;
    border: 1.5px solid #00AEEF;
    color: #00AEEF;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .writeup-content-wrapper :global(.back-btn:hover),
  .writeup-content-wrapper :global(.not-found button:hover) {
    background: #00AEEF;
    color: #000000;
  }

  .writeup-content-wrapper :global(article) {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 3rem;
  }

  .writeup-content-wrapper :global(.writeup-header) {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .writeup-content-wrapper :global(.category) {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(255, 215, 0, 0.12);
    border: 1px solid rgba(255, 215, 0, 0.3);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
    border-radius: 3px;
    color: #FFD700;
  }

  .writeup-content-wrapper :global(.writeup-header h1) {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    color: #ffffff;
  }

  .writeup-content-wrapper :global(.description) {
    font-size: 1.1rem;
    color: #adb5bd;
    margin: 0 0 1.5rem 0;
  }

  .writeup-content-wrapper :global(.meta) {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .writeup-content-wrapper :global(.date) {
    color: #6c757d;
    font-size: 0.9rem;
  }

  .writeup-content-wrapper :global(.tags) {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .writeup-content-wrapper :global(.tag) {
    padding: 0.3rem 0.75rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    border-radius: 3px;
    color: #adb5bd;
  }

  @media (max-width: 768px) {
    .writeup-page {
      padding-top: 4rem;
    }

    .writeup-scroll-container {
      padding: 0 1rem 1rem;
    }

    .writeup-content-wrapper :global(article) {
      padding: 1.5rem;
    }

    .writeup-content-wrapper :global(.writeup-header h1) {
      font-size: 1.75rem;
    }

    .writeup-content-wrapper :global(.content pre) {
      padding: 1rem;
      margin: 1rem -0.5rem;
      border-radius: 0;
    }
  }
</style>