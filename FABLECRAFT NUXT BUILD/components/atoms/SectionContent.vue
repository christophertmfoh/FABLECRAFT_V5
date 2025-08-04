<template>
  <component 
    :is="as"
    :class="sectionClasses"
  >
    <div :class="containerClasses">
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface SectionContentProps {
  as?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  center?: boolean
  class?: any
  containerClass?: any
}

// Define props with defaults
const props = withDefaults(defineProps<SectionContentProps>(), {
  as: 'section',
  size: 'lg',
  padding: 'md',
  center: true
})

// Size mappings
const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
}

// Padding mappings
const paddingClasses = {
  none: '',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
  xl: 'px-4 sm:px-8 lg:px-12 xl:px-16'
}

// Computed classes
const sectionClasses = computed(() => {
  return cn(
    'w-full',
    props.class
  )
})

const containerClasses = computed(() => {
  return cn(
    'w-full',
    sizeClasses[props.size],
    paddingClasses[props.padding],
    props.center && 'mx-auto',
    props.containerClass
  )
})
</script>