<template>
  <div class="pricing-page relative min-h-screen bg-background">
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
      :is-authenticated="isAuthenticated"
      :user="user"
      :show-auth="true"
      :show-nav-items="true"
      :show-theme-toggle="true"
      variant="default"
      @navigate="handleNavigate"
      @auth:click="handleAuth"
      @auth:logout="handleLogout"
      @logo:click="handleHome"
    />

    <!-- Main Content -->
    <main class="relative z-10">
      <!-- Hero Section -->
      <Section spacing="none" class="pricing-hero-section">
        <div class="py-16 sm:py-20">
          <Container size="xl">
            <div class="text-center max-w-3xl mx-auto">
              <!-- Badge -->
              <Badge variant="outline" class="mb-6 inline-flex items-center gap-2">
                <Icon name="lucide:sparkles" class="h-3 w-3" />
                <span>Simple, transparent pricing</span>
              </Badge>

              <!-- Title -->
              <Heading tag="h1" size="display" class="mb-4">
                Choose the perfect plan for your
                <AGradientText variant="primary" intensity="vibrant" class="inline-block mx-2">
                  creative journey
                </AGradientText>
              </Heading>

              <!-- Description -->
              <Text size="lg" class="text-muted-foreground mb-8">
                Start free, upgrade when you need more. All plans include core features.
                No hidden fees, cancel anytime.
              </Text>

              <!-- Billing Toggle -->
              <div class="flex items-center justify-center gap-4 mb-12">
                <Text 
                  size="base" 
                  class="font-medium transition-colors"
                  :class="billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'"
                >
                  Monthly
                </Text>
                <PricingToggle
                  v-model="billingPeriod"
                  :options="['monthly', 'yearly']"
                  @change="handleBillingChange"
                />
                <div class="flex items-center gap-2">
                  <Text 
                    size="base" 
                    class="font-medium transition-colors"
                    :class="billingPeriod === 'yearly' ? 'text-foreground' : 'text-muted-foreground'"
                  >
                    Yearly
                  </Text>
                  <Badge variant="default" size="sm" class="bg-green-500/10 text-green-600 border-green-500/20">
                    Save 20%
                  </Badge>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      <!-- Pricing Cards Section -->
      <Section spacing="none" class="pricing-cards-section">
        <Container size="xl">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <!-- Free Plan -->
            <div class="pricing-card-wrapper">
              <MPricingCard
                name="Free"
                :price="0"
                period=""
                description="Perfect for trying out Fablecraft"
                :features="freeFeatures"
                cta-text="Start Free"
                :variant="selectedPlan === 'free' ? 'highlighted' : 'default'"
                @click="selectPlan('free')"
                @cta-click="handleSubscribe('free')"
              />
            </div>

            <!-- Starter Plan -->
            <div class="pricing-card-wrapper">
              <MPricingCard
                name="Starter"
                :price="billingPeriod === 'monthly' ? 9 : 7"
                :period="billingPeriod === 'monthly' ? '/month' : '/month billed yearly'"
                description="For hobbyists and beginners"
                :features="starterFeatures"
                cta-text="Start 7-day trial"
                :variant="selectedPlan === 'starter' ? 'highlighted' : 'default'"
                @click="selectPlan('starter')"
                @cta-click="handleSubscribe('starter')"
              />
            </div>

            <!-- Pro Plan -->
            <div class="pricing-card-wrapper">
              <MPricingCard
                name="Pro"
                :price="billingPeriod === 'monthly' ? 29 : 24"
                :period="billingPeriod === 'monthly' ? '/month' : '/month billed yearly'"
                description="For serious creators"
                :features="proFeatures"
                cta-text="Start 7-day trial"
                :is-popular="true"
                popular-text="Most Popular"
                :variant="selectedPlan === 'pro' ? 'highlighted' : 'default'"
                @click="selectPlan('pro')"
                @cta-click="handleSubscribe('pro')"
              />
            </div>

            <!-- Enterprise Plan -->
            <div class="pricing-card-wrapper">
              <MPricingCard
                name="Enterprise"
                price="Custom"
                period=""
                description="For teams and organizations"
                :features="enterpriseFeatures"
                cta-text="Contact Sales"
                :variant="selectedPlan === 'enterprise' ? 'highlighted' : 'default'"
                @click="selectPlan('enterprise')"
                @cta-click="handleSubscribe('enterprise')"
              />
            </div>
          </div>
        </Container>
      </Section>

      <!-- Comparison Table Section -->
      <Section spacing="none" class="comparison-section bg-muted/30">
        <div class="py-16 sm:py-20">
          <Container size="xl">
            <!-- Section Header -->
            <div class="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" class="mb-4">
                <Icon name="lucide:scale" class="h-3 w-3 mr-2" />
                Detailed Comparison
              </Badge>
              <Heading tag="h2" size="h2" class="mb-4">
                Compare all features across plans
              </Heading>
              <Text size="lg" class="text-muted-foreground">
                Every plan includes our core features. Higher tiers unlock advanced capabilities.
              </Text>
            </div>

            <!-- Comparison Table -->
            <div class="overflow-x-auto">
              <table class="w-full comparison-table">
                <thead>
                  <tr class="border-b border-border">
                    <th class="text-left py-4 px-6 font-semibold">Features</th>
                    <th class="text-center py-4 px-6">
                      <div class="font-semibold">Free</div>
                      <div class="text-sm text-muted-foreground">$0</div>
                    </th>
                    <th class="text-center py-4 px-6">
                      <div class="font-semibold">Starter</div>
                      <div class="text-sm text-muted-foreground">
                        ${{ billingPeriod === 'monthly' ? '9' : '7' }}/mo
                      </div>
                    </th>
                    <th class="text-center py-4 px-6 relative">
                      <PopularBadge
                        :show="true"
                        text="Popular"
                        position="top-center"
                        size="xs"
                      />
                      <div class="font-semibold mt-2">Pro</div>
                      <div class="text-sm text-muted-foreground">
                        ${{ billingPeriod === 'monthly' ? '29' : '24' }}/mo
                      </div>
                    </th>
                    <th class="text-center py-4 px-6">
                      <div class="font-semibold">Enterprise</div>
                      <div class="text-sm text-muted-foreground">Custom</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(feature, index) in comparisonFeatures" 
                    :key="index"
                    class="border-b border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-2">
                        <span class="font-medium">{{ feature.name }}</span>
                        <Tooltip v-if="feature.tooltip">
                          <TooltipTrigger>
                            <Icon name="lucide:info" class="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {{ feature.tooltip }}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                    <td class="text-center py-4 px-6">
                      <ComparisonValue :value="feature.free" />
                    </td>
                    <td class="text-center py-4 px-6">
                      <ComparisonValue :value="feature.starter" />
                    </td>
                    <td class="text-center py-4 px-6 bg-primary/5">
                      <ComparisonValue :value="feature.pro" />
                    </td>
                    <td class="text-center py-4 px-6">
                      <ComparisonValue :value="feature.enterprise" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Comparison (Card View) -->
            <div class="lg:hidden mt-8 space-y-4">
              <div v-for="plan in ['free', 'starter', 'pro', 'enterprise']" :key="plan">
                <Card class="p-6">
                  <Heading tag="h3" size="h4" class="mb-4 capitalize">
                    {{ plan }}
                    <Badge v-if="plan === 'pro'" variant="default" size="sm" class="ml-2">
                      Popular
                    </Badge>
                  </Heading>
                  <div class="space-y-3">
                    <div 
                      v-for="(feature, index) in comparisonFeatures" 
                      :key="index"
                      class="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                    >
                      <span class="text-sm">{{ feature.name }}</span>
                      <ComparisonValue :value="feature[plan]" size="sm" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      <!-- Trust Section -->
      <Section spacing="none" class="trust-section">
        <div class="py-16">
          <Container size="xl">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">50K+</div>
                <Text size="sm" class="text-muted-foreground">Active Creators</Text>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">4.9/5</div>
                <Text size="sm" class="text-muted-foreground">Average Rating</Text>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">99.9%</div>
                <Text size="sm" class="text-muted-foreground">Uptime SLA</Text>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">24/7</div>
                <Text size="sm" class="text-muted-foreground">Support</Text>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      <!-- FAQ Section -->
      <Section spacing="none" class="faq-section bg-muted/30">
        <div class="py-16 sm:py-20">
          <Container size="lg">
            <div class="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="outline" class="mb-4">
                <Icon name="lucide:help-circle" class="h-3 w-3 mr-2" />
                FAQ
              </Badge>
              <Heading tag="h2" size="h2" class="mb-4">
                Frequently asked questions
              </Heading>
              <Text size="lg" class="text-muted-foreground">
                Everything you need to know about our pricing and plans
              </Text>
            </div>

            <div class="max-w-3xl mx-auto space-y-4">
              <div
                v-for="(faq, index) in pricingFaqs"
                :key="index"
                class="faq-item"
              >
                <button
                  class="w-full text-left p-6 bg-card rounded-xl hover:bg-accent/5 transition-all duration-200 group"
                  @click="toggleFaq(index)"
                >
                  <div class="flex justify-between items-center">
                    <Heading tag="h3" size="h4" class="pr-4">
                      {{ faq.question }}
                    </Heading>
                    <Icon
                      :name="expandedFaq === index ? 'lucide:minus' : 'lucide:plus'"
                      class="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-200"
                      :class="{ 'rotate-180': expandedFaq === index }"
                    />
                  </div>
                  <Transition name="faq">
                    <div v-if="expandedFaq === index" class="mt-4">
                      <Text size="base" class="text-muted-foreground">
                        {{ faq.answer }}
                      </Text>
                    </div>
                  </Transition>
                </button>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      <!-- CTA Section -->
      <Section spacing="none" class="cta-section">
        <div class="py-20">
          <Container size="lg">
            <Card class="p-12 text-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
              <Heading tag="h2" size="h2" class="mb-4">
                Ready to start creating?
              </Heading>
              <Text size="lg" class="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already using Fablecraft to bring their stories to life.
                Start with our free plan and upgrade anytime.
              </Text>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="default"
                  class="font-semibold"
                  @click="handleStartFree"
                >
                  <Icon name="lucide:sparkles" class="mr-2 h-4 w-4" />
                  Start Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  class="font-semibold"
                  @click="handleContactSales"
                >
                  <Icon name="lucide:phone" class="mr-2 h-4 w-4" />
                  Talk to Sales
                </Button>
              </div>
            </Card>
          </Container>
        </div>
      </Section>
    </main>

    <!-- Footer -->
    <Footer
      id="footer"
      class="relative z-30"
      :show-branding="true"
      variant="default"
      @navigate="handleFooterNavigation"
      @newsletter:subscribe="handleNewsletterSubscribe"
      @social:click="handleSocialClick"
      @legal:click="handleLegalClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead, navigateTo, useSupabaseClient, useSupabaseUser } from '#imports'

