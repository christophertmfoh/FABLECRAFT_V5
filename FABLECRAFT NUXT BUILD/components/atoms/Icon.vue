<template>
  <Icon 
    :name="iconName" 
    :size="sizeValue"
    :class="iconClasses"
  />
</template>

<script setup lang="ts">
import type { ComponentSize } from '~/types'
import { cn } from './Utils'

interface IconProps {
  name: string
  size?: ComponentSize
  class?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md'
})

// Use Nuxt Icon's naming convention
const iconName = computed(() => {
  // Support both formats: 'Zap' and 'i-lucide-zap'
  if (props.name.startsWith('i-')) return props.name
  return `i-lucide-${props.name.toLowerCase()}`
})

// Size in pixels for Nuxt Icon - matching original icon sizing
const sizeMap: Record<ComponentSize, string> = {
  xs: '16px',
  sm: '16px', // Matches [&_svg]:size-4
  md: '20px',
  lg: '24px',
  xl: '32px'
}

const sizeValue = computed(() => sizeMap[props.size])

const iconClasses = computed(() => 
  cn(
    'inline-block shrink-0',
    props.class
  )
)
</script>