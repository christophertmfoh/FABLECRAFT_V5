<template>
  <span :class="copyrightClasses">
    {{ copyrightText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface CopyrightTextProps {
  company: string
  startYear?: number    // Optional start year for range (e.g., 2020-2024)
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'subtle'
  class?: string
}

// Component setup
const props = withDefaults(defineProps<CopyrightTextProps>(), {
  size: 'md',
  variant: 'default',
  class: ''
})

// Get current year
const getCurrentYear = () => new Date().getFullYear()

// Computed properties
const copyrightText = computed(() => {
  const currentYear = getCurrentYear()
  
  // If startYear is provided and different from current year, show range
  if (props.startYear && props.startYear < currentYear) {
    return `© ${props.startYear}-${currentYear} ${props.company}. All rights reserved.`
  }
  
  // Otherwise, just show current year
  return `© ${currentYear} ${props.company}. All rights reserved.`
})

const copyrightClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const variantClasses = {
    default: 'text-foreground/50',
    subtle: 'text-muted-foreground'
  }

  return cn(
    'inline-block',
    'leading-relaxed',
    'tracking-normal',
    sizeClasses[props.size],
    variantClasses[props.variant],
    props.class
  )
})
</script>

<style scoped>
/* Ensure consistent text color */
.text-foreground\/50 {
  color: hsl(var(--foreground) / 0.5);
}

/* Responsive text handling */
@media (max-width: 640px) {
  span {
    word-break: break-word;
  }
}
</style>