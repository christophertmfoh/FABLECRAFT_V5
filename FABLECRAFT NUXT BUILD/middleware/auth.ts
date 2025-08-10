export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  
  // If user is not authenticated, redirect to login
  if (!user.value) {
    // Store the intended destination
    const returnUrl = to.fullPath
    
    // Open the auth overlay instead of redirecting to a login page
    if (process.client) {
      const { open } = useAuthOverlay()
      open('login')
      
      // Prevent navigation to the protected route
      return abortNavigation()
    }
    
    // For SSR, redirect to home
    return navigateTo('/')
  }
})