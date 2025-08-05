<template>
  <nav
    :class="headerClasses"
    role="navigation"
    aria-label="Main navigation"
  >
    <AtomsContainer size="xl" class="py-4">
      <div class="flex items-center justify-between">
        <!-- Brand Logo Section -->
        <ANavigationLogo
          :brand-text="brandText"
          :show-text="showBrandText"
          @click="handleLogoClick"
        />

        <!-- Main Navigation Menu (Desktop) -->
        <MNavigationMenu
          v-if="showNavItems"
          :items="navigationItems"
          :show-items="showNavItems"
          class="hidden md:flex"
          @navigate="handleNavigate"
        />

        <!-- Actions Section -->
        <div class="flex items-center space-x-4">
          <!-- Authentication Section -->
          <template v-if="showAuthButton">
            <!-- Authenticated User -->
            <MUserDropdown
              v-if="isAuthenticated && user"
              :user="user"
              :loading="logoutLoading"
              @navigate="handleNavigate"
              @logout="handleLogout"
            />
            
            <!-- Unauthenticated User -->
            <MAuthButton
              v-else
              :text="authButtonText"
              :loading="authLoading"
              @click="handleAuthClick"
            />
          </template>

          <!-- Theme Toggle -->
          <AThemeToggle />
        </div>
      </div>
    </AtomsContainer>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

// User interface
interface User {
  username?: string
  email?: string
  id?: string
}

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
interface NavigationHeaderProps {
  // Configuration
  showAuthButton?: boolean
  authButtonText?: string
  showNavItems?: boolean
  showBrandText?: boolean
  brandText?: string
  
  // User state
  isAuthenticated?: boolean
  user?: User | null
  
  // Loading states
  authLoading?: boolean
  logoutLoading?: boolean
  
  // Navigation items
  navigationItems?: NavigationItem[]
  
  // Styling
  className?: string
  variant?: 'default' | 'transparent' | 'solid'
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationHeaderProps>(), {
  showAuthButton: true,
  authButtonText: 'Sign Up / Sign In',
  showNavItems: true,
  showBrandText: true,
  brandText: 'Fablecraft',
  isAuthenticated: false,
  authLoading: false,
  logoutLoading: false,
  navigationItems: () => [],
  variant: 'default',
})

// Define emits
const emit = defineEmits<{
  'auth:click': []
  'auth:logout': []
  'navigate': [view: string]
  'logo:click': []
}>()

// Authentication composable (check if user is logged in)
const user = useSupabaseUser()

// Compute authentication state
const isAuthenticated = computed(() => {
  return props.isAuthenticated || !!user.value
})

// Handle logo click
const handleLogoClick = () => {
  emit('logo:click')
  // Default behavior: navigate to home
  handleNavigate('home')
}

// Handle authentication click
const handleAuthClick = () => {
  emit('auth:click')
}

// Handle logout
const handleLogout = async () => {
  emit('auth:logout')
}

// Handle navigation
const handleNavigate = (view: string) => {
  emit('navigate', view)
  
  // Default navigation behavior using Nuxt router
  if (view === 'home') {
    navigateTo('/')
  } else {
    navigateTo(`/${view}`)
  }
}

// Compute header classes
const headerClasses = computed(() => {
  return cn(
    // Base styles
    'relative z-50 transition-all duration-300',
    
    // Variant styles
    {
      'sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-sm': 
        props.variant === 'default',
      'bg-transparent': 
        props.variant === 'transparent',
      'bg-background border-b border-border shadow-sm': 
        props.variant === 'solid',
    },
    
    // Custom classes
    props.className
  )
})
</script>

<style scoped>
/* Enhanced backdrop blur effect */
.backdrop-blur-xl {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Smooth border transitions */
.border-border\/20 {
  border-color: hsl(var(--border) / 0.2);
}

/* Responsive navigation adjustments */
@media (max-width: 768px) {
  .py-4 {
    @apply py-3; /* Slightly less padding on mobile */
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-background\/80 {
    @apply bg-background border-2;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    @apply transition-none;
  }
  
  .backdrop-blur-xl {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    @apply bg-background;
  }
}

/* Focus management for keyboard navigation */
.nav:focus-within {
  @apply ring-2 ring-primary ring-offset-2 ring-offset-background;
}

/* Ensure proper z-index stacking */
.relative.z-50 {
  z-index: 50;
}

/* Print styles */
@media print {
  .sticky {
    @apply static;
  }
  
  .backdrop-blur-xl {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    @apply bg-white;
  }
}
</style>