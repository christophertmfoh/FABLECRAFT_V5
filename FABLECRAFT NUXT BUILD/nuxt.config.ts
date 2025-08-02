// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // Development server configuration
  devServer: {
    port: 4269,
    host: '0.0.0.0' // Allow external connections for port forwarding
  }
})
