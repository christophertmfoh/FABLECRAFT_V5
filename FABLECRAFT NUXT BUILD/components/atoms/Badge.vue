<template>
  <div :class="badgeClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from './Utils'

// Badge variants using CVA
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // Special landing page variant
        landing: 'bg-card/95 text-foreground border-border backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.25 text-[10px]',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Component props
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'landing'
  size?: 'default' | 'sm' | 'lg'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'default',
})

// Compute badge classes
const badgeClasses = computed(() => {
  return cn(
    badgeVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.class
  )
})
</script>