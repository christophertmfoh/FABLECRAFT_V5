<template>
  <div
    :class="cardClasses"
    role="article"
    tabindex="0"
    :aria-labelledby="`benefit-title-${id}`"
    :aria-describedby="`benefit-description-${id}`"
  >
    <!-- Icon -->
    <IconContainer
      :icon="icon"
      :size="'lg'"
      :variant="'primary'"
      :shape="'rounded'"
      class="mx-auto group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg transition-all duration-500"
    />

    <!-- Content -->
    <div class="space-y-4 text-center">
      <!-- Title -->
      <Heading
        :as="'h4'"
        :size="'h4'"
        :align="'center'"
        :id="`benefit-title-${id}`"
        class="text-foreground group-hover:text-primary transition-colors duration-300"
      >
        {{ title }}
      </Heading>

      <!-- Category Badge (optional) -->
      <Badge 
        v-if="showCategory && category"
        variant="secondary"
        size="sm"
        class="mx-auto"
      >
        {{ category }}
      </Badge>

      <!-- Description -->
      <Text
        :as="'p'"
        :size="'base'"
        :variant="'muted'"
        :leading="'relaxed'"
        :align="'center'"
        :id="`benefit-description-${id}`"
        class="group-hover:text-foreground transition-colors duration-300"
      >
        {{ description }}
      </Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComponentId } from '~/composables/useComponentId'

interface MBenefitCardProps {
  icon: string
  title: string
  description: string
  category?: string
  showCategory?: boolean
}

const props = withDefaults(defineProps<MBenefitCardProps>(), {
  showCategory: false
})

// Generate unique ID for accessibility
const id = useComponentId()

// Consolidated card classes
const cardClasses = [
  'group',
  'bg-card hover:bg-accent/30',
  'rounded-2xl p-comfortable space-y-6',
  'border border-border hover:border-primary/50',
  'transition-all duration-500',
  'natural-depth gentle-hover',
  'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2'
]
</script>