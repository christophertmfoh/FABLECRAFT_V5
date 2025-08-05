<template>
  <nav 
    class="navigation-menu"
    :class="navigationMenuClasses"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <div class="nav-items">
      <ANavigationItem
        v-for="item in navigationItems"
        :key="item.id"
        :label="item.label"
        :href="item.href"
        :active="item.active"
        :aria-label="item.ariaLabel"
        @click="(href) => handleNavigate(item, href)"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '../atoms/Utils'

// Navigation item interface
interface NavigationItem {
  id: string
  label: string
  href?: string
  active?: boolean
  ariaLabel?: string
  disabled?: boolean
}

// Component props interface
interface NavigationMenuProps {
  /** Array of navigation items */
  items?: NavigationItem[]
  /** Custom aria-label for the navigation */
  ariaLabel?: string
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
  /** Show navigation items (for responsive hiding) */
  showItems?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationMenuProps>(), {
  items: () => [],
  ariaLabel: 'Main navigation',
  showItems: true,
})

// Define emits
const emit = defineEmits<{
  navigate: [item: NavigationItem, href?: string]
}>()

// Default navigation items based on React version
const defaultNavigationItems: NavigationItem[] = [
  {
    id: 'community',
    label: 'COMMUNITY',
    href: '/community',
    ariaLabel: 'Navigate to Community page'
  },
  {
    id: 'gallery',
    label: 'GALLERY', 
    href: '/gallery',
    ariaLabel: 'Navigate to Gallery page'
  },
  {
    id: 'library',
    label: 'LIBRARY',
    href: '/library', 
    ariaLabel: 'Navigate to Library page'
  },
  {
    id: 'about',
    label: 'ABOUT',
    href: '/about',
    ariaLabel: 'Navigate to About page'
  },
  {
    id: 'contact',
    label: 'CONTACT',
    href: '/contact',
    ariaLabel: 'Navigate to Contact page'
  }
]

// Use provided items or defaults
const navigationItems = computed(() => {
  return props.items.length > 0 ? props.items : defaultNavigationItems
})

// Handle navigation click
const handleNavigate = (item: NavigationItem, href?: string) => {
  if (item.disabled) return
  
  emit('navigate', item, href)
}

// Compute navigation menu classes
const navigationMenuClasses = computed(() => {
  return cn(
    // Base classes
    'flex items-center',
    
    // Responsive visibility
    props.showItems ? 'block' : 'hidden',
    
    // Custom classes
    props.class
  )
})
</script>

<style scoped>
.navigation-menu {
  /* Container styles handled by utility classes */
}

.nav-items {
  @apply flex items-center space-x-8;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .navigation-menu {
    @apply hidden; /* Hide on mobile - can be shown with showItems prop */
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .nav-items {
    @apply space-x-6; /* Slightly less spacing for high contrast */
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .nav-items * {
    @apply transition-none;
  }
}
</style>