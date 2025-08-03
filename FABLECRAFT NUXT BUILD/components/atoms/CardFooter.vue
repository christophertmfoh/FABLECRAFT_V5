<template>
  <div :class="footerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardFooterProps {
  class?: string
}

const props = defineProps<CardFooterProps>()

const footerClasses = computed(() =>
  cn('flex items-center p-6 pt-0', props.class)
)
</script>