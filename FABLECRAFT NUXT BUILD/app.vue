<script setup lang="ts">
// SSR-safe theme initialization
const { currentTheme } = useTheme()

// Apply theme from cookie on SSR - make it reactive
useHead({
  htmlAttrs: {
    'data-theme': () => currentTheme.value
  }
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>