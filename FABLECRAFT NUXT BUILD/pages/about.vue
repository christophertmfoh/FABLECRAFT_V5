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
              <div class="relative max-w-5xl mx-auto">
                <!-- Background Glow -->
                <div class="absolute inset-0 -z-10">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-full blur-3xl" />
                </div>
                
                <!-- Main Card -->
                <GlassCard variant="light" class="relative overflow-hidden">
                  <!-- Header -->
                  <div class="px-8 py-6 text-center">
                    <Heading tag="h3" size="h3">
                      <span class="text-foreground">Stories</span>
                      <span> </span>
                      <AGradientText
                        tag="span"
                        variant="primary"
                        direction="to-r"
                        intensity="vibrant"
                      >
                        Come Alive
                      </AGradientText>
                    </Heading>
                    <Text size="sm" class="text-muted-foreground mt-2">
                      Watch your words transform into worlds
                    </Text>
                  </div>
                  
                  <!-- Animation Area -->
                  <div class="relative h-[350px] flex items-center justify-center px-8 pb-8">
                    <!-- Text Input Area -->
                    <div class="absolute left-8 top-1/2 -translate-y-1/2 w-1/3">
                      <div class="space-y-3">
                        <!-- Typing Animation -->
                        <div class="bg-background/50 border border-border/50 rounded-lg p-4">
                          <div class="space-y-2">
                            <div class="flex items-center gap-2">
                              <div class="w-2 h-2 bg-primary rounded-full animate-pulse" />
                              <Text size="xs" class="text-muted-foreground">AI Prompt</Text>
                            </div>
                            <div class="font-mono text-sm text-foreground typing-animation">
                              "A magical forest with glowing mushrooms..."
                            </div>
                          </div>
                        </div>
                        
                        <!-- Keywords floating out -->
                        <div class="relative h-20">
                          <span class="absolute text-xs text-primary/60 animate-float-word-1">magical</span>
                          <span class="absolute text-xs text-accent/60 animate-float-word-2 left-12">forest</span>
                          <span class="absolute text-xs text-secondary/60 animate-float-word-3 left-6 top-8">glowing</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Transformation Particles -->
                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div class="relative w-32 h-32">
                        <!-- Particle Stream -->
                        <div class="absolute inset-0">
                          <div class="particle-1 absolute w-1 h-1 bg-primary rounded-full animate-particle-flow-1" />
                          <div class="particle-2 absolute w-1 h-1 bg-accent rounded-full animate-particle-flow-2" />
                          <div class="particle-3 absolute w-1 h-1 bg-secondary rounded-full animate-particle-flow-3" />
                          <div class="particle-4 absolute w-1.5 h-1.5 bg-primary/60 rounded-full animate-particle-flow-4" />
                          <div class="particle-5 absolute w-0.5 h-0.5 bg-accent/60 rounded-full animate-particle-flow-5" />
                        </div>
                        
                        <!-- Central Transform Icon -->
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
                            <Icon name="lucide:wand-2" class="h-8 w-8 text-primary animate-spin-slow" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Output Media Grid -->
                    <div class="absolute right-8 top-1/2 -translate-y-1/2 w-1/3">
                      <div class="grid grid-cols-2 gap-3">
                        <!-- Image Output -->
                        <div class="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-3 animate-fade-in-scale animation-delay-1000">
                          <Icon name="lucide:image" class="h-6 w-6 text-primary mb-2" />
                          <div class="h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded animate-shimmer" />
                        </div>
                        
                        <!-- Video Output -->
                        <div class="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg p-3 animate-fade-in-scale animation-delay-2000">
                          <Icon name="lucide:video" class="h-6 w-6 text-accent mb-2" />
                          <div class="h-12 bg-gradient-to-r from-accent/20 to-secondary/20 rounded animate-shimmer animation-delay-2000" />
                        </div>
                        
                        <!-- Audio Output -->
                        <div class="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg p-3 animate-fade-in-scale animation-delay-3000">
                          <Icon name="lucide:music" class="h-6 w-6 text-secondary mb-2" />
                          <div class="h-12 bg-gradient-to-r from-secondary/20 to-primary/20 rounded animate-shimmer animation-delay-3000" />
                        </div>
                        
                        <!-- 3D Output -->
                        <div class="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-3 animate-fade-in-scale animation-delay-4000">
                          <Icon name="lucide:box" class="h-6 w-6 text-primary mb-2" />
                          <div class="h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded animate-shimmer animation-delay-4000" />
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </Container>
          </div>
        </Section>

        <!-- Values Section -->
        <Section spacing="none" class="values-section">
          <div class="py-16 sm:py-20">
            <Container size="xl">
              <div class="text-center max-w-3xl mx-auto mb-12">
                <MHeroBadge
                  text="Our Values"
                  variant="outline"
                  size="sm"
                  dot-color="primary"
                  class="mb-6"
                />
                
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
                  <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted/50 mb-4">
                    <Icon name="lucide:shield-check" class="h-6 w-6 text-foreground" />
                  </div>
                  <Heading tag="h3" size="h5" class="text-foreground mb-2">Trust</Heading>
                  <Text size="sm" class="text-muted-foreground">
                    Building transparent relationships with our community
                  </Text>
                </GlassCard>
                
                <GlassCard variant="light" class="p-6 text-center natural-depth gentle-hover">
                  <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted/50 mb-4">
                    <Icon name="lucide:globe" class="h-6 w-6 text-foreground" />
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
                <MHeroBadge
                  text="Leadership Team"
                  variant="outline"
                  size="sm"
                  dot-color="primary"
                  class="mb-6"
                />
                
                <Heading tag="h2" size="h2" class="text-foreground mb-4">
                  Meet Our Visionaries
                </Heading>
                
                <Text size="lg" class="text-muted-foreground">
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

        <!-- Journey Section -->
        <Section spacing="none" class="journey-section">
          <div class="py-16 sm:py-20">
            <Container size="xl">
              <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12">
                  <MHeroBadge
                    text="Our Journey"
                    variant="outline"
                    size="sm"
                    dot-color="primary"
                    class="mb-6"
                  />
                  
                  <Heading tag="h2" size="h2" class="text-foreground mb-4">
                    Building the Future, Step by Step
                  </Heading>
                  
                  <Text size="lg" class="text-muted-foreground">
                    From Hartford to the world, our journey of empowering creators
                  </Text>
                </div>
                
                <div class="relative">
                  <!-- Timeline line -->
                  <div class="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-accent/20 to-secondary/20" />
                  
                  <div class="space-y-8">
                    <!-- 2022 - Foundation -->
                    <div class="relative flex gap-8 group">
                      <div class="flex-shrink-0 relative z-10">
                        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Text size="sm" class="font-bold text-background">2022</Text>
                        </div>

                      </div>
                      <div class="flex-1 pb-4">
                        <GlassCard variant="light" class="p-6 natural-depth gentle-hover">
                          <div class="flex items-start justify-between mb-3">
                            <Heading tag="h3" size="h4" class="text-foreground">The Foundation</Heading>
                            <Badge variant="outline" class="text-xs">Q1 2022</Badge>
                          </div>
                          <Text size="base" class="text-muted-foreground mb-4">
                            Founded in Hartford, CT with a vision to democratize creative tools. Assembled our core team and began developing revolutionary AI technology.
                          </Text>
                          <div class="flex flex-wrap gap-2">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-primary" />
                              <span class="text-foreground">Company Founded</span>
                            </div>
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-primary" />
                              <span class="text-foreground">Seed Funding</span>
                            </div>
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-primary" />
                              <span class="text-foreground">Team of 5</span>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    </div>
                    
                    <!-- 2023 - Launch -->
                    <div class="relative flex gap-8 group">
                      <div class="flex-shrink-0 relative z-10">
                        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-secondary border-2 border-background shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Text size="sm" class="font-bold text-background">2023</Text>
                        </div>
                      </div>
                      <div class="flex-1 pb-4">
                        <GlassCard variant="light" class="p-6 natural-depth gentle-hover">
                          <div class="flex items-start justify-between mb-3">
                            <Heading tag="h3" size="h4" class="text-foreground">Product Launch</Heading>
                            <Badge variant="outline" class="text-xs">Q2 2023</Badge>
                          </div>
                          <Text size="base" class="text-muted-foreground mb-4">
                            Launched our beta platform to early adopters. Rapid iteration based on user feedback led to 10x growth in just 6 months.
                          </Text>
                          <div class="flex flex-wrap gap-2">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-accent" />
                              <span class="text-foreground">Beta Launch</span>
                            </div>
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-accent" />
                              <span class="text-foreground">10,000+ Users</span>
                            </div>
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-accent" />
                              <span class="text-foreground">Series A</span>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    </div>
                    
                    <!-- 2024 - Scale -->
                    <div class="relative flex gap-8 group">
                      <div class="flex-shrink-0 relative z-10">
                        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-primary border-2 border-background shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Text size="sm" class="font-bold text-background">2024</Text>
                        </div>
                      </div>
                      <div class="flex-1 pb-4">
                        <GlassCard variant="light" class="p-6 natural-depth gentle-hover">
                          <div class="flex items-start justify-between mb-3">
                            <Heading tag="h3" size="h4" class="text-foreground">Global Expansion</Heading>
                            <Badge variant="outline" class="text-xs">Full Year</Badge>
                          </div>
                          <Text size="base" class="text-muted-foreground mb-4">
                            Scaled to serve creators in 150+ countries. Introduced enterprise features and established partnerships with major creative platforms.
                          </Text>
                          <div class="flex flex-wrap gap-2">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-secondary" />
                              <span class="text-foreground">100K+ Users</span>
                            </div>
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-secondary" />
                              <span class="text-foreground">Enterprise Launch</span>
                            </div>
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-xs">
                              <Icon name="lucide:check-circle" class="h-3 w-3 text-secondary" />
                              <span class="text-foreground">50+ Team</span>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    </div>
                    
                    <!-- 2025 - Now -->
                    <div class="relative flex gap-8 group">
                      <div class="flex-shrink-0 relative z-10">
                        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-secondary border-3 border-background shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Text size="sm" class="font-bold text-background">2025</Text>
                        </div>
                        <div class="absolute inset-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-20 animate-pulse" />
                      </div>
                      <div class="flex-1">
                        <GlassCard variant="heavy" class="p-6 natural-depth gentle-hover border-2 border-primary/20">
                          <div class="flex items-start justify-between mb-3">
                            <Heading tag="h3" size="h4" class="text-foreground">The Future is Now</Heading>
                            <Badge variant="default" class="text-xs animate-pulse">CURRENT</Badge>
                          </div>
                          <Text size="base" class="text-muted-foreground mb-4">
                            Revolutionizing creative workflows with next-gen AI. Building the platform where imagination has no limits.
                          </Text>
                          <div class="flex flex-wrap gap-2">
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-xs">
                              <Icon name="lucide:sparkles" class="h-3 w-3 text-primary animate-pulse" />
                              <span class="text-foreground font-semibold">AI Revolution</span>
                            </div>
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 text-xs">
                              <Icon name="lucide:globe" class="h-3 w-3 text-accent animate-pulse" />
                              <span class="text-foreground font-semibold">1M+ Goal</span>
                            </div>
                            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 text-xs">
                              <Icon name="lucide:rocket" class="h-3 w-3 text-secondary animate-pulse" />
                              <span class="text-foreground font-semibold">IPO Ready</span>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

          </div>
        </Section>

        <!-- CTA Section using OCtaSection component -->
        <OCtaSection
          variant="default"
          header-badge-text="Start Today"
          header-title="Ready to Join"
          header-highlight-text="the Revolution?"
          header-subtitle=""
          main-headline="Transform Your Ideas Into Reality"
          main-gradient-variant="primary"
          supporting-copy="Join thousands of creators who are already building amazing things with Fablecraft"
          primary-cta-text="Get Started Free"
          secondary-cta-text="Contact Sales"
          primary-cta-icon="lucide:rocket"
          secondary-cta-icon="lucide:message-circle"
          trust-signal="Trusted by 100,000+ creators in 150+ countries"
          cta-icon="lucide:sparkles"
          :show-icon="true"
          @primary:click="handleGetStarted"
          @secondary:click="handleContactSales"
        />
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

