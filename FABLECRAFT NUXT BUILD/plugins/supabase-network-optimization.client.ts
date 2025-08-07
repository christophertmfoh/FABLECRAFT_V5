// ✅ Phase 4: Supabase Network Optimization Plugin
// Conditionally adds preconnect for Supabase API when actually needed

export default defineNuxtPlugin(() => {
  // Only run on client side for auth/API usage optimization
  if (import.meta.client) {
    const config = useRuntimeConfig()
    const supabaseUrl = config.public.supabaseUrl
    
    if (supabaseUrl) {
      try {
        const origin = new URL(supabaseUrl).origin
        
        // Check if preconnect link already exists (avoid duplicates)
        const existingPreconnect = document.querySelector(`link[rel="preconnect"][href="${origin}"]`)
        
        if (!existingPreconnect) {
          // Add preconnect for immediate Supabase API calls
          const preconnectLink = document.createElement('link')
          preconnectLink.rel = 'preconnect'
          preconnectLink.href = origin
          preconnectLink.crossOrigin = 'anonymous'
          
          // Add to head for browser to establish connection early
          document.head.appendChild(preconnectLink)
          
          // Optional: Log for debugging in development
          if (import.meta.dev) {
            console.log(`🌐 Phase 4: Added Supabase preconnect for ${origin}`)
          }
        }
      } catch (error) {
        // Silently fail if URL parsing fails
        if (import.meta.dev) {
          console.warn('Phase 4: Failed to parse Supabase URL for preconnect:', error)
        }
      }
    }
  }
})