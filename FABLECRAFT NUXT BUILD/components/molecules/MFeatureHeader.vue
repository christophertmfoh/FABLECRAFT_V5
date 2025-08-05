<template>
  <div class="text-center">
    <!-- Badge Container -->
    <div class="flex items-center justify-center gap-2">
      <APulsingDot 
        :color="pulsingDotColor"
        aria-hidden="true"
      />
      <Badge 
        :variant="badgeVariant"
        :class="badgeClass"
      >
        {{ badgeText }}
      </Badge>
    </div>

    <!-- Main Heading -->
    <Heading
      :level="2"
      :size="headingSize"
      :class="headingClass"
    >
      {{ title }}
    </Heading>

    <!-- Description Text -->
    <Text
      v-if="subtitle"
      :size="subtitleSize"
      :variant="muted"
      :class="subtitleClass"
    >
      {{ subtitle }}
    </Text>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize } from '~/types'

interface MFeatureHeaderProps {
  badgeText: string
  title: string
  subtitle?: string
  badgeVariant?: 'default' | 'secondary' | 'accent'
  pulsingDotColor?: string
  headingSize?: ComponentSize
  subtitleSize?: ComponentSize
  compact?: boolean
  class?: string
}

const props = withDefaults(defineProps<MFeatureHeaderProps>(), {
  badgeVariant: 'default',
  pulsingDotColor: 'primary',
  headingSize: 'xl',
  subtitleSize: 'lg',
  compact: false
})

// Compute responsive classes based on variant
const badgeClass = computed(() => [
  'bg-card/95 text-foreground border-border font-semibold',
  'backdrop-blur-md shadow-md hover:shadow-lg',
  'transition-shadow duration-300',
  'text-base px-4 py-2'
])

const headingClass = computed(() => [
  'font-black text-foreground leading-[1.2] tracking-tight drop-shadow-sm',
  'mt-best-friends',
  props.compact
    ? 'text-2xl sm:text-3xl lg:text-4xl'
    : 'text-golden-3xl sm:text-golden-4xl lg:text-golden-5xl xl:text-6xl'
])

const subtitleClass = computed(() => [
  'text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium',
  'mt-friends',
  props.compact
    ? 'text-base sm:text-lg'
    : 'text-golden-lg sm:text-golden-xl lg:text-golden-2xl'
])
</script>