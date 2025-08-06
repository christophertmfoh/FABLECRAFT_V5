<template>
  <div :class="dividerClasses" role="separator" :aria-label="ariaLabel">
    <div :class="lineClasses" />
    <span v-if="text || $slots.default" :class="textClasses">
      <slot>{{ text }}</slot>
    </span>
    <div :class="lineClasses" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from './Utils'

// Divider variants using CVA
const dividerVariants = cva('flex items-center', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full flex-col',
    },
    spacing: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    spacing: 'md',
  },
})

const lineVariants = cva('border-border', {
  variants: {
    orientation: {
      horizontal: 'flex-1 border-t',
      vertical: 'flex-1 border-l',
    },
    style: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    style: 'solid',
  },
})

const textVariants = cva('text-sm font-medium text-muted-foreground', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'medium',
  },
})

// Component props
interface DividerProps {
  text?: string
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'sm' | 'md' | 'lg'
  style?: 'solid' | 'dashed' | 'dotted'
  size?: 'sm' | 'md' | 'lg'
  weight?: 'normal' | 'medium' | 'semibold'
  ariaLabel?: string
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<DividerProps>(), {
  text: '',
  orientation: 'horizontal',
  spacing: 'md',
  style: 'solid',
  size: 'md',
  weight: 'medium',
  ariaLabel: 'Section divider',
})

// Computed classes
const dividerClasses = computed(() => {
  return cn(
    dividerVariants({
      orientation: props.orientation,
      spacing: props.spacing,
    }),
    props.class
  )
})

const lineClasses = computed(() => {
  return lineVariants({
    orientation: props.orientation,
    style: props.style,
  })
})

const textClasses = computed(() => {
  return textVariants({
    size: props.size,
    weight: props.weight,
  })
})
</script>
