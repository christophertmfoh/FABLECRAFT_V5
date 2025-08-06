<template>
  <div :class="fieldClasses">
    <!-- Label -->
    <Label
      v-if="label || showLabel"
      :html-for="inputId"
      :required="required"
      :disabled="disabled"
      :class="labelClasses"
    >
      {{ label }}
    </Label>

    <!-- Input Container with optional trailing content -->
    <div :class="inputContainerClasses">
      <Input
        :id="inputId"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :invalid="hasError"
        :class="inputClasses"
        :aria-describedby="messageId"
        v-bind="$attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
      />
      
      <!-- Trailing slot for icons, buttons, etc. -->
      <div v-if="$slots.trailing" :class="trailingClasses">
        <slot name="trailing" />
      </div>
    </div>

    <!-- Form Message -->
    <FormMessage
      v-if="message || hasError"
      :id="messageId"
      :type="messageType"
      :message="message || errorMessage"
      :class="messageClasses"
    />

    <!-- Help text slot -->
    <div v-if="$slots.help" class="mt-1">
      <slot name="help" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '~/components/atoms/Utils'
import { useComponentId } from '~/composables/useComponentId'

// Component props
interface FormFieldProps {
  /** Field label text */
  label?: string
  /** Whether to show label */
  showLabel?: boolean
  /** Input type */
  type?: string
  /** Input placeholder */
  placeholder?: string
  /** Whether field is required */
  required?: boolean
  /** Whether field is disabled */
  disabled?: boolean
  /** Whether field is readonly */
  readonly?: boolean
  /** Custom message to display */
  message?: string
  /** Message type */
  messageType?: 'error' | 'success' | 'warning' | 'info' | 'default'
  /** Error message override */
  errorMessage?: string
  /** Whether field has error */
  hasError?: boolean
  /** Field spacing */
  spacing?: 'sm' | 'md' | 'lg'
  /** Custom input ID */
  id?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<FormFieldProps>(), {
  type: 'text',
  showLabel: true,
  required: false,
  disabled: false,
  readonly: false,
  messageType: 'default',
  hasError: false,
  spacing: 'md',
})

// Define model
const modelValue = defineModel<string | number>()

// Define emits
const emit = defineEmits<{
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

// Generate unique IDs
const inputId = computed(() => props.id || useComponentId('form-field'))
const messageId = computed(() => `${inputId.value}-message`)

// Internal state
const isFocused = ref(false)

// Computed classes
const fieldClasses = computed(() => {
  const spacingClasses = {
    sm: 'space-y-1.5',
    md: 'space-y-2', 
    lg: 'space-y-3',
  }

  return cn('w-full', spacingClasses[props.spacing], props.class)
})

const labelClasses = computed(() => {
  return cn('transition-colors duration-200', {
    'text-primary': isFocused.value && !props.hasError,
    'text-destructive': props.hasError,
  })
})

const inputContainerClasses = computed(() => {
  return cn('relative flex items-center', {
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 rounded-md': !props.hasError,
    'focus-within:ring-destructive': props.hasError,
  })
})

const inputClasses = computed(() => {
  return cn('flex-1', {
    'pr-10': !!$slots.trailing, // Add padding for trailing content
    'border-destructive focus:border-destructive': props.hasError,
    'cursor-not-allowed opacity-60': props.disabled,
  })
})

const trailingClasses = computed(() => {
  return cn(
    'absolute right-3 top-1/2 -translate-y-1/2 flex items-center',
    'pointer-events-auto z-10'
  )
})

const messageClasses = computed(() => {
  return cn('transition-all duration-200 ease-in-out')
})

// Event handlers
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = (event: Event) => {
  emit('input', event)
}
</script>

<style scoped>
/* Smooth transitions for form states */
.transition-colors {
  transition-property: color, border-color, background-color;
}

/* Enhanced focus styles */
.relative:focus-within .absolute {
  z-index: 10;
}

/* Input container hover effects */
.relative:hover:not(:focus-within) {
  transition: all 0.2s ease-in-out;
}
</style>