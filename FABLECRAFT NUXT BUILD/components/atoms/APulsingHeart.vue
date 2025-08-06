<template>
  <div
    :class="heartClasses"
    :style="heartStyles"
    aria-hidden="true"
    role="img"
    aria-label="heart"
  >
    <AtomIcon
      name="lucide:heart"
      :class="iconClasses"
      fill="currentColor"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface PulsingHeartProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive' | 'red' | 'theme-adaptive'
  intensity?: 'subtle' | 'normal' | 'strong'
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
}

// Component setup
const props = withDefaults(defineProps<PulsingHeartProps>(), {
  size: 'md',
  color: 'theme-adaptive',
  intensity: 'normal',
  speed: 'normal',
  className: '',
})

// Import theme composable for theme-reactive colors
const { isDark } = useTheme()

// Computed classes
const heartClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const speedClasses = {
    slow: 'animate-pulse-slow',
    normal: 'animate-pulse',
    fast: 'animate-pulse-fast',
  }

  return cn(
    'inline-flex',
    'items-center',
    'justify-center',
    'transition-all',
    'duration-300',
    'cursor-pointer',
    'hover:scale-110', // Interactive hover scale
    'active:scale-95',  // Press effect
    sizeClasses[props.size],
    speedClasses[props.speed],
    props.className
  )
})

const iconClasses = computed(() => {
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive',
    red: 'text-red-500',
    'theme-adaptive': isDark.value 
      ? 'text-red-400 hover:text-red-300' // Warmer, lighter red in dark theme
      : 'text-red-600 hover:text-red-700', // Deeper red in light theme
  }

  const intensityClasses = {
    subtle: 'opacity-60',
    normal: 'opacity-80',
    strong: 'opacity-100',
  }

  return cn(
    'w-full',
    'h-full',
    'transition-colors',
    'duration-300',
    'drop-shadow-sm', // Add subtle shadow for better visibility
    colorClasses[props.color],
    intensityClasses[props.intensity]
  )
})

// Custom styles for enhanced pulsing effect
const heartStyles = computed(() => {
  const intensityStyles = {
    subtle: {
      '--pulse-scale': '1.05',
    },
    normal: {
      '--pulse-scale': '1.1',
    },
    strong: {
      '--pulse-scale': '1.2',
    },
  }

  return intensityStyles[props.intensity]
})
</script>

<style scoped>
/* Enhanced pulsing animation for the heart */
@keyframes pulse-heart {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
    filter: brightness(1);
  }
  50% {
    transform: scale(var(--pulse-scale, 1.1));
    opacity: 1;
    filter: brightness(1.2);
  }
}

/* Custom pulse variations */
.animate-pulse-slow {
  animation: pulse-heart 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse {
  animation: pulse-heart 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-fast {
  animation: pulse-heart 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Theme-adaptive glow effects */
:deep(.theme-adaptive) {
  transition: all 0.3s ease-in-out;
}

/* Light theme glow */
.light :deep(.theme-adaptive) {
  filter: drop-shadow(0 0 2px rgba(239, 68, 68, 0.3));
}

/* Dark theme glow */
.dark :deep(.theme-adaptive) {
  filter: drop-shadow(0 0 3px rgba(248, 113, 113, 0.4));
}

/* Enhanced hover effects for theme-adaptive hearts */
:deep(.theme-adaptive:hover) {
  animation-duration: 1.5s; /* Faster pulse on hover */
}

/* Theme transition smoothing */
.theme-transition :deep(.theme-adaptive) {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>