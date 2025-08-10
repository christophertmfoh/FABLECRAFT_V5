export default defineNuxtPlugin(async () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  
  // Watch for user changes
  watch(user, async (newUser) => {
    if (newUser?.id) {
      try {
        // Fetch profile data from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, username, avatar_url, bio')
          .eq('id', newUser.id)
          .single()
        
        if (profile) {
          // Update user metadata with profile data
          // This makes the data available throughout the app
          newUser.user_metadata = {
            ...newUser.user_metadata,
            ...profile
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
  }, { immediate: true })
})