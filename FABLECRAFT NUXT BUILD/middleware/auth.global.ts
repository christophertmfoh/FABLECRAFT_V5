export default defineNuxtRouteMiddleware((to) => {
  // Skip auth check for API routes
  if (to.path.startsWith('/api/')) {
    return
  }
  
  // Let the Supabase module handle other routes
})