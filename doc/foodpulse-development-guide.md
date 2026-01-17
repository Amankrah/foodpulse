# FoodPulse — Website Development Guide

## Complete Technical, Design & SEO Documentation for Next.js Implementation

**Version:** 2.0  
**Last Updated:** January 2025  
**Target Launch:** Q1 2025  
**Domain:** foodpulse.co

---

# Table of Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Design System](#2-design-system)
3. [Site Architecture](#3-site-architecture)
4. [SEO Strategy](#4-seo-strategy)
5. [Page Specifications](#5-page-specifications)
6. [Component Library](#6-component-library)
7. [Animation System](#7-animation-system)
8. [Technical Implementation](#8-technical-implementation)
9. [Content & Copy Guide](#9-content--copy-guide)
10. [Launch Checklist](#10-launch-checklist)

---

# 1. Brand Foundation

## 1.1 Brand Identity

### Name
**FoodPulse**

### Tagline Options (A/B test)
- Primary: "Your Hub for All Things Food"
- Alternative 1: "Empowering Smarter Food Choices"
- Alternative 2: "Where Food Knowledge Meets Action"
- Alternative 3: "The Pulse of Food Intelligence"

### Mission Statement
To democratize food knowledge and empower consumers with evidence-based insights about nutrition, food systems, and healthy eating—making complex food science accessible, actionable, and engaging for everyone.

### Vision Statement
A world where every consumer has the knowledge and tools to make informed food choices that benefit their health, their community, and the planet.

### Brand Personality
| Attribute | Expression |
|-----------|------------|
| **Educational** | We inform without lecturing, making complex topics digestible |
| **Trustworthy** | We cite sources, acknowledge nuance, avoid sensationalism |
| **Approachable** | We use friendly language, not academic jargon |
| **Empowering** | We give readers agency over their food decisions |
| **Holistic** | We connect personal nutrition to broader food systems |
| **Fresh** | Our design and content feel vibrant, alive, organic |

### Brand Voice Guidelines

**Do:**
- Use "you" and "we" conversationally
- Explain scientific concepts in plain language
- Provide practical, actionable takeaways
- Acknowledge that nutrition science evolves
- Celebrate diverse food cultures and traditions
- Connect individual choices to systemic impacts

**Don't:**
- Use fear-mongering or alarmist language
- Promote fad diets or quick fixes
- Shame eating habits or food choices
- Oversimplify complex nutrition science
- Ignore food accessibility and equity issues
- Make absolute claims without evidence

### Brand Promise
"Every article, resource, and guide on FoodPulse is designed to help you understand food better—from the farm to your fork to your wellbeing."

## 1.2 Value Propositions by Audience

### For Health-Conscious Consumers (Primary)
**Headline:** "Make Smarter Food Choices—Without the Confusion"
**Subhead:** "Evidence-based nutrition guidance that cuts through the noise of fad diets and clickbait headlines."
**Key Messages:**
- Science-backed, not sensationalized
- Practical tips you can apply today
- Understand what's really in your food
- No judgment, just information

### For Food System Enthusiasts
**Headline:** "Understand the Journey from Farm to Fork"
**Subhead:** "Deep dives into food production, sustainability, supply chains, and the systems that shape what we eat."
**Key Messages:**
- See the bigger picture of food
- Learn about sustainable food systems
- Understand food policy and its impacts
- Connect your choices to global outcomes

### For Wellness Seekers
**Headline:** "Food as the Foundation of Wellbeing"
**Subhead:** "Explore the connection between what you eat and how you feel—body, mind, and beyond."
**Key Messages:**
- Nutrition for energy and vitality
- Food's role in mental health
- Gut health and the microbiome
- Long-term health through daily choices

### For Culinary Explorers
**Headline:** "Recipes That Nourish and Delight"
**Subhead:** "Delicious, nutritious recipes backed by the science of healthy eating."
**Key Messages:**
- Taste and health aren't trade-offs
- Learn the 'why' behind recipes
- Seasonal and sustainable cooking
- Cultural food traditions celebrated

## 1.3 Content Pillars

### Pillar 1: Food & Wellbeing
Focus: Nutrition science, dietary patterns, health impacts
Topics: Macronutrients, micronutrients, disease prevention, energy, mental health

### Pillar 2: Smart Food Choices
Focus: Consumer decision-making, label reading, food quality
Topics: Food labels, additives, organic vs. conventional, budgeting

### Pillar 3: Food System Insights
Focus: Production, distribution, sustainability, policy
Topics: Agriculture, supply chains, food waste, climate impact, food justice

### Pillar 4: Practical Food Tips
Focus: Actionable guidance for daily life
Topics: Meal prep, storage, shopping, eating out, seasonal eating

### Pillar 5: Recipes
Focus: Nutritious, delicious, accessible recipes
Topics: Quick meals, batch cooking, special diets, cultural cuisines

---

# 2. Design System

## 2.1 Design Philosophy

### Aesthetic Direction: **Organic Editorial**
FoodPulse combines the sophistication of editorial design with the warmth and vitality of organic, natural aesthetics. The design should feel:
- **Fresh and alive** — like produce from a farmer's market
- **Clean but warm** — not sterile or clinical
- **Trustworthy** — like a well-edited magazine
- **Inviting** — encouraging exploration and learning

### Key Design Principles
1. **Rooted in Nature** — Colors, textures, and imagery evoke growth, earth, and freshness
2. **Editorial Clarity** — Strong typography hierarchy for readability and scanning
3. **Generous Breathing Room** — Whitespace (or "greenspace") lets content shine
4. **Subtle Organic Touches** — Soft curves, natural textures, gentle animations
5. **Photography-Forward** — High-quality food imagery as a design element

## 2.2 Color Palette

### Primary Colors
```css
:root {
  /* Deep Green - Trust, Nature, Authority (Primary Brand Color) */
  --green-900: #001a0d;    /* Darkest - footer, emphasis */
  --green-800: #002614;    /* Dark accents */
  --green-700: #003317;    /* PRIMARY - Headers, buttons, key UI */
  --green-600: #004d23;    /* Hover states */
  --green-500: #006630;    /* Interactive elements */
  --green-400: #00803d;    /* Links */
  --green-300: #00994a;    /* Success states */
  --green-200: #33cc73;    /* Highlights */
  --green-100: #99e6b3;    /* Light accents */
  --green-50: #e1ffed;     /* LIGHT GREEN - Backgrounds, cards */

  /* Earth Brown - Warmth, Organic, Grounding */
  --brown-700: #8b6914;    /* Dark brown */
  --brown-600: #a67c1a;    /* Medium brown */
  --brown-500: #dda96b;    /* PRIMARY BROWN - Accents, CTAs, warmth */
  --brown-400: #e6be8a;    /* Light brown */
  --brown-300: #f0d4a9;    /* Lighter */
  --brown-200: #f5e2c4;    /* Very light */
  --brown-100: #faf1e0;    /* Near white */
  --brown-50: #fdf8f0;     /* Warm white */

  /* Accent - Fresh Green (Energy, Growth, Call-to-Action) */
  --accent-600: #059669;   /* Emerald for emphasis */
  --accent-500: #10b981;   /* Fresh green CTAs */
  --accent-400: #34d399;   /* Hover states */
  --accent-100: #d1fae5;   /* Light backgrounds */
}
```

### Neutral Colors
```css
:root {
  /* Warm Neutrals (slightly warm undertone to complement green/brown) */
  --neutral-900: #1c1917;  /* Near black - body text */
  --neutral-800: #292524;  /* Headings */
  --neutral-700: #44403c;  /* Secondary text */
  --neutral-600: #57534e;  /* Muted text */
  --neutral-500: #78716c;  /* Placeholder text */
  --neutral-400: #a8a29e;  /* Borders, icons */
  --neutral-300: #d6d3d1;  /* Light borders */
  --neutral-200: #e7e5e4;  /* Dividers */
  --neutral-100: #f5f5f4;  /* Light backgrounds */
  --neutral-50: #fafaf9;   /* Page background */
  --white: #ffffff;

  /* Alternative: Cool neutrals for contrast sections */
  --slate-900: #0f172a;
  --slate-100: #f1f5f9;
  --slate-50: #f8fafc;
}
```

### Semantic Colors
```css
:root {
  /* Success - uses brand green */
  --success-600: #059669;
  --success-500: #10b981;
  --success-100: #d1fae5;
  
  /* Warning - uses brand brown/amber */
  --warning-600: #d97706;
  --warning-500: #f59e0b;
  --warning-100: #fef3c7;
  
  /* Error */
  --error-600: #dc2626;
  --error-500: #ef4444;
  --error-100: #fee2e2;
  
  /* Info */
  --info-600: #0284c7;
  --info-500: #0ea5e9;
  --info-100: #e0f2fe;
}
```

### Color Usage Matrix
| Element | Color Variable | Hex Value | Notes |
|---------|----------------|-----------|-------|
| Primary CTA buttons | `--green-700` | #003317 | White text |
| Secondary CTA buttons | `--brown-500` | #dda96b | Dark text |
| Header background | `--green-700` or transparent | #003317 | Depends on scroll |
| Header text | `--white` or `--green-700` | - | Contrast with bg |
| Hero overlay | `--green-700` at 40-60% opacity | - | Over hero image |
| Section bg (alt 1) | `--white` | #ffffff | Primary sections |
| Section bg (alt 2) | `--green-50` | #e1ffed | Light green sections |
| Section bg (alt 3) | `--brown-50` | #fdf8f0 | Warm sections |
| Section bg (dark) | `--green-700` or `--green-800` | #003317 | Footer, CTAs |
| Body text | `--neutral-800` | #292524 | Primary reading |
| Secondary text | `--neutral-600` | #57534e | Captions, meta |
| Links | `--green-600` | #004d23 | Underline on hover |
| Card backgrounds | `--white` | #ffffff | With subtle shadow |
| Card hover | `--green-50` | #e1ffed | Background shift |
| Tags/badges | `--green-50` bg, `--green-700` text | - | Category labels |
| Highlight/featured | `--brown-500` | #dda96b | Sparingly |

### Gradient Definitions
```css
:root {
  /* Hero overlay gradient */
  --gradient-hero: linear-gradient(
    to bottom,
    rgba(0, 51, 23, 0.7) 0%,
    rgba(0, 51, 23, 0.5) 50%,
    rgba(0, 51, 23, 0.7) 100%
  );
  
  /* Alternative hero gradient */
  --gradient-hero-alt: linear-gradient(
    135deg,
    rgba(0, 51, 23, 0.8) 0%,
    rgba(0, 51, 23, 0.4) 100%
  );
  
  /* Section accent gradient */
  --gradient-accent: linear-gradient(
    135deg,
    var(--green-50) 0%,
    var(--brown-50) 100%
  );
  
  /* CTA gradient (for special buttons) */
  --gradient-cta: linear-gradient(
    135deg,
    var(--brown-500) 0%,
    var(--brown-400) 100%
  );
}
```

## 2.3 Typography

### Font Stack
```css
:root {
  /* Display Font - For headlines, hero text */
  /* Playfair Display: Elegant serif with organic feel */
  --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  
  /* Primary Font - For body text, UI elements */
  /* Source Sans 3: Highly readable, professional, warm */
  --font-sans: 'Source Sans 3', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* Alternative body font option */
  /* Nunito: Rounded, friendly, approachable */
  --font-friendly: 'Nunito', 'Nunito Sans', sans-serif;
  
  /* Monospace - For data, nutrition facts */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

### Font Loading (Next.js)
```tsx
// app/layout.tsx
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});
```

### Type Scale
```css
:root {
  /* Modular scale: 1.25 (Major Third) */
  --text-xs: 0.75rem;      /* 12px - Labels, captions, metadata */
  --text-sm: 0.875rem;     /* 14px - Small text, tags */
  --text-base: 1rem;       /* 16px - Body text */
  --text-lg: 1.125rem;     /* 18px - Lead paragraphs */
  --text-xl: 1.25rem;      /* 20px - Card titles, large body */
  --text-2xl: 1.5rem;      /* 24px - H4, section subtitles */
  --text-3xl: 1.875rem;    /* 30px - H3 */
  --text-4xl: 2.25rem;     /* 36px - H2 */
  --text-5xl: 3rem;        /* 48px - H1 */
  --text-6xl: 3.75rem;     /* 60px - Hero (mobile) */
  --text-7xl: 4.5rem;      /* 72px - Hero (tablet) */
  --text-8xl: 6rem;        /* 96px - Hero (desktop) */
}
```

### Typography Styles
```css
/* Hero Headline - Playfair Display */
.hero-headline {
  font-family: var(--font-display);
  font-size: var(--text-6xl);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@media (min-width: 768px) {
  .hero-headline {
    font-size: var(--text-7xl);
  }
}

@media (min-width: 1024px) {
  .hero-headline {
    font-size: var(--text-8xl);
  }
}

/* Section Headline */
.section-headline {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--green-700);
}

@media (min-width: 768px) {
  .section-headline {
    font-size: var(--text-4xl);
  }
}

/* Article Title */
.article-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.3;
  color: var(--neutral-800);
}

@media (min-width: 768px) {
  .article-title {
    font-size: var(--text-3xl);
  }
}

/* Body Text */
.body-text {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.75;
  color: var(--neutral-700);
}

/* Lead Text (intro paragraphs) */
.lead-text {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: 1.7;
  color: var(--neutral-600);
}

@media (min-width: 768px) {
  .lead-text {
    font-size: var(--text-xl);
  }
}

/* Eyebrow/Overline */
.eyebrow {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brown-500);
}

/* Card Title */
.card-title {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: 1.4;
  color: var(--neutral-800);
}

/* Navigation Link */
.nav-link {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 500;
  letter-spacing: 0.01em;
  color: inherit;
}

/* Button Text */
.button-text {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 600;
  letter-spacing: 0.02em;
}

/* Caption/Meta */
.caption {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--neutral-500);
}

/* Nutrition Facts (tabular data) */
.nutrition-data {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: 0;
}
```

## 2.4 Spacing System

### Base Unit: 4px
Using a 4px base grid for consistent spacing.

```css
:root {
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 0.125rem;  /* 2px */
  --space-1: 0.25rem;     /* 4px */
  --space-1-5: 0.375rem;  /* 6px */
  --space-2: 0.5rem;      /* 8px */
  --space-2-5: 0.625rem;  /* 10px */
  --space-3: 0.75rem;     /* 12px */
  --space-3-5: 0.875rem;  /* 14px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-7: 1.75rem;     /* 28px */
  --space-8: 2rem;        /* 32px */
  --space-9: 2.25rem;     /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-11: 2.75rem;    /* 44px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-28: 7rem;       /* 112px */
  --space-32: 8rem;       /* 128px */
  --space-36: 9rem;       /* 144px */
  --space-40: 10rem;      /* 160px */
}
```

### Component Spacing Reference
| Element | Mobile | Desktop | Tailwind |
|---------|--------|---------|----------|
| Section padding (Y) | 64px | 96px-128px | `py-16 lg:py-24 xl:py-32` |
| Section padding (X) | 16px | 32px | `px-4 lg:px-8` |
| Content max-width | - | 1280px | `max-w-7xl` |
| Container padding | 16px | 24px-32px | `px-4 lg:px-6 xl:px-8` |
| Between sections | 0 | 0 | Full-bleed sections |
| Between major blocks | 48px | 64px | `space-y-12 lg:space-y-16` |
| Between components | 32px | 48px | `space-y-8 lg:space-y-12` |
| Card padding | 20px | 24px | `p-5 lg:p-6` |
| Card gap (grid) | 16px | 24px | `gap-4 lg:gap-6` |
| Button padding | 12px 24px | 16px 32px | `px-6 py-3 lg:px-8 lg:py-4` |
| Input padding | 12px 16px | 12px 16px | `px-4 py-3` |
| Nav item spacing | 16px | 24px | `space-x-4 lg:space-x-6` |

## 2.5 Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;    /* 4px - Tags, small elements */
  --radius-md: 0.5rem;     /* 8px - Buttons, inputs */
  --radius-lg: 0.75rem;    /* 12px - Cards, small images */
  --radius-xl: 1rem;       /* 16px - Large cards */
  --radius-2xl: 1.5rem;    /* 24px - Hero elements, modals */
  --radius-3xl: 2rem;      /* 32px - Feature sections */
  --radius-full: 9999px;   /* Pills, avatars, circular elements */
}
```

### Border Radius Usage
| Element | Radius | Notes |
|---------|--------|-------|
| Buttons | `radius-md` (8px) | Slightly rounded, approachable |
| Input fields | `radius-md` (8px) | Match buttons |
| Cards | `radius-xl` (16px) | Soft, organic feel |
| Images in cards | `radius-lg` (12px) | Slightly less than card |
| Tags/badges | `radius-full` | Pill shape |
| Hero images | `radius-2xl` to `radius-3xl` | Large, soft corners |
| Modal/dialog | `radius-2xl` (24px) | Prominent element |
| Avatar | `radius-full` | Circular |
| Dropdown | `radius-lg` (12px) | Medium prominence |

## 2.6 Shadows

```css
:root {
  /* Subtle shadows - for cards, elevated elements */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* Colored shadows - for buttons, interactive elements */
  --shadow-green: 0 4px 14px 0 rgba(0, 51, 23, 0.25);
  --shadow-green-lg: 0 10px 25px 0 rgba(0, 51, 23, 0.3);
  --shadow-brown: 0 4px 14px 0 rgba(221, 169, 107, 0.35);
  
  /* Inner shadow - for inputs, inset elements */
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Shadow Usage
| Element | Shadow | Hover Shadow |
|---------|--------|--------------|
| Cards (default) | `shadow-sm` | `shadow-md` |
| Cards (featured) | `shadow-md` | `shadow-lg` |
| Buttons (primary) | `shadow-green` | `shadow-green-lg` |
| Buttons (secondary) | `shadow-sm` | `shadow-md` |
| Dropdown menus | `shadow-lg` | - |
| Modal/dialog | `shadow-2xl` | - |
| Sticky header | `shadow-md` | - |
| Image hover | - | `shadow-xl` |
| Input focus | - | `shadow-green` |

## 2.7 Imagery Guidelines

### Photography Style
- **Authentic over stock** — Real food, real preparation, real people when possible
- **Fresh and vibrant** — Well-lit, appetizing, colorful
- **Environmental context** — Show food in natural settings (farms, markets, kitchens)
- **Diverse representation** — Various cuisines, cooking styles, and people
- **Process-oriented** — Show food being grown, prepared, enjoyed

### Image Treatment
```css
/* Card images */
.card-image {
  border-radius: var(--radius-lg);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image {
  transform: scale(1.03);
}

/* Hero background */
.hero-bg {
  object-fit: cover;
  object-position: center;
  filter: brightness(0.85);
}

/* Overlay for text readability */
.hero-overlay {
  background: var(--gradient-hero);
}
```

### Image Formats & Sizes
| Context | Format | Max Width | Quality |
|---------|--------|-----------|---------|
| Hero background | WebP/AVIF | 2400px | 80% |
| Article featured | WebP/AVIF | 1200px | 85% |
| Card thumbnail | WebP/AVIF | 600px | 85% |
| Recipe images | WebP/AVIF | 800px | 85% |
| Icons/logos | SVG | - | Vector |
| OG images | JPG | 1200x630px | 90% |

---

# 3. Site Architecture

## 3.1 Information Architecture

```
foodpulse.co
│
├── / (Homepage)
│   └── Hero, Featured Articles, Categories, Latest Posts, Newsletter, About Preview
│
├── /articles (Main Content Hub)
│   ├── /articles/food-wellbeing
│   │   └── /articles/food-wellbeing/[slug]
│   ├── /articles/smart-food-choices
│   │   └── /articles/smart-food-choices/[slug]
│   ├── /articles/food-system-insights
│   │   └── /articles/food-system-insights/[slug]
│   ├── /articles/practical-food-tips
│   │   └── /articles/practical-food-tips/[slug]
│   └── /articles/recipes
│       └── /articles/recipes/[slug]
│
├── /resources
│   ├── /resources/guides (In-depth downloadable guides)
│   │   └── /resources/guides/[slug]
│   ├── /resources/tools (Calculators, meal planners, etc.)
│   │   └── /resources/tools/[slug]
│   ├── /resources/glossary (Food & nutrition terms)
│   └── /resources/faq
│
├── /about
│   ├── /about (Main about page)
│   ├── /about/our-mission
│   ├── /about/our-team
│   └── /about/editorial-guidelines
│
├── /coaching (If offering services)
│   ├── /coaching (Overview)
│   └── /coaching/book
│
├── /newsletter
│   └── Newsletter signup landing page
│
├── /search
│   └── Site-wide search results
│
├── /contact
│
└── /legal
    ├── /legal/privacy-policy
    ├── /legal/terms-of-use
    └── /legal/cookie-policy
```

## 3.2 URL Structure

### URL Rules
1. All lowercase
2. Hyphens for word separation
3. Category included in article URLs for SEO
4. Short but descriptive
5. No dates in URLs (evergreen content)
6. Canonical URLs set on all pages

### URL Examples
```
✓ /articles/food-wellbeing/gut-health-beginners-guide
✓ /articles/smart-food-choices/reading-nutrition-labels
✓ /articles/food-system-insights/sustainable-agriculture-explained
✓ /resources/guides/meal-prep-for-busy-families
✓ /articles/recipes/mediterranean-quinoa-bowl

✗ /articles/2025/01/gut-health-guide
✗ /food_wellbeing/gut-health
✗ /articles/article-123
✗ /blog/my-first-post
```

## 3.3 Navigation Structure

### Primary Navigation (Header)
```
Logo | Home | Articles ▼ | Resources ▼ | About | Coaching | [Newsletter Button]
```

**Articles Dropdown:**
```
Food & Wellbeing          Smart Food Choices
Gut health, nutrition,    Label reading, food quality,
disease prevention        shopping guides

Food System Insights      Practical Food Tips
Sustainability, policy,   Meal prep, storage,
supply chains             seasonal eating

Recipes
Healthy, delicious meals
for every occasion

[View All Articles →]
```

**Resources Dropdown:**
```
Guides                    Tools
In-depth resources        Calculators & planners
on key topics

Glossary                  FAQ
Food & nutrition terms    Common questions answered

[Explore All Resources →]
```

### Mobile Navigation
```
[Hamburger] Logo [Newsletter]

Slide-out menu:
├── Home
├── Articles
│   ├── Food & Wellbeing
│   ├── Smart Food Choices
│   ├── Food System Insights
│   ├── Practical Food Tips
│   └── Recipes
├── Resources
│   ├── Guides
│   ├── Tools
│   ├── Glossary
│   └── FAQ
├── About
├── Coaching
├── Contact
└── [Newsletter Sign Up]
```

### Footer Navigation
```
Column 1: Explore          Column 2: Categories        Column 3: Company         Column 4: Connect
- Home                     - Food & Wellbeing         - About Us                - Newsletter
- All Articles             - Smart Food Choices       - Our Mission             - Contact
- Resources                - Food System Insights     - Our Team                - Instagram
- Search                   - Practical Food Tips      - Editorial Guidelines    - Pinterest
                           - Recipes                  - Careers                 - YouTube

Bottom Row:
© 2025 FoodPulse | Privacy Policy | Terms of Use | Cookie Policy | Made with 🥗 for better food choices
```

---

# 4. SEO Strategy

## 4.1 SEO Goals & Positioning

### Primary Goal
Rank #1 for food systems and consumer nutrition health education content.

### Target Audience Keywords Categories
1. **Food System Keywords** — People researching how food is produced, distributed, and its broader impacts
2. **Consumer Nutrition Keywords** — People seeking practical nutrition guidance
3. **Health Education Keywords** — People wanting to learn about food's impact on health
4. **Practical Food Keywords** — People looking for actionable food advice

## 4.2 Technical SEO

### Meta Tags Template
```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://foodpulse.co'),
  title: {
    default: 'FoodPulse | Your Hub for Food Systems, Nutrition & Healthy Eating',
    template: '%s | FoodPulse'
  },
  description: 'Evidence-based food education covering nutrition science, food systems, healthy eating, and practical tips. Make smarter food choices with science-backed guidance.',
  keywords: [
    'food systems',
    'nutrition education',
    'healthy eating',
    'food science',
    'sustainable food',
    'nutrition guide',
    'food choices',
    'consumer health',
    'food literacy',
    'nutrition facts'
  ],
  authors: [{ name: 'FoodPulse' }],
  creator: 'FoodPulse',
  publisher: 'FoodPulse',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://foodpulse.co',
    siteName: 'FoodPulse',
    title: 'FoodPulse | Your Hub for Food Systems, Nutrition & Healthy Eating',
    description: 'Evidence-based food education covering nutrition, food systems, and practical tips for healthier eating.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FoodPulse - Explore All Things Food',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodPulse | Food Systems, Nutrition & Healthy Eating',
    description: 'Evidence-based food education for smarter food choices.',
    images: ['/og-image.jpg'],
    creator: '@foodpulse',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://foodpulse.co',
  },
};
```

### Structured Data Schemas

**Organization Schema:**
```tsx
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FoodPulse",
  "url": "https://foodpulse.co",
  "logo": "https://foodpulse.co/logo.png",
  "description": "Evidence-based food education platform covering nutrition science, food systems, and healthy eating guidance.",
  "sameAs": [
    "https://instagram.com/foodpulse",
    "https://pinterest.com/foodpulse",
    "https://youtube.com/@foodpulse"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@foodpulse.co"
  }
};
```

**Website Schema:**
```tsx
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "FoodPulse",
  "url": "https://foodpulse.co",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://foodpulse.co/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};
```

**Article Schema (for blog posts):**
```tsx
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title Here",
  "description": "Article description",
  "image": "https://foodpulse.co/images/article-image.jpg",
  "author": {
    "@type": "Organization",
    "name": "FoodPulse"
  },
  "publisher": {
    "@type": "Organization",
    "name": "FoodPulse",
    "logo": {
      "@type": "ImageObject",
      "url": "https://foodpulse.co/logo.png"
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://foodpulse.co/articles/category/article-slug"
  }
};
```

**Recipe Schema (for recipe pages):**
```tsx
const recipeSchema = {
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Recipe Name",
  "description": "Recipe description",
  "image": ["https://foodpulse.co/images/recipe.jpg"],
  "author": {
    "@type": "Organization",
    "name": "FoodPulse"
  },
  "datePublished": "2025-01-15",
  "prepTime": "PT15M",
  "cookTime": "PT30M",
  "totalTime": "PT45M",
  "recipeYield": "4 servings",
  "recipeCategory": "Main Course",
  "recipeCuisine": "Mediterranean",
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "350 calories",
    "proteinContent": "25g",
    "fiberContent": "8g"
  },
  "recipeIngredient": [
    "1 cup quinoa",
    "2 cups vegetables"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "text": "Step 1 instructions"
    }
  ]
};
```

**FAQ Schema:**
```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is FoodPulse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FoodPulse is an evidence-based food education platform..."
      }
    }
  ]
};
```

### Sitemap Configuration
```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://foodpulse.co';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles/food-wellbeing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles/smart-food-choices`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles/food-system-insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles/practical-food-tips`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles/recipes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/coaching`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic article pages - fetch from CMS
  // const articles = await getArticles();
  // const articleUrls = articles.map(article => ({
  //   url: `${baseUrl}/articles/${article.category}/${article.slug}`,
  //   lastModified: new Date(article.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  return [...staticPages];
}
```

### Robots.txt
```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/search?'],
      },
    ],
    sitemap: 'https://foodpulse.co/sitemap.xml',
  };
}
```

## 4.3 Keyword Strategy

### Tier 1: Primary Keywords (Highest Priority)
| Keyword | Monthly Volume | Difficulty | Target Page |
|---------|---------------|------------|-------------|
| food systems | 8,100 | Medium | /articles/food-system-insights |
| what is a food system | 2,400 | Low | /articles/food-system-insights/what-is-a-food-system |
| sustainable food systems | 1,900 | Medium | /articles/food-system-insights/sustainable-food-systems |
| nutrition education | 5,400 | Medium | Homepage, /about |
| food literacy | 2,900 | Low | /resources |
| healthy food choices | 4,400 | Medium | /articles/smart-food-choices |
| how to read nutrition labels | 6,600 | Medium | /articles/smart-food-choices/reading-nutrition-labels |
| food and health | 9,900 | High | /articles/food-wellbeing |

### Tier 2: Secondary Keywords
| Keyword | Target Page |
|---------|-------------|
| gut health diet | /articles/food-wellbeing/gut-health |
| anti-inflammatory foods | /articles/food-wellbeing/anti-inflammatory-diet |
| organic vs conventional | /articles/smart-food-choices/organic-vs-conventional |
| food supply chain | /articles/food-system-insights/food-supply-chain |
| farm to table | /articles/food-system-insights/farm-to-table |
| food waste reduction | /articles/food-system-insights/reducing-food-waste |
| meal prep guide | /articles/practical-food-tips/meal-prep-beginners |
| seasonal eating | /articles/practical-food-tips/seasonal-eating-guide |

### Tier 3: Long-Tail Keywords (Blog Content Ideas)
```
Food Systems:
- "how does food get from farm to table"
- "why is the food system broken"
- "what is regenerative agriculture"
- "food deserts in america explained"
- "how climate change affects food production"

