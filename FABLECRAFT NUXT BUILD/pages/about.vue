<template>
  <div
    id="about-page"
    class="min-h-screen bg-background transition-colors duration-300"
  >
    <!-- Background Effects Layer -->
    <ClientOnly>
      <div class="fixed inset-0 pointer-events-none z-0">
        <LazyPaperTexture />
        <LazyGradientNoiseBackdrop />
        <LazyVignetteOverlay strength="subtle" />
      </div>
      
      <template #fallback>
        <div class="fixed inset-0 pointer-events-none z-0" />
      </template>
    </ClientOnly>

    <!-- Main Content Layer -->
    <div class="relative z-10">
      <!-- Navigation Header -->
      <NavigationHeader
        :is-authenticated="isAuthenticated"
        :user="user"
        @auth:click="handleAuth"
        @auth:logout="handleLogout"
        @navigate="handleNavigate"
        @logo:click="handleHome"
      />

      <!-- Main Content -->
      <main id="main-content" class="relative z-20">
        <!-- Hero Section -->
        <Section spacing="none" class="hero-section">
          <div class="py-20 sm:py-28">
            <Container size="xl">
              <div class="text-center max-w-4xl mx-auto">
                <!-- Hero Badge -->
                <MHeroBadge
                  text="Building the Future"
                  variant="gradient"
                  icon="lucide:sparkles"
                  class="mb-6"
                />
                
                <!-- Hero Heading -->
                <MHeroHeading
                  title="About "
                  highlight-text="Fablecraft"
                  subheading="Where creativity meets technology to transform your wildest ideas into reality"
                  heading-tag="h1"
                  heading-id="about-heading"
                  variant="default"
                  size="xl"
                  alignment="center"
                  gradient-variant="primary"
                  gradient-animation="shimmer"
                  spacing="default"
                />
              </div>
            </Container>
          </div>
        </Section>

        <!-- Mission Section -->
        <Section spacing="none" class="mission-section">
          <div class="py-16 sm:py-20">
            <Container size="xl">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Icon name="lucide:target" class="h-4 w-4 text-primary" />
                    <Text size="sm" class="font-medium text-primary">Our Mission</Text>
                  </div>
                  
                  <Heading tag="h2" size="h2" class="text-foreground">
                    Democratizing Creative Excellence
                  </Heading>
                  
                  <Text size="lg" class="text-muted-foreground leading-relaxed">
                    We believe everyone has a story to tell and the potential to create something extraordinary. 
                    Fablecraft removes the technical barriers between imagination and creation, empowering creators 
                    of all skill levels to bring their visions to life.
                  </Text>
                  
                  <div class="space-y-4 pt-4">
                    <div class="flex gap-4">
                      <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="lucide:users" class="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Heading tag="h3" size="h5" class="text-foreground mb-1">Community First</Heading>
                        <Text size="sm" class="text-muted-foreground">
                          Building a supportive ecosystem where creators inspire and learn from each other
                        </Text>
                      </div>
                    </div>
                    
                    <div class="flex gap-4">
                      <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="lucide:zap" class="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Heading tag="h3" size="h5" class="text-foreground mb-1">Innovation Driven</Heading>
                        <Text size="sm" class="text-muted-foreground">
                          Leveraging cutting-edge AI and technology to push creative boundaries
                        </Text>
                      </div>
                    </div>
                    
                    <div class="flex gap-4">
                      <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="lucide:heart" class="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Heading tag="h3" size="h5" class="text-foreground mb-1">Passion Powered</Heading>
                        <Text size="sm" class="text-muted-foreground">
                          Created by creators, for creators, with love for the craft
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Visual Element -->
                <div class="relative">
                  <GlassCard variant="light" class="p-8">
                    <div class="aspect-square rounded-lg bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center">
                      <div class="text-center space-y-4">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/80 backdrop-blur-sm">
                          <Icon name="lucide:palette" class="h-10 w-10 text-primary" />
                        </div>
                        <Text size="lg" class="font-semibold text-foreground">Creating Magic Together</Text>
                      </div>
                    </div>
                  </GlassCard>
                  
                  <!-- Decorative elements -->
                  <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                  <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
                </div>
              </div>
            </Container>
          </div>
        </Section>

        <!-- Values Section -->
        <Section spacing="none" class="values-section bg-muted/30">
          <div class="py-16 sm:py-20">
            <Container size="xl">
              <div class="text-center max-w-3xl mx-auto mb-12">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Icon name="lucide:star" class="h-4 w-4 text-primary" />
                  <Text size="sm" class="font-medium text-primary">Our Values</Text>
                </div>
                
                <Heading tag="h2" size="h2" class="text-foreground mb-4">
                  Principles That Guide Us
                </Heading>
                
                <Text size="lg" class="text-muted-foreground">
                  Every decision we make is guided by our commitment to these core values
                </Text>
              </div>
              
              <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard variant="light" class="p-6 text-center natural-depth gentle-hover">
                  <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <Icon name="lucide:lightbulb" class="h-6 w-6 text-primary" />
                  </div>
                  <Heading tag="h3" size="h5" class="text-foreground mb-2">Creativity</Heading>
                  <Text size="sm" class="text-muted-foreground">
                    Fostering imagination and original thinking in everything we do
                  </Text>
                </GlassCard>
                
                <GlassCard variant="light" class="p-6 text-center natural-depth gentle-hover">
                  <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4">
                    <Icon name="lucide:shield-check" class="h-6 w-6 text-accent" />
                  </div>
                  <Heading tag="h3" size="h5" class="text-foreground mb-2">Trust</Heading>
                  <Text size="sm" class="text-muted-foreground">
                    Building transparent relationships with our community
                  </Text>
                </GlassCard>
                
                <GlassCard variant="light" class="p-6 text-center natural-depth gentle-hover">
                  <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 mb-4">
                    <Icon name="lucide:globe" class="h-6 w-6 text-secondary" />
                  </div>
                  <Heading tag="h3" size="h5" class="text-foreground mb-2">Accessibility</Heading>
                  <Text size="sm" class="text-muted-foreground">
                    Making creative tools available to everyone, everywhere
                  </Text>
                </GlassCard>
                
                <GlassCard variant="light" class="p-6 text-center natural-depth gentle-hover">
                  <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <Icon name="lucide:rocket" class="h-6 w-6 text-primary" />
                  </div>
                  <Heading tag="h3" size="h5" class="text-foreground mb-2">Excellence</Heading>
                  <Text size="sm" class="text-muted-foreground">
                    Continuously improving and exceeding expectations
                  </Text>
                </GlassCard>
              </div>
            </Container>
          </div>
        </Section>

        <!-- Team Section -->
        <Section spacing="none" class="team-section">
          <div class="py-16 sm:py-20">
            <Container size="xl">
              <div class="text-center max-w-3xl mx-auto mb-12">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Icon name="lucide:users-2" class="h-4 w-4 text-primary" />
                  <Text size="sm" class="font-medium text-primary">Our Team</Text>
                </div>
                
                <Heading tag="h2" size="h2" class="text-foreground mb-4">
                  Meet the Creators
                </Heading>
                
                <Text size="lg" class="text-muted-foreground">
                  A passionate team of designers, developers, and dreamers working together to revolutionize creative tools
                </Text>
              </div>
              
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Team Member 1 -->
                <div class="text-center">
                  <div class="relative inline-block mb-4">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon name="lucide:user" class="h-12 w-12 text-primary" />
                    </div>
                    <div class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-success border-2 border-background flex items-center justify-center">
                      <Icon name="lucide:check" class="h-4 w-4 text-background" />
                    </div>
                  </div>
                  <Heading tag="h3" size="h5" class="text-foreground mb-1">Alex Chen</Heading>
                  <Text size="sm" class="text-primary mb-2">Founder & CEO</Text>
                  <Text size="sm" class="text-muted-foreground">
                    Visionary leader with 15+ years in creative technology
                  </Text>
                </div>
                
                <!-- Team Member 2 -->
                <div class="text-center">
                  <div class="relative inline-block mb-4">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                      <Icon name="lucide:user" class="h-12 w-12 text-accent" />
                    </div>
                    <div class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-success border-2 border-background flex items-center justify-center">
                      <Icon name="lucide:check" class="h-4 w-4 text-background" />
                    </div>
                  </div>
                  <Heading tag="h3" size="h5" class="text-foreground mb-1">Sarah Williams</Heading>
                  <Text size="sm" class="text-primary mb-2">Head of Design</Text>
                  <Text size="sm" class="text-muted-foreground">
                    Award-winning designer passionate about user experience
                  </Text>
                </div>
                
                <!-- Team Member 3 -->
                <div class="text-center">
                  <div class="relative inline-block mb-4">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                      <Icon name="lucide:user" class="h-12 w-12 text-secondary" />
                    </div>
                    <div class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-success border-2 border-background flex items-center justify-center">
                      <Icon name="lucide:check" class="h-4 w-4 text-background" />
                    </div>
                  </div>
                  <Heading tag="h3" size="h5" class="text-foreground mb-1">Marcus Johnson</Heading>
                  <Text size="sm" class="text-primary mb-2">CTO</Text>
                  <Text size="sm" class="text-muted-foreground">
                    AI expert building the future of creative tools
                  </Text>
                </div>
              </div>
            </Container>
          </div>
        </Section>

        <!-- Journey Section -->
        <Section spacing="none" class="journey-section bg-muted/30">
          <div class="py-16 sm:py-20">
            <Container size="xl">
              <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12">
                  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <Icon name="lucide:map" class="h-4 w-4 text-primary" />
                    <Text size="sm" class="font-medium text-primary">Our Journey</Text>
                  </div>
                  
                  <Heading tag="h2" size="h2" class="text-foreground mb-4">
                    From Idea to Impact
                  </Heading>
                </div>
                
                <div class="space-y-8">
                  <!-- Timeline Item 1 -->
                  <div class="flex gap-6">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Text size="sm" class="font-bold text-primary">2020</Text>
                    </div>
                    <div class="flex-1 pb-8 border-l-2 border-border/50 pl-6 -ml-6">
                      <Heading tag="h3" size="h5" class="text-foreground mb-2">The Spark</Heading>
                      <Text size="sm" class="text-muted-foreground">
                        Fablecraft was born from a simple idea: make creative tools that anyone can use
                      </Text>
                    </div>
                  </div>
                  
                  <!-- Timeline Item 2 -->
                  <div class="flex gap-6">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                      <Text size="sm" class="font-bold text-accent">2021</Text>
                    </div>
                    <div class="flex-1 pb-8 border-l-2 border-border/50 pl-6 -ml-6">
                      <Heading tag="h3" size="h5" class="text-foreground mb-2">Building the Foundation</Heading>
                      <Text size="sm" class="text-muted-foreground">
                        Assembled a world-class team and developed our core AI technology
                      </Text>
                    </div>
                  </div>
                  
                  <!-- Timeline Item 3 -->
                  <div class="flex gap-6">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center">
                      <Text size="sm" class="font-bold text-secondary">2022</Text>
                    </div>
                    <div class="flex-1 pb-8 border-l-2 border-border/50 pl-6 -ml-6">
                      <Heading tag="h3" size="h5" class="text-foreground mb-2">Community Launch</Heading>
                      <Text size="sm" class="text-muted-foreground">
                        Opened our doors to creators worldwide and grew to 100,000+ users
                      </Text>
                    </div>
                  </div>
                  
                  <!-- Timeline Item 4 -->
                  <div class="flex gap-6">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary border-2 border-primary flex items-center justify-center">
                      <Text size="sm" class="font-bold text-background">2024</Text>
                    </div>
                    <div class="flex-1">
                      <Heading tag="h3" size="h5" class="text-foreground mb-2">The Future</Heading>
                      <Text size="sm" class="text-muted-foreground">
                        Expanding our platform with revolutionary features and global reach
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </Section>

        <!-- CTA Section -->
        <Section spacing="none" class="cta-section">
          <div class="py-20 sm:py-28">
            <Container size="xl">
              <GlassCard variant="heavy" class="p-12 text-center natural-depth">
                <div class="max-w-3xl mx-auto">
                  <Heading tag="h2" size="h2" class="text-foreground mb-4">
                    Ready to Create Something Amazing?
                  </Heading>
                  
                  <Text size="lg" class="text-muted-foreground mb-8">
                    Join thousands of creators who are already transforming their ideas into reality with Fablecraft
                  </Text>
                  
                  <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      variant="default"
                      class="px-8"
                      @click="handleGetStarted"
                    >
                      <Icon name="lucide:rocket" class="mr-2 h-5 w-5" />
                      Get Started Free
                    </Button>
                    
                    <Button
                      size="lg"
                      variant="outline"
                      class="px-8"
                      @click="handleContactSales"
                    >
                      <Icon name="lucide:message-circle" class="mr-2 h-5 w-5" />
                      Contact Sales
                    </Button>
                  </div>
                  
                  <div class="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-border/20">
                    <div class="text-center">
                      <Text size="2xl" class="font-bold text-foreground">1M+</Text>
                      <Text size="sm" class="text-muted-foreground">Creations</Text>
                    </div>
                    <div class="text-center">
                      <Text size="2xl" class="font-bold text-foreground">150+</Text>
                      <Text size="sm" class="text-muted-foreground">Countries</Text>
                    </div>
                    <div class="text-center">
                      <Text size="2xl" class="font-bold text-foreground">4.9</Text>
                      <Text size="sm" class="text-muted-foreground">Rating</Text>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Container>
          </div>
        </Section>
      </main>

      <!-- Footer -->
      <Footer
        @navigate="handleNavigate"
        @social="handleSocialClick"
      />
    </div>

    <!-- Auth Overlay -->
    <ClientOnly>
      <AuthOverlay />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Composables
