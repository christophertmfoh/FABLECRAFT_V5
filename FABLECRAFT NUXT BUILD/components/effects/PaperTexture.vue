<template>
  <div 
    v-if="enabled" 
    class="paper-texture"
    :class="{ 'paper-texture-transitioning': isTransitioning }"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
interface Props {
  enabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true
})

// Track transition state for smooth toggling
const isTransitioning = ref(false)

// Watch for enabled state changes to trigger transition
watch(() => props.enabled, () => {
  isTransitioning.value = true
  setTimeout(() => {
    isTransitioning.value = false
  }, 600) // Match CSS transition duration
})

// SSR-safe initialization
onMounted(() => {
  // Check for user preference from localStorage
  if (import.meta.client) {
    const textureDisabled = localStorage.getItem('paper-texture-disabled')
    if (textureDisabled === 'true') {
      document.documentElement.setAttribute('data-texture-disabled', 'true')
    }
  }
})
</script>