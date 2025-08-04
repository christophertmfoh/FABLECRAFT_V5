<template>
  <div :class="cardClasses">
    <Icon
      v-if="icon"
      :name="icon"
      :class="iconClasses"
    />
    <div class="flex-1">
      <div :class="numberClasses">
        <span v-if="prefix" class="text-muted-foreground">{{ prefix }}</span>
        <AnimatedNumber
          v-if="animateNumber"
          :value="displayNumber"
          :duration="animationDuration"
          :format="formatNumber"
        />
        <span v-else>{{ formattedNumber }}</span>
        <span v-if="suffix" class="text-muted-foreground">{{ suffix }}</span>
      </div>
      <p :class="labelClasses">{{ label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { cn } from './Utils'

// Component props
interface TrustIndicatorCardProps {
  icon?: string
  number: number | string
  label: string
  prefix?: string
  suffix?: string
  variant?: 'default' | 'bordered' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  animateNumber?: boolean
  animationDuration?: number
  formatNumber?: boolean
  locale?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<TrustIndicatorCardProps>(), {
  variant: 'default',
  size: 'md',
  animateNumber: false,
  animationDuration: 2000,
  formatNumber: true,
  locale: 'en-US'
})

// Parse number value
const displayNumber = computed(() => {
  if (typeof props.number === 'string') {
    return parseFloat(props.number.replace(/[^0-9.-]/g, ''))
  }
  return props.number
})

// Format number for display
const formattedNumber = computed(() => {
  if (!props.formatNumber) {
    return props.number.toString()
  }
  
  if (displayNumber.value >= 1000000) {
    return (displayNumber.value / 1000000).toFixed(1) + 'M'
  }
  if (displayNumber.value >= 1000) {
    return (displayNumber.value / 1000).toFixed(1) + 'K'
  }
  
  return new Intl.NumberFormat(props.locale).format(displayNumber.value)
})

// Size mappings
const sizeConfig = {
  sm: {
    card: 'p-3 gap-3',
    icon: 'h-8 w-8',
    number: 'text-lg',
    label: 'text-xs'
  },
  md: {
    card: 'p-4 gap-4',
    icon: 'h-10 w-10',
    number: 'text-2xl',
    label: 'text-sm'
  },
  lg: {
    card: 'p-6 gap-5',
    icon: 'h-12 w-12',
    number: 'text-3xl',
    label: 'text-base'
  }
}

// Variant mappings
const variantClasses = {
  default: 'bg-card',
  bordered: 'border-2',
  ghost: 'hover:bg-accent'
}

// Computed classes
const cardClasses = computed(() => {
  return cn(
    'flex items-center rounded-lg transition-all',
    sizeConfig[props.size].card,
    variantClasses[props.variant],
    props.class
  )
})

const iconClasses = computed(() => {
  return cn(
    'shrink-0 text-primary',
    sizeConfig[props.size].icon
  )
})

const numberClasses = computed(() => {
  return cn(
    'font-bold leading-none flex items-baseline gap-1',
    sizeConfig[props.size].number
  )
})

const labelClasses = computed(() => {
  return cn(
    'text-muted-foreground mt-1',
    sizeConfig[props.size].label
  )
})

// Animated number component (simplified inline version)
const AnimatedNumber = {
  props: ['value', 'duration', 'format'],
  setup(props: any) {
    const displayValue = ref(0)
    
    onMounted(() => {
      const startTime = Date.now()
      const endValue = props.value
      
      const updateValue = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / props.duration, 1)
        
        // Easing function
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
        
        displayValue.value = Math.floor(endValue * easeOutCubic(progress))
        
        if (progress < 1) {
          requestAnimationFrame(updateValue)
        } else {
          displayValue.value = endValue
        }
      }
      
      requestAnimationFrame(updateValue)
    })
    
    const formattedValue = computed(() => {
      if (!props.format) return displayValue.value.toString()
      
      if (displayValue.value >= 1000000) {
        return (displayValue.value / 1000000).toFixed(1) + 'M'
      }
      if (displayValue.value >= 1000) {
        return (displayValue.value / 1000).toFixed(1) + 'K'
      }
      
      return new Intl.NumberFormat('en-US').format(displayValue.value)
    })
    
    return () => formattedValue.value
  }
}
</script>