// Authentication state
const supabase = import.meta.client ? useSupabaseClient() : null
const user = import.meta.client ? useSupabaseUser() : ref(null)
const isAuthenticated = computed(() => !!user?.value)

// Page meta
useHead({
  title: 'Pricing - Fablecraft | Simple, Transparent Pricing',
  meta: [
    {
      name: 'description',
      content: 'Choose the perfect Fablecraft plan for your creative journey. Free to start, with flexible pricing for hobbyists, professionals, and enterprises.',
    },
  ],
})

// State
const billingPeriod = ref<'monthly' | 'yearly'>('monthly')
const selectedPlan = ref<string | null>(null)
const expandedFaq = ref<number | null>(null)

// Plan features
const freeFeatures = [
  { text: '3 projects per month', included: true },
  { text: 'Basic AI assistance', included: true },
  { text: 'Community support', included: true },
  { text: 'Export to PDF', included: true },
  { text: 'Basic templates', included: true },
]

const starterFeatures = [
  { text: '10 projects per month', included: true },
  { text: 'Advanced AI assistance', included: true },
  { text: 'Priority support', included: true },
  { text: 'All export formats', included: true },
  { text: 'Premium templates', included: true },
]

const proFeatures = [
  { text: 'Unlimited projects', included: true },
  { text: 'Pro AI with GPT-4', included: true },
  { text: 'Priority support', included: true },
  { text: 'Advanced collaboration', included: true },
  { text: 'Custom branding', included: true },
]

