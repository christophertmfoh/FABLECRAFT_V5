<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation Header -->
    <NavigationHeader
      :is-authenticated="!!user"
      :user="user"
      @auth:click="handleAuth"
      @auth:logout="handleLogout"
      @navigate="handleNavigate"
      @logo:click="handleHome"
    />

    <!-- Main Content -->
    <main class="relative z-10">
      <Container size="xl" class="py-8 sm:py-12">
        <!-- Page Header -->
        <div class="mb-8">
          <Heading tag="h1" size="h1" class="mb-2">Account Settings</Heading>
          <Text class="text-muted-foreground">Manage your profile and preferences</Text>
        </div>

        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar Navigation -->
          <aside class="lg:col-span-1">
            <nav class="space-y-1">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all',
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                ]"
              >
                <Icon :name="tab.icon" class="h-5 w-5" />
                <span>{{ tab.label }}</span>
              </button>
            </nav>
          </aside>

          <!-- Main Content Area -->
          <div class="lg:col-span-3">
            <Card class="p-6 sm:p-8">
              <!-- Profile Tab -->
              <div v-if="activeTab === 'profile'" class="space-y-6">
                <!-- Welcome Banner -->
                <Card v-if="user" class="p-4 bg-primary/5 border-primary/20">
                  <div class="flex items-center gap-3">
                    <Icon name="lucide:sparkles" class="h-5 w-5 text-primary" />
                    <div>
                      <Text class="font-medium">
                        Welcome, {{ profileData.username || user.email?.split('@')[0] || 'User' }}!
                      </Text>
                      <Text class="text-sm text-muted-foreground">
                        {{ profileData.username ? 'Your username is displayed in the navigation bar' : 'Set a username below to personalize your display name' }}
                      </Text>
                    </div>
                  </div>
                </Card>

                <div>
                  <Heading tag="h2" size="h3" class="mb-1">Profile Information</Heading>
                  <Text class="text-muted-foreground">Update your personal details and public profile</Text>
                </div>

                <!-- Avatar Section -->
                <div class="flex items-center gap-6">
                  <div class="relative">
                    <Avatar 
                      :src="profileData.avatar_url" 
                      :alt="profileData.full_name || 'User avatar'"
                      class="h-24 w-24"
                    />
                    <button
                      @click="triggerAvatarUpload"
                      class="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                    >
                      <Icon name="lucide:camera" class="h-4 w-4" />
                    </button>
                    <input
                      ref="avatarInput"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleAvatarUpload"
                    />
                  </div>
                  <div>
                    <Text class="font-medium">Profile Photo</Text>
                    <Text class="text-sm text-muted-foreground">JPG, PNG or GIF. Max 5MB.</Text>
                  </div>
                </div>

                <!-- Profile Form -->
                <form @submit.prevent="updateProfile" class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="text-sm font-medium">Full Name</label>
                      <input
                        v-model="profileData.full_name"
                        type="text"
                        class="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label class="text-sm font-medium">
                        Username 
                        <span class="text-xs text-primary ml-1">(displayed in navigation)</span>
                      </label>
                      <input
                        v-model="profileData.username"
                        type="text"
                        class="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Choose your display username"
                        pattern="^[a-zA-Z0-9_-]{3,20}$"
                        title="Username must be 3-20 characters, letters, numbers, underscore or hyphen only"
                      />
                      <Text class="text-xs text-muted-foreground mt-1">This will be shown in the navigation bar</Text>
                    </div>
                  </div>

                  <div>
                    <label class="text-sm font-medium">Email</label>
                    <input
                      :value="user?.email"
                      type="email"
                      disabled
                      class="mt-2 flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Text class="text-xs text-muted-foreground mt-1">Email cannot be changed</Text>
                  </div>

                  <div>
                    <label class="text-sm font-medium">Bio</label>
                    <textarea
                      v-model="profileData.bio"
                      rows="4"
                      class="mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div class="flex justify-end gap-3 pt-4">
                    <Button variant="outline" @click="resetProfile">Cancel</Button>
                    <Button type="submit" :disabled="saving">
                      <Spinner v-if="saving" class="mr-2 h-4 w-4" />
                      {{ saving ? 'Saving...' : 'Save Changes' }}
                    </Button>
                  </div>
                </form>
              </div>

              <!-- Preferences Tab -->
              <div v-if="activeTab === 'preferences'" class="space-y-6">
                <div>
                  <Heading tag="h2" size="h3" class="mb-1">Preferences</Heading>
                  <Text class="text-muted-foreground">Customize your experience</Text>
                </div>

                <div class="space-y-4">
                  <!-- Theme Preference -->
                  <div class="flex items-center justify-between py-3">
                    <div>
                      <Text class="font-medium">Theme</Text>
                      <Text class="text-sm text-muted-foreground">Choose your preferred theme</Text>
                    </div>
                    <ThemeToggle />
                  </div>

                  <!-- Language -->
                  <div class="flex items-center justify-between py-3 border-t">
                    <div>
                      <Text class="font-medium">Language</Text>
                      <Text class="text-sm text-muted-foreground">Select your preferred language</Text>
                    </div>
                    <select class="px-3 py-2 rounded-md border border-input bg-background text-sm">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  <!-- Timezone -->
                  <div class="flex items-center justify-between py-3 border-t">
                    <div>
                      <Text class="font-medium">Timezone</Text>
                      <Text class="text-sm text-muted-foreground">Set your local timezone</Text>
                    </div>
                    <select class="px-3 py-2 rounded-md border border-input bg-background text-sm">
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                      <option>GMT</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Notifications Tab -->
              <div v-if="activeTab === 'notifications'" class="space-y-6">
                <div>
                  <Heading tag="h2" size="h3" class="mb-1">Notifications</Heading>
                  <Text class="text-muted-foreground">Manage how you receive updates</Text>
                </div>

                <div class="space-y-4">
                  <div v-for="notification in notifications" :key="notification.id" class="flex items-center justify-between py-3">
                    <div>
                      <Text class="font-medium">{{ notification.label }}</Text>
                      <Text class="text-sm text-muted-foreground">{{ notification.description }}</Text>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        :checked="notification.enabled"
                        @change="toggleNotification(notification.id)"
                        class="sr-only peer"
                      >
                      <div class="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Security Tab -->
              <div v-if="activeTab === 'security'" class="space-y-6">
                <div>
                  <Heading tag="h2" size="h3" class="mb-1">Security</Heading>
                  <Text class="text-muted-foreground">Keep your account secure</Text>
                </div>

                <!-- Change Password -->
                <Card class="p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <Text class="font-medium">Password</Text>
                      <Text class="text-sm text-muted-foreground">Last changed 3 months ago</Text>
                    </div>
                    <Button variant="outline" @click="showPasswordModal = true">
                      Change Password
                    </Button>
                  </div>
                </Card>

                <!-- Two-Factor Authentication -->
                <Card class="p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <Text class="font-medium">Two-Factor Authentication</Text>
                      <Text class="text-sm text-muted-foreground">Add an extra layer of security</Text>
                    </div>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                </Card>

                <!-- Active Sessions -->
                <div>
                  <Text class="font-medium mb-3">Active Sessions</Text>
                  <div class="space-y-3">
                    <Card class="p-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                          <Icon name="lucide:monitor" class="h-5 w-5 text-muted-foreground" />
                          <div>
                            <Text class="font-medium">Current Session</Text>
                            <Text class="text-sm text-muted-foreground">{{ currentDevice }}</Text>
                          </div>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </Card>
                  </div>
                </div>

                <!-- Delete Account -->
                <Card class="p-4 border-destructive/20 bg-destructive/5">
                  <div class="flex items-center justify-between">
                    <div>
                      <Text class="font-medium text-destructive">Delete Account</Text>
                      <Text class="text-sm text-muted-foreground">Permanently delete your account and all data</Text>
                    </div>
                    <Button variant="destructive" @click="showDeleteModal = true">
                      Delete Account
                    </Button>
                  </div>
                </Card>
              </div>

              <!-- Billing Tab -->
              <div v-if="activeTab === 'billing'" class="space-y-6">
                <div>
                  <Heading tag="h2" size="h3" class="mb-1">Billing & Subscription</Heading>
                  <Text class="text-muted-foreground">Manage your subscription and payment methods</Text>
                </div>

                <!-- Current Plan -->
                <Card class="p-6 bg-primary/5 border-primary/20">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <Text class="font-semibold text-lg">Free Plan</Text>
                      <Text class="text-sm text-muted-foreground">Your current subscription</Text>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div class="space-y-2 mb-4">
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:check" class="h-4 w-4 text-success" />
                      <Text class="text-sm">3 Projects</Text>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:check" class="h-4 w-4 text-success" />
                      <Text class="text-sm">Basic AI Features</Text>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon name="lucide:check" class="h-4 w-4 text-success" />
                      <Text class="text-sm">Community Access</Text>
                    </div>
                  </div>
                  <Button class="w-full" @click="navigateTo('/pricing')">
                    Upgrade Plan
                  </Button>
                </Card>

                <!-- Payment Methods -->
                <div>
                  <Text class="font-medium mb-3">Payment Methods</Text>
                  <Card class="p-4">
                    <Text class="text-muted-foreground text-center py-8">No payment methods added</Text>
                    <Button variant="outline" class="w-full">Add Payment Method</Button>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Success/Error Messages -->
    <Transition name="fade">
      <div v-if="message" class="fixed bottom-4 right-4 z-50">
        <Card :class="[
          'p-4 shadow-lg',
          messageType === 'success' ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'
        ]">
          <div class="flex items-center gap-3">
            <Icon 
              :name="messageType === 'success' ? 'lucide:check-circle' : 'lucide:x-circle'"
              :class="messageType === 'success' ? 'text-success' : 'text-destructive'"
              class="h-5 w-5"
            />
            <Text>{{ message }}</Text>
          </div>
        </Card>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { logger } from '~/utils/logger'

