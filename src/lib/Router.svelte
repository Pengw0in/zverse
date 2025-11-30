<script lang="ts">
  import { onMount } from 'svelte';
  import Section from './Section.svelte';
  
  import Hero from './sections/Hero.svelte';
  import Playbook from './sections/Projects.svelte';
  import Writeups from './sections/Writeups.svelte';
  import Contacts from './sections/Contacts.svelte';
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

    // dedicated writeups list (either #/writeups or #writeups)
    if (hash === '#/writeups' || hash === '#writeups') {
      currentRoute = { page: 'writeups' };
      targetSection = null;
      // ensure top of the writeups section
      setTimeout(() => {
        const el = document.getElementById('writeups');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    // Any other section/hash should render home and attempt to scroll to that section.
    currentRoute = { page: 'home' };

    // detect section name (allow both "#section" and "#/section")
    const m = hash.match(/^#\/?([a-zA-Z0-9_-]+)$/);
    if (m) {
      const sectionId = m[1];
      targetSection = sectionId;
      // wait until home is rendered
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'instant' }); // Changed to 'instant' to prevent flash
        }
      }, 0); // Reduced timeout to 0 for immediate scroll
    } else {
      targetSection = null;
      // default: scroll to top of home
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

  <Section id="playbook">
    <Playbook />
  </Section>

  <Section id="writeups">
    <Writeups />
  </Section>

  <Section id="contacts">
    <Contacts />
  </Section>
{:else if currentRoute.page === 'writeups'}
  <Section id="writeups">
    <Writeups />
  </Section>
{:else if currentRoute.page === 'writeup' && currentRoute.slug}
  <WriteupDetail slug={currentRoute.slug} />
{/if}