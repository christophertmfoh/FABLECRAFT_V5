<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :target="target"
    :rel="computedRel"
    :class="linkClasses"
    :aria-current="isActive ? 'page' : undefined"
    v-bind="$attrs"
  >
    <Icon 
      v-if="icon"
      :name="icon"
      :class="iconClasses"
    />
    <span :class="textClasses">
      <slot />
    </span>
    <Icon 
      v-if="isExternal"
      name="lucide:external-link"
      class="ml-1 h-3 w-3 opacity-50"
    />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import { cn } from './Utils'

// Component props
interface NavigationItemProps {
  to?: string | object
  href?: string
  icon?: string
  variant?: 'default' | 'ghost' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  active?: boolean
  exact?: boolean
  activeClass?: string
  inactiveClass?: string
  class?: any
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationItemProps>(), {
  variant: 'default',
  size: 'md',
  exact: false
})

// Get current route
const route = useRoute()

// Determine component type
const componentType = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

// Check if external link
const isExternal = computed(() => {
  return props.href && (props.href.startsWith('http') || props.href.startsWith('//'))
})

// Computed target and rel
const target = computed(() => isExternal.value ? '_blank' : undefined)
const computedRel = computed(() => isExternal.value ? 'noopener noreferrer' : undefined)

// Check if active
const isActive = computed(() => {
  if (props.active !== undefined) return props.active
  
  if (!props.to || !route) return false
  
  const currentPath = route.path
  const linkPath = typeof props.to === 'string' ? props.to : props.to.path || '/'
  
  if (props.exact) {
    return currentPath === linkPath
  }
  
  return currentPath.startsWith(linkPath)
})

// Size classes
const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

// Variant classes
const variantClasses = {
  default: {
    base: 'inline-flex items-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    active: 'text-foreground',
    inactive: 'text-muted-foreground hover:text-foreground'
  },
  ghost: {
    base: 'inline-flex items-center gap-2 rounded-md px-3 py-2 font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    active: 'bg-accent text-accent-foreground',
    inactive: 'text-muted-foreground hover:text-accent-foreground'
  },
  underline: {
    base: 'inline-flex items-center gap-2 font-medium underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    active: 'text-foreground underline',
    inactive: 'text-muted-foreground hover:text-foreground hover:underline'
  }
}

// Computed classes
const linkClasses = computed(() => {
  const variant = variantClasses[props.variant]
  
  return cn(
    variant.base,
    sizeClasses[props.size],
    isActive.value 
      ? props.activeClass || variant.active
      : props.inactiveClass || variant.inactive,
    props.class
  )
})

const iconClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }
  
  return cn(
    sizes[props.size],
    'flex-shrink-0'
  )
})

const textClasses = computed(() => {
  return cn(
    'truncate'
  )
})
</script>