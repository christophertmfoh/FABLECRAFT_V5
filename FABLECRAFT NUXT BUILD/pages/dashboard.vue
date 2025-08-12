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
          <div class="py-8 sm:py-12">
            <Container size="xl">
              <!-- Dashboard Header -->
              <div class="mb-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-start gap-4">
                    <!-- User Avatar -->
                    <div v-if="avatarUrl || profileLoading" class="flex-shrink-0">
                      <div v-if="profileLoading" class="w-14 h-14 rounded-full bg-muted animate-pulse" />
                      <img
                        v-else-if="avatarUrl"
                        :src="avatarUrl"
                        :alt="displayName"
                        class="w-14 h-14 rounded-full object-cover border-2 border-border"
                      />
                    </div>
                    
                    <!-- Welcome Message -->
                    <div>
                      <Heading tag="h1" size="h3" class="text-foreground mb-1">
                        <span v-if="profileLoading" class="inline-flex items-center gap-2">
                          Welcome back
                          <span class="inline-block w-32 h-6 bg-muted rounded animate-pulse" />
                        </span>
                        <span v-else>
                          Welcome back, {{ displayName }}
                        </span>
                      </Heading>
                      <Text size="sm" class="text-muted-foreground">
                        <span v-if="profile?.bio">{{ profile.bio }}</span>
                        <span v-else>Ready to write something amazing today?</span>
                      </Text>
                    </div>
                  </div>
                  
                  <!-- Create Project Button -->
                  <Button
                    variant="default"
                    size="default"
                    @click="handleNewProject"
                  >
                    <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </div>
              </div>

              <!-- Profile Completion Reminder -->
              <div v-if="!profileLoading && (!profile?.full_name || !profile?.username)" 
                   class="mb-6 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Icon name="lucide:info" class="h-4 w-4 text-primary" />
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
            </Container>
          </div>
        </Section>

        <!-- Dashboard Widgets -->
        <Section spacing="none" class="dashboard-widgets">
          <Container size="xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <!-- Todo Widget -->
              <TodoWidget />
              
              <!-- AI Content Widget -->
              <AIContentWidget />
              
              <!-- Projects Widget -->
              <ProjectsWidget 
                @create="handleNewProject"
                @open="handleOpenProject"
                @edit="handleEditProject"
                @view-all="showListView = true"
              />
              
              <!-- Writing Goals Widget -->
              <WritingGoalsWidget 
                @view-stats="handleViewStats"
              />
            </div>
          </Container>
        </Section>

        <!-- Projects Grid/List Section -->
        <Section spacing="none" class="projects-section">
          <Container size="xl">
            <div class="pb-8">
              <!-- Section Header -->
              <div class="flex items-center justify-between mb-6">
                <div>
                  <Heading tag="h2" size="h4" class="text-foreground">
                    All Projects
                  </Heading>
                  <Text size="sm" class="text-muted-foreground mt-1">
                    Manage and organize your creative works
                  </Text>
                </div>
                
                <!-- View Toggle -->
                <div class="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-8"
                    :class="{ 'bg-muted': !showListView }"
                    @click="showListView = false"
                  >
                    <Icon name="lucide:layout-grid" class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-8"
                    :class="{ 'bg-muted': showListView }"
                    @click="showListView = true"
                  >
                    <Icon name="lucide:layout-list" class="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <!-- Projects Display -->
              <div v-if="allProjects.length === 0" class="text-center py-12 border-2 border-dashed border-border/50 rounded-lg">
                <Icon name="lucide:folder-open" class="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <Text size="lg" class="text-muted-foreground mb-2">
                  No projects yet
                </Text>
                <Text size="sm" class="text-muted-foreground/70 mb-4">
                  Start your first writing project to see it here
                </Text>
                <Button
                  variant="outline"
                  @click="handleNewProject"
                >
                  <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </div>
              
              <!-- Grid View -->
              <div v-else-if="!showListView" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div
                  v-for="project in allProjects"
                  :key="project.id"
                  class="group relative p-5 rounded-lg border border-border/50 hover:border-primary/50 bg-card/30 hover:bg-card/50 transition-all cursor-pointer"
                  @click="handleOpenProject(project)"
                >
                  <div class="flex items-start justify-between gap-3 mb-3">
                    <Icon 
                      :name="getProjectIcon(project.type)" 
                      class="h-5 w-5 text-primary flex-shrink-0"
                    />
                    <Badge 
                      :variant="getStatusVariant(project.status)"
                      class="text-xs"
                    >
                      {{ formatStatus(project.status) }}
                    </Badge>
                  </div>
                  
                  <Heading tag="h3" size="h5" class="text-foreground mb-2">
                    {{ project.title }}
                  </Heading>
                  
                  <Text size="sm" class="text-muted-foreground line-clamp-2 mb-3">
                    {{ project.description || 'No description' }}
                  </Text>
                  
                  <div class="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{{ formatWordCount(project.word_count) }} words</span>
                    <span>{{ formatDate(project.updated_at) }}</span>
                  </div>
                  
                  <!-- Progress Bar -->
                  <div v-if="project.target_word_count" class="mt-3">
                    <div class="h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-primary transition-all"
                        :style="`width: ${Math.min(100, (project.word_count / project.target_word_count) * 100)}%`"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- List View -->
              <div v-else class="space-y-2">
                <div
                  v-for="project in allProjects"
                  :key="project.id"
                  class="group flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/50 bg-card/30 hover:bg-card/50 transition-all cursor-pointer"
                  @click="handleOpenProject(project)"
                >
                  <Icon 
                    :name="getProjectIcon(project.type)" 
                    class="h-5 w-5 text-primary flex-shrink-0"
                  />
                  
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <Heading tag="h4" size="h5" class="text-foreground">
                        {{ project.title }}
                      </Heading>
                      <Badge 
                        :variant="getStatusVariant(project.status)"
                        class="text-xs"
                      >
                        {{ formatStatus(project.status) }}
                      </Badge>
                    </div>
                    <Text size="sm" class="text-muted-foreground truncate">
                      {{ project.description || 'No description' }}
                    </Text>
                  </div>
                  
                  <div class="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>{{ formatWordCount(project.word_count) }} words</span>
                    <span>{{ formatDate(project.updated_at) }}</span>
                  </div>
                  
                  <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-8 w-8 p-0"
                      @click.stop="handleEditProject(project)"
                    >
                      <Icon name="lucide:edit-3" class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="h-8 w-8 p-0"
                      @click.stop="handleArchiveProject(project)"
                    >
                      <Icon name="lucide:archive" class="h-4 w-4" />
                    </Button>
                  </div>
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

