import { Ref } from 'vue'

export type AuthOverlayMode = 'login' | 'signup'

export function useAuthOverlay() {
  const isOpen = useState<boolean>('auth-overlay-open', () => false)
  const mode = useState<AuthOverlayMode>('auth-overlay-mode', () => 'login')

  const route = useRoute()
  const router = useRouter()

  const open = (m: AuthOverlayMode = 'login') => {
    mode.value = m
    isOpen.value = true
    if (import.meta.client) {
      router.replace({ query: { ...route.query, auth: m } }, { replace: true, shallow: true })
    }
  }

  const close = () => {
    isOpen.value = false
    if (import.meta.client) {
      const { auth, ...rest } = route.query
      router.replace({ query: { ...rest } }, { replace: true, shallow: true })
    }
  }

  // Sync with query on mount/navigation
  if (process.client) {
    watch(
      () => route.query.auth,
      (val) => {
        if (val === 'login' || val === 'signup') {
          mode.value = val
          isOpen.value = true
        } else {
          isOpen.value = false
        }
      },
      { immediate: true }
    )
  }

  return { isOpen, mode, open, close }
}