// Pricing Configuration
export const PRICING_CONFIG = {
  trialDays: 30,
  discount: {
    yearly: 20, // percentage
    label: 'Save 20%',
  },
  plans: {
    free: {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying out Fablecraft',
      prices: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        '3 projects per month',
        'Basic AI assistance',
        'Community support',
        'Export to PDF',
        'Basic templates',
      ],
      limits: {
        projects: 3,
        storage: '1 GB',
        collaborators: 0,
        versionHistory: '7 days',
      },
    },
    starter: {
      id: 'starter',
      name: 'Starter',
      description: 'For hobbyists and beginners',
      prices: {
        monthly: 9,
        yearly: 84, // $7/month billed yearly
      },
      features: [
        '10 projects per month',
        'Advanced AI assistance',
        'Priority email support',
        'All export formats',
        'Premium templates',
        '30-day free trial',
      ],
      limits: {
        projects: 10,
        storage: '10 GB',
        collaborators: 3,
        versionHistory: '30 days',
      },
    },
    pro: {
      id: 'pro',
      name: 'Pro',
      description: 'For serious creators',
      prices: {
        monthly: 29,
        yearly: 288, // $24/month billed yearly
      },
      isPopular: true,
      features: [
        'Unlimited projects',
        'Pro AI with GPT-4',
        'Priority support',
        'Advanced collaboration',
        'Custom branding',
        'API access',
        '30-day free trial',
      ],
      limits: {
        projects: -1, // unlimited
        storage: '100 GB',
        collaborators: 10,
        versionHistory: -1, // unlimited
      },
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and organizations',
      prices: {
        monthly: 'custom',
        yearly: 'custom',
      },
      features: [
        'Everything in Pro',
        'Custom AI training',
        'Dedicated support',
        'SSO & advanced security',
        'SLA guarantee',
        'Custom integrations',
      ],
      limits: {
        projects: -1,
        storage: -1,
        collaborators: -1,
        versionHistory: -1,
      },
    },
  },
}

// Trust Metrics
export const TRUST_METRICS = {
  activeUsers: '50K+',
  rating: '4.9/5',
  uptime: '99.9%',
  support: '24/7',
}

// Comparison Features
export const COMPARISON_FEATURES = [
  {
    name: 'Projects per month',
    key: 'projects',
    free: '3',
    starter: '10',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    name: 'AI Writing Assistant',
    key: 'ai',
    free: true,
    starter: true,
    pro: true,
    enterprise: true,
    tooltip: 'AI-powered writing suggestions and completions',
  },
  {
    name: 'AI Model',
    key: 'aiModel',
    free: 'Basic',
    starter: 'Advanced',
    pro: 'GPT-4',
    enterprise: 'Custom',
  },
  {
    name: 'Story Templates',
    key: 'templates',
    free: '10',
    starter: '50+',
    pro: '200+',
    enterprise: 'Custom',
  },
  {
    name: 'Export Formats',
    key: 'export',
    free: 'PDF',
    starter: 'All formats',
    pro: 'All formats',
    enterprise: 'All formats + API',
  },
  {
    name: 'Collaboration',
    key: 'collaboration',
    free: false,
    starter: '3 users',
    pro: '10 users',
    enterprise: 'Unlimited',
  },
  {
    name: 'Version History',
    key: 'versionHistory',
    free: '7 days',
    starter: '30 days',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    name: 'Storage',
    key: 'storage',
    free: '1 GB',
    starter: '10 GB',
    pro: '100 GB',
    enterprise: 'Unlimited',
  },
  {
    name: 'Support',
    key: 'support',
    free: 'Community',
    starter: 'Email',
    pro: 'Priority',
    enterprise: 'Dedicated',
  },
  {
    name: 'API Access',
    key: 'api',
    free: false,
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'Custom Branding',
    key: 'branding',
    free: false,
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'Analytics',
    key: 'analytics',
    free: 'Basic',
    starter: 'Advanced',
    pro: 'Advanced',
    enterprise: 'Custom',
  },
]

// FAQ Data
export const PRICING_FAQS = [
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
    answer: `Yes! All paid plans come with a ${PRICING_CONFIG.trialDays}-day free trial. No credit card required to start your trial.`,
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

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'lucide:credit-card' },
  { id: 'paypal', name: 'PayPal', icon: 'lucide:wallet' },
  { id: 'wire', name: 'Wire Transfer', icon: 'lucide:building-2', enterprise: true },
]