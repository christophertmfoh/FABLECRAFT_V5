<template>
  <Card
    :class="cardClasses"
    :variant="cardVariant"
    role="article"
    :aria-label="`${number} ${label}`"
  >
    <div :class="contentClasses">
      <!-- Icon Container -->
      <IconContainer
        :icon="icon"
        :size="iconSize"
        :variant="iconVariant"
        :shape="iconShape"
        :hover="false"
        class="mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
      />

      <!-- Content -->
      <div class="space-y-1">
        <!-- Number -->
        <Text
          :as="'div'"
          :size="numberSize"
          :weight="numberWeight"
          :align="'center'"
          class="text-foreground group-hover:text-primary transition-colors duration-300"
        >
          {{ number }}
        </Text>
        
        <!-- Label -->
        <Text
          :as="'div'"
          :size="labelSize"
          :variant="'muted'"
          :weight="labelWeight"
          :align="'center'"
          class="group-hover:text-foreground transition-colors duration-300"
        >
          {{ label }}
        </Text>
        
        <!-- Optional Description -->
        <Text
          v-if="showDescription && description"
          :as="'p'"
          :size="descriptionSize"
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
  // Card customization
  cardVariant?: 'default' | 'ghost' | 'outline'
  contentPadding?: 'sm' | 'md' | 'lg'
  // Icon customization
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  iconVariant?: 'default' | 'ghost' | 'soft' | 'subtle' | 'outline' | 'gradient'
  iconShape?: 'circle' | 'square' | 'rounded'
  // Text customization
  numberSize?: 'display-value' | 'xl' | '2xl' | '3xl'
  numberWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
  labelSize?: 'xs' | 'sm' | 'base' | 'lg'
  labelWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  descriptionSize?: 'xs' | 'sm' | 'base'
}

const props = withDefaults(defineProps<MTrustIndicatorCardProps>(), {
  showDescription: false,
  cardVariant: 'default',
  contentPadding: 'md',
  iconSize: 'md',
  iconVariant: 'gradient',
  iconShape: 'rounded',
  numberSize: 'display-value',
  numberWeight: 'bold',
  labelSize: 'sm',
  labelWeight: 'medium',
  descriptionSize: 'xs'
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

// Content padding classes
const contentClasses = computed(() => {
  const paddingMap = {
    sm: 'p-4 space-y-3',
    md: 'p-6 space-y-4',
    lg: 'p-8 space-y-5'
  }
  return ['text-center', paddingMap[props.contentPadding]]
})
</script>