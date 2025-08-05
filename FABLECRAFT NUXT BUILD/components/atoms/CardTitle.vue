<template>
  <h3 :class="titleClasses">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardTitleProps {
  class?: string | Record<string, boolean> | string[]
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
}

const props = withDefaults(defineProps<CardTitleProps>(), {
  as: 'h3',
})

const titleClasses = computed(() => {
  return cn('text-2xl font-semibold leading-none tracking-tight', props.class)
})
</script>
