export interface WriteupMetadata {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatterBlock = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  frontmatterBlock.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length < 2) return;

    const key = parts[0].trim();
    let value: any = parts.slice(1).join(':').trim();

    // Remove quotes if present
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s: string) => s.trim());
    }

    data[key] = value;
  });

  return { data, content };
}

export async function getWriteups(): Promise<WriteupMetadata[]> {
  try {
    const writeupModules = import.meta.glob('/src/content/writeups/*.md', { 
      query: '?raw',
      import: 'default',
      eager: true
    });

    console.log('Found modules:', Object.keys(writeupModules));

    const writeups: WriteupMetadata[] = [];

    for (const [path, module] of Object.entries(writeupModules)) {
      try {
        const content = module;
        
        if (typeof content !== 'string') {
          console.error(`Content is not a string for ${path}:`, typeof content);
          continue;
        }

        
        const { data } = parseFrontmatter(content);
        const slug = decodeURIComponent(path.split('/').pop()?.replace('.md', '') || '');

        writeups.push({
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || '',
          category: data.category || 'Uncategorized',
          tags: Array.isArray(data.tags) ? data.tags : [],
          slug
        });
      } catch (err) {
        console.error(`Error parsing ${path}:`, err);
      }
    }

    console.log('Loaded writeups:', writeups);

    return writeups.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading writeups:', error);
    return [];
  }
}