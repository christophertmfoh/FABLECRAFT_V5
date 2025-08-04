<template>
  <component :is="as" :class="headingClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from './Utils'

// Heading variants using CVA
const headingVariants = cva(
  'font-black text-foreground leading-tight tracking-tight drop-shadow-sm',
  {
    variants: {
      size: {
        // H1 sizes
        h1: 'text-golden-4xl sm:text-golden-5xl lg:text-6xl xl:text-7xl leading-[1.1]',
        'h1-compact': 'text-3xl sm:text-4xl lg:text-5xl leading-[1.1]',
        
        // H2 sizes
        h2: 'text-golden-3xl sm:text-golden-4xl lg:text-golden-5xl xl:text-6xl leading-[1.2]',
        'h2-compact': 'text-2xl sm:text-3xl lg:text-4xl leading-[1.2]',
        'h2-display': 'text-4xl md:text-5xl leading-[1.2]',
        
        // H3 sizes
        h3: 'text-2xl font-bold',
        'h3-section': 'text-sm font-semibold uppercase tracking-wider',
        
        // H4-H6 sizes
        h4: 'text-golden-lg font-bold',
        h5: 'text-base font-bold',
        h6: 'text-sm font-bold',
        
        // Custom sizes
        display: 'text-golden-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]',
        hero: 'text-golden-4xl sm:text-golden-5xl lg:text-golden-6xl leading-[1.1]',
      },
      gradient: {
        true: 'bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent',
        false: '',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      size: 'h2',
      gradient: false,
      align: 'left',
    },
  }
)

// Component props
interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
  size?: 
    | 'h1' | 'h1-compact' 
    | 'h2' | 'h2-compact' | 'h2-display'
    | 'h3' | 'h3-section'
    | 'h4' | 'h5' | 'h6'
    | 'display' | 'hero'
  gradient?: boolean
  align?: 'left' | 'center' | 'right'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<HeadingProps>(), {
  as: 'h2',
  size: 'h2',
  gradient: false,
  align: 'left',
})

// Compute heading classes
const headingClasses = computed(() => {
  return cn(
    headingVariants({
      size: props.size,
      gradient: props.gradient,
      align: props.align,
    }),
    props.class
  )
})
</script>