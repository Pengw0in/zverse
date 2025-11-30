<script lang="ts">
  // No logic needed for now
</script>

<header>
  <nav>
    <a href="/" class="logo">ZENDEXVERSE</a>
    <a href="#playbook">PROJECTS</a>
    <a href="#socials">WRITEUPS</a>
    <a href="#contacts">CONTACTS</a>
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
    pointer-events: none; /* Let clicks pass through empty space to the background */
    box-sizing: border-box;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    pointer-events: auto; /* Re-enable clicks */
  }

  a {
    text-decoration: none;
    color: currentColor;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    opacity: 0.9;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  /* Specific styling for the logo link */
  a.logo {
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.02em;
    opacity: 1;
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
  }
</style>