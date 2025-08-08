<script setup lang="ts">
// SSR-safe theme initialization
const { resolvedTheme, initializeTheme } = useTheme()

// Apply theme from cookie on SSR - use resolved theme for actual CSS variables
useHead({
  htmlAttrs: {
    'data-theme': () => resolvedTheme.value,
  },
  script: [
    {
      innerHTML: `
        (function() {
          try {
            var theme = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/, '$1') || 'system';
            var resolvedTheme = theme;
            
            if (theme === 'system') {
              resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            document.documentElement.setAttribute('data-theme', resolvedTheme);
          } catch (e) {
            console.error('Theme initialization error:', e);
          }
        })();
      `,
      type: 'text/javascript',
      // This script should run immediately, blocking other scripts
      async: false,
      defer: false,
    },
  ],
})

// Initialize theme on client mount removed (handled by plugin)
</script>

<template>
  <div>
    <NuxtPage />
    <!-- Mount auth overlay globally -->
    <AuthOverlay />
  </div>
</template>
