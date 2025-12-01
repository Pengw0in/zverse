<script lang="ts">
</script>

<a 
  href="https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/"
  target="_blank" 
  rel="noopener noreferrer"
  class="credits-link"
>
  credits
</a>

<style>
  .credits-link {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;
    color: rgb(255, 255, 255);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
    font-family: 'Poppins', sans-serif;
    text-transform: lowercase;
    mix-blend-mode: difference;
    pointer-events: auto;
  }

  .credits-link:hover {
    color: #00AEEF;
    transform: translateY(-2px);
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  @media (max-width: 768px) {
    .credits-link {
      bottom: 1.5rem;
      right: 1.5rem;
      font-size: 0.75rem;
    }
  }
</style>