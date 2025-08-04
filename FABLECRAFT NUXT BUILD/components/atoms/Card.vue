<template>
  <div :class="cardClasses">
    <!-- Header slot -->
    <div v-if="$slots.header" class="flex flex-col space-y-1.5 p-6">
      <slot name="header" />
    </div>

    <!-- Default content slot -->
    <div v-if="$slots.default" class="p-6" :class="{ 'pt-0': $slots.header }">
      <slot />
    </div>

    <!-- Footer slot -->
    <div v-if="$slots.footer" class="flex items-center p-6 pt-0">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

// Component props
interface CardProps {
  class?: string | Record<string, boolean> | string[]
}

// Define props
const props = defineProps<CardProps>()

// Compute card classes
const cardClasses = computed(() => {
  return cn(
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    props.class
  )
})
</script>