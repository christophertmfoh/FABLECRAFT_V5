<template>
  <nav 
    class="navigation-menu"
    :class="navigationMenuClasses"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <div class="nav-items">
      <!-- Simplified: Just text links for now -->
      <button
        v-for="item in navigationItems"
        :key="item.id"
        class="text-sm font-semibold tracking-wide cursor-pointer uppercase px-3 py-2 hover:text-primary transition-colors"
        @click="() => handleNavigate(item, item.href)"
      >
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

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
    'flex items-center',
    props.showItems ? 'block' : 'hidden',
    props.class
  )
})
</script>

<style scoped>
.nav-items {
  @apply flex items-center space-x-8;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .navigation-menu {
    @apply hidden;
  }
}
</style>