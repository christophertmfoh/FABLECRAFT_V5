<template>
  <DashboardWidget
    title="Tasks"
    :subtitle="`${incompleteTodos.length} active, ${completedTodos.length} completed`"
    icon="lucide:check-square"
    icon-color="primary"
    :loading="loading"
    :error="error"
    :empty="filteredTodos.length === 0 && !showAddTask"
    :empty-icon="activeFilter === 'completed' ? 'lucide:check-circle' : 'lucide:clipboard-list'"
    :empty-title="emptyTitle"
    :empty-message="emptyMessage"
  >
    <!-- Actions -->
    <template #actions>
      <div class="flex items-center gap-2">
        <!-- Filter Dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              size="sm"
              class="h-8"
            >
              <Icon name="lucide:filter" class="h-4 w-4" />
              <span v-if="activeFilter !== 'all'" class="ml-1 text-xs">
                {{ activeFilter }}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="activeFilter = 'all'">
              <Icon name="lucide:list" class="h-4 w-4 mr-2" />
              All Tasks
              <span class="ml-auto text-xs text-muted-foreground">{{ todos.length }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="activeFilter = 'today'">
              <Icon name="lucide:calendar-days" class="h-4 w-4 mr-2" />
              Due Today
              <span class="ml-auto text-xs text-muted-foreground">{{ todayTodos.length }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="activeFilter = 'overdue'">
              <Icon name="lucide:alert-circle" class="h-4 w-4 mr-2 text-destructive" />
              Overdue
              <span class="ml-auto text-xs text-muted-foreground">{{ overdueTodos.length }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="activeFilter = 'completed'">
              <Icon name="lucide:check-circle" class="h-4 w-4 mr-2 text-green-500" />
              Completed
              <span class="ml-auto text-xs text-muted-foreground">{{ completedTodos.length }}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <!-- Add Task Button -->
        <Button
          variant="ghost"
          size="sm"
          class="h-8"
          @click="toggleAddTask"
        >
          <Icon name="lucide:plus" class="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </template>
    
    <!-- Empty State Action -->
    <template #empty-action>
      <Button
        variant="outline"
        size="sm"
        @click="showAddTask = true"
      >
        <Icon name="lucide:plus" class="h-4 w-4 mr-1" />
        Create Your First Task
      </Button>
    </template>
    
    <!-- Main Content -->
    <div class="space-y-3">
      <!-- Add Task Form -->
      <Transition name="slide-down">
        <div v-if="showAddTask" class="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3">
          <form @submit.prevent="handleAddTodo" class="space-y-3">
            <!-- Task Input -->
            <div class="space-y-2">
              <Input
                v-model="newTodo.text"
                placeholder="What needs to be done?"
                class="text-sm"
                :disabled="saving"
                @keydown.escape="cancelAdd"
                ref="taskInput"
              />
            </div>
            
            <!-- Task Options -->
            <div class="flex flex-wrap gap-2">
              <!-- Due Date -->
              <div class="flex items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  class="h-8 text-xs"
                  @click="showDatePicker = !showDatePicker"
                >
                  <Icon name="lucide:calendar" class="h-3 w-3 mr-1" />
                  {{ newTodo.due_date ? formatDate(newTodo.due_date) : 'Due date' }}
                </Button>
                <Button
                  v-if="newTodo.due_date"
                  type="button"
                  variant="ghost"
                  size="sm"
                  class="h-8 w-8 p-0"
                  @click="newTodo.due_date = null"
                >
                  <Icon name="lucide:x" class="h-3 w-3" />
                </Button>
              </div>
              
              <!-- Priority -->
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="h-8 text-xs"
                    :class="priorityClasses[newTodo.priority || 'medium']"
                  >
                    <Icon name="lucide:flag" class="h-3 w-3 mr-1" />
                    {{ newTodo.priority || 'Priority' }}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem @click="newTodo.priority = 'high'">
                    <Icon name="lucide:flag" class="h-4 w-4 mr-2 text-red-500" />
                    High Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="newTodo.priority = 'medium'">
                    <Icon name="lucide:flag" class="h-4 w-4 mr-2 text-yellow-500" />
                    Medium Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="newTodo.priority = 'low'">
                    <Icon name="lucide:flag" class="h-4 w-4 mr-2 text-blue-500" />
                    Low Priority
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <!-- Category -->
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    class="h-8 text-xs"
                  >
                    <Icon name="lucide:tag" class="h-3 w-3 mr-1" />
                    {{ newTodo.category || 'Category' }}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem 
                    v-for="cat in categories" 
                    :key="cat"
                    @click="newTodo.category = cat"
                  >
                    {{ cat }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <!-- Quick Date Buttons -->
            <div v-if="showDatePicker" class="flex flex-wrap gap-1">
              <Button
                v-for="quick in quickDates"
                :key="quick.label"
                type="button"
                variant="outline"
                size="sm"
                class="h-7 text-xs"
                @click="setQuickDate(quick.value)"
              >
                {{ quick.label }}
              </Button>
            </div>
            
            <!-- Form Actions -->
            <div class="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                @click="cancelAdd"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                :disabled="!newTodo.text.trim() || saving"
              >
                <Icon v-if="saving" name="lucide:loader-2" class="h-4 w-4 mr-1 animate-spin" />
                <Icon v-else name="lucide:plus" class="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          </form>
        </div>
      </Transition>
      
      <!-- Todo List -->
      <div class="space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
        <TransitionGroup name="list">
          <div
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="group relative flex items-start gap-2 p-3 rounded-lg hover:bg-muted/50 transition-all"
            :class="{
              'opacity-60': todo.completed,
              'border-l-2 border-red-500 pl-2': todo.priority === 'high' && !todo.completed,
              'border-l-2 border-yellow-500 pl-2': todo.priority === 'medium' && !todo.completed,
              'border-l-2 border-blue-500 pl-2': todo.priority === 'low' && !todo.completed,
            }"
          >
            <!-- Checkbox -->
            <Checkbox
              :checked="todo.completed"
              class="mt-0.5"
              @update:checked="(checked) => handleToggle(todo.id, checked)"
            />
            
            <!-- Todo Content -->
            <div class="flex-1 min-w-0">
              <!-- Todo Text -->
              <Text
                size="sm"
                :class="[
                  'break-words transition-all cursor-pointer',
                  todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                ]"
                @click="() => handleToggle(todo.id, !todo.completed)"
              >
                {{ todo.text }}
              </Text>
              
              <!-- Todo Meta -->
              <div class="flex items-center gap-3 mt-1">
                <!-- Due Date -->
                <div
                  v-if="todo.due_date"
                  class="flex items-center gap-1"
                >
                  <Icon name="lucide:calendar" class="h-3 w-3" />
                  <Text
                    size="xs"
                    :class="[
                      isOverdue(todo.due_date) && !todo.completed ? 'text-destructive font-medium' : 'text-muted-foreground'
                    ]"
                  >
                    {{ formatDueDate(todo.due_date) }}
                  </Text>
                </div>
                
                <!-- Category -->
                <div
                  v-if="todo.category"
                  class="flex items-center gap-1"
                >
                  <Icon name="lucide:tag" class="h-3 w-3 text-muted-foreground" />
                  <Text size="xs" class="text-muted-foreground">
                    {{ todo.category }}
                  </Text>
                </div>
                
                <!-- Priority Indicator -->
                <div
                  v-if="todo.priority"
                  class="flex items-center gap-1"
                >
                  <Icon 
                    name="lucide:flag" 
                    class="h-3 w-3"
                    :class="{
                      'text-red-500': todo.priority === 'high',
                      'text-yellow-500': todo.priority === 'medium',
                      'text-blue-500': todo.priority === 'low'
                    }"
                  />
                  <Text size="xs" class="text-muted-foreground">
                    {{ todo.priority }}
                  </Text>
                </div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                class="h-7 w-7 p-0 text-destructive"
                @click="handleDelete(todo.id)"
              >
                <Icon name="lucide:trash-2" class="h-3 w-3" />
              </Button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
    
    <!-- Footer -->
    <template #footer>
      <div class="flex items-center justify-between text-xs text-muted-foreground">
        <span>{{ completedTodos.length }} of {{ todos.length }} completed</span>
        <div class="flex items-center gap-2">
          <span v-if="todos.length > 0" class="text-primary">
            {{ Math.round((completedTodos.length / todos.length) * 100) }}% done
          </span>
          <Button
            v-if="completedTodos.length > 0"
            variant="ghost"
            size="sm"
            class="h-6 text-xs"
            @click="handleClearCompleted"
          >
            Clear completed
          </Button>
        </div>
      </div>
    </template>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type { Todo, CreateTodoInput } from '~/composables/useTodos'

