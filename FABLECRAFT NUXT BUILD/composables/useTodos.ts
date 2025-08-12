/**
 * Composable for managing todos with real-time updates and persistence
 */

export interface Todo {
  id: string
  user_id: string
  text: string
  completed: boolean
  due_date?: string | null
  priority?: 'low' | 'medium' | 'high'
  category?: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export interface CreateTodoInput {
  text: string
  due_date?: string | null
  priority?: 'low' | 'medium' | 'high'
  category?: string | null
}

export const useTodos = () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  
  // State
  const todos = useState<Todo[]>('userTodos', () => [])
  const loading = useState<boolean>('todosLoading', () => false)
  const error = useState<string | null>('todosError', () => null)
  
  // Categories for quick filtering
  const categories = ['Personal', 'Work', 'Writing', 'Research', 'Ideas', 'Other']
  
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
  
  // Fetch todos from database
  const fetchTodos = async () => {
    if (!user.value) {
      todos.value = []
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.value.id)
        .order('order_index', { ascending: true })
      
      if (fetchError) throw fetchError
      
      todos.value = data || []
    } catch (err: any) {
      error.value = err.message || 'Failed to load todos'
      console.error('Error fetching todos:', err)
    } finally {
      loading.value = false
    }
  }
  
  // Create a new todo
  const createTodo = async (input: CreateTodoInput) => {
    if (!user.value) throw new Error('User not authenticated')
    
    loading.value = true
    error.value = null
    
    try {
      // Get the highest order index
      const maxOrder = todos.value.reduce((max, todo) => 
        Math.max(max, todo.order_index), -1
      )
      
      const { data, error: createError } = await supabase
        .from('todos')
        .insert({
          user_id: user.value.id,
          text: input.text,
          due_date: input.due_date,
          priority: input.priority,
          category: input.category,
          completed: false,
          order_index: maxOrder + 1
        })
        .select()
        .single()
      
      if (createError) throw createError
      
      // Add to local state immediately for responsive UI
      todos.value.push(data)
      
      return data
    } catch (err: any) {
      error.value = err.message || 'Failed to create todo'
      console.error('Error creating todo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Update a todo
  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const todoIndex = todos.value.findIndex(t => t.id === id)
    if (todoIndex === -1) return
    
    const originalTodo = { ...todos.value[todoIndex] }
    
    // Optimistically update local state
    todos.value[todoIndex] = { ...todos.value[todoIndex], ...updates }
    
    try {
      const { error: updateError } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
      
      if (updateError) throw updateError
    } catch (err: any) {
      // Revert on error
      todos.value[todoIndex] = originalTodo
      error.value = err.message || 'Failed to update todo'
      console.error('Error updating todo:', err)
      throw err
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
    
    const deletedTodo = todos.value[todoIndex]
    
    // Optimistically remove from local state
    todos.value.splice(todoIndex, 1)
    
    try {
      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
      
      if (deleteError) throw deleteError
    } catch (err: any) {
      // Revert on error
      todos.value.splice(todoIndex, 0, deletedTodo)
      error.value = err.message || 'Failed to delete todo'
      console.error('Error deleting todo:', err)
      throw err
    }
  }
  
  // Reorder todos
  const reorderTodos = async (fromIndex: number, toIndex: number) => {
    const sorted = sortedTodos.value
    const movedTodo = sorted[fromIndex]
    
    // Create new array with reordered items
    const reordered = [...sorted]
    reordered.splice(fromIndex, 1)
    reordered.splice(toIndex, 0, movedTodo)
    
    // Update order indices
    const updates = reordered.map((todo, index) => ({
      id: todo.id,
      order_index: index
    }))
    
    // Update local state
    todos.value = reordered
    
    try {
      // Batch update in database
      for (const update of updates) {
        await supabase
          .from('todos')
          .update({ order_index: update.order_index })
          .eq('id', update.id)
      }
    } catch (err: any) {
      // Revert on error
      await fetchTodos()
      error.value = err.message || 'Failed to reorder todos'
      console.error('Error reordering todos:', err)
    }
  }
  
  // Clear completed todos
  const clearCompleted = async () => {
    const completedIds = completedTodos.value.map(t => t.id)
    
    if (completedIds.length === 0) return
    
    // Optimistically remove from local state
    todos.value = todos.value.filter(t => !t.completed)
    
    try {
      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .in('id', completedIds)
      
      if (deleteError) throw deleteError
    } catch (err: any) {
      // Revert on error
      await fetchTodos()
      error.value = err.message || 'Failed to clear completed todos'
      console.error('Error clearing completed:', err)
      throw err
    }
  }
  
  // Set up real-time subscription
  const subscribeToTodos = () => {
    if (!user.value) return null
    
    const channel = supabase
      .channel(`todos:${user.value.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
          filter: `user_id=eq.${user.value.id}`
        },
        async (payload) => {
          console.log('Todo changed:', payload)
          
          if (payload.eventType === 'INSERT') {
            // Check if already exists (avoid duplicates from optimistic updates)
            if (!todos.value.find(t => t.id === payload.new.id)) {
              todos.value.push(payload.new as Todo)
            }
          } else if (payload.eventType === 'UPDATE') {
            const index = todos.value.findIndex(t => t.id === payload.new.id)
            if (index !== -1) {
              todos.value[index] = payload.new as Todo
            }
          } else if (payload.eventType === 'DELETE') {
            todos.value = todos.value.filter(t => t.id !== payload.old.id)
          }
        }
      )
      .subscribe()
    
    return channel
  }
  
  // Initialize
  let subscription: any = null
  
  const initialize = async () => {
    if (subscription) {
      await supabase.removeChannel(subscription)
      subscription = null
    }
    
    if (user.value) {
      await fetchTodos()
      subscription = subscribeToTodos()
    } else {
      todos.value = []
    }
  }
  
  // Watch for user changes
  watch(user, async () => {
    await initialize()
  }, { immediate: true })
  
  // Clean up on unmount
  onUnmounted(async () => {
    if (subscription) {
      await supabase.removeChannel(subscription)
    }
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
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    reorderTodos,
    clearCompleted,
    refresh: fetchTodos
  }
}