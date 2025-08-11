<template>
  <textarea
    :id="textareaId"
    v-model="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :rows="rows"
    :class="textareaClasses"
    :aria-invalid="invalid"
    :aria-describedby="ariaDescribedby"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { cn } from './Utils'
import { useComponentId } from '~/composables/useComponentId'

// Component props
interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  invalid?: boolean
  rows?: number
  id?: string
  class?: string | Record<string, boolean> | string[]
  ariaDescribedby?: string
}

// Define props with defaults
const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  invalid: false,
  rows: 4,
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Generate unique ID if not provided
const textareaId = computed(() => props.id || useComponentId('textarea'))

// Two-way binding for v-model
const modelValue = computed({
  get() {
    return props.modelValue ?? ''
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// Compute textarea classes
const textareaClasses = computed(() => {
  return cn(
    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
    props.invalid && 'border-destructive focus-visible:ring-destructive',
    props.class
  )
})
</script>