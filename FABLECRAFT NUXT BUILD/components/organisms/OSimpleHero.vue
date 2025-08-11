<!-- OSimpleHero.vue - A simplified hero section without action buttons -->
<template>
  <div :id="id" :class="heroClasses">
    <Container :size="containerSize">
      <div :class="contentClasses">
        <!-- Badge (optional) -->
        <MHeroBadge
          v-if="badgeText"
          :text="badgeText"
          :icon="badgeIcon"
          :variant="badgeVariant"
          :size="badgeSize"
          :alignment="alignment"
          :spacing="badgeSpacing"
          :class="badgeClasses"
          @click="handleBadgeClick"
        />

        <!-- Heading -->
        <MHeroHeading
          :title="title"
          :highlight-text="highlightText"
          :subtitle="subtitle"
          :description="description"
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
  /** Icon for the badge */
  badgeIcon?: string
  /** Badge variant */
  badgeVariant?: 'default' | 'outline' | 'secondary' | 'success' | 'warning' | 'error'
  /** Badge size */
  badgeSize?: 'sm' | 'default' | 'lg'
  /** Main title text */
  title?: string
  /** Highlighted text (appears with gradient) */
  highlightText?: string
  /** Subtitle text (appears above title) */
  subtitle?: string
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
  badgeSpacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  headingSpacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  /** Additional classes */
  class?: string | Record<string, boolean> | string[]
}

// Props with defaults
const props = withDefaults(defineProps<SimpleHeroProps>(), {
  id: 'simple-hero',
  badgeVariant: 'default',
  badgeSize: 'default',
  variant: 'default',
  containerSize: 'lg',
  alignment: 'center',
  headingSize: 'lg',
  badgeSpacing: 'md',
  headingSpacing: 'md',
  breakHighlight: false,
})

// Emits
const emit = defineEmits<{
  'badge:click': []
}>()

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
    'hero-badge',
    props.alignment === 'center' && 'mx-auto'
  )
})

// Event handlers
const handleBadgeClick = () => {
  emit('badge:click')
}
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