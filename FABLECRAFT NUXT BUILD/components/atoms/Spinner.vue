<template>
  <Icon :name="icon" :class="spinnerClasses" :style="customStyle" />
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Size mapping for spinner
const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
} as const

// Component props
interface SpinnerProps {
  size?: keyof typeof sizeClasses
  icon?: string
  class?: string | Record<string, boolean> | string[]
  color?: string
}

// Define props with defaults
const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md',
  icon: 'lucide:loader-circle',
})

// Compute spinner classes
const spinnerClasses = computed(() => {
  return cn('animate-spin', sizeClasses[props.size], props.class)
})

// Compute custom style for color
const customStyle = computed(() => {
  if (props.color) {
    return {
      color: props.color,
    }
  }
  return undefined
})
</script>
