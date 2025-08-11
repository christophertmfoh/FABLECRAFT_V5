<template>
  <div class="contact-page relative min-h-screen bg-background">
    <!-- Background Effects -->
    <ClientOnly>
      <div class="fixed inset-0 pointer-events-none z-0">
        <LazyPaperTexture />
        <LazyGradientNoiseBackdrop />
        <LazyVignetteOverlay strength="subtle" />
      </div>
    </ClientOnly>
    
    <!-- Navigation Header -->
    <NavigationHeader 
      :show-auth="true"
      :show-nav-items="true"
      :show-theme-toggle="true"
      variant="default"
      @navigate="handleNavigate"
      @auth="handleAuth"
      @logout="handleLogout"
      @home="handleHome"
    />
    
    <!-- Main Content -->
    <main class="relative z-10">
      <!-- Hero Section -->
      <Section spacing="none" class="hero-section">
        <div class="py-20 sm:py-28">
          <OHeroSection
            id="contact-hero"
            badge-text="Available 24/7 • Global Support"
            title="Get in"
            highlight-text="Touch"
            :break-highlight="true"
            description="Have a question? Need enterprise features? Want to partner with us? We're here to help and would love to hear from you."
            primary-button-text="Send Message"
            secondary-button-text="Schedule Call"
            primary-button-icon="lucide:mail"
            secondary-button-icon="lucide:calendar"
            variant="default"
            alignment="center"
            @primary:click="scrollToForm"
            @secondary:click="handleScheduleCall"
            @badge:click="handleBadgeClick"
          />
        </div>
      </Section>
      
      <!-- Contact Options Section -->
      <Section spacing="none" class="contact-options-section">
        <div class="py-20 sm:py-28">
          <Container size="xl">
            <div class="grid lg:grid-cols-3 gap-8">
              <!-- Email Support Card -->
              <GlassCard variant="light" class="p-8 text-center natural-depth gentle-hover group">
                <div class="flex justify-center mb-6">
                  <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:mail" class="h-10 w-10 text-primary" />
                  </div>
                </div>
                <Heading tag="h3" size="h4" class="text-foreground mb-4 text-center font-bold">
                  Email Support
                </Heading>
                <Text size="base" class="text-muted-foreground mb-6 text-center">
                  Get a response within 24 hours
                </Text>
                <div class="flex justify-center mb-6">
                  <a 
                    href="mailto:support@fablecraft.com" 
                    class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300 font-medium group hover:scale-105"
                  >
                    <span>support@fablecraft.com</span>
                    <Icon name="lucide:external-link" class="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
                <div class="pt-6 border-t border-border/30">
                  <Text size="sm" class="text-muted-foreground/80 text-center">
                    Average response time: 4 hours
                  </Text>
                </div>
              </GlassCard>
              
              <!-- Live Chat Card -->
              <GlassCard variant="light" class="p-8 text-center natural-depth gentle-hover relative overflow-hidden group">
                <div class="absolute top-4 right-4">
                  <Badge variant="default" class="bg-primary text-primary-foreground animate-pulse shadow-lg">
                    <APulsingDot color="success" speed="fast" size="xs" class="mr-1.5" />
                    <span class="font-semibold">Online</span>
                  </Badge>
                </div>
                <div class="flex justify-center mb-6">
                  <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:message-circle" class="h-10 w-10 text-primary" />
                  </div>
                </div>
                <Heading tag="h3" size="h4" class="text-foreground mb-4 text-center font-bold">
                  Live Chat
                </Heading>
                <Text size="base" class="text-muted-foreground mb-6 text-center">
                  Chat with our team instantly
                </Text>
                <div class="flex justify-center mb-6">
                  <Button 
                    variant="default" 
                    size="lg"
                    @click="handleStartChat"
                    class="min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Icon name="lucide:message-square" class="mr-2 h-5 w-5" />
                    Start Chat Now
                  </Button>
                </div>
                <div class="pt-6 border-t border-border/30">
                  <Text size="sm" class="text-muted-foreground/80 text-center">
                    Available Mon-Fri, 9AM-6PM EST
                  </Text>
                </div>
              </GlassCard>
              
              <!-- Phone Support Card -->
              <GlassCard variant="light" class="p-8 text-center natural-depth gentle-hover group">
                <div class="flex justify-center mb-6">
                  <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="lucide:phone" class="h-10 w-10 text-accent" />
                  </div>
                </div>
                <Heading tag="h3" size="h4" class="text-foreground mb-4 text-center font-bold">
                  Phone Support
                </Heading>
                <Text size="base" class="text-muted-foreground mb-6 text-center">
                  Speak directly with our team
                </Text>
                <div class="flex justify-center mb-6">
                  <a 
                    href="tel:+18605551234" 
                    class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300 font-medium group hover:scale-105"
                  >
                    <span class="font-semibold">+1 (860) 555-1234</span>
                    <Icon name="lucide:phone-call" class="h-4 w-4 transition-transform group-hover:animate-pulse" />
                  </a>
                </div>
                <div class="pt-6 border-t border-border/30">
                  <Text size="sm" class="text-muted-foreground/80 text-center">
                    Enterprise customers only
                  </Text>
                </div>
              </GlassCard>
            </div>
          </Container>
        </div>
      </Section>
      
      <!-- Contact Form Section -->
      <Section spacing="none" class="contact-form-section" id="contact-form">
        <div class="py-20 sm:py-28">
          <Container size="xl">
            <div class="max-w-4xl mx-auto">
              <!-- Section Header -->
              <div class="text-center mb-16 animate-fade-in-scale">
                <div class="mb-8">
                  <MHeroBadge
                    text="Send Us a Message"
                    variant="default"
                    size="base"
                    dot-color="primary"
                    dot-speed="normal"
                  />
                </div>
                
                <Heading tag="h2" size="h1" class="text-foreground mb-6 text-center font-black">
                  <span class="block">How Can We</span>
                  <AGradientText
                    tag="span"
                    variant="primary"
                    direction="to-r"
                    intensity="vibrant"
                    class="block mt-1"
                  >
                    Help You?
                  </AGradientText>
                </Heading>
                
                <Text size="xl" class="text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
                  Fill out the form below and we'll get back to you as soon as possible
                </Text>
              </div>
              
              <!-- Contact Form -->
              <GlassCard variant="heavy" class="p-10 natural-depth shadow-2xl hover:shadow-3xl transition-all duration-500">
                <form @submit.prevent="handleSubmitForm" class="space-y-8">
                  <!-- Name and Email Row -->
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-sm font-semibold text-foreground mb-2.5">
                        Full Name <span class="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        v-model="formData.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label for="email" class="block text-sm font-semibold text-foreground mb-2.5">
                        Email Address <span class="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        v-model="formData.email"
                        type="email"
                        required
                        class="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <!-- Company and Phone Row -->
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label for="company" class="block text-sm font-semibold text-foreground mb-2.5">
                        Company
                      </label>
                      <input
                        id="company"
                        v-model="formData.company"
                        type="text"
                        class="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30 transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>
                    
                    <div>
                      <label for="phone" class="block text-sm font-semibold text-foreground mb-2.5">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        v-model="formData.phone"
                        type="tel"
                        class="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <!-- Subject -->
                  <div>
                    <label for="subject" class="block text-sm font-semibold text-foreground mb-2.5">
                      Subject <span class="text-destructive">*</span>
                    </label>
                    <select
                      id="subject"
                      v-model="formData.subject"
                      required
                      class="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" class="bg-background text-muted-foreground">Select a topic</option>
                      <option value="general" class="bg-background text-foreground">General Inquiry</option>
                      <option value="support" class="bg-background text-foreground">Technical Support</option>
                      <option value="sales" class="bg-background text-foreground">Sales & Pricing</option>
                      <option value="enterprise" class="bg-background text-foreground">Enterprise Solutions</option>
                      <option value="partnership" class="bg-background text-foreground">Partnership Opportunities</option>
                      <option value="media" class="bg-background text-foreground">Media & Press</option>
                      <option value="feedback" class="bg-background text-foreground">Product Feedback</option>
                    </select>
                  </div>
                  
                  <!-- Message -->
                  <div>
                    <label for="message" class="block text-sm font-semibold text-foreground mb-2.5">
                      Message <span class="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      v-model="formData.message"
                      required
                      rows="6"
                      class="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 hover:border-primary/30 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                    <Text size="sm" class="text-muted-foreground mt-2">
                      {{ formData.message.length }}/1000 characters
                    </Text>
                  </div>
                  
                  <!-- Newsletter Opt-in -->
                  <div class="flex items-start">
                    <input
                      id="newsletter"
                      v-model="formData.newsletter"
                      type="checkbox"
                      class="mt-1 h-4 w-4 rounded border-border bg-muted/50 text-primary focus:ring-primary focus:ring-offset-background checked:bg-primary checked:border-primary cursor-pointer"
                    />
                    <label for="newsletter" class="ml-3">
                      <Text size="sm" class="text-foreground">
                        I'd like to receive updates about Fablecraft products and services
                      </Text>
                    </label>
                  </div>
                  
                  <!-- Submit Button -->
                  <div class="flex gap-4 pt-6 border-t border-border/20">
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      :disabled="isSubmitting"
                      class="flex-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] min-h-[52px] text-base font-semibold"
                    >
                      <Spinner v-if="isSubmitting" class="mr-2 h-5 w-5" />
                      <Icon v-else name="lucide:send" class="mr-2 h-5 w-5" />
                      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      @click="resetForm"
                      class="min-w-[140px] hover:scale-[1.02] transition-all duration-300 border-2"
                    >
                      <Icon name="lucide:rotate-ccw" class="mr-2 h-5 w-5" />
                      Reset
                    </Button>
                  </div>
                </form>
                
                <!-- Success Message -->
                <div v-if="showSuccess" class="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div class="flex items-start gap-3">
                    <Icon name="lucide:check-circle" class="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <Text size="sm" class="font-medium text-foreground">
                        Message sent successfully!
                      </Text>
                      <Text size="sm" class="text-muted-foreground mt-1">
                        We'll get back to you within 24 hours.
                      </Text>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </Container>
        </div>
      </Section>
      
      <!-- FAQ Section -->
      <Section spacing="none" class="faq-section" id="faq">
        <div class="py-20 sm:py-28">
          <Container size="xl">
            <div class="max-w-4xl mx-auto">
              <!-- Section Header -->
              <div class="text-center mb-16 animate-fade-in-scale">
                <div class="mb-8">
                  <MHeroBadge
                    text="Frequently Asked Questions"
                    variant="default"
                    size="base"
                    dot-color="primary"
                    dot-speed="normal"
                  />
                </div>
                
                <Heading tag="h2" size="h1" class="text-foreground mb-6 text-center font-black">
                  <span class="block">Quick</span>
                  <AGradientText
                    tag="span"
                    variant="accent"
                    direction="to-r"
                    intensity="vibrant"
                    class="block mt-1"
                  >
                    Answers
                  </AGradientText>
                </Heading>
                
                <Text size="xl" class="text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
                  Find answers to common questions about Fablecraft
                </Text>
              </div>
              
              <!-- FAQ Items -->
              <div class="space-y-6">
                <GlassCard 
                  v-for="(faq, index) in faqs" 
                  :key="index"
                  variant="light" 
                  class="overflow-hidden natural-depth gentle-hover shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <button
                    @click="toggleFAQ(index)"
                    class="w-full p-8 text-left flex items-start justify-between gap-4 hover:bg-accent/10 transition-all duration-200"
                  >
                    <div class="flex-1">
                      <Heading tag="h3" size="h4" class="text-foreground font-semibold">
                        {{ faq.question }}
                      </Heading>
                    </div>
                    <Icon 
                      :name="expandedFAQ === index ? 'lucide:minus' : 'lucide:plus'"
                      class="h-6 w-6 text-primary flex-shrink-0 mt-0.5 transition-all duration-300"
                      :class="{ 'rotate-180': expandedFAQ === index }"
                    />
                  </button>
                  
                  <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-[500px] opacity-100"
                    leave-active-class="transition-all duration-300 ease-in"
                    leave-from-class="max-h-[500px] opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                  >
                    <div v-if="expandedFAQ === index" class="px-8 pb-8 -mt-2">
                      <Text size="lg" class="text-muted-foreground leading-relaxed">
                        {{ faq.answer }}
                      </Text>
                    </div>
                  </Transition>
                </GlassCard>
              </div>
              
              <!-- Still have questions? -->
              <div class="mt-16 text-center">
                <GlassCard variant="heavy" class="p-10 natural-depth shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Icon name="lucide:help-circle" class="h-14 w-14 text-primary mx-auto mb-6 animate-float" />
                  <Heading tag="h3" size="h3" class="text-foreground mb-4 text-center font-bold">
                    Still have questions?
                  </Heading>
                  <Text size="lg" class="text-muted-foreground mb-8 text-center max-w-md mx-auto">
                    Can't find what you're looking for? Our support team is here to help.
                  </Text>
                  <Button
                    variant="default"
                    size="lg"
                    @click="scrollToForm"
                    class="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[200px] font-semibold"
                  >
                    <Icon name="lucide:mail" class="mr-2 h-5 w-5" />
                    Contact Support
                  </Button>
                </GlassCard>
              </div>
            </div>
          </Container>
        </div>
      </Section>
      
      <!-- Office Location Section -->
      <Section spacing="none" class="location-section">
        <div class="py-20 sm:py-28">
          <Container size="xl">
            <div class="text-center mb-16 animate-fade-in-scale">
              <div class="mb-8">
                <MHeroBadge
                  text="Visit Our Office"
                  variant="default"
                  size="base"
                  dot-color="primary"
                  dot-speed="normal"
                />
              </div>
              
              <Heading tag="h2" size="h1" class="text-foreground mb-6 text-center font-black">
                <span class="block">Manchester</span>
                <AGradientText
                  tag="span"
                  variant="primary"
                  direction="to-r"
                  intensity="vibrant"
                  class="block mt-1"
                >
                  Creative Studio
                </AGradientText>
              </Heading>
              
              <Text size="xl" class="text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
                Located in the heart of Connecticut's creative tech corridor
              </Text>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <!-- Office Info -->
              <div class="space-y-8">
                <GlassCard variant="light" class="p-10 natural-depth shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div class="flex items-start gap-6">
                    <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:map-pin" class="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <Heading tag="h3" size="h4" class="text-foreground mb-3 font-bold">
                        Headquarters
                      </Heading>
                      <Text size="lg" class="text-muted-foreground leading-relaxed">
                        158 Forest Street<br />
                        Manchester, CT 06040<br />
                        United States
                      </Text>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard variant="light" class="p-10 natural-depth shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div class="flex items-start gap-6">
                    <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:clock" class="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <Heading tag="h3" size="h4" class="text-foreground mb-3 font-bold">
                        Office Hours
                      </Heading>
                      <Text size="lg" class="text-muted-foreground leading-relaxed">
                        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                        Saturday: 10:00 AM - 2:00 PM EST<br />
                        Sunday: Closed
                      </Text>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard variant="light" class="p-10 natural-depth shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div class="flex items-start gap-6">
                    <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:train" class="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <Heading tag="h3" size="h4" class="text-foreground mb-3 font-bold">
                        Transportation
                      </Heading>
                      <Text size="lg" class="text-muted-foreground leading-relaxed">
                        5 min walk from Union Station<br />
                        Free parking available<br />
                        CTfastrak Blue Line nearby
                      </Text>
                    </div>
                  </div>
                </GlassCard>
              </div>
              
              <!-- Map Visual -->
              <div class="relative">
                <GlassCard variant="heavy" class="p-3 natural-depth shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div class="relative rounded-xl overflow-hidden" style="height: calc(3 * 160px + 4rem);">
                    <!-- Actual Map iframe with theme-reactive filters -->
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-72.54419326782228%2C41.77234627371066%2C-72.51946449279787%2C41.78507796149617&amp;layer=mapnik&amp;marker=41.77871%2C-72.53183"
                      class="absolute inset-0 w-full h-full dark:invert dark:hue-rotate-180 dark:contrast-90 dark:brightness-95"
                      style="border: 0;"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      title="Fablecraft Headquarters Location - 158 Forest St, Manchester CT"
                    />
                    
                    <!-- Overlay gradient for better theme integration -->
                    <div class="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
                    
                    <!-- Map overlay text -->
                    <div class="absolute bottom-6 left-6 right-6">
                      <GlassCard variant="heavy" class="p-6 shadow-xl">
                        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <Heading tag="h4" size="h5" class="font-bold text-foreground mb-1">
                              Fablecraft HQ
                            </Heading>
                            <Text size="base" class="text-muted-foreground">
                              Manchester, Connecticut
                            </Text>
                          </div>
                          <Button
                            variant="default"
                            size="lg"
                            @click="handleGetDirections"
                            class="min-w-[160px] font-semibold"
                          >
                            <Icon name="lucide:navigation" class="mr-2 h-5 w-5" />
                            Get Directions
                          </Button>
                        </div>
                      </GlassCard>
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
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useHead, navigateTo, useSupabaseClient, useAuthOverlay } from '#imports'

