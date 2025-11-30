<script lang="ts">
  let email = "zendexino@gmail.com";
</script>

<div class="email-sidebar">
  <a href="mailto:{email}">{email}</a>
</div>

<style>
  .email-sidebar {
    position: fixed;
    left: 1rem;
    top: 70%;
    transform: translateY(-50%);
    writing-mode: vertical-rl;
    z-index: 50;
    mix-blend-mode: difference;
    pointer-events: none;
  }

  a {
    text-decoration: none;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    opacity: 0.9;
    transition: opacity 0.2s ease;
    pointer-events: auto;
    white-space: nowrap;
  }

  a:hover {
    opacity: 1;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  @media (max-width: 768px) {
    .email-sidebar {
      right: 1rem;
    }
    
    a {
      font-size: 0.7rem;
    }
  }
</style>