# **FABLECRAFT LANDING PAGE STRUCTURE PLAN**

*Created: January 26, 2025 - 3:30 PM*  
*Scope: Landing page only - No authentication, dashboard, or projects*

---

## **🎯 PROJECT SCOPE**

**What we're building:**
- ✅ Single landing page with 8 major sections
- ✅ Clean atomic design architecture  
- ✅ Modern Nuxt 3.18 + Vue 3 + Tailwind
- ❌ No authentication pages
- ❌ No dashboard functionality
- ❌ No project management features

**What this document contains:**
- 📋 Complete inventory of files to create
- 📁 Folder structure walkthrough
- 🎯 Build order recommendations
- ❌ **NO CODE** - just planning and organization

---

## **📊 COMPLETE INVENTORY - WHAT WE NEED TO MAKE**

### **🔬 ATOMS** *(6 files)* - Basic building blocks
| **File** | **What It Does** | **Used In** |
|----------|------------------|-------------|
| `Button.vue` | CTA buttons, navigation buttons | ALL 8 sections |
| `Badge.vue` | Status badges, "Popular" tags, pulse animations | 5 sections |
| `Card.vue` | Base wrapper for content containers | 7 sections |
| `Icon.vue` | All Lucide icons (stars, arrows, zap, etc.) | ALL sections |
| `Input.vue` | Form inputs for newsletter signup | Footer section |
| `Utils.ts` | cn() function, formatters, helpers | Foundation utility |

### **🧪 MOLECULES** *(6 files)* - Simple combinations
| **File** | **What It Does** | **Combines** |
|----------|------------------|--------------|
| `BadgeWithDot.vue` | Animated badge with pulsing dot | Badge + pulse animation |
| `FeatureCard.vue` | Individual feature with icon + description | Icon + Card + text |
| `TestimonialCard.vue` | Customer quote with rating stars | Card + Icon + text |
| `PricingCard.vue` | Pricing tier with features list | Card + Button + Badge |
| `ProcessStepCard.vue` | Individual numbered workflow step | Icon + text + numbering |
| `SocialLinks.vue` | Social media icons grid | Icons + links + ARIA |

### **🦣 ORGANISMS** *(8 files)* - Complete page sections
| **File** | **What It Does** | **Contains** |
|----------|------------------|--------------|
| `NavigationHeader.vue` | Top navigation bar | Logo + menu + theme toggle |
| `HeroSection.vue` | Main hero area | Badge + heading + CTAs |
| `FeatureCards.vue` | Features showcase | Grid of FeatureCard components |
| `ProcessSteps.vue` | Workflow explanation | 6 ProcessStep components |
| `TestimonialsSection.vue` | Customer testimonials | 3 TestimonialCard components |
| `PricingSection.vue` | Pricing tiers | 4 PricingCard components |
| `CTASection.vue` | Final call-to-action | Badge + heading + buttons |
| `FooterSection.vue` | Site footer | Links + newsletter + social |

### **🎭 SPECIAL FEATURES** *(4 files)* - Visual effects & advanced components
| **File** | **What It Does** | **Purpose** |
|----------|------------------|-------------|
| `FireflyEffect.vue` | 142 animated firefly particles | Atmospheric background animation |
| `BackgroundOrbs.vue` | Floating gradient orbs system | Dynamic background elements |
| `ThemeToggle.vue` | 14-theme selection component | Advanced theme switching UI |
| `NavigationDropdown.vue` | Authentication dropdown menu | User menu with 4 sections |

### **🎨 GLOBAL CSS SYSTEMS** *(4 files)* - Advanced styling systems
| **File** | **What It Does** | **Purpose** |
|----------|------------------|-------------|
| `mathematical-spacing.css` | Golden Ratio + Friendship spacing | 373 lines of custom spacing |
| `theme-system.css` | 14 themes with 490+ variables | Complete theming system |
| `visual-effects.css` | Atmospheric + hover effects | 350+ lines of effects |
| `paper-texture.css` | Background texture system | Paper-like texture integration |

