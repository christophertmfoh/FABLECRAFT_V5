<template>
  <ClientOnly>
    <div 
      v-if="enabled && !reducedMotion && isMounted"
      class="atmospheric-gradient"
      aria-hidden="true"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
interface Props {
  enabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true
})

const reducedMotion = usePreferredReducedMotion()
const isMounted = ref(false)

onMounted(() => {
  // Critical: Wait for next frame to ensure CSS variables are loaded
  requestAnimationFrame(() => {
    isMounted.value = true
  })
})
</script>