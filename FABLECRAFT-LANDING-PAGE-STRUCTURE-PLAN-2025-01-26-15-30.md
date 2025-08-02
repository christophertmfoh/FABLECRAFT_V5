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

### **🔬 ATOMS** *(5 files)* - Basic building blocks
| **File** | **What It Does** | **Used In** |
|----------|------------------|-------------|
| `Button.vue` | CTA buttons, navigation buttons | ALL 8 sections |
| `Badge.vue` | Status badges, "Popular" tags, pulse animations | 5 sections |
| `Card.vue` | Base wrapper for content containers | 7 sections |
| `Icon.vue` | All Lucide icons (stars, arrows, zap, etc.) | ALL sections |
| `Input.vue` | Form inputs for newsletter signup | Footer section |

### **🧪 MOLECULES** *(4 files)* - Simple combinations
| **File** | **What It Does** | **Combines** |
|----------|------------------|--------------|
| `FeatureCard.vue` | Individual feature with icon + description | Icon + Card + text |
| `TestimonialCard.vue` | Customer quote with rating stars | Card + Icon + text |
| `PricingCard.vue` | Pricing tier with features list | Card + Button + Badge |
| `ProcessStep.vue` | Individual workflow step | Icon + text + numbering |

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

### **🧠 LOGIC & UTILITIES** *(4 files)* - Behind-the-scenes functionality
| **File** | **What It Does** | **Purpose** |
|----------|------------------|-------------|
| `useTheme.ts` | Theme switching logic | Light/dark mode toggle |
| `useNavigation.ts` | Navigation helpers | Smooth scroll, menu actions |
| `utils.ts` | Helper functions | CSS class merging, formatters |
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

#### **Step 2: Create Logic & Utility Folders**
```
FABLECRAFT NUXT BUILD/
├── lib/                       # 🔲 CREATE THIS FOLDER
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
└── 🔲 Input.vue               # CREATE - Form input component
```

#### **Step 4: Create Molecule Components**
```
components/molecules/
├── 🔲 FeatureCard.vue         # CREATE - Feature display card
├── 🔲 TestimonialCard.vue     # CREATE - Customer testimonial
├── 🔲 PricingCard.vue         # CREATE - Pricing tier display
└── 🔲 ProcessStep.vue         # CREATE - Workflow step item
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

#### **Step 6: Create Logic & Utility Files**
```
lib/
└── 🔲 utils.ts                # CREATE - Helper functions

composables/
├── 🔲 useTheme.ts             # CREATE - Theme switching logic
└── 🔲 useNavigation.ts        # CREATE - Navigation helpers

constants/
└── 🔲 data.ts                 # CREATE - Content data
```

#### **Step 7: Enhance Existing Page**
```
pages/
└── ✅ index.vue               # ENHANCE - Add all organisms
```

---

## **🎯 BUILD ORDER RECOMMENDATION**

### **Phase 1: Foundation** *(Create structure)*
1. Create all folder directories
2. Create all empty .vue and .ts files
3. Verify structure is correct

### **Phase 2: Atoms** *(Build building blocks)*
1. Start with `Button.vue` (used everywhere)
2. Build `Icon.vue` (used everywhere)
3. Build `Card.vue` (base for many components)
4. Build `Badge.vue` and `Input.vue`

### **Phase 3: Molecules** *(Combine atoms)*
1. Build molecules one by one
2. Test each molecule as you build it
3. Verify they work with the atoms

### **Phase 4: Organisms** *(Complete sections)*
1. Start with `HeroSection.vue` (most visible)
2. Build sections one by one
3. Test each section in isolation

### **Phase 5: Assembly** *(Put it all together)*
1. Update `pages/index.vue` to use all organisms
2. Add logic files (`useTheme.ts`, etc.)
3. Add content data (`data.ts`)
4. Final testing and polish

---

## **📈 PROJECT TOTALS**

| **Category** | **File Count** | **Status** |
|--------------|---------------:|------------|
| **Atoms** | 5 files | 🔲 To create |
| **Molecules** | 4 files | 🔲 To create |
| **Organisms** | 8 files | 🔲 To create |
| **Logic** | 4 files | 🔲 To create |
| **Pages** | 1 file | ✅ Exists (needs enhancement) |

**TOTAL NEW FILES TO CREATE: 21 files**

**EXISTING FILES TO ENHANCE: 1 file**

---

## **✅ READY TO BEGIN**

This plan provides:
- ✅ Complete file inventory
- ✅ Clear folder structure
- ✅ Logical build order
- ✅ No code confusion - just organization

**Next step:** Create the folder structure and empty files, then start building components one by one.