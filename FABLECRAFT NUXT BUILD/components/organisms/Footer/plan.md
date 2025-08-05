# Footer Migration Plan

## Description

The Footer organism is a comprehensive website footer containing company information, navigation links, newsletter signup, social media links, contact details, and legal links. It follows semantic HTML practices with proper accessibility support and responsive design.

## React Component Analysis

- **Source**: `src/features-modern/landing/components/footer-section.tsx` (214 lines)
- **Content Source**: `src/components/layout/footer-content.ts` (external data configuration)
- **Structure**: 4-column responsive grid layout with bottom section
- **Key Features**:
  - Company branding with icon and tagline
  - Contact information (email, phone, location)
  - Product/Company/Support navigation links
  - Newsletter signup form
  - Social media icons with accessibility
  - Legal links and copyright
  - "Made with love" animated section

## Implementation Strategy

### Nuxt/Vue Approach vs React Patterns

- **Atomic Design**: Split into reusable atoms and molecules
- **Composables**: Use `useCompanyInfo()`, `useFooterContent()` for reactive data
- **TypeScript**: Proper interfaces for all content structures
- **Accessibility**: Semantic HTML5 `<footer>` with proper ARIA labels
- **Performance**: Use `lazy` components where appropriate
- **SEO**: Structured data for company info
- **Responsive**: Mobile-first Tailwind CSS approach

## Atoms Required

### Existing Atoms (✅ Available)

- `Button` - For newsletter signup and navigation actions
- `Input` - For newsletter email input
- `AtomIcon` - For all icons (Feather, social, contact)
- `Container` - For footer content wrapper

### New Atoms Needed (❌ Need Creation)

- `SocialIcon` - Individual social media icon with hover effects
- `ContactInfo` - Contact detail item (icon + text)
- `FooterLink` - Styled footer navigation link
- `CopyrightText` - Copyright notice with dynamic year
- `AnimatedOrb` - Small animated gradient orb for "made with love"

## Molecules Required

### Existing Molecules (✅ Available)

- None directly applicable

### New Molecules Needed (❌ Need Creation)

- `CompanyBranding` - Logo, name, and tagline section
- `ContactDetails` - Complete contact information section
- `NavigationColumn` - Footer navigation link column with heading
- `NewsletterSignup` - Email input with subscribe button and disclaimer
- `SocialLinks` - Social media icons grid with follow text
- `LegalLinks` - Legal navigation links (Privacy, Terms, etc.)
- `FooterBottom` - Copyright and legal links section

## Organism Structure

```vue
<template>
  <footer class="footer-organism">
    <!-- Main Footer Grid -->
    <Container size="xl" class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Company Section -->
        <CompanyBranding :show-branding="showBranding" :company="companyInfo" :tagline="tagline">
          <ContactDetails :contact="companyInfo.contact" />
        </CompanyBranding>

        <!-- Product Links -->
        <NavigationColumn
          title="Product"
          :links="footerLinks.product"
          @link-click="handleNavigation"
        />

        <!-- Company Links -->
        <NavigationColumn
          title="Company"
          :links="footerLinks.company"
          @link-click="handleNavigation"
        />

        <!-- Newsletter & Support -->
        <div class="space-y-6">
          <NewsletterSignup :content="newsletterContent" @subscribe="handleNewsletter" />
          <NavigationColumn
            title="Support"
            :links="footerLinks.support"
            @link-click="handleNavigation"
          />
        </div>
      </div>

      <!-- Footer Bottom -->
      <FooterBottom class="pt-8 border-t border-border/20">
        <template #copyright>
          <CopyrightText :company="companyInfo.name" />
          <LegalLinks :links="footerLinks.legal" @link-click="handleNavigation" />
        </template>
        <template #social>
          <SocialLinks :links="socialLinks" :follow-text="footerBranding.followText" />
        </template>
      </FooterBottom>

      <!-- Made with Love -->
      <div
        class="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-8 pt-6 border-t border-border/10"
      >
        <span>{{ footerBranding.madeWithText }}</span>
        <AnimatedOrb />
        <span>{{ footerBranding.madeForText }}</span>
      </div>
    </Container>
  </footer>
</template>
```

## Props & Events

### Props Interface

```typescript
interface FooterProps {
  className?: string
  showBranding?: boolean
  tagline?: string
  variant?: 'default' | 'minimal' | 'dark'
}
```

### Events

```typescript
interface FooterEmits {
  (e: 'navigate', payload: { type: string; item: string }): void
  (e: 'newsletter:subscribe', email: string): void
  (e: 'social:click', platform: string): void
}
```

