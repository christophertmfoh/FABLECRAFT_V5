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
          <Container size="xl">
            <div class="text-center max-w-4xl mx-auto">
              <!-- Badge -->
              <MHeroBadge
                text="Available 24/7 • Global Support"
                variant="default"
                size="base"
                dot-color="primary"
                dot-speed="normal"
                class="mb-6"
              />
              
              <!-- Heading -->
              <MHeroHeading
                title="Get in"
                highlight-text="Touch"
                :break-highlight="true"
                subheading="Have a question? Need enterprise features? Want to partner with us? We're here to help and would love to hear from you."
                heading-tag="h1"
                heading-id="contact-heading"
                variant="default"
                size="2xl"
                alignment="center"
                gradient-variant="primary"
                gradient-direction="to-r"
                gradient-intensity="normal"
                spacing="relaxed"
              />
              
              <!-- Quick Actions -->
              <div class="flex flex-wrap gap-4 justify-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  @click="scrollToForm"
                >
                  <Icon name="lucide:mail" class="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  @click="scrollToFAQ"
                >
                  <Icon name="lucide:help-circle" class="mr-2 h-4 w-4" />
                  View FAQ
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  @click="handleScheduleCall"
                >
                  <Icon name="lucide:calendar" class="mr-2 h-4 w-4" />
                  Schedule Call
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Section>
      
      <!-- Contact Options Section -->
      <Section spacing="none" class="contact-options-section">
        <div class="py-20 sm:py-28">
          <Container size="xl">
            <div class="grid lg:grid-cols-3 gap-8">
              <!-- Email Support Card -->
              <GlassCard variant="light" class="p-8 text-center natural-depth gentle-hover group">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon name="lucide:mail" class="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <Heading tag="h3" size="h4" class="text-foreground mb-3">
                  Email Support
                </Heading>
                <Text size="base" class="text-muted-foreground mb-4">
                  Get a response within 24 hours
                </Text>
                <a 
                  href="mailto:support@fablecraft.com" 
                  class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
                >
                  support@fablecraft.com
                  <Icon name="lucide:external-link" class="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <div class="mt-4 pt-4 border-t border-border/20">
                  <Text size="sm" class="text-muted-foreground">
                    Average response time: 4 hours
                  </Text>
                </div>
              </GlassCard>
              
              <!-- Live Chat Card -->
              <GlassCard variant="light" class="p-8 text-center natural-depth gentle-hover relative overflow-hidden group">
                <div class="absolute top-3 right-3">
                  <Badge variant="default" class="animate-pulse">
                    <APulsingDot variant="primary" speed="fast" class="mr-1" />
                    Online
                  </Badge>
                </div>
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon name="lucide:message-circle" class="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <Heading tag="h3" size="h4" class="text-foreground mb-3">
                  Live Chat
                </Heading>
                <Text size="base" class="text-muted-foreground mb-4">
                  Chat with our team instantly
                </Text>
                <Button 
                  variant="primary" 
                  size="default"
                  @click="handleStartChat"
                  class="w-full"
                >
                  <Icon name="lucide:message-square" class="mr-2 h-4 w-4" />
                  Start Chat Now
                </Button>
                <div class="mt-4 pt-4 border-t border-border/20">
                  <Text size="sm" class="text-muted-foreground">
                    Available Mon-Fri, 9AM-6PM EST
                  </Text>
                </div>
              </GlassCard>
              
              <!-- Phone Support Card -->
              <GlassCard variant="light" class="p-8 text-center natural-depth gentle-hover group">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent/10 to-secondary/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon name="lucide:phone" class="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                <Heading tag="h3" size="h4" class="text-foreground mb-3">
                  Phone Support
                </Heading>
                <Text size="base" class="text-muted-foreground mb-4">
                  Speak directly with our team
                </Text>
                <a 
                  href="tel:+18605551234" 
                  class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
                >
                  +1 (860) 555-1234
                  <Icon name="lucide:phone-call" class="h-4 w-4 group-hover:animate-pulse" />
                </a>
                <div class="mt-4 pt-4 border-t border-border/20">
                  <Text size="sm" class="text-muted-foreground">
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
              <div class="text-center mb-12">
                <MHeroBadge
                  text="Send Us a Message"
                  variant="outline"
                  size="sm"
                  dot-color="primary"
                  class="mb-6"
                />
                
                <Heading tag="h2" size="h2" class="text-foreground mb-4 text-center">
                  <span class="block">How Can We</span>
                  <AGradientText
                    tag="span"
                    variant="primary"
                    direction="to-r"
                    intensity="normal"
                    class="block"
                  >
                    Help You?
                  </AGradientText>
                </Heading>
                
                <Text size="lg" class="text-muted-foreground text-center">
                  Fill out the form below and we'll get back to you as soon as possible
                </Text>
              </div>
              
              <!-- Contact Form -->
              <GlassCard variant="heavy" class="p-8 natural-depth">
                <form @submit.prevent="handleSubmitForm" class="space-y-6">
                  <!-- Name and Email Row -->
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-sm font-medium text-foreground mb-2">
                        Full Name *
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
                      <label for="email" class="block text-sm font-medium text-foreground mb-2">
                        Email Address *
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
                      <label for="company" class="block text-sm font-medium text-foreground mb-2">
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
                      <label for="phone" class="block text-sm font-medium text-foreground mb-2">
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
                    <label for="subject" class="block text-sm font-medium text-foreground mb-2">
                      Subject *
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
                    <label for="message" class="block text-sm font-medium text-foreground mb-2">
                      Message *
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
                  <div class="flex gap-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      :disabled="isSubmitting"
                      class="flex-1"
                    >
                      <Spinner v-if="isSubmitting" class="mr-2 h-4 w-4" />
                      <Icon v-else name="lucide:send" class="mr-2 h-4 w-4" />
                      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      @click="resetForm"
                    >
                      <Icon name="lucide:rotate-ccw" class="mr-2 h-4 w-4" />
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
              <div class="text-center mb-12">
                <MHeroBadge
                  text="Frequently Asked Questions"
                  variant="outline"
                  size="sm"
                  dot-color="primary"
                  class="mb-6"
                />
                
                <Heading tag="h2" size="h2" class="text-foreground mb-4 text-center">
                  <span class="block">Quick</span>
                  <AGradientText
                    tag="span"
                    variant="accent"
                    direction="to-r"
                    intensity="vibrant"
                    class="block"
                  >
                    Answers
                  </AGradientText>
                </Heading>
                
                <Text size="lg" class="text-muted-foreground text-center">
                  Find answers to common questions about Fablecraft
                </Text>
              </div>
              
              <!-- FAQ Items -->
              <div class="space-y-4">
                <GlassCard 
                  v-for="(faq, index) in faqs" 
                  :key="index"
                  variant="light" 
                  class="overflow-hidden natural-depth gentle-hover"
                >
                  <button
                    @click="toggleFAQ(index)"
                    class="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-accent/5 transition-all duration-200"
                  >
                    <div class="flex-1">
                      <Heading tag="h3" size="h5" class="text-foreground">
                        {{ faq.question }}
                      </Heading>
                    </div>
                    <Icon 
                      :name="expandedFAQ === index ? 'lucide:minus' : 'lucide:plus'"
                      class="h-5 w-5 text-primary flex-shrink-0 mt-0.5 transition-all duration-300"
                      :class="{ 'rotate-90': expandedFAQ === index }"
                    />
                  </button>
                  
                  <Transition
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-96 opacity-100"
                    leave-active-class="transition-all duration-300 ease-in"
                    leave-from-class="max-h-96 opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                  >
                    <div v-if="expandedFAQ === index" class="px-6 pb-6">
                      <Text size="base" class="text-muted-foreground leading-relaxed">
                        {{ faq.answer }}
                      </Text>
                    </div>
                  </Transition>
                </GlassCard>
              </div>
              
              <!-- Still have questions? -->
              <div class="mt-12 text-center">
                <GlassCard variant="heavy" class="p-8 natural-depth gentle-hover">
                  <Icon name="lucide:help-circle" class="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
                  <Heading tag="h3" size="h4" class="text-foreground mb-3">
                    Still have questions?
                  </Heading>
                  <Text size="base" class="text-muted-foreground mb-6">
                    Can't find what you're looking for? Our support team is here to help.
                  </Text>
                  <Button
                    variant="primary"
                    size="lg"
                    @click="scrollToForm"
                  >
                    <Icon name="lucide:mail" class="mr-2 h-4 w-4" />
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
            <div class="text-center mb-12">
              <MHeroBadge
                text="Visit Our Office"
                variant="outline"
                size="sm"
                dot-color="primary"
                class="mb-6"
              />
              
              <Heading tag="h2" size="h2" class="text-foreground mb-4 text-center">
                <span class="block">Hartford</span>
                <AGradientText
                  tag="span"
                  variant="secondary"
                  direction="to-r"
                  intensity="normal"
                  class="block"
                >
                  Innovation Hub
                </AGradientText>
              </Heading>
              
              <Text size="lg" class="text-muted-foreground text-center">
                Located in the heart of Connecticut's creative tech corridor
              </Text>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <!-- Office Info -->
              <div class="space-y-8">
                <GlassCard variant="light" class="p-8 natural-depth gentle-hover group">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:map-pin" class="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Heading tag="h3" size="h5" class="text-foreground mb-2">
                        Headquarters
                      </Heading>
                      <Text size="base" class="text-muted-foreground">
                        123 Innovation Drive<br />
                        Hartford, CT 06103<br />
                        United States
                      </Text>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard variant="light" class="p-8 natural-depth gentle-hover group">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:clock" class="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <Heading tag="h3" size="h5" class="text-foreground mb-2">
                        Office Hours
                      </Heading>
                      <Text size="base" class="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                        Saturday: 10:00 AM - 2:00 PM EST<br />
                        Sunday: Closed
                      </Text>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard variant="light" class="p-8 natural-depth gentle-hover group">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon name="lucide:train" class="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <Heading tag="h3" size="h5" class="text-foreground mb-2">
                        Transportation
                      </Heading>
                      <Text size="base" class="text-muted-foreground">
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
                <GlassCard variant="heavy" class="p-2 natural-depth overflow-hidden">
                  <div class="relative min-h-[400px] md:min-h-[500px] bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-lg flex items-center justify-center">
                    <!-- Animated Map Placeholder -->
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="relative">
                        <!-- Ripple effect -->
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="w-32 h-32 rounded-full border-2 border-primary/30 animate-ping" />
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center animation-delay-2000">
                          <div class="w-24 h-24 rounded-full border-2 border-accent/30 animate-ping" />
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center animation-delay-4000">
                          <div class="w-16 h-16 rounded-full border-2 border-secondary/30 animate-ping" />
                        </div>
                        
                        <!-- Location pin -->
                        <div class="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl flex items-center justify-center animate-float">
                          <Icon name="lucide:map-pin" class="h-8 w-8 text-background" />
                        </div>
                      </div>
                    </div>
                    
                    <!-- Map overlay text -->
                    <div class="absolute bottom-4 left-4 right-4">
                      <GlassCard variant="heavy" class="p-4">
                        <div class="flex items-center justify-between">
                          <div>
                            <Text size="sm" class="font-medium text-foreground">
                              Fablecraft HQ
                            </Text>
                            <Text size="xs" class="text-muted-foreground">
                              Hartford, Connecticut
                            </Text>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            @click="handleGetDirections"
                          >
                            <Icon name="lucide:navigation" class="mr-2 h-3 w-3" />
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

const handleStartChat = () => {
  // Initialize chat widget
  console.log('Starting live chat...')
}

const handleGetDirections = () => {
  window.open('https://maps.google.com/?q=Hartford,CT', '_blank')
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