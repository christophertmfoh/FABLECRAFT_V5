<template>
  <h3 :class="titleClasses">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { cn } from './Utils'

interface CardTitleProps {
  class?: string
}

const props = defineProps<CardTitleProps>()

const titleClasses = computed(() =>
  cn(
    'text-2xl font-semibold leading-none tracking-tight',
    props.class
  )
)
</script>