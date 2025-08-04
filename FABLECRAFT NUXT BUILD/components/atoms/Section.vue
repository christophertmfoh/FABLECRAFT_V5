<template>
  <component :is="as" :class="sectionClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from './Utils'

// Section variants using CVA
const sectionVariants = cva(
  'relative',
  {
    variants: {
      spacing: {
        none: '',
        sm: 'py-8 sm:py-12',
        md: 'py-16 sm:py-20',
        lg: 'py-24 sm:py-32',
        xl: 'py-32 sm:py-40',
        // Custom spacing based on the old build patterns
        default: 'section-spacing',      // 128px standard
        hero: 'section-spacing-hero',    // 96px hero sections
        compact: 'section-spacing-compact' // 64px compact sections
      },
      background: {
        none: '',
        default: 'bg-background',
        muted: 'bg-muted',
        card: 'bg-card',
        accent: 'bg-accent'
      }
    },
    defaultVariants: {
      spacing: 'md',
      background: 'none'
    }
  }
)

// Component props
interface SectionProps {
  as?: 'section' | 'div' | 'article' | 'main' | 'header' | 'footer' | 'aside'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'default' | 'hero' | 'compact'
  background?: 'none' | 'default' | 'muted' | 'card' | 'accent'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<SectionProps>(), {
  as: 'section',
  spacing: 'md',
  background: 'none'
})

// Compute section classes
const sectionClasses = computed(() => {
  return cn(
    sectionVariants({
      spacing: props.spacing,
      background: props.background
    }),
    props.class
  )
})
</script>