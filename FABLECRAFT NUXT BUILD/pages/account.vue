<template>
  <div class="min-h-screen bg-background transition-colors duration-300">
    <!-- Background Effects Layer -->
    <ClientOnly>
      <div class="fixed inset-0 pointer-events-none z-0">
        <LazyPaperTexture />
        <LazyGradientNoiseBackdrop />
        <LazyVignetteOverlay strength="subtle" />
      </div>
    </ClientOnly>

    <!-- Main Content Layer -->
    <div class="relative z-10">
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
      <main class="relative z-20">
        <Section spacing="md" class="account-section">
          <Container size="xl">
            <!-- Page Header with Breadcrumb -->
            <div class="mb-8">
              <div class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <NuxtLink to="/" class="hover:text-foreground transition-colors">
                  <Text size="sm">Home</Text>
                </NuxtLink>
                <Icon name="lucide:chevron-right" class="h-4 w-4" />
                <Text size="sm" class="text-foreground">Account Settings</Text>
              </div>
              
              <!-- Use proper heading component with gradient -->
              <MHeroHeading
                title="Account "
                highlight-text="Settings"
                subheading="Manage your profile and preferences"
                heading-tag="h1"
                heading-id="account-heading"
                variant="compact"
                size="lg"
                alignment="left"
                gradient-variant="primary"
                gradient-animation="none"
                spacing="tight"
              />
            </div>

            <!-- Two Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <!-- Sidebar Navigation -->
              <aside class="lg:col-span-1">
                <GlassCard variant="light" class="p-2">
                  <nav class="space-y-1">
                    <button
                      v-for="tab in tabs"
                      :key="tab.id"
                      @click="activeTab = tab.id"
                      :class="[
                        'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      ]"
                    >
                      <Icon :name="tab.icon" class="h-5 w-5 flex-shrink-0" />
                      <Text size="sm" class="font-medium">{{ tab.label }}</Text>
                      <Icon 
                        v-if="activeTab === tab.id" 
                        name="lucide:chevron-right" 
                        class="h-4 w-4 ml-auto"
                      />
                    </button>
                  </nav>
                </GlassCard>
              </aside>

              <!-- Main Content Area -->
              <div class="lg:col-span-3">
                <GlassCard variant="light" class="p-6 sm:p-8 natural-depth">
                  <!-- Profile Tab -->
                  <Transition name="tab-fade" mode="out-in">
                    <div v-if="activeTab === 'profile'" class="space-y-6">
                      <!-- Welcome Banner -->
                      <Card v-if="user" class="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 gentle-hover">
                        <div class="flex items-center gap-3">
                          <div class="p-2 bg-primary/10 rounded-lg">
                            <Icon name="lucide:sparkles" class="h-5 w-5 text-primary" />
                          </div>
                          <div class="flex-1">
                            <Heading tag="h3" size="h4" class="text-foreground">
                              Welcome, {{ profileData.username || user.email?.split('@')[0] || 'User' }}!
                            </Heading>
                            <Text size="sm" class="text-muted-foreground">
                              {{ profileData.username ? 'Your username is displayed in the navigation bar' : 'Set a username below to personalize your display name' }}
                            </Text>
                          </div>
                        </div>
                      </Card>

                      <div>
                        <Heading tag="h2" size="h3" class="mb-1">Profile Information</Heading>
                        <Text class="text-muted-foreground">Update your personal details and public profile</Text>
                      </div>

                      <!-- Enhanced Avatar Section -->
                      <div class="space-y-4">
                        <Heading tag="h3" size="h5">Profile Photo</Heading>
                        <div class="flex flex-col sm:flex-row items-start gap-6">
                          <div 
                            class="relative group"
                            @dragover.prevent="isDragging = true"
                            @dragleave.prevent="isDragging = false"
                            @drop.prevent="handleDrop"
                          >
                            <!-- Avatar Display -->
                            <div :class="[
                              'relative overflow-hidden rounded-2xl transition-all duration-300',
                              isDragging ? 'ring-4 ring-primary ring-offset-2 ring-offset-background scale-105' : '',
                              'group-hover:ring-2 group-hover:ring-primary/50'
                            ]">
                              <Avatar 
                                :src="avatarPreview || profileData.avatar_url" 
                                :alt="profileData.full_name || 'User avatar'"
                                class="h-32 w-32"
                              />
                              <!-- Overlay on hover -->
                              <div class="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <div class="text-center text-background p-3">
                                  <Icon name="lucide:upload" class="h-6 w-6 mx-auto mb-1" />
                                  <Text size="xs" class="font-medium">Click or drag to upload</Text>
                                </div>
                              </div>
                            </div>
                            <!-- Upload Button -->
                            <button
                              @click="triggerAvatarUpload"
                              class="absolute -bottom-2 -right-2 p-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-110"
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
                          <div class="flex-1 space-y-3">
                            <div>
                              <Heading tag="h4" size="h6">Upload Requirements</Heading>
                              <ul class="mt-2 space-y-1">
                                <li class="flex items-center gap-2">
                                  <Icon name="lucide:check-circle" class="h-3 w-3 text-success" />
                                  <Text size="xs" class="text-muted-foreground">JPG, PNG or GIF format</Text>
                                </li>
                                <li class="flex items-center gap-2">
                                  <Icon name="lucide:check-circle" class="h-3 w-3 text-success" />
                                  <Text size="xs" class="text-muted-foreground">Maximum file size: 5MB</Text>
                                </li>
                                <li class="flex items-center gap-2">
                                  <Icon name="lucide:check-circle" class="h-3 w-3 text-success" />
                                  <Text size="xs" class="text-muted-foreground">Recommended: Square image, 400x400px</Text>
                                </li>
                              </ul>
                            </div>
                            <div v-if="profileData.avatar_url" class="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                @click="removeAvatar"
                                class="text-destructive hover:bg-destructive/10"
                              >
                                <Icon name="lucide:trash-2" class="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Profile Form -->
                      <form @submit.prevent="updateProfile" class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div class="space-y-2">
                            <label class="text-sm font-medium text-foreground">Full Name</label>
                            <div class="relative">
                              <Icon name="lucide:user" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <input
                                v-model="profileData.full_name"
                                type="text"
                                class="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                                placeholder="Enter your full name"
                              />
                            </div>
                          </div>
                          <div class="space-y-2">
                            <label class="text-sm font-medium text-foreground">
                              Username 
                              <Badge variant="secondary" class="ml-1 text-xs">Display Name</Badge>
                            </label>
                            <div class="relative">
                              <Icon name="lucide:at-sign" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <input
                                v-model="profileData.username"
                                type="text"
                                class="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                                placeholder="Choose your display username"
                                pattern="^[a-zA-Z0-9_-]{3,20}$"
                                title="Username must be 3-20 characters, letters, numbers, underscore or hyphen only"
                              />
                            </div>
                            <Text size="xs" class="text-muted-foreground">This will be shown in the navigation bar</Text>
                          </div>
                        </div>

                        <div class="space-y-2">
                          <label class="text-sm font-medium text-foreground">Email</label>
                          <div class="relative">
                            <Icon name="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                          <input
                                :value="user?.email"
                                type="email"
                                disabled
                                class="flex h-11 w-full rounded-lg border border-input bg-muted pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                            />
                          </div>
                          <Text size="xs" class="text-muted-foreground">Email cannot be changed</Text>
                        </div>

                        <div class="space-y-2">
                          <label class="text-sm font-medium text-foreground">Bio</label>
                          <div class="relative">
                            <Icon name="lucide:file-text" class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                          <textarea
                                v-model="profileData.bio"
                                rows="4"
                                class="flex w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200"
                              placeholder="Tell us about yourself"
                              maxlength="500"
                            />
                          </div>
                          <div class="flex justify-between">
                            <Text size="xs" class="text-muted-foreground">Brief description for your profile</Text>
                            <Text size="xs" class="text-muted-foreground">{{ profileData.bio?.length || 0 }}/500</Text>
                          </div>
                        </div>

                        <div class="flex justify-end gap-3 pt-4">
                          <Button type="button" variant="outline" @click="resetProfile">
                            <Icon name="lucide:x" class="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button type="submit" :disabled="saving">
                            <Spinner v-if="saving" class="mr-2 h-4 w-4" />
                            <Icon v-else name="lucide:save" class="h-4 w-4 mr-2" />
                            {{ saving ? 'Saving...' : 'Save Changes' }}
                          </Button>
                        </div>
                      </form>
                    </div>

                    <!-- Preferences Tab -->
                    <div v-else-if="activeTab === 'preferences'" class="space-y-6">
                      <div>
                        <Heading tag="h2" size="h3" class="mb-1">Preferences</Heading>
                        <Text class="text-muted-foreground">Customize your experience</Text>
                      </div>

                      <div class="space-y-6">
                        <!-- Theme Preference -->
                        <Card class="p-4 natural-depth gentle-hover">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <div class="p-2 bg-muted rounded-lg">
                                <Icon name="lucide:palette" class="h-5 w-5 text-foreground" />
                              </div>
                              <div>
                                <Heading tag="h3" size="h6">Theme</Heading>
                                <Text size="sm" class="text-muted-foreground">Choose your preferred theme</Text>
                              </div>
                            </div>
                            <ThemeToggle />
                          </div>
                        </Card>

                        <!-- Language -->
                        <Card class="p-4 natural-depth gentle-hover">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <div class="p-2 bg-muted rounded-lg">
                                <Icon name="lucide:globe" class="h-5 w-5 text-foreground" />
                              </div>
                              <div>
                                <Heading tag="h3" size="h6">Language</Heading>
                                <Text size="sm" class="text-muted-foreground">Select your preferred language</Text>
                              </div>
                            </div>
                            <select 
                              v-model="selectedLanguage" 
                              @change="changeLanguage"
                              class="px-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground font-medium transition-colors hover:bg-muted cursor-pointer"
                            >
                              <option value="en">English</option>
                              <option value="es">Español</option>
                              <option value="fr">Français</option>
                              <option value="de">Deutsch</option>
                              <option value="it">Italiano</option>
                              <option value="pt">Português</option>
                              <option value="ja">日本語</option>
                              <option value="zh">中文</option>
                              <option value="ko">한국어</option>
                            </select>
                          </div>
                        </Card>

                        <!-- Timezone -->
                        <Card class="p-4 natural-depth gentle-hover">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <div class="p-2 bg-muted rounded-lg">
                                <Icon name="lucide:clock" class="h-5 w-5 text-foreground" />
                              </div>
                              <div>
                                <Heading tag="h3" size="h6">Timezone</Heading>
                                <Text size="sm" class="text-muted-foreground">Set your local timezone</Text>
                              </div>
                            </div>
                            <select 
                              v-model="selectedTimezone"
                              @change="changeTimezone"
                              class="px-4 py-2 rounded-lg border border-input bg-background text-sm text-foreground font-medium transition-colors hover:bg-muted cursor-pointer"
                            >
                              <option value="UTC">UTC (Coordinated Universal Time)</option>
                              <option value="America/New_York">EST/EDT (Eastern Time)</option>
                              <option value="America/Chicago">CST/CDT (Central Time)</option>
                              <option value="America/Denver">MST/MDT (Mountain Time)</option>
                              <option value="America/Los_Angeles">PST/PDT (Pacific Time)</option>
                              <option value="Europe/London">GMT/BST (London)</option>
                              <option value="Europe/Paris">CET/CEST (Paris)</option>
                              <option value="Europe/Berlin">CET/CEST (Berlin)</option>
                              <option value="Asia/Tokyo">JST (Tokyo)</option>
                              <option value="Asia/Shanghai">CST (Beijing)</option>
                              <option value="Asia/Seoul">KST (Seoul)</option>
                              <option value="Australia/Sydney">AEST/AEDT (Sydney)</option>
                            </select>
                          </div>
                        </Card>
                      </div>
                    </div>

                    <!-- Notifications Tab -->
                    <div v-else-if="activeTab === 'notifications'" class="space-y-6">
                      <div>
                        <Heading tag="h2" size="h3" class="mb-1">Notifications</Heading>
                        <Text class="text-muted-foreground">Manage how you receive updates</Text>
                      </div>

                      <div class="space-y-4">
                        <Card 
                          v-for="notification in notifications" 
                          :key="notification.id" 
                          class="p-4 natural-depth gentle-hover transition-all duration-200"
                        >
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <div class="p-2 bg-muted rounded-lg">
                                <Icon :name="notification.icon" class="h-5 w-5 text-foreground" />
                              </div>
                              <div>
                                <Heading tag="h3" size="h6">{{ notification.label }}</Heading>
                                <Text size="sm" class="text-muted-foreground">{{ notification.description }}</Text>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                :checked="notification.enabled"
                                @change="toggleNotification(notification.id)"
                                class="sr-only peer"
                              >
                              <div class="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-background after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors"></div>
                            </label>
                          </div>
                        </Card>
                      </div>
                    </div>

                    <!-- Security Tab -->
                    <div v-else-if="activeTab === 'security'" class="space-y-6">
                      <div>
                        <Heading tag="h2" size="h3" class="mb-1">Security</Heading>
                        <Text class="text-muted-foreground">Keep your account secure</Text>
                      </div>

                      <!-- Change Password -->
                      <Card class="p-4 natural-depth gentle-hover">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="p-2 bg-muted rounded-lg">
                              <Icon name="lucide:lock" class="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                              <Heading tag="h3" size="h6">Password</Heading>
                              <Text size="sm" class="text-muted-foreground">Secure your account with a strong password</Text>
                            </div>
                          </div>
                          <Button variant="outline" @click="showPasswordModal = true">
                            Change Password
                          </Button>
                        </div>
                      </Card>

                      <!-- Two-Factor Authentication -->
                      <Card class="p-4 natural-depth gentle-hover">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="p-2 bg-muted rounded-lg">
                              <Icon name="lucide:smartphone" class="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                              <Heading tag="h3" size="h6">Two-Factor Authentication</Heading>
                              <Text size="sm" class="text-muted-foreground">Add an extra layer of security</Text>
                            </div>
                          </div>
                          <Badge variant="outline">Coming Soon</Badge>
                        </div>
                      </Card>

                      <!-- Active Sessions -->
                      <div>
                        <Heading tag="h3" size="h5" class="mb-3">Active Sessions</Heading>
                        <Card class="p-4 natural-depth">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <div class="p-2 bg-success/10 rounded-lg">
                                <Icon name="lucide:monitor" class="h-5 w-5 text-success" />
                              </div>
                              <div>
                                <Heading tag="h4" size="h6">Current Session</Heading>
                                <Text size="sm" class="text-muted-foreground">{{ currentDevice }} • Active now</Text>
                              </div>
                            </div>
                            <Badge variant="default">Active</Badge>
                          </div>
                        </Card>
                      </div>

                      <!-- Delete Account -->
                      <Card class="p-4 border-destructive/20 bg-destructive/5 natural-depth">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-3">
                            <div class="p-2 bg-destructive/10 rounded-lg">
                              <Icon name="lucide:trash-2" class="h-5 w-5 text-destructive" />
                            </div>
                            <div>
                              <Heading tag="h3" size="h6" class="text-destructive">Delete Account</Heading>
                              <Text size="sm" class="text-muted-foreground">Permanently delete your account and all data</Text>
                            </div>
                          </div>
                          <Button variant="destructive" @click="showDeleteModal = true">
                            Delete Account
                          </Button>
                        </div>
                      </Card>
                    </div>

                    <!-- Billing Tab -->
                    <div v-else-if="activeTab === 'billing'" class="space-y-6">
                      <div>
                        <Heading tag="h2" size="h3" class="mb-1">Billing & Subscription</Heading>
                        <Text class="text-muted-foreground">Manage your subscription and payment methods</Text>
                      </div>

                      <!-- Current Plan -->
                      <Card class="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 natural-depth gentle-hover">
                        <div class="flex items-center justify-between mb-4">
                          <div>
                            <Heading tag="h3" size="h4">Free Plan</Heading>
                            <Text size="sm" class="text-muted-foreground">Your current subscription</Text>
                          </div>
                          <Badge variant="default">Active</Badge>
                        </div>
                        <div class="space-y-2 mb-6">
                          <div class="flex items-center gap-2">
                            <Icon name="lucide:check-circle" class="h-4 w-4 text-success flex-shrink-0" />
                            <Text size="sm">3 Projects</Text>
                          </div>
                          <div class="flex items-center gap-2">
                            <Icon name="lucide:check-circle" class="h-4 w-4 text-success flex-shrink-0" />
                            <Text size="sm">Basic AI Features</Text>
                          </div>
                          <div class="flex items-center gap-2">
                            <Icon name="lucide:check-circle" class="h-4 w-4 text-success flex-shrink-0" />
                            <Text size="sm">Community Access</Text>
                          </div>
                        </div>
                        <Button class="w-full" @click="navigateTo('/pricing')">
                          <Icon name="lucide:zap" class="h-4 w-4 mr-2" />
                          Upgrade Plan
                        </Button>
                      </Card>

                      <!-- Payment Methods -->
                      <div>
                        <Heading tag="h3" size="h5" class="mb-3">Payment Methods</Heading>
                        <Card class="p-8 text-center natural-depth">
                          <Icon name="lucide:credit-card" class="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                          <Text class="text-muted-foreground mb-4">No payment methods added</Text>
                          <Button variant="outline">
                            <Icon name="lucide:plus" class="h-4 w-4 mr-2" />
                            Add Payment Method
                          </Button>
                        </Card>
                      </div>
                    </div>
                  </Transition>
                </GlassCard>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <!-- Footer -->
      <Footer />
    </div>

    <!-- Password Change Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showPasswordModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" @click="showPasswordModal = false"></div>
          <GlassCard variant="heavy" class="relative z-10 w-full max-w-md p-6">
            <div class="flex items-center justify-between mb-4">
              <Heading tag="h3" size="h4">Change Password</Heading>
              <button @click="showPasswordModal = false" class="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="lucide:x" class="h-5 w-5" />
              </button>
            </div>
            
            <form @submit.prevent="changePassword" class="space-y-4">
              <div class="space-y-2">
                <Text size="sm" class="font-medium text-foreground">Current Password</Text>
                <div class="relative">
                  <Icon name="lucide:lock" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    v-model="passwordForm.current"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    class="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-10 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon :name="showCurrentPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <Text size="sm" class="font-medium text-foreground">New Password</Text>
                <div class="relative">
                  <Icon name="lucide:lock" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    v-model="passwordForm.new"
                    :type="showNewPassword ? 'text' : 'password'"
                    class="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-10 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter new password"
                    minlength="6"
                    required
                  />
                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon :name="showNewPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <Text size="sm" class="font-medium text-foreground">Confirm New Password</Text>
                <div class="relative">
                  <Icon name="lucide:lock" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    v-model="passwordForm.confirm"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-10 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Confirm new password"
                    minlength="6"
                    required
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon :name="showConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div class="flex gap-3 pt-2">
                <Button type="button" variant="outline" class="flex-1" @click="showPasswordModal = false">
                  Cancel
                </Button>
                <Button type="submit" class="flex-1" :disabled="changingPassword">
                  <Spinner v-if="changingPassword" class="mr-2 h-4 w-4" />
                  {{ changingPassword ? 'Changing...' : 'Change Password' }}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Account Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" @click="showDeleteModal = false"></div>
          <GlassCard variant="heavy" class="relative z-10 w-full max-w-md p-6">
            <div class="mb-4">
              <div class="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <Icon name="lucide:alert-triangle" class="h-6 w-6 text-destructive" />
              </div>
              <Heading tag="h3" size="h4" class="mb-2">Delete Account</Heading>
              <Text class="text-muted-foreground">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </Text>
            </div>
            
            <div class="space-y-4">
              <Card class="p-3 bg-destructive/5 border-destructive/20">
                <Text size="sm" class="text-destructive">
                  Type <span class="font-mono font-semibold">DELETE</span> to confirm
                </Text>
              </Card>
              
              <input
                v-model="deleteConfirmText"
                type="text"
                class="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Type DELETE to confirm"
              />

              <div class="flex gap-3">
                <Button variant="outline" class="flex-1" @click="showDeleteModal = false">
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  class="flex-1" 
                  :disabled="deleteConfirmText !== 'DELETE' || deletingAccount"
                  @click="deleteAccount"
                >
                  <Spinner v-if="deletingAccount" class="mr-2 h-4 w-4" />
                  {{ deletingAccount ? 'Deleting...' : 'Delete Account' }}
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </Transition>
    </Teleport>

    <!-- Success/Error Messages -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="message" class="fixed bottom-4 right-4 z-50">
          <Card :class="[
            'p-4 shadow-lg backdrop-blur-sm natural-depth',
            messageType === 'success' ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'
          ]">
            <div class="flex items-center gap-3">
              <Icon 
                :name="messageType === 'success' ? 'lucide:check-circle' : 'lucide:x-circle'"
                :class="[
                  'h-5 w-5 flex-shrink-0',
                  messageType === 'success' ? 'text-success' : 'text-destructive'
                ]"
              />
              <Text class="font-medium text-foreground">{{ message }}</Text>
            </div>
          </Card>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick, watch } from 'vue'
