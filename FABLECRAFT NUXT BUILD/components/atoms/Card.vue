<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardProps {
  class?: string
}

const props = defineProps<CardProps>()

// Match original card styling exactly
const cardClasses = computed(() =>
  cn(
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    props.class
  )
)
</script>