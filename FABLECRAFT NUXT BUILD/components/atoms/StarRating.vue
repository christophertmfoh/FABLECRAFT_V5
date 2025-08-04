<template>
  <fieldset
    :class="fieldsetClasses"
    :disabled="disabled"
  >
    <legend v-if="label" :class="legendClasses">
      {{ label }}
      <span v-if="required" class="text-destructive ml-1">*</span>
    </legend>
    
    <div 
      :class="containerClasses"
      role="radiogroup"
      :aria-label="label || 'Rating'"
      :aria-describedby="description ? componentId + '-description' : undefined"
      @mouseleave="hoveredValue = 0"
    >
      <!-- Zero/Clear rating option -->
      <label
        v-if="allowClear"
        :for="`${componentId}-0`"
        class="sr-only"
      >
        <input
          :id="`${componentId}-0`"
          v-model="internalValue"
          type="radio"
          :name="name || componentId"
          :value="0"
          class="sr-only"
          @focus="focusedValue = 0"
          @blur="focusedValue = -1"
        >
        <span>No rating</span>
      </label>

      <!-- Star rating options -->
      <label
        v-for="star in maxStars"
        :key="star"
        :for="`${componentId}-${star}`"
        :class="starLabelClasses"
        @mouseenter="!disabled && (hoveredValue = star)"
      >
        <input
          :id="`${componentId}-${star}`"
          v-model="internalValue"
          type="radio"
          :name="name || componentId"
          :value="star"
          :disabled="disabled"
          :required="required && star === 1"
          class="sr-only peer"
          @focus="focusedValue = star"
          @blur="focusedValue = -1"
        >
        
        <Icon
          :name="getStarIcon(star)"
          :class="getStarClasses(star)"
          aria-hidden="true"
        />
        
        <VisuallyHidden>{{ star }} {{ star === 1 ? 'star' : 'stars' }}</VisuallyHidden>
      </label>
    </div>

    <p
      v-if="description"
      :id="`${componentId}-description`"
      :class="descriptionClasses"
    >
      {{ description }}
    </p>

    <!-- Display current value for screen readers -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      Current rating: {{ internalValue || 0 }} out of {{ maxStars }} stars
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from './Utils'
import { useComponentId } from '~/composables/useComponentId'
import VisuallyHidden from './VisuallyHidden.vue'

// Component props
interface StarRatingProps {
  modelValue?: number
  maxStars?: number
  label?: string
  description?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'warning' | 'neutral'
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  allowClear?: boolean
  filledIcon?: string
  emptyIcon?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<StarRatingProps>(), {
  modelValue: 0,
  maxStars: 5,
  size: 'md',
  color: 'warning',
  disabled: false,
  required: false,
  readonly: false,
  allowClear: true,
  filledIcon: 'lucide:star',
  emptyIcon: 'lucide:star'
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
}>()

// Generate unique ID
const componentId = useComponentId('star-rating')

// Local state
const hoveredValue = ref(0)
const focusedValue = ref(-1)

// v-model support
const internalValue = computed({
  get: () => props.modelValue || 0,
  set: (value: number) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

// Size classes
const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8'
}

// Color classes
const colorClasses = {
  primary: {
    filled: 'text-primary',
    empty: 'text-muted',
    hover: 'hover:text-primary/80'
  },
  secondary: {
    filled: 'text-secondary',
    empty: 'text-muted',
    hover: 'hover:text-secondary/80'
  },
  warning: {
    filled: 'text-warning',
    empty: 'text-muted',
    hover: 'hover:text-warning/80'
  },
  neutral: {
    filled: 'text-foreground',
    empty: 'text-muted',
    hover: 'hover:text-foreground/80'
  }
}

// Fieldset classes
const fieldsetClasses = computed(() => {
  return cn(
    'border-0 p-0 m-0',
    props.disabled && 'opacity-50 cursor-not-allowed',
    props.class
  )
})

// Legend classes
const legendClasses = computed(() => {
  return cn(
    'text-sm font-medium mb-1',
    props.disabled && 'text-muted-foreground'
  )
})

// Container classes
const containerClasses = computed(() => {
  return cn(
    'inline-flex items-center',
    props.readonly ? 'pointer-events-none' : 'cursor-pointer'
  )
})

// Star label classes
const starLabelClasses = computed(() => {
  return cn(
    'relative cursor-pointer',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded',
    props.disabled && 'cursor-not-allowed'
  )
})

// Description classes
const descriptionClasses = computed(() => {
  return cn(
    'text-sm text-muted-foreground mt-1',
    props.disabled && 'opacity-75'
  )
})

// Get star icon based on state
const getStarIcon = (star: number): string => {
  const displayValue = hoveredValue.value || internalValue.value
  return star <= displayValue ? props.filledIcon : props.emptyIcon
}

// Get star classes based on state
const getStarClasses = (star: number) => {
  const colors = colorClasses[props.color]
  const displayValue = hoveredValue.value || internalValue.value
  const isFocused = focusedValue.value === star
  const isFilled = star <= displayValue

  return cn(
    'transition-all duration-150',
    sizeClasses[props.size],
    isFilled ? colors.filled : colors.empty,
    !props.disabled && !props.readonly && colors.hover,
    isFilled && 'fill-current',
    isFocused && 'ring-2 ring-ring ring-offset-2 rounded',
    // Subtle scale effect on hover
    hoveredValue.value === star && !props.disabled && 'scale-110'
  )
}
</script>

<style scoped>
/* Ensure smooth keyboard navigation */
.sr-only:focus-visible + svg {
  @apply ring-2 ring-ring ring-offset-2 rounded;
}
</style>