## State Management

### Local State (Reactive)

- Newsletter subscription loading state
- Form validation errors
- Current year for copyright

### Composables

- `useFooterContent()` - Centralized footer content management
- `useCompanyInfo()` - Company information and contact details
- `useNewsletter()` - Newsletter subscription logic
- `useSocialLinks()` - Social media links with tracking

### No Pinia Required

Footer content is mostly static/configuration data, so Pinia store not necessary.

## Data Structure

### Footer Content Composable

```typescript
// composables/useFooterContent.ts
export const useFooterContent = () => {
  const companyInfo = {
    name: 'Fablecraft',
    tagline: 'Where every story finds its voice',
    description: 'Empowering writers and storytellers with AI-powered tools...',
    contact: {
      email: 'hello@fablecraft.com',
      phone: '+1 (555) 123-4567',
      location: 'Hartford, CT'
    }
  }

  const footerLinks = {
    product: ['Character Creator', 'World Builder', 'Story Planner', ...],
    company: ['About Us', 'Careers', 'Blog', ...],
    support: ['Help Center', 'Documentation', ...],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
  }

  const newsletterContent = {
    title: 'Stay Updated',
    description: 'Get the latest updates, writing tips, and feature announcements.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    disclaimer: 'We respect your privacy. Unsubscribe at any time.'
  }

  const socialLinks = [
    { icon: 'lucide:twitter', label: 'Twitter', href: '#' },
    { icon: 'lucide:facebook', label: 'Facebook', href: '#' },
    // ...
  ]

  const footerBranding = {
    followText: 'Follow us',
    madeWithText: 'Made with',
    madeForText: 'for storytellers everywhere'
  }

  return {
    companyInfo,
    footerLinks,
    newsletterContent,
    socialLinks,
    footerBranding
  }
}
```

## Accessibility Requirements

### Semantic HTML

- Use semantic `<footer>` element with `role="contentinfo"`
- Proper heading hierarchy (`h2`, `h3`, `h4`)
- Navigation landmarks for link groups
- Form labels and descriptions

### ARIA Support

- `aria-label` for social media icons
- `aria-describedby` for newsletter disclaimer
- `role="list"` for navigation link groups
- Screen reader-friendly link descriptions

### Keyboard Navigation

- All interactive elements focusable
- Logical tab order
- Visual focus indicators
- Skip links for footer sections

## Performance Optimizations

### Code Splitting

- Lazy load social icons
- Defer newsletter form validation
- Optimize contact information rendering

### Image Optimization

- Use `AtomIcon` for all iconography
- Optimize any company logos
- Proper loading strategies

## File Structure

```
components/
├── atoms/
│   ├── SocialIcon.vue
│   ├── ContactInfo.vue
│   ├── FooterLink.vue
│   ├── CopyrightText.vue
│   └── AnimatedOrb.vue
├── molecules/
│   ├── CompanyBranding.vue
│   ├── ContactDetails.vue
│   ├── NavigationColumn.vue
│   ├── NewsletterSignup.vue
│   ├── SocialLinks.vue
│   ├── LegalLinks.vue
│   └── FooterBottom.vue
├── organisms/
│   └── Footer.vue
└── composables/
    ├── useFooterContent.ts
    ├── useCompanyInfo.ts
    ├── useNewsletter.ts
    └── useSocialLinks.ts
```

## Migration Steps

1. **Create Base Atoms** (5 components)
2. **Build Footer Molecules** (7 components)
3. **Implement Composables** (4 composables)
4. **Assemble Footer Organism** (1 main component)
5. **Add to Landing Page** (Integration)
6. **Accessibility Testing** (ARIA, keyboard, screen reader)
7. **Responsive Testing** (Mobile, tablet, desktop)
8. **Performance Optimization** (Lazy loading, bundle size)

## Success Criteria

### Visual Parity

- ✅ Matches React footer design exactly
- ✅ Responsive behavior identical
- ✅ Proper spacing and typography
- ✅ Color scheme matches theme system

### Functional Parity

- ✅ Newsletter subscription works
- ✅ Navigation links functional
- ✅ Social media interactions
- ✅ Contact information display

### Accessibility Standards

- ✅ WCAG 2.1 AA compliance
- ✅ Screen reader compatible
- ✅ Keyboard navigation
- ✅ Semantic HTML structure

### Performance Targets

- ✅ < 50ms render time
- ✅ Optimized bundle size
- ✅ No layout shift
- ✅ Smooth animations