Nutrition Education:
- "what do nutrition labels actually mean"
- "how much protein do I really need"
- "are supplements necessary for good health"
- "what is the microbiome and why does it matter"
- "how to eat healthy on a budget"

Consumer Health:
- "healthiest cooking oils ranked"
- "processed food vs whole food difference"
- "how to meal prep for a week"
- "best foods for energy and focus"
- "foods that reduce inflammation"

Practical Tips:
- "how long does food last in the fridge"
- "how to store produce to last longer"
- "healthiest fast food options"
- "how to read ingredient lists"
- "grocery shopping tips for healthy eating"
```

### Content Gap Opportunities
Based on competitor analysis, prioritize content for:
1. Food system explainers for general consumers (not academics)
2. Practical nutrition guides that don't promote fad diets
3. Evidence-based debunking of food myths
4. Visual guides (infographics, charts) for complex topics
5. Interactive tools (calculators, quizzes)

## 4.4 On-Page SEO Checklist

### Every Page Must Have:
- [ ] Unique title tag (50-60 characters, primary keyword near start)
- [ ] Meta description with CTA (150-160 characters)
- [ ] Single H1 containing primary keyword
- [ ] Logical heading hierarchy (H1 → H2 → H3, no skipping)
- [ ] Primary keyword in first 100 words
- [ ] Secondary keywords naturally distributed
- [ ] Internal links to related content (5-8 per article)
- [ ] External links to authoritative sources (studies, .gov, .edu)
- [ ] Alt text on all images (descriptive, keyword where natural)
- [ ] Schema markup appropriate to page type
- [ ] Canonical URL set
- [ ] Open Graph and Twitter cards configured
- [ ] Table of contents for long articles (>1500 words)

### Article-Specific SEO:
- [ ] Featured image with descriptive filename and alt text
- [ ] Author byline (for E-E-A-T)
- [ ] Published and updated dates visible
- [ ] Sources/references section
- [ ] Related articles section
- [ ] Social sharing buttons
- [ ] Reading time estimate
- [ ] Category and tags

## 4.5 Content Quality Guidelines (E-E-A-T)

### Experience
- Include real-world examples and case studies
- Share practical applications of information
- Use first-person experience where appropriate

### Expertise
- Cite peer-reviewed studies and authoritative sources
- Include credentials of contributors where relevant
- Provide detailed, comprehensive coverage of topics

### Authoritativeness
- Link to and from authoritative sources
- Build topic clusters around core subjects
- Maintain consistent, accurate information

### Trustworthiness
- Clear editorial guidelines page
- Transparent about sourcing methodology
- Regular content updates and fact-checking
- Privacy policy and clear contact information

---

# 5. Page Specifications

## 5.1 Homepage

### URL
`/`

### SEO
```
Title: FoodPulse | Your Hub for Food Systems, Nutrition & Healthy Eating
Description: Explore evidence-based food education covering nutrition science, food systems, and practical healthy eating tips. Make smarter food choices with FoodPulse.
```

### Page Sections

#### 1. Hero Section
**Layout:** Full viewport height (100vh), image background with overlay
**Background:** High-quality image of fresh produce/farming with gradient overlay

**Content Structure:**
```
[Navigation - Fixed/Sticky]

