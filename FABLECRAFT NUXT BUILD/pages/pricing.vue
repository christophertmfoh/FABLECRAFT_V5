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
        <div class="py-12 sm:py-16">
          <Container size="lg">
            <div class="text-center max-w-3xl mx-auto">
              <Heading tag="h1" size="h1" class="mb-4">
                Choose Your Subscription
              </Heading>
              <Text size="lg" class="text-muted-foreground">
                {{ config.trialDays }}-day free trial on all paid plans. No credit card required.
              </Text>
            </div>
          </Container>
        </div>
      </Section>

      <!-- Plan Selector Section -->
      <Section spacing="none" class="plan-selector-section">
        <Container size="lg">
          <!-- Billing Toggle -->
          <div class="flex items-center justify-center gap-4 mb-8">
            <Text 
              size="base" 
              class="font-medium transition-colors"
              :class="billingPeriod === 'monthly' ? 'text-foreground' : 'text-muted-foreground'"
            >
              Monthly
            </Text>
            <button
              class="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              :class="billingPeriod === 'yearly' ? 'bg-primary' : 'bg-muted'"
              @click="toggleBilling"
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                :class="billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'"
              />
            </button>
            <div class="flex items-center gap-2">
              <Text 
                size="base" 
                class="font-medium transition-colors"
                :class="billingPeriod === 'yearly' ? 'text-foreground' : 'text-muted-foreground'"
              >
                Yearly
              </Text>
              <Badge variant="default" size="sm" class="bg-green-500/10 text-green-600 border-green-500/20">
                {{ config.discount.label }}
              </Badge>
            </div>
          </div>

          <!-- Plan Selection Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12">
            <button
              v-for="(plan, key) in config.plans"
              :key="key"
              class="plan-selector-card p-6 rounded-xl border-2 transition-all duration-200 text-left relative"
              :class="[
                selectedPlan === key 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50',
                plan.isPopular ? 'ring-2 ring-primary/20' : ''
              ]"
              @click="selectPlan(key)"
            >
              <!-- Popular Badge -->
              <Badge 
                v-if="plan.isPopular" 
                variant="default" 
                size="sm" 
                class="absolute -top-3 left-1/2 -translate-x-1/2"
              >
                Most Popular
              </Badge>

              <!-- Plan Name -->
              <Heading tag="h3" size="h4" class="mb-2">
                {{ plan.name }}
              </Heading>

              <!-- Price -->
              <div class="mb-3">
                <span class="text-3xl font-bold">
                  {{ formatPrice(plan, billingPeriod) }}
                </span>
                <span v-if="plan.prices[billingPeriod] !== 'custom'" class="text-muted-foreground">
                  /{{ billingPeriod === 'yearly' ? 'year' : 'month' }}
                </span>
              </div>

              <!-- Description -->
              <Text size="sm" class="text-muted-foreground mb-4">
                {{ plan.description }}
              </Text>

              <!-- Key Features (first 3) -->
              <ul class="space-y-2">
                <li 
                  v-for="(feature, idx) in plan.features.slice(0, 3)" 
                  :key="idx"
                  class="flex items-start gap-2 text-sm"
                >
                  <Icon name="lucide:check" class="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <!-- Selected Indicator -->
              <div 
                v-if="selectedPlan === key"
                class="absolute top-4 right-4"
              >
                <Icon name="lucide:check-circle" class="h-6 w-6 text-primary" />
              </div>
            </button>
          </div>

          <!-- Selected Plan Details & Checkout -->
          <div v-if="selectedPlan" class="max-w-2xl mx-auto">
            <Card class="p-8">
              <div class="mb-6">
                <Heading tag="h2" size="h3" class="mb-2">
                  {{ config.plans[selectedPlan].name }} Plan
                </Heading>
                <Text size="lg" class="text-primary font-semibold">
                  {{ formatPrice(config.plans[selectedPlan], billingPeriod) }}
                  <span class="text-muted-foreground font-normal">
                    {{ billingPeriod === 'yearly' ? 'per year' : 'per month' }}
                  </span>
                </Text>
              </div>

              <!-- All Features -->
              <div class="mb-6">
                <Text size="sm" class="font-semibold mb-3">Everything included:</Text>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <li 
                    v-for="(feature, idx) in config.plans[selectedPlan].features" 
                    :key="idx"
                    class="flex items-start gap-2 text-sm"
                  >
                    <Icon name="lucide:check" class="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- Checkout Section -->
              <div v-if="selectedPlan !== 'enterprise'" class="space-y-4">
                <!-- Trial Notice -->
                <div class="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:gift" class="h-5 w-5 text-green-600" />
                    <Text size="sm" class="font-medium">
                      Start with {{ config.trialDays }}-day free trial - No credit card required
                    </Text>
                  </div>
                </div>

                <!-- Payment Method Selection (for after trial) -->
                <div v-if="!startTrial">
                  <Label class="mb-2">Payment Method (for after trial)</Label>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      v-for="method in paymentMethods.filter(m => !m.enterprise)"
                      :key="method.id"
                      class="p-3 rounded-lg border-2 transition-all"
                      :class="selectedPaymentMethod === method.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'"
                      @click="selectedPaymentMethod = method.id"
                    >
                      <div class="flex items-center gap-2">
                        <Icon :name="method.icon" class="h-5 w-5" />
                        <span class="text-sm font-medium">{{ method.name }}</span>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Email Input (for trial) -->
                <div v-if="!isAuthenticated">
                  <Label for="email" class="mb-2">Email Address</Label>
                  <Input
                    id="email"
                    v-model="checkoutEmail"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <!-- Terms -->
                <div class="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    v-model="acceptedTerms"
                  />
                  <Label for="terms" class="text-sm">
                    I agree to the <a href="/terms" class="text-primary hover:underline">Terms of Service</a> 
                    and <a href="/privacy" class="text-primary hover:underline">Privacy Policy</a>
                  </Label>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3">
                  <Button
                    size="lg"
                    variant="default"
                    class="flex-1"
                    :disabled="!acceptedTerms || (!isAuthenticated && !checkoutEmail) || isProcessing"
                    @click="handleStartTrial"
                  >
                    <Spinner v-if="isProcessing" class="mr-2 h-4 w-4" />
                    <Icon v-else name="lucide:rocket" class="mr-2 h-4 w-4" />
                    Start {{ config.trialDays }}-Day Free Trial
                  </Button>
                </div>

                <!-- Security Notice -->
                <div class="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:lock" class="h-3 w-3" />
                    <span>Secure checkout</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="lucide:shield-check" class="h-3 w-3" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>

              <!-- Enterprise Contact -->
              <div v-else class="space-y-4">
                <div class="p-4 bg-primary/5 rounded-lg">
                  <Text size="sm">
                    Enterprise plans are customized for your organization's needs. 
                    Our team will work with you to create the perfect solution.
                  </Text>
                </div>
                <Button
                  size="lg"
                  variant="default"
                  class="w-full"
                  @click="handleContactSales"
                >
                  <Icon name="lucide:phone" class="mr-2 h-4 w-4" />
                  Contact Sales Team
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <!-- Comparison Table Section -->
      <Section spacing="none" class="comparison-section bg-muted/30">
        <div class="py-12 sm:py-16">
          <Container size="xl">
            <div class="text-center mb-8">
              <Heading tag="h2" size="h2">
                Detailed Feature Comparison
              </Heading>
            </div>

            <!-- Desktop Table -->
            <div class="hidden lg:block overflow-x-auto">
              <table class="w-full bg-card rounded-xl overflow-hidden">
                <thead class="bg-muted/50">
                  <tr class="border-b border-border">
                    <th class="text-left py-4 px-6 font-semibold">Features</th>
                    <th 
                      v-for="(plan, key) in config.plans" 
                      :key="key"
                      class="text-center py-4 px-6"
                    >
                      <div class="font-semibold">{{ plan.name }}</div>
                      <div class="text-sm text-muted-foreground">
                        {{ formatPrice(plan, 'monthly') }}
                      </div>
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
                    <td 
                      v-for="planKey in ['free', 'starter', 'pro', 'enterprise']" 
                      :key="planKey"
                      class="text-center py-4 px-6"
                      :class="{ 'bg-primary/5': config.plans[planKey]?.isPopular }"
                    >
                      <ComparisonValue :value="feature[planKey]" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Comparison -->
            <div class="lg:hidden space-y-4">
              <select 
                v-model="mobileComparisonPlan"
                class="w-full p-3 rounded-lg border border-border bg-card"
              >
                <option v-for="(plan, key) in config.plans" :key="key" :value="key">
                  {{ plan.name }} - {{ formatPrice(plan, 'monthly') }}
                </option>
              </select>

              <Card class="p-6">
                <Heading tag="h3" size="h4" class="mb-4">
                  {{ config.plans[mobileComparisonPlan].name }} Features
                </Heading>
                <div class="space-y-3">
                  <div 
                    v-for="(feature, index) in comparisonFeatures" 
                    :key="index"
                    class="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                  >
                    <span class="text-sm">{{ feature.name }}</span>
                    <ComparisonValue :value="feature[mobileComparisonPlan]" size="sm" />
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </div>
      </Section>

      <!-- Trust Section -->
      <Section spacing="none" class="trust-section">
        <div class="py-12">
          <Container size="xl">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">{{ trustMetrics.activeUsers }}</div>
                <Text size="sm" class="text-muted-foreground">Active Creators</Text>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">{{ trustMetrics.rating }}</div>
                <Text size="sm" class="text-muted-foreground">Average Rating</Text>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">{{ trustMetrics.uptime }}</div>
                <Text size="sm" class="text-muted-foreground">Uptime SLA</Text>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary mb-2">{{ trustMetrics.support }}</div>
                <Text size="sm" class="text-muted-foreground">Support</Text>
              </div>
            </div>
          </Container>
        </div>
      </Section>

      <!-- FAQ Section -->
      <Section spacing="none" class="faq-section bg-muted/30">
        <div class="py-12 sm:py-16">
          <Container size="lg">
            <div class="text-center mb-8">
              <Heading tag="h2" size="h2">
                Frequently Asked Questions
              </Heading>
            </div>

            <div class="max-w-3xl mx-auto space-y-4">
              <div
                v-for="(faq, index) in pricingFaqs"
                :key="index"
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
import { ref, computed, onMounted } from 'vue'
import { useHead, navigateTo, useSupabaseClient, useSupabaseUser, useRoute } from '#imports'
import { 
  PRICING_CONFIG, 
  TRUST_METRICS, 
  COMPARISON_FEATURES, 
  PRICING_FAQS,
  PAYMENT_METHODS 
} from '~/constants/pricing'

