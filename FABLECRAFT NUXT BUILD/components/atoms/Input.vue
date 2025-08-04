<template>
  <input
    :id="inputId"
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :class="inputClasses"
    :aria-invalid="invalid"
    :aria-describedby="ariaDescribedby"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { cn } from './Utils'
import { useComponentId } from '~/composables/useComponentId'

// Component props
interface InputProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  invalid?: boolean
  id?: string
  class?: any
  ariaDescribedby?: string
}

// Define props with defaults
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  invalid: false,
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

// Generate unique ID if not provided
const inputId = computed(() => props.id || useComponentId('input'))

// Two-way binding for v-model
const modelValue = computed({
  get() {
    return props.modelValue ?? ''
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// Compute input classes
const inputClasses = computed(() => {
  return cn(
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.invalid && 'border-destructive focus-visible:ring-destructive',
    props.class
  )
})
</script>