<template>
  <div :class="containerClasses">
    <div :class="lineClasses" :style="lineStyles" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface StepConnectorProps {
  orientation?: 'horizontal' | 'vertical'
  active?: boolean
  completed?: boolean
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
  thickness?: 'thin' | 'normal' | 'thick'
  color?: string
  gradientFrom?: string
  gradientTo?: string
  animated?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<StepConnectorProps>(), {
  orientation: 'horizontal',
  active: false,
  completed: false,
  variant: 'solid',
  thickness: 'normal',
  color: '', // Will use CSS variable fallback
  gradientFrom: '', // Will use CSS variable fallback
  gradientTo: '', // Will use CSS variable fallback
  animated: false
})

// Thickness mappings
const thicknessClasses = {
  horizontal: {
    thin: 'h-0.5',
    normal: 'h-1',
    thick: 'h-1.5'
  },
  vertical: {
    thin: 'w-0.5',
    normal: 'w-1',
    thick: 'w-1.5'
  }
}

// Variant styles
const variantStyles = {
  solid: {},
  dashed: {
    backgroundImage: props.orientation === 'horizontal' 
      ? 'repeating-linear-gradient(to right, currentColor, currentColor 6px, transparent 6px, transparent 12px)'
      : 'repeating-linear-gradient(to bottom, currentColor, currentColor 6px, transparent 6px, transparent 12px)',
    backgroundSize: props.orientation === 'horizontal' ? '12px 100%' : '100% 12px'
  },
  dotted: {
    backgroundImage: props.orientation === 'horizontal'
      ? 'radial-gradient(circle, currentColor 1px, transparent 1px)'
      : 'radial-gradient(circle, currentColor 1px, transparent 1px)',
    backgroundSize: props.orientation === 'horizontal' ? '8px 100%' : '100% 8px',
    backgroundPosition: 'center'
  },
  gradient: {}
}

// Computed classes
const containerClasses = computed(() => {
  return cn(
    'relative flex-auto transition-all duration-300',
    props.orientation === 'horizontal' ? 'w-full' : 'h-full',
    props.class
  )
})

const lineClasses = computed(() => {
  const orientationClasses = props.orientation === 'horizontal'
    ? cn('w-full', thicknessClasses.horizontal[props.thickness])
    : cn('h-full', thicknessClasses.vertical[props.thickness])
  
  return cn(
    'transition-all duration-300',
    orientationClasses,
    props.animated && 'animate-pulse'
  )
})

// Computed styles
const lineStyles = computed(() => {
  const baseStyles: any = {}
  
  // Use theme variables as fallbacks
  const defaultColor = 'hsl(var(--muted))'
  const activeColor = 'hsl(var(--primary))'
  const completedColor = 'hsl(var(--primary))'
  
  const color = props.color || defaultColor
  const gradientFrom = props.gradientFrom || activeColor
  const gradientTo = props.gradientTo || 'hsl(var(--primary) / 0.7)'
  
  // Set color based on state
  if (props.completed) {
    if (props.variant === 'gradient') {
      baseStyles.background = `linear-gradient(${props.orientation === 'horizontal' ? 'to right' : 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    } else {
      baseStyles.backgroundColor = completedColor
      baseStyles.color = completedColor
    }
  } else if (props.active) {
    if (props.variant === 'gradient') {
      // Partial gradient for active state
      const gradientDirection = props.orientation === 'horizontal' ? 'to right' : 'to bottom'
      baseStyles.background = `linear-gradient(${gradientDirection}, ${gradientFrom} 0%, ${gradientFrom} 50%, ${color} 50%)`
    } else {
      baseStyles.backgroundColor = activeColor
      baseStyles.color = activeColor
    }
  } else {
    baseStyles.backgroundColor = color
    baseStyles.color = color
  }
  
  // Apply variant-specific styles
  if (props.variant !== 'solid' && props.variant !== 'gradient') {
    Object.assign(baseStyles, variantStyles[props.variant])
  }
  
  // Add animation for active state
  if (props.active && props.animated && props.variant === 'gradient') {
    baseStyles.backgroundSize = props.orientation === 'horizontal' ? '200% 100%' : '100% 200%'
    baseStyles.animation = 'gradient-shift 2s ease infinite'
  }
  
  return baseStyles
})
</script>

<style scoped>
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>