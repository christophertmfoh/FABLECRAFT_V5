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
          <!-- ✅ HYDRATION FIX: Authentication Section with ClientOnly -->
          <ClientOnly v-if="showAuthButton">
            <template v-if="isAuthenticated && (supabaseUser || user)">
              <!-- Authenticated User Dropdown -->
              <DropdownMenu>
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
                      <AtomIcon name="lucide:user-circle" class="h-4 w-4" aria-hidden="true" />
                    </template>
                    Welcome {{ displayName }}
                    <template #trailing>
                      <AtomIcon
                        name="lucide:chevron-down"
                        class="h-4 w-4 group-hover:rotate-180 transition-transform duration-300"
                        aria-hidden="true"
                      />
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
                      <AtomIcon
                        name="lucide:book-open"
                        class="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
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
                      <AtomIcon
                        name="lucide:user"
                        class="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
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
                      <AtomIcon
                        name="lucide:users"
                        class="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
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
                      <AtomIcon
                        name="lucide:log-out"
                        class="h-4 w-4 text-destructive"
                        aria-hidden="true"
                      />
                      <span class="font-medium text-destructive"> Sign Out </span>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            </template>

            <!-- Unauthenticated User Sign In Button -->
            <template v-else>
              <GradientButton
                variant="default"
                size="default"
                :show-gradient-overlay="true"
                gradient-colors="from-primary-foreground/25 to-transparent"
                class="px-4 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
                :aria-label="authButtonText"
                @click="handleAuthClick"
              >
                <template #leading>
                  <AtomIcon name="lucide:users" class="h-4 w-4" aria-hidden="true" />
                </template>
                {{ authButtonText }}
              </GradientButton>
            </template>
            
            <!-- ✅ HYDRATION FIX: Fallback for SSR -->
            <template #fallback>
              <div class="w-32 h-10 bg-muted/20 rounded-xl animate-pulse" aria-hidden="true" />
            </template>
          </ClientOnly>

          <!-- ✅ HYDRATION FIX: Advanced Theme Toggle -->
          <ClientOnly>
            <ThemeToggle />
            <template #fallback>
              <div class="w-10 h-10 bg-muted/20 rounded-lg animate-pulse" aria-hidden="true" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </Container>
  </nav>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'
import DropdownMenuItem from '~/components/atoms/DropdownMenuItem.vue'
import { logger } from '~/utils/logger'

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

// ✅ HYDRATION FIX: Authentication composables with SSR safety
const supabaseUser = useSupabaseUser()
const supabase = useSupabaseClient()

// ✅ HYDRATION FIX: Track client hydration state
const isClientHydrated = ref(false)

// ✅ HYDRATION FIX: Compute authentication state with hydration safety
const isAuthenticated = computed(() => {
  // During SSR, only use prop value to prevent hydration mismatch
  if (!isClientHydrated.value) {
    return props.isAuthenticated || false
  }
  // After hydration, include Supabase user state
  return props.isAuthenticated || !!supabaseUser.value
})

// ✅ HYDRATION FIX: Compute display name with hydration safety
const displayName = computed(() => {
  // During SSR, use fallback to prevent hydration mismatch
  if (!isClientHydrated.value) {
    return 'User'
  }
  // After hydration, use actual user data
  return (
    supabaseUser.value?.user_metadata?.username ||
    supabaseUser.value?.email?.split('@')[0] ||
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

// Handle logout
const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
    emit('auth:logout')
  } catch (error) {
    logger.error('Error during logout:', error)
  }
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

// ✅ HYDRATION FIX: Initialize client hydration on mount
onMounted(() => {
  isClientHydrated.value = true
})

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
