<template>
  <Icon
    :name="name"
    :class="iconClasses"
    :style="customStyle"
  />
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Size mapping for consistent icon sizing
const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
} as const

// Component props
interface IconProps {
  name: string
  size?: keyof typeof sizeClasses
  class?: string | Record<string, boolean> | string[]
  color?: string
}

// Define props with defaults
const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
})

// Compute icon classes
const iconClasses = computed(() => {
  return cn(
    sizeClasses[props.size],
    props.class
  )
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