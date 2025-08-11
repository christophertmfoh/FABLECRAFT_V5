<template>
  <div
    id="dashboard-page"
    class="min-h-screen bg-background transition-colors duration-300"
  >
    <!-- Background Effects Layer -->
    <ClientOnly>
      <div class="fixed inset-0 pointer-events-none z-0">
        <LazyPaperTexture />
        <LazyGradientNoiseBackdrop />
        <LazyVignetteOverlay strength="subtle" />
      </div>
      
      <template #fallback>
        <div class="fixed inset-0 pointer-events-none z-0" />
      </template>
    </ClientOnly>

    <!-- Main Content Layer -->
    <div class="relative z-10 min-h-screen flex flex-col">
      <!-- Navigation Header -->
      <NavigationHeader
        :is-authenticated="isAuthenticated"
        :user="user"
        @auth:click="handleAuth"
        @auth:logout="handleLogout"
        @navigate="handleNavigate"
        @logo:click="handleHome"
      />

      <!-- Main Dashboard Content -->
      <main id="main-content" class="relative z-20 flex-1">
        <!-- Dashboard Hero Section -->
        <Section spacing="none" class="dashboard-hero">
          <div class="py-12 sm:py-16">
            <Container size="xl">
              <!-- Dashboard Header -->
              <div class="mb-8">
                <div class="flex items-center justify-between">
                  <div class="flex items-start gap-4">
                    <!-- User Avatar -->
                    <div v-if="avatarUrl || profileLoading" class="flex-shrink-0">
                      <div v-if="profileLoading" class="w-16 h-16 rounded-full bg-muted animate-pulse" />
                      <img
                        v-else-if="avatarUrl"
                        :src="avatarUrl"
                        :alt="displayName"
                        class="w-16 h-16 rounded-full object-cover border-2 border-border"
                      />
                    </div>
                    
                    <!-- Welcome Message -->
                    <div>
                      <Heading tag="h1" size="h2" class="text-foreground mb-2">
                        <span v-if="profileLoading" class="inline-flex items-center gap-2">
                          Welcome back
                          <span class="inline-block w-32 h-8 bg-muted rounded animate-pulse" />
                        </span>
                        <span v-else>
                          Welcome back, {{ displayName }}
                        </span>
                      </Heading>
                      <Text size="lg" class="text-muted-foreground">
                        <span v-if="profile?.bio">{{ profile.bio }}</span>
                        <span v-else>Your creative workspace awaits</span>
                      </Text>
                      <Text v-if="profile?.username" size="sm" class="text-muted-foreground/70 mt-1">
                        @{{ profile.username }}
                      </Text>
                    </div>
                  </div>
                  
                  <!-- Quick Actions -->
                  <div class="hidden sm:flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="default"
                      @click="handleNewProject"
                    >
                      <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                    <Button
                      variant="default"
                      size="default"
                      @click="handleQuickWrite"
                    >
                      <Icon name="lucide:pen-tool" class="mr-2 h-4 w-4" />
                      Quick Write
                    </Button>
                  </div>
                </div>
              </div>

              <!-- Profile Completion Reminder -->
              <div v-if="!profileLoading && (!profile?.full_name || !profile?.username)" 
                   class="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Icon name="lucide:info" class="h-5 w-5 text-primary" />
                    <div>
                      <Text size="sm" class="text-foreground font-medium">
                        Complete your profile
                      </Text>
                      <Text size="xs" class="text-muted-foreground">
                        Add your name and username to personalize your experience
                      </Text>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    @click="() => navigateTo('/account')"
                  >
                    Update Profile
                  </Button>
                </div>
              </div>

              <!-- Dashboard Stats Cards (Placeholder) -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card class="border-border/50 bg-card/50 backdrop-blur-sm">
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                      <Text size="sm" class="text-muted-foreground">Total Projects</Text>
                      <Icon name="lucide:book" class="h-4 w-4 text-primary" />
                    </div>
                    <Heading tag="h3" size="h3" class="text-foreground">
                      0
                    </Heading>
                  </div>
                </Card>

                <Card class="border-border/50 bg-card/50 backdrop-blur-sm">
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                      <Text size="sm" class="text-muted-foreground">Words Written</Text>
                      <Icon name="lucide:file-text" class="h-4 w-4 text-primary" />
                    </div>
                    <Heading tag="h3" size="h3" class="text-foreground">
                      0
                    </Heading>
                  </div>
                </Card>

                <Card class="border-border/50 bg-card/50 backdrop-blur-sm">
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                      <Text size="sm" class="text-muted-foreground">Writing Streak</Text>
                      <Icon name="lucide:flame" class="h-4 w-4 text-primary" />
                    </div>
                    <Heading tag="h3" size="h3" class="text-foreground">
                      0 days
                    </Heading>
                  </div>
                </Card>
              </div>
            </Container>
          </div>
        </Section>

        <!-- Main Dashboard Content Area (Empty for now) -->
        <Section spacing="none" class="dashboard-content">
          <Container size="xl">
            <div class="py-8 sm:py-12 min-h-[400px]">
              <!-- Placeholder for future dashboard content -->
              <div class="flex items-center justify-center h-[400px] border-2 border-dashed border-border/50 rounded-lg">
                <div class="text-center">
                  <Icon name="lucide:layout-dashboard" class="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <Text size="lg" class="text-muted-foreground mb-2">
                    Dashboard content coming soon
                  </Text>
                  <Text size="sm" class="text-muted-foreground/70">
                    Your projects, analytics, and creative tools will appear here
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <!-- Footer -->
      <Footer
        @navigate="handleNavigate"
        @social="handleSocialClick"
      />
    </div>

    <!-- Auth Overlay (in case user gets logged out) -->
    <AuthOverlay />
  </div>
