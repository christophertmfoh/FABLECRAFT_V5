<template>
  <div :class="heartClasses" :style="heartStyles" aria-hidden="true" role="img" aria-label="heart">
    <AtomIcon name="lucide:heart" :class="iconClasses" fill="currentColor" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '~/components/atoms/Utils'

// Props interface
interface PulsingHeartProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive' | 'red'
  intensity?: 'subtle' | 'normal' | 'strong'
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
}

// Component setup
const props = withDefaults(defineProps<PulsingHeartProps>(), {
  size: 'md',
  color: 'primary', // Use theme's primary color by default
  intensity: 'normal',
  speed: 'normal',
  className: '',
})

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
    'active:scale-95', // Press effect
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
  0%,
  100% {
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

/* Enhanced hover effects */
:hover {
  animation-duration: 1.5s; /* Faster pulse on hover */
}

/* Theme transition smoothing for all hearts */
.theme-transition {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
