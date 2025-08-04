<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :class="logoClasses"
    @click="handleClick"
  >
    <Icon 
      v-if="icon || showFallbackIcon"
      :name="icon || fallbackIcon"
      :class="iconClasses"
    />
    <img 
      v-else-if="src && !imageError"
      :src="src"
      :alt="alt"
      :class="imageClasses"
      @error="handleImageError"
    />
    <span 
      v-if="text"
      :class="textClasses"
    >
      {{ text }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from './Utils'

// Component props
interface NavigationLogoProps {
  to?: string | object
  href?: string
  icon?: string
  src?: string
  alt?: string
  text?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'minimal'
  imageOnError?: 'hide' | 'icon' | 'text'
  fallbackIcon?: string
  class?: any
  iconClass?: any
  textClass?: any
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationLogoProps>(), {
  alt: 'Logo',
  size: 'md',
  variant: 'default',
  imageOnError: 'icon',
  fallbackIcon: 'lucide:image-off'
})

// Define emits
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Image error state
const imageError = ref(false)

// Computed component type
const componentType = computed(() => {
  if (props.to) return 'NuxtLink'
  if (props.href) return 'a'
  return 'div'
})

// Size mappings
const sizeClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12'
}

const iconSizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
}

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl'
}

// Variant mappings
const variantClasses = {
  default: 'hover:opacity-80',
  ghost: 'hover:bg-accent rounded-md px-2',
  minimal: ''
}

// Computed classes
const logoClasses = computed(() => {
  return cn(
    'inline-flex items-center gap-2 transition-all cursor-pointer',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    sizeClasses[props.size],
    variantClasses[props.variant],
    props.class
  )
})

const iconClasses = computed(() => {
  return cn(
    'shrink-0',
    iconSizeClasses[props.size],
    props.iconClass
  )
})

const imageClasses = computed(() => {
  return cn(
    'h-full w-auto object-contain',
    imageError.value && 'hidden'
  )
})

const textClasses = computed(() => {
  return cn(
    'font-bold',
    textSizeClasses[props.size],
    props.textClass
  )
})

// Show fallback icon
const showFallbackIcon = computed(() => {
  return imageError.value && props.imageOnError === 'icon' && props.fallbackIcon
})

// Event handlers
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

const handleImageError = () => {
  imageError.value = true
}
</script>