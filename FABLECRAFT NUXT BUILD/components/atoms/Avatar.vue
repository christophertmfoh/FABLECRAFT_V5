<template>
  <div :class="avatarClasses" :style="avatarStyles">
    <!-- Image Avatar -->
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt || `Avatar for ${name}`"
      :class="imageClasses"
      @error="handleImageError"
      @load="handleImageLoad"
    />

    <!-- Initials Avatar -->
    <span
      v-else-if="initials || name"
      :class="initialsClasses"
      :aria-label="alt || `Avatar for ${name}`"
    >
      {{ displayInitials }}
    </span>

    <!-- Fallback Icon -->
    <AtomIcon v-else :name="fallbackIcon" :class="iconClasses" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from './Utils'

// Component props
interface AvatarProps {
  src?: string
  name?: string
  initials?: string
  alt?: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  variant?: 'circle' | 'rounded' | 'square'
  gradient?: boolean
  gradientFrom?: string
  gradientTo?: string
  fallbackIcon?: string
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'base',
  variant: 'circle',
  gradient: true,
  gradientFrom: 'hsl(var(--primary))',
  gradientTo: 'hsl(var(--primary) / 0.6)',
  fallbackIcon: 'lucide:user',
})

// Local state
const imageError = ref(false)
const imageLoaded = ref(false)

// Computed properties
const displayInitials = computed(() => {
  if (props.initials) return props.initials.toUpperCase()

  if (props.name) {
    return props.name
      .split(' ')
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
  }

  return ''
})

// Size classes
const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  base: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
}

// Variant classes
const variantClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
}

// Avatar container classes
const avatarClasses = computed(() => {
  return cn(
    'relative inline-flex items-center justify-center font-bold text-primary-foreground overflow-hidden',
    'transition-all duration-300',
    sizeClasses[props.size],
    variantClasses[props.variant],
    !props.src && props.gradient && 'bg-gradient-to-br',
    !props.src && !props.gradient && 'bg-muted text-muted-foreground',
    props.class
  )
})

// Avatar styles for gradient
const avatarStyles = computed(() => {
  if (props.src || !props.gradient) return {}

  return {
    background: `linear-gradient(to bottom right, ${props.gradientFrom}, ${props.gradientTo})`,
  }
})

// Image classes
const imageClasses = computed(() => {
  return cn('w-full h-full object-cover', variantClasses[props.variant])
})

// Initials classes
const initialsClasses = computed(() => {
  return cn('select-none font-bold leading-none')
})

// Icon classes
const iconClasses = computed(() => {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    base: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
  }

  return cn(iconSizes[props.size], 'text-current')
})

// Event handlers
const handleImageError = () => {
  imageError.value = true
}

const handleImageLoad = () => {
  imageLoaded.value = true
  imageError.value = false
}
</script>