// Use the todos composable
const {
  todos,
  loading,
  error,
  sortedTodos,
  incompleteTodos,
  completedTodos,
  overdueTodos,
  todayTodos,
  categories,
  createTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  clearCompleted
} = useTodos()

// Local state
const showAddTask = ref(false)
const showDatePicker = ref(false)
const saving = ref(false)
const activeFilter = ref<'all' | 'today' | 'overdue' | 'completed'>('all')
const taskInput = ref<HTMLInputElement>()

// New todo form
const newTodo = ref<CreateTodoInput & { priority?: 'low' | 'medium' | 'high' }>({
  text: '',
  due_date: null,
  priority: undefined,
  category: null
})

// Quick date options
const quickDates = [
  { label: 'Today', value: 0 },
  { label: 'Tomorrow', value: 1 },
  { label: 'This Week', value: 7 },
  { label: 'Next Week', value: 14 },
  { label: 'Next Month', value: 30 }
]

// Priority classes
const priorityClasses = {
  high: 'border-red-500 text-red-500',
  medium: 'border-yellow-500 text-yellow-500',
  low: 'border-blue-500 text-blue-500'
}

// Computed
const filteredTodos = computed(() => {
  switch (activeFilter.value) {
    case 'today':
      return todayTodos.value
    case 'overdue':
      return overdueTodos.value
    case 'completed':
      return completedTodos.value
    default:
      return sortedTodos.value
  }
})

