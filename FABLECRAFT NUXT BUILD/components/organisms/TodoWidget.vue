<template>
  <DashboardWidget
    title="Tasks"
    subtitle="Your writing to-dos"
    icon="lucide:check-square"
    icon-color="primary"
    :loading="loading"
    :error="error"
    :empty="todos.length === 0"
    empty-icon="lucide:clipboard-list"
    empty-title="No tasks yet"
    empty-message="Add your first writing task"
  >
    <!-- Add Task Button -->
    <template #actions>
      <Button
        variant="ghost"
        size="sm"
        class="h-8"
        @click="showAddTask = !showAddTask"
      >
        <Icon name="lucide:plus" class="h-4 w-4 mr-1" />
        Add
      </Button>
    </template>
    
    <!-- Main Content -->
    <div class="space-y-2">
      <!-- Add Task Form -->
      <div v-if="showAddTask" class="pb-3 mb-3 border-b border-border/50">
        <form @submit.prevent="addTodo" class="flex gap-2">
          <Input
            v-model="newTodoText"
            placeholder="Add a writing task..."
            class="flex-1 h-9 text-sm"
            :disabled="saving"
            @keydown.escape="cancelAdd"
          />
          <Button
            type="submit"
            size="sm"
            :disabled="!newTodoText.trim() || saving"
          >
            Add
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            @click="cancelAdd"
          >
            <Icon name="lucide:x" class="h-4 w-4" />
          </Button>
        </form>
      </div>
      
      <!-- Todo List -->
      <div class="space-y-1 max-h-[400px] overflow-y-auto">
        <div
          v-for="todo in sortedTodos"
          :key="todo.id"
          class="group flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Checkbox
            :checked="todo.completed"
            class="mt-0.5"
            @update:checked="(checked) => toggleTodo(todo.id, checked)"
          />
          
          <div class="flex-1 min-w-0">
            <Text
              size="sm"
              :class="[
                'break-words transition-all',
                todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              ]"
            >
              {{ todo.text }}
            </Text>
            <Text
              v-if="todo.due_date"
              size="xs"
              :class="[
                'mt-0.5',
                isOverdue(todo.due_date) && !todo.completed ? 'text-destructive' : 'text-muted-foreground'
              ]"
            >
              <Icon name="lucide:calendar" class="inline h-3 w-3 mr-1" />
              {{ formatDueDate(todo.due_date) }}
            </Text>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            class="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            @click="deleteTodo(todo.id)"
          >
            <Icon name="lucide:trash-2" class="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Footer Stats -->
    <template #footer>
      <div class="flex items-center justify-between text-xs text-muted-foreground">
        <span>{{ completedCount }} of {{ todos.length }} completed</span>
        <span v-if="todos.length > 0" class="text-primary">
          {{ Math.round((completedCount / todos.length) * 100) }}% done
        </span>
      </div>
    </template>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Todo {
  id: string
  text: string
  completed: boolean
  due_date?: string
  created_at: string
  order: number
}

// State
const todos = ref<Todo[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const saving = ref(false)
const showAddTask = ref(false)
const newTodoText = ref('')

// Mock data for now (will be replaced with Supabase)
const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'Write 500 words for Chapter 3',
    completed: false,
    due_date: new Date(Date.now() + 86400000).toISOString(),
    created_at: new Date().toISOString(),
    order: 0
  },
  {
    id: '2',
    text: 'Research Victorian era fashion',
    completed: true,
    created_at: new Date().toISOString(),
    order: 1
  },
  {
    id: '3',
    text: 'Outline the plot twist in Act 2',
    completed: false,
    created_at: new Date().toISOString(),
    order: 2
  }
]

// Computed
const sortedTodos = computed(() => {
  return [...todos.value].sort((a, b) => {
    // Incomplete tasks first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    // Then by order
    return a.order - b.order
  })
})

const completedCount = computed(() => {
  return todos.value.filter(t => t.completed).length
})

// Methods
const loadTodos = async () => {
  loading.value = true
  error.value = null
  
  try {
    // TODO: Replace with Supabase fetch
    await new Promise(resolve => setTimeout(resolve, 500))
    todos.value = [...mockTodos]
  } catch (err: any) {
    error.value = 'Failed to load tasks'
    console.error('Error loading todos:', err)
  } finally {
    loading.value = false
  }
}

const addTodo = async () => {
  if (!newTodoText.value.trim()) return
  
  saving.value = true
  
  try {
    // TODO: Replace with Supabase insert
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.value.trim(),
      completed: false,
      created_at: new Date().toISOString(),
      order: todos.value.length
    }
    
    todos.value.push(newTodo)
    newTodoText.value = ''
    showAddTask.value = false
  } catch (err: any) {
    error.value = 'Failed to add task'
    console.error('Error adding todo:', err)
  } finally {
    saving.value = false
  }
}

const toggleTodo = async (id: string, completed: boolean) => {
  const todo = todos.value.find(t => t.id === id)
  if (!todo) return
  
  try {
    // TODO: Replace with Supabase update
    todo.completed = completed
  } catch (err: any) {
    error.value = 'Failed to update task'
    console.error('Error toggling todo:', err)
    // Revert on error
    todo.completed = !completed
  }
}

const deleteTodo = async (id: string) => {
  const index = todos.value.findIndex(t => t.id === id)
  if (index === -1) return
  
  const todo = todos.value[index]
  todos.value.splice(index, 1)
  
  try {
    // TODO: Replace with Supabase delete
  } catch (err: any) {
    error.value = 'Failed to delete task'
    console.error('Error deleting todo:', err)
    // Revert on error
    todos.value.splice(index, 0, todo)
  }
}

const cancelAdd = () => {
  newTodoText.value = ''
  showAddTask.value = false
}

const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date()
}

const formatDueDate = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (d.toDateString() === now.toDateString()) {
    return 'Today'
  } else if (d.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  } else if (d < now) {
    return 'Overdue'
  } else {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

// Lifecycle
onMounted(() => {
  loadTodos()
})
</script>