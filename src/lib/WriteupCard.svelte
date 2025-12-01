<script lang="ts">
  let { 
    writeup, 
    isGlitching = false,
    isHovered = false,
    colorIndex = 0,
    onMouseEnter,
    onMouseLeave
  } = $props<{
    writeup: {
      title: string;
      description: string;
      date: string;
      category: string;
      slug: string;
      tags: string[];
    };
    isGlitching?: boolean;
    isHovered?: boolean;
    colorIndex?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }>();

  // Theme colors from your palette
  const themeColors = ['#00AEEF', '#9C27B0', '#FFD700', '#FF0000'];
  const accentColor = themeColors[colorIndex % themeColors.length];
</script>

<a 
  href={`#/writeups/${writeup.slug}`}
  class="writeup-card"
  class:glitching={isGlitching}
  style="--accent-color: {accentColor}"
  onmouseenter={onMouseEnter}
  onmouseleave={onMouseLeave}
>
  <!-- Top Section: Date/Meta -->
  <div class="card-header">
    <span class="date">{writeup.date}</span>
  </div>

  <!-- Middle Section: Title & Arrow -->
  <div class="card-body">
    <h3 class="title">{writeup.title}</h3>
    <div class="arrow">→</div>
  </div>

  <!-- Dots indicator -->
  <div class="dots">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  
  <!-- Bottom Section: Category & Button -->
  <div class="card-footer">
    <div class="category-wrapper">
      <span class="category-dot"></span>
      <span class="category-name">{writeup.category}</span>
    </div>
    <span class="view-btn">View</span>
  </div>
</a>

<style>
  .writeup-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 280px;
    height: 420px;
    padding: 2rem;
    background: #161616;
    border-radius: 24px;
    text-decoration: none;
    color: white;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
    box-sizing: border-box;
  }

  .writeup-card:hover {
    transform: translateY(-8px);
    background: #1a1a1a;
    border-color: var(--accent-color);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
                0 0 30px color-mix(in srgb, var(--accent-color) 20%, transparent);
  }

  /* Header */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: var(--accent-color);
    font-weight: 500;
    opacity: 0.8;
  }

  /* Body */
  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 1.5rem 0;
  }

  .title {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
    color: #fff;
    max-width: 85%;
    letter-spacing: -0.02em;
  }

  .arrow {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    opacity: 0;
    transition: all 0.3s ease;
    color: var(--accent-color);
  }

  .writeup-card:hover .arrow {
    opacity: 1;
    transform: translate(5px, -50%);
  }

  /* Dots */
  .dots {
    display: flex;
    gap: 6px;
    padding: 1rem 0;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transition: background 0.3s ease;
  }

  .dot:first-child {
    background: var(--accent-color);
  }

  .writeup-card:hover .dot:nth-child(2) {
    background: var(--accent-color);
    opacity: 0.7;
  }

  .writeup-card:hover .dot:nth-child(3) {
    background: var(--accent-color);
    opacity: 0.5;
  }

  /* Footer */
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .category-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .category-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent-color);
  }

  .category-name {
    font-size: 0.75rem;
    font-weight: 500;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .view-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.6rem 1.4rem;
    border-radius: 100px;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .writeup-card:hover .view-btn {
    background: var(--accent-color);
    color: black;
    border-color: var(--accent-color);
  }

  /* Glitch effect adaptation */
  .writeup-card.glitching {
    border-color: var(--accent-color);
    animation: shake 0.2s ease-in-out infinite;
  }
  
  .writeup-card.glitching .title {
    text-shadow: 2px 0 #FF0000, -2px 0 #00AEEF;
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  
  @media (max-width: 768px) {
    .writeup-card {
      width: 100%;
      height: 380px;
    }

    .title {
      font-size: 1.5rem;
    }
  }
</style>