<template>
  <fieldset
    :class="fieldsetClasses"
    :disabled="disabled"
    role="radiogroup"
    :aria-labelledby="legendId"
    :aria-describedby="descriptionId"
    :aria-required="required"
  >
    <!-- Legend (label) -->
    <legend
      v-if="legend || $slots.legend"
      :id="legendId"
      :class="legendClasses"
    >
      <slot name="legend" :legend="legend">
        {{ legend }}
      </slot>
    </legend>

    <!-- Description -->
    <p
      v-if="description || $slots.description"
      :id="descriptionId"
      :class="descriptionClasses"
    >
      <slot name="description" :description="description">
        {{ description }}
      </slot>
    </p>

    <!-- Radio options -->
    <div :class="optionsClasses">
      <div
        v-for="(option, index) in normalizedOptions"
        :key="option.value"
        :class="optionClasses"
      >
        <div :class="containerClasses">
          <!-- Hidden native radio for form submission -->
          <input
            :id="`${componentId}-${index}`"
            ref="radioRefs"
            type="radio"
            class="sr-only peer"
            :name="name || componentId"
            :value="option.value"
            :required="required && index === 0"
            :disabled="disabled || option.disabled"
            :checked="isChecked(option.value)"
            @change="handleChange(option.value)"
          />
          
          <!-- Custom radio visual -->
          <div
            :class="radioClasses(option)"
            role="radio"
            :aria-checked="isChecked(option.value)"
            :aria-labelledby="`${componentId}-${index}-label`"
            :aria-describedby="option.description ? `${componentId}-${index}-description` : undefined"
            :aria-disabled="disabled || option.disabled"
            :tabindex="getTabIndex(option.value, index)"
            @click="handleClick(option)"
            @keydown="handleKeydown($event, option, index)"
          >
            <div v-if="isChecked(option.value)" :class="indicatorClasses">
              <div :class="dotClasses" />
            </div>
          </div>
        </div>

        <!-- Option label and description -->
        <div v-if="option.label || option.description" :class="wrapperClasses">
          <label
            v-if="option.label"
            :id="`${componentId}-${index}-label`"
            :for="`${componentId}-${index}`"
            :class="labelClasses(option)"
          >
            {{ option.label }}
          </label>
          
          <p
            v-if="option.description"
            :id="`${componentId}-${index}-description`"
            :class="optionDescriptionClasses"
          >
            {{ option.description }}
          </p>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './Utils'
import { useComponentId } from '~/composables/useComponentId'

// Radio variants using CVA
const radioVariants = cva(
  'rounded-full ring ring-inset ring-border overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2',
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

// Option type
interface RadioOption {
  value: string | number | boolean
  label?: string
  description?: string
  disabled?: boolean
}

// Component props
interface RadioGroupProps {
  // Variant props
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'list' | 'card'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  checked?: boolean
  
  // Component specific props
  name?: string
  legend?: string
  description?: string
  modelValue?: string | number | boolean
  defaultValue?: string | number | boolean
  options: (RadioOption | string | number)[]
  required?: boolean
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  indicator?: 'start' | 'end'
  class?: string | Record<string, boolean> | string[]
  ui?: {
    fieldset?: string | Record<string, boolean> | string[]
    legend?: string | Record<string, boolean> | string[]
    description?: string | Record<string, boolean> | string[]
    options?: string | Record<string, boolean> | string[]
    option?: string | Record<string, boolean> | string[]
    container?: string | Record<string, boolean> | string[]
    radio?: string | Record<string, boolean> | string[]
    indicator?: string | Record<string, boolean> | string[]
    dot?: string | Record<string, boolean> | string[]
    wrapper?: string | Record<string, boolean> | string[]
    label?: string | Record<string, boolean> | string[]
    optionDescription?: string | Record<string, boolean> | string[]
  }
}

// Define props with defaults
const props = withDefaults(defineProps<RadioGroupProps>(), {
  orientation: 'vertical',
  indicator: 'start'
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

// Generate component IDs
const componentId = useComponentId()
const legendId = computed(() => `${componentId.value}-legend`)
const descriptionId = computed(() => `${componentId.value}-description`)

// Template refs
const radioRefs = ref<HTMLInputElement[]>([])

// Normalize options to consistent format
const normalizedOptions = computed<RadioOption[]>(() => {
  return props.options.map(option => {
    if (typeof option === 'object' && 'value' in option) {
      return option
    }
    return {
      value: option,
      label: String(option)
    }
  })
})

// State management
const internalValue = ref<string | number | boolean | undefined>(props.defaultValue)

const currentValue = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : internalValue.value,
  set: (value: string | number | boolean | undefined) => {
    if (props.modelValue !== undefined && value !== undefined) {
      emit('update:modelValue', value)
    } else {
      internalValue.value = value
    }
  }
})

// Helper functions
const isChecked = (value: string | number | boolean) => {
  return currentValue.value === value
}

const getTabIndex = (value: string | number | boolean, index: number) => {
  // If a radio is checked, it gets tabindex 0
  if (isChecked(value)) return 0
  // If no radio is checked and this is the first one, it gets tabindex 0
  if (currentValue.value === undefined && index === 0) return 0
  // All other radios get tabindex -1
  return -1
}

// Compute classes
const fieldsetClasses = computed(() => {
  const variantClasses: Record<string, string> = {
    list: '',
    card: 'border border-muted rounded-lg'
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
    'relative',
    variantClasses[props.variant || 'list'],
    props.variant === 'card' && sizeClasses.card[props.size || 'md'],
    props.disabled && 'opacity-75',
    props.ui?.fieldset,
    props.class
  )
})

const legendClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base'
  }
  
  return cn(
    'font-medium text-foreground',
    sizeClasses[props.size || 'md'],
    props.required && "after:content-['*'] after:ms-0.5 after:text-error",
    props.variant === 'list' && 'mb-2',
    props.ui?.legend
  )
})

const descriptionClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base'
  }
  
  return cn(
    'text-muted-foreground',
    sizeClasses[props.size || 'md'],
    'mb-3',
    props.ui?.description
  )
})

const optionsClasses = computed(() => {
  const orientationClasses: Record<string, string> = {
    horizontal: 'flex flex-wrap gap-4',
    vertical: 'space-y-2'
  }
  
  return cn(
    orientationClasses[props.orientation || 'vertical'],
    props.ui?.options
  )
})

const optionClasses = computed(() => {
  const indicatorClasses: Record<string, string> = {
    start: 'flex-row',
    end: 'flex-row-reverse'
  }
  
  return cn(
    'relative flex items-start',
    indicatorClasses[props.indicator || 'start'],
    props.ui?.option
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

const radioClasses = (option: RadioOption) => {
  return cn(
    radioVariants({
      color: props.color,
      variant: props.variant,
      size: props.size,
      disabled: props.disabled || option.disabled,
      checked: isChecked(option.value)
    }),
    props.ui?.radio
  )
}

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
    'flex items-center justify-center size-full',
    colorClasses[props.color || 'primary'],
    props.ui?.indicator
  )
})

const dotClasses = computed(() => {
  const sizeClasses: Record<string, string> = {
    xs: 'size-1.5',
    sm: 'size-1.5',
    md: 'size-2',
    lg: 'size-2',
    xl: 'size-2.5'
  }
  
  return cn(
    'rounded-full bg-inverted',
    sizeClasses[props.size || 'md'],
    props.ui?.dot
  )
})

const wrapperClasses = computed(() => {
  const indicatorClasses: Record<string, string> = {
    start: 'ms-2',
    end: 'me-2'
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

const labelClasses = (option: RadioOption) => {
  return cn(
    'block font-medium text-foreground',
    (props.disabled || option.disabled) && 'cursor-not-allowed opacity-75',
    props.ui?.label
  )
}

const optionDescriptionClasses = computed(() => {
  return cn(
    'text-muted-foreground',
    props.disabled && 'opacity-75',
    props.ui?.optionDescription
  )
})

// Event handlers
const handleChange = (value: string | number | boolean) => {
  currentValue.value = value
  emit('change', value)
}

const handleClick = (option: RadioOption) => {
  if (props.disabled || option.disabled) return
  
  currentValue.value = option.value
  emit('change', option.value)
  
  // Find and focus the corresponding radio input
  const index = normalizedOptions.value.findIndex(o => o.value === option.value)
  if (index !== -1 && radioRefs.value[index]) {
    radioRefs.value[index].focus()
  }
}

const handleKeydown = (event: KeyboardEvent, option: RadioOption, index: number) => {
  if (props.disabled || option.disabled) return
  
  const enabledOptions = normalizedOptions.value.filter(o => !o.disabled)
  const enabledIndex = enabledOptions.findIndex(o => o.value === option.value)
  
  switch (event.key) {
    case ' ':
    case 'Enter':
      event.preventDefault()
      handleClick(option)
      break
      
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault()
      const nextIndex = (enabledIndex + 1) % enabledOptions.length
      const nextOption = enabledOptions[nextIndex]
      handleClick(nextOption)
      break
      
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault()
      const prevIndex = (enabledIndex - 1 + enabledOptions.length) % enabledOptions.length
      const prevOption = enabledOptions[prevIndex]
      handleClick(prevOption)
      break
  }
}
</script>