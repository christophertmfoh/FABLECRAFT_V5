<template>
  <div :class="groupClasses">
    <!-- Badge -->
    <Badge 
      v-if="badge || $slots.badge"
      :variant="badgeVariant"
      :class="badgeClasses"
    >
      <slot name="badge">{{ badge }}</slot>
    </Badge>
    
    <!-- Heading -->
    <component
      :is="as"
      :class="headingClasses"
    >
      <slot>{{ heading }}</slot>
    </component>
    
    <!-- Description -->
    <p 
      v-if="description || $slots.description"
      :class="descriptionClasses"
    >
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'
import Badge from './Badge.vue'

// Component props
interface HeadingGroupProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  heading?: string
  description?: string
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  align?: 'left' | 'center' | 'right'
  spacing?: 'tight' | 'normal' | 'loose'
  class?: any
  headingClass?: any
  descriptionClass?: any
  badgeClass?: any
}

// Define props with defaults
const props = withDefaults(defineProps<HeadingGroupProps>(), {
  as: 'h2',
  badgeVariant: 'secondary',
  align: 'left',
  spacing: 'normal'
})

// Spacing mappings
const spacingClasses = {
  tight: 'space-y-1',
  normal: 'space-y-2',
  loose: 'space-y-4'
}

// Alignment mappings
const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

// Heading size based on tag
const headingSizeClasses = {
  h1: 'text-4xl sm:text-5xl font-bold tracking-tight',
  h2: 'text-3xl sm:text-4xl font-semibold tracking-tight',
  h3: 'text-2xl sm:text-3xl font-semibold',
  h4: 'text-xl sm:text-2xl font-semibold',
  h5: 'text-lg sm:text-xl font-semibold',
  h6: 'text-base sm:text-lg font-semibold'
}

// Computed classes
const groupClasses = computed(() => {
  return cn(
    spacingClasses[props.spacing],
    alignmentClasses[props.align],
    props.class
  )
})

const badgeClasses = computed(() => {
  return cn(
    'mb-2',
    props.align === 'center' && 'mx-auto',
    props.align === 'right' && 'ml-auto',
    props.badgeClass
  )
})

const headingClasses = computed(() => {
  return cn(
    headingSizeClasses[props.as],
    'text-foreground',
    props.headingClass
  )
})

const descriptionClasses = computed(() => {
  return cn(
    'text-muted-foreground',
    props.as === 'h1' || props.as === 'h2' ? 'text-lg' : 'text-base',
    'max-w-3xl',
    props.align === 'center' && 'mx-auto',
    props.align === 'right' && 'ml-auto',
    props.descriptionClass
  )
})
</script>