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
        <!-- Hero Section - Identical to Landing Page -->
        <Section spacing="none" class="hero-section">
          <div class="py-20 sm:py-28">
            <OHeroSection
              id="about-hero"
              badge-text="Innovating Since 2022 • Hartford, CT"
              title="About "
              highlight-text="Fablecraft"
              description="Empowering creators worldwide with AI-powered tools that transform imagination into reality. From our innovation hub in Hartford, Connecticut, we're building the future of creative technology."
              primary-button-text="Join Our Mission"
              secondary-button-text="View Our Story"
              variant="default"
              @primary:click="handleGetStarted"
              @secondary:click="scrollToJourney"
              @badge:click="handleBadgeClick"
            />
          </div>
        </Section>

                <!-- Mission Section -->
        <Section spacing="none" class="mission-section">
          <div class="py-16 sm:py-20">
            <Container size="xl">
              <!-- Mission Header -->
              <div class="text-center max-w-3xl mx-auto mb-16">
                <div class="flex justify-center mb-8">
                  <MHeroBadge
                    text="Our Mission"
                    variant="default"
                    size="base"
                    dot-color="primary"
                    dot-speed="normal"
                  />
                </div>
                
                <Heading tag="h2" size="h1" class="text-foreground mb-8 text-center">
                  <span class="block mb-2">Democratizing</span>
                  <AGradientText
                    tag="span"
                    variant="primary"
                    direction="to-r"
                    intensity="normal"
                    class="bg-clip-text text-transparent"
                  >
                    Creative Excellence
                  </AGradientText>
                </Heading>
                
                <Text size="lg" class="text-muted-foreground leading-relaxed text-center">
                  We believe everyone has a story to tell. Fablecraft transforms imagination into reality.
                </Text>
              </div>

              <!-- Stories Come Alive Section -->
              <div class="relative max-w-6xl mx-auto">
                <!-- Interactive Canvas Area -->
                <div class="relative h-[500px] rounded-2xl bg-gradient-to-br from-background via-background/95 to-background border border-border/50 overflow-hidden">
                  <!-- Animated Grid Background -->
                  <div class="absolute inset-0 opacity-[0.03]">
                    <div class="absolute inset-0" style="background-image: linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px); background-size: 50px 50px; animation: grid-move 20s linear infinite;" />
                  </div>
                  
                  <!-- Central Creation Animation -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <!-- Orbiting Elements -->
                    <div class="relative w-[400px] h-[400px]">
                      <!-- Center Core -->
                      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                        <div class="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-full blur-2xl opacity-40 animate-pulse" />
                        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 flex items-center justify-center">
                          <Icon name="lucide:sparkles" class="h-12 w-12 text-primary animate-pulse" />
                        </div>
                      </div>
                      
                      <!-- Orbiting Creation Elements -->
                      <div class="absolute inset-0 animate-spin-slow">
                        <!-- Text Element -->
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div class="w-20 h-20 bg-background/90 backdrop-blur-sm border border-border/30 rounded-xl flex items-center justify-center shadow-lg animate-float">
                            <Icon name="lucide:type" class="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        
                        <!-- Image Element -->
                        <div class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                          <div class="w-20 h-20 bg-background/90 backdrop-blur-sm border border-border/30 rounded-xl flex items-center justify-center shadow-lg animate-float animation-delay-2000">
                            <Icon name="lucide:image" class="h-8 w-8 text-accent" />
                          </div>
                        </div>
                        
                        <!-- Video Element -->
                        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                          <div class="w-20 h-20 bg-background/90 backdrop-blur-sm border border-border/30 rounded-xl flex items-center justify-center shadow-lg animate-float animation-delay-4000">
                            <Icon name="lucide:video" class="h-8 w-8 text-primary" />
                          </div>
                        </div>
                        
                        <!-- Audio Element -->
                        <div class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                          <div class="w-20 h-20 bg-background/90 backdrop-blur-sm border border-border/30 rounded-xl flex items-center justify-center shadow-lg animate-float animation-delay-1000">
                            <Icon name="lucide:music" class="h-8 w-8 text-primary" />
                          </div>
                        </div>
                      </div>
                      
                      <!-- Connection Lines -->
                      <svg class="absolute inset-0 w-full h-full pointer-events-none">
                        <circle cx="200" cy="200" r="120" fill="none" stroke="url(#gradient)" stroke-width="1" stroke-dasharray="5,5" opacity="0.3" class="animate-spin-reverse-slow" />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="hsl(var(--primary))" />
                            <stop offset="50%" stop-color="hsl(var(--accent))" />
                            <stop offset="100%" stop-color="hsl(var(--secondary))" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      <!-- Floating Particles -->
                      <div class="absolute inset-0">
                        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full animate-float-particle-1" />
                        <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-accent/60 rounded-full animate-float-particle-2" />
                        <div class="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-float-particle-3" />
                        <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-float-particle-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </Section>

        <!-- Values Section -->
        <Section spacing="none" class="values-section">
          <div class="py-20 sm:py-24">
            <Container size="xl">
              <!-- Section Header -->
              <div class="text-center max-w-4xl mx-auto mb-16">
                <div class="flex justify-center mb-8">
                  <MHeroBadge
                    text="Our Values"
                    variant="default"
                    size="base"
                    dot-color="primary"
                    dot-speed="normal"
                  />
                </div>
                
                <Heading tag="h2" size="h1" class="text-foreground mb-8 text-center">
                  <span class="block">Principles</span>
                  <AGradientText
                    tag="span"
                    variant="primary"
                    direction="to-r"
                    intensity="vibrant"
                    class="block"
                  >
                    That Guide Us
                  </AGradientText>
                </Heading>
                
                <Text size="lg" class="text-muted-foreground leading-relaxed text-center">
                  Every decision we make is guided by our commitment to these core values
                </Text>
              </div>
              
              <!-- Values Grid -->
              <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Creativity -->
                <GlassCard variant="light" class="relative p-8 text-center natural-depth gentle-hover group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div class="relative z-10">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:lightbulb" class="h-7 w-7 text-primary" />
                    </div>
                    <Heading tag="h3" size="h5" class="text-foreground mb-3">Creativity</Heading>
                    <Text size="sm" class="text-muted-foreground leading-relaxed">
                      Fostering imagination and original thinking in everything we do
                    </Text>
                  </div>
                </GlassCard>
                
                <!-- Trust -->
                <GlassCard variant="light" class="relative p-8 text-center natural-depth gentle-hover group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div class="relative z-10">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:shield-check" class="h-7 w-7 text-accent" />
                    </div>
                    <Heading tag="h3" size="h5" class="text-foreground mb-3">Trust</Heading>
                    <Text size="sm" class="text-muted-foreground leading-relaxed">
                      Building transparent relationships with our community
                    </Text>
                  </div>
                </GlassCard>
                
                <!-- Accessibility -->
                <GlassCard variant="light" class="relative p-8 text-center natural-depth gentle-hover group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div class="relative z-10">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:globe-2" class="h-7 w-7 text-secondary" />
                    </div>
                    <Heading tag="h3" size="h5" class="text-foreground mb-3">Accessibility</Heading>
                    <Text size="sm" class="text-muted-foreground leading-relaxed">
                      Making creative tools available to everyone, everywhere
                    </Text>
                  </div>
                </GlassCard>
                
                <!-- Excellence -->
                <GlassCard variant="light" class="relative p-8 text-center natural-depth gentle-hover group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div class="relative z-10">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:rocket" class="h-7 w-7 text-primary" />
                    </div>
                    <Heading tag="h3" size="h5" class="text-foreground mb-3">Excellence</Heading>
                    <Text size="sm" class="text-muted-foreground leading-relaxed">
                      Continuously improving and exceeding expectations
                    </Text>
                  </div>
                </GlassCard>
              </div>
            </Container>
          </div>
        </Section>

        <!-- Team Section -->
        <Section spacing="none" class="team-section">
          <div class="py-20 sm:py-24">
            <Container size="xl">
              <!-- Section Header -->
              <div class="text-center max-w-4xl mx-auto mb-16">
                <div class="flex justify-center mb-8">
                  <MHeroBadge
                    text="Leadership Team"
                    variant="default"
                    size="base"
                    dot-color="accent"
                    dot-speed="normal"
                  />
                </div>
                
                <Heading tag="h2" size="h1" class="text-foreground mb-8">
                  Meet Our 
                  <AGradientText
                    tag="span"
                    variant="accent"
                    direction="to-r"
                    intensity="vibrant"
                  >
                    Visionaries
                  </AGradientText>
                </Heading>
                
                <Text size="lg" class="text-muted-foreground leading-relaxed">
                  Industry veterans from Hartford, CT, leading the charge in democratizing creative tools
                </Text>
              </div>
              
              <div class="grid md:grid-cols-3 gap-8">
                <!-- CEO - Chris Johanson -->
                <div class="group relative">
                  <GlassCard variant="light" class="p-6 h-full natural-depth gentle-hover overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div class="relative text-center">
                      <div class="relative inline-block mb-6">
                        <div class="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 group-hover:scale-105 transition-transform duration-500">
                          <div class="w-full h-full rounded-full bg-background flex items-center justify-center">
                            <Icon name="lucide:crown" class="h-20 w-20 text-primary" />
                          </div>
                        </div>
                        <div class="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-xl">
                          <Icon name="lucide:briefcase" class="h-6 w-6 text-background" />
                        </div>
                      </div>
                      
                      <Heading tag="h3" size="h4" class="text-foreground mb-2 group-hover:text-primary transition-colors">
                        Chris Johanson
                      </Heading>
                      
                      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border mb-4">
                        <Text size="sm" class="font-bold text-foreground">Chief Executive Officer</Text>
                      </div>
                      
                      <Text size="sm" class="text-muted-foreground leading-relaxed mb-6">
                        Visionary leader with 20+ years transforming digital experiences. Chris drives our mission to make creative tools accessible to everyone.
                      </Text>
                      
                      <div class="flex justify-center gap-3">
                        <button class="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group/btn">
                          <Icon name="lucide:linkedin" class="h-5 w-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                        </button>
                        <button class="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group/btn">
                          <Icon name="lucide:mail" class="h-5 w-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </div>
                
                <!-- CFO - Jason Michaud -->
                <div class="group relative">
                  <GlassCard variant="light" class="p-6 h-full natural-depth gentle-hover overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div class="relative text-center">
                      <div class="relative inline-block mb-6">
                        <div class="w-40 h-40 rounded-full bg-gradient-to-br from-accent to-secondary p-0.5 group-hover:scale-105 transition-transform duration-500">
                          <div class="w-full h-full rounded-full bg-background flex items-center justify-center">
                            <Icon name="lucide:trending-up" class="h-20 w-20 text-accent" />
                          </div>
                        </div>
                        <div class="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-accent border-4 border-background flex items-center justify-center shadow-xl">
                          <Icon name="lucide:dollar-sign" class="h-6 w-6 text-background" />
                        </div>
                      </div>
                      
                      <Heading tag="h3" size="h4" class="text-foreground mb-2 group-hover:text-accent transition-colors">
                        Jason Michaud
                      </Heading>
                      
                      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border mb-4">
                        <Text size="sm" class="font-bold text-foreground">Chief Financial Officer</Text>
                      </div>
                      
                      <Text size="sm" class="text-muted-foreground leading-relaxed mb-6">
                        Strategic financial architect ensuring sustainable growth. Jason's expertise scales creative tech companies globally.
                      </Text>
                      
                      <div class="flex justify-center gap-3">
                        <button class="w-10 h-10 rounded-full bg-muted/50 hover:bg-accent/10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group/btn">
                          <Icon name="lucide:linkedin" class="h-5 w-5 text-muted-foreground group-hover/btn:text-accent transition-colors" />
                        </button>
                        <button class="w-10 h-10 rounded-full bg-muted/50 hover:bg-accent/10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group/btn">
                          <Icon name="lucide:twitter" class="h-5 w-5 text-muted-foreground group-hover/btn:text-accent transition-colors" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </div>
                
                <!-- CTO - Frank Rocca -->
                <div class="group relative">
                  <GlassCard variant="light" class="p-6 h-full natural-depth gentle-hover overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-muted/5 via-transparent to-muted/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div class="relative text-center">
                      <div class="relative inline-block mb-6">
                        <div class="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 group-hover:scale-105 transition-transform duration-500">
                          <div class="w-full h-full rounded-full bg-background flex items-center justify-center">
                            <Icon name="lucide:cpu" class="h-20 w-20 text-primary" />
                          </div>
                        </div>
                        <div class="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-xl">
                          <Icon name="lucide:code-2" class="h-6 w-6 text-background" />
                        </div>
                      </div>
                      
                      <Heading tag="h3" size="h4" class="text-foreground mb-2 group-hover:text-primary transition-colors">
                        Frank Rocca
                      </Heading>
                      
                      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/50 border border-border mb-4">
                        <Text size="sm" class="font-bold text-foreground">Chief Technology Officer</Text>
                      </div>
                      
                      <Text size="sm" class="text-muted-foreground leading-relaxed mb-6">
                        AI pioneer revolutionizing creative workflows. Frank leads our technical innovation, building tomorrow's tools today.
                      </Text>
                      
                      <div class="flex justify-center gap-3">
                        <button class="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group/btn">
                          <Icon name="lucide:github" class="h-5 w-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                        </button>
                        <button class="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg group/btn">
                          <Icon name="lucide:linkedin" class="h-5 w-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
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

