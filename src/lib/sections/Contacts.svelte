<script lang="ts">
  import { onMount } from 'svelte';
  
  const contacts = [
    {
      name: 'GitHub',
      url: 'https://github.com/Pengw0in',
      icon: '◈'
    },
    {
      name: 'Discord',
      url: 'https://discordapp.com/users/1364667672968822858',
      icon: '◉'
    }
  ];

  let glitchingCard = $state<number | null>(null);
  let hoveredCard = $state<number | null>(null);

  onMount(() => {
    const triggerRandomGlitch = () => {
      glitchingCard = Math.floor(Math.random() * contacts.length);
      setTimeout(() => {
        glitchingCard = null;
      }, 150 + Math.random() * 200);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        triggerRandomGlitch();
      }
    }, 2500 + Math.random() * 2000);

    return () => clearInterval(interval);
  });
</script>

<div class="container">
  <h2>Found me cool?</h2>
  <p class="subtitle">Let's connect</p>
  
  <div class="contacts-grid">
    {#each contacts as contact, i}
      <a 
        href={contact.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        class="contact-card"
        class:glitching={glitchingCard === i}
        class:hovered={hoveredCard === i}
        onmouseenter={() => hoveredCard = i}
        onmouseleave={() => hoveredCard = null}
      >
        <!-- Background layers for depth -->
        <div class="card-bg layer-1"></div>
        <div class="card-bg layer-2"></div>
        <div class="card-bg layer-3"></div>
        
        <!-- Icon -->
        <div class="icon-wrapper">
          <span class="icon">{contact.icon}</span>
          <span class="icon-glitch cyan">{contact.icon}</span>
          <span class="icon-glitch magenta">{contact.icon}</span>
        </div>
        
        <!-- Text content -->
        <div class="text-wrapper">
          <span class="offset-layer cyan">{contact.name}</span>
          <span class="offset-layer magenta">{contact.name}</span>
          <span class="offset-layer yellow">{contact.name}</span>
          <span class="main-text">{contact.name}</span>
        </div>
        
        <!-- Arrow indicator -->
        <div class="arrow-wrapper">
          <span class="arrow">→</span>
        </div>
        
        <!-- Comic effects -->
        <div class="halftone-overlay"></div>
        <div class="scanlines"></div>
        
        <!-- Corner accents -->
        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
      </a>
    {/each}
  </div>
</div>

<style>
  .container {
    text-align: center;
    padding: 4rem 2rem;
  }

  h2 {
    font-size: 3.5rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.6;
    margin-bottom: 3rem;
  }

  .contacts-grid {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;
    margin: 0 auto;
  }

  .contact-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.5rem 2rem;
    background: transparent;
    text-decoration: none;
    color: white;
    min-width: 240px;
    overflow: visible;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .contact-card:hover {
    transform: translate(-4px, -4px);
  }

  /* Stacked background layers - comic panel depth */
  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid white;
    transition: all 0.2s ease;
  }

  .card-bg.layer-1 {
    background: rgba(0, 0, 0, 0.9);
    z-index: -1;
  }

  .card-bg.layer-2 {
    background: #00AEEF;
    transform: translate(4px, 4px);
    z-index: -2;
    opacity: 0.8;
  }

  .card-bg.layer-3 {
    background: #9C27B0;
    transform: translate(8px, 8px);
    z-index: -3;
    opacity: 0.6;
  }

  .contact-card:hover .card-bg.layer-2 {
    transform: translate(6px, 6px);
  }

  .contact-card:hover .card-bg.layer-3 {
    transform: translate(12px, 12px);
  }

  /* Icon styling */
  .icon-wrapper {
    position: relative;
    font-size: 1.8rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    position: relative;
    z-index: 2;
  }

  .icon-glitch {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .icon-glitch.cyan {
    color: #00AEEF;
  }

  .icon-glitch.magenta {
    color: #9C27B0;
  }

  /* Text wrapper */
  .text-wrapper {
    position: relative;
    flex: 1;
  }

  .offset-layer {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.3rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0;
    pointer-events: none;
  }

  .offset-layer.cyan {
    color: #00AEEF;
    transform: translate(-2px, -1px);
  }

  .offset-layer.magenta {
    color: #9C27B0;
    transform: translate(2px, 1px);
  }

  .offset-layer.yellow {
    color: #FFD700;
    transform: translate(-1px, 2px);
    mix-blend-mode: overlay;
  }

  .main-text {
    position: relative;
    font-size: 1.3rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    z-index: 2;
  }

  /* Arrow */
  .arrow-wrapper {
    position: relative;
    font-size: 1.5rem;
    transition: transform 0.2s ease;
  }

  .contact-card:hover .arrow-wrapper {
    transform: translateX(5px);
  }

  /* Halftone overlay */
  .halftone-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    );
    background-size: 4px 4px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.6;
  }

  /* Scanlines */
  .scanlines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      rgba(0, 0, 0, 0.1) 1px,
      transparent 2px
    );
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .contact-card:hover .scanlines {
    opacity: 1;
  }

  /* Corner accents */
  .corner {
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid #FFD700;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .contact-card:hover .corner {
    opacity: 1;
  }

  .corner.top-left {
    top: -4px;
    left: -4px;
    border-right: none;
    border-bottom: none;
  }

  .corner.top-right {
    top: -4px;
    right: -4px;
    border-left: none;
    border-bottom: none;
  }

  .corner.bottom-left {
    bottom: -4px;
    left: -4px;
    border-right: none;
    border-top: none;
  }

  .corner.bottom-right {
    bottom: -4px;
    right: -4px;
    border-left: none;
    border-top: none;
  }

  /* Hover offset layers */
  .contact-card:hover .offset-layer {
    opacity: 0.6;
  }

  .contact-card:hover .icon-glitch.cyan {
    opacity: 0.7;
    transform: translate(-2px, -1px);
  }

  .contact-card:hover .icon-glitch.magenta {
    opacity: 0.7;
    transform: translate(2px, 1px);
  }

  /* Glitch state */
  .contact-card.glitching .offset-layer.cyan {
    opacity: 0.9;
    animation: cmyk-glitch-1 0.1s steps(2) infinite;
  }

  .contact-card.glitching .offset-layer.magenta {
    opacity: 0.9;
    animation: cmyk-glitch-2 0.1s steps(2) infinite;
  }

  .contact-card.glitching .offset-layer.yellow {
    opacity: 0.8;
    animation: cmyk-glitch-3 0.1s steps(2) infinite;
  }

  .contact-card.glitching .main-text {
    animation: main-glitch 0.1s steps(2) infinite;
  }

  .contact-card.glitching .card-bg.layer-2 {
    animation: layer-glitch-1 0.1s steps(2) infinite;
  }

  .contact-card.glitching .card-bg.layer-3 {
    animation: layer-glitch-2 0.1s steps(2) infinite;
  }

  .contact-card.glitching .icon-glitch.cyan {
    opacity: 0.9;
    animation: icon-glitch-1 0.1s steps(2) infinite;
  }

  .contact-card.glitching .icon-glitch.magenta {
    opacity: 0.9;
    animation: icon-glitch-2 0.1s steps(2) infinite;
  }

  .contact-card.glitching .corner {
    opacity: 1;
    animation: corner-flash 0.1s steps(2) infinite;
  }

  @keyframes cmyk-glitch-1 {
    0% { transform: translate(-2px, -1px); }
    25% { transform: translate(-4px, 1px); }
    50% { transform: translate(-1px, -3px); }
    75% { transform: translate(-5px, 2px); }
    100% { transform: translate(-2px, -1px); }
  }

  @keyframes cmyk-glitch-2 {
    0% { transform: translate(2px, 1px); }
    25% { transform: translate(4px, -1px); }
    50% { transform: translate(1px, 3px); }
    75% { transform: translate(3px, -2px); }
    100% { transform: translate(2px, 1px); }
  }

  @keyframes cmyk-glitch-3 {
    0% { transform: translate(-1px, 2px); }
    25% { transform: translate(2px, 4px); }
    50% { transform: translate(-2px, 1px); }
    75% { transform: translate(1px, 3px); }
    100% { transform: translate(-1px, 2px); }
  }

  @keyframes main-glitch {
    0% { transform: translate(0); }
    25% { transform: translate(2px, -1px); }
    50% { transform: translate(-1px, 1px); }
    75% { transform: translate(1px, 1px); }
    100% { transform: translate(0); }
  }

  @keyframes layer-glitch-1 {
    0% { transform: translate(4px, 4px); }
    25% { transform: translate(6px, 2px); }
    50% { transform: translate(3px, 6px); }
    75% { transform: translate(7px, 3px); }
    100% { transform: translate(4px, 4px); }
  }

  @keyframes layer-glitch-2 {
    0% { transform: translate(8px, 8px); }
    25% { transform: translate(10px, 6px); }
    50% { transform: translate(6px, 10px); }
    75% { transform: translate(11px, 7px); }
    100% { transform: translate(8px, 8px); }
  }

  @keyframes icon-glitch-1 {
    0% { transform: translate(-2px, -1px); opacity: 0.9; }
    50% { transform: translate(-4px, 2px); opacity: 0.7; }
    100% { transform: translate(-2px, -1px); opacity: 0.9; }
  }

  @keyframes icon-glitch-2 {
    0% { transform: translate(2px, 1px); opacity: 0.9; }
    50% { transform: translate(4px, -2px); opacity: 0.7; }
    100% { transform: translate(2px, 1px); opacity: 0.9; }
  }

  @keyframes corner-flash {
    0% { opacity: 1; border-color: #FFD700; }
    50% { opacity: 0.5; border-color: #00AEEF; }
    100% { opacity: 1; border-color: #FFD700; }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2.5rem;
    }

    .contacts-grid {
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
    }

    .contact-card {
      min-width: 220px;
      padding: 1.2rem 1.5rem;
    }

    .main-text,
    .offset-layer {
      font-size: 1.1rem;
    }

    .icon-wrapper {
      font-size: 1.5rem;
    }
  }
</style>