// Authentication state
const supabase = import.meta.client ? useSupabaseClient() : null
const user = import.meta.client ? useSupabaseUser() : ref(null)
const isAuthenticated = computed(() => !!user?.value)
const route = useRoute()

// Configuration
const config = PRICING_CONFIG
const trustMetrics = TRUST_METRICS
const comparisonFeatures = COMPARISON_FEATURES
const pricingFaqs = PRICING_FAQS
const paymentMethods = PAYMENT_METHODS

// Page meta
useHead({
  title: 'Pricing - Fablecraft | Start Your 30-Day Free Trial',
  meta: [
    {
      name: 'description',
      content: `Choose the perfect Fablecraft plan. ${config.trialDays}-day free trial on all plans. No credit card required.`,
    },
  ],
})

// State
const billingPeriod = ref<'monthly' | 'yearly'>('monthly')
const selectedPlan = ref<string | null>(null)
const selectedPaymentMethod = ref<string>('card')
const expandedFaq = ref<number | null>(null)
const mobileComparisonPlan = ref<string>('free')
const checkoutEmail = ref('')
const acceptedTerms = ref(false)
const isProcessing = ref(false)
const startTrial = ref(true)

// Initialize from URL params
onMounted(() => {
  const planParam = route.query.plan as string
  if (planParam && config.plans[planParam]) {
    selectedPlan.value = planParam
  }
})

