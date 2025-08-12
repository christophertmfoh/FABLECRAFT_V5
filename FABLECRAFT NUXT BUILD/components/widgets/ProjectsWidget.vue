<template>
  <DashboardWidget
    title="Recent Projects"
    subtitle="Your latest writing projects"
    icon="lucide:folder-open"
    icon-color="primary"
    :empty="projects.length === 0"
    empty-icon="lucide:folder-plus"
    empty-title="No projects yet"
    empty-message="Start your first writing project"
  >
    <template #actions>
      <Button
        variant="ghost"
        size="sm"
        class="h-8"
        @click="$emit('create')"
      >
        <Icon name="lucide:plus" class="h-4 w-4 mr-1" />
        New
      </Button>
    </template>
    
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
    
    <div class="space-y-2">
      <div
        v-for="project in projects"
        :key="project.id"
        class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
        @click="$emit('open', project)"
      >
        <div class="flex items-start gap-3">
          <Icon name="lucide:file-text" class="h-5 w-5 text-primary mt-0.5" />
          <div>
            <Text size="sm" class="font-medium text-foreground">
              {{ project.title }}
            </Text>
            <Text size="xs" class="text-muted-foreground">
              {{ project.wordCount }} words • Updated {{ project.lastUpdated }}
            </Text>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          class="h-8 w-8 p-0"
          @click.stop="$emit('edit', project)"
        >
          <Icon name="lucide:more-vertical" class="h-4 w-4" />
        </Button>
      </div>
    </div>
    
    <template #footer>
      <Button
        variant="ghost"
        size="sm"
        class="w-full h-8"
        @click="$emit('view-all')"
      >
        View All Projects
        <Icon name="lucide:arrow-right" class="h-4 w-4 ml-2" />
      </Button>
    </template>
  </DashboardWidget>
</template>

<script setup lang="ts">
defineEmits<{
  create: []
  open: [project: any]
  edit: [project: any]
  'view-all': []
}>()

// Mock data for now
const projects = ref([
  {
    id: '1',
    title: 'The Midnight Garden',
    wordCount: '42,567',
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    title: 'Coffee Shop Chronicles',
    wordCount: '15,234',
    lastUpdated: 'Yesterday'
  },
  {
    id: '3',
    title: 'Echoes of Tomorrow',
    wordCount: '8,902',
    lastUpdated: '3 days ago'
  }
])
</script>