// Page meta
definePageMeta({
  name: 'account',
  middleware: 'auth', // Requires authentication
})

// Composables
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// State
const activeTab = ref('profile')
const saving = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const showPasswordModal = ref(false)
const showDeleteModal = ref(false)
const avatarInput = ref<HTMLInputElement>()

// Profile data
const profileData = reactive({
  full_name: '',
  username: '',
  bio: '',
  avatar_url: '',
})

// Original profile data for reset
const originalProfileData = ref({})

// Tabs configuration
const tabs = [
  { id: 'profile', label: 'Profile', icon: 'lucide:user' },
  { id: 'preferences', label: 'Preferences', icon: 'lucide:settings' },
  { id: 'notifications', label: 'Notifications', icon: 'lucide:bell' },
  { id: 'security', label: 'Security', icon: 'lucide:shield' },
  { id: 'billing', label: 'Billing', icon: 'lucide:credit-card' },
]

// Notifications settings
const notifications = ref([
  { id: 'email_updates', label: 'Email Updates', description: 'Receive updates about your projects', enabled: true },
  { id: 'email_marketing', label: 'Marketing Emails', description: 'News and special offers', enabled: false },
  { id: 'email_community', label: 'Community Updates', description: 'New posts and discussions', enabled: true },
  { id: 'browser_notifications', label: 'Browser Notifications', description: 'Real-time alerts in your browser', enabled: false },
])

