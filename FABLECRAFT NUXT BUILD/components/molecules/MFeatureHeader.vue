<template>
  <div class="text-center heading-group space-y-3">
    <!-- Use the existing MHeroBadge component -->
    <MHeroBadge
      :text="badgeText"
      :variant="badgeVariant"
      :size="badgeSize"
      :dot-color="badgeDotColor"
      :clickable="badgeClickable"
      @click="$emit('badge-click', $event)"
    />

    <!-- Use MHeroHeading for consistent gradient text support -->
    <MHeroHeading
      :heading-tag="headingTag"
      :title="title"
      :highlight-text="highlightText"
      :subheading="subtitle"
      :size="headingSize"
      :variant="headingVariant"
      :gradient-variant="gradientVariant"
      :gradient-direction="gradientDirection"
      :gradient-intensity="gradientIntensity"
      :spacing="headingSpacing"
    />
  </div>
</template>

<script setup lang="ts">
interface MFeatureHeaderProps {
  // Badge props
  badgeText: string
  badgeVariant?: 'default' | 'accent' | 'secondary' | 'outline'
  badgeSize?: 'sm' | 'base' | 'md' | 'lg'
  badgeDotColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive'
  badgeClickable?: boolean

  // Heading props
  title: string
  highlightText?: string
  subtitle?: string
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  headingSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  headingVariant?: 'default' | 'compact' | 'dramatic'
  headingSpacing?: 'tight' | 'normal' | 'relaxed'

  // Gradient props
  gradientVariant?: 'primary' | 'secondary' | 'accent' | 'rainbow' | 'custom'
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl'
  gradientIntensity?: 'subtle' | 'normal' | 'vibrant'
}

const props = withDefaults(defineProps<MFeatureHeaderProps>(), {
  badgeVariant: 'default',
  badgeSize: 'base',
  badgeDotColor: 'primary',
  badgeClickable: false,
  headingTag: 'h2',
  headingSize: 'xl',
  headingVariant: 'default',
  headingSpacing: 'normal',
  gradientVariant: 'primary',
  gradientDirection: 'to-r',
  gradientIntensity: 'normal',
})

// Emit events
defineEmits<{
  'badge-click': [event: MouseEvent]
}>()
</script>
