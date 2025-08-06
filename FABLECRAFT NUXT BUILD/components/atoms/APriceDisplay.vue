<template>
  <div :class="containerClasses" :aria-label="accessibilityLabel">
    <!-- Main price display -->
    <span :class="priceClasses">
      {{ formattedPrice }}
    </span>
    
    <!-- Period display (e.g., "/month") -->
    <span 
      v-if="period" 
      :class="periodClasses"
    >
      {{ period }}
    </span>
    
    <!-- Optional badge (e.g., "Best Value") -->
    <Badge
      v-if="badge"
      :variant="badgeVariant"
      :class="badgeClasses"
    >
      {{ badge }}
    </Badge>
  </div>
</template>

<script setup lang="ts">
interface PriceDisplayProps {
  /**
   * The price value (can be string or number)
   */
  price: string | number
  
  /**
   * The billing period (e.g., "/month", "/year")
   */
  period?: string
  
  /**
   * Currency symbol or prefix
   * @default '$'
   */
  currency?: string
  
  /**
   * Visual size of the price display
   * @default 'lg'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * Display layout orientation
   * @default 'horizontal'
   */
  layout?: 'horizontal' | 'vertical' | 'inline'
  
  /**
   * Optional badge text (e.g., "Popular", "Best Value")
   */
  badge?: string
  
  /**
   * Badge visual variant
   * @default 'default'
   */
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive'
  
  /**
   * Whether to highlight this price (special styling)
   * @default false
   */
  highlighted?: boolean
  
  /**
   * Additional CSS classes
   */
  class?: string
  
  /**
   * Custom accessibility label
   */
  ariaLabel?: string
}

const props = withDefaults(defineProps<PriceDisplayProps>(), {
  currency: '$',
  size: 'lg',
  layout: 'horizontal',
  badgeVariant: 'default',
  highlighted: false
})

// Format the price value
const formattedPrice = computed(() => {
  const priceValue = typeof props.price === 'number' 
    ? props.price.toString() 
    : props.price
  
  // Handle special cases like "Free" or "Contact for Pricing"
  if (priceValue.toLowerCase() === 'free' || 
      priceValue.toLowerCase().includes('contact')) {
    return priceValue
  }
  
  // Add currency symbol if it's a numeric price
  const isNumeric = !isNaN(Number(priceValue.replace(/[^0-9.-]/g, '')))
  return isNumeric && !priceValue.includes(props.currency) 
    ? `${props.currency}${priceValue}`
    : priceValue
})

// Accessibility label for screen readers
const accessibilityLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  
  const priceText = formattedPrice.value
  const periodText = props.period ? ` ${props.period}` : ''
  const badgeText = props.badge ? `, ${props.badge}` : ''
  
  return `Price: ${priceText}${periodText}${badgeText}`
})

// Container classes based on layout
const containerClasses = computed(() => {
  const baseClasses = 'price-display'
  
  const layoutClasses = {
    horizontal: 'flex items-baseline gap-1',
    vertical: 'flex flex-col items-start gap-1',
    inline: 'inline-flex items-baseline gap-1'
  }
  
  const highlightClasses = props.highlighted 
    ? 'text-primary font-bold' 
    : 'text-foreground'
  
  return [
    baseClasses,
    layoutClasses[props.layout],
    highlightClasses,
    props.class
  ].filter(Boolean).join(' ')
})

// Price text classes based on size
const priceClasses = computed(() => {
  const baseClasses = 'font-bold transition-colors duration-200'
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  }
  
  const colorClasses = props.highlighted 
    ? 'text-primary' 
    : 'text-foreground'
  
  return [
    baseClasses,
    sizeClasses[props.size],
    colorClasses
  ].join(' ')
})

// Period text classes
const periodClasses = computed(() => {
  const baseClasses = 'font-medium text-muted-foreground transition-colors duration-200'
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  
  return [
    baseClasses,
    sizeClasses[props.size]
  ].join(' ')
})

// Badge positioning classes
const badgeClasses = computed(() => {
  const baseClasses = 'font-medium'
  
  const layoutClasses = {
    horizontal: 'ml-2',
    vertical: 'mt-1',
    inline: 'ml-1'
  }
  
  return [
    baseClasses,
    layoutClasses[props.layout]
  ].join(' ')
})
</script>

<style scoped>
/**
 * APriceDisplay Component Styles
 * 
 * Provides consistent formatting for pricing information
 * across different contexts and layouts.
 */

.price-display {
  /* Ensure proper baseline alignment */
  line-height: 1;
}

/* Enhanced visual hierarchy */
.price-display .font-bold {
  letter-spacing: -0.025em;
}

/* Smooth color transitions for theme changes */
.price-display * {
  transition: color 0.2s ease-in-out;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .price-display {
    filter: contrast(1.2);
  }
}

/* Print styles */
@media print {
  .price-display {
    color: black !important;
  }
  
  .price-display .text-muted-foreground {
    color: #666 !important;
  }
}

/* Focus styles for interactive price displays */
.price-display:focus-within {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  border-radius: 0.375rem;
}
</style>