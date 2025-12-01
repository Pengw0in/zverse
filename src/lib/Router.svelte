<script lang="ts">
  import { onMount } from 'svelte';
  import Section from './Section.svelte';
  
  import Hero from './sections/Hero.svelte';
  import About from './sections/About.svelte';
  import Writeups from './sections/Writeups.svelte';
  import Projects from './sections/Projects.svelte';
  import Milestones from './sections/Milestones.svelte';
  import WriteupDetail from './sections/WriteupDetail.svelte';
  
  let currentRoute = $state<{ page: 'home' | 'writeup' | 'writeups'; slug?: string }>({ page: 'home' });
  let targetSection = $state<string | null>(null);
  
  function navigate() {
    const hash = window.location.hash || '';

    if (hash.startsWith('#/writeups/')) {
      const slug = decodeURIComponent(hash.replace('#/writeups/', ''));
      currentRoute = { page: 'writeup', slug };
      targetSection = null;
      return;
    }

    if (hash === '#/writeups' || hash === '#writeups') {
      currentRoute = { page: 'writeups' };
      targetSection = null;
      setTimeout(() => {
        const el = document.getElementById('writeups');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    currentRoute = { page: 'home' };

    const m = hash.match(/^#\/?([a-zA-Z0-9_-]+)$/);
    if (m) {
      const sectionId = m[1];
      targetSection = sectionId;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'instant' });
        }
      }, 0);
    } else {
      targetSection = null;
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
    }
  }
  
  onMount(() => {
    navigate();
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  });
</script>

{#if currentRoute.page === 'home'}
  <Section id="hero">
    <Hero />
  </Section>

  <Section id="about">
    <About />
  </Section>

  <Section id="writeups">
    <Writeups />
  </Section>

  <Section id="projects">
    <Projects />
  </Section>

  <Section id="milestones">
    <Milestones />
  </Section>
{:else if currentRoute.page === 'writeups'}
  <Section id="writeups">
    <Writeups />
  </Section>
{:else if currentRoute.page === 'writeup' && currentRoute.slug}
  <WriteupDetail slug={currentRoute.slug} />
{/if}