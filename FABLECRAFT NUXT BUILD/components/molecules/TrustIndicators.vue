<template>
  <div :class="containerClasses">
    <!-- Security Badges -->
    <div v-if="showBadges" :class="badgesContainerClasses">
      <div
        v-for="badge in visibleBadges"
        :key="badge.key"
        :class="badgeClasses"
        :title="badge.description"
      >
        <AtomIcon :name="badge.icon" :class="badgeIconClasses" aria-hidden="true" />
        <Text :size="badgeTextSize" :class="badgeTextClasses">
          {{ badge.label }}
        </Text>
      </div>
    </div>

    <!-- Trust Message -->
    <div v-if="showMessage" :class="messageContainerClasses">
      <AtomIcon
        v-if="messageIcon"
        :name="messageIcon"
        :class="messageIconClasses"
        aria-hidden="true"
      />
      <Text :size="messageTextSize" :class="messageTextClasses">
        <slot>{{ message }}</slot>
      </Text>
    </div>

    <!-- Privacy Note -->
    <div v-if="showPrivacyNote" :class="privacyNoteClasses">
      <Text size="xs" class="text-muted-foreground/80 text-center leading-relaxed">
        {{ privacyText }}
        <Button
          v-if="showPrivacyLink"
          variant="link"
          size="sm"
          class="h-auto p-0 text-xs underline-offset-4"
          @click="handlePrivacyClick"
        >
          Learn more
        </Button>
      </Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '~/components/atoms/Utils'

// Trust badge interface
interface TrustBadge {
  key: string
  label: string
  icon: string
  description: string
  enabled: boolean
}

// Component props
interface TrustIndicatorsProps {
  /** Show security badges */
  showBadges?: boolean
  /** Which badges to show */
  badges?: string[]
  /** Show trust message */
  showMessage?: boolean
  /** Trust message text */
  message?: string
  /** Message icon */
  messageIcon?: string
  /** Show privacy note */
  showPrivacyNote?: boolean
  /** Privacy note text */
  privacyText?: string
  /** Show privacy link */
  showPrivacyLink?: boolean
  /** Layout direction */
  layout?: 'vertical' | 'horizontal'
  /** Component size */
  size?: 'sm' | 'md' | 'lg'
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
  /** Badge text size */
  badgeTextSize?: 'xs' | 'sm' | 'base'
  /** Message text size */
  messageTextSize?: 'xs' | 'sm' | 'base'
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<TrustIndicatorsProps>(), {
  showBadges: true,
  badges: () => ['ssl', 'privacy', 'secure'],
  showMessage: true,
  message: 'Your information is secure and protected',
  messageIcon: 'lucide:shield-check',
  showPrivacyNote: true,
  privacyText: 'We never share your data with third parties.',
  showPrivacyLink: true,
  layout: 'vertical',
  size: 'md',
  align: 'center',
  badgeTextSize: 'xs',
  messageTextSize: 'sm',
})

// Define emits
const emit = defineEmits<{
  'privacy-click': []
  'badge-click': [badge: string]
}>()

// Available trust badges
const availableBadges: Record<string, TrustBadge> = {
  ssl: {
    key: 'ssl',
    label: 'SSL Encrypted',
    icon: 'lucide:lock',
    description: 'Your data is encrypted with industry-standard SSL',
    enabled: true,
  },
  privacy: {
    key: 'privacy',
    label: 'Privacy Protected',
    icon: 'lucide:shield',
    description: 'We respect your privacy and protect your data',
    enabled: true,
  },
  secure: {
    key: 'secure',
    label: 'Secure Storage',
    icon: 'lucide:database',
    description: 'Your information is stored securely',
    enabled: true,
  },
  verified: {
    key: 'verified',
    label: 'Verified Platform',
    icon: 'lucide:check-circle',
    description: 'Our platform is verified and trusted',
    enabled: true,
  },
  gdpr: {
    key: 'gdpr',
    label: 'GDPR Compliant',
    icon: 'lucide:shield-check',
    description: 'Fully compliant with GDPR regulations',
    enabled: true,
  },
}

// Style variants
const containerVariants = cva('w-full', {
  variants: {
    layout: {
      vertical: 'space-y-4',
      horizontal: 'flex items-center gap-6',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    size: {
      sm: 'py-2',
      md: 'py-3',
      lg: 'py-4',
    },
  },
  defaultVariants: {
    layout: 'vertical',
    align: 'center',
    size: 'md',
  },
})

const badgesContainerVariants = cva('flex', {
  variants: {
    layout: {
      vertical: 'flex-wrap justify-center gap-4',
      horizontal: 'gap-4',
    },
    size: {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    },
  },
  defaultVariants: {
    layout: 'vertical',
    size: 'md',
  },
})

// Computed properties
const visibleBadges = computed(() => {
  return props.badges.map(key => availableBadges[key]).filter(badge => badge && badge.enabled)
})

const containerClasses = computed(() => {
  return cn(
    containerVariants({
      layout: props.layout,
      align: props.align,
      size: props.size,
    }),
    props.class
  )
})

const badgesContainerClasses = computed(() => {
  return cn(
    badgesContainerVariants({
      layout: props.layout,
      size: props.size,
    })
  )
})

const badgeClasses = computed(() => {
  return cn(
    'flex items-center gap-1.5 px-2 py-1 rounded-md',
    'bg-muted/30 hover:bg-muted/50 transition-colors duration-200',
    'cursor-help'
  )
})

const badgeIconClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  }

  return cn('text-success flex-shrink-0', sizeClasses[props.size])
})

const badgeTextClasses = computed(() => {
  return cn('text-muted-foreground font-medium whitespace-nowrap')
})

const messageContainerClasses = computed(() => {
  return cn('flex items-center gap-2 justify-center')
})

const messageIconClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5',
  }

  return cn('text-primary flex-shrink-0', sizeClasses[props.size])
})

const messageTextClasses = computed(() => {
  return cn('text-muted-foreground font-medium')
})

const privacyNoteClasses = computed(() => {
  return cn('max-w-sm mx-auto')
})

// Event handlers
const handlePrivacyClick = () => {
  emit('privacy-click')
}

const handleBadgeClick = (badge: string) => {
  emit('badge-click', badge)
}
</script>

<style scoped>
/* Smooth hover effects for badges */
.cursor-help {
  transition: all 0.2s ease-in-out;
}

.cursor-help:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Trust message animation */
.flex.items-center.gap-2 {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Badge stagger animation */
.flex-wrap > * {
  animation: fadeInScale 0.4s ease-out;
  animation-fill-mode: both;
}

.flex-wrap > *:nth-child(1) {
  animation-delay: 0.1s;
}
.flex-wrap > *:nth-child(2) {
  animation-delay: 0.2s;
}
.flex-wrap > *:nth-child(3) {
  animation-delay: 0.3s;
}
.flex-wrap > *:nth-child(4) {
  animation-delay: 0.4s;
}
.flex-wrap > *:nth-child(5) {
  animation-delay: 0.5s;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Privacy note subtle animation */
.max-w-sm {
  animation: fadeIn 0.8s ease-out 0.6s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
