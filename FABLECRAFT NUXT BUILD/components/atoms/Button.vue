<template>
  <component
    :is="componentType"
    :type="type"
    :to="to"
    :href="href"
    :target="target"
    :disabled="disabled || loading"
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <!-- Leading content (icon/avatar) -->
    <Icon
      v-if="loading && !trailing"
      :name="loadingIcon"
      class="animate-spin h-4 w-4"
    />
    <slot v-else-if="$slots.leading" name="leading" />
    <Icon
      v-else-if="icon && !trailing"
      :name="icon"
      class="h-4 w-4"
    />

    <!-- Label/Content -->
    <span v-if="label || $slots.default" :class="{ 'sr-only': iconOnly }">
      <slot>{{ label }}</slot>
    </span>

    <!-- Trailing content (icon) -->
    <Icon
      v-if="loading && trailing"
      :name="loadingIcon"
      class="animate-spin h-4 w-4"
    />
    <slot v-else-if="$slots.trailing" name="trailing" />
    <Icon
      v-else-if="icon && trailing"
      :name="icon"
      class="h-4 w-4"
    />
  </component>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from './Utils'
import type { RouteLocationRaw } from 'vue-router'

// Button variants using CVA
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Component props interface
interface ButtonProps {
  label?: string
  icon?: string
  loadingIcon?: string
  loading?: boolean
  disabled?: boolean
  trailing?: boolean
  to?: RouteLocationRaw
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  type?: 'button' | 'submit' | 'reset'
  class?: string | Record<string, boolean> | string[]
  iconOnly?: boolean
  // CVA variant props
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

// Define props with defaults
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
  trailing: false,
  loading: false,
  disabled: false,
  iconOnly: false,
  loadingIcon: 'lucide:loader-circle',
})

// Compute component type based on props
const componentType = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

// Compute button classes
const buttonClasses = computed(() => {
  return cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.class
  )
})
</script>