// Computed
const currentDevice = computed(() => {
  if (process.client) {
    return navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop Browser'
  }
  return 'Unknown Device'
})

// Load profile data
const loadProfile = async () => {
  if (!user.value) return

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()

    if (error) throw error

    if (data) {
      profileData.full_name = data.full_name || ''
      profileData.username = data.username || ''
      profileData.bio = data.bio || ''
      profileData.avatar_url = data.avatar_url || ''
      
      // Store original data for reset
      originalProfileData.value = { ...profileData }
    }
  } catch (error) {
    logger.error('Error loading profile:', error)
  }
}

// Update profile
const updateProfile = async () => {
  if (!user.value) return

  saving.value = true
  message.value = ''

  try {
    // Update user metadata in auth
    const { error: authError } = await supabase.auth.updateUser({
      data: { 
        full_name: profileData.full_name,
        username: profileData.username,
      }
    })

    if (authError) throw authError

    // Update profile in database
    const { error: dbError } = await supabase
      .from('profiles')
      .update({
        full_name: profileData.full_name,
        username: profileData.username,
        bio: profileData.bio,
        avatar_url: profileData.avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.value.id)

    if (dbError) throw dbError

    message.value = 'Profile updated successfully!'
    messageType.value = 'success'
    originalProfileData.value = { ...profileData }
    
    // Refresh the session to get updated user metadata
    const { data: { user: refreshedUser } } = await supabase.auth.getUser()
    if (refreshedUser) {
      // The user-profile plugin will automatically sync the profile data
      // Just trigger a small delay to ensure the UI updates
      await nextTick()
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (error: any) {
    message.value = error.message || 'Failed to update profile'
    messageType.value = 'error'
    logger.error('Error updating profile:', error)
  } finally {
    saving.value = false
  }
}

// Reset profile form
const resetProfile = () => {
  Object.assign(profileData, originalProfileData.value)
}

// Handle avatar upload
const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file || !user.value) return

  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    message.value = 'File size must be less than 5MB'
    messageType.value = 'error'
    return
  }

  saving.value = true

  try {
    // Upload to Supabase storage
    const fileName = `${user.value.id}-${Date.now()}.${file.name.split('.').pop()}`
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true,
      })

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    // Update profile with new avatar URL
    profileData.avatar_url = publicUrl
    await updateProfile()
  } catch (error: any) {
    message.value = error.message || 'Failed to upload avatar'
    messageType.value = 'error'
    logger.error('Error uploading avatar:', error)
  } finally {
    saving.value = false
  }
}

// Toggle notification
const toggleNotification = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.enabled = !notification.enabled
    // Here you would save the preference to the database
  }
}

// Navigation handlers
const handleAuth = () => {
  const { open } = useAuthOverlay()
  open('login')
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  await router.push('/')
}

const handleNavigate = (view: string) => {
  navigateTo(`/${view}`)
}

const handleHome = () => {
  navigateTo('/')
}

// Load profile on mount
onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>