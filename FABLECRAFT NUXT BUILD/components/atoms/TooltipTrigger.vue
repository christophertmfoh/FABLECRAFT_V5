<template>
  <div 
    class="tooltip-trigger" 
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
    @focus="showTooltip = true"
    @blur="showTooltip = false"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props
interface TooltipTriggerProps {
  asChild?: boolean
}

const props = withDefaults(defineProps<TooltipTriggerProps>(), {
  asChild: false
})

// State
const showTooltip = ref(false)

// Provide tooltip state to child components if needed
provide('tooltipVisible', showTooltip)
</script>