[Hero Content - Centered]
[Animated Eyebrow] Your hub for all things food

[H1 - Animated typing effect]
Explore all things [rotating word]
├── healthy foods
├── food choices  
├── food systems
├── nutrition
└── wellbeing

[Subhead]
Your hub for all things food. Once it concerns you 
as a consumer, you're covered.

[Primary CTA] Explore All →
[Secondary CTA] Latest Articles ↓

[Scroll indicator - animated]
```

**Visual Specifications:**
- Background image: Fresh greens/vegetables in natural setting (like current site)
- Overlay: `--gradient-hero` (green at 50-70% opacity)
- Hero height: 100vh minimum, content centered vertically
- Text: White with subtle text shadow for readability

#### 2. Category Navigation / Quick Links
**Layout:** Horizontal scroll on mobile, grid on desktop
**Background:** `--white`

**Content:**
```
[Eyebrow] Explore Topics

[H2] What interests you today?

[Category Cards - 5 items, icon + title + short description]

🥗 Food & Wellbeing
Nutrition, gut health, disease prevention

🛒 Smart Food Choices  
Labels, quality, shopping guides

🌾 Food System Insights
Sustainability, supply chains, policy

🍳 Practical Food Tips
Meal prep, storage, seasonal eating

📖 Recipes
Healthy, delicious, easy meals

