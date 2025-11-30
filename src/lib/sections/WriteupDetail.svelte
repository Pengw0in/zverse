<script lang="ts">
  import { onMount } from 'svelte';
  import type { WriteupMetadata } from '$lib/utils/markdown';
  import WriteupContainer from '../WriteupContainer.svelte';
  
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
</script>

<WriteupContainer>
  {#if loading}
    <div class="loading">Loading writeup...</div>
  {:else if !writeup}
    <div class="not-found">
      <h1>Writeup not found</h1>
      <p>The writeup you're looking for doesn't exist.</p>
    </div>
  {:else}
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
</WriteupContainer>