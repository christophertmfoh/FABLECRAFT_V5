<template>
  <li :class="featureClasses" role="listitem">
    <!-- Feature icon -->
    <CheckIcon
      :variant="iconVariant"
      :color="iconColor"
      :size="iconSize"
      :class="iconClasses"
      :aria-hidden="true"
    />

    <!-- Feature text -->
    <Text :tag="textTag" :size="textSize" :class="textClasses">
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

// Size configurations (moved outside to avoid recreation)
const FEATURE_SIZE_CONFIG = {
  xs: {
    icon: 'xs' as const,
    text: 'xs' as const,
    spacing: 'gap-2',
  },
  sm: {
    icon: 'sm' as const,
    text: 'sm' as const,
    spacing: 'gap-2.5',
  },
  md: {
    icon: 'md' as const,
    text: 'base' as const,
    spacing: 'gap-3',
  },
  lg: {
    icon: 'lg' as const,
    text: 'lg' as const,
    spacing: 'gap-3',
  },
} as const

// Component props
interface PricingFeatureProps {
  text: string
  included?: boolean
  tooltip?: string
  size?: keyof typeof FEATURE_SIZE_CONFIG
  variant?: 'default' | 'compact'
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<PricingFeatureProps>(), {
  included: true,
  size: 'sm',
  variant: 'default',
  class: '',
})

// Computed properties
const iconVariant = computed(() => (props.included ? 'check' : 'x'))
const iconColor = computed(() => (props.included ? 'success' : 'muted'))
const iconSize = computed(() => FEATURE_SIZE_CONFIG[props.size].icon)
const textTag = computed(() => 'span')
const textSize = computed(() => FEATURE_SIZE_CONFIG[props.size].text)

const featureClasses = computed(() => [
  'flex items-start',
  FEATURE_SIZE_CONFIG[props.size].spacing,
  'transition-colors duration-200',
  props.class,
])

const iconClasses = computed(() => ['mt-0.5 flex-shrink-0'])

const textClasses = computed(() => [
  'leading-relaxed',
  props.included ? 'text-foreground' : 'text-muted-foreground line-through',
])
</script>