[Each card links to category page]
```

#### 3. Featured Articles
**Layout:** Large featured card + 2-3 secondary cards
**Background:** `--green-50`

**Content:**
```
[Eyebrow] Featured

[H2] Latest from FoodPulse

[Featured Article - Large]
- Large image
- Category tag
- Title
- Excerpt (2 lines)
- Read time
- Author

[Secondary Articles - Grid of 2-3]
- Thumbnail image
- Category tag
- Title
- Read time

[CTA] View All Articles →
```

#### 4. Popular Articles Carousel
**Layout:** Horizontal carousel, 3-4 visible on desktop
**Background:** `--white`

**Content:**
```
[Eyebrow] Most Popular

[H2] Reader Favorites

[Carousel of Article Cards]
Each card:
- Image
- Category
- Title
- Excerpt
- Read time

[Carousel controls: arrows + dots]

[CTA] Explore More →
```

#### 5. Food Systems Spotlight
**Layout:** Split - content left, image/graphic right
**Background:** `--brown-50`

**Content:**
```
[Eyebrow] Understanding Food Systems

[H2] See the Bigger Picture

[Paragraph]
From farm to fork, food travels through complex systems 
that affect your health, your community, and our planet. 
We break down these systems so you can make informed choices.

[3 Quick Stats/Facts]
• X% of food is wasted before reaching consumers
• The average meal travels X miles to your plate
• Food systems account for X% of global emissions

[CTA] Explore Food Systems →

[Visual: Illustrated food system diagram or high-quality photo]
```

#### 6. Newsletter Signup
**Layout:** Centered, high-contrast
**Background:** `--green-700` (dark)

**Content:**
```
[H2 - white] Get Fresh Insights Weekly

[Subhead - light green]
Join X,000+ readers who get our best articles, 
recipes, and food tips delivered every Saturday.

[Email Input + Submit Button]
Placeholder: "Enter your email"
Button: "Subscribe"

[Privacy note - small]
No spam, ever. Unsubscribe anytime. Read our privacy policy.

