<template>
  <div :class="contentClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardContentProps {
  class?: string
}

const props = defineProps<CardContentProps>()

const contentClasses = computed(() =>
  cn('p-6 pt-0', props.class)
)
</script>