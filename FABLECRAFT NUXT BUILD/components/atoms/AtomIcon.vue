<template>
  <!-- ✅ PHASE 1: Direct Icon usage with CSS mode for zero network requests -->
  <Icon 
    :name="name" 
    :class="iconClasses" 
    :style="customStyle"
    mode="css"
  />
</template>

<script setup lang="ts">
// ✅ PERFORMANCE: Optimized atomic icon component with zero wrapper overhead
import { cn } from './Utils'

// Size mapping for consistent icon sizing across atomic design
const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
} as const

// Component props with proper TypeScript inference
interface IconProps {
  name: string
  size?: keyof typeof sizeClasses
  class?: string | Record<string, boolean> | string[]
  color?: string
}

// Define props with sensible defaults
const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
})

// Compute icon classes with proper bundling
const iconClasses = computed(() => {
  return cn(sizeClasses[props.size], props.class)
})

// Compute custom style for color override
const customStyle = computed(() => {
  if (props.color) {
    return {
      color: props.color,
    }
  }
  return undefined
})
</script>