[Social proof if available]
"The only food newsletter I actually read." - Reader
```

#### 7. About Preview
**Layout:** Split - image left, content right
**Background:** `--white`

**Content:**
```
[Image: Team photo or mission-related image]

[Eyebrow] About FoodPulse

[H2] Food Knowledge for Everyone

[Paragraph]
We believe everyone deserves access to reliable, 
science-based food information. Our team of nutrition 
experts and food system researchers create content 
that's accurate, practical, and actually useful.

[CTA] Learn About Us →
```

#### 8. Footer
(See Navigation section)

---

## 5.2 About Page

### URL
`/about`

### SEO
```
Title: About FoodPulse | Our Mission to Democratize Food Knowledge
Description: Learn about FoodPulse's mission to provide evidence-based food education. Meet our team and discover why we're passionate about food literacy.
```

### Page Sections

#### 1. Hero Section (Shorter)
**Layout:** Half-height hero with image background
**Background:** Team/mission-related image with overlay

**Content:**
```
[H1] About FoodPulse

[Subhead]
Empowering smarter food choices through 
evidence-based education
```

#### 2. Mission Section
**Layout:** Full-width text block
**Background:** `--white`

**Content:**
```
[Eyebrow] Our Mission

[H2] Food Knowledge Should Be Free and Accessible

[Mission Statement - Large text]
We exist to bridge the gap between food science and everyday 
consumers. Too often, nutrition information is buried in academic 
journals, hidden behind paywalls, or oversimplified into clickbait.

FoodPulse translates complex food science into practical, 
actionable knowledge that helps you make better decisions about 
what you eat—without the hype, fads, or fear-mongering.

[Key Mission Points - 3 columns]

📚 Educate
Make food science accessible and understandable for everyone

🔬 Inform
Provide evidence-based information, not trendy opinions

💪 Empower
Give readers the tools to make their own informed choices
```

#### 3. What We Cover
**Layout:** Grid of content pillars
**Background:** `--green-50`

**Content:**
```
[Eyebrow] Our Focus Areas

[H2] Comprehensive Food Education

[5 Content Pillar Cards]

Food & Wellbeing
How what you eat affects how you feel. Nutrition science 
made practical for daily life.

Smart Food Choices
Navigate the grocery store with confidence. Understand 
labels, quality, and value.

Food System Insights
See the bigger picture. Understand where food comes from 
and why it matters.

Practical Food Tips
Real advice for real life. Storage, prep, and eating well 
on any schedule or budget.

Recipes
Delicious meets nutritious. Recipes backed by the science 
of healthy eating.
```

#### 4. Our Values
**Layout:** Numbered list with descriptions
**Background:** `--white`

**Content:**
```
[Eyebrow] What We Stand For

[H2] Our Guiding Principles

[Value 1]
Evidence Over Opinion
We cite our sources. Every claim is backed by peer-reviewed 
research, expert consensus, or transparent reasoning.

[Value 2]
Clarity Over Complexity
Nutrition science is complex. Our job is to make it 
understandable without dumbing it down.

[Value 3]
Empowerment Over Prescription
We give you information to make your own choices. 
We don't tell you what to eat.

[Value 4]
Nuance Over Headlines
Food and nutrition rarely have simple answers. 
We embrace the complexity.

[Value 5]
Accessibility Over Gatekeeping
Good food information should be free and available to everyone, 
regardless of background or education.
```

#### 5. Editorial Standards
**Layout:** Clean text section with sidebar
**Background:** `--neutral-50`

**Content:**
```
[Eyebrow] Our Standards

[H2] How We Create Content

[Paragraph]
Every article on FoodPulse goes through a rigorous 
editorial process:

[Process Steps]
1. Research — We review current scientific literature 
   and consult expert sources

2. Writing — Our team creates accessible, engaging content 
   that respects readers' intelligence

3. Fact-Checking — Claims are verified against primary sources

4. Review — Content is reviewed for accuracy, clarity, and bias

5. Update — We regularly revisit articles to ensure they 
   reflect current understanding

[Sidebar: Quick Facts]
• All health claims cite peer-reviewed sources
• We distinguish between established science and emerging research
• We disclose any potential conflicts of interest
• We correct errors transparently
```

#### 6. Team Section (Optional)
**Layout:** Grid of team member cards
**Background:** `--white`

**Content:**
```
[Eyebrow] Our Team

[H2] The People Behind FoodPulse

[Team Member Cards]
- Photo
- Name
- Role
- Short bio
- Credentials/expertise
```

#### 7. Contact CTA
**Layout:** Centered CTA block
**Background:** `--green-700`

**Content:**
```
[H2] Want to Get in Touch?

[Subhead]
Have questions, feedback, or ideas? We'd love to hear from you.

[CTA Button] Contact Us →
[Secondary] Or email hello@foodpulse.co
```

---

## 5.3 Article Category Pages

### URL Pattern
`/articles/[category-slug]`

### SEO Template
```
Title: [Category Name] | Food Education & Guides | FoodPulse
Description: Explore our [category name] articles covering [key topics]. Evidence-based food education to help you [benefit].
```

### Page Structure
```
[Hero - Short]
- Category name as H1
- Category description
- Article count

[Filter/Sort Bar]
- Sort by: Latest, Popular, Alphabetical
- (Future: Tags filter)

[Articles Grid]
- 12 articles per page
- Pagination
- Mix of card sizes (featured + standard)

[Category CTA]
- Newsletter signup or related category links

[Related Categories]
- Links to other content pillars
```

---

## 5.4 Individual Article Page

### URL Pattern
`/articles/[category-slug]/[article-slug]`

### SEO Template
```
Title: [Article Title] | FoodPulse
Description: [Article meta description - 150-160 chars, includes primary keyword]
```

### Page Structure
```
[Article Header]
- Breadcrumb: Home > Articles > Category > Article
- Category tag
- H1: Article title
- Meta: Author, Published date, Updated date, Read time
- Featured image with caption

[Table of Contents]
- Sticky sidebar on desktop
- Collapsible on mobile
- Links to H2 headings

[Article Content]
- Rich text with proper heading hierarchy
- Images with captions and alt text
- Pull quotes for key points
- Embedded videos where relevant
- Source citations (footnotes or inline)

[Key Takeaways Box]
- Summarized main points
- Actionable tips

[Sources/References]
- Numbered list of cited sources
- Links to studies/articles

[Author Bio]
- Photo, name, credentials
- Short bio

[Related Articles]
- 3-4 related articles from same category
- 2-3 from other relevant categories

[Newsletter CTA]
- Inline signup form

[Comments/Discussion]
- Optional: Disqus or similar

[Share Buttons]
- Fixed on scroll or at article end
```

---

# 6. Component Library

## 6.1 Buttons

### Button Variants
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}
```

### Button Styles
```tsx
const buttonVariants = {
  primary: `
    bg-green-700 text-white 
    hover:bg-green-600 
    focus:ring-2 focus:ring-green-500 focus:ring-offset-2
    shadow-green hover:shadow-green-lg
    transition-all duration-200
  `,
  secondary: `
    bg-brown-500 text-neutral-900 
    hover:bg-brown-400 
    focus:ring-2 focus:ring-brown-400 focus:ring-offset-2
    shadow-brown
    transition-all duration-200
  `,
  outline: `
    bg-transparent text-green-700 
    border-2 border-green-700 
    hover:bg-green-50 
    focus:ring-2 focus:ring-green-500 focus:ring-offset-2
    transition-all duration-200
  `,
  ghost: `
    bg-transparent text-green-700 
    hover:bg-green-50 
    focus:ring-2 focus:ring-green-500 focus:ring-offset-2
    transition-all duration-200
  `,
  accent: `
    bg-white text-green-700 
    hover:bg-green-50 
    focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700
    shadow-md hover:shadow-lg
    transition-all duration-200
  `,
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-6 py-3 text-base rounded-md',
  lg: 'px-8 py-4 text-lg rounded-lg',
};
```

### Button Usage Guide
| Context | Variant | Size |
|---------|---------|------|
| Hero primary CTA | `primary` or `accent` (on dark) | `lg` |
| Hero secondary CTA | `outline` or `ghost` | `md` |
| Section CTA | `primary` | `md` |
| Card CTA | `ghost` with arrow | `sm` |
| Newsletter submit | `primary` | `md` |
| Form submit | `primary` | `md` |
| Navigation CTA | `secondary` | `sm` |
| Text link button | `ghost` | `sm` |

## 6.2 Cards

### Article Card
```tsx
interface ArticleCardProps {
  image: {
    src: string;
    alt: string;
  };
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  title: string;
  excerpt?: string;
  readTime: number;
  publishedAt: string;
  href: string;
  variant?: 'default' | 'featured' | 'horizontal' | 'minimal';
}

// Default Card Structure
<article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
  <div className="relative aspect-[16/10] overflow-hidden">
    <Image 
      src={image.src} 
      alt={image.alt}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <span className="absolute top-4 left-4 px-3 py-1 bg-green-700 text-white text-sm font-medium rounded-full">
      {category.name}
    </span>
  </div>
  <div className="p-5">
    <h3 className="font-display text-xl font-semibold text-neutral-800 line-clamp-2 group-hover:text-green-700 transition-colors">
      {title}
    </h3>
    {excerpt && (
      <p className="mt-2 text-neutral-600 line-clamp-2">{excerpt}</p>
    )}
    <div className="mt-4 flex items-center text-sm text-neutral-500">
      <Clock className="w-4 h-4 mr-1" />
      {readTime} min read
    </div>
  </div>
</article>
```

