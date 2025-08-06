<template>
  <div 
    class="flex items-center gap-1" 
    role="img" 
    :aria-label="`${rating} out of ${maxRating} stars`"
  >
    <span
      v-for="star in maxRating"
      :key="`star-${star}`"
      :class="starClasses(star)"
      aria-hidden="true"
    >
      <AtomIcon
        :name="star <= rating ? 'lucide:star' : 'lucide:star'"
        :size="size"
        :class="star <= rating ? 'fill-current' : ''"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Component props
interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'warning' | 'success'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<StarRatingProps>(), {
  maxRating: 5,
  size: 'base',
  color: 'warning',
})

// Computed classes for individual stars
const starClasses = computed(() => (starNumber: number) => {
  const isActive = starNumber <= props.rating
  
  const baseClasses = 'transition-colors duration-200'
  
  const colorClasses = {
    primary: isActive ? 'text-primary' : 'text-muted-foreground/30',
    secondary: isActive ? 'text-secondary' : 'text-muted-foreground/30', 
    warning: isActive ? 'text-yellow-500' : 'text-muted-foreground/30',
    success: isActive ? 'text-green-500' : 'text-muted-foreground/30',
  }
  
  return [
    baseClasses,
    colorClasses[props.color],
    props.class,
  ]
})

// Size mapping for icons
const sizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  base: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
}

const size = computed(() => sizeMap[props.size])
</script>
