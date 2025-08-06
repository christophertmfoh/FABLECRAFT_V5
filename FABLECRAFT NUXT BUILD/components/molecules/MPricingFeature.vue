<template>
  <li
    :class="featureClasses"
    role="listitem"
  >
    <!-- Feature icon -->
    <CheckIcon
      :variant="iconVariant"
      :color="iconColor"
      :size="iconSize"
      :class="iconClasses"
      :aria-hidden="true"
    />

    <!-- Feature text -->
    <Text
      :tag="textTag"
      :size="textSize"
      :class="textClasses"
    >
      {{ text }}
    </Text>

    <!-- Optional tooltip -->
    <template v-if="tooltip">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <AtomIcon
              name="lucide:help-circle"
              size="xs"
              class="ml-1 text-muted-foreground/60 hover:text-muted-foreground cursor-help"
            />
          </TooltipTrigger>
          <TooltipContent>
            <Text size="sm" class="max-w-xs">
              {{ tooltip }}
            </Text>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </template>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Component props
interface PricingFeatureProps {
  text: string
  included?: boolean
  tooltip?: string
  size?: 'xs' | 'sm' | 'base' | 'lg'
  variant?: 'default' | 'compact'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<PricingFeatureProps>(), {
  included: true,
  size: 'sm',
  variant: 'default',
  class: ''
})

// Size configurations
const sizeConfig = {
  xs: {
    icon: 'xs',
    text: 'xs',
    spacing: 'gap-2'
  },
  sm: {
    icon: 'sm',
    text: 'sm',
    spacing: 'gap-2.5'
  },
  base: {
    icon: 'base',
    text: 'base',
    spacing: 'gap-3'
  },
  lg: {
    icon: 'lg',
    text: 'lg',
    spacing: 'gap-3'
  }
}

// Computed properties
const iconVariant = computed(() => props.included ? 'check' : 'x')

const iconColor = computed(() => props.included ? 'success' : 'muted')

const iconSize = computed(() => sizeConfig[props.size].icon)

const textTag = computed(() => 'span')

const textSize = computed(() => sizeConfig[props.size].text)

const featureClasses = computed(() => [
  'flex items-start',
  sizeConfig[props.size].spacing,
  'transition-colors duration-200',
  props.class
])

const iconClasses = computed(() => [
  'mt-0.5 flex-shrink-0'
])

const textClasses = computed(() => [
  'leading-relaxed',
  props.included 
    ? 'text-foreground' 
    : 'text-muted-foreground line-through'
])
</script>