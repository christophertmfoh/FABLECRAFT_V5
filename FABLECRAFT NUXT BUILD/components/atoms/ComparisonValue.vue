<template>
  <div :class="valueClasses">
    <!-- Boolean values -->
    <template v-if="typeof value === 'boolean'">
      <Icon 
        v-if="value" 
        name="lucide:check" 
        :class="iconClasses"
        aria-label="Included"
      />
      <Icon 
        v-else 
        name="lucide:x" 
        :class="iconClasses"
        aria-label="Not included"
      />
    </template>
    
    <!-- String/Number values -->
    <template v-else>
      <span :class="textClasses">{{ value }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

interface ComparisonValueProps {
  value: boolean | string | number
  size?: 'sm' | 'md' | 'lg'
  class?: string | Record<string, boolean> | string[]
}

const props = withDefaults(defineProps<ComparisonValueProps>(), {
  size: 'md',
})

const valueClasses = computed(() =>
  cn(
    'inline-flex items-center justify-center',
    props.class
  )
)

const iconClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return cn(
    sizeClasses[props.size],
    typeof props.value === 'boolean' && props.value
      ? 'text-green-600 dark:text-green-500'
      : 'text-muted-foreground/50'
  )
})

const textClasses = computed(() => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return cn(
    sizeClasses[props.size],
    'font-medium',
    props.value === 'Unlimited' || props.value === 'Custom'
      ? 'text-primary font-semibold'
      : 'text-foreground'
  )
})
</script>