const scrollToJourney = () => {
  // Scroll to journey section
  const journeySection = document.querySelector('.journey-section')
  if (journeySection) {
    journeySection.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleBadgeClick = () => {
  // Handle badge click
  console.log('Badge clicked')
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
/* Page-specific styles */
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

/* Animation delay utilities */
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Floating animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(3deg);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Page floating animations */
@keyframes page-float-1 {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(-12deg);
  }
  25% {
    transform: translateY(-20px) translateX(5px) rotate(-8deg);
  }
  50% {
    transform: translateY(-30px) translateX(-5px) rotate(-15deg);
  }
  75% {
    transform: translateY(-15px) translateX(3px) rotate(-10deg);
  }
}

@keyframes page-float-2 {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(6deg);
  }
  25% {
    transform: translateY(-15px) translateX(-3px) rotate(10deg);
  }
  50% {
    transform: translateY(-25px) translateX(5px) rotate(4deg);
  }
  75% {
    transform: translateY(-10px) translateX(-2px) rotate(8deg);
  }
}

@keyframes page-float-3 {
  0%, 100% {
    transform: translateY(0) translateX(0) rotate(12deg);
  }
  25% {
    transform: translateY(-25px) translateX(3px) rotate(15deg);
  }
  50% {
    transform: translateY(-35px) translateX(-3px) rotate(10deg);
  }
  75% {
    transform: translateY(-20px) translateX(2px) rotate(13deg);
  }
}

.animate-page-float-1 {
  animation: page-float-1 6s ease-in-out infinite;
}

.animate-page-float-2 {
  animation: page-float-2 7s ease-in-out infinite;
}

.animate-page-float-3 {
  animation: page-float-3 8s ease-in-out infinite;
}

/* Twinkle animation */
@keyframes twinkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

/* Gradient shift animation */
@keyframes gradient-shift {
  0%, 100% {
    opacity: 0.3;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.6;
    transform: rotate(180deg);
  }
}

.animate-gradient-shift {
  animation: gradient-shift 10s ease-in-out infinite;
}

/* Grid movement animation */
@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* Slow spin animation */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Reverse slow spin */
@keyframes spin-reverse-slow {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-reverse-slow {
  animation: spin-reverse-slow 15s linear infinite;
}

/* Floating particles */
@keyframes float-particle-1 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  25% {
    opacity: 0.6;
  }
  50% {
    transform: translate(50px, -50px);
    opacity: 0.8;
  }
  75% {
    opacity: 0.4;
  }
}

@keyframes float-particle-2 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    transform: translate(-40px, 40px);
    opacity: 0.7;
  }
  75% {
    opacity: 0.3;
  }
}

@keyframes float-particle-3 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  25% {
    opacity: 0.4;
  }
  50% {
    transform: translate(30px, 30px);
    opacity: 0.6;
  }
  75% {
    opacity: 0.2;
  }
}

@keyframes float-particle-4 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  25% {
    opacity: 0.3;
  }
  50% {
    transform: translate(-20px, -30px);
    opacity: 0.5;
  }
  75% {
    opacity: 0.1;
  }
}

.animate-float-particle-1 {
  animation: float-particle-1 8s ease-in-out infinite;
}

.animate-float-particle-2 {
  animation: float-particle-2 10s ease-in-out infinite 2s;
}

.animate-float-particle-3 {
  animation: float-particle-3 12s ease-in-out infinite 4s;
}

.animate-float-particle-4 {
  animation: float-particle-4 9s ease-in-out infinite 1s;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Gradient text animation */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-animation {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Timeline pulse effect */
@keyframes timeline-pulse {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}

.timeline-pulse {
  animation: timeline-pulse 2s ease-in-out infinite;
}

/* Smooth entrance animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
</style>