// Methods
const toggleBilling = () => {
  billingPeriod.value = billingPeriod.value === 'monthly' ? 'yearly' : 'monthly'
}

const selectPlan = (planId: string) => {
  selectedPlan.value = planId
}

const formatPrice = (plan: any, period: string) => {
  const price = plan.prices[period]
  if (price === 'custom') return 'Custom'
  if (price === 0) return 'Free'
  
  if (period === 'yearly') {
    const monthlyPrice = Math.round(price / 12)
    return `$${monthlyPrice}`
  }
  
  return `$${price}`
}

const handleStartTrial = async () => {
  if (!acceptedTerms.value) return
  
  isProcessing.value = true
  
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  if (!isAuthenticated.value) {
    // Redirect to signup with plan info
    navigateTo(`/signup?plan=${selectedPlan.value}&trial=true&email=${checkoutEmail.value}`)
  } else {
    // Start trial for authenticated user
    console.log('Starting trial for plan:', selectedPlan.value)
    // Here you would make an API call to start the trial
    navigateTo('/account?trial=started')
  }
  
  isProcessing.value = false
}

const handleContactSales = () => {
  navigateTo('/contact?subject=enterprise')
}

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
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
/* Plan selector cards */
.plan-selector-card {
  @apply cursor-pointer;
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

/* Trust section */
.trust-section {
  @apply relative;
}

.trust-section::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5;
}
</style>