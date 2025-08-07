<template>
  <nav :class="headerClasses" role="navigation" aria-label="Main navigation">
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
          <!-- ✅ FIXED: Authentication Section (no ClientOnly needed) -->
          <template v-if="showAuthButton">
            <!-- Authenticated User Dropdown -->
            <DropdownMenu v-if="isAuthenticated && user">
                <DropdownMenuTrigger as-child>
                  <GradientButton
                    variant="default"
                    size="default"
                    :show-gradient-overlay="true"
                    gradient-colors="from-primary-foreground/25 to-transparent"
                    class="px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
                    :aria-label="`User menu for ${displayName}`"
                  >
                    <template #leading>
                      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </template>
                    Welcome {{ displayName }}
                    <template #trailing>
                      <svg 
                        class="h-4 w-4 group-hover:rotate-180 transition-transform duration-300"
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </template>
                  </GradientButton>
                </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                class="w-64 bg-card/95 backdrop-blur-xl border border-border shadow-xl rounded-xl mt-2"
              >
                <!-- Workspace Section -->
                <div class="p-2 border-b border-border/20">
                  <div
                    class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Workspace
                  </div>
                  <DropdownMenuItem
                    class="cursor-pointer hover:bg-accent/10 py-3 px-4 rounded-lg transition-colors"
                    @select="() => handleNavigate('projects')"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                      <div>
                        <div class="font-medium">Creative Workspace</div>
                        <div class="text-xs text-muted-foreground">
                          Projects, characters & world bible
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>

                <!-- Account Section -->
                <div class="p-2 border-b border-border/20">
                  <div
                    class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Account
                  </div>
                  <DropdownMenuItem
                    class="cursor-pointer hover:bg-accent/10 py-3 px-4 rounded-lg transition-colors"
                    @select="() => handleNavigate('profile')"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <div>
                        <div class="font-medium">Profile & Settings</div>
                        <div class="text-xs text-muted-foreground">Manage your account</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>

                <!-- Community Section -->
                <div class="p-2 border-b border-border/20">
                  <div
                    class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Community
                  </div>
                  <DropdownMenuItem
                    class="cursor-pointer hover:bg-accent/10 py-3 px-4 rounded-lg transition-colors"
                    @select="() => handleNavigate('community')"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="m22 21-3-3 3-3"/>
                        <path d="M16 11h6"/>
                      </svg>
                      <div>
                        <div class="font-medium">Writer Community</div>
                        <div class="text-xs text-muted-foreground">Connect with other writers</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>

                <!-- Sign Out -->
                <div class="p-2">
                  <DropdownMenuItem
                    class="cursor-pointer hover:bg-destructive/10 py-3 px-4 rounded-lg transition-colors"
                    @select="handleLogout"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="h-4 w-4 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16,17 21,12 16,7"/>
                        <line x1="21" x2="9" y1="12" y2="12"/>
                      </svg>
                      <span class="font-medium text-destructive"> Sign Out </span>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <!-- Unauthenticated User Sign In Button -->
            <GradientButton
              v-else
              variant="default"
              size="default"
              :show-gradient-overlay="true"
              gradient-colors="from-primary-foreground/25 to-transparent"
              class="px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
              :aria-label="authButtonText"
              @click="handleAuthClick"
            >
              <template #leading>
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3 3-3"/>
                  <path d="M16 11h6"/>
                </svg>
              </template>
              {{ authButtonText }}
            </GradientButton>
          </template>

          <!-- ✅ FIXED: Theme Toggle (no ClientOnly needed) -->
          <ThemeToggle />
        </div>
      </div>
    </Container>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'
// ✅ PERFORMANCE: Explicit imports for better bundling and faster loading
import NavigationLogo from '~/components/atoms/NavigationLogo.vue'
import NavigationMenu from '~/components/molecules/NavigationMenu.vue'
import Container from '~/components/atoms/Container.vue'
import GradientButton from '~/components/atoms/GradientButton.vue'
import ThemeToggle from '~/components/atoms/ThemeToggle.vue'
import DropdownMenu from '~/components/atoms/DropdownMenu.vue'
import DropdownMenuTrigger from '~/components/atoms/DropdownMenuTrigger.vue'
import DropdownMenuContent from '~/components/atoms/DropdownMenuContent.vue'
import DropdownMenuItem from '~/components/atoms/DropdownMenuItem.vue'
// ✅ PHASE 1: All icons now bundled via Nuxt Icon for zero network requests

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
}

// Define props with defaults
const props = withDefaults(defineProps<NavigationHeaderProps>(), {
  brandText: 'Fablecraft',
  showBrandText: true,
  showAuthButton: true,
  authButtonText: 'Sign Up / Sign In',
  showNavItems: true,
  isAuthenticated: false,
})

// Define emits
const emit = defineEmits<{
  'auth:click': []
  'auth:logout': []
  navigate: [view: string]
  'logo:click': []
}>()

// ✅ FIXED: Simple prop-based authentication (no duplicate logic)
const isAuthenticated = computed(() => props.isAuthenticated)

// ✅ FIXED: Simple prop-based display name
const displayName = computed(() => {
  if (!props.user) return 'User'
  
  return (
    props.user.user_metadata?.username ||
    props.user.email?.split('@')[0] ||
    'User'
  )
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

// Handle logout - delegate to parent
const handleLogout = () => {
  emit('auth:logout')
}

// Handle navigation (updated to work with NavigationMenu molecule)
const handleNavigate = (item: string | { id: string }, href?: string) => {
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

// Note: Removed unnecessary hydration tracking - using props-based auth instead

// Compute header classes (simplified - only using default behavior)
const headerClasses = computed(() => {
  return cn(
    'sticky top-0 z-50 backdrop-blur-xl border-b border-border/20 shadow-sm',
    'bg-transparent', // Always transparent to allow visual effects through
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
