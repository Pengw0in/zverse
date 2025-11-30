<script lang="ts">
  import { onMount } from 'svelte';
  import BayerBackground from './lib/BayerBackground.svelte';
  import Header from './lib/Header.svelte';
  import EmailSidebar from './lib/EmailSidebar.svelte';
  import Section from './lib/Section.svelte';
  
  import Hero from './lib/sections/Hero.svelte';
  import Playbook from './lib/sections/Projects.svelte';
  import Socials from './lib/sections/Writeups.svelte';
  import Contacts from './lib/sections/Contacts.svelte';
  import WriteupDetail from './lib/sections/WriteupDetail.svelte';
  
  let currentRoute = $state<{ page: 'home' | 'writeup'; slug?: string }>({ page: 'home' });
  
  function navigate() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#/writeups/')) {
      // Decode the slug to handle spaces and special characters
      const slug = decodeURIComponent(hash.replace('#/writeups/', ''));
      currentRoute = { page: 'writeup', slug };
    } else {
      currentRoute = { page: 'home' };
    }
  }
  
  onMount(() => {
    navigate();
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</svelte:head>

<BayerBackground pixelSize={4} bg="#000000" blur={1} />
<Header />
<EmailSidebar />

<main>
  {#if currentRoute.page === 'home'}
    <Section id="hero">
      <Hero />
    </Section>

    <Section id="playbook">
      <Playbook />
    </Section>

    <Section id="socials">
      <Socials />
    </Section>

    <Section id="contacts">
      <Contacts />
    </Section>
  {:else if currentRoute.page === 'writeup' && currentRoute.slug}
    <WriteupDetail slug={currentRoute.slug} />
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #0d0d0d;
    overflow-x: hidden;
    overflow: hidden;
  }

  main {
    position: relative;
    z-index: 1;
    width: 100%;
  }
</style>