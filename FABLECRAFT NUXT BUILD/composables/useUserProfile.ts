/**
 * Composable for managing user profile data with real-time updates
 */

export interface UserProfile {
  id: string
  full_name?: string | null
  username?: string | null
  avatar_url?: string | null
  bio?: string | null
  created_at?: string
  updated_at?: string
}

export const useUserProfile = () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  
  // Reactive state
  const profile = useState<UserProfile | null>('userProfile', () => null)
  const loading = useState<boolean>('profileLoading', () => false)
  const error = useState<string | null>('profileError', () => null)
  
  // Computed display name with fallbacks
  const displayName = computed(() => {
    if (!user.value && !profile.value) return 'User'
    
    // Priority: profile full_name > profile username > user metadata > email prefix
    return profile.value?.full_name ||
           profile.value?.username ||
           user.value?.user_metadata?.full_name ||
           user.value?.user_metadata?.name ||
           user.value?.email?.split('@')[0] ||
           'User'
  })
  
  // Computed avatar URL
  const avatarUrl = computed(() => {
    return profile.value?.avatar_url || 
           user.value?.user_metadata?.avatar_url ||
           null
  })
  
  // Fetch profile from database
  const fetchProfile = async () => {
    if (!user.value) {
      profile.value = null
      return null
    }
    
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()
      
      if (fetchError) {
        // If profile doesn't exist, that's okay - it might not be created yet
        if (fetchError.code === 'PGRST116') {
          console.log('Profile not found, will be created on first update')
          profile.value = null
        } else {
          throw fetchError
        }
      } else {
        profile.value = data
      }
      
      return data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch profile'
      console.error('Error fetching profile:', err)
      return null
    } finally {
      loading.value = false
    }
  }
  
  // Update profile in database
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user.value) {
      throw new Error('No user logged in')
    }
    
    loading.value = true
    error.value = null
    
    try {
      // First try to update
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.value.id)
        .select()
        .single()
      
      if (updateError) {
        // If the profile doesn't exist, create it
        if (updateError.code === 'PGRST116') {
          const { data: insertData, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.value.id,
              ...updates
            })
            .select()
            .single()
          
          if (insertError) throw insertError
          profile.value = insertData
          return insertData
        } else {
          throw updateError
        }
      } else {
        profile.value = updateData
        return updateData
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to update profile'
      console.error('Error updating profile:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Set up real-time subscription for profile changes
  const subscribeToProfileChanges = () => {
    if (!user.value) return null
    
    // Subscribe to changes on the user's profile
    const channel = supabase
      .channel(`profile:${user.value.id}`)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.value.id}`
        },
        (payload) => {
          console.log('Profile changed:', payload)
          
          // Update local state based on the event
          if (payload.eventType === 'DELETE') {
            profile.value = null
          } else {
            profile.value = payload.new as UserProfile
          }
        }
      )
      .subscribe()
    
    return channel
  }
  
  // Initialize and set up subscription when user changes
  let subscription: any = null
  
  const initialize = async () => {
    // Clean up old subscription
    if (subscription) {
      await supabase.removeChannel(subscription)
      subscription = null
    }
    
    if (user.value) {
      // Fetch initial profile
      await fetchProfile()
      
      // Set up real-time subscription
      subscription = subscribeToProfileChanges()
    } else {
      // Clear profile if no user
      profile.value = null
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
    profile: readonly(profile),
    loading: readonly(loading),
    error: readonly(error),
    displayName,
    avatarUrl,
    fetchProfile,
    updateProfile,
    refresh: fetchProfile
  }
}