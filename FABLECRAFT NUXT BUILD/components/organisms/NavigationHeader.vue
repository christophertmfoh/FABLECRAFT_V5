<template>
  <nav
    :class="headerClasses"
    role="navigation"
    aria-label="Main navigation"
  >
    <Container size="xl" class="py-4">
      <div class="flex items-center justify-between">
        <!-- Brand Logo Section - Using NavigationLogo atom -->
        <NavigationLogo
          :brand-text="brandText"
          :show-text="showBrandText"
          @click="handleLogoClick"
        />

        <!-- Professional Navigation Menu - Using NavigationMenu molecule -->
        <NavigationMenu
          v-if="showNavItems"
          :show-items="showNavItems"
          class="hidden md:flex"
          @navigate="handleNavigate"
        />

        <!-- Navigation Actions -->
        <div class="flex items-center space-x-4">
          <!-- Authentication Section -->
          <template v-if="showAuthButton">
            <!-- Authenticated User Dropdown -->
            <DropdownMenu v-if="isAuthenticated && user">
              <DropdownMenuTrigger as-child>
                <Button
                  class="group bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
                  :aria-label="`User menu for ${displayName}`"
                >
                  <span class="flex items-center">
                    <AtomIcon name="lucide:user-circle" class="mr-2 h-4 w-4" aria-hidden="true" />
                    Welcome {{ displayName }}
                    <AtomIcon 
                      name="lucide:chevron-down" 
                      class="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" 
                      aria-hidden="true" 
                    />
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                class="w-64 bg-card/95 backdrop-blur-xl border border-border shadow-xl rounded-xl mt-2"
              >
                <!-- Workspace Section -->
                <div class="p-2 border-b border-border/20">
                  <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Workspace
                  </div>
                  <DropdownMenuItem
                    class="cursor-pointer hover:bg-accent/10 py-3 px-4 rounded-lg transition-colors"
                    @click="() => handleNavigate('projects')"
                  >
                    <AtomIcon name="lucide:book-open" class="mr-3 h-4 w-4 text-primary" aria-hidden="true" />
                    <div>
                      <div class="font-medium">Creative Workspace</div>
                      <div class="text-xs text-muted-foreground">
                        Projects, characters & world bible
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>

                <!-- Account Section -->
                <div class="p-2 border-b border-border/20">
                  <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Account
                  </div>
                  <DropdownMenuItem
                    class="cursor-pointer hover:bg-accent/10 py-3 px-4 rounded-lg transition-colors"
                    @click="() => handleNavigate('profile')"
                  >
                    <AtomIcon name="lucide:user" class="mr-3 h-4 w-4 text-primary" aria-hidden="true" />
                    <div>
                      <div class="font-medium">Profile & Settings</div>
                      <div class="text-xs text-muted-foreground">
                        Manage your account
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>

                <!-- Community Section -->
                <div class="p-2 border-b border-border/20">
                  <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Community
                  </div>
                  <DropdownMenuItem
                    class="cursor-pointer hover:bg-accent/10 py-3 px-4 rounded-lg transition-colors"
                    @click="() => handleNavigate('community')"
                  >
                    <AtomIcon name="lucide:users" class="mr-3 h-4 w-4 text-primary" aria-hidden="true" />
                    <div>
                      <div class="font-medium">Writer Community</div>
                      <div class="text-xs text-muted-foreground">
                        Connect with other writers
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>

                <!-- Sign Out -->
                <div class="p-2">
                  <DropdownMenuItem
                    class="cursor-pointer hover:bg-destructive/10 py-3 px-4 rounded-lg transition-colors"
                    @click="handleLogout"
                  >
                    <AtomIcon name="lucide:log-out" class="mr-3 h-4 w-4 text-destructive" aria-hidden="true" />
                    <span class="font-medium text-destructive">
                      Sign Out
                    </span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <!-- Unauthenticated User Sign In Button -->
            <Button
              v-else
              class="group bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
              :aria-label="authButtonText"
              @click="handleAuthClick"
            >
              <span class="flex items-center">
                <AtomIcon name="lucide:users" class="mr-2 h-4 w-4" aria-hidden="true" />
                {{ authButtonText }}
              </span>
            </Button>
          </template>

          <!-- Advanced Theme Toggle -->
          <ThemeToggle />
        </div>
      </div>
    </Container>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

// User interface for authentication
interface User {
  id: string
  email?: string
  username?: string
  user_metadata?: {
    username?: string
    email?: string
  }
}

// Component props interface
interface NavigationHeaderProps {
  // Content and visibility
  brandText?: string
  showBrandText?: boolean
  showAuthButton?: boolean
  authButtonText?: string
  showNavItems?: boolean
  
  // User state
  isAuthenticated?: boolean
  user?: User | null
  
  // Styling
  className?: string
  variant?: 'default' | 'transparent' | 'solid'
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationHeaderProps>(), {
  brandText: 'Fablecraft',
  showBrandText: true,
  showAuthButton: true,
  authButtonText: 'Sign Up / Sign In',
  showNavItems: true,
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

// Handle navigation (updated to work with NavigationMenu molecule)
const handleNavigate = (item: any, href?: string) => {
  // If it's a navigation item object, use the id
  const view = typeof item === 'string' ? item : item.id
  emit('navigate', view)
  
  // Navigate to the appropriate route
  if (href) {
    navigateTo(href)
  } else if (view === 'home') {
    navigateTo('/')
  } else {
    navigateTo(`/${view}`)
  }
}

// Compute header classes (matches React version exactly)
const headerClasses = computed(() => {
  return cn(
    'sticky top-0 z-50 backdrop-blur-xl border-b border-border/20 shadow-sm',
    {
      'bg-transparent': props.variant === 'transparent',
      'bg-background/20 border-b border-border shadow-sm': props.variant === 'solid',
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