<script lang="ts">
  import { onMount } from 'svelte';
  import GlitchText from './GlitchText.svelte';
  
  let isVisible = $state(true);
  let lastScrollY = $state(0);
  let hideTimeout: ReturnType<typeof setTimeout> | null = null;
  let isWriteupPage = $state(false);
  let scrollContainer: HTMLElement | null = null;
  
  function goHome() {
    window.location.hash = '#hero';
  }

  function handleScroll() {
    if (!scrollContainer) return;
    
    const currentScrollY = scrollContainer.scrollTop;
    
    // Show header when scrolling up
    if (currentScrollY < lastScrollY) {
      isVisible = true;
      
      // Clear existing timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      
      // Hide after 2 seconds of no scroll activity
      hideTimeout = setTimeout(() => {
        if (currentScrollY > 100) {
          isVisible = false;
        }
      }, 2000);
    } 
    // Hide when scrolling down past 100px
    else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      isVisible = false;
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    }
    
    lastScrollY = currentScrollY;
  }

  function checkRoute() {
    isWriteupPage = window.location.hash.startsWith('#/writeups/');
    
    // Reset visibility when route changes
    isVisible = true;
    lastScrollY = 0;
    
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    // Find the scroll container for writeup pages
    setTimeout(() => {
      if (isWriteupPage) {
        scrollContainer = document.querySelector('.writeup-scroll-container');
        if (scrollContainer) {
          scrollContainer.addEventListener('scroll', handleScroll);
        }
      } else {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
        }
        scrollContainer = null;
      }
    }, 100);
  }

  onMount(() => {
    checkRoute();
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  });
</script>

<header class:hidden={!isVisible && isWriteupPage} class:writeup-mode={isWriteupPage}>
  <nav>
    <button class="logo" onclick={goHome}>
      <GlitchText text="ZENDEXVERSE" hoverOnly={true} intensity="subtle" halftone={false}/>
    </button>
    <a href="#/playbook">
      <GlitchText text="PROJECTS" hoverOnly={true} intensity="subtle" halftone={false}/>
    </a>
    <a href="#/writeups">
      <GlitchText text="WRITEUPS" hoverOnly={true} intensity="subtle" halftone={false}/>
    </a>
    <a href="#/contacts">
      <GlitchText text="CONTACTS" hoverOnly={true} intensity="subtle" halftone={false}/>
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
    padding: 1.5rem 4rem;
    z-index: 50;
    mix-blend-mode: difference;
    color: white;
    pointer-events: none;
    box-sizing: border-box;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  header.writeup-mode {
    mix-blend-mode: normal;
    background: transparent;
  }

  header.hidden {
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    pointer-events: auto;
  }

  header.hidden nav {
    pointer-events: none;
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
      padding: 1rem 1.5rem;
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