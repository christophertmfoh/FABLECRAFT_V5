<template>
  <div :class="glassCardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from './Utils'

// Glass card variants using CVA
const glassCardVariants = cva('rounded-xl border transition-all duration-300', {
  variants: {
    variant: {
      light: 'bg-card/95 backdrop-blur-md border-border/30 shadow-md hover:shadow-lg',
      heavy: 'bg-card/90 backdrop-blur-lg border-border/30 shadow-lg hover:shadow-xl',
      elevated: 'surface-elevated backdrop-blur-lg border-border/30 shadow-xl hover:shadow-2xl',
    },
    hover: {
      true: 'hover:scale-[1.02]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'light',
    hover: false,
  },
})

// Component props
interface GlassCardProps {
  variant?: 'light' | 'heavy' | 'elevated'
  hover?: boolean
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<GlassCardProps>(), {
  variant: 'light',
  hover: false,
})

// Compute glass card classes
const glassCardClasses = computed(() => {
  return cn(
    glassCardVariants({
      variant: props.variant,
      hover: props.hover,
    }),
    props.class
  )
})
</script>
