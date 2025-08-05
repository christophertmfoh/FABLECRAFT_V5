<template>
  <div
    v-show="enabled"
    ref="containerRef"
    class="effects-container orb-container"
    :class="{ initialized: isInitialized }"
    :data-performance="performanceMode"
    aria-hidden="true"
  >
    <div v-for="orb in orbs" :key="orb.id" class="orb" :class="orb.className" :style="orb.style" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
  performanceMode: 'medium',
})

const containerRef = ref<HTMLElement>()
const isInitialized = ref(false)
const isVisible = ref(true)

// Orb configurations matching old build - expanded for more variety
const orbConfigs: OrbConfig[] = [
  {
    id: 'orb-1',
    type: 'primary',
    position: { top: '15%', left: '8%' },
    size: 320,
    delay: 0,
  },
  {
    id: 'orb-2',
    type: 'secondary',
    position: { top: '65%', right: '15%' },
    size: 220,
    delay: 8,
  },
  {
    id: 'orb-3',
    type: 'tertiary',
    position: { bottom: '25%', left: '55%' },
    size: 180,
    delay: 16,
  },
  {
    id: 'orb-4',
    type: 'primary',
    position: { top: '40%', right: '25%' },
    size: 280,
    delay: 24,
  },
  {
    id: 'orb-5',
    type: 'secondary',
    position: { bottom: '15%', left: '20%' },
    size: 200,
    delay: 32,
  },
  {
    id: 'orb-6',
    type: 'tertiary',
    position: { top: '75%', left: '70%' },
    size: 160,
    delay: 40,
  },
  {
    id: 'orb-7',
    type: 'primary',
    position: { top: '10%', right: '45%' },
    size: 300,
    delay: 48,
  },
  {
    id: 'orb-8',
    type: 'secondary',
    position: { bottom: '45%', right: '8%' },
    size: 240,
    delay: 56,
  },
  {
    id: 'orb-9',
    type: 'tertiary',
    position: { top: '85%', left: '35%' },
    size: 140,
    delay: 64,
  },
  {
    id: 'orb-10',
    type: 'primary',
    position: { top: '25%', left: '75%' },
    size: 260,
    delay: 72,
  },
  {
    id: 'orb-11',
    type: 'secondary',
    position: { bottom: '60%', left: '12%' },
    size: 190,
    delay: 80,
  },
  {
    id: 'orb-12',
    type: 'tertiary',
    position: { top: '55%', right: '55%' },
    size: 170,
    delay: 88,
  },
  {
    id: 'orb-13',
    type: 'primary',
    position: { bottom: '10%', right: '30%' },
    size: 290,
    delay: 96,
  },
  {
    id: 'orb-14',
    type: 'secondary',
    position: { top: '80%', left: '85%' },
    size: 210,
    delay: 104,
  },
  {
    id: 'orb-15',
    type: 'tertiary',
    position: { bottom: '70%', left: '45%' },
    size: 150,
    delay: 112,
  },
]

// Create orbs based on performance mode
const orbs = computed(() => {
  if (!isVisible.value) return []

  // Performance mode determines how many orbs to show
  const orbLimits = {
    low: 5, // 5 orbs for low performance
    medium: 10, // 10 orbs for medium performance
    high: 15, // All 15 orbs for high performance
  }

  const limit = orbLimits[props.performanceMode] || 10

  return orbConfigs.slice(0, limit).map(config => ({
    id: config.id,
    className: `orb--${config.type}`,
    style: {
      ...config.position,
      '--orb-delay': `${config.delay}s`,
    },
  }))
})

// Intersection observer for performance
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (import.meta.client && containerRef.value) {
    // Create intersection observer for performance optimization
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isVisible.value = entry.isIntersecting
        })
      },
      {
        threshold: 0.1,
      }
    )

    observer.observe(containerRef.value)

    // Initialize animations after a small delay for smooth loading
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
.orb-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.orb-container.initialized {
  opacity: 1;
}

/* Orbs with animation-fill-mode to keep final state */
.orb {
  opacity: 0.2;
  animation-delay: var(--orb-delay, 0s);
  animation-fill-mode: both;
}

/* Only animate on client side with motion preference */
@media (prefers-reduced-motion: no-preference) {
  .initialized .orb {
    animation-play-state: running;
  }
}
</style>