### **🧠 LOGIC & UTILITIES** *(4 files)* - Behind-the-scenes functionality
| **File** | **What It Does** | **Purpose** |
|----------|------------------|-------------|
| `useTheme.ts` | Theme switching logic | Light/dark mode toggle |
| `useNavigation.ts` | Navigation helpers | Smooth scroll, menu actions |
| `useNewsletter.ts` | Newsletter signup logic | Email validation, submission |
| `data.ts` | Content data | Pricing info, testimonials, features |

### **📄 PAGES** *(1 file)* - The actual webpage
| **File** | **What It Does** | **Contains** |
|----------|------------------|--------------|
| `index.vue` | Complete landing page | All 8 organisms assembled |

---

## **📁 FOLDER STRUCTURE WALKTHROUGH**

### **Current Project State:**
```
FABLECRAFT NUXT BUILD/
├── ✅ pages/index.vue          # EXISTS - basic page
├── ✅ assets/css/main.css      # EXISTS - minimal CSS
├── ✅ nuxt.config.ts           # EXISTS - configured
└── ✅ Other config files       # EXISTS - working setup
```

### **What We Need to Create:**

#### **Step 1: Create Main Component Folders**
```
FABLECRAFT NUXT BUILD/
├── components/                 # 🔲 CREATE THIS FOLDER
│   ├── atoms/                 # 🔲 CREATE THIS FOLDER
│   ├── molecules/             # 🔲 CREATE THIS FOLDER
│   └── organisms/             # 🔲 CREATE THIS FOLDER
```

#### **Step 2: Create Additional Component & System Folders**
```
FABLECRAFT NUXT BUILD/
├── components/
│   └── effects/               # 🔲 CREATE THIS FOLDER
├── assets/css/                # ✅ EXISTS - will enhance with more files
├── composables/               # 🔲 CREATE THIS FOLDER (may exist)
└── constants/                 # 🔲 CREATE THIS FOLDER
```

#### **Step 3: Create Atom Components**
```
components/atoms/
├── 🔲 Button.vue              # CREATE - Universal button component
├── 🔲 Badge.vue               # CREATE - Status badges with variants
├── 🔲 Card.vue                # CREATE - Base card container
├── 🔲 Icon.vue                # CREATE - Lucide icon wrapper
├── 🔲 Input.vue               # CREATE - Form input component
└── 🔲 Utils.ts                # CREATE - Helper functions (cn, formatters)
```

#### **Step 4: Create Molecule Components**
```
components/molecules/
├── 🔲 BadgeWithDot.vue        # CREATE - Animated badge with pulse dot
├── 🔲 FeatureCard.vue         # CREATE - Feature display card
├── 🔲 TestimonialCard.vue     # CREATE - Customer testimonial
├── 🔲 PricingCard.vue         # CREATE - Pricing tier display
├── 🔲 ProcessStepCard.vue     # CREATE - Numbered workflow step
└── 🔲 SocialLinks.vue         # CREATE - Social media icons grid
```

#### **Step 5: Create Organism Components**
```
components/organisms/
├── 🔲 NavigationHeader.vue    # CREATE - Site navigation
├── 🔲 HeroSection.vue         # CREATE - Main hero area
├── 🔲 FeatureCards.vue        # CREATE - Features section
├── 🔲 ProcessSteps.vue        # CREATE - Process workflow
├── 🔲 TestimonialsSection.vue # CREATE - Testimonials section
├── 🔲 PricingSection.vue      # CREATE - Pricing section
├── 🔲 CTASection.vue          # CREATE - Call-to-action section
└── 🔲 FooterSection.vue       # CREATE - Site footer
```

#### **Step 6: Create Special Features**
```
components/effects/
├── 🔲 FireflyEffect.vue       # CREATE - 142 animated firefly particles
├── 🔲 BackgroundOrbs.vue      # CREATE - Floating gradient orbs
├── 🔲 ThemeToggle.vue         # CREATE - 14-theme selection component
└── 🔲 NavigationDropdown.vue  # CREATE - Authentication dropdown menu
```