/* Typing animation */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

.typing-animation {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3s steps(40, end) infinite;
}

/* Words floating animation */
@keyframes float-word-1 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(80px, -40px) scale(0.8);
    opacity: 0;
  }
}

@keyframes float-word-2 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(60px, -50px) scale(0.8);
    opacity: 0;
  }
}

@keyframes float-word-3 {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(70px, -30px) scale(0.8);
    opacity: 0;
  }
}

.animate-float-word-1 {
  animation: float-word-1 4s ease-out infinite;
}

.animate-float-word-2 {
  animation: float-word-2 4s ease-out infinite 0.5s;
}

.animate-float-word-3 {
  animation: float-word-3 4s ease-out infinite 1s;
}

/* Particle flow animations */
@keyframes particle-flow-1 {
  0% {
    transform: translate(-60px, 0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translate(60px, 0);
    opacity: 0;
  }
}

@keyframes particle-flow-2 {
  0% {
    transform: translate(-60px, -10px);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translate(60px, 10px);
    opacity: 0;
  }
}

@keyframes particle-flow-3 {
  0% {
    transform: translate(-60px, 10px);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    transform: translate(60px, -10px);
    opacity: 0;
  }
}

@keyframes particle-flow-4 {
  0% {
    transform: translate(-60px, 5px);
    opacity: 0;
  }
  20% {
    opacity: 0.7;
  }
  80% {
    opacity: 0.7;
  }
  100% {
    transform: translate(60px, -5px);
    opacity: 0;
  }
}

@keyframes particle-flow-5 {
  0% {
    transform: translate(-60px, -5px);
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translate(60px, 5px);
    opacity: 0;
  }
}

.animate-particle-flow-1 {
  animation: particle-flow-1 2s linear infinite;
}

.animate-particle-flow-2 {
  animation: particle-flow-2 2s linear infinite 0.2s;
}

.animate-particle-flow-3 {
  animation: particle-flow-3 2s linear infinite 0.4s;
}

.animate-particle-flow-4 {
  animation: particle-flow-4 2s linear infinite 0.6s;
}

.animate-particle-flow-5 {
  animation: particle-flow-5 2s linear infinite 0.8s;
}

/* Fade in and scale */
@keyframes fade-in-scale {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-scale {
  animation: fade-in-scale 0.6s ease-out forwards;
  opacity: 0;
}

/* Slow spin */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
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