import { logger } from '~/utils/logger'

// Page meta
definePageMeta({
  name: 'account',
  middleware: 'auth',
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
const isDragging = ref(false)
const avatarPreview = ref('')
const changingPassword = ref(false)
const deletingAccount = ref(false)
const deleteConfirmText = ref('')

// Password form
const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

// Password visibility
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Profile data
const profileData = reactive({
  full_name: '',
  username: '',
  bio: '',
  avatar_url: '',
})

// Preferences
const selectedLanguage = ref('en')
const selectedTimezone = ref('UTC')

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

// Notifications settings with icons
const notifications = ref([
  { id: 'email_updates', label: 'Email Updates', description: 'Receive updates about your projects', enabled: true, icon: 'lucide:mail' },
  { id: 'email_marketing', label: 'Marketing Emails', description: 'News and special offers', enabled: false, icon: 'lucide:megaphone' },
  { id: 'email_community', label: 'Community Updates', description: 'New posts and discussions', enabled: true, icon: 'lucide:users' },
  { id: 'browser_notifications', label: 'Browser Notifications', description: 'Real-time alerts in your browser', enabled: false, icon: 'lucide:bell-ring' },
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
    
    setTimeout(() => {
      message.value = ''
    }, 5000)
  } finally {
    saving.value = false
  }
}

// Reset profile form
const resetProfile = () => {
  Object.assign(profileData, originalProfileData.value)
  avatarPreview.value = ''
}

// Handle avatar upload
const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files?.length) {
    processAvatarFile(files[0])
  }
}

const handleAvatarUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processAvatarFile(file)
  }
}

const processAvatarFile = async (file: File) => {
  if (!user.value) return

  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    message.value = 'File size must be less than 5MB'
    messageType.value = 'error'
    setTimeout(() => message.value = '', 3000)
    return
  }

  // Show preview
  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

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
    avatarPreview.value = ''
  } catch (error: any) {
    message.value = error.message || 'Failed to upload avatar'
    messageType.value = 'error'
    logger.error('Error uploading avatar:', error)
    setTimeout(() => message.value = '', 5000)
  } finally {
    saving.value = false
  }
}

// Remove avatar
const removeAvatar = async () => {
  profileData.avatar_url = ''
  avatarPreview.value = ''
  await updateProfile()
}

// Change password
const changePassword = async () => {
  if (passwordForm.new !== passwordForm.confirm) {
    message.value = 'New passwords do not match'
    messageType.value = 'error'
    setTimeout(() => message.value = '', 3000)
    return
  }

  changingPassword.value = true
  
  try {
    const { error } = await supabase.auth.updateUser({
      password: passwordForm.new
    })

    if (error) throw error

    message.value = 'Password changed successfully!'
    messageType.value = 'success'
    showPasswordModal.value = false
    
    // Reset form
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''
    
    setTimeout(() => message.value = '', 3000)
  } catch (error: any) {
    message.value = error.message || 'Failed to change password'
    messageType.value = 'error'
    logger.error('Error changing password:', error)
    setTimeout(() => message.value = '', 5000)
  } finally {
    changingPassword.value = false
  }
}

