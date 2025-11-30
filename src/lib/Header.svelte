<script lang="ts">
  import GlitchText from './GlitchText.svelte';
</script>

<header>
  <nav>
    <button class="logo" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <GlitchText text="ZENDEXVERSE" hoverOnly={true} intensity="subtle" />
    </button>
    <a href="#playbook">
      <GlitchText text="PROJECTS" hoverOnly={true} intensity="subtle" />
    </a>
    <a href="#writeups">
      <GlitchText text="WRITEUPS" hoverOnly={true} intensity="subtle" />
    </a>
    <a href="#contacts">
      <GlitchText text="CONTACTS" hoverOnly={true} intensity="subtle" />
    </a>
  </nav>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 2.5rem 4rem;
    z-index: 50;
    mix-blend-mode: difference;
    color: white;
    pointer-events: none;
    box-sizing: border-box;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    pointer-events: auto;
  }

  a {
    text-decoration: none;
    color: currentColor;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.05em;
  }

  button.logo {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: white;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.02em;
    margin-left: 2rem;
  }

  @media (max-width: 768px) {
    header {
      padding: 1.5rem;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    
    nav {
      gap: 2rem;
    }

    button.logo {
      margin-left: 0;
    }
  }
</style>