const user = useSupabaseUser()
const router = useRouter()

// Computed
const isAuthenticated = computed(() => !!user.value)

// Handlers
const handleAuth = () => {
  if (process.client) {
    const { open } = useAuthOverlay()
    open('login')
  }
}

const handleLogout = async () => {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  await router.push('/')
  if (process.client) {
    window.location.reload()
  }
}

const handleNavigate = (view: string) => {
  if (view === 'home') {
    navigateTo('/')
  } else {
    navigateTo(`/${view}`)
  }
}

const handleHome = () => {
  navigateTo('/')
}

const handleGetStarted = () => {
  if (isAuthenticated.value) {
    navigateTo('/dashboard')
  } else {
    if (process.client) {
      const { open } = useAuthOverlay()
      open('signup')
    }
  }
}

const handleContactSales = () => {
  navigateTo('/contact')
}

const handleSocialClick = (platform: string) => {
  // Handle social media clicks
  console.log('Social click:', platform)
}

// SEO Meta
useHead({
  title: 'About - Fablecraft | Our Mission & Story',
  meta: [
    {
      name: 'description',
      content: 'Learn about Fablecraft\'s mission to democratize creative excellence. Discover our values, meet our team, and join us in transforming ideas into reality.'
    },
    {
      property: 'og:title',
      content: 'About Fablecraft - Where Creativity Meets Technology'
    },
    {
      property: 'og:description',
      content: 'Discover how Fablecraft is revolutionizing creative tools with AI-powered technology. Join our community of creators worldwide.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ]
})
</script>

<style scoped>
/* Page-specific styles if needed */
.hero-section {
  position: relative;
}

.mission-section,
.values-section,
.team-section,
.journey-section,
.cta-section {
  position: relative;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>