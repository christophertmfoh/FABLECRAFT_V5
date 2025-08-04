<template>
  <div :class="containerClasses">
    <div v-if="originalPrice && showOriginal" :class="originalPriceClasses">
      <span v-if="currencyPosition === 'before'">{{ currencySymbol }}</span>
      {{ formattedOriginalPrice }}
      <span v-if="currencyPosition === 'after'">{{ currencySymbol }}</span>
    </div>
    
    <div :class="priceClasses">
      <span v-if="currencyPosition === 'before'" :class="currencyClasses">
        {{ currencySymbol }}
      </span>
      <span :class="amountClasses">{{ formattedPrice }}</span>
      <span v-if="currencyPosition === 'after'" :class="currencyClasses">
        {{ currencySymbol }}
      </span>
      <span v-if="period" :class="periodClasses">{{ periodText }}</span>
    </div>
    
    <div v-if="discount && showDiscount" :class="discountClasses">
      {{ discountText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from './Utils'

// Component props
interface PriceDisplayProps {
  price: number | string
  originalPrice?: number | string
  currency?: string
  locale?: string
  period?: 'month' | 'year' | 'week' | 'day' | 'once' | string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCents?: boolean
  showOriginal?: boolean
  showDiscount?: boolean
  currencyPosition?: 'before' | 'after'
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<PriceDisplayProps>(), {
  currency: 'USD',
  locale: 'en-US',
  size: 'md',
  showCents: true,
  showOriginal: true,
  showDiscount: true,
  currencyPosition: 'before'
})

// Parse price values
const numericPrice = computed(() => {
  return typeof props.price === 'string' 
    ? parseFloat(props.price.replace(/[^0-9.-]/g, ''))
    : props.price
})

const numericOriginalPrice = computed(() => {
  if (!props.originalPrice) return null
  return typeof props.originalPrice === 'string' 
    ? parseFloat(props.originalPrice.replace(/[^0-9.-]/g, ''))
    : props.originalPrice
})

// Calculate discount
const discount = computed(() => {
  if (!numericOriginalPrice.value) return 0
  const discountAmount = numericOriginalPrice.value - numericPrice.value
  return Math.round((discountAmount / numericOriginalPrice.value) * 100)
})

// Format prices
const formatPrice = (value: number) => {
  const formatter = new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: props.showCents ? 2 : 0,
    maximumFractionDigits: props.showCents ? 2 : 0
  })
  
  // Format and extract number part only
  const formatted = formatter.format(value)
  // Remove currency symbol and trim
  return formatted.replace(/[^\d.,\s-]/g, '').trim()
}

const formattedPrice = computed(() => formatPrice(numericPrice.value))
const formattedOriginalPrice = computed(() => 
  numericOriginalPrice.value ? formatPrice(numericOriginalPrice.value) : ''
)

// Get currency symbol
const currencySymbol = computed(() => {
  const formatter = new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.currency
  })
  const parts = formatter.formatToParts(0)
  return parts.find(part => part.type === 'currency')?.value || props.currency
})

// Period text
const periodText = computed(() => {
  const periodMap: Record<string, string> = {
    month: '/mo',
    year: '/yr',
    week: '/wk',
    day: '/day',
    once: ''
  }
  return periodMap[props.period || ''] || `/${props.period}`
})

// Discount text
const discountText = computed(() => `${discount.value}% OFF`)

// Size configurations
const sizeConfig = {
  sm: {
    container: 'space-y-1',
    price: 'text-lg',
    currency: 'text-sm',
    period: 'text-xs',
    original: 'text-sm',
    discount: 'text-xs px-1.5 py-0.5'
  },
  md: {
    container: 'space-y-1',
    price: 'text-2xl',
    currency: 'text-lg',
    period: 'text-sm',
    original: 'text-base',
    discount: 'text-xs px-2 py-1'
  },
  lg: {
    container: 'space-y-2',
    price: 'text-4xl',
    currency: 'text-2xl',
    period: 'text-base',
    original: 'text-lg',
    discount: 'text-sm px-2.5 py-1'
  },
  xl: {
    container: 'space-y-2',
    price: 'text-5xl',
    currency: 'text-3xl',
    period: 'text-lg',
    original: 'text-xl',
    discount: 'text-base px-3 py-1.5'
  }
}

// Computed classes
const containerClasses = computed(() => {
  return cn(
    'inline-flex flex-col',
    sizeConfig[props.size].container,
    props.class
  )
})

const priceClasses = computed(() => {
  return cn(
    'flex items-baseline font-bold',
    sizeConfig[props.size].price
  )
})

const currencyClasses = computed(() => {
  return cn(
    'font-medium',
    sizeConfig[props.size].currency
  )
})

const amountClasses = computed(() => {
  return 'tabular-nums'
})

const periodClasses = computed(() => {
  return cn(
    'text-muted-foreground font-normal ml-1',
    sizeConfig[props.size].period
  )
})

const originalPriceClasses = computed(() => {
  return cn(
    'text-muted-foreground line-through',
    sizeConfig[props.size].original
  )
})

const discountClasses = computed(() => {
  return cn(
    'inline-flex items-center rounded-full bg-green-100 text-green-800 font-medium',
    sizeConfig[props.size].discount
  )
})
</script>