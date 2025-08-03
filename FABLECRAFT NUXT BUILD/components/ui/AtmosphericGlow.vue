<!-- components/ui/AtmosphericGlow.vue -->
<template>
  <div 
    v-if="enabled && !reducedMotion"
    class="atmospheric-gradient"
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

// Respect user preferences
const reducedMotion = usePreferredReducedMotion()

// SSR-safe implementation
onMounted(() => {
  // Any client-side initialization
})
</script>