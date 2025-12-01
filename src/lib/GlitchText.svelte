<script lang="ts">
  import { onMount } from 'svelte';
  
  let { 
    text, 
    hoverOnly = false,
    intensity = 'normal' as 'subtle' | 'normal' | 'intense',
    halftone = true
  } = $props<{ 
    text: string; 
    hoverOnly?: boolean;
    intensity?: 'subtle' | 'normal' | 'intense';
    halftone?: boolean;
  }>();
  
  let glitchActive = $state(false);
  let isHovered = $state(false);

  // Intensity settings
  const intensityMap: Record<'subtle' | 'normal' | 'intense', {
    duration: [number, number];
    frequency: number;
    interval: [number, number];
    displacement: number;
  }> = {
    subtle: { duration: [100, 150], frequency: 0.75, interval: [2500, 3500], displacement: 0.5 },
    normal: { duration: [150, 200], frequency: 0.6, interval: [1500, 2000], displacement: 1 },
    intense: { duration: [200, 400], frequency: 0.5, interval: [1000, 1500], displacement: 1.5 }
  };

  const settings = intensityMap[intensity as 'subtle' | 'normal' | 'intense'];

  onMount(() => {
    if (hoverOnly) return;

    const triggerGlitch = () => {
      glitchActive = true;
      setTimeout(() => {
        glitchActive = false;
      }, settings.duration[0] + Math.random() * settings.duration[1]);
    };
    
    const interval = setInterval(() => {
      if (Math.random() > settings.frequency) {
        triggerGlitch();
      }
    }, settings.interval[0] + Math.random() * settings.interval[1]);
    
    return () => clearInterval(interval);
  });

  $effect(() => {
    if (hoverOnly) {
      glitchActive = isHovered;
    }
  });
</script>

