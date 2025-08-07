<template>
  <div 
    v-if="tooltipVisible"
    class="tooltip-content absolute z-50 rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md border"
    role="tooltip"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

// Inject tooltip visibility state
const tooltipVisible = inject('tooltipVisible', ref(false))
</script>