const emptyTitle = computed(() => {
  switch (activeFilter.value) {
    case 'today':
      return 'No tasks due today'
    case 'overdue':
      return 'No overdue tasks'
    case 'completed':
      return 'No completed tasks'
    default:
      return 'No tasks yet'
  }
})

const emptyMessage = computed(() => {
  switch (activeFilter.value) {
    case 'today':
      return 'You\'re all caught up for today!'
    case 'overdue':
      return 'Great! You have no overdue tasks'
    case 'completed':
      return 'Complete some tasks to see them here'
    default:
      return 'Add your first writing task to get started'
  }
})

// Methods
const toggleAddTask = () => {
  showAddTask.value = !showAddTask.value
  if (showAddTask.value) {
    nextTick(() => {
      taskInput.value?.focus()
    })
  }
}

const handleAddTodo = async () => {
  if (!newTodo.value.text.trim()) return
  
  saving.value = true
  
  try {
    await createTodo({
      text: newTodo.value.text.trim(),
      due_date: newTodo.value.due_date,
      priority: newTodo.value.priority,
      category: newTodo.value.category
    })
    
    // Reset form
    newTodo.value = {
      text: '',
      due_date: null,
      priority: undefined,
      category: null
    }
    showAddTask.value = false
    showDatePicker.value = false
  } catch (err) {
    console.error('Failed to add todo:', err)
  } finally {
    saving.value = false
  }
}

const handleToggle = async (id: string, checked: boolean) => {
  try {
    await updateTodo(id, { completed: checked })
  } catch (err) {
    console.error('Failed to toggle todo:', err)
  }
}

const handleDelete = async (id: string) => {
  try {
    await deleteTodo(id)
  } catch (err) {
    console.error('Failed to delete todo:', err)
  }
}

const handleClearCompleted = async () => {
  if (confirm('Clear all completed tasks?')) {
    try {
      await clearCompleted()
    } catch (err) {
      console.error('Failed to clear completed:', err)
    }
  }
}

const cancelAdd = () => {
  newTodo.value = {
    text: '',
    due_date: null,
    priority: undefined,
    category: null
  }
  showAddTask.value = false
  showDatePicker.value = false
}

const setQuickDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  newTodo.value.due_date = date.toISOString()
  showDatePicker.value = false
}

const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date()
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  })
}

const formatDueDate = (date: string) => {
  const d = new Date(date)
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  // Reset time for comparison
  d.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)
  tomorrow.setHours(0, 0, 0, 0)
  
  if (d.getTime() === now.getTime()) {
    return 'Today'
  } else if (d.getTime() === tomorrow.getTime()) {
    return 'Tomorrow'
  } else if (d < now) {
    const daysOverdue = Math.floor((now.getTime() - d.getTime()) / 86400000)
    return `${daysOverdue} day${daysOverdue !== 1 ? 's' : ''} overdue`
  } else {
    return formatDate(date)
  }
}
</script>

<style scoped>
/* Smooth transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.list-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.list-move {
  transition: transform 0.3s ease;
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>