// Dashboard state
const showListView = ref(false)

// Mock project data (will be replaced with Supabase)
const allProjects = ref([
  {
    id: '1',
    title: 'The Midnight Garden',
    description: 'A magical realism novel about a woman who discovers a portal to another world in her grandmother\'s garden.',
    type: 'novel',
    status: 'in-progress',
    word_count: 42567,
    target_word_count: 80000,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '2',
    title: 'Coffee Shop Chronicles',
    description: 'A collection of interconnected short stories set in a local coffee shop.',
    type: 'short-story',
    status: 'review',
    word_count: 15234,
    target_word_count: 20000,
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '3',
    title: 'Echoes of Tomorrow',
    description: 'A sci-fi screenplay about time travelers trying to prevent an apocalypse.',
    type: 'screenplay',
    status: 'draft',
    word_count: 8902,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  }
])

// Dashboard specific actions
const handleNewProject = () => {
  // TODO: Implement new project creation modal
  console.log('Create new project')
}

const handleOpenProject = (project: any) => {
  // TODO: Navigate to project editor
  console.log('Open project:', project)
  // navigateTo(`/projects/${project.id}`)
}

const handleEditProject = (project: any) => {
  // TODO: Open project settings modal
  console.log('Edit project:', project)
}

const handleArchiveProject = (project: any) => {
  // TODO: Archive project
  console.log('Archive project:', project)
}

const handleViewStats = () => {
  // TODO: Navigate to analytics page
  console.log('View writing stats')
  // navigateTo('/analytics')
}

// Helper functions for projects
const getProjectIcon = (type: string) => {
  const icons: Record<string, string> = {
    'novel': 'lucide:book',
    'short-story': 'lucide:file-text',
    'poetry': 'lucide:feather',
    'screenplay': 'lucide:film',
    'blog': 'lucide:pen-tool',
    'other': 'lucide:folder'
  }
  return icons[type] || icons.other
}

const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' | 'destructive' => {
  const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    'draft': 'outline',
    'in-progress': 'default',
    'review': 'secondary',
    'completed': 'secondary',
    'published': 'default'
  }
  return variants[status] || 'outline'
}

const formatStatus = (status: string) => {
  return status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const formatWordCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

const formatDate = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffHours < 1) {
    return 'Just now'
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else if (diffDays < 7) {
    return `${diffDays}d ago`
  } else {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

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