<span 
  class="glitch-wrapper" 
  class:active={glitchActive}
  class:subtle={intensity === 'subtle'}
  class:normal={intensity === 'normal'}
  class:intense={intensity === 'intense'}
  class:halftone-enabled={halftone}
  role="presentation"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  <span class="text-base">{text}</span>
  <span class="text-glitch cyan" aria-hidden="true">{text}</span>
  <span class="text-glitch magenta" aria-hidden="true">{text}</span>
  <span class="text-glitch yellow" aria-hidden="true">{text}</span>
  <span class="text-glitch red" aria-hidden="true">{text}</span>
  {#if halftone}
    <span class="halftone" aria-hidden="true">{text}</span>
  {/if}
  <span class="scanlines" aria-hidden="true"></span>
</span>

<style>
  .glitch-wrapper {
    position: relative;
    display: inline-block;
    --displacement: 1;
  }

  .glitch-wrapper.subtle {
    --displacement: 0.5;
  }

  .glitch-wrapper.normal {
    --displacement: 1;
  }

  .glitch-wrapper.intense {
    --displacement: 1.5;
  }

  .text-base {
    position: relative;
    color: white;
    z-index: 3;
  }

  .text-glitch {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .text-glitch.cyan {
    color: #00AEEF;
    z-index: 2;
  }

  .text-glitch.magenta {
    color: #9C27B0;
    z-index: 2;
  }

  .text-glitch.yellow {
    color: #FFD700;
    z-index: 1;
    mix-blend-mode: overlay;
  }

  .text-glitch.red {
    color: #FF0000;
    z-index: 1;
  }

  .halftone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: transparent;
    background-image: 
      radial-gradient(circle, rgba(0, 0, 0, 0.5) 1.5px, transparent 1.5px),
      radial-gradient(circle, rgba(0, 174, 239, 0.4) 1px, transparent 1px),
      radial-gradient(circle, rgba(255, 215, 0, 0.4) 1px, transparent 1px),
      radial-gradient(circle, rgba(156, 39, 176, 0.3) 1px, transparent 1px);
    background-size: 5px 5px, 7px 7px, 6px 6px, 8px 8px;
    background-position: 0 0, 2px 2px, 3px 1px, 1px 3px;
    -webkit-background-clip: text;
    background-clip: text;
    z-index: 4;
    pointer-events: none;
    opacity: 0.7;
  }

  .scanlines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.12) 0px,
      transparent 1px,
      transparent 2px,
      rgba(0, 0, 0, 0.12) 3px
    );
    pointer-events: none;
    z-index: 5;
    opacity: 0;
  }

  .glitch-wrapper.active .text-glitch.cyan {
    opacity: 0.9;
    animation: cmyk-glitch-cyan 0.1s steps(2) infinite;
  }

  .glitch-wrapper.active .text-glitch.magenta {
    opacity: 0.85;
    animation: cmyk-glitch-magenta 0.1s steps(2) infinite;
  }

  .glitch-wrapper.active .text-glitch.yellow {
    opacity: 0.8;
    animation: cmyk-glitch-yellow 0.1s steps(2) infinite;
  }

  .glitch-wrapper.active .text-glitch.red {
    opacity: 0.9;
    animation: cmyk-glitch-red 0.1s steps(2) infinite;
  }

  .glitch-wrapper.active .text-base {
    animation: main-shake 0.1s steps(2) infinite;
  }

  .glitch-wrapper.active .scanlines {
    opacity: 0.4;
    animation: scanline-move 0.08s linear infinite;
  }

  .glitch-wrapper.active.halftone-enabled .halftone {
    animation: halftone-shift 0.1s steps(2) infinite;
  }

  @keyframes cmyk-glitch-cyan {
    0% { transform: translate(calc(-4px * var(--displacement)), calc(-3px * var(--displacement))); }
    25% { transform: translate(calc(-6px * var(--displacement)), calc(2px * var(--displacement))); }
    50% { transform: translate(calc(-3px * var(--displacement)), calc(-5px * var(--displacement))); }
    75% { transform: translate(calc(-7px * var(--displacement)), calc(1px * var(--displacement))); }
    100% { transform: translate(calc(-4px * var(--displacement)), calc(-3px * var(--displacement))); }
  }

  @keyframes cmyk-glitch-magenta {
    0% { transform: translate(calc(3px * var(--displacement)), calc(3px * var(--displacement))); }
    25% { transform: translate(calc(6px * var(--displacement)), calc(-2px * var(--displacement))); }
    50% { transform: translate(calc(2px * var(--displacement)), calc(5px * var(--displacement))); }
    75% { transform: translate(calc(5px * var(--displacement)), calc(-1px * var(--displacement))); }
    100% { transform: translate(calc(3px * var(--displacement)), calc(3px * var(--displacement))); }
  }

  @keyframes cmyk-glitch-yellow {
    0% { transform: translate(calc(-2px * var(--displacement)), calc(4px * var(--displacement))); }
    25% { transform: translate(calc(3px * var(--displacement)), calc(6px * var(--displacement))); }
    50% { transform: translate(calc(-4px * var(--displacement)), calc(2px * var(--displacement))); }
    75% { transform: translate(calc(2px * var(--displacement)), calc(5px * var(--displacement))); }
    100% { transform: translate(calc(-2px * var(--displacement)), calc(4px * var(--displacement))); }
  }

  @keyframes cmyk-glitch-red {
    0% { transform: translate(calc(5px * var(--displacement)), calc(-4px * var(--displacement))); }
    25% { transform: translate(calc(-4px * var(--displacement)), calc(3px * var(--displacement))); }
    50% { transform: translate(calc(6px * var(--displacement)), calc(2px * var(--displacement))); }
    75% { transform: translate(calc(-3px * var(--displacement)), calc(-5px * var(--displacement))); }
    100% { transform: translate(calc(5px * var(--displacement)), calc(-4px * var(--displacement))); }
  }

  @keyframes main-shake {
    0% { transform: translate(0); }
    25% { transform: translate(calc(2px * var(--displacement)), calc(-1px * var(--displacement))); }
    50% { transform: translate(calc(-2px * var(--displacement)), calc(1px * var(--displacement))); }
    75% { transform: translate(calc(1px * var(--displacement)), calc(2px * var(--displacement))); }
    100% { transform: translate(0); }
  }

  @keyframes scanline-move {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }

  @keyframes halftone-shift {
    0% { background-position: 0 0, 2px 2px, 3px 1px, 1px 3px; }
    50% { background-position: 2px 1px, 4px 4px, 5px 3px, 3px 5px; }
    100% { background-position: 0 0, 2px 2px, 3px 1px, 1px 3px; }
  }
</style>