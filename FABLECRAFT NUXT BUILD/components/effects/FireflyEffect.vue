<template>
  <div
    v-if="isClient"
    ref="containerRef"
    class="effects-container firefly-container"
    :class="{ initialized: isInitialized }"
    :data-performance="performanceMode"
    aria-hidden="true"
  >
    <div
      v-for="firefly in visibleFireflies"
      :key="firefly.id"
      class="firefly"
      :class="firefly.sizeClass"
      :style="firefly.style"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface FireflyConfig {
  id: number
  x: number
  y: number
  size: 'small' | 'normal' | 'bright'
  speed: number
  delay: number
}

interface Props {
  count?: number
  enabled?: boolean
  performanceMode?: 'low' | 'medium' | 'high'
}

const props = withDefaults(defineProps<Props>(), {
  count: 12, // Max 12 for performance
  enabled: true,
  performanceMode: 'medium'
})

// SSR-safe client detection
const isClient = ref(false)
const isInitialized = ref(false)
const containerRef = ref<HTMLElement>()
const isVisible = ref(false)
const observer = ref<IntersectionObserver>()

// Firefly configuration (non-reactive for performance)
const fireflies = ref<FireflyConfig[]>([])

// Initialize fireflies with random properties
const initializeFireflies = () => {
  if (!import.meta.client) return
  
  const newFireflies: FireflyConfig[] = []
  const sizes: Array<'small' | 'normal' | 'bright'> = ['small', 'normal', 'bright']
  
  for (let i = 0; i < props.count; i++) {
    newFireflies.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 20 + 80, // Start from bottom 20% of container
      size: sizes[i % 3],
      speed: 10 + Math.random() * 10, // 10-20s duration
      delay: Math.random() * 15 // 0-15s delay
    })
  }
  
  fireflies.value = newFireflies
}

// Compute visible fireflies based on visibility and enabled state
const visibleFireflies = computed(() => {
  if (!props.enabled || !isVisible.value || !isClient.value) return []
  
  return fireflies.value.map(firefly => ({
    id: firefly.id,
    sizeClass: `firefly--${firefly.size}`,
    style: {
      '--firefly-x': `${firefly.x}%`,
      '--firefly-y': `${firefly.y}%`,
      '--effect-duration-firefly': `${firefly.speed}s`,
      '--firefly-delay': `${firefly.delay}s`
    }
  }))
})

// Setup intersection observer for performance
const setupIntersectionObserver = () => {
  if (!import.meta.client || !containerRef.value) return
  
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting
      })
    },
    {
      threshold: 0,
      rootMargin: '50px' // Start animating slightly before visible
    }
  )
  
  observer.value.observe(containerRef.value)
}

// Lifecycle hooks
onMounted(() => {
  isClient.value = true
  
  // Initialize after a short delay to ensure smooth page load
  setTimeout(() => {
    initializeFireflies()
    setupIntersectionObserver()
    isInitialized.value = true
  }, 100)
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

// Watch for enabled prop changes
watch(() => props.enabled, (newValue) => {
  if (newValue && fireflies.value.length === 0) {
    initializeFireflies()
  }
})
</script>

<style scoped>
.firefly-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1; /* Behind content but above background */
}

/* Additional scoped styles if needed */
</style>