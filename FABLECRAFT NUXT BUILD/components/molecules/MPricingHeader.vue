<template>
  <div :class="containerClasses">
    <!-- Badge with Pulsing Dot -->
    <div class="flex items-center justify-center gap-2 mb-6">
      <APulsingDot 
        v-if="showPulsingDot"
        :class="pulsingDotClasses"
        :variant="pulsingDotVariant"
        :size="pulsingDotSize"
        :aria-hidden="true"
      />
      
      <Badge 
        :variant="badgeVariant"
        :class="badgeClasses"
      >
        {{ badgeText }}
      </Badge>
    </div>

    <!-- Main Title -->
    <Heading
      :level="titleLevel"
      :variant="titleVariant"
      :class="titleClasses"
      :tag="titleTag"
    >
      {{ title }}
    </Heading>

    <!-- Description -->
    <Text
      v-if="description"
      :variant="descriptionVariant"
      :class="descriptionClasses"
      :tag="descriptionTag"
    >
      {{ description }}
    </Text>

    <!-- Optional subtitle or additional content -->
    <div v-if="$slots.subtitle" :class="subtitleClasses">
      <slot name="subtitle" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface PricingHeaderProps {
  /**
   * Main title text
   * @default 'Start Free, Scale with Your Stories'
   */
  title?: string
  
  /**
   * Description text
   * @default 'Whether you're writing your first novel or managing an entire creative universe, we have a plan that grows with your ambition.'
   */
  description?: string
  
  /**
   * Badge text
   * @default 'Simple, Transparent Pricing'
   */
  badgeText?: string
  
  /**
   * Badge visual variant
   * @default 'secondary'
   */
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive'
  
  /**
   * Title heading level for semantic HTML
   * @default 2
   */
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6
  
  /**
   * Title variant for styling
   * @default 'h1'
   */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  
  /**
   * Whether to show the pulsing dot animation
   * @default true
   */
  showPulsingDot?: boolean
  
  /**
   * Pulsing dot variant
   * @default 'primary'
   */
  pulsingDotVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'
  
  /**
   * Pulsing dot size
   * @default 'md'
   */
  pulsingDotSize?: 'sm' | 'md' | 'lg'
  
  /**
   * Text alignment
   * @default 'center'
   */
  alignment?: 'left' | 'center' | 'right'
  
  /**
   * Spacing variant
   * @default 'normal'
   */
  spacing?: 'compact' | 'normal' | 'relaxed'
  
  /**
   * Additional CSS classes
   */
  class?: string
}

const props = withDefaults(defineProps<PricingHeaderProps>(), {
  title: 'Start Free, Scale with Your Stories',
  description: 'Whether you're writing your first novel or managing an entire creative universe, we have a plan that grows with your ambition.',
  badgeText: 'Simple, Transparent Pricing',
  badgeVariant: 'secondary',
  titleLevel: 2,
  titleVariant: 'h1',
  showPulsingDot: true,
  pulsingDotVariant: 'primary',
  pulsingDotSize: 'md',
  alignment: 'center',
  spacing: 'normal'
})

// Title semantic tag
const titleTag = computed(() => `h${props.titleLevel}`)

// Description tag
const descriptionTag = computed(() => 'p')

// Description variant based on title size
const descriptionVariant = computed(() => 'lg')

// Container classes
const containerClasses = computed(() => {
  const baseClasses = 'pricing-header'
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }
  
  const spacingClasses = {
    compact: 'space-y-4',
    normal: 'space-y-6',
    relaxed: 'space-y-8'
  }
  
  return [
    baseClasses,
    alignmentClasses[props.alignment],
    spacingClasses[props.spacing],
    props.class
  ].filter(Boolean).join(' ')
})

// Pulsing dot classes
const pulsingDotClasses = computed(() => {
  return 'animate-pulse'
})

