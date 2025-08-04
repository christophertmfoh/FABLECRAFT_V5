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
  colors: () => [],
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
  default: (colors: string[]) => {
    const c = colors.length ? colors : ['hsl(var(--primary))', 'hsl(var(--primary) / 0.8)', 'hsl(var(--primary) / 0.6)']
    return `radial-gradient(circle at 30% 30%, ${c[0]}, ${c[1]}, ${c[2]})`
  },
  aurora: (colors: string[]) => {
    const c = colors.length ? colors : ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))']
    return `conic-gradient(from 180deg, ${c.join(', ')}, ${c[0]})`
  },
  plasma: (colors: string[]) => {
    const c = colors.length ? colors : ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))']
    return `radial-gradient(ellipse at center, ${c[0]} 0%, ${c[1]} 25%, ${c[2]} 50%, transparent 70%)`
  },
  sunset: (colors: string[]) => {
    const c = colors.length ? colors : ['hsl(var(--destructive))', 'hsl(var(--primary))', 'hsl(var(--secondary))']
    return `linear-gradient(135deg, ${c[0]} 0%, ${c[1]} 50%, ${c[2]} 100%)`
  }
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
  // Use primary color for glow if no colors provided
  const glowColor = props.colors.length ? props.colors[0] : 'hsl(var(--primary))'
  
  return {
    background: gradientBackground.value,
    boxShadow: `0 0 ${glowIntensity[props.glowIntensity]} ${glowColor}40`,
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