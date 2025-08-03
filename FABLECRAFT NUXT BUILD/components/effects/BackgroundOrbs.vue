<template>
  <div
    v-if="isClient && enabled"
    ref="containerRef"
    class="effects-container orb-container"
    :class="{ initialized: isInitialized }"
    :data-performance="performanceMode"
    aria-hidden="true"
  >
    <div
      v-for="orb in visibleOrbs"
      :key="orb.id"
      class="orb"
      :class="orb.className"
      :style="orb.style"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface OrbProps {
  enabled?: boolean
  performanceMode?: 'low' | 'medium' | 'high'
}

interface OrbConfig {
  id: string
  type: 'primary' | 'secondary' | 'tertiary'
  position: { top?: string; bottom?: string; left?: string; right?: string }
  size: number
  delay: number
}

const props = withDefaults(defineProps<OrbProps>(), {
  enabled: true,
  performanceMode: 'medium'
})

const isClient = ref(false)
const containerRef = ref<HTMLElement>()
const isInitialized = ref(false)
const isVisible = ref(true)

// Orb configurations matching old build
const orbConfigs: OrbConfig[] = [
  {
    id: 'orb-1',
    type: 'primary',
    position: { top: '15%', left: '8%' },
    size: 320,
    delay: 0
  },
  {
    id: 'orb-2',
    type: 'secondary',
    position: { top: '65%', right: '15%' },
    size: 220,
    delay: 8
  },
  {
    id: 'orb-3',
    type: 'tertiary',
    position: { bottom: '25%', left: '55%' },
    size: 180,
    delay: 16
  }
]

// Create orbs based on performance mode
const visibleOrbs = computed(() => {
  if (!props.enabled || !isVisible.value) return []
  
  // Performance mode determines how many orbs to show
  const orbLimits = {
    low: 1,    // Primary only
    medium: 2, // Primary + Secondary
    high: 3    // All orbs
  }
  
  const limit = orbLimits[props.performanceMode] || 2
  
  return orbConfigs.slice(0, limit).map(config => ({
    id: config.id,
    className: `orb--${config.type}`,
    style: {
      ...config.position,
      '--orb-delay': `${config.delay}s`,
      width: `${config.size}px`,
      height: `${config.size}px`
    }
  }))
})

// Intersection observer for performance
let observer: IntersectionObserver | null = null

onMounted(() => {
  isClient.value = true
  
  if (import.meta.client && containerRef.value) {
    // Create intersection observer for performance optimization
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible.value = entry.isIntersecting
      })
    }, {
      threshold: 0.1
    })
    
    observer.observe(containerRef.value)
    
    // Initialize after a small delay for smooth loading
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

// Watch for performance mode changes
watch(() => props.performanceMode, () => {
  // Orbs will automatically adjust based on computed property
})
</script>

<style scoped>
.orb-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.orb-container.initialized {
  opacity: 1;
}

.orb {
  opacity: 0.2;
  animation-delay: var(--orb-delay, 0s);
  animation-fill-mode: both;
}
</style>