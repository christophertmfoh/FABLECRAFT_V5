<template>
  <div
    :class="cardClasses"
    role="article"
    tabindex="0"
    :aria-labelledby="`benefit-title-${id}`"
    :aria-describedby="`benefit-description-${id}`"
  >
    <!-- Icon centered at the top -->
    <div class="flex justify-center">
      <IconContainer
        :icon="icon"
        :size="iconSize"
        :variant="iconVariant"
        :shape="iconShape"
        :hover="false"
        class="group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg transition-all duration-500"
      />
    </div>

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
        :variant="categoryBadgeVariant"
        :size="categoryBadgeSize"
        class="mx-auto"
      >
        {{ category }}
      </Badge>

      <!-- Description -->
      <Text
        :as="'p'"
        :size="descriptionSize"
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
  // Icon customization
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconVariant?: 'default' | 'ghost' | 'soft' | 'subtle' | 'outline' | 'gradient'
  iconShape?: 'circle' | 'square' | 'rounded'
  // Badge customization
  categoryBadgeVariant?: 'default' | 'secondary' | 'accent' | 'outline'
  categoryBadgeSize?: 'sm' | 'base' | 'md' | 'lg'
  // Text customization
  descriptionSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<MBenefitCardProps>(), {
  showCategory: false,
  iconSize: 'lg',
  iconVariant: 'gradient',
  iconShape: 'rounded',
  categoryBadgeVariant: 'secondary',
  categoryBadgeSize: 'sm',
  descriptionSize: 'base'
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