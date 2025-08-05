<template>
  <div class="text-center heading-group space-y-3">
    <!-- Use the existing MHeroBadge component -->
    <MHeroBadge
      :text="badgeText"
      :variant="badgeVariant"
      :size="badgeSize"
      :clickable="false"
    />

    <!-- Main Heading with proper centering -->
    <Heading
      :as="headingTag"
      :size="headingSize"
      :align="'center'"
      :class="headingClass"
    >
      {{ title }}
    </Heading>

    <!-- Description Text with proper centering and styling -->
    <Text
      v-if="subtitle"
      :as="'p'"
      :size="subtitleSize"
      :variant="'muted'"
      :weight="'medium'"
      :leading="'relaxed'"
      :align="'center'"
      :class="subtitleClass"
    >
      {{ subtitle }}
    </Text>
  </div>
</template>

<script setup lang="ts">
interface MFeatureHeaderProps {
  badgeText: string
  title: string
  subtitle?: string
  badgeVariant?: 'default' | 'accent' | 'secondary' | 'outline'
  badgeSize?: 'sm' | 'base' | 'md' | 'lg'
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  headingSize?: 'h2' | 'h2-compact' | 'h2-display'
  subtitleSize?: 'body-compact' | 'body-default'
  compact?: boolean
  class?: string
}

const props = withDefaults(defineProps<MFeatureHeaderProps>(), {
  badgeVariant: 'default',
  badgeSize: 'base',
  headingTag: 'h2',
  headingSize: 'h2',
  subtitleSize: 'body-default',
  compact: false
})

// Additional spacing and size adjustments based on compact mode
const headingClass = computed(() => [
  'mt-best-friends', // Consistent spacing after badge
  props.compact && 'sm:text-3xl lg:text-4xl' // Override sizes if compact
])

const subtitleClass = computed(() => [
  'max-w-4xl mx-auto', // Center and constrain width
  'mt-friends' // Consistent spacing after heading
])
</script>