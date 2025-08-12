/**
 * Local storage fallback for todos when database is not available
 */

export interface TodoLocal {
  id: string
  text: string
  completed: boolean
  due_date?: string | null
  priority?: 'low' | 'medium' | 'high'
  category?: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export const useTodosLocal = () => {
  const STORAGE_KEY = 'fablecraft_todos_local'
  
  // State
  const todos = useState<TodoLocal[]>('userTodosLocal', () => [])
  const loading = useState<boolean>('todosLoadingLocal', () => false)
  const error = useState<string | null>('todosErrorLocal', () => null)
  
  // Categories for quick filtering
  const categories = ['Personal', 'Work', 'Writing', 'Research', 'Ideas', 'Other']
  
  // Load from localStorage
  const loadFromStorage = () => {
    if (!process.client) return
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        todos.value = JSON.parse(stored)
      }
    } catch (err) {
      console.error('Failed to load todos from localStorage:', err)
    }
  }
  
  // Save to localStorage
  const saveToStorage = () => {
    if (!process.client) return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
    } catch (err) {
      console.error('Failed to save todos to localStorage:', err)
    }
  }
  
  // Watch for changes and save
  watch(todos, () => {
    saveToStorage()
  }, { deep: true })
  
  // Computed
  const sortedTodos = computed(() => {
    return [...todos.value].sort((a, b) => {
      // First sort by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2, undefined: 3 }
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 3
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 3
      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }
      // Then by due date
      if (a.due_date && b.due_date) {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      }
      if (a.due_date && !b.due_date) return -1
      if (!a.due_date && b.due_date) return 1
      // Finally by order index
      return a.order_index - b.order_index
    })
  })
  
  const incompleteTodos = computed(() => 
    todos.value.filter(t => !t.completed)
  )
  
  const completedTodos = computed(() => 
    todos.value.filter(t => t.completed)
  )
  
  const overdueTodos = computed(() => 
    todos.value.filter(t => 
      !t.completed && 
      t.due_date && 
      new Date(t.due_date) < new Date()
    )
  )
  
  const todayTodos = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    return todos.value.filter(t => {
      if (!t.due_date || t.completed) return false
      const dueDate = new Date(t.due_date)
      return dueDate >= today && dueDate < tomorrow
    })
  })
  
  // Create a new todo
  const createTodo = async (input: {
    text: string
    due_date?: string | null
    priority?: 'low' | 'medium' | 'high'
    category?: string | null
  }) => {
    const maxOrder = todos.value.reduce((max, todo) => 
      Math.max(max, todo.order_index), -1
    )
    
    const newTodo: TodoLocal = {
      id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: input.text,
      completed: false,
      due_date: input.due_date,
      priority: input.priority,
      category: input.category,
      order_index: maxOrder + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    todos.value.push(newTodo)
    return newTodo
  }
  
  // Update a todo
  const updateTodo = async (id: string, updates: Partial<TodoLocal>) => {
    const todoIndex = todos.value.findIndex(t => t.id === id)
    if (todoIndex === -1) return
    
    todos.value[todoIndex] = {
      ...todos.value[todoIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }
  }
  
  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (!todo) return
    
    await updateTodo(id, { completed: !todo.completed })
  }
  
  // Delete a todo
  const deleteTodo = async (id: string) => {
    const todoIndex = todos.value.findIndex(t => t.id === id)
    if (todoIndex === -1) return
    
    todos.value.splice(todoIndex, 1)
  }
  
  // Clear completed todos
  const clearCompleted = async () => {
    todos.value = todos.value.filter(t => !t.completed)
  }
  
  // Initialize
  onMounted(() => {
    loadFromStorage()
  })
  
  return {
    // State
    todos: readonly(todos),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    sortedTodos,
    incompleteTodos,
    completedTodos,
    overdueTodos,
    todayTodos,
    categories,
    
    // Methods
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    refresh: loadFromStorage
  }
}