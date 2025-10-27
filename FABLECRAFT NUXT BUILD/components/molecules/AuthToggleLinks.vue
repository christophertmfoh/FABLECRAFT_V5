<template>
  <div :class="containerClasses">
    <!-- Primary text -->
    <Text :size="textSize" :class="textClasses">
      {{ primaryText }}
    </Text>

    <!-- Action link -->
    <Button
      variant="link"
      :size="linkSize"
      :class="linkClasses"
      @click="handleToggle"
    >
      {{ linkText }}
      
      <!-- Optional trailing icon -->
      <template v-if="showIcon" #trailing>
        <AtomIcon
          :name="iconName"
          :class="iconClasses"
          aria-hidden="true"
        />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '~/components/atoms/Utils'

// Auth modes
type AuthMode = 'login' | 'signup'

// Component props
interface AuthToggleLinksProps {
  /** Current authentication mode */
  currentMode?: AuthMode
  /** Text size */
  textSize?: 'xs' | 'sm' | 'base' | 'lg'
  /** Link size */
  linkSize?: 'sm' | 'default' | 'lg'
  /** Layout direction */
  layout?: 'horizontal' | 'vertical'
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
  /** Show trailing icon */
  showIcon?: boolean
  /** Custom icon name */
  icon?: string
  /** Custom primary text */
  customPrimaryText?: string
  /** Custom link text */
  customLinkText?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<AuthToggleLinksProps>(), {
  currentMode: 'login',
  textSize: 'sm',
  linkSize: 'sm',
  layout: 'horizontal',
  align: 'center',
  showIcon: false,
  icon: 'lucide:arrow-right',
})

// Define emits
const emit = defineEmits<{
  toggle: [mode: AuthMode]
}>()

// Content configuration
const contentConfig = {
  login: {
    primaryText: "Don't have an account?",
    linkText: 'Sign up',
    targetMode: 'signup' as AuthMode,
  },
  signup: {
    primaryText: 'Already have an account?',
    linkText: 'Sign in',
    targetMode: 'login' as AuthMode,
  },
}

// Style variants
const containerVariants = cva('transition-all duration-200', {
  variants: {
    layout: {
      horizontal: 'flex items-center gap-1',
      vertical: 'flex flex-col gap-1',
    },
    align: {
      left: 'justify-start text-left',
      center: 'justify-center text-center',
      right: 'justify-end text-right',
    },
  },
  defaultVariants: {
    layout: 'horizontal',
    align: 'center',
  },
})

// Computed properties
const config = computed(() => contentConfig[props.currentMode])

const primaryText = computed(() => {
  return props.customPrimaryText || config.value.primaryText
})

const linkText = computed(() => {
  return props.customLinkText || config.value.linkText
})

const targetMode = computed(() => {
  return config.value.targetMode
})

const iconName = computed(() => {
  return props.icon
})

// Computed classes
const containerClasses = computed(() => {
  return cn(
    containerVariants({
      layout: props.layout,
      align: props.align,
    }),
    props.class
  )
})

const textClasses = computed(() => {
  return cn(
    'text-muted-foreground transition-colors duration-200',
    {
      'mb-1': props.layout === 'vertical',
    }
  )
})

const linkClasses = computed(() => {
  return cn(
    'h-auto p-0 font-medium transition-all duration-200',
    'hover:text-primary focus:text-primary',
    'underline-offset-4 hover:underline focus:underline',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
    {
      'self-start': props.layout === 'vertical' && props.align === 'left',
      'self-center': props.layout === 'vertical' && props.align === 'center',
      'self-end': props.layout === 'vertical' && props.align === 'right',
    }
  )
})

const iconClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    default: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  }
  
  return cn(
    'transition-transform duration-200 group-hover:translate-x-0.5',
    sizeClasses[props.linkSize]
  )
})

// Event handlers
const handleToggle = () => {
  emit('toggle', targetMode.value)
}
</script>

<style scoped>
/* Enhanced link hover effects */
button[variant="link"] {
  position: relative;
}

/* Smooth underline animation */
button[variant="link"]:hover {
  text-decoration-color: hsl(var(--primary));
}

/* Icon animation on hover */
button:hover .group-hover\:translate-x-0\.5 {
  transform: translateX(2px);
}

/* Focus animation */
button:focus-visible {
  animation: focusPulse 0.6s ease-in-out;
}

@keyframes focusPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* Responsive text size adjustments */
@media (max-width: 640px) {
  .text-sm {
    font-size: 0.875rem;
  }
}
</style>