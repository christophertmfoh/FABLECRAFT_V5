<template>
  <div :class="headerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardHeaderProps {
  class?: string
}

const props = defineProps<CardHeaderProps>()

const headerClasses = computed(() =>
  cn('flex flex-col space-y-1.5 p-6', props.class)
)
</script>