// Badge classes matching React version
const badgeClasses = computed(() => {
  return [
    'bg-card/95 text-foreground border-border font-bold backdrop-blur-md shadow-md',
    'text-base px-4 py-2 transition-all duration-300',
    'hover:bg-card hover:shadow-lg hover:scale-105'
  ].join(' ')
})

// Title classes with design tokens and responsive sizing
const titleClasses = computed(() => {
  const baseClasses = [
    'font-black text-heading-primary transition-colors duration-300',
    'drop-shadow-[0_3px_6px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]',
    'leading-[1.2] tracking-tight'
  ]
  
  // Responsive sizing matching React version
  const responsiveClasses = 'text-4xl md:text-5xl'
  
  // Mathematical spacing from design tokens
  const spacingClasses = 'mt-best-friends' // Design token from React version
  
  return [
    ...baseClasses,
    responsiveClasses,
    spacingClasses
  ].join(' ')
})

// Description classes matching React design
const descriptionClasses = computed(() => {
  const baseClasses = [
    'text-xl text-foreground font-medium transition-colors duration-300',
    'drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]',
    'leading-[1.75] tracking-normal'
  ]
  
  // Max width and responsive behavior
  const layoutClasses = 'max-w-3xl mx-auto'
  
  // Mathematical spacing
  const spacingClasses = 'mt-friends' // Design token from React version
  
  return [
    ...baseClasses,
    layoutClasses,
    spacingClasses
  ].join(' ')
})

// Subtitle slot classes
const subtitleClasses = computed(() => {
  return 'mt-acquaintances' // Design token for larger spacing
})
</script>

<style scoped>
/**
 * MPricingHeader Component Styles
 * 
 * Provides consistent header styling for pricing sections
 * with design token integration and responsive behavior.
 */

.pricing-header {
  /* Ensure proper stacking context for drop shadows */
  position: relative;
  z-index: 10;
}

/* Enhanced drop shadow effects */
.pricing-header .drop-shadow-\[0_3px_6px_rgba\(0\,0\,0\,0\.3\)\] {
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

.dark .pricing-header .dark\:drop-shadow-\[0_3px_6px_rgba\(0\,0\,0\,0\.5\)\] {
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}

/* Badge hover effects matching React version */
.pricing-header .badge {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pricing-header .badge:hover {
  transform: scale(1.05);
}

/* Responsive text scaling with fluid typography */
@media (min-width: 768px) {
  .pricing-header {
    /* Enhanced spacing for larger screens */
  }
}

/* High contrast mode adjustments */
@media (prefers-contrast: high) {
  .pricing-header .text-heading-primary {
    filter: contrast(1.2);
  }
  
  .pricing-header .text-foreground {
    opacity: 0.95;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .pricing-header *,
  .pricing-header .animate-pulse {
    animation: none !important;
    transition: none !important;
  }
}

/* Print styles */
@media print {
  .pricing-header .drop-shadow-\[0_3px_6px_rgba\(0\,0\,0\,0\.3\)\],
  .pricing-header .dark\:drop-shadow-\[0_3px_6px_rgba\(0\,0\,0\,0\.5\)\] {
    text-shadow: none;
  }
  
  .pricing-header .backdrop-blur-md {
    backdrop-filter: none;
    background: white !important;
    border: 1px solid #000 !important;
  }
}

/* Focus management for accessibility */
.pricing-header:focus-within {
  outline: none;
}

/* Animation for entrance effects */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pricing-header.animate-entrance {
  animation: fadeInUp 0.6s ease-out;
}

/* Stagger animation for child elements */
.pricing-header.animate-entrance > * {
  animation: fadeInUp 0.6s ease-out;
}

.pricing-header.animate-entrance > *:nth-child(1) {
  animation-delay: 0.1s;
}

.pricing-header.animate-entrance > *:nth-child(2) {
  animation-delay: 0.2s;
}

.pricing-header.animate-entrance > *:nth-child(3) {
  animation-delay: 0.3s;
}
</style>