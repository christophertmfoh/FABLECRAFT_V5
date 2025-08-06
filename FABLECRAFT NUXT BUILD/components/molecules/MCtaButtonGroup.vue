<template>
  <div
    :class="buttonGroupClasses"
    role="group"
    :aria-label="groupLabel"
  >
    <!-- Primary CTA Button -->
    <Button
      :variant="primaryVariant"
      :size="buttonSize"
      :class="primaryButtonClasses"
      @click="handlePrimaryClick"
    >
      <span class="relative flex items-center">
        <slot name="primary-icon-before" />
        {{ primaryText }}
        <slot name="primary-icon-after">
          <AtomIcon
            v-if="showPrimaryIcon"
            :name="primaryIcon"
            :size="iconSize"
            :class="primaryIconClasses"
          />
        </slot>
      </span>
    </Button>

    <!-- Secondary CTA Button (optional) -->
    <Button
      v-if="secondaryText"
      :variant="secondaryVariant"
      :size="buttonSize"
      :class="secondaryButtonClasses"
      @click="handleSecondaryClick"
    >
      <span class="flex items-center">
        <slot name="secondary-icon-before" />
        {{ secondaryText }}
        <slot name="secondary-icon-after">
          <AtomIcon
            v-if="showSecondaryIcon"
            :name="secondaryIcon"
            :size="iconSize"
            :class="secondaryIconClasses"
          />
        </slot>
      </span>
    </Button>
  </div>

  <!-- Trust Signal / Supporting Text (optional) -->
  <div 
    v-if="trustSignal || $slots.trustSignal"
    :class="trustSignalClasses"
  >
    <slot name="trustSignal">
      <Text
        tag="p"
        size="sm"
        class="text-muted-foreground text-center"
      >
        {{ trustSignal }}
      </Text>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Component props
interface CtaButtonGroupProps {
  // Primary button
  primaryText: string
  primaryVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  primaryIcon?: string
  showPrimaryIcon?: boolean
  
  // Secondary button (optional)
  secondaryText?: string
  secondaryVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  secondaryIcon?: string
  showSecondaryIcon?: boolean
  
  // Layout and styling
  layout?: 'horizontal' | 'vertical' | 'responsive'
  alignment?: 'left' | 'center' | 'right'
  buttonSize?: 'sm' | 'base' | 'lg' | 'xl'
  spacing?: 'tight' | 'normal' | 'loose'
  
  // Additional content
  trustSignal?: string
  groupLabel?: string
  
  // Styling
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<CtaButtonGroupProps>(), {
  primaryVariant: 'default',
  primaryIcon: 'lucide:arrow-right',
  showPrimaryIcon: true,
  secondaryVariant: 'outline',
  secondaryIcon: 'lucide:play',
  showSecondaryIcon: true,
  layout: 'responsive',
  alignment: 'center',
  buttonSize: 'lg',
  spacing: 'normal',
  groupLabel: 'Call to action buttons',
})

// Define emits
const emit = defineEmits<{
  primaryClick: []
  secondaryClick: []
}>()

// Layout configuration
const layoutConfig = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
  responsive: 'flex-col sm:flex-row',
}

// Spacing configuration  
const spacingConfig = {
  tight: 'gap-3',
  normal: 'gap-4 sm:gap-6',
  loose: 'gap-6 sm:gap-8',
}

// Alignment configuration
const alignmentConfig = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

// Icon size based on button size
const iconSize = computed(() => {
  const sizeMap = {
    sm: 'sm',
    base: 'base', 
    lg: 'lg',
    xl: 'xl',
  }
  return sizeMap[props.buttonSize] || 'base'
})

// Computed classes
const buttonGroupClasses = computed(() => [
  'flex items-center',
  layoutConfig[props.layout],
  spacingConfig[props.spacing],
  alignmentConfig[props.alignment],
  props.class,
])

const primaryButtonClasses = computed(() => [
  'group relative overflow-hidden',
  'hover:scale-105 hover:-translate-y-1',
  'transition-all duration-300',
  'shadow-lg hover:shadow-xl',
  'font-semibold',
])

const secondaryButtonClasses = computed(() => [
  'group',
  'hover:scale-105 hover:-translate-y-1', 
  'transition-all duration-300',
  'shadow-md hover:shadow-lg',
  'font-semibold',
])

const primaryIconClasses = computed(() => [
  'ml-3 group-hover:translate-x-1 transition-transform duration-300',
])

const secondaryIconClasses = computed(() => [
  'ml-3 group-hover:scale-110 transition-transform duration-300',
])

const trustSignalClasses = computed(() => [
  'mt-6 text-center',
])

// Event handlers
const handlePrimaryClick = () => {
  emit('primaryClick')
}

const handleSecondaryClick = () => {
  emit('secondaryClick')
}
</script>