<template>
  <div
    ref="containerRef"
    class="effects-container firefly-container"
    :class="{ initialized: isInitialized }"
    :data-performance="performanceMode"
    aria-hidden="true"
  >
    <div
      v-for="firefly in fireflies"
      :key="firefly.id"
      class="firefly"
      :class="firefly.sizeClass"
      :style="firefly.style"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface FireflyProps {
  enabled?: boolean
  count?: number
  performanceMode?: 'low' | 'medium' | 'high'
}

interface Firefly {
  id: number
  x: number
  delay: number
  duration: number
  sizeClass: string
  style: Record<string, string>
}

const props = withDefaults(defineProps<FireflyProps>(), {
  enabled: true,
  count: 12,
  performanceMode: 'medium'
})

const containerRef = ref<HTMLElement>()
const isInitialized = ref(false)
const isVisible = ref(false)

// Predefined positions similar to old build (spread across width)
const fireflyPositions = [
  { x: 8, variant: 'normal', delay: 0 },
  { x: 16, variant: 'small', delay: 3.2 },
  { x: 28, variant: 'bright', delay: 1.8 },
  { x: 37, variant: 'small', delay: 7.1 },
  { x: 49, variant: 'normal', delay: 2.5 },
  { x: 62, variant: 'bright', delay: 5.7 },
  { x: 73, variant: 'small', delay: 8.9 },
  { x: 84, variant: 'normal', delay: 4.3 },
  { x: 93, variant: 'small', delay: 9.6 },
  { x: 12, variant: 'small', delay: 11.2 },
  { x: 23, variant: 'normal', delay: 13.8 },
  { x: 34, variant: 'bright', delay: 15.4 },
  { x: 45, variant: 'small', delay: 17.1 },
  { x: 56, variant: 'normal', delay: 19.5 },
  { x: 67, variant: 'bright', delay: 21.2 },
  { x: 78, variant: 'small', delay: 23.8 },
  { x: 89, variant: 'normal', delay: 25.4 },
  { x: 4, variant: 'small', delay: 18.2 },
  { x: 19, variant: 'small', delay: 22.4 },
  { x: 33, variant: 'small', delay: 19.8 },
  { x: 46, variant: 'normal', delay: 24.1 },
  { x: 54, variant: 'small', delay: 23.7 },
  { x: 67, variant: 'small', delay: 20.5 },
  { x: 77, variant: 'bright', delay: 25.3 },
  { x: 85, variant: 'small', delay: 26.8 },
  // Additional positions for 13-15 fireflies
  { x: 10, variant: 'bright', delay: 28.1 },
  { x: 42, variant: 'normal', delay: 29.7 },
  { x: 95, variant: 'small', delay: 31.2 }
]

// Create fireflies based on count - computed so it's reactive
const fireflies = computed<Firefly[]>(() => {
  if (!props.enabled || !isVisible.value) return []
  
  const actualCount = Math.min(props.count, 15) // Max 15 (sweet spot)
  const limits = {
    low: 5,
    medium: 10,
    high: 15
  }
  const limit = limits[props.performanceMode] || 8
  const finalCount = Math.min(limit, actualCount)
  
  return fireflyPositions.slice(0, finalCount).map((pos, index) => {
    const durations = {
      small: 18,
      normal: 14,
      bright: 10
    }
    
    return {
      id: index,
      x: pos.x,
      delay: pos.delay,
      duration: durations[pos.variant] || 14,
      sizeClass: `firefly--${pos.variant}`,
      style: {
        '--firefly-x': `${pos.x}%`,
        '--firefly-delay': `${pos.delay}s`,
        '--firefly-duration': `${durations[pos.variant]}s`
      }
    }
  })
})

// Intersection observer for performance
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (import.meta.client && containerRef.value) {
    // Start visible for immediate effect
    isVisible.value = true
    
    // Create intersection observer for performance optimization
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible.value = entry.isIntersecting
      })
    }, {
      threshold: 0.1
    })
    
    observer.observe(containerRef.value)
    
    // Initialize animations
    setTimeout(() => {
      isInitialized.value = true
    }, 100)
  }
})

onUnmounted(() => {
  if (observer && containerRef.value) {
    observer.unobserve(containerRef.value)
    observer.disconnect()
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
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.firefly-container.initialized {
  opacity: 1;
}

/* Fireflies are only animated on client side */
@media (prefers-reduced-motion: no-preference) {
  .firefly {
    opacity: 0;
    animation-fill-mode: both;
  }
}
</style>