const enterpriseFeatures = [
  { text: 'Everything in Pro', included: true },
  { text: 'Custom AI training', included: true },
  { text: 'Dedicated support', included: true },
  { text: 'SSO & advanced security', included: true },
  { text: 'SLA guarantee', included: true },
]

// Comparison table features
const comparisonFeatures = [
  {
    name: 'Projects per month',
    free: '3',
    starter: '10',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    name: 'AI Writing Assistant',
    free: true,
    starter: true,
    pro: true,
    enterprise: true,
    tooltip: 'AI-powered writing suggestions and completions',
  },
  {
    name: 'AI Model',
    free: 'Basic',
    starter: 'Advanced',
    pro: 'GPT-4',
    enterprise: 'Custom',
  },
  {
    name: 'Story Templates',
    free: '10',
    starter: '50+',
    pro: '200+',
    enterprise: 'Custom',
  },
  {
    name: 'Export Formats',
    free: 'PDF',
    starter: 'All formats',
    pro: 'All formats',
    enterprise: 'All formats + API',
  },
  {
    name: 'Collaboration',
    free: false,
    starter: '3 users',
    pro: '10 users',
    enterprise: 'Unlimited',
  },
  {
    name: 'Version History',
    free: '7 days',
    starter: '30 days',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    name: 'Storage',
    free: '1 GB',
    starter: '10 GB',
    pro: '100 GB',
    enterprise: 'Unlimited',
  },
  {
    name: 'Support',
    free: 'Community',
    starter: 'Email',
    pro: 'Priority',
    enterprise: 'Dedicated',
  },
  {
    name: 'API Access',
    free: false,
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'Custom Branding',
    free: false,
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'Analytics',
    free: 'Basic',
    starter: 'Advanced',
    pro: 'Advanced',
    enterprise: 'Custom',
  },
]

