<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <Card class="p-8">
        <!-- Logo/Branding -->
        <div class="flex items-center justify-center gap-2 mb-6">
          <Icon name="lucide:feather" class="h-8 w-8 text-primary" />
          <AGradientText tag="h1" variant="primary" class="text-2xl font-extrabold tracking-tight">
            Fablecraft
          </AGradientText>
        </div>

        <!-- Status Messages -->
        <div v-if="isLoading" class="text-center">
          <Spinner class="mx-auto mb-4" />
          <Heading tag="h2" size="h3" class="mb-2">Confirming your email...</Heading>
          <Text class="text-muted-foreground">Please wait while we verify your account.</Text>
        </div>

        <div v-else-if="error" class="text-center">
          <div class="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <Icon name="lucide:x-circle" class="h-6 w-6 text-destructive" />
          </div>
          <Heading tag="h2" size="h3" class="mb-2">Verification Failed</Heading>
          <Text class="text-muted-foreground mb-4">{{ errorMessage }}</Text>
          <Button variant="outline" @click="navigateTo('/login')">
            Back to Login
          </Button>
        </div>

        <div v-else-if="success" class="text-center">
          <div class="mx-auto mb-4 h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
            <Icon name="lucide:check-circle" class="h-6 w-6 text-success" />
          </div>
          <Heading tag="h2" size="h3" class="mb-2">Email Confirmed!</Heading>
          <Text class="text-muted-foreground mb-4">
            Your email has been verified successfully. You can now sign in to your account.
          </Text>
          <Button variant="default" class="w-full" @click="navigateTo('/')">
            Continue to Fablecraft
          </Button>
        </div>

        <!-- Default state (no token) -->
        <div v-else class="text-center">
          <div class="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Icon name="lucide:mail" class="h-6 w-6 text-muted-foreground" />
          </div>
          <Heading tag="h2" size="h3" class="mb-2">Check Your Email</Heading>
          <Text class="text-muted-foreground mb-4">
            We've sent you a confirmation link. Please check your email to verify your account.
          </Text>
          <Button variant="outline" @click="navigateTo('/login')">
            Back to Login
          </Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logger } from '~/utils/logger'

// Page meta
definePageMeta({
  name: 'confirm',
  layout: false, // No layout for confirmation page
})

// Supabase client
const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()

// State
const isLoading = ref(false)
const success = ref(false)
const error = ref(false)
const errorMessage = ref('')

// Handle email confirmation on mount
onMounted(async () => {
  // Check for confirmation token in URL
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const accessToken = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')
  const type = hashParams.get('type')
  
  // Also check query params (for OAuth callbacks)
  const code = route.query.code as string
  const errorParam = route.query.error as string
  const errorDescription = route.query.error_description as string

  if (errorParam) {
    // Handle OAuth error
    error.value = true
    errorMessage.value = errorDescription || 'Authentication failed. Please try again.'
    logger.error('OAuth error:', { error: errorParam, description: errorDescription })
    return
  }

  if (code) {
    // Handle OAuth code exchange
    isLoading.value = true
    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        throw exchangeError
      }
      
      success.value = true
      logger.info('OAuth authentication successful')
      
      // Redirect to home after a short delay
      setTimeout(() => {
        navigateTo('/')
      }, 2000)
    } catch (err: any) {
      error.value = true
      errorMessage.value = err.message || 'Failed to complete authentication.'
      logger.error('Code exchange error:', err)
    } finally {
      isLoading.value = false
    }
    return
  }

  if (type === 'signup' || type === 'email') {
    // Handle email confirmation
    isLoading.value = true
    try {
      if (!accessToken) {
        throw new Error('No confirmation token found')
      }

      // Set the session with the tokens from the URL
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken!,
      })

      if (sessionError) {
        throw sessionError
      }

      success.value = true
      logger.info('Email confirmed successfully')
      
      // Redirect to home after a short delay
      setTimeout(() => {
        navigateTo('/')
      }, 2000)
    } catch (err: any) {
      error.value = true
      errorMessage.value = err.message || 'Invalid or expired confirmation link.'
      logger.error('Email confirmation error:', err)
    } finally {
      isLoading.value = false
    }
  } else if (type === 'recovery') {
    // Handle password recovery
    isLoading.value = true
    try {
      if (!accessToken) {
        throw new Error('No recovery token found')
      }

      // Set the session to allow password reset
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken!,
      })

      if (sessionError) {
        throw sessionError
      }

      // Redirect to password reset page
      navigateTo('/reset-password')
    } catch (err: any) {
      error.value = true
      errorMessage.value = 'Invalid or expired recovery link.'
      logger.error('Password recovery error:', err)
    } finally {
      isLoading.value = false
    }
  }
})
</script>