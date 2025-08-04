<template>
  <p :class="descriptionClasses">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardDescriptionProps {
  class?: string | Record<string, boolean> | string[]
}

const props = defineProps<CardDescriptionProps>()

const descriptionClasses = computed(() => {
  return cn(
    'text-sm text-muted-foreground',
    props.class
  )
})
</script>