<script setup lang="ts">
// SSR-safe theme initialization
const { currentTheme } = useTheme()

// Apply theme from cookie on SSR
useHead({
  htmlAttrs: {
    'data-theme': currentTheme
  }
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>