<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[1000]" @keydown.esc.prevent.stop="close">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-background/70 dark:bg-black/70 backdrop-blur-md" @click="close" />

      <!-- Dialog -->
      <div
        class="absolute inset-0 grid place-items-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="headingId"
      >
        <div class="relative w-full max-w-md">
          <!-- Card -->
          <GlassCard variant="heavy" class="overflow-hidden shadow-2xl rounded-2xl">
            <!-- Header / Branding -->
            <div class="px-6 pt-6">
              <div class="flex items-center justify-center gap-3">
                <NavigationLogo :brand-text="'Fablecraft'" :show-text="true" />
              </div>
              <div class="mt-4 flex rounded-xl bg-muted/40 p-1">
                <button
                  :aria-pressed="mode === 'login'"
                  class="flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition"
                  :class="mode === 'login' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'"
                  @click="setMode('login')"
                >
                  Log in
                </button>
                <button
                  :aria-pressed="mode === 'signup'"
                  class="flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition"
                  :class="mode === 'signup' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'"
                  @click="setMode('signup')"
                >
                  Sign up
                </button>
              </div>
            </div>

            <!-- Body -->
            <div class="px-6 pb-6 pt-4">
              <h2 :id="headingId" class="sr-only">{{ modeLabel }}</h2>

              <form class="space-y-4" @submit.prevent>
                <template v-if="mode === 'signup'">
                  <FormField label="Name">
                    <Input ref="firstFieldRef" autocomplete="name" placeholder="Your name" />
                  </FormField>
                </template>

                <FormField label="Email">
                  <Input :ref="mode === 'login' ? 'firstFieldRef' : undefined" autocomplete="email" type="email" placeholder="you@domain.com" />
                </FormField>

                <FormField label="Password">
                  <PasswordField autocomplete="current-password" :show-toggle="true" placeholder="••••••••" />
                </FormField>

                <template v-if="mode === 'signup'">
                  <FormField label="Confirm password">
                    <PasswordField autocomplete="new-password" :show-toggle="true" placeholder="••••••••" />
                  </FormField>

                  <label class="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox />
                    <span>I agree to the Terms & Privacy</span>
                  </label>
                </template>

                <div class="pt-2">
                  <Button variant="default" class="w-full" size="lg">
                    {{ mode === 'login' ? 'Continue' : 'Create account' }}
                  </Button>
                </div>
              </form>

              <!-- Divider -->
              <div class="my-4 flex items-center gap-3 text-xs text-muted-foreground">
                <div class="h-px flex-1 bg-border" />
                <span>or</span>
                <div class="h-px flex-1 bg-border" />
              </div>

              <!-- Social providers (stub) -->
              <div class="grid grid-cols-1 gap-3">
                <Button variant="outline" class="w-full">
                  <AtomIcon name="logos:google-icon" class="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
                <Button variant="outline" class="w-full">
                  <AtomIcon name="mdi:github" class="mr-2 h-4 w-4" />
                  Continue with GitHub
                </Button>
              </div>

              <p class="mt-4 text-center text-xs text-muted-foreground">
                By continuing you agree to our
                <a class="underline hover:text-foreground" href="#">Terms</a>
                and
                <a class="underline hover:text-foreground" href="#">Privacy Policy</a>.
              </p>
            </div>
          </GlassCard>

          <!-- Close -->
          <button
            class="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur border border-border/50 shadow hover:bg-background"
            aria-label="Close"
            @click="close"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { isOpen, mode, open, close } = useAuthOverlay()
const headingId = `auth-overlay-heading`

const setMode = (m: 'login' | 'signup') => {
  if (mode.value !== m) open(m)
}

const modeLabel = computed(() => (mode.value === 'login' ? 'Log in to Fablecraft' : 'Create your Fablecraft account'))

const firstFieldRef = ref<HTMLInputElement | null>(null)
watch(
  () => isOpen.value,
  (v) => {
    if (v) {
      nextTick(() => firstFieldRef.value?.focus())
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }
  }
)

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>