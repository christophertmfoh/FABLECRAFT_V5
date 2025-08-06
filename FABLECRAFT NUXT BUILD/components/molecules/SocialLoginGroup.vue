<template>
  <div :class="containerClasses">
    <!-- Social Login Buttons -->
    <div :class="buttonsContainerClasses">
      <!-- Google Login -->
      <Button
        v-if="providers.includes('google')"
        :variant="buttonVariant"
        :size="buttonSize"
        :disabled="loading"
        :class="socialButtonClasses"
        @click="handleSocialLogin('google')"
      >
        <template #leading>
          <AtomIcon name="lucide:chrome" :class="iconClasses" aria-hidden="true" />
        </template>
        {{ getButtonText('google') }}
      </Button>

      <!-- GitHub Login -->
      <Button
        v-if="providers.includes('github')"
        :variant="buttonVariant"
        :size="buttonSize"
        :disabled="loading"
        :class="socialButtonClasses"
        @click="handleSocialLogin('github')"
      >
        <template #leading>
          <AtomIcon name="lucide:github" :class="iconClasses" aria-hidden="true" />
        </template>
        {{ getButtonText('github') }}
      </Button>

      <!-- Apple Login -->
      <Button
        v-if="providers.includes('apple')"
        :variant="buttonVariant"
        :size="buttonSize"
        :disabled="loading"
        :class="socialButtonClasses"
        @click="handleSocialLogin('apple')"
      >
        <template #leading>
          <AtomIcon name="lucide:apple" :class="iconClasses" aria-hidden="true" />
        </template>
        {{ getButtonText('apple') }}
      </Button>

      <!-- Microsoft Login -->
      <Button
        v-if="providers.includes('microsoft')"
        :variant="buttonVariant"
        :size="buttonSize"
        :disabled="loading"
        :class="socialButtonClasses"
        @click="handleSocialLogin('microsoft')"
      >
        <template #leading>
          <AtomIcon name="lucide:window" :class="iconClasses" aria-hidden="true" />
        </template>
        {{ getButtonText('microsoft') }}
      </Button>
    </div>

    <!-- Divider with "OR" text -->
    <Divider
      v-if="showDivider"
      :text="dividerText"
      :spacing="dividerSpacing"
      :class="dividerClasses"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '~/components/atoms/Utils'

// Social provider types
type SocialProvider = 'google' | 'github' | 'apple' | 'microsoft'

// Component props
interface SocialLoginGroupProps {
  /** Social providers to show */
  providers?: SocialProvider[]
  /** Button variant */
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost'
  /** Button size */
  buttonSize?: 'sm' | 'default' | 'lg'
  /** Loading state */
  loading?: boolean
  /** Show divider */
  showDivider?: boolean
  /** Divider text */
  dividerText?: string
  /** Divider spacing */
  dividerSpacing?: 'sm' | 'md' | 'lg'
  /** Layout direction */
  layout?: 'vertical' | 'horizontal'
  /** Button display mode */
  mode?: 'full' | 'icon-only' | 'compact'
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<SocialLoginGroupProps>(), {
  providers: () => ['google', 'github'],
  buttonVariant: 'outline',
  buttonSize: 'default',
  loading: false,
  showDivider: true,
  dividerText: 'OR',
  dividerSpacing: 'md',
  layout: 'vertical',
  mode: 'full',
})

// Define emits
const emit = defineEmits<{
  'social-login': [provider: SocialProvider]
}>()

// Provider configurations
const providerConfig = {
  google: {
    name: 'Google',
    icon: 'lucide:chrome',
    fullText: 'Continue with Google',
    compactText: 'Google',
  },
  github: {
    name: 'GitHub',
    icon: 'lucide:github',
    fullText: 'Continue with GitHub',
    compactText: 'GitHub',
  },
  apple: {
    name: 'Apple',
    icon: 'lucide:apple',
    fullText: 'Continue with Apple',
    compactText: 'Apple',
  },
  microsoft: {
    name: 'Microsoft',
    icon: 'lucide:window',
    fullText: 'Continue with Microsoft',
    compactText: 'Microsoft',
  },
}

// Style variants
const containerVariants = cva('w-full', {
  variants: {
    layout: {
      vertical: 'space-y-4',
      horizontal: 'flex items-center gap-4',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
})

const buttonsContainerVariants = cva('w-full', {
  variants: {
    layout: {
      vertical: 'space-y-3',
      horizontal: 'flex gap-3',
    },
    mode: {
      full: '',
      'icon-only': 'flex justify-center',
      compact: 'grid grid-cols-2 gap-3',
    },
  },
  defaultVariants: {
    layout: 'vertical',
    mode: 'full',
  },
})

// Computed classes
const containerClasses = computed(() => {
  return cn(containerVariants({ layout: props.layout }), props.class)
})

const buttonsContainerClasses = computed(() => {
  return cn(
    buttonsContainerVariants({
      layout: props.layout,
      mode: props.mode,
    })
  )
})

const socialButtonClasses = computed(() => {
  const baseClasses = 'w-full justify-start relative overflow-hidden'
  const modeClasses = {
    full: 'min-h-11',
    'icon-only': 'w-11 h-11 p-0 justify-center',
    compact: 'min-h-10',
  }

  return cn(
    baseClasses,
    modeClasses[props.mode],
    'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
    {
      'opacity-70 cursor-not-allowed': props.loading,
    }
  )
})

const iconClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    default: 'h-4 w-4',
    lg: 'h-4.5 w-4.5',
  }

  return cn('flex-shrink-0', sizeClasses[props.buttonSize], {
    'mr-0': props.mode === 'icon-only',
  })
})

const dividerClasses = computed(() => {
  return cn('my-1')
})

// Methods
const getButtonText = (provider: SocialProvider): string => {
  if (props.mode === 'icon-only') return ''

  const config = providerConfig[provider]
  return props.mode === 'compact' ? config.compactText : config.fullText
}

const handleSocialLogin = (provider: SocialProvider) => {
  if (props.loading) return
  emit('social-login', provider)
}
</script>

<style scoped>
/* Enhanced button hover effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Social button specific styles */
button[class*='social-button'] {
  position: relative;
}

/* Subtle gradient overlay on hover */
button[class*='social-button']:hover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  pointer-events: none;
  transition: opacity 0.3s ease;
}

/* Loading state */
button[class*='social-button']:disabled {
  position: relative;
  overflow: hidden;
}

/* Focus styles for accessibility */
button:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
</style>
