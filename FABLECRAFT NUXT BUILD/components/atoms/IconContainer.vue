<template>
  <div :class="containerClasses">
    <AtomIcon
      v-if="icon"
      :name="icon"
      :size="iconSize"
      :class="iconClass"
    />
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Component props
interface IconContainerProps {
  icon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'ghost' | 'soft' | 'subtle' | 'outline' | 'gradient'
  shape?: 'circle' | 'square' | 'rounded'
  hover?: boolean
  interactive?: boolean
  class?: string | Record<string, boolean> | string[]
  iconClass?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<IconContainerProps>(), {
  size: 'md',
  variant: 'default',
  shape: 'rounded',
  hover: true,
  interactive: false,
})

// Size configurations
const sizeConfigs = {
  xs: {
    container: 'w-6 h-6',
    icon: 'xs' as const,
    padding: 'p-1',
  },
  sm: {
    container: 'w-8 h-8',
    icon: 'sm' as const,
    padding: 'p-1.5',
  },
  md: {
    container: 'w-10 h-10',
    icon: 'md' as const,
    padding: 'p-2',
  },
  lg: {
    container: 'w-12 h-12',
    icon: 'lg' as const,
    padding: 'p-2.5',
  },
  xl: {
    container: 'w-16 h-16',
    icon: 'xl' as const,
    padding: 'p-3',
  },
}

// Shape classes
const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg',
}

// Variant classes
const variantClasses = {
  default: 'bg-primary/10 text-primary',
  ghost: 'bg-transparent text-muted-foreground',
  soft: 'bg-muted text-muted-foreground',
  subtle: 'bg-background border border-border text-foreground',
  outline: 'bg-transparent border-2 border-current',
  gradient: 'bg-gradient-to-br from-primary/20 to-primary/5 text-primary',
}

// Hover effect classes
const hoverClasses = {
  default: 'hover:bg-primary/20 hover:scale-110',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  soft: 'hover:bg-muted/80',
  subtle: 'hover:border-primary hover:text-primary',
  outline: 'hover:bg-current/10',
  gradient: 'hover:from-primary/30 hover:to-primary/10',
}

// Compute icon size
const iconSize = computed(() => {
  return props.iconSize || sizeConfigs[props.size].icon
})

// Compute container classes
const containerClasses = computed(() => {
  const config = sizeConfigs[props.size]
  
  return cn(
    // Base classes
    'inline-flex items-center justify-center',
    'transition-all duration-200',
    
    // Size classes
    config.container,
    
    // Shape classes
    shapeClasses[props.shape],
    
    // Variant classes
    variantClasses[props.variant],
    
    // Hover classes
    props.hover && hoverClasses[props.variant],
    
    // Interactive classes
    props.interactive && [
      'cursor-pointer',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
    ],
    
    // Custom classes
    props.class
  )
})
</script>