### Category Card
```tsx
interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  articleCount?: number;
}

<Link href={href} className="group block p-6 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all">
  <div className="w-12 h-12 flex items-center justify-center bg-green-50 text-green-700 rounded-lg group-hover:bg-green-100 transition-colors">
    {icon}
  </div>
  <h3 className="mt-4 font-sans text-lg font-semibold text-neutral-800 group-hover:text-green-700 transition-colors">
    {title}
  </h3>
  <p className="mt-2 text-neutral-600 text-sm">
    {description}
  </p>
  {articleCount && (
    <p className="mt-3 text-sm text-green-600 font-medium">
      {articleCount} articles →
    </p>
  )}
</Link>
```

### Stat Card
```tsx
interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

<div className="text-center p-6">
  <div className="text-4xl font-display font-bold text-green-700">
    {value}
  </div>
  <div className="mt-2 text-lg font-medium text-neutral-800">
    {label}
  </div>
  {description && (
    <p className="mt-1 text-sm text-neutral-500">{description}</p>
  )}
</div>
```

## 6.3 Navigation Components

### Header Component
```tsx
interface HeaderProps {
  transparent?: boolean; // For hero pages
}

const Header = ({ transparent = false }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    {
      'bg-transparent': transparent && !scrolled,
      'bg-white shadow-md': !transparent || scrolled,
    }
  );
  
  const linkClasses = cn(
    'transition-colors',
    {
      'text-white hover:text-green-100': transparent && !scrolled,
      'text-neutral-700 hover:text-green-700': !transparent || scrolled,
    }
  );
  
  return (
    <header className={headerClasses}>
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        <Logo variant={(transparent && !scrolled) ? 'white' : 'default'} />
        
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink href="/" className={linkClasses}>Home</NavLink>
          <NavDropdown 
            label="Articles" 
            items={articleCategories}
            className={linkClasses}
          />
          <NavDropdown 
            label="Resources" 
            items={resourceItems}
            className={linkClasses}
          />
          <NavLink href="/about" className={linkClasses}>About</NavLink>
          <NavLink href="/coaching" className={linkClasses}>Coaching</NavLink>
        </div>
        
        <Button 
          variant={(transparent && !scrolled) ? 'accent' : 'primary'} 
          size="sm"
          href="/newsletter"
        >
          Newsletter
        </Button>
        
        <MobileMenuButton 
          open={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={linkClasses}
        />
      </nav>
      
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
```

### Dropdown Menu
```tsx
interface NavDropdownProps {
  label: string;
  items: {
    title: string;
    description?: string;
    href: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}

// Uses Radix UI for accessibility
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
```

