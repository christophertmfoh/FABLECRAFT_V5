<template>
  <div :class="containerClasses">
    <div :class="orbClasses" :style="orbStyles" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'
import { usePreferredReducedMotion } from '~/composables/usePreferredReducedMotion'

// Component props
interface AnimatedOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  colors?: string[]
  pulseSpeed?: 'slow' | 'normal' | 'fast'
  glowIntensity?: 'low' | 'medium' | 'high'
  variant?: 'default' | 'aurora' | 'plasma' | 'sunset'
  animate?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<AnimatedOrbProps>(), {
  size: 'md',
  colors: () => ['#ff006e', '#8338ec', '#3a86ff'],
  pulseSpeed: 'normal',
  glowIntensity: 'medium',
  variant: 'default',
  animate: true
})

// Get reduced motion preference
const prefersReducedMotion = usePreferredReducedMotion()

// Size mappings
const sizeClasses = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64'
}

// Animation speed mappings
const pulseSpeedClasses = {
  slow: 'animate-pulse-slow',
  normal: 'animate-pulse',
  fast: 'animate-pulse-fast'
}

// Glow intensity mappings
const glowIntensity = {
  low: '20px',
  medium: '40px',
  high: '60px'
}

// Variant gradient configurations
const variantGradients = {
  default: (colors: string[]) => `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
  aurora: (colors: string[]) => `conic-gradient(from 180deg, ${colors.join(', ')}, ${colors[0]})`,
  plasma: (colors: string[]) => `radial-gradient(ellipse at center, ${colors[0]} 0%, ${colors[1]} 25%, ${colors[2]} 50%, transparent 70%)`,
  sunset: (colors: string[]) => `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`
}

// Computed gradient
const gradientBackground = computed(() => {
  const gradientFn = variantGradients[props.variant]
  return gradientFn(props.colors)
})

// Computed classes
const containerClasses = computed(() => {
  return cn(
    'relative inline-block',
    props.class
  )
})

const orbClasses = computed(() => {
  const shouldAnimate = props.animate && !prefersReducedMotion.value
  
  return cn(
    'rounded-full',
    sizeClasses[props.size],
    shouldAnimate && pulseSpeedClasses[props.pulseSpeed],
    shouldAnimate && props.variant === 'aurora' && 'animate-spin-slow',
    'will-change-transform'
  )
})

// Computed styles
const orbStyles = computed(() => {
  return {
    background: gradientBackground.value,
    boxShadow: `0 0 ${glowIntensity[props.glowIntensity]} ${props.colors[0]}40`,
    filter: 'blur(0.5px)',
  }
})
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes pulse-fast {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.03);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
</style>