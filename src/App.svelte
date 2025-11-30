<script lang="ts">
  import BayerBackground from './lib/BayerBackground.svelte';
  import Header from './lib/Header.svelte';
  import EmailSidebar from './lib/EmailSidebar.svelte';
  import Router from './lib/Router.svelte';
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</svelte:head>

<BayerBackground pixelSize={4} bg="#000000" blur={1} />
<Header />
<EmailSidebar />

<main>
  <Router />
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