<template>
  <div :class="headingContainerClasses" role="heading" :aria-level="headingLevel">
    <component :is="headingTag" :id="headingId" :class="headingClasses" v-bind="$attrs">
      <!-- Regular text part -->
      <span v-if="title" class="text-foreground">
        {{ title }}
      </span>

      <!-- Highlighted gradient text part -->
      <AGradientText
        v-if="highlightText"
        :tag="'span'"
        :variant="gradientVariant"
        :direction="gradientDirection"
        :intensity="gradientIntensity"
        :animation="gradientAnimation"
        :class="highlightClasses"
      >
        {{ highlightText }}
      </AGradientText>

      <!-- Slot for custom content -->
      <slot />
    </component>

    <!-- Optional subheading -->
    <p v-if="subheading" :class="subheadingClasses" :aria-describedby="headingId">
      {{ subheading }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface HeroHeadingProps {
  title?: string
  highlightText?: string
  subheading?: string
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  headingId?: string
  variant?: 'default' | 'compact' | 'dramatic'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  alignment?: 'left' | 'center' | 'right'
  gradientVariant?: 'primary' | 'secondary' | 'accent' | 'rainbow' | 'custom'
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl'
  gradientIntensity?: 'subtle' | 'normal' | 'vibrant'
  gradientAnimation?: 'none' | 'shimmer' | 'pulse' | 'flow'
  spacing?: 'tight' | 'normal' | 'relaxed'
  className?: string
}

// Component setup
const props = withDefaults(defineProps<HeroHeadingProps>(), {
  title: '',
  highlightText: '',
  subheading: '',
  headingTag: 'h1',
  headingLevel: 1,
  headingId: 'hero-heading',
  variant: 'default',
  size: 'xl',
  alignment: 'center',
  gradientVariant: 'primary',
  gradientDirection: 'to-r',
  gradientIntensity: 'normal',
  gradientAnimation: 'none',
  spacing: 'normal',
  className: '',
})

// Computed properties
const headingContainerClasses = computed(() => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const spacingClasses = {
    tight: 'space-y-1', // 4px - minimal spacing
    normal: 'space-y-2', // 8px - standard spacing
    relaxed: 'space-y-3', // 12px - modest spacing (reduced from space-y-8)
  }

  return cn(
    'heading-group flex flex-col pb-2', // Reduced from pb-6 to pb-2 since webkit clipping is fixed
    alignmentClasses[props.alignment],
    spacingClasses[props.spacing],
    props.className
  )
})

const headingClasses = computed(() => {
  const variantClasses = {
    default: 'font-black leading-[1.2] tracking-tight drop-shadow-sm', // Removed mb-4 since webkit fix handles clipping
    compact: 'font-bold leading-tight tracking-normal',
    dramatic: 'font-black leading-[1.1] tracking-tighter drop-shadow-lg', // Removed mb-6 since webkit fix handles clipping
  }

  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl lg:text-4xl',
    md: 'text-3xl sm:text-4xl lg:text-5xl',
    lg: 'text-4xl sm:text-5xl lg:text-6xl',
    xl: 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl',
    '2xl': 'text-golden-4xl sm:text-golden-5xl lg:text-6xl xl:text-7xl', // Matches React original exactly
  }

  return cn('transition-all duration-300', variantClasses[props.variant], sizeClasses[props.size])
})

const highlightClasses = computed(() => {
  return cn('inline-block', 'transition-all duration-300')
})

const subheadingClasses = computed(() => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center max-w-4xl mx-auto',
    right: 'text-right',
  }

  const sizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl lg:text-3xl',
    '2xl': 'text-2xl sm:text-3xl lg:text-4xl',
  }

  return cn(
    'text-muted-foreground leading-normal font-medium', // Changed from leading-relaxed to leading-normal
    'transition-all duration-300',
    alignmentClasses[props.alignment],
    sizeClasses[props.size]
  )
})
</script>

<style scoped>
/* Enhanced typography for hero headings */
.heading-group {
  /* Optimized spacing using our mathematical system */
  gap: var(--space-unit);
}

/* Responsive typography improvements */
@media (max-width: 768px) {
  .heading-group {
    gap: calc(var(--space-unit) * 0.75);
  }
}

/* Enhanced drop shadow for dramatic variant */
.drop-shadow-lg {
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}

/* Improved text rendering */
.font-black,
.font-bold {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Responsive text scaling enhancements */
@media (min-width: 1280px) {
  .text-9xl {
    font-size: 8rem;
    line-height: 1.1; /* Increased from 1 to prevent clipping of descenders */
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    transition: none;
  }

  .drop-shadow-sm,
  .drop-shadow-lg {
    filter: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .drop-shadow-sm,
  .drop-shadow-lg {
    filter: none;
  }

  .text-muted-foreground {
    color: hsl(var(--foreground));
    opacity: 0.8;
  }
}

/* Print optimization */
@media print {
  .drop-shadow-sm,
  .drop-shadow-lg {
    filter: none;
  }

  .text-muted-foreground {
    color: #666;
  }
}
</style>
