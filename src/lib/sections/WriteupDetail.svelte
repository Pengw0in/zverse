<script lang="ts">
  import { onMount } from 'svelte';
  import type { WriteupMetadata } from '$lib/utils/markdown';
  import WriteupContainer from '../WriteupContainer.svelte';
  import GlitchText from '$lib/GlitchText.svelte';
  
  let { slug } = $props<{ slug: string }>();
  
  let writeup = $state<WriteupMetadata | null>(null);
  let content = $state<string>('');
  let loading = $state(true);
  let lightboxImage = $state<string | null>(null);
  
  // Improved markdown to HTML converter
  function markdownToHtml(md: string): string {
    let html = md
      // Code blocks first (before other transformations)
      .replace(/```(\w*)\n([\s\S]*?)```/gim, (_, lang, code) => {
        return `<pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
      })
      // Images - handle markdown image syntax ![alt](src)
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<div class="image-wrapper"><img src="$2" alt="$1" class="content-image" loading="lazy"></div>')
      // Also handle raw img tags
      .replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
        if (match.includes('class="content-image"')) return match;
        return `<div class="image-wrapper"><img ${attrs} class="content-image" loading="lazy"></div>`;
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
      .filter(block => block !== '' && block !== '<p></p>' && block !== '<p><br></p>')
      .join('\n');
    
    return html;
  }

  function handleImageClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG' && target.classList.contains('content-image')) {
      const img = target as HTMLImageElement;
      lightboxImage = img.src;
    }
  }

  function closeLightbox() {
    lightboxImage = null;
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
        const fileName = path.split('/').pop() || '';
        const fileSlug = decodeURIComponent(fileName.replace('.md', ''));
        
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
</script>

<WriteupContainer>
  {#if loading}
    <div class="loading">
      <div class="terminal-loader">
        <span>&gt;</span> INITIALIZING_DATA_STREAM...
      </div>
    </div>
  {:else if !writeup}
    <div class="not-found">
      <h1>ERROR 404</h1>
      <p>ARCHIVE_ENTRY_NOT_FOUND</p>
    </div>
  {:else}
    <article>
      <header class="writeup-header">
        <div class="title-section">
          <h1>
            <GlitchText text={writeup.title} intensity="subtle" halftone={false} />
          </h1>
        </div>

        <p class="description">{writeup.description}</p>
        
        <div class="tags-row">
          {#each writeup.tags as tag}
            <span class="tag">#{tag}</span>
          {/each}
        </div>
      </header>
      
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="content" onclick={handleImageClick}>
        {@html content}
      </div>
      
      <div class="article-footer">
        <span class="eof">EOF</span>
      </div>
    </article>
  {/if}
</WriteupContainer>

{#if lightboxImage}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="lightbox" onclick={closeLightbox}>
    <img src={lightboxImage} alt="Enlarged view" />
  </div>
{/if}

<style>
  .terminal-loader {
    font-family: 'JetBrains Mono', monospace;
    color: #00AEEF;
    font-size: 1.2rem;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .title-section {
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 3rem;
    line-height: 1.1;
    margin: 0;
    /* text-transform: uppercase; */
    letter-spacing: -0.03em;
  }

  .description {
    font-size: 1.25rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    border-left: 3px solid #FFD700;
    padding-left: 1.5rem;
  }

  .tags-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: none;
    margin-bottom: 0;
  }

  .tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.2s;
    cursor: pointer;
  }

  .tag:hover {
    color: #FFD700;
  }

  /* Content styling */
  .content {
    margin-top: 0;
  }

  .content :global(*) {
    border: none;
    letter-spacing: -0.03em;
  }

  .content :global(hr) {
    display: none;
  }

  .content :global(p:empty),
  .content :global(div:empty) {
    display: none;
  }

  .content :global(p) {
    margin: 1rem 0;
  }

  .content :global(p:first-child) {
    margin-top: 1rem;
  }

  /* Image styling */
  .content :global(.image-wrapper) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    border: none;
  }

  .content :global(.content-image) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.2s ease;
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  .content :global(.content-image:hover) {
    border-color: rgba(255, 255, 255, 0.4);
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
    cursor: pointer;
  }

  .lightbox img {
    max-width: 95%;
    max-height: 95vh;
    object-fit: contain;
    border-radius: 8px;
  }

  .article-footer {
    margin-top: 4rem;
    border-top: 1px dashed rgba(255, 255, 255, 0.2);
    padding-top: 1rem;
    text-align: center;
  }

  .eof {
    font-family: 'JetBrains Mono', monospace;
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 0.2em;
  }

  @media (max-width: 768px) {
    h1 { font-size: 2rem; }
    .description { font-size: 1.1rem; padding-left: 1rem; }
    
    .lightbox {
      padding: 1rem;
    }
  }
</style>