<template>
  <AtomsDropdownMenu>
    <!-- User Menu Trigger -->
    <AtomsDropdownMenuTrigger as-child>
      <AtomsButton
        :class="triggerClasses"
        :aria-label="triggerAriaLabel"
      >
        <span class="user-info">
          <AtomsAtomIcon 
            name="lucide:user-circle"
            size="sm"
            class="mr-2"
            aria-hidden="true"
          />
          Welcome {{ displayName }}
          <AtomsAtomIcon
            name="lucide:chevron-down"
            size="sm"
            class="ml-2 group-hover:rotate-180 transition-transform duration-300"
            aria-hidden="true"
          />
        </span>
      </AtomsButton>
    </AtomsDropdownMenuTrigger>

    <!-- User Menu Content -->
    <AtomsDropdownMenuContent 
      align="end"
      :class="contentClasses"
    >
      <!-- Workspace Section -->
      <div class="menu-section">
        <AtomsDropdownMenuLabel>
          Workspace
        </AtomsDropdownMenuLabel>
        
        <AtomsDropdownMenuItem
          :class="menuItemClasses"
          @click="() => handleNavigate('projects')"
        >
          <AtomsAtomIcon
            name="lucide:book-open"
            size="sm"
            class="text-primary mr-3"
            aria-hidden="true"
          />
          <div class="menu-item-content">
            <div class="menu-item-title">Creative Workspace</div>
            <div class="menu-item-description">
              Projects, characters & world bible
            </div>
          </div>
        </AtomsDropdownMenuItem>
      </div>

      <AtomsDropdownMenuSeparator />

      <!-- Account Section -->
      <div class="menu-section">
        <AtomsDropdownMenuLabel>
          Account
        </AtomsDropdownMenuLabel>
        
        <AtomsDropdownMenuItem
          :class="menuItemClasses"
          @click="() => handleNavigate('profile')"
        >
          <AtomsAtomIcon
            name="lucide:user"
            size="sm"
            class="text-primary mr-3"
            aria-hidden="true"
          />
          <div class="menu-item-content">
            <div class="menu-item-title">Profile & Settings</div>
            <div class="menu-item-description">
              Manage your account
            </div>
          </div>
        </AtomsDropdownMenuItem>
      </div>

      <AtomsDropdownMenuSeparator />

      <!-- Community Section -->
      <div class="menu-section">
        <AtomsDropdownMenuLabel>
          Community
        </AtomsDropdownMenuLabel>
        
        <AtomsDropdownMenuItem
          :class="menuItemClasses"
          @click="() => handleNavigate('community')"
        >
          <AtomsAtomIcon
            name="lucide:users"
            size="sm"
            class="text-primary mr-3"
            aria-hidden="true"
          />
          <div class="menu-item-content">
            <div class="menu-item-title">Writer Community</div>
            <div class="menu-item-description">
              Connect with other writers
            </div>
          </div>
        </AtomsDropdownMenuItem>
      </div>

      <AtomsDropdownMenuSeparator />

      <!-- Sign Out Section -->
      <div class="menu-section">
        <AtomsDropdownMenuItem
          :class="signOutClasses"
          @click="handleLogout"
        >
          <AtomsAtomIcon
            name="lucide:log-out"
            size="sm"
            class="text-destructive mr-3"
            aria-hidden="true"
          />
          <span class="font-medium text-destructive">
            Sign Out
          </span>
        </AtomsDropdownMenuItem>
      </div>
    </AtomsDropdownMenuContent>
  </AtomsDropdownMenu>
</template>

<script setup lang="ts">
import { cn } from '~/components/atoms/Utils'

// User interface
interface User {
  username?: string
  email?: string
  id?: string
}

// Component props interface
interface UserDropdownProps {
  /** User object with details */
  user: User
  /** Loading state for logout */
  loading?: boolean
  /** Additional CSS classes */
  class?: string | Record<string, boolean> | string[]
}

// Define props with defaults
const props = withDefaults(defineProps<UserDropdownProps>(), {
  loading: false,
})

// Define emits
const emit = defineEmits<{
  navigate: [view: string]
  logout: []
}>()

// Computed display name
const displayName = computed(() => {
  return props.user?.username || props.user?.email?.split('@')[0] || 'User'
})

// Computed trigger aria label
const triggerAriaLabel = computed(() => {
  return `User menu for ${displayName.value}`
})

// Handle navigation
const handleNavigate = (view: string) => {
  emit('navigate', view)
}

// Handle logout
const handleLogout = () => {
  emit('logout')
}

// Compute trigger classes
const triggerClasses = computed(() => {
  return cn(
    'group bg-primary hover:bg-primary/90 text-primary-foreground',
    'px-4 py-2 font-semibold shadow-md hover:shadow-lg',
    'transition-all duration-300 hover:scale-105 rounded-xl',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    props.loading && 'opacity-50 cursor-not-allowed',
    props.class
  )
})

// Compute content classes
const contentClasses = computed(() => {
  return cn(
    'w-64 bg-card/95 backdrop-blur-xl border border-border shadow-xl rounded-xl mt-2'
  )
})

// Compute menu item classes
const menuItemClasses = computed(() => {
  return cn(
    'cursor-pointer hover:bg-accent/10 py-3 px-4 rounded-lg transition-colors',
    'focus:bg-accent/10 focus:outline-none'
  )
})

// Compute sign out classes
const signOutClasses = computed(() => {
  return cn(
    'cursor-pointer hover:bg-destructive/10 py-3 px-4 rounded-lg transition-colors',
    'focus:bg-destructive/10 focus:outline-none'
  )
})
</script>

<style scoped>
.user-info {
  @apply flex items-center;
}

.menu-section {
  @apply p-2 border-b border-border/20 last:border-b-0;
}

.menu-item-content {
  @apply flex-1;
}

.menu-item-title {
  @apply font-medium text-foreground;
}

.menu-item-description {
  @apply text-xs text-muted-foreground;
}

/* Enhanced focus styles */
:deep(.focus\:bg-accent\/10:focus) {
  @apply ring-2 ring-primary ring-offset-2 ring-offset-background;
}

:deep(.focus\:bg-destructive\/10:focus) {
  @apply ring-2 ring-destructive ring-offset-2 ring-offset-background;
}

/* Smooth transitions with reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .transition-colors,
  .transition-transform {
    @apply transition-none;
  }
  
  .group-hover\:rotate-180 {
    @apply rotate-0;
  }
  
  .hover\:scale-105 {
    @apply scale-100;
  }
}
</style>