### Footer Component
```tsx
const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Explore */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/articles">All Articles</FooterLink></li>
              <li><FooterLink href="/resources">Resources</FooterLink></li>
              <li><FooterLink href="/search">Search</FooterLink></li>
            </ul>
          </div>
          
          {/* Column 2: Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/articles/food-wellbeing">Food & Wellbeing</FooterLink></li>
              <li><FooterLink href="/articles/smart-food-choices">Smart Food Choices</FooterLink></li>
              <li><FooterLink href="/articles/food-system-insights">Food System Insights</FooterLink></li>
              <li><FooterLink href="/articles/practical-food-tips">Practical Food Tips</FooterLink></li>
              <li><FooterLink href="/articles/recipes">Recipes</FooterLink></li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/about/our-mission">Our Mission</FooterLink></li>
              <li><FooterLink href="/about/editorial-guidelines">Editorial Guidelines</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>
          
          {/* Column 4: Connect */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/newsletter">Newsletter</FooterLink></li>
              <li><FooterLink href="https://instagram.com/foodpulse" external>Instagram</FooterLink></li>
              <li><FooterLink href="https://pinterest.com/foodpulse" external>Pinterest</FooterLink></li>
              <li><FooterLink href="https://youtube.com/@foodpulse" external>YouTube</FooterLink></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Inline */}
        <div className="mt-12 pt-8 border-t border-green-800">
          <div className="max-w-md">
            <h4 className="font-semibold text-lg mb-2">Subscribe to FoodPulse</h4>
            <p className="text-green-200 text-sm mb-4">
              Weekly insights on food, nutrition, and healthy eating.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-green-300">
          <p>© 2025 FoodPulse. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink href="/legal/privacy-policy" small>Privacy Policy</FooterLink>
            <FooterLink href="/legal/terms-of-use" small>Terms of Use</FooterLink>
            <FooterLink href="/legal/cookie-policy" small>Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

## 6.4 Hero Components

### Full-Screen Hero with Animated Text
```tsx
interface HeroProps {
  backgroundImage: string;
  rotatingWords: string[];
  staticText: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

const Hero = ({
  backgroundImage,
  rotatingWords,
  staticText,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [rotatingWords.length]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-700/70 via-green-700/50 to-green-700/70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <p className="text-brown-400 font-medium mb-6 tracking-wide">
          Your hub for all things food
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
          {staticText}{' '}
          <span className="relative inline-block min-w-[200px]">
            <span
              className={cn(
                'inline-block transition-all duration-500',
                isAnimating 
                  ? 'opacity-0 translate-y-4' 
                  : 'opacity-100 translate-y-0'
              )}
            >
              {rotatingWords[currentWordIndex]}
            </span>
          </span>
        </h1>
        
        <p className="mt-6 text-xl text-green-100 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="accent" size="lg" href={primaryCta.href}>
            {primaryCta.text}
          </Button>
          {secondaryCta && (
            <Button variant="outline" size="lg" href={secondaryCta.href} className="border-white text-white hover:bg-white/10">
              {secondaryCta.text}
            </Button>
          )}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
};
```

## 6.5 Carousel Component

### Article Carousel
```tsx
interface CarouselProps {
  items: ArticleCardProps[];
  title?: string;
  eyebrow?: string;
  showControls?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ArticleCarousel = ({
  items,
  title,
  eyebrow,
  showControls = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovered, items.length]);
  
  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const scrollWidth = carouselRef.current.scrollWidth;
    const itemWidth = scrollWidth / items.length;
    carouselRef.current.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };
  
  const next = () => scrollToIndex((currentIndex + 1) % items.length);
  const prev = () => scrollToIndex((currentIndex - 1 + items.length) % items.length);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      {(eyebrow || title) && (
        <div className="flex items-end justify-between mb-8">
          <div>
            {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
            {title && <h2 className="section-headline">{title}</h2>}
          </div>
          
          {showControls && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-white border border-neutral-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full bg-white border border-neutral-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Carousel Track */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
      >
        {items.map((item, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-[300px] md:w-[350px] snap-start"
          >
            <ArticleCard {...item} />
          </div>
        ))}
      </div>
      
      {/* Dots */}
      {showControls && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex 
                  ? 'w-6 bg-green-700' 
                  : 'bg-neutral-300 hover:bg-neutral-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
```

## 6.6 Form Components

### Newsletter Form
```tsx
interface NewsletterFormProps {
  variant?: 'default' | 'hero' | 'footer' | 'inline';
}

const NewsletterForm = ({ variant = 'default' }: NewsletterFormProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };
  
  const baseInputClasses = 'px-4 py-3 rounded-md border focus:outline-none focus:ring-2 transition-all';
  
  const variants = {
    default: {
      container: 'flex flex-col sm:flex-row gap-3',
      input: `${baseInputClasses} border-neutral-300 focus:border-green-500 focus:ring-green-500/20 flex-1`,
      button: 'primary',
    },
    hero: {
      container: 'flex flex-col sm:flex-row gap-3 max-w-md mx-auto',
      input: `${baseInputClasses} border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20 flex-1`,
      button: 'accent',
    },
    footer: {
      container: 'flex gap-3',
      input: `${baseInputClasses} border-green-700 bg-green-800 text-white placeholder:text-green-300 focus:border-green-500 focus:ring-green-500/20 flex-1`,
      button: 'secondary',
    },
    inline: {
      container: 'flex gap-2',
      input: `${baseInputClasses} border-neutral-300 focus:border-green-500 focus:ring-green-500/20 text-sm py-2`,
      button: 'primary',
    },
  };
  
  const currentVariant = variants[variant];
  
  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="w-5 h-5" />
        <span>Thanks for subscribing!</span>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className={currentVariant.container}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className={currentVariant.input}
      />
      <Button 
        type="submit" 
        variant={currentVariant.button as any}
        size={variant === 'inline' ? 'sm' : 'md'}
        loading={status === 'loading'}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
};
```

## 6.7 Section Components

### Section Wrapper
```tsx
interface SectionProps {
  children: React.ReactNode;
  background?: 'white' | 'light-green' | 'warm' | 'dark';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

const Section = ({
  children,
  background = 'white',
  paddingY = 'lg',
  className,
  id,
}: SectionProps) => {
  const backgrounds = {
    white: 'bg-white',
    'light-green': 'bg-green-50',
    warm: 'bg-brown-50',
    dark: 'bg-green-700 text-white',
  };
  
  const paddings = {
    sm: 'py-12 lg:py-16',
    md: 'py-16 lg:py-20',
    lg: 'py-16 lg:py-24',
    xl: 'py-20 lg:py-32',
  };
  
  return (
    <section
      id={id}
      className={cn(
        backgrounds[background],
        paddings[paddingY],
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {children}
      </div>
    </section>
  );
};
```

### Section Header
```tsx
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  titleColor?: 'green' | 'dark' | 'white';
}

const SectionHeader = ({
  eyebrow,
  title,
  description,
  alignment = 'center',
  titleColor = 'green',
}: SectionHeaderProps) => {
  const alignmentClasses = alignment === 'center' ? 'text-center mx-auto' : '';
  
  const titleColors = {
    green: 'text-green-700',
    dark: 'text-neutral-800',
    white: 'text-white',
  };
  
  return (
    <div className={cn('max-w-3xl mb-12', alignmentClasses)}>
      {eyebrow && (
        <p className="eyebrow mb-3">{eyebrow}</p>
      )}
      <h2 className={cn('section-headline', titleColors[titleColor])}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-neutral-600">
          {description}
        </p>
      )}
    </div>
  );
};
```

---

# 7. Animation System

## 7.1 Animation Philosophy

### Principles
1. **Organic & Natural** — Animations should feel smooth and natural, like growth
2. **Purpose-Driven** — Every animation serves a function (guide attention, provide feedback)
3. **Subtle Enhancement** — Enhance, don't distract from content
4. **Performance-First** — Use CSS transforms and opacity; respect reduced motion
5. **Consistent Timing** — Use a unified timing system across the site

## 7.2 Animation Library

```bash
npm install framer-motion
```

## 7.3 Timing & Easing

```css
:root {
  /* Durations */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
  
  /* Easings */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

## 7.4 Core Animations

### Fade In Up (Primary Entrance)
```tsx
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 24 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1], // ease-out
    }
  }
};

// Usage
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
>
  {content}
</motion.div>
```

### Stagger Children
```tsx
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

// Usage for grids
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-3 gap-6"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeInUp}>
      <Card {...item} />
    </motion.div>
  ))}
</motion.div>
```

### Scale on Hover (Cards)
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ 
    type: "spring", 
    stiffness: 400, 
    damping: 25 
  }}
>
  <Card />
</motion.div>
```

### Hero Text Rotation Animation
```tsx
// CSS for the rotating word effect
const wordAnimation = {
  enter: {
    y: 20,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -20,
    opacity: 0,
  },
};

// Using AnimatePresence for word changes
<AnimatePresence mode="wait">
  <motion.span
    key={currentWord}
    variants={wordAnimation}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="absolute left-0"
  >
    {currentWord}
  </motion.span>
</AnimatePresence>
```

### Page Transitions
```tsx
// app/template.tsx
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

## 7.5 Specific Component Animations

### Header Scroll Effect
```tsx
const headerAnimation = {
  transparent: {
    backgroundColor: 'rgba(0, 51, 23, 0)',
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
  },
  solid: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
};

<motion.header
  variants={headerAnimation}
  animate={scrolled ? 'solid' : 'transparent'}
  transition={{ duration: 0.3 }}
>
  {/* Header content */}
</motion.header>
```

### Dropdown Menu
```tsx
const dropdownAnimation = {
  hidden: { 
    opacity: 0, 
    y: -8,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.2,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.95,
    transition: { 
      duration: 0.15,
      ease: "easeIn",
    }
  }
};
```

### Carousel Slide
```tsx
const slideAnimation = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};
```

### Image Reveal
```tsx
const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    }
  }
};
```

## 7.6 Scroll Animations

### Scroll Progress Indicator
```tsx
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-green-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
};
```

### Parallax Hero Background
```tsx
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxHero = ({ children, backgroundImage }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <Image src={backgroundImage} alt="" fill className="object-cover" />
      </motion.div>
      
      <motion.div style={{ opacity }} className="relative z-10">
        {children}
      </motion.div>
    </section>
  );
};
```

## 7.7 Reduced Motion

```tsx
// hooks/useReducedMotion.ts
import { useReducedMotion } from 'framer-motion';

export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return {
      initial: false,
      animate: true,
      transition: { duration: 0 },
    };
  }
  
  return {
    initial: 'hidden',
    animate: 'visible',
    transition: { duration: 0.5 },
  };
}
```

```css
/* Global CSS fallback */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 8. Technical Implementation

## 8.1 Project Setup

### Initialize Project
```bash
npx create-next-app@latest foodpulse --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd foodpulse

# Core dependencies
npm install framer-motion
npm install @radix-ui/react-dropdown-menu @radix-ui/react-dialog @radix-ui/react-navigation-menu
npm install lucide-react
npm install clsx tailwind-merge
npm install @vercel/analytics @vercel/speed-insights

# Form handling
npm install react-hook-form @hookform/resolvers zod

# Email (choose one)
npm install resend
# or
npm install @sendgrid/mail

# CMS (if using)
npm install @sanity/client @sanity/image-url
# or
npm install contentful

# Dev dependencies
npm install -D @types/node prettier prettier-plugin-tailwindcss
```

### Project Structure
```
src/
├── app/
│   ├── (marketing)/              # Marketing pages
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── articles/
│   │   │   ├── page.tsx          # All articles
│   │   │   ├── [category]/
│   │   │   │   ├── page.tsx      # Category page
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Individual article
│   │   ├── resources/
│   │   ├── coaching/
│   │   ├── newsletter/
│   │   ├── contact/
│   │   └── search/
│   ├── api/
│   │   ├── newsletter/
│   │   │   └── route.ts
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── search/
│   │       └── route.ts
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── manifest.ts
├── components/
│   ├── ui/                       # Primitive components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Section.tsx
│   │   └── Container.tsx
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx
│   │   ├── FeaturedArticles.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── ArticleCarousel.tsx
│   │   ├── NewsletterCTA.tsx
│   │   └── ...
│   ├── articles/                 # Article-specific components
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleGrid.tsx
│   │   ├── TableOfContents.tsx
│   │   └── ShareButtons.tsx
│   └── shared/                   # Shared utilities
│       ├── Logo.tsx
│       ├── StructuredData.tsx
│       ├── SEO.tsx
│       └── ...
├── lib/
│   ├── utils.ts                  # Utility functions (cn, etc.)
│   ├── constants.ts              # Site constants
│   ├── schemas.ts                # Zod schemas
│   └── api.ts                    # API helpers
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useMediaQuery.ts
│   ├── useReducedMotion.ts
│   └── useNewsletter.ts
├── styles/
│   └── globals.css
├── content/                      # Static content (or CMS)
│   ├── articles/
│   ├── categories.ts
│   └── navigation.ts
└── types/
    └── index.ts
```

## 8.2 Configuration Files

### tailwind.config.ts
```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#e1ffed',
          100: '#b8f5d0',
          200: '#8debaf',
          300: '#5fe08d',
          400: '#2fd66b',
          500: '#00cc4a',
          600: '#00a33c',
          700: '#003317', // Primary brand green
          800: '#002614',
          900: '#001a0d',
        },
        brown: {
          50: '#fdf8f0',
          100: '#faf1e0',
          200: '#f5e2c4',
          300: '#f0d4a9',
          400: '#e6be8a',
          500: '#dda96b', // Primary brand brown
          600: '#a67c1a',
          700: '#8b6914',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-source-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'word-rotate': 'wordRotate 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wordRotate: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'green': '0 4px 14px 0 rgba(0, 51, 23, 0.25)',
        'green-lg': '0 10px 25px 0 rgba(0, 51, 23, 0.3)',
        'brown': '0 4px 14px 0 rgba(221, 169, 107, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add CMS image domains
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.sanity.io',
      // },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Add redirects from old URLs if migrating
    ];
  },
};

module.exports = nextConfig;
```

## 8.3 Utility Functions

### lib/utils.ts
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}
```

## 8.4 Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image';

// Hero background with priority loading
<Image
  src="/images/hero-background.jpg"
  alt=""
  fill
  priority
  quality={85}
  className="object-cover"
  sizes="100vw"
/>

// Article card images with lazy loading
<Image
  src={article.image}
  alt={article.imageAlt}
  width={600}
  height={400}
  quality={85}
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Font Optimization
```tsx
// app/layout.tsx
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

### Core Web Vitals Targets
| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Priority hero image, font preload |
| FID | < 100ms | Minimize JS, defer non-critical |
| CLS | < 0.1 | Set image dimensions, font-display: swap |
| TTFB | < 800ms | Edge caching, SSG where possible |

---

# 9. Content & Copy Guide

## 9.1 Homepage Copy

### Hero Section
```
[Animated Eyebrow]
Your hub for all things food

[H1 - with rotating word]
Explore all things [healthy foods / food choices / food systems / nutrition / wellbeing]

[Subhead]
Your hub for all things food. Once it concerns you 
as a consumer, you're covered.

[Primary CTA]
Explore All

[Secondary CTA]
Latest Articles ↓
```

### Category Section
```
[Eyebrow]
Explore Topics

[H2]
What interests you today?

[Category 1: Food & Wellbeing]
Title: Food & Wellbeing
Description: Nutrition, gut health, disease prevention

[Category 2: Smart Food Choices]
Title: Smart Food Choices
Description: Labels, quality, shopping guides

[Category 3: Food System Insights]
Title: Food System Insights
Description: Sustainability, supply chains, policy

[Category 4: Practical Food Tips]
Title: Practical Food Tips
Description: Meal prep, storage, seasonal eating

[Category 5: Recipes]
Title: Recipes
Description: Healthy, delicious, easy meals
```

### Newsletter Section
```
[H2]
Get Fresh Insights Weekly

[Subhead]
Join thousands of readers who get our best articles, 
recipes, and food tips delivered every Saturday.

[Input Placeholder]
Enter your email

[Button]
Subscribe

[Privacy Note]
No spam, ever. Unsubscribe anytime.
```

## 9.2 About Page Copy

### Hero
```
[H1]
About FoodPulse

[Subhead]
Empowering smarter food choices through 
evidence-based education
```

### Mission Section
```
[Eyebrow]
Our Mission

[H2]
Food Knowledge Should Be Free and Accessible

[Body]
We exist to bridge the gap between food science and everyday 
consumers. Too often, nutrition information is buried in academic 
journals, hidden behind paywalls, or oversimplified into clickbait.

FoodPulse translates complex food science into practical, 
actionable knowledge that helps you make better decisions about 
what you eat—without the hype, fads, or fear-mongering.
```

## 9.3 SEO Title & Description Templates

### Homepage
```
Title: FoodPulse | Your Hub for Food Systems, Nutrition & Healthy Eating
Description: Explore evidence-based food education covering nutrition science, food systems, and practical healthy eating tips. Make smarter food choices with FoodPulse.
```

### Category Pages
```
Title: [Category Name] | Food Education & Guides | FoodPulse
Description: Explore our [category] articles. [Specific topics covered]. Evidence-based guidance for better food choices.

Example (Food & Wellbeing):
Title: Food & Wellbeing | Nutrition Science Made Practical | FoodPulse
Description: Explore how food affects your health. Gut health, nutrition, disease prevention, and the science behind what you eat. Evidence-based, no fads.

Example (Food System Insights):
Title: Food System Insights | Farm to Fork Education | FoodPulse
Description: Understand where your food comes from. Sustainable agriculture, supply chains, food policy, and the systems that shape what we eat.
```

### Article Pages
```
Title: [Article Title] | FoodPulse
Description: [Compelling summary in 150-160 chars including primary keyword and benefit to reader]

Example:
Title: How to Read Nutrition Labels: A Complete Guide | FoodPulse
Description: Learn to decode nutrition labels like a pro. Understand serving sizes, % daily values, and spot misleading claims. Make smarter choices at the store.
```

## 9.4 Voice & Tone Examples

### Good Examples ✓
```
"Fiber isn't just about digestion—it feeds the trillions of microbes 
in your gut that influence everything from immunity to mood."

"Reading a nutrition label shouldn't require a science degree. 
Here's what actually matters."

"Food waste is a complex problem, but your kitchen is a good place to start."
```

### Bad Examples ✗
```
"This SUPERFOOD will TRANSFORM your gut health!!!" 
(Too sensational, makes unsupported claims)

"Per the randomized controlled trial published in the Journal of..."
(Too academic, alienates general readers)

"You should never eat processed foods."
(Too prescriptive, ignores nuance and accessibility)
```

---

# 10. Launch Checklist

## 10.1 Pre-Launch Technical

### Core Functionality
- [ ] All pages render correctly on mobile, tablet, desktop
- [ ] Navigation works on all devices (including dropdowns)
- [ ] Hero rotating text animation works smoothly
- [ ] Newsletter form submits and stores emails
- [ ] Contact form sends emails correctly
- [ ] 404 page styled and helpful
- [ ] Error boundaries catch and display errors
- [ ] Search functionality works (if implemented)
- [ ] All internal links work (no 404s)
- [ ] External links open in new tabs

### Performance
- [ ] Lighthouse score > 90 on all categories
- [ ] LCP < 2.5s on homepage
- [ ] CLS < 0.1 across all pages
- [ ] Images optimized (WebP/AVIF, lazy loading)
- [ ] Fonts load without layout shift
- [ ] No render-blocking resources
- [ ] Gzip/Brotli compression enabled

### Infrastructure
- [ ] SSL certificate active (HTTPS)
- [ ] Domain DNS configured correctly
- [ ] WWW redirect configured (www → non-www or vice versa)
- [ ] Environment variables set for production
- [ ] Analytics installed (Vercel Analytics or GA4)
- [ ] Error monitoring set up (optional: Sentry)

## 10.2 SEO Checklist

### Technical SEO
- [ ] All pages have unique title tags (50-60 chars)
- [ ] All pages have meta descriptions (150-160 chars)
- [ ] Single H1 on every page
- [ ] Logical heading hierarchy (H1 → H2 → H3)
- [ ] Canonical URLs set on all pages
- [ ] Open Graph images created (1200x630)
- [ ] Twitter cards configured
- [ ] Schema markup on all page types
- [ ] Sitemap.xml generated and accessible
- [ ] Robots.txt configured correctly
- [ ] Alt text on all images

### Search Console & Indexing
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Search Console
- [ ] Bing Webmaster Tools verified (optional)
- [ ] Request indexing for key pages

## 10.3 Content Checklist

- [ ] All placeholder text replaced with real content
- [ ] Homepage content complete
- [ ] About page content complete
- [ ] At least 5-10 articles published per category
- [ ] Featured articles selected for homepage
- [ ] All images have appropriate alt text
- [ ] Sources cited on all articles
- [ ] Contact information correct
- [ ] Privacy Policy published
- [ ] Terms of Use published
- [ ] Cookie Policy published (if using cookies)

## 10.4 Accessibility Checklist

- [ ] Keyboard navigation works throughout
- [ ] Focus states visible on all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Form inputs have associated labels
- [ ] Images have descriptive alt text
- [ ] Skip to main content link present
- [ ] Reduced motion preferences respected
- [ ] Screen reader tested (basic flow)
- [ ] No autoplaying media with sound

## 10.5 Pre-Launch Testing

### Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Edge (desktop)

### Device Testing
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad/Tablet
- [ ] Desktop (various sizes)

### Functionality Testing
- [ ] Newsletter signup works end-to-end
- [ ] Contact form works end-to-end
- [ ] All navigation links work
- [ ] Carousel works with touch & mouse
- [ ] Search works (if implemented)
- [ ] Social share links work

## 10.6 Post-Launch

### Day 1
- [ ] Verify site is live and accessible
- [ ] Check analytics are tracking
- [ ] Submit sitemap to Google Search Console
- [ ] Test contact form from production
- [ ] Monitor error logs

### Week 1
- [ ] Check Search Console for crawl errors
- [ ] Review analytics for issues
- [ ] Announce launch on social media
- [ ] Send newsletter to existing subscribers
- [ ] Begin regular content publishing schedule

### Ongoing
- [ ] Publish new articles regularly (2-3/week minimum)
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Track keyword rankings for target terms
- [ ] Collect and respond to user feedback
- [ ] Update older content as needed
- [ ] Build backlinks through outreach

---

# Appendix: Quick Reference

## Color Quick Reference
```
Deep Green (Primary): #003317
Light Green (Backgrounds): #e1ffed
Earth Brown (Accents): #dda96b
Near Black (Text): #292524
Medium Gray (Secondary Text): #57534e
```

## Typography Quick Reference
```
Display Font: Playfair Display (serif)
Body Font: Source Sans 3 (sans-serif)

Hero: 60-96px, Playfair, bold
Section H2: 36-48px, Playfair, semibold
Card Title: 20px, Source Sans, semibold
Body: 16px, Source Sans, regular, 1.75 line-height
Eyebrow: 14px, Source Sans, semibold, uppercase, letterspacing 0.1em
```

## Spacing Quick Reference
```
Section padding: py-16 lg:py-24
Component gap: space-y-8 lg:space-y-12
Card padding: p-5 lg:p-6
Button padding: px-6 py-3 (md), px-8 py-4 (lg)
Card grid gap: gap-4 lg:gap-6
```

## Animation Quick Reference
```
Entrance: 0.5s ease-out
Hover: 0.2-0.3s ease-in-out
Page transition: 0.3s ease-out
Stagger: 0.1s between children
Word rotation: 3s interval, 0.5s transition
```

## Rotating Words for Hero
```javascript
const rotatingWords = [
  "healthy foods",
  "food choices",
  "food systems",
  "nutrition",
  "wellbeing"
];
```

---

**Document Version:** 2.0  
**Created:** January 2025  
**For:** FoodPulse Development Team
**Domain:** foodpulse.co
