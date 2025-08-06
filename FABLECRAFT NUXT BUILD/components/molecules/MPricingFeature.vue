<template>
  <div 
    :class="containerClasses"
    :aria-describedby="tooltip ? tooltipId : undefined"
    @keydown.enter="handleExpand"
    @keydown.space.prevent="handleExpand"
  >
    <!-- Feature content -->
    <div class="flex items-center gap-3">
      <!-- Checkmark icon -->
      <ACheckIcon
        :included="feature.included"
        :variant="checkIconVariant"
        :size="iconSize"
        :class="iconClasses"
        :aria-hidden="true"
      />
      
      <!-- Feature text -->
      <Text
        :variant="textVariant"
        :class="textClasses"
        :tag="textTag"
      >
        {{ feature.text }}
      </Text>
      
      <!-- Expand/info button for tooltip -->
      <Button
        v-if="tooltip && expandable"
        variant="ghost"
        size="sm"
        :class="expandButtonClasses"
        :aria-label="`More information about ${feature.text}`"
        :aria-expanded="isExpanded"
        @click="handleExpand"
      >
        <Icon
          name="lucide:info"
          class="w-4 h-4"
        />
      </Button>
    </div>
    
    <!-- Expandable tooltip content -->
    <div
      v-if="tooltip && isExpanded"
      :id="tooltipId"
      :class="tooltipClasses"
      role="region"
      :aria-label="`Additional information for ${feature.text}`"
    >
      <Text
        variant="sm"
        class="text-muted-foreground"
      >
        {{ tooltip }}
      </Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PricingFeature } from '~/composables/usePricingLogic'

interface PricingFeatureProps {
  /**
   * The pricing feature data
   */
  feature: PricingFeature
  
  /**
   * Visual variant of the feature display
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'highlight'
  
  /**
   * Size of the feature display
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether the feature can be expanded for more details
   * @default true
   */
  expandable?: boolean
  
  /**
   * Tooltip text to display when expanded
   */
  tooltip?: string
  
  /**
   * Additional CSS classes
   */
  class?: string
  
  /**
   * Whether to show highlight styling for important features
   * @default false
   */
  highlighted?: boolean
}

interface PricingFeatureEmits {
  /**
   * Emitted when feature is expanded/collapsed
   */
  expand: [featureId: string, expanded: boolean]
  
  /**
   * Emitted when feature is clicked
   */
  click: [feature: PricingFeature]
}

const props = withDefaults(defineProps<PricingFeatureProps>(), {
  variant: 'default',
  size: 'md',
  expandable: true,
  highlighted: false
})

const emit = defineEmits<PricingFeatureEmits>()

// Local expansion state
const isExpanded = ref(false)

// Unique ID for tooltip accessibility
const tooltipId = computed(() => `feature-tooltip-${props.feature.id}`)

// Handle expansion toggle
const handleExpand = () => {
  if (!props.tooltip || !props.expandable) return
  
  isExpanded.value = !isExpanded.value
  emit('expand', props.feature.id, isExpanded.value)
}

// Handle feature click
const handleClick = () => {
  emit('click', props.feature)
}

// Check icon variant based on feature state
const checkIconVariant = computed(() => {
  if (!props.feature.included) return 'muted'
  if (props.highlighted || props.feature.highlight) return 'primary'
  return 'default'
})

// Icon size based on component size
const iconSize = computed(() => {
  const sizeMap = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const
  }
  return sizeMap[props.size]
})

// Text variant based on inclusion and highlighting
const textVariant = computed(() => {
  if (!props.feature.included) return 'muted'
  if (props.highlighted || props.feature.highlight) return 'default'
  return 'default'
})

// Text tag for semantic HTML
const textTag = computed(() => 'span')

// Container classes
const containerClasses = computed(() => {
  const baseClasses = 'pricing-feature transition-all duration-200'
  
  const variantClasses = {
    default: 'py-2',
    compact: 'py-1',
    highlight: 'py-2 px-3 rounded-lg bg-primary/5 border border-primary/10'
  }
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  
  const interactiveClasses = props.tooltip && props.expandable 
    ? 'cursor-pointer hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md'
    : ''
  
  const highlightClasses = (props.highlighted || props.feature.highlight) 
    ? 'font-medium' 
    : ''
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    interactiveClasses,
    highlightClasses,
    props.class
  ].filter(Boolean).join(' ')
})

// Icon specific classes
const iconClasses = computed(() => {
  const baseClasses = 'transition-transform duration-200'
  
  return [
    baseClasses,
    !props.feature.included ? 'opacity-50' : ''
  ].filter(Boolean).join(' ')
})

// Text classes
const textClasses = computed(() => {
  const baseClasses = 'flex-1 transition-colors duration-200'
  
  const inclusionClasses = props.feature.included 
    ? 'text-foreground'
    : 'text-muted-foreground line-through opacity-75'
  
  const highlightClasses = (props.highlighted || props.feature.highlight)
    ? 'font-semibold'
    : ''
  
  return [
    baseClasses,
    inclusionClasses,
    highlightClasses
  ].filter(Boolean).join(' ')
})

// Expand button classes
const expandButtonClasses = computed(() => {
  return [
    'ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200',
    isExpanded.value ? 'opacity-100' : ''
  ].filter(Boolean).join(' ')
})

// Tooltip classes
const tooltipClasses = computed(() => {
  const baseClasses = 'mt-2 ml-8 p-3 rounded-lg border bg-card text-card-foreground shadow-sm'
  
  const animationClasses = 'animate-in slide-in-from-top-1 duration-200'
  
  return [
    baseClasses,
    animationClasses
  ].join(' ')
})

// Expose expansion state for parent components
defineExpose({
  isExpanded: computed(() => isExpanded.value),
  toggle: handleExpand,
  expand: () => { isExpanded.value = true },
  collapse: () => { isExpanded.value = false }
})
</script>

<style scoped>
/**
 * MPricingFeature Component Styles
 * 
 * Provides visual styling for individual pricing features
 * with support for expansion, highlighting, and accessibility.
 */

.pricing-feature {
  /* Ensure proper interactive states */
  position: relative;
}

/* Enhanced hover effects for interactive features */
.pricing-feature:hover .expand-button {
  @apply opacity-100;
}

/* Focus indicators for keyboard navigation */
.pricing-feature:focus-within {
  @apply ring-2 ring-ring ring-offset-2;
}

/* Smooth transitions for expansion */
.pricing-feature .tooltip-content {
  transition: all 0.2s ease-in-out;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .pricing-feature {
    border: 1px solid currentColor;
  }
  
  .pricing-feature .text-muted-foreground {
    opacity: 0.8;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .pricing-feature,
  .pricing-feature * {
    transition: none !important;
    animation: none !important;
  }
}

/* Print styles */
@media print {
  .pricing-feature .expand-button {
    display: none;
  }
  
  .pricing-feature .tooltip-content {
    display: block !important;
    opacity: 1 !important;
  }
}
</style>