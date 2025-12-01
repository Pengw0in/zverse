<div class="container">
  <h2>Projects</h2>
  <p class="subtitle">Selected Works</p>
  
  <div class="grid">
    <!-- Project placeholders -->
    <div class="project-card">
      <h3>Project Alpha</h3>
      <p>Coming soon...</p>
    </div>
    <div class="project-card">
      <h3>Project Beta</h3>
      <p>Coming soon...</p>
    </div>
  </div>
</div>

<style>
  .container { text-align: center; padding: 4rem 2rem; }
  h2 { font-size: 4rem; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 800; }
  .subtitle { font-size: 1.2rem; opacity: 0.6; margin-bottom: 3rem; }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .project-card {
    border: 1px solid rgba(255,255,255,0.2);
    padding: 2rem;
    text-align: left;
    transition: all 0.2s;
  }

  .project-card:hover {
    border-color: #00AEEF;
    transform: translateY(-5px);
  }

  h3 { margin: 0 0 1rem 0; color: #00AEEF; }
</style>