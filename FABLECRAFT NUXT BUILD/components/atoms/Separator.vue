<template>
  <div
    v-if="orientation === 'horizontal'"
    role="separator"
    :aria-orientation="orientation"
    :aria-label="label"
    :class="separatorClasses"
  />
  <div
    v-else
    role="separator"
    :aria-orientation="orientation"
    :aria-label="label"
    :class="separatorClasses"
  />
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Component props
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted'
  decorative?: boolean
  label?: string
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  variant: 'solid',
  decorative: true,
})

// Compute separator classes based on orientation and variant
const separatorClasses = computed(() => {
  const baseClasses = 'shrink-0 bg-border'

  const orientationClasses = {
    horizontal: 'h-[1px] w-full',
    vertical: 'h-full w-[1px]',
  }

  const variantClasses = {
    solid: '',
    dashed:
      props.orientation === 'horizontal'
        ? 'bg-transparent border-t border-dashed'
        : 'bg-transparent border-l border-dashed',
    dotted:
      props.orientation === 'horizontal'
        ? 'bg-transparent border-t border-dotted'
        : 'bg-transparent border-l border-dotted',
  }

  return cn(
    baseClasses,
    orientationClasses[props.orientation],
    variantClasses[props.variant],
    props.class
  )
})
</script>
