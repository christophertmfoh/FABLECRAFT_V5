<template>
  <DashboardWidget
    title="Projects"
    subtitle="Your creative works"
    icon="lucide:folder-open"
    icon-color="secondary"
    :loading="loading"
    :error="error"
    :empty="projects.length === 0"
    empty-icon="lucide:folder-plus"
    empty-title="No projects yet"
    empty-message="Start your first writing project"
  >
    <!-- Create Project Button -->
    <template #actions>
      <Button
        variant="default"
        size="sm"
        class="h-8"
        @click="$emit('create')"
      >
        <Icon name="lucide:plus" class="h-4 w-4 mr-1" />
        New
      </Button>
    </template>
    
    <!-- Empty Action -->
    <template #empty-action>
      <Button
        variant="outline"
        size="sm"
        @click="$emit('create')"
      >
        <Icon name="lucide:plus" class="h-4 w-4 mr-1" />
        Create Your First Project
      </Button>
    </template>
    
    <!-- Projects Grid -->
    <div class="grid grid-cols-1 gap-3">
      <div
        v-for="project in recentProjects"
        :key="project.id"
        class="group relative p-4 rounded-lg border border-border/50 hover:border-primary/50 bg-card/30 hover:bg-card/50 transition-all cursor-pointer"
        @click="$emit('open', project)"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <!-- Project Title & Type -->
            <div class="flex items-center gap-2 mb-1">
              <Icon 
                :name="getProjectIcon(project.type)" 
                class="h-4 w-4 text-primary flex-shrink-0"
              />
              <Heading tag="h4" size="h5" class="text-foreground truncate">
                {{ project.title }}
              </Heading>
            </div>
            
            <!-- Project Description -->
            <Text size="sm" class="text-muted-foreground line-clamp-2 mb-2">
              {{ project.description || 'No description' }}
            </Text>
            
            <!-- Project Stats -->
            <div class="flex items-center gap-4 text-xs text-muted-foreground">
              <div class="flex items-center gap-1">
                <Icon name="lucide:file-text" class="h-3 w-3" />
                <span>{{ formatWordCount(project.word_count) }} words</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon name="lucide:calendar" class="h-3 w-3" />
                <span>{{ formatDate(project.updated_at) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Project Status -->
          <div class="flex flex-col items-end gap-2">
            <Badge 
              :variant="getStatusVariant(project.status)"
              class="text-xs"
            >
              {{ formatStatus(project.status) }}
            </Badge>
            
            <!-- Progress Bar -->
            <div v-if="project.target_word_count" class="w-20">
              <div class="h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  class="h-full bg-primary transition-all"
                  :style="`width: ${Math.min(100, (project.word_count / project.target_word_count) * 100)}%`"
                />
              </div>
              <Text size="xs" class="text-muted-foreground mt-1 text-center">
                {{ Math.round((project.word_count / project.target_word_count) * 100) }}%
              </Text>
            </div>
          </div>
        </div>
        
        <!-- Quick Actions (shown on hover) -->
        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              class="h-7 w-7 p-0"
              @click.stop="$emit('edit', project)"
            >
              <Icon name="lucide:edit-3" class="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              class="h-7 w-7 p-0"
              @click.stop="duplicateProject(project)"
            >
              <Icon name="lucide:copy" class="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              class="h-7 w-7 p-0 text-destructive"
              @click.stop="archiveProject(project)"
            >
              <Icon name="lucide:archive" class="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <template #footer>
      <div class="flex items-center justify-between">
        <Text size="xs" class="text-muted-foreground">
          {{ projects.length }} total project{{ projects.length !== 1 ? 's' : '' }}
        </Text>
        <Button
          v-if="projects.length > 3"
          variant="ghost"
          size="sm"
          class="h-7 text-xs"
          @click="$emit('view-all')"
        >
          View All
          <Icon name="lucide:arrow-right" class="h-3 w-3 ml-1" />
        </Button>
      </div>
    </template>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Project {
  id: string
  title: string
  description?: string
  type: 'novel' | 'short-story' | 'poetry' | 'screenplay' | 'blog' | 'other'
  status: 'draft' | 'in-progress' | 'review' | 'completed' | 'published'
  word_count: number
  target_word_count?: number
  created_at: string
  updated_at: string
  genre?: string
  tags?: string[]
}

// Emits
defineEmits<{
  create: []
  open: [project: Project]
  edit: [project: Project]
  'view-all': []
}>()

// State
const projects = ref<Project[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Mock data for now
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'The Midnight Garden',
    description: 'A magical realism novel about a woman who discovers a portal to another world in her grandmother\'s garden.',
    type: 'novel',
    status: 'in-progress',
    word_count: 42567,
    target_word_count: 80000,
    genre: 'Fantasy',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    tags: ['magic', 'family', 'mystery']
  },
  {
    id: '2',
    title: 'Coffee Shop Chronicles',
    description: 'A collection of interconnected short stories set in a local coffee shop.',
    type: 'short-story',
    status: 'review',
    word_count: 15234,
    target_word_count: 20000,
    genre: 'Contemporary',
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
    tags: ['slice-of-life', 'romance', 'humor']
  },
  {
    id: '3',
    title: 'Echoes of Tomorrow',
    description: 'A sci-fi screenplay about time travelers trying to prevent an apocalypse.',
    type: 'screenplay',
    status: 'draft',
    word_count: 8902,
    genre: 'Science Fiction',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    tags: ['time-travel', 'dystopia', 'action']
  }
]

// Computed
const recentProjects = computed(() => {
  return [...projects.value]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3)
})

// Methods
const loadProjects = async () => {
  loading.value = true
  error.value = null
  
  try {
    // TODO: Replace with Supabase fetch
    await new Promise(resolve => setTimeout(resolve, 500))
    projects.value = [...mockProjects]
  } catch (err: any) {
    error.value = 'Failed to load projects'
    console.error('Error loading projects:', err)
  } finally {
    loading.value = false
  }
}

const getProjectIcon = (type: Project['type']) => {
  const icons = {
    'novel': 'lucide:book',
    'short-story': 'lucide:file-text',
    'poetry': 'lucide:feather',
    'screenplay': 'lucide:film',
    'blog': 'lucide:pen-tool',
    'other': 'lucide:folder'
  }
  return icons[type] || icons.other
}

const getStatusVariant = (status: Project['status']) => {
  const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    'draft': 'outline',
    'in-progress': 'default',
    'review': 'secondary',
    'completed': 'secondary',
    'published': 'default'
  }
  return variants[status] || 'outline'
}

const formatStatus = (status: Project['status']) => {
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

const duplicateProject = async (project: Project) => {
  // TODO: Implement duplication
  console.log('Duplicate project:', project)
}

const archiveProject = async (project: Project) => {
  // TODO: Implement archiving
  console.log('Archive project:', project)
}

// Lifecycle
onMounted(() => {
  loadProjects()
})
</script>