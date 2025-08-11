<!-- OSimpleHero.vue - A simplified hero section without action buttons -->
<template>
  <div :id="id" :class="heroClasses">
    <Container :size="containerSize">
      <div :class="contentClasses">
        <!-- Badge (optional) -->
        <MHeroBadge
          v-if="badgeText"
          :text="badgeText"
          :variant="badgeVariant"
          :size="badgeSize"
          :dot-color="badgeDotColor"
          :dot-speed="badgeDotSpeed"
          :dot-intensity="badgeDotIntensity"
          :clickable="false"
          :class="badgeClasses"
        />

        <!-- Heading -->
        <MHeroHeading
          :title="title"
          :highlight-text="highlightText"
          :subheading="description"
          :alignment="alignment"
          :size="headingSize"
          :spacing="headingSpacing"
          :break-highlight="breakHighlight"
        />
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'
import type { ComponentVariant, ComponentSize, ComponentAlignment } from '~/types'

// Props interface
interface SimpleHeroProps {
  /** Unique identifier for the hero section */
  id?: string
  /** Badge text displayed above the heading */
  badgeText?: string
  /** Badge variant */
  badgeVariant?: 'default' | 'accent' | 'secondary' | 'outline'
  /** Badge size */
  badgeSize?: 'sm' | 'base' | 'md' | 'lg'
  /** Badge dot color */
  badgeDotColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
  /** Badge dot animation speed */
  badgeDotSpeed?: 'slow' | 'normal' | 'fast'
  /** Badge dot intensity */
  badgeDotIntensity?: 'subtle' | 'normal' | 'strong'
  /** Main title text */
  title?: string
  /** Highlighted text (appears with gradient) */
  highlightText?: string
  /** Description text (appears below title) */
  description?: string
  /** Whether to break the highlight text to a new line */
  breakHighlight?: boolean
  /** Hero section variant */
  variant?: ComponentVariant
  /** Container size */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Content alignment */
  alignment?: ComponentAlignment
  /** Heading size */
  headingSize?: 'sm' | 'md' | 'lg' | 'xl'
  /** Spacing between elements */
  headingSpacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  /** Additional classes */
  class?: string | Record<string, boolean> | string[]
}

// Props with defaults
const props = withDefaults(defineProps<SimpleHeroProps>(), {
  id: 'simple-hero',
  badgeVariant: 'default',
  badgeSize: 'base',
  badgeDotColor: 'primary',
  badgeDotSpeed: 'normal',
  badgeDotIntensity: 'normal',
  variant: 'default',
  containerSize: 'lg',
  alignment: 'center',
  headingSize: 'lg',
  headingSpacing: 'md',
  breakHighlight: false,
})

// Computed classes
const heroClasses = computed(() => {
  return cn(
    'simple-hero relative w-full',
    props.class
  )
})

const contentClasses = computed(() => {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return cn(
    'flex flex-col',
    alignmentClasses[props.alignment],
    'max-w-4xl',
    props.alignment === 'center' && 'mx-auto',
    props.alignment === 'right' && 'ml-auto'
  )
})

const badgeClasses = computed(() => {
  return cn(
    'hero-badge mb-4',
    props.alignment === 'center' && 'mx-auto'
  )
})
</script>

<style scoped>
.simple-hero {
  --hero-spacing: 1rem;
}

@media (min-width: 640px) {
  .simple-hero {
    --hero-spacing: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .simple-hero {
    --hero-spacing: 2rem;
  }
}
</style>