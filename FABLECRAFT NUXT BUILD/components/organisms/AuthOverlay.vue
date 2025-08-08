<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[1000]" tabindex="-1" ref="overlayRef" @keydown.esc.prevent.stop="close">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-background/70 dark:bg-black/70 backdrop-blur-md" @click="close" />

        <!-- Dialog -->
        <div
          class="absolute inset-0 grid place-items-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="headingId"
        >
          <Transition name="pop">
            <div v-show="isOpen" class="relative w-full max-w-md">
              <!-- Card -->
              <GlassCard variant="heavy" class="overflow-hidden rounded-2xl ring-1 ring-border/50 text-foreground surface-atmo">
                <!-- Header / Branding -->
                <div class="px-6 pt-6">
                  <div class="flex items-center justify-center gap-2 text-pop">
                    <AtomIcon name="lucide:feather" class="h-5 w-5 text-primary" />
                    <AGradientText tag="span" variant="primary" class="text-lg font-extrabold tracking-tight">Fablecraft</AGradientText>
                  </div>

                  <!-- Segmented Tabs with Animated Indicator -->
                  <div class="mt-5 relative">
                    <div class="flex rounded-xl bg-muted/40 p-1">
                      <button
                        :aria-pressed="mode === 'login'"
                        class="relative z-10 flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition"
                        :class="mode === 'login' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
                        @click="setMode('login')"
                      >
                        Log in
                      </button>
                      <button
                        :aria-pressed="mode === 'signup'"
                        class="relative z-10 flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition"
                        :class="mode === 'signup' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
                        @click="setMode('signup')"
                      >
                        Sign up
                      </button>
                    </div>
                    <div
                      class="tab-indicator"
                      :style="{ transform: mode === 'login' ? 'translateX(0%)' : 'translateX(100%)' }"
                    />
                  </div>
                </div>

                <!-- Body -->
                <div class="px-6 pb-6 pt-4">
                  <h2 :id="headingId" class="sr-only">{{ modeLabel }}</h2>

                  <form class="space-y-4" @submit.prevent>
                    <template v-if="mode === 'signup'">
                      <FormField label="Name">
                        <div class="relative">
                          <AtomIcon name="lucide:user" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input ref="firstFieldRef" autocomplete="name" placeholder="Your name" class="pl-9" />
                        </div>
                      </FormField>
                    </template>

                    <FormField label="Email">
                      <div class="relative">
                        <AtomIcon name="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input :ref="mode === 'login' ? 'firstFieldRef' : undefined" autocomplete="email" type="email" placeholder="you@domain.com" class="pl-9" />
                      </div>
                    </FormField>

                    <FormField label="Password">
                      <div class="relative">
                        <AtomIcon name="lucide:lock" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <PasswordField autocomplete="current-password" :show-toggle="true" placeholder="••••••••" class="pl-9" />
                      </div>
                    </FormField>

                    <template v-if="mode === 'signup'">
                      <FormField label="Confirm password">
                        <div class="relative">
                          <AtomIcon name="lucide:lock" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <PasswordField autocomplete="new-password" :show-toggle="true" placeholder="••••••••" class="pl-9" />
                        </div>
                      </FormField>

                      <label class="flex items-center gap-2 text-sm text-muted-foreground">
                        <Checkbox />
                        <span>I agree to the Terms & Privacy</span>
                      </label>
                    </template>

                    <div class="pt-2">
                      <Button variant="default" class="w-full group" size="lg">
                        <span class="relative">
                          {{ mode === 'login' ? 'Continue' : 'Create account' }}
                          <span class="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                        </span>
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
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isOpen, mode, open, close } = useAuthOverlay()
const headingId = `auth-overlay-heading`

const overlayRef = ref<HTMLDivElement | null>(null)

const setMode = (m: 'login' | 'signup') => {
  if (mode.value !== m) open(m)
}

const modeLabel = computed(() => (mode.value === 'login' ? 'Log in to Fablecraft' : 'Create your Fablecraft account'))

const firstFieldRef = ref<HTMLInputElement | null>(null)
watch(
  () => isOpen.value,
  (v) => {
    if (v) {
      nextTick(() => {
        overlayRef.value?.focus()
        firstFieldRef.value?.focus()
      })
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

<style scoped>
/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.pop-enter-active, .pop-leave-active { transition: opacity .2s ease, transform .2s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(8px) scale(.98); }

/* Segmented tab indicator */
.tab-indicator {
  position: absolute;
  top: 0.25rem; /* p-1 */
  left: 0.25rem;
  width: calc(50% - 0.25rem);
  height: calc(100% - 0.5rem);
  border-radius: 0.6rem;
  background: linear-gradient(90deg, hsl(var(--primary) / .28), hsl(var(--accent, var(--secondary)) / .28));
  backdrop-filter: blur(2px);
  box-shadow: inset 0 0 0 1px hsl(var(--border) / .45), 0 6px 16px rgba(0,0,0,.12);
  transition: transform .25s cubic-bezier(.2,.8,.2,1);
}
</style>