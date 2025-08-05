<template>
  <component :is="as" :class="containerClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from './Utils'

// Container variants using CVA
const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-none',
    },
    padding: {
      none: '',
      sm: 'px-4',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12',
    },
  },
  defaultVariants: {
    size: 'lg',
    padding: 'md',
  },
})

// Component props
interface ContainerProps {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'aside' | 'nav'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<ContainerProps>(), {
  as: 'div',
  size: 'lg',
  padding: 'md',
})

// Compute container classes
const containerClasses = computed(() => {
  return cn(
    containerVariants({
      size: props.size,
      padding: props.padding,
    }),
    props.class
  )
})
</script>
