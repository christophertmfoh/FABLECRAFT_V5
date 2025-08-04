<template>
  <div :class="rootClasses">
    <div :class="containerClasses">
      <!-- Hidden native checkbox for form submission and accessibility -->
      <input
        :id="id || componentId"
        ref="checkboxRef"
        type="checkbox"
        class="sr-only peer"
        :name="name"
        :value="value"
        :required="required"
        :disabled="disabled"
        :checked="isChecked"
        :indeterminate="isIndeterminate"
        @change="handleChange"
      />
      
      <!-- Custom checkbox visual -->
      <div
        :class="baseClasses"
        role="checkbox"
        :aria-checked="ariaChecked"
        :aria-labelledby="labelId"
        :aria-describedby="descriptionId"
        :aria-required="required"
        :aria-disabled="disabled"
        tabindex="0"
        @click="handleClick"
        @keydown="handleKeydown"
      >
        <div v-if="isChecked || isIndeterminate" :class="indicatorClasses">
          <AtomIcon
            :name="isIndeterminate ? indeterminateIcon : icon"
            :class="iconClasses"
          />
        </div>
      </div>
    </div>

    <!-- Label and description wrapper -->
    <div v-if="label || description || $slots.label || $slots.description" :class="wrapperClasses">
      <label
        v-if="label || $slots.label"
        :id="labelId"
        :for="id || componentId"
        :class="labelClasses"
      >
        <slot name="label" :label="label">
          {{ label }}
        </slot>
      </label>
      
      <p
        v-if="description || $slots.description"
        :id="descriptionId"
        :class="descriptionClasses"
      >
        <slot name="description" :description="description">
          {{ description }}
        </slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './Utils'
import { useComponentId } from '~/composables/useComponentId'
import AtomIcon from './AtomIcon.vue'

// Checkbox variants using CVA
const checkboxVariants = cva(
  'rounded-sm ring ring-inset ring-border overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      color: {
        primary: 'focus-visible:outline-primary',
        secondary: 'focus-visible:outline-secondary',
        success: 'focus-visible:outline-success',
        info: 'focus-visible:outline-info',
        warning: 'focus-visible:outline-warning',
        error: 'focus-visible:outline-error',
        neutral: 'focus-visible:outline-inverted'
      },
      variant: {
        list: '',
        card: ''
      },
      size: {
        xs: 'size-3',
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-4.5',
        xl: 'size-5'
      },
      disabled: {
        true: 'cursor-not-allowed opacity-75',
        false: 'cursor-pointer'
      },
      checked: {
        true: '',
        false: ''
      }
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'list',
      disabled: false,
      checked: false
    }
  }
)

// Component props
interface CheckboxProps extends VariantProps<typeof checkboxVariants> {
  id?: string
  name?: string
  value?: string | number | boolean
  label?: string
  description?: string
  modelValue?: boolean | 'indeterminate'
  defaultValue?: boolean | 'indeterminate'
  required?: boolean
  disabled?: boolean
  icon?: string
  indeterminateIcon?: string
  indicator?: 'start' | 'end' | 'hidden'
  class?: string | Record<string, boolean> | string[]
  ui?: {
    root?: string | Record<string, boolean> | string[]
    container?: string | Record<string, boolean> | string[]
    base?: string | Record<string, boolean> | string[]
    indicator?: string | Record<string, boolean> | string[]
    icon?: string | Record<string, boolean> | string[]
    wrapper?: string | Record<string, boolean> | string[]
    label?: string | Record<string, boolean> | string[]
    description?: string | Record<string, boolean> | string[]
  }
}

// Define props with defaults
const props = withDefaults(defineProps<CheckboxProps>(), {
  value: 'on',
  icon: 'i-lucide-check',
  indeterminateIcon: 'i-lucide-minus',
  indicator: 'start'
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean | 'indeterminate']
  change: [event: Event]
}>()

// Generate component IDs
const componentId = useComponentId()
const labelId = computed(() => `${componentId.value}-label`)
const descriptionId = computed(() => `${componentId.value}-description`)

// Template refs
const checkboxRef = ref<HTMLInputElement | null>(null)

// State management
const internalValue = ref<boolean | 'indeterminate'>(props.defaultValue || false)

const currentValue = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : internalValue.value,
  set: (value: boolean | 'indeterminate') => {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', value)
    } else {
      internalValue.value = value
    }
  }
})