// Delete account
const deleteAccount = async () => {
  if (deleteConfirmText.value !== 'DELETE') return

  deletingAccount.value = true

  try {
    // This would typically call a server function to delete the user
    // For now, we'll just sign out
    await supabase.auth.signOut()
    await router.push('/')
    
    // In production, you'd call something like:
    // const { error } = await supabase.rpc('delete_user_account')
    
  } catch (error: any) {
    message.value = error.message || 'Failed to delete account'
    messageType.value = 'error'
    logger.error('Error deleting account:', error)
  } finally {
    deletingAccount.value = false
    showDeleteModal.value = false
  }
}

// Toggle notification
const toggleNotification = (id: string) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.enabled = !notification.enabled
    // Here you would save the preference to the database
    message.value = `${notification.label} ${notification.enabled ? 'enabled' : 'disabled'}`
    messageType.value = 'success'
    setTimeout(() => message.value = '', 2000)
  }
}

// Change language
const changeLanguage = async () => {
  try {
    // Store language preference in localStorage
    if (process.client) {
      localStorage.setItem('preferred-language', selectedLanguage.value)
    }
    
    // Update user metadata if logged in
    if (user.value) {
      await supabase.auth.updateUser({
        data: { 
          preferred_language: selectedLanguage.value
        }
      })
    }
    
    // Show success message
    const languageNames: Record<string, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      it: 'Italiano',
      pt: 'Português',
      ja: '日本語',
      zh: '中文',
      ko: '한국어'
    }
    
    message.value = `Language changed to ${languageNames[selectedLanguage.value]}`
    messageType.value = 'success'
    setTimeout(() => message.value = '', 3000)
    
    // In a real app, you would trigger i18n locale change here
    // await $i18n.setLocale(selectedLanguage.value)
  } catch (error) {
    logger.error('Error changing language:', error)
    message.value = 'Failed to change language'
    messageType.value = 'error'
    setTimeout(() => message.value = '', 3000)
  }
}

