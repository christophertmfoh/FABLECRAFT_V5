<template>
  <p :class="textClasses">
    <span v-if="showSymbol" aria-label="Copyright">©</span>
    {{ displayText }}
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface CopyrightTextProps {
  company?: string
  startYear?: number | string
  showSymbol?: boolean
  format?: 'short' | 'long' | 'custom'
  customFormat?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<CopyrightTextProps>(), {
  company: 'Company Name',
  showSymbol: true,
  format: 'short'
})

// Get current year
const currentYear = new Date().getFullYear()

// Computed display text
const displayText = computed(() => {
  const start = props.startYear ? Number(props.startYear) : currentYear
  const yearRange = start < currentYear ? `${start}-${currentYear}` : `${currentYear}`
  
  switch (props.format) {
    case 'short':
      return `${yearRange} ${props.company}`
    case 'long':
      return `${yearRange} ${props.company}. All rights reserved.`
    case 'custom':
      return props.customFormat
        ?.replace('{year}', yearRange)
        ?.replace('{company}', props.company) || `${yearRange} ${props.company}`
    default:
      return `${yearRange} ${props.company}`
  }
})

// Computed classes
const textClasses = computed(() => {
  return cn(
    'text-sm text-muted-foreground',
    props.class
  )
})
</script>