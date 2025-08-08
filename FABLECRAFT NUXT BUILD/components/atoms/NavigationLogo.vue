<template>
  <button type="button" :class="logoClasses" :aria-label="ariaLabel" @click="handleClick">
    <!-- Feather Icon Container (static SVG for instant loading) -->
    <div class="icon-container premium-feather">
      <svg 
        class="w-7 h-7"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="url(#featherStroke)" 
        stroke-width="2"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="featherStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" :stop-color="`hsl(${lightFeatherHue} / 0.95)`" />
            <stop offset="50%" :stop-color="`hsl(${primaryHue} / 1)`" />
            <stop offset="100%" :stop-color="`hsl(${accentHue} / 0.9)`" />
          </linearGradient>
        </defs>
        <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/>
        <path d="M16 8 2 22"/>
        <path d="M17.5 15H9"/>
      </svg>
    </div>

    <!-- Brand Text (matching React original) -->
    <span v-if="showText" class="brand-text text-pop">
      {{ brandText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

// Component props interface
interface NavigationLogoProps {
  /** Brand text to display */
  brandText?: string
  /** Whether to show brand text */
  showText?: boolean
  /** Icon size variant (currently unused - removed for simplicity) */
  /** Custom aria-label for accessibility */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationLogoProps>(), {
  brandText: 'Fablecraft',
  showText: true,
  ariaLabel: 'Navigate to homepage',
})

// Define emits
const emit = defineEmits<{
  click: []
}>()

// Handle click event
const handleClick = () => {
  emit('click')
}

// Theme-aware hues derived from CSS variables
const primaryHue = computed(() => `var(--primary)`)
const accentHue = computed(() => `var(--accent)`)
const lightFeatherHue = computed(() => `var(--primary-foreground)`) // creates a light edge

// Compute logo classes (matching React original)
const logoClasses = computed(() => {
  return cn(
    'group flex items-center space-x-3 cursor-pointer',
    'transition-all duration-300 hover:scale-105',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'rounded-lg p-2 -m-2',
    props.class
  )
})
</script>

<style scoped>
/* Icon container with premium glass + sheen */
.icon-container {
  @apply w-14 h-14 rounded-xl flex items-center justify-center shadow-md;
}

 .premium-feather {
  background:
    linear-gradient(135deg, hsl(var(--card) / 0.35), hsl(var(--card) / 0.18));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid hsl(var(--border) / 0.35);
  box-shadow:
    0 12px 30px rgba(0,0,0,0.20),
    inset 0 1px 0 hsl(var(--foreground) / 0.06);
  position: relative;
  overflow: hidden;
}

.premium-feather svg {
  filter: drop-shadow(0 0 12px hsl(var(--primary) / 0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.25));
}

.premium-feather::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0));
  opacity: 0.6;
  pointer-events: none;
  mix-blend-mode: soft-light;
}

.premium-feather::before {
  content: '';
  position: absolute;
  top: -120%;
  left: -160%;
  width: 60%;
  height: 340%;
  background: linear-gradient(120deg, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0));
  transform: translateX(0) rotate(25deg);
  transition: transform 600ms ease, opacity 600ms ease;
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: screen;
}

.premium-feather:hover::before {
  transform: translateX(360%) rotate(25deg);
  opacity: 0.9;
}

/* Brand text (slightly smaller for better proportions) */
.brand-text {
  @apply text-2xl font-black text-foreground tracking-wide;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .premium-feather,
  .brand-text {
    @apply transition-none;
  }

  .premium-feather:hover::before {
    transform: none;
    opacity: 0.6;
  }
}
</style>
