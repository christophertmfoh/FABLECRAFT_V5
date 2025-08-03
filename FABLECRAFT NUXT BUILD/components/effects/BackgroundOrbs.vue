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

interface OrbConfig {
  id: string
  type: 'primary' | 'secondary' | 'tertiary'
  position: { x: string; y: string }
  opacity: number
}

interface Props {
  enabled?: boolean
  performanceMode?: 'low' | 'medium' | 'high'
  orbCount?: {
    primary?: number
    secondary?: number
    tertiary?: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  enabled: true,
  performanceMode: 'medium',
  orbCount: () => ({
    primary: 1,
    secondary: 1,
    tertiary: 1
  })
})

// SSR-safe client detection
const isClient = ref(false)
const isInitialized = ref(false)
const containerRef = ref<HTMLElement>()
const isVisible = ref(true) // Orbs are always visible when in viewport
const observer = ref<IntersectionObserver>()

// Orb positions based on performance mode
const getOrbPositions = (performanceMode: string) => {
  const positions = {
    low: {
      primary: [{ x: '70%', y: '20%' }],
      secondary: [{ x: '20%', y: '60%' }],
      tertiary: []
    },
    medium: {
      primary: [{ x: '70%', y: '20%' }],
      secondary: [{ x: '20%', y: '60%' }],
      tertiary: [{ x: '85%', y: '75%' }]
    },
    high: {
      primary: [{ x: '70%', y: '20%' }],
      secondary: [
        { x: '20%', y: '60%' },
        { x: '80%', y: '80%' }
      ],
      tertiary: [
        { x: '85%', y: '75%' },
        { x: '15%', y: '15%' }
      ]
    }
  }
  
  return positions[performanceMode as keyof typeof positions] || positions.medium
}

// Generate orb configurations
const generateOrbs = (): OrbConfig[] => {
  const orbs: OrbConfig[] = []
  const positions = getOrbPositions(props.performanceMode)
  const opacityMap = {
    low: 0.2,
    medium: 0.3,
    high: 0.4
  }
  const baseOpacity = opacityMap[props.performanceMode as keyof typeof opacityMap] || 0.3
  
  // Primary orbs
  positions.primary.forEach((pos, index) => {
    if (index < props.orbCount.primary!) {
      orbs.push({
        id: `primary-${index}`,
        type: 'primary',
        position: pos,
        opacity: baseOpacity
      })
    }
  })
  
  // Secondary orbs
  positions.secondary.forEach((pos, index) => {
    if (index < props.orbCount.secondary!) {
      orbs.push({
        id: `secondary-${index}`,
        type: 'secondary',
        position: pos,
        opacity: baseOpacity * 0.8
      })
    }
  })
  
  // Tertiary orbs
  positions.tertiary.forEach((pos, index) => {
    if (index < props.orbCount.tertiary!) {
      orbs.push({
        id: `tertiary-${index}`,
        type: 'tertiary',
        position: pos,
        opacity: baseOpacity * 0.6
      })
    }
  })
  
  return orbs
}

// Reactive orb configuration
const orbs = ref<OrbConfig[]>([])

// Compute visible orbs
const visibleOrbs = computed(() => {
  if (!isVisible.value || !isClient.value) return []
  
  return orbs.value.map(orb => ({
    id: orb.id,
    className: `orb--${orb.type}`,
    style: {
      left: orb.position.x,
      top: orb.position.y,
      opacity: orb.opacity
    }
  }))
})

// Setup intersection observer
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
      rootMargin: '100px' // Larger margin for orbs
    }
  )
  
  observer.value.observe(containerRef.value)
}

// Initialize orbs
const initializeOrbs = () => {
  orbs.value = generateOrbs()
}

// Lifecycle hooks
onMounted(() => {
  isClient.value = true
  
  // Initialize with a slight delay
  setTimeout(() => {
    initializeOrbs()
    setupIntersectionObserver()
    isInitialized.value = true
  }, 200)
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

// Watch for prop changes
watch(() => props.performanceMode, () => {
  if (isClient.value) {
    initializeOrbs()
  }
})

watch(() => props.enabled, (newValue) => {
  if (newValue && orbs.value.length === 0) {
    initializeOrbs()
  }
})
</script>

<style scoped>
.orb-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0; /* Behind everything */
}

/* Ensure orbs don't cause horizontal scrollbar */
.orb {
  transform-origin: center;
}
</style>