// FAQ data
const pricingFaqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, you\'ll receive credit for the unused time.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for enterprise customers.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes! All paid plans come with a 7-day free trial. No credit card required to start your trial.',
  },
  {
    question: 'What happens when I reach my project limit?',
    answer: 'You\'ll receive a notification when you\'re close to your limit. You can either upgrade your plan or wait until the next billing cycle for your limit to reset.',
  },
  {
    question: 'Do you offer discounts for students or non-profits?',
    answer: 'Yes! We offer 50% off for verified students and non-profit organizations. Contact our support team with proof of eligibility.',
  },
]

// Event handlers
const handleBillingChange = (value: 'monthly' | 'yearly') => {
  billingPeriod.value = value
}

const selectPlan = (plan: string) => {
  selectedPlan.value = plan
}

const handleSubscribe = (plan: string) => {
  if (plan === 'free') {
    if (!isAuthenticated.value) {
      // Open auth overlay for signup
      navigateTo('/signup?plan=free')
    } else {
      // Already logged in, just switch to free plan
      console.log('Switching to free plan')
    }
  } else if (plan === 'enterprise') {
    navigateTo('/contact?subject=enterprise')
  } else {
    // For paid plans, go to checkout
    navigateTo(`/checkout?plan=${plan}&billing=${billingPeriod.value}`)
  }
}

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const handleStartFree = () => {
  handleSubscribe('free')
}

const handleContactSales = () => {
  navigateTo('/contact?subject=sales')
}

// Navigation handlers
const handleNavigate = (path: string) => {
  navigateTo(`/${path}`)
}

const handleAuth = () => {
  const { open } = useAuthOverlay()
  open('login')
}

const handleLogout = async () => {
  if (!supabase) return
  await supabase.auth.signOut()
}

const handleHome = () => {
  navigateTo('/')
}

const handleFooterNavigation = (payload: any) => {
  console.log('Footer navigation:', payload)
}

const handleNewsletterSubscribe = (email: string) => {
  console.log('Newsletter subscription:', email)
}

const handleSocialClick = (payload: any) => {
  console.log('Social click:', payload)
}

const handleLegalClick = (payload: any) => {
  console.log('Legal click:', payload)
}
</script>

<style scoped>
/* Comparison table styles */
.comparison-table {
  @apply bg-card rounded-xl overflow-hidden;
}

.comparison-table thead {
  @apply bg-muted/50;
}

.comparison-table tbody tr:last-child {
  @apply border-b-0;
}

/* FAQ transition */
.faq-enter-active,
.faq-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  max-height: 0;
}

/* Pricing card wrapper */
.pricing-card-wrapper {
  @apply transform transition-all duration-300;
}

.pricing-card-wrapper:hover {
  @apply -translate-y-1;
}

/* Trust section numbers */
.trust-section {
  @apply relative;
}

.trust-section::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5;
}
</style>