#### **Step 7: Create Global CSS Systems**
```
assets/css/
├── ✅ main.css                # ENHANCE - Basic setup exists
├── 🔲 mathematical-spacing.css # CREATE - Golden Ratio + Friendship spacing
├── 🔲 theme-system.css        # CREATE - 14 themes with 490+ variables
├── 🔲 visual-effects.css      # CREATE - Atmospheric + hover effects
└── 🔲 paper-texture.css       # CREATE - Background texture system
```

#### **Step 8: Create Logic & Utility Files**
```
composables/
├── 🔲 useTheme.ts             # CREATE - Theme switching logic
├── 🔲 useNavigation.ts        # CREATE - Navigation helpers
└── 🔲 useNewsletter.ts        # CREATE - Newsletter signup logic

constants/
└── 🔲 data.ts                 # CREATE - Content data
```

#### **Step 9: Enhance Existing Page**
```
pages/
└── ✅ index.vue               # ENHANCE - Add all organisms + special features
```

---

## **🎯 BUILD ORDER RECOMMENDATION**

### **Phase 1: Foundation** *(Create structure)*
1. Create all folder directories (components, effects, assets, composables, constants)
2. Create all empty .vue, .ts, and .css files
3. Install dependencies (`lucide-vue-next`, `clsx`, `tailwind-merge`)
4. Verify structure is correct

### **Phase 2: Atoms & Utilities** *(Build building blocks)*
1. Start with `Utils.ts` (needed by everything)
2. Build `Button.vue` (used everywhere)
3. Build `Icon.vue` (used everywhere)
4. Build `Card.vue`, `Badge.vue`, `Input.vue`

### **Phase 3: Molecules** *(Combine atoms)*
1. Build `BadgeWithDot.vue`, `SocialLinks.vue`
2. Build content molecules (`FeatureCard.vue`, `TestimonialCard.vue`)
3. Build interactive molecules (`PricingCard.vue`, `ProcessStepCard.vue`)
4. Test each molecule as you build it

### **Phase 4: Global CSS Systems** *(Styling foundation)*
1. Build `mathematical-spacing.css` (Golden Ratio + Friendship spacing)
2. Build `theme-system.css` (14 themes with 490+ variables)
3. Build `visual-effects.css` (atmospheric + hover effects)
4. Build `paper-texture.css` (background texture system)

### **Phase 5: Organisms** *(Complete sections)*
1. Start with `HeroSection.vue` (most visible)
2. Build `NavigationHeader.vue`, `FooterSection.vue`
3. Build content sections (`FeatureCards.vue`, `TestimonialsSection.vue`)
4. Build interactive sections (`PricingSection.vue`, `CTASection.vue`, `ProcessSteps.vue`)

### **Phase 6: Special Features** *(Advanced effects)*
1. Build `ThemeToggle.vue` (14-theme selection)
2. Build `NavigationDropdown.vue` (authentication dropdown)
3. Build `FireflyEffect.vue` (142 animated particles)
4. Build `BackgroundOrbs.vue` (floating gradient orbs)

### **Phase 7: Logic & Assembly** *(Put it all together)*
1. Build composables (`useTheme.ts`, `useNavigation.ts`, `useNewsletter.ts`)
2. Add content data (`data.ts`)
3. Update `pages/index.vue` to use all organisms + special features
4. Final testing and polish

---

## **📈 PROJECT TOTALS**

| **Category** | **File Count** | **Status** |
|--------------|---------------:|------------|
| **Atoms** | 6 files | 🔲 To create |
| **Molecules** | 6 files | 🔲 To create |
| **Organisms** | 8 files | 🔲 To create |
| **Special Features** | 4 files | 🔲 To create |
| **Global CSS Systems** | 4 files | 🔲 To create (1 exists, needs enhancement) |
| **Logic & Utilities** | 4 files | 🔲 To create |
| **Pages** | 1 file | ✅ Exists (needs enhancement) |

**TOTAL NEW FILES TO CREATE: 32 files**

**EXISTING FILES TO ENHANCE: 2 files** (index.vue + main.css)

---

## **✅ READY TO BEGIN**

This plan provides:
- ✅ Complete file inventory
- ✅ Clear folder structure
- ✅ Logical build order
- ✅ No code confusion - just organization

**Next step:** Create the folder structure and empty files, then start building components one by one.