// Page meta
useHead({
  title: 'Contact Us - Fablecraft | Get in Touch',
  meta: [
    {
      name: 'description',
      content: 'Contact Fablecraft for support, sales inquiries, or partnership opportunities. Available 24/7 via email, chat, and phone. Based in Hartford, CT.',
    },
    {
      property: 'og:title',
      content: 'Contact Fablecraft - We\'re Here to Help',
    },
    {
      property: 'og:description',
      content: 'Get in touch with our team for support, enterprise solutions, or partnership opportunities. Multiple ways to reach us.',
    },
  ],
})

// Form data
const formData = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false,
})

// Form state
const isSubmitting = ref(false)
const showSuccess = ref(false)

// FAQ state
const expandedFAQ = ref<number | null>(null)

// FAQ data
const faqs = [
  {
    question: 'What is Fablecraft and how does it work?',
    answer: 'Fablecraft is an AI-powered creative suite that helps you transform ideas into multimedia content. Simply input your concepts, and our AI helps you create novels, screenplays, graphic novels, and more.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a generous free tier that lets you explore all of Fablecraft\'s core features. You can create up to 3 projects per month and access our community resources.',
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer 24/7 email support for all users, live chat during business hours, and dedicated phone support for enterprise customers. Our average response time is under 4 hours.',
  },
  {
    question: 'Can I use Fablecraft for commercial projects?',
    answer: 'Absolutely! All content you create with Fablecraft is yours to use commercially. Our Pro and Enterprise plans include additional commercial-use features and licensing options.',
  },
  {
    question: 'How does billing work?',
    answer: 'We offer monthly and annual billing options. Annual plans save you 20%. You can upgrade, downgrade, or cancel your subscription at any time from your account settings.',
  },
  {
    question: 'Do you offer enterprise solutions?',
    answer: 'Yes, we have custom enterprise plans with advanced features like SSO, dedicated support, custom AI training, and team collaboration tools. Contact our sales team for details.',
  },
  {
    question: 'Is my data secure with Fablecraft?',
    answer: 'Security is our top priority. We use industry-standard encryption, regular security audits, and never train our AI on your personal projects. Your creative work remains private and secure.',
  },
  {
    question: 'Can I collaborate with others on Fablecraft?',
    answer: 'Yes! Our Pro and Enterprise plans include real-time collaboration features, allowing multiple team members to work on projects simultaneously with version control and commenting.',
  },
]

