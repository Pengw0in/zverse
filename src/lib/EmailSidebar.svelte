<script lang="ts">
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/Pengw0in',
      path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
    },
    {
      name: 'Discord',
      url: 'https://discordapp.com/users/1364667672968822858',
      path: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.772-.6083 1.1588a18.2915 18.2915 0 00-5.4882 0 12.64 12.64 0 00-.6173-1.1588.077.077 0 00-.0785-.0371 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z'
    },
    {
      name: 'Email',
      url: 'mailto:zendexino@gmail.com',
      path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
    }
  ];
</script>

<div class="social-sidebar">
  {#each socials as social}
    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
      <div class="icon-wrapper">
        <svg class="main-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d={social.path} fill="currentColor"/>
        </svg>
        <svg class="glitch-icon cyan" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d={social.path} fill="#00AEEF"/>
        </svg>
        <svg class="glitch-icon magenta" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d={social.path} fill="#9C27B0"/>
        </svg>
        <svg class="glitch-icon yellow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d={social.path} fill="#FFD700"/>
        </svg>
      </div>
    </a>
  {/each}
</div>

<style>
  .social-sidebar {
    position: fixed;
    left: 1.5rem;
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    z-index: 50;
    mix-blend-mode: difference;
    color: white;
  }

  a {
    color: white;
    transition: all 0.2s ease;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .icon-wrapper {
    position: relative;
    width: 24px;
    height: 24px;
  }

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .main-icon {
    z-index: 10;
    position: relative;
  }

  .glitch-icon {
    opacity: 0;
    z-index: 1;
    transition: opacity 0.1s ease;
  }

  a:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  a:hover .glitch-icon {
    opacity: 0.5;
  }

  a:hover .glitch-icon.cyan {
    transform: translate(-2px, -1px);
  }

  a:hover .glitch-icon.magenta {
    transform: translate(2px, 1px);
  }

  a:hover .glitch-icon.yellow {
    transform: translate(1px, -2px);
  }

  @media (max-width: 768px) {
    .social-sidebar {
      display: none;
    }
  }
</style>