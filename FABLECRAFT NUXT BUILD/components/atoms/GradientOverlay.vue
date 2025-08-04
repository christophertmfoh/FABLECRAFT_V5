<template>
  <div :class="overlayClasses">
    <div :class="gradientClasses" :style="inlineStyles" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface GradientOverlayProps {
  variant?: 'radial' | 'linear' | 'conic' | 'mesh'
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  colors?: string[]
  opacity?: number
  blur?: number
  animate?: boolean
  animationDuration?: number
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light'
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<GradientOverlayProps>(), {
  variant: 'radial',
  position: 'center',
  colors: () => ['rgb(59, 130, 246)', 'rgb(147, 51, 234)', 'rgb(236, 72, 153)'],
  opacity: 0.3,
  blur: 0,
  animate: false,
  animationDuration: 10,
  blendMode: 'normal'
})

// Position mappings
const positionClasses = {
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top': 'top-0 left-1/2 -translate-x-1/2',
  'bottom': 'bottom-0 left-1/2 -translate-x-1/2',
  'left': 'left-0 top-1/2 -translate-y-1/2',
  'right': 'right-0 top-1/2 -translate-y-1/2',
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0'
}

// Computed gradient style
const gradientStyle = computed(() => {
  const colors = props.colors.join(', ')
  
  switch (props.variant) {
    case 'linear':
      return `linear-gradient(to right, ${colors})`
    case 'conic':
      return `conic-gradient(from 0deg, ${colors})`
    case 'mesh':
      // Create mesh gradient with multiple radial gradients
      const meshColors = props.colors.map((color, i) => {
        const positions = ['25% 25%', '75% 25%', '25% 75%', '75% 75%']
        const pos = positions[i % positions.length]
        return `radial-gradient(circle at ${pos}, ${color}, transparent 50%)`
      })
      return meshColors.join(', ')
    default: // radial
      return `radial-gradient(circle, ${colors})`
  }
})

// Computed classes
const overlayClasses = computed(() => {
  return cn(
    'absolute inset-0 overflow-hidden pointer-events-none',
    props.class
  )
})

const gradientClasses = computed(() => {
  const blendModes = {
    'normal': '',
    'multiply': 'mix-blend-multiply',
    'screen': 'mix-blend-screen',
    'overlay': 'mix-blend-overlay',
    'darken': 'mix-blend-darken',
    'lighten': 'mix-blend-lighten',
    'color-dodge': 'mix-blend-color-dodge',
    'color-burn': 'mix-blend-color-burn',
    'hard-light': 'mix-blend-hard-light',
    'soft-light': 'mix-blend-soft-light'
  }
  
  return cn(
    'absolute w-[200%] h-[200%]',
    positionClasses[props.position],
    blendModes[props.blendMode],
    props.animate && 'animate-gradient-shift'
  )
})

// Computed inline styles
const inlineStyles = computed(() => {
  return {
    background: gradientStyle.value,
    opacity: props.opacity,
    filter: props.blur > 0 ? `blur(${props.blur}px)` : undefined,
    animationDuration: props.animate ? `${props.animationDuration}s` : undefined
  }
})
</script>

<style scoped>
@keyframes gradient-shift {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
  33% {
    transform: translate(-50%, -50%) rotate(120deg) scale(1.1);
  }
  66% {
    transform: translate(-50%, -50%) rotate(240deg) scale(0.9);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) scale(1);
  }
}

.animate-gradient-shift {
  animation: gradient-shift linear infinite;
}
</style>