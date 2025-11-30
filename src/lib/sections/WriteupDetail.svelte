<script lang="ts">
  import { onMount } from 'svelte';
  import type { WriteupMetadata } from '$lib/utils/markdown';
  
  let { slug } = $props<{ slug: string }>();
  
  let writeup = $state<WriteupMetadata | null>(null);
  let content = $state<string>('');
  let loading = $state(true);
  
  // Improved markdown to HTML converter
  function markdownToHtml(md: string): string {
    let html = md
      // Code blocks first (before other transformations)
      .replace(/```(\w*)\n([\s\S]*?)```/gim, (_, lang, code) => {
        return `<pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
      })
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Inline code (after code blocks)
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Lists
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      // Wrap consecutive <li> in <ul>
      .replace(/(<li>.*<\/li>\n?)+/gim, '<ul>$&</ul>')
      // Paragraphs - wrap lines that aren't already wrapped
      .split('\n\n')
      .map(block => {
        block = block.trim();
        if (!block) return '';
        if (block.startsWith('<')) return block;
        return `<p>${block.replace(/\n/g, '<br>')}</p>`;
      })
      .join('\n');
    
    return html;
  }
  
  onMount(async () => {
    try {
      const decodedSlug = decodeURIComponent(slug);
      
      const modules = import.meta.glob('/src/content/writeups/*.md', { 
        query: '?raw',
        import: 'default',
        eager: true
      });
      
      for (const [path, module] of Object.entries(modules)) {
        const fileSlug = path.split('/').pop()?.replace('.md', '');
        
        if (fileSlug === decodedSlug) {
          const rawContent = module as string;
          
          const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
          const match = frontmatterRegex.exec(rawContent);
          
          if (match) {
            const frontmatterBlock = match[1];
            const markdownContent = match[2];
            content = markdownToHtml(markdownContent);
            
            const data: Record<string, any> = {};
            frontmatterBlock.split('\n').forEach(line => {
              const parts = line.split(':');
              if (parts.length < 2) return;
              const key = parts[0].trim();
              let value: any = parts.slice(1).join(':').trim();
              if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map((s: string) => s.trim());
              }
              data[key] = value;
            });
            
            writeup = {
              title: data.title || 'Untitled',
              description: data.description || '',
              date: data.date || '',
              category: data.category || 'Uncategorized',
              tags: Array.isArray(data.tags) ? data.tags : [],
              slug: decodedSlug
            };
          }
          break;
        }
      }
      
      loading = false;
    } catch (error) {
      console.error('Error loading writeup:', error);
      loading = false;
    }
  });
  
  function goBack() {
    window.location.hash = '#socials';
  }
</script>

<div class="writeup-page">
  <div class="writeup-scroll-container">
    <div class="writeup-content-wrapper">
      {#if loading}
        <div class="loading">Loading writeup...</div>
      {:else if !writeup}
        <div class="not-found">
          <h1>Writeup not found</h1>
          <button onclick={goBack}>← Back to writeups</button>
        </div>
      {:else}
        <nav class="writeup-nav">
          <button class="back-btn" onclick={goBack}>← Back to writeups</button>
        </nav>
        
        <article>
          <header class="writeup-header">
            <div class="category">{writeup.category}</div>
            <h1>{writeup.title}</h1>
            <p class="description">{writeup.description}</p>
            <div class="meta">
              <span class="date">{writeup.date}</span>
              <div class="tags">
                {#each writeup.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            </div>
          </header>
          
          <div class="content">
            {@html content}
          </div>
        </article>
      {/if}
    </div>
  </div>
</div>

<style>
  .writeup-page {
    position: relative;
    z-index: 10;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 6rem;
    box-sizing: border-box;
  }

  .writeup-scroll-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 2rem 2rem;
    
    /* Custom scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  }

  .writeup-scroll-container::-webkit-scrollbar {
    width: 6px;
  }

  .writeup-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .writeup-scroll-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  .writeup-scroll-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .writeup-content-wrapper {
    max-width: 900px;
    margin: 0 auto;
    color: white;
  }

  .loading,
  .not-found {
    text-align: center;
    padding: 4rem 2rem;
  }

  .writeup-nav {
    margin-bottom: 2rem;
  }

  .back-btn,
  .not-found button {
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid #00AEEF;
    color: #00AEEF;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.8rem 1.5rem;
    transition: all 0.2s;
  }

  .back-btn:hover,
  .not-found button:hover {
    background: #00AEEF;
    color: black;
  }

  article {
    background: rgba(0, 0, 0, 0.85);
    border: 2px solid rgba(255, 255, 255, 0.2);
    padding: 3rem;
  }

  .writeup-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  }

  .category {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(255, 215, 0, 0.2);
    border: 1px solid #FFD700;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    line-height: 1.2;
  }

  .description {
    font-size: 1.1rem;
    opacity: 0.8;
    margin: 0 0 1.5rem 0;
  }

  .meta {
    display: flex;
    gap: 2rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .date {
    opacity: 0.6;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    padding: 0.3rem 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .content {
    line-height: 1.8;
    font-size: 1.05rem;
  }

  .content :global(h1) {
    font-size: 2rem;
    margin: 2.5rem 0 1rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }

  .content :global(h2) {
    font-size: 1.75rem;
    margin: 2.5rem 0 1rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.5rem;
  }

  .content :global(h3) {
    font-size: 1.4rem;
    margin: 2rem 0 1rem;
  }

  .content :global(p) {
    margin: 1rem 0;
  }

  .content :global(ul) {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .content :global(li) {
    margin: 0.5rem 0;
  }

  .content :global(a) {
    color: #00AEEF;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .content :global(a:hover) {
    color: #FFD700;
  }

  .content :global(code) {
    background: rgba(0, 174, 239, 0.15);
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-family: 'Courier New', Consolas, monospace;
    font-size: 0.9em;
    color: #00AEEF;
  }

  .content :global(pre) {
    background: rgba(0, 0, 0, 0.9);
    padding: 1.5rem;
    border-left: 4px solid #00AEEF;
    overflow-x: auto;
    margin: 1.5rem 0;
    border-radius: 0 4px 4px 0;
  }

  .content :global(pre code) {
    background: none;
    padding: 0;
    color: #e0e0e0;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .content :global(strong) {
    color: #FFD700;
  }

  .content :global(blockquote) {
    border-left: 4px solid #9C27B0;
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    background: rgba(156, 39, 176, 0.1);
  }

  @media (max-width: 768px) {
    .writeup-page {
      padding-top: 4rem;
    }

    .writeup-scroll-container {
      padding: 0 1rem 1rem;
    }

    article {
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    .description {
      font-size: 1rem;
    }

    .content {
      font-size: 1rem;
    }

    .content :global(pre) {
      padding: 1rem;
      font-size: 0.85rem;
    }
  }
</style>