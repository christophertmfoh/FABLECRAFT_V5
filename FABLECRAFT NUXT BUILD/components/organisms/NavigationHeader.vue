<template>
  <nav
    :class="headerClasses"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <!-- Brand Logo Section -->
        <button
          class="group flex items-center space-x-3 cursor-pointer transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-2 -m-2"
          aria-label="Navigate to homepage"
          @click="handleLogoClick"
        >
          <span class="text-2xl font-bold text-primary">🪶 {{ brandText }}</span>
        </button>

        <!-- Main Navigation Menu (Desktop) -->
        <nav class="hidden md:flex items-center space-x-8" aria-label="Main navigation">
          <button
            v-for="item in navigationItems"
            :key="item.id"
            class="text-sm font-semibold tracking-wide cursor-pointer uppercase px-3 py-2 hover:text-primary transition-colors rounded-md"
            :class="{ 'text-primary font-bold border-b-2 border-primary': item.active }"
            @click="() => handleNavigate(item.id)"
          >
            {{ item.label }}
          </button>
        </nav>

        <!-- Actions Section -->
        <div class="flex items-center space-x-4">
          <!-- Authentication Section -->
          <template v-if="showAuthButton">
            <!-- Unauthenticated User -->
            <Button
              v-if="!isAuthenticated"
              :class="authButtonClasses"
              @click="handleAuthClick"
            >
              {{ authButtonText }}
            </Button>
            
            <!-- Authenticated User Dropdown -->
            <DropdownMenu v-else>
              <DropdownMenuTrigger as-child>
                <Button class="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl">
                  Welcome {{ displayName }}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-64 bg-card/95 backdrop-blur-xl border border-border shadow-xl rounded-xl mt-2">
                <DropdownMenuItem @click="() => handleNavigate('projects')">
                  Creative Workspace
                </DropdownMenuItem>
                <DropdownMenuItem @click="() => handleNavigate('profile')">
                  Profile & Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="handleLogout" class="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>

          <!-- Theme Toggle -->
          <Button
            variant="ghost"
            size="icon"
            class="relative transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Toggle theme"
            @click="handleThemeToggle"
          >
            {{ isDark ? '🌙' : '☀️' }}
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

console.log('🔥 NavigationHeader component loaded!')

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
}

// Component props interface
interface NavigationHeaderProps {
  // Configuration
  showAuthButton?: boolean
  authButtonText?: string
  showNavItems?: boolean
  brandText?: string
  
  // User state
  isAuthenticated?: boolean
  user?: User | null
  
  // Styling
  className?: string
  variant?: 'default' | 'transparent' | 'solid'
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationHeaderProps>(), {
  showAuthButton: true,
  authButtonText: 'Sign Up / Sign In',
  showNavItems: true,
  brandText: 'Fablecraft',
  isAuthenticated: false,
  variant: 'default',
})

// Define emits
const emit = defineEmits<{
  'auth:click': []
  'auth:logout': []
  'navigate': [view: string]
  'logo:click': []
}>()

// Default navigation items
const navigationItems: NavigationItem[] = [
  { id: 'community', label: 'COMMUNITY', href: '/community' },
  { id: 'gallery', label: 'GALLERY', href: '/gallery' },
  { id: 'library', label: 'LIBRARY', href: '/library' },
  { id: 'about', label: 'ABOUT', href: '/about' },
  { id: 'contact', label: 'CONTACT', href: '/contact' }
]

// Authentication composable
const user = useSupabaseUser()
const supabase = useSupabaseClient()

// Compute authentication state
const isAuthenticated = computed(() => {
  return props.isAuthenticated || !!user.value
})

// Compute display name
const displayName = computed(() => {
  return user.value?.user_metadata?.username || user.value?.email?.split('@')[0] || 'User'
})

// Theme system
const { isDark, toggleTheme } = useTheme()

// Handle logo click
const handleLogoClick = () => {
  emit('logo:click')
  navigateTo('/')
}

// Handle authentication click
const handleAuthClick = () => {
  emit('auth:click')
  navigateTo('/auth')
}

// Handle logout
const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
    emit('auth:logout')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

// Handle navigation
const handleNavigate = (view: string) => {
  emit('navigate', view)
  if (view === 'home') {
    navigateTo('/')
  } else {
    navigateTo(`/${view}`)
  }
}

// Handle theme toggle
const handleThemeToggle = () => {
  toggleTheme()
}

// Compute auth button classes
const authButtonClasses = computed(() => {
  return cn(
    'bg-primary hover:bg-primary/90 text-primary-foreground',
    'px-4 py-2 font-semibold shadow-md hover:shadow-lg',
    'transition-all duration-300 hover:scale-105 rounded-xl',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
  )
})

// Compute header classes
const headerClasses = computed(() => {
  return cn(
    'relative z-50 transition-all duration-300',
    {
      'sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-sm': 
        props.variant === 'default',
      'bg-transparent': 
        props.variant === 'transparent',
      'bg-background border-b border-border shadow-sm': 
        props.variant === 'solid',
    },
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