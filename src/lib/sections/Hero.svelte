<script lang="ts">
  import GlitchText from '../GlitchText.svelte';
  // Hero specific logic can go here
</script>

<div class="hero-wrapper">
  <h1>
    <GlitchText text="WEB APPLICATION" intensity="normal" /> <br>
    <GlitchText text="PENETRATION" intensity="normal" /> <br>
    <GlitchText text="TESTER." intensity="normal" />
  </h1>
  
  <div class="content">
    <h2>Hi! I'm Lohith Srikar.</h2>
    <p class="lead">
      I'm into web technologies: I design and build websites and test their security.
    </p>
    <p class="details">
      This site is my personal site for sharing writeups, milestones, projects, and anything I find interesting.
    </p>
  </div>
</div>

<style>
  @font-face {
    font-family: 'CustomHeaderFont';
    src: url('/Redig-Oblique.woff') format('woff'); 
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  .hero-wrapper {
    text-align: center;
    max-width: 900px;
    width: 100%;
    margin-left: 0; 
    transform: translate(0vw, 0vh);
    
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  h1 {
    font-family: 'CustomHeaderFont', sans-serif;
    font-size: clamp(3rem, 14vw, 12rem);
    line-height: 0.9;
    letter-spacing: 0.01em;
    margin: 0 0 3rem 0;
    font-weight: 600;
    text-transform: uppercase;
  }

  .content {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    letter-spacing: 0.05em;
  }

  p {
    margin: 0 0 1rem 0;
  }

  .lead {
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .details {
    font-size: 0.95rem;
    font-weight: 300;
    opacity: 0.8;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .hero-wrapper {
      padding: 0 1.5rem;
    }

    h1 {
      font-size: clamp(2.5rem, 12vw, 8rem);
    }
  }

  @media (max-width: 480px) {
    .hero-wrapper {
      padding: 0 1rem;
    }
  }
</style>