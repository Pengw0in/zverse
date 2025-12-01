<script lang="ts">
  import { onMount } from 'svelte';
  
  const certificates = [
    {
      name: 'CY101',
      description: 'Cyber101 Path',
      image: '/certs/CY101.png', 
    },
    {
      name: 'HACKINF',
      description: 'HackInfinity Battle',
      image: '/certs/HACKINF.png', 
    },
    // Add more certificates here as needed
  ];

  let glitchingCard = $state<number | null>(null);
  let hoveredCard = $state<number | null>(null);

  onMount(() => {
    const triggerRandomGlitch = () => {
      glitchingCard = Math.floor(Math.random() * certificates.length);
      setTimeout(() => {
        glitchingCard = null;
      }, 150 + Math.random() * 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        triggerRandomGlitch();
      }
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  });
</script>

<div class="container">
  <h2>Milestones</h2>
  <p class="subtitle">Certifications & Achievements</p>
  
  <div class="certificates-grid">
    {#each certificates as cert, i}
      <div 
        class="cert-frame"
        class:glitching={glitchingCard === i}
        class:hovered={hoveredCard === i}
        onmouseenter={() => hoveredCard = i}
        onmouseleave={() => hoveredCard = null}
        role="group"
      >
        <div class="frame-border layer-cyan"></div>
        <div class="frame-border layer-magenta"></div>
        <div class="frame-border layer-yellow"></div>
        <div class="frame-border layer-main"></div>

        <div class="image-container">
          <img src={cert.image} alt={cert.name} />
          <div class="scanlines"></div>
          <div class="glitch-overlay"></div>
        </div>

        <div class="cert-label">
          <span class="label-text">{cert.name}</span>
          <span class="label-desc">{cert.description}</span>
        </div>

        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
      </div>
    {/each}
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

  .container {
    text-align: center;
    padding: 6rem 2rem 4rem; 
    width: 100%;
    height: 100vh;
    overflow-y: auto; 
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: #00afef00 transparent;
  }

  /* Webkit Scrollbar styling */
  .container::-webkit-scrollbar {
    width: 6px;
  }
  .container::-webkit-scrollbar-track {
    background: transparent;
  }
  .container::-webkit-scrollbar-thumb {
    background-color: #00afef00;
    border-radius: 3px;
  }

  h2 {
    font-family: 'CustomHeaderFont', sans-serif;
    font-size: 6rem;
    margin-bottom: 0.5rem;
    margin-top: 0;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 0em;

    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.8;
    margin-bottom: 3rem;

    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  /* Grid Layout - Wraps items naturally */
  .certificates-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
    padding: 0 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* The Frame Container */
  .cert-frame {
    position: relative;
    width: 100%;
    max-width: 450px; 
    padding: 15px; 
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .cert-frame:hover {
    transform: scale(1.02);
  }

  /* Frame Borders */
  .frame-border {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border: 2px solid white;
    pointer-events: none;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .layer-main { z-index: 2; border-color: white; background: rgba(0,0,0,0.2); }
  .layer-cyan { z-index: 1; border-color: #00AEEF; opacity: 0; }
  .layer-magenta { z-index: 1; border-color: #9C27B0; opacity: 0; }
  .layer-yellow { z-index: 1; border-color: #FFD700; opacity: 0; }

  /* Image Area */
  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1.41;
    background: #111;
    overflow: hidden;
    z-index: 3;
    border: 1px solid rgba(255,255,255,0.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.2);
    transition: filter 0.3s ease;
  }

  .cert-frame:hover img {
    filter: grayscale(0%) contrast(1);
  }

  /* Scanlines on image */
  .scanlines {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      rgba(0, 0, 0, 0.2) 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 4;
    opacity: 0.5;
  }

  /* Label */
  .cert-label {
    margin-top: 1rem;
    text-align: left;
    position: relative;
    z-index: 5;
  }

  .label-text {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: white;
  }

  .label-desc {
    display: block;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    font-family: 'JetBrains Mono', monospace;
    margin-top: 0.2rem;
  }

  /* Corners */
  .corner {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 2px solid #FFD700;
    z-index: 6;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .top-left { top: -1px; left: -1px; border-right: none; border-bottom: none; }
  .top-right { top: -1px; right: -1px; border-left: none; border-bottom: none; }
  .bottom-left { bottom: -1px; left: -1px; border-right: none; border-top: none; }
  .bottom-right { bottom: -1px; right: -1px; border-left: none; border-top: none; }

  /* Hover Effects */
  .cert-frame:hover .layer-cyan { opacity: 0.8; transform: translate(-4px, -4px); }
  .cert-frame:hover .layer-magenta { opacity: 0.8; transform: translate(4px, 4px); }
  .cert-frame:hover .layer-yellow { opacity: 0.6; transform: translate(-2px, 4px); }
  .cert-frame:hover .corner { opacity: 1; }
  .cert-frame:hover .label-text { color: #00AEEF; }

  /* Glitch Animation State */
  .cert-frame.glitching .layer-cyan { opacity: 1; animation: glitch-anim-1 0.2s infinite; }
  .cert-frame.glitching .layer-magenta { opacity: 1; animation: glitch-anim-2 0.2s infinite; }
  .cert-frame.glitching img { filter: hue-rotate(90deg) contrast(1.5); }
  .cert-frame.glitching .corner { opacity: 1; border-color: #00AEEF; }

  @keyframes glitch-anim-1 {
    0% { transform: translate(0); }
    20% { transform: translate(-5px, 5px); }
    40% { transform: translate(-5px, -5px); }
    60% { transform: translate(5px, 5px); }
    80% { transform: translate(5px, -5px); }
    100% { transform: translate(0); }
  }

  @keyframes glitch-anim-2 {
    0% { transform: translate(0); }
    20% { transform: translate(5px, -5px); }
    40% { transform: translate(5px, 5px); }
    60% { transform: translate(-5px, -5px); }
    80% { transform: translate(-5px, 5px); }
    100% { transform: translate(0); }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2.5rem;
    }

    .cert-frame {
      max-width: 100%;
      padding: 10px;
    }

    .certificates-grid {
      padding: 0 1rem;
      gap: 2rem;
    }
    
    .label-text {
      font-size: 1rem;
    }

    .label-desc {
      font-size: 0.8rem;
    }
  }
</style>