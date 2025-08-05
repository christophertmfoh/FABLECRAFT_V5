<template>
  <div :class="containerClasses">
    <div :class="contentClasses">
      <!-- Loading spinner -->
      <Spinner :size="spinnerSize" :class="spinnerClass" />

      <!-- Loading text -->
      <p v-if="text || $slots.default" :class="textClasses">
        <slot>{{ text }}</slot>
      </p>

      <!-- Sub text -->
      <p v-if="subText" :class="subTextClasses">
        {{ subText }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Component props
interface LoadingFallbackProps {
  text?: string
  subText?: string
  fullHeight?: boolean
  size?: 'sm' | 'md' | 'lg'
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  containerClass?: string | Record<string, boolean> | string[]
  contentClass?: string | Record<string, boolean> | string[]
  spinnerClass?: string | Record<string, boolean> | string[]
  textClass?: string | Record<string, boolean> | string[]
  subTextClass?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<LoadingFallbackProps>(), {
  fullHeight: true,
  size: 'md',
  text: 'Loading...',
})

// Size mappings for consistent scaling
const sizeConfigs = {
  sm: {
    spinner: 'sm' as const,
    textSize: 'text-sm',
    subTextSize: 'text-xs',
    gap: 'gap-2',
  },
  md: {
    spinner: 'md' as const,
    textSize: 'text-base',
    subTextSize: 'text-sm',
    gap: 'gap-3',
  },
  lg: {
    spinner: 'lg' as const,
    textSize: 'text-lg',
    subTextSize: 'text-base',
    gap: 'gap-4',
  },
}

// Compute spinner size
const spinnerSize = computed(() => {
  return props.spinnerSize || sizeConfigs[props.size].spinner
})

// Compute container classes
const containerClasses = computed(() => {
  return cn(
    'flex items-center justify-center',
    props.fullHeight && 'min-h-screen',
    'p-4',
    props.containerClass
  )
})

// Compute content wrapper classes
const contentClasses = computed(() => {
  return cn(
    'flex flex-col items-center justify-center',
    sizeConfigs[props.size].gap,
    props.contentClass
  )
})

// Compute text classes
const textClasses = computed(() => {
  return cn(
    'text-center',
    sizeConfigs[props.size].textSize,
    'text-muted-foreground',
    'font-medium',
    props.textClass
  )
})

// Compute sub text classes
const subTextClasses = computed(() => {
  return cn(
    'text-center',
    sizeConfigs[props.size].subTextSize,
    'text-muted-foreground/60',
    props.subTextClass
  )
})
</script>
