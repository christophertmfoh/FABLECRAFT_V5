<script setup lang="ts">
// SSR-safe theme initialization to prevent flash
useHead({
  script: [
    {
      children: `
        (function() {
          try {
            const theme = localStorage.getItem('theme');
            const darkModeMQ = window.matchMedia('(prefers-color-scheme: dark)');
            
            if (theme === 'system') {
              const systemTheme = darkModeMQ.matches ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', systemTheme);
            } else if (theme) {
              document.documentElement.setAttribute('data-theme', theme);
            } else if (darkModeMQ.matches) {
              document.documentElement.setAttribute('data-theme', 'dark');
              localStorage.setItem('theme', 'dark');
            } else {
              document.documentElement.setAttribute('data-theme', 'light');
              localStorage.setItem('theme', 'light');
            }
          } catch (e) {
            // Fallback to light theme if localStorage is not available
            document.documentElement.setAttribute('data-theme', 'light');
          }
        })();
      `,
      type: 'text/javascript'
    }
  ]
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>