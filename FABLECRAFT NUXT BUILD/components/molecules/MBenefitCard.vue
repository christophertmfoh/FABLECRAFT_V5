<template>
  <div
    :class="[
      'group bg-card hover:bg-accent/30 rounded-2xl p-comfortable space-y-6',
      'border border-border hover:border-primary/50 transition-all duration-500',
      'natural-depth gentle-hover focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2'
    ]"
    role="article"
    tabindex="0"
    :aria-labelledby="`benefit-title-${id}`"
    :aria-describedby="`benefit-description-${id}`"
  >
    <!-- Icon -->
    <div
      :class="[
        'w-16 h-16 bg-primary/10 hover:bg-primary/20 rounded-2xl',
        'flex items-center justify-center mx-auto transition-all duration-500',
        'group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg'
      ]"
    >
      <Icon
        :name="icon"
        class="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300"
        aria-hidden="true"
      />
    </div>

    <!-- Content -->
    <div class="mt-best-friends space-y-4 text-center">
      <!-- Title -->
      <h4
        :id="`benefit-title-${id}`"
        class="text-golden-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300"
      >
        {{ title }}
      </h4>

      <!-- Category Badge (optional) -->
      <Badge 
        v-if="showCategory && category"
        variant="secondary"
      >
        {{ category }}
      </Badge>

      <!-- Description -->
      <p
        :id="`benefit-description-${id}`"
        class="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed"
      >
        {{ description }}
      </p>
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
</script>