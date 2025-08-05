import { computed, readonly } from 'vue'

// Types
export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  contact: ContactInfo
}

export interface FooterLinks {
  product: string[]
  company: string[]
  support: string[]
  legal: string[]
}

export interface NewsletterContent {
  title: string
  description: string
  placeholder: string
  buttonText: string
  disclaimer: string
}

export interface SocialLink {
  icon: string
  label: string
  href?: string
}

export interface FooterBranding {
  followText: string
  madeWithText: string
  madeForText: string
}

/**
 * Footer Content Composable
 * 
 * Centralized content management for the footer component.
 * Based on the original React footer-content.ts configuration.
 */
export const useFooterContent = () => {
  // Company information
  const companyInfo: CompanyInfo = {
    name: 'Fablecraft',
    tagline: 'Where every story finds its voice',
    description: 'Empowering writers and storytellers with AI-powered tools for character creation, world building, and narrative development.',
    contact: {
      email: 'hello@fablecraft.com',
      phone: '+1 (555) 123-4567',
      location: 'Hartford, CT'
    }
  }

  // Footer navigation links organized by category
  const footerLinks: FooterLinks = {
    product: [
      'Character Creator',
      'World Builder', 
      'Story Planner',
      'Writing Assistant',
      'AI Companion',
      'Templates',
      'Manuscripts'
    ],
    company: [
      'About Us',
      'Careers',
      'Blog',
      'Press Kit',
      'Partners',
      'Contact'
    ],
    support: [
      'Help Center',
      'Documentation',
      'Community Forum',
      'Status Page'
    ],
    legal: [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy'
    ]
  }

  // Newsletter section content
  const newsletterContent: NewsletterContent = {
    title: 'Stay Updated',
    description: 'Get the latest updates, writing tips, and feature announcements.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    disclaimer: 'We respect your privacy. Unsubscribe at any time.'
  }

  // Social media links with icons
  const socialLinks: SocialLink[] = [
    { icon: 'lucide:twitter', label: 'Twitter', href: 'https://twitter.com/fablecraft' },
    { icon: 'lucide:facebook', label: 'Facebook', href: 'https://facebook.com/fablecraft' },
    { icon: 'lucide:instagram', label: 'Instagram', href: 'https://instagram.com/fablecraft' },
    { icon: 'lucide:linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/fablecraft' },
    { icon: 'lucide:github', label: 'GitHub', href: 'https://github.com/fablecraft' }
  ]

  // Footer branding and taglines
  const footerBranding: FooterBranding = {
    followText: 'Follow us',
    madeWithText: 'Made with',
    madeForText: 'for storytellers everywhere'
  }

  // Get current year for copyright
  const getCurrentYear = () => new Date().getFullYear()

  // Get copyright text
  const getCopyrightText = computed(() => 
    `© ${getCurrentYear()} ${companyInfo.name}. All rights reserved.`
  )

  // Return reactive refs (readonly to prevent mutation)
  return {
    companyInfo: readonly(companyInfo),
    footerLinks: readonly(footerLinks),
    newsletterContent: readonly(newsletterContent),
    socialLinks: readonly(socialLinks),
    footerBranding: readonly(footerBranding),
    getCurrentYear,
    getCopyrightText
  }
}