const isChecked = computed(() => currentValue.value === true)
const isIndeterminate = computed(() => currentValue.value === 'indeterminate')

// ARIA checked state
const ariaChecked = computed(() => {
  if (isIndeterminate.value) return 'mixed'
  return isChecked.value ? 'true' : 'false'
})

// Compute classes
const rootClasses = computed(() => {
  const variantClasses: Record<string, string> = {
    list: '',
    card: 'border border-muted rounded-lg'
  }
  
  const indicatorClasses: Record<string, string> = {
    start: 'flex-row',
    end: 'flex-row-reverse',
    hidden: ''
  }
  
  const sizeClasses: Record<string, Record<string, string>> = {
    card: {
      xs: 'p-2.5',
      sm: 'p-3',
      md: 'p-3.5',
      lg: 'p-4',
      xl: 'p-4.5'
    }
  }
  
  return cn(
    'relative flex items-start',
    variantClasses[props.variant || 'list'],
    indicatorClasses[props.indicator || 'start'],
    props.variant === 'card' && sizeClasses.card[props.size || 'md'],
    props.variant === 'card' && props.disabled && 'cursor-not-allowed opacity-75',
    props.variant === 'card' && props.color === 'primary' && isChecked.value && 'has-[input:checked]:border-primary',
    props.variant === 'card' && props.color === 'neutral' && isChecked.value && 'has-[input:checked]:border-inverted',
    props.ui?.root,
    props.class
  )
})

const containerClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    xs: 'h-4',
    sm: 'h-4',
    md: 'h-5',
    lg: 'h-5',
    xl: 'h-6'
  }
  
  return cn(
    'flex items-center',
    sizeClasses[props.size || 'md'],
    props.ui?.container
  )
})

const baseClasses = computed(() => {
  return cn(
    checkboxVariants({
      color: props.color,
      variant: props.variant,
      size: props.size,
      disabled: props.disabled,
      checked: isChecked.value
    }),
    props.ui?.base
  )
})

const indicatorClasses = computed(() => {
  const colorClasses: Record<string, string> = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    info: 'bg-info',
    warning: 'bg-warning',
    error: 'bg-error',
    neutral: 'bg-inverted'
  }
  
  return cn(
    'flex items-center justify-center size-full text-inverted',
    colorClasses[props.color || 'primary'],
    props.ui?.indicator
  )
})

const iconClasses = computed(() => {
  return cn(
    'shrink-0 size-full',
    props.ui?.icon
  )
})

const wrapperClasses = computed(() => {
  const indicatorClasses: Record<string, string> = {
    start: 'ms-2',
    end: 'me-2',
    hidden: 'text-center'
  }
  
  const sizeClasses: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base'
  }
  
  return cn(
    'w-full',
    indicatorClasses[props.indicator || 'start'],
    sizeClasses[props.size || 'md'],
    props.ui?.wrapper
  )
})

const labelClasses = computed(() => {
  return cn(
    'block font-medium text-foreground',
    props.required && "after:content-['*'] after:ms-0.5 after:text-error",
    props.disabled && 'cursor-not-allowed opacity-75',
    props.ui?.label
  )
})

const descriptionClasses = computed(() => {
  return cn(
    'text-muted-foreground',
    props.disabled && 'cursor-not-allowed opacity-75',
    props.ui?.description
  )
})

// Event handlers
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  currentValue.value = target.checked
  emit('change', event)
}

const handleClick = () => {
  if (props.disabled) return
  
  // Cycle through states: unchecked -> checked -> unchecked
  // (indeterminate state is typically set programmatically)
  if (isIndeterminate.value) {
    currentValue.value = true
  } else {
    currentValue.value = !isChecked.value
  }
  
  // Trigger change event on the native checkbox
  if (checkboxRef.value) {
    checkboxRef.value.checked = currentValue.value === true
    checkboxRef.value.dispatchEvent(new Event('change', { bubbles: true }))
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return
  
  // Handle space key for activation
  if (event.key === ' ') {
    event.preventDefault()
    handleClick()
  }
}

// Sync indeterminate state with native checkbox
watchEffect(() => {
  if (checkboxRef.value) {
    checkboxRef.value.indeterminate = isIndeterminate.value
  }
})
</script>