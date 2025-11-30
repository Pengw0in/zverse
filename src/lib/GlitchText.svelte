<script lang="ts">
  let { text } = $props<{ text: string }>();
</script>

<span class="dither-wrapper">
  <span class="text-base">{text}</span>
  <span class="text-dither" aria-hidden="true">{text}</span>
</span>

<style>
  .dither-wrapper {
    position: relative;
    display: inline-block;
  }

  .text-base {
    color: white;
  }

  .text-dither {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    
    /* Make the text color transparent so we only see the background pattern */
    color: transparent;
    
    /* The dither pattern: dark dots */
    background-image: radial-gradient(rgba(0, 0, 0, 0.8) 1px, transparent 1px);
    background-size: 4px 4px; /* Adjust size for coarser/finer dither */
    
    /* Clip the background pattern to the shape of the text */
    -webkit-background-clip: text;
    background-clip: text;
    /* Ensure it sits on top */
    z-index: 1;
    pointer-events: none;
  }
</style>