// Navigation handlers
const handleNavigate = (view: string) => {
  if (view === 'home') {
    navigateTo('/')
  } else {
    navigateTo(`/${view}`)
  }
}

const handleAuth = () => {
  const { open } = useAuthOverlay()
  open('login')
}

const handleLogout = async () => {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
}

const handleHome = () => {
  navigateTo('/')
}

// Form handlers
const handleSubmitForm = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Show success message
  showSuccess.value = true
  isSubmitting.value = false
  
  // Reset form after delay
  setTimeout(() => {
    resetForm()
    showSuccess.value = false
  }, 5000)
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.company = ''
  formData.phone = ''
  formData.subject = ''
  formData.message = ''
  formData.newsletter = false
}

// FAQ handlers
const toggleFAQ = (index: number) => {
  expandedFAQ.value = expandedFAQ.value === index ? null : index
}

// Scroll handlers
const scrollToForm = () => {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToFAQ = () => {
  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
}

// Action handlers
const handleScheduleCall = () => {
  // Open calendar scheduling tool (e.g., Calendly)
  window.open('https://calendly.com/fablecraft/demo', '_blank')
}

const handleBadgeClick = () => {
  // Scroll to contact options when badge is clicked
  const element = document.querySelector('.contact-options-section')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleStartChat = () => {
  // Initialize chat widget
  console.log('Starting live chat...')
}

const handleGetDirections = () => {
  window.open('https://maps.google.com/?q=158+Forest+Street+Manchester+CT+06040', '_blank')
}
</script>

<style scoped>
/* Custom animations */
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>