</template>

<script setup lang="ts">
// Protect the dashboard route
definePageMeta({
  middleware: 'auth'
})

// Theme composable
const { currentTheme } = useTheme()

// Auth composables
const user = useSupabaseUser()
const supabase = useSupabaseClient()

// Profile composable with real-time updates
const { 
  profile, 
  displayName, 
  avatarUrl, 
  loading: profileLoading,
  error: profileError 
} = useUserProfile()

// Computed properties
const isAuthenticated = computed(() => !!user.value)

// Navigation handlers
const handleAuth = () => {
  if (process.client) {
    const { open } = useAuthOverlay()
    open('login')
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
  if (process.client) {
    window.location.reload()
  }
}

const handleNavigate = (view: string) => {
  if (view === 'home') {
    navigateTo('/')
  } else if (view === 'dashboard') {
    // Already on dashboard, do nothing
    return
  } else {
    navigateTo(`/${view}`)
  }
}

const handleHome = () => {
  navigateTo('/')
}

const handleSocialClick = (platform: string) => {
  // Handle social media clicks
  console.log('Social click:', platform)
}

// Dashboard specific actions
const handleNewProject = () => {
  // TODO: Implement new project creation
  console.log('New project clicked')
}

const handleQuickWrite = () => {
  // TODO: Implement quick write feature
  console.log('Quick write clicked')
}

// TEST REAL-TIME UPDATES:
// 1. Open this dashboard in your browser (must be logged in)
// 2. Open the /account page in another tab
// 3. Update your name, username, or bio in the account page
// 4. Watch the dashboard update automatically without refreshing!
// The profile data syncs in real-time across all tabs/windows

// SEO Meta
useHead({
  title: 'Dashboard - Fablecraft',
  meta: [
    {
      name: 'description',
      content: 'Manage your creative projects and writing workspace'
    }
  ]
})
</script>

<style scoped>
/* Dashboard specific styles */
.dashboard-hero {
  background: linear-gradient(
    180deg,
    hsl(var(--primary) / 0.03) 0%,
    transparent 100%
  );
}

.dashboard-content {
  min-height: calc(100vh - 400px);
}

/* Subtle animation for stats cards */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.dashboard-stats .card:hover {
  animation: float 3s ease-in-out infinite;
}
</style>