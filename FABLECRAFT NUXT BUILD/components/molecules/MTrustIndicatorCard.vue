<template>
  <Card
    :class="cardClasses"
    role="article"
    :aria-label="`${number} ${label}`"
  >
    <div class="p-6 text-center space-y-4">
      <!-- Icon Container -->
      <IconContainer
        :icon="icon"
        :size="'md'"
        :variant="'primary'"
        :shape="'rounded'"
        class="mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
      />

      <!-- Content -->
      <div class="space-y-1">
        <!-- Number -->
        <Text
          :as="'div'"
          :size="'display-value'"
          :weight="'bold'"
          :align="'center'"
          class="text-foreground group-hover:text-primary transition-colors duration-300"
        >
          {{ number }}
        </Text>
        
        <!-- Label -->
        <Text
          :as="'div'"
          :size="'sm'"
          :variant="'muted'"
          :weight="'medium'"
          :align="'center'"
          class="group-hover:text-foreground transition-colors duration-300"
        >
          {{ label }}
        </Text>
        
        <!-- Optional Description -->
        <Text
          v-if="showDescription && description"
          :as="'p'"
          :size="'xs'"
          :variant="'muted'"
          :align="'center'"
          class="mt-2"
        >
          {{ description }}
        </Text>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
interface MTrustIndicatorCardProps {
  number: string
  label: string
  icon: string
  description?: string
  showDescription?: boolean
}

const props = withDefaults(defineProps<MTrustIndicatorCardProps>(), {
  showDescription: false
})

// Consolidated card classes
const cardClasses = [
  'group',
  'bg-card hover:bg-accent/50',
  'border-border',
  'transition-all duration-500',
  'natural-depth gentle-hover',
  'focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2'
]
</script>