// Change timezone
const changeTimezone = async () => {
  try {
    // Store timezone preference
    if (process.client) {
      localStorage.setItem('preferred-timezone', selectedTimezone.value)
    }
    
    // Update user metadata if logged in
    if (user.value) {
      await supabase.auth.updateUser({
        data: { 
          preferred_timezone: selectedTimezone.value
        }
      })
    }
    
    message.value = `Timezone changed to ${selectedTimezone.value}`
    messageType.value = 'success'
    setTimeout(() => message.value = '', 3000)
  } catch (error) {
    logger.error('Error changing timezone:', error)
    message.value = 'Failed to change timezone'
    messageType.value = 'error'
    setTimeout(() => message.value = '', 3000)
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

// Reset modal forms when closed
watch(showPasswordModal, (val) => {
  if (!val) {
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''
    showCurrentPassword.value = false
    showNewPassword.value = false
    showConfirmPassword.value = false
  }
})

watch(showDeleteModal, (val) => {
  if (!val) {
    deleteConfirmText.value = ''
  }
})

// Load preferences
const loadPreferences = () => {
  if (process.client) {
    // Load from localStorage first
    const savedLanguage = localStorage.getItem('preferred-language')
    const savedTimezone = localStorage.getItem('preferred-timezone')
    
    if (savedLanguage) selectedLanguage.value = savedLanguage
    if (savedTimezone) selectedTimezone.value = savedTimezone
    
    // Override with user metadata if available
    if (user.value?.user_metadata) {
      if (user.value.user_metadata.preferred_language) {
        selectedLanguage.value = user.value.user_metadata.preferred_language
      }
      if (user.value.user_metadata.preferred_timezone) {
        selectedTimezone.value = user.value.user_metadata.preferred_timezone
      }
    }
  }
}

// Load profile on mount
onMounted(() => {
  loadProfile()
  loadPreferences()
})
</script>

<style scoped>
/* Tab transition */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tab-fade-enter-from,
.tab-fade-leave-to {
  opacity: 0;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative {
  transform: scale(0.95);
}

.modal-leave-to .relative {
  transform: scale(0.95);
}

/* Toast transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>