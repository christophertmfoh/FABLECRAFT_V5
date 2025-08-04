<template>
  <component
    :is="as"
    :class="visuallyHiddenClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface VisuallyHiddenProps {
  as?: string
  focusable?: boolean
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<VisuallyHiddenProps>(), {
  as: 'span',
  focusable: false
})

// Standard visually hidden styles that work across all screen readers
const baseClasses = `
  absolute
  w-px h-px
  p-0 -m-px
  overflow-hidden
  whitespace-nowrap
  border-0
`

// Additional styles for the clip-path method (most reliable)
const clipClasses = `
  [clip:rect(0,0,0,0)]
  [clip-path:inset(50%)]
`

// When focusable, we need different styles to allow keyboard focus
const focusableClasses = `
  focus:absolute
  focus:w-auto focus:h-auto
  focus:p-2
  focus:m-0
  focus:overflow-visible
  focus:clip-auto
  focus:[clip-path:none]
  focus:whitespace-normal
  focus:z-50
  focus:bg-background
  focus:border
  focus:rounded
  focus:shadow-lg
`

// Computed classes
const visuallyHiddenClasses = computed(() => {
  return cn(
    baseClasses,
    clipClasses,
    props.focusable && focusableClasses,
    props.class
  )
})
</script>