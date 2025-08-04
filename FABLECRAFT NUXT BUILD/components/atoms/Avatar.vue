<template>
  <div :class="containerClasses">
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      :class="imageClasses"
      @error="handleImageError"
    />
    <div
      v-else
      :class="fallbackClasses"
      :style="fallbackStyles"
      :aria-label="alt"
    >
      {{ initials }}
    </div>
    <div
      v-if="status"
      :class="statusClasses"
      :aria-label="`Status: ${status}`"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from './Utils'

// Component props
interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  status?: 'online' | 'offline' | 'busy' | 'away'
  gradientSeed?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<AvatarProps>(), {
  alt: 'Avatar',
  size: 'md',
  shape: 'circle'
})

// Image error state
const imageError = ref(false)

// Size mappings
const sizeClasses = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
}

const statusSizeClasses = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-4 w-4'
}

const statusPositionClasses = {
  xs: 'bottom-0 right-0',
  sm: 'bottom-0 right-0',
  md: 'bottom-0 right-0',
  lg: 'bottom-0 right-0',
  xl: 'bottom-0.5 right-0.5'
}

// Status color mappings
const statusColorClasses = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500'
}

// Generate initials from name
const initials = computed(() => {
  const displayName = props.name || props.alt || 'U'
  const parts = displayName.trim().split(/\s+/)
  
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
})

// Generate gradient background
const gradientBackground = computed(() => {
  const seed = props.gradientSeed || props.name || props.alt || 'default'
  const hash = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  
  // Use theme-aware approach with CSS custom properties
  const colorIndex = Math.abs(hash) % 5
  const themeColors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--muted-foreground))',
    'hsl(var(--foreground))'
  ]
  
  const color1 = themeColors[colorIndex]
  const color2 = themeColors[(colorIndex + 1) % themeColors.length]
  
  return `linear-gradient(135deg, ${color1}, ${color2})`
})

// Computed classes
const containerClasses = computed(() => {
  return cn(
    'relative inline-block',
    sizeClasses[props.size],
    props.class
  )
})

const imageClasses = computed(() => {
  return cn(
    'h-full w-full object-cover',
    props.shape === 'circle' ? 'rounded-full' : 'rounded-md'
  )
})

const fallbackClasses = computed(() => {
  return cn(
    'flex h-full w-full items-center justify-center font-medium text-white',
    props.shape === 'circle' ? 'rounded-full' : 'rounded-md',
    textSizeClasses[props.size]
  )
})

const fallbackStyles = computed(() => {
  return {
    background: gradientBackground.value
  }
})

const statusClasses = computed(() => {
  return cn(
    'absolute rounded-full ring-2 ring-background',
    statusSizeClasses[props.size],
    statusPositionClasses[props.size],
    statusColorClasses[props.status!]
  )
})

// Event handlers
const handleImageError = () => {
  imageError.value = true
}
</script>