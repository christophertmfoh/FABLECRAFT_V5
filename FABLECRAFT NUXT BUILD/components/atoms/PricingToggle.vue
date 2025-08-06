<template>
  <div :class="containerClasses">
    <div class="relative flex w-full p-1 bg-card border border-border rounded-full">
      <!-- Sliding indicator -->
      <span
        class="absolute inset-0 m-1 pointer-events-none"
        aria-hidden="true"
      >
        <span
          :class="indicatorClasses"
          class="absolute inset-0 w-1/2 bg-primary rounded-full shadow-sm transform transition-transform duration-200 ease-in-out"
        />
      </span>

      <!-- Annual button -->
      <button
        type="button"
        :class="annualButtonClasses"
        :aria-pressed="modelValue"
        @click="handleAnnualClick"
      >
        {{ annualLabel }}
        <span v-if="showDiscount" :class="discountClasses">
          {{ discountText }}
        </span>
      </button>

      <!-- Monthly button -->
      <button
        type="button"
        :class="monthlyButtonClasses"
        :aria-pressed="!modelValue"
        @click="handleMonthlyClick"
      >
        {{ monthlyLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Size configurations (moved outside to avoid recreation)
const TOGGLE_SIZE_CONFIG = {
  sm: {
    container: 'max-w-[12rem]',
    button: 'text-xs font-medium h-7',
    discount: 'text-xs'
  },
  base: {
    container: 'max-w-[14rem]',
    button: 'text-sm font-medium h-8',
    discount: 'text-xs'
  },
  lg: {
    container: 'max-w-[16rem]',
    button: 'text-base font-medium h-10',
    discount: 'text-sm'
  }
} as const

// Component props
interface PricingToggleProps {
  modelValue: boolean // true = annual, false = monthly
  annualLabel?: string
  monthlyLabel?: string
  showDiscount?: boolean
  discountText?: string
  size?: keyof typeof TOGGLE_SIZE_CONFIG
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<PricingToggleProps>(), {
  annualLabel: 'Yearly',
  monthlyLabel: 'Monthly',
  showDiscount: true,
  discountText: '-20%',
  size: 'base',
  class: ''
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Event handlers
const handleAnnualClick = () => {
  emit('update:modelValue', true)
}

const handleMonthlyClick = () => {
  emit('update:modelValue', false)
}

// Computed properties
const containerClasses = computed(() => [
  'flex justify-center m-auto',
  TOGGLE_SIZE_CONFIG[props.size].container,
  props.class
])

const indicatorClasses = computed(() => [
  props.modelValue ? 'translate-x-0' : 'translate-x-full'
])

const baseButtonClasses = [
  'relative flex-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200 ease-in-out',
  TOGGLE_SIZE_CONFIG[props.size].button,
]

const annualButtonClasses = computed(() => [
  ...baseButtonClasses,
  props.modelValue
    ? 'text-primary-foreground'
    : 'text-muted-foreground hover:text-foreground'
])

const monthlyButtonClasses = computed(() => [
  ...baseButtonClasses,
  !props.modelValue
    ? 'text-primary-foreground'
    : 'text-muted-foreground hover:text-foreground'
])

const discountClasses = computed(() => [
  'ml-1 font-medium transition-colors duration-200',
  TOGGLE_SIZE_CONFIG[props.size].discount,
  props.modelValue
    ? 'text-primary-foreground/80'
    : 'text-muted-foreground/60'
])
</script>