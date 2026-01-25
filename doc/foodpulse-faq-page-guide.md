# FoodPulse FAQ Page — Complete Development Guide

## Building an SEO-Optimized FAQ Resource

**Version:** 1.0  
**Last Updated:** January 2025  
**URL:** `/resources/faq`  
**Priority:** High (Featured snippets + Voice search + AI citation)

---

# Table of Contents

1. [Strategic Purpose](#1-strategic-purpose)
2. [Information Architecture](#2-information-architecture)
3. [Sanity Schema Design](#3-sanity-schema-design)
4. [SEO Strategy](#4-seo-strategy)
5. [Page Specifications](#5-page-specifications)
6. [Content Guidelines](#6-content-guidelines)
7. [Technical Implementation](#7-technical-implementation)
8. [Starter FAQ Content](#8-starter-faq-content)
9. [Launch Checklist](#9-launch-checklist)

---

# 1. Strategic Purpose

## 1.1 Why Build an FAQ Page?

### SEO Benefits

| Benefit | Description |
|---------|-------------|
| **Featured snippets** | FAQ format is ideal for position zero |
| **Voice search** | Matches natural question queries |
| **Long-tail keywords** | Each question targets specific searches |
| **People Also Ask** | FAQ content often appears in PAA boxes |
| **AI/LLM citations** | Direct Q&A format perfect for AI answers |

### User Benefits

| Benefit | Description |
|---------|-------------|
| **Quick answers** | Reduces friction for common questions |
| **Trust building** | Shows transparency and expertise |
| **Self-service** | Users find answers without contact |
| **Education** | Teaches while answering |

### Business Benefits

| Benefit | Description |
|---------|-------------|
| **Reduced support load** | Fewer repetitive questions |
| **Authority signals** | Demonstrates comprehensive knowledge |
| **Content opportunities** | FAQs reveal topics for full articles |
| **Conversion support** | Addresses objections/concerns |

## 1.2 FAQ Categories for FoodPulse

```
1. About FoodPulse
   - Mission, team, credibility questions

2. Food & Nutrition Basics
   - Common nutrition questions
   - Diet and health questions

3. Understanding Food Labels
   - Label reading, certifications
   - Marketing claims explained

4. Food Systems & Sustainability
   - Where food comes from
   - Environmental impact questions

5. Using FoodPulse
   - Site features, newsletter, content
```

## 1.3 Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Featured snippets | 30%+ of FAQs | Rank tracking tools |
| People Also Ask | Appear in PAA | SERP monitoring |
| Organic traffic | 200+ monthly visits | GA4 |
| Time on page | 2+ minutes | GA4 |
| Search impressions | Growing monthly | Search Console |

---

# 2. Information Architecture

## 2.1 URL Structure

```
/resources/faq                        → Main FAQ page (all categories)
/resources/faq#about-foodpulse        → Jump to category section
/resources/faq#food-nutrition         → Jump to category section
/resources/faq?category=nutrition     → Filtered view (optional)
```

### Why a Single Page (Not Multiple Pages)

For FAQ content, a single comprehensive page is recommended because:
- Better for FAQ schema (one page = one FAQPage schema)
- Users can Ctrl+F to search
- Easier to maintain
- Consolidates SEO value
- Better UX than clicking through multiple pages

## 2.2 Navigation Integration

### Header Navigation
```
Resources ▼
├── Guides (future)
├── Glossary
├── FAQ ← Add here
└── Newsletter
```

### Footer Navigation
```
Resources
├── Glossary
├── FAQ
└── Contact
```

### Internal Linking
- Link from relevant articles to specific FAQ questions
- Link from FAQ answers to detailed articles
- Cross-link between FAQ and Glossary terms

## 2.3 Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                        HERO SECTION                          │
│                                                              │
│     Breadcrumb: Home > Resources > FAQ                      │
│                                                              │
│     [H1] Frequently Asked Questions                         │
│                                                              │
│     [Subtitle] Find answers to common questions about       │
│     food, nutrition, and FoodPulse.                         │
│                                                              │
│     [Search Bar] 🔍 Search questions...                     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    CATEGORY NAVIGATION                       │
│                                                              │
│     [About FoodPulse] [Food & Nutrition] [Food Labels]      │
│     [Food Systems] [Using FoodPulse]                        │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    FAQ SECTIONS                              │
│                                                              │
│     ## About FoodPulse                          anchor: #about│
│     ┌───────────────────────────────────────────────────┐   │
│     │ ▼ What is FoodPulse?                              │   │
│     │   FoodPulse is a free, evidence-based food        │   │
│     │   education platform that helps consumers...      │   │
│     │   [Read more about us →]                          │   │
│     ├───────────────────────────────────────────────────┤   │
│     │ ▶ Who writes FoodPulse content?                   │   │
│     ├───────────────────────────────────────────────────┤   │
│     │ ▶ Is FoodPulse free to use?                       │   │
│     └───────────────────────────────────────────────────┘   │
│                                                              │
│     ## Food & Nutrition Basics                  anchor: #food│
│     ┌───────────────────────────────────────────────────┐   │
│     │ ▶ What are macronutrients?                        │   │
│     ├───────────────────────────────────────────────────┤   │
│     │ ▶ How much protein do I need daily?               │   │
│     ├───────────────────────────────────────────────────┤   │
│     │ ▶ Are carbs bad for you?                          │   │
│     └───────────────────────────────────────────────────┘   │
│                                                              │
│     ... more categories ...                                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    STILL HAVE QUESTIONS?                     │
│                                                              │
│     Can't find what you're looking for?                     │
│     [Contact Us] [Browse Articles] [Read Glossary]          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                         FOOTER                               │
└─────────────────────────────────────────────────────────────┘
```

---

# 3. Sanity Schema Design

## 3.1 FAQ Item Document Type

```typescript
// src/sanity/schemaTypes/documents/faqItemType.ts
import {defineField, defineType} from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    // Question
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The question being asked (start with "What", "How", "Why", etc.)',
      validation: (rule) => [
        rule.required().error('Question is required'),
        rule.max(200).warning('Keep questions concise'),
      ],
    }),

    // Slug (for direct linking)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[?]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),

    // Short Answer (for schema/snippets)
    defineField({
      name: 'shortAnswer',
      title: 'Short Answer',
      type: 'text',
      description: 'Concise answer (1-3 sentences). Used in schema markup and search snippets.',
      validation: (rule) => [
        rule.required().error('Short answer is required'),
        rule.min(50).warning('Answer should be at least 50 characters'),
        rule.max(500).warning('Keep short answer under 500 characters for snippets'),
      ],
      rows: 4,
    }),

    // Full Answer (expanded content)
    defineField({
      name: 'fullAnswer',
      title: 'Full Answer (Optional)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  },
                ],
              },
            ],
          },
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
      ],
      description: 'Extended answer with more detail (shown when expanded)',
    }),

    // Category
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'About FoodPulse', value: 'about-foodpulse'},
          {title: 'Food & Nutrition Basics', value: 'food-nutrition'},
          {title: 'Understanding Food Labels', value: 'food-labels'},
          {title: 'Food Systems & Sustainability', value: 'food-systems'},
          {title: 'Using FoodPulse', value: 'using-foodpulse'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),

    // Related Content
    defineField({
      name: 'relatedArticle',
      title: 'Related Article',
      type: 'reference',
      to: [{type: 'article'}],
      description: 'Link to an article that covers this topic in depth',
    }),

    defineField({
      name: 'relatedGlossaryTerm',
      title: 'Related Glossary Term',
      type: 'reference',
      to: [{type: 'glossaryTerm'}],
      description: 'Link to a glossary term for more definition',
    }),

    // Metadata
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category (lower = first)',
      initialValue: 99,
    }),

    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Question',
      type: 'boolean',
      description: 'Show this question prominently at the top',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'question',
      category: 'category',
      isPublished: 'isPublished',
      isFeatured: 'isFeatured',
    },
    prepare({title, category, isPublished, isFeatured}) {
      const status = isPublished ? (isFeatured ? '⭐' : '✓') : '○'
      const categoryLabels: Record<string, string> = {
        'about-foodpulse': '🏠 About',
        'food-nutrition': '🥗 Nutrition',
        'food-labels': '🏷️ Labels',
        'food-systems': '🌾 Systems',
        'using-foodpulse': '💻 Using',
      }
      return {
        title: `${status} ${title}`,
        subtitle: categoryLabels[category] || category,
      }
    },
  },

  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{field: 'updatedAt', direction: 'desc'}],
    },
  ],
})
```

## 3.2 FAQ Category Document Type (Optional)

If you want more control over categories:

```typescript
// src/sanity/schemaTypes/documents/faqCategoryType.ts
import {defineField, defineType} from 'sanity'

export const faqCategoryType = defineType({
  name: 'faqCategory',
  title: 'FAQ Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description shown above the FAQ items',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon identifier',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({title, icon}) {
      return {
        title: `${icon || '📁'} ${title}`,
      }
    },
  },
})
```

## 3.3 Register Schemas

```typescript
// src/sanity/schemaTypes/index.ts
import {faqItemType} from './documents/faqItemType'
import {faqCategoryType} from './documents/faqCategoryType' // Optional

export const schemaTypes = [
  // ... existing types
  faqItemType,
  faqCategoryType, // Optional
]
```

## 3.4 Desk Structure

```typescript
// In structure.ts
S.listItem()
  .title('FAQ')
  .child(
    S.list()
      .title('FAQ')
      .items([
        // All FAQs
        S.listItem()
          .title('All Questions')
          .child(
            S.documentTypeList('faqItem')
              .title('All FAQ Items')
              .defaultOrdering([
                {field: 'category', direction: 'asc'},
                {field: 'order', direction: 'asc'},
              ])
          ),

        // By Category
        S.listItem()
          .title('By Category')
          .child(
            S.list()
              .title('Categories')
              .items([
                S.listItem()
                  .title('🏠 About FoodPulse')
                  .child(
                    S.documentList()
                      .title('About FoodPulse')
                      .filter('_type == "faqItem" && category == "about-foodpulse"')
                      .defaultOrdering([{field: 'order', direction: 'asc'}])
                  ),
                S.listItem()
                  .title('🥗 Food & Nutrition')
                  .child(
                    S.documentList()
                      .title('Food & Nutrition')
                      .filter('_type == "faqItem" && category == "food-nutrition"')
                      .defaultOrdering([{field: 'order', direction: 'asc'}])
                  ),
                S.listItem()
                  .title('🏷️ Food Labels')
                  .child(
                    S.documentList()
                      .title('Food Labels')
                      .filter('_type == "faqItem" && category == "food-labels"')
                      .defaultOrdering([{field: 'order', direction: 'asc'}])
                  ),
                S.listItem()
                  .title('🌾 Food Systems')
                  .child(
                    S.documentList()
                      .title('Food Systems')
                      .filter('_type == "faqItem" && category == "food-systems"')
                      .defaultOrdering([{field: 'order', direction: 'asc'}])
                  ),
                S.listItem()
                  .title('💻 Using FoodPulse')
                  .child(
                    S.documentList()
                      .title('Using FoodPulse')
                      .filter('_type == "faqItem" && category == "using-foodpulse"')
                      .defaultOrdering([{field: 'order', direction: 'asc'}])
                  ),
              ])
          ),

        S.divider(),

        // Featured
        S.listItem()
          .title('⭐ Featured Questions')
          .child(
            S.documentList()
              .title('Featured')
              .filter('_type == "faqItem" && isFeatured == true')
          ),

        // Drafts
        S.listItem()
          .title('Unpublished')
          .child(
            S.documentList()
              .title('Unpublished')
              .filter('_type == "faqItem" && isPublished != true')
          ),
      ])
  ),
```

---

# 4. SEO Strategy

## 4.1 Keyword Targeting

### Page-Level Keywords
```
Primary: food faq, nutrition faq, food questions
Secondary: common food questions, nutrition questions answered
Long-tail: what is [term], how much [nutrient] do I need, is [food] healthy
```

### Question-Level Keywords
Each FAQ targets specific question-based searches:

| Question Pattern | Example | Search Intent |
|-----------------|---------|---------------|
| "What is..." | What is organic food? | Definitional |
| "How much..." | How much protein do I need? | Quantitative |
| "Is ... good/bad" | Is sugar bad for you? | Evaluative |
| "Why is..." | Why is fiber important? | Explanatory |
| "Can I..." | Can I eat too much protein? | Permissive |
| "Should I..." | Should I take vitamins? | Advisory |

## 4.2 Meta Tags

### FAQ Page
```html
<title>Frequently Asked Questions | Food & Nutrition FAQ | FoodPulse</title>
<meta name="description" content="Find answers to common questions about food, nutrition, food labels, and healthy eating. Evidence-based answers from FoodPulse." />
```

## 4.3 FAQ Schema Markup (Critical!)

The FAQPage schema is essential for rich results. Google shows FAQ rich results directly in search.

### Complete FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is FoodPulse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FoodPulse is a free, evidence-based food education platform that helps consumers make informed decisions about nutrition, food systems, and healthy eating. Founded by Food Systems Researcher Etornam Tsyawo, FoodPulse provides reliable, actionable content backed by scientific research."
      }
    },
    {
      "@type": "Question",
      "name": "What are macronutrients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Macronutrients are the three main nutrients your body needs in large amounts: proteins, carbohydrates, and fats. They provide energy (calories) and serve essential functions including building tissue, providing fuel, and supporting cellular processes."
      }
    }
  ]
}
```

### Schema Implementation Component

```typescript
// components/FAQJsonLd.tsx
interface FAQItem {
  question: string
  shortAnswer: string
}

interface FAQJsonLdProps {
  faqs: FAQItem[]
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.shortAnswer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

## 4.4 Internal Linking Strategy

### From FAQ to Other Content
```tsx
// In FAQ answers, link to related content
<p>
  FoodPulse is a free, evidence-based food education platform. 
  <a href="/about">Learn more about our mission and team →</a>
</p>

<p>
  Macronutrients are the three main nutrients your body needs in large amounts.
  <a href="/glossary/macronutrients">See full definition in glossary →</a>
</p>
```

### From Articles to FAQ
```tsx
// In article content
<p>
  Have more questions about protein? Check our 
  <a href="/resources/faq#how-much-protein">FAQ on protein needs</a>.
</p>
```

---

# 5. Page Specifications

## 5.1 Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                     HERO (bg: green-50)                      │
│                                                              │
│  [Breadcrumb] Home > Resources > FAQ                        │
│                                                              │
│  [H1] Frequently Asked Questions                            │
│                                                              │
│  [Subtitle] Find answers to common questions about food,    │
│  nutrition, and healthy eating.                             │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 🔍 Search questions...                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [Quick Stats] 45 questions answered • 5 categories         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Hero Specs
```css
/* Container */
background: var(--green-50);
padding: py-12 lg:py-16;

/* H1 */
font-family: var(--font-display);
font-size: text-3xl lg:text-4xl;
font-weight: font-bold;
color: var(--green-700);
margin-bottom: mb-4;

/* Subtitle */
font-size: text-lg;
color: var(--neutral-600);
max-width: max-w-2xl;
margin-bottom: mb-8;

/* Search */
width: max-w-xl;
padding: px-4 py-3;
border-radius: rounded-lg;
border: border-2 border-neutral-200;
focus: border-green-500;
```

## 5.2 Category Navigation

```
┌─────────────────────────────────────────────────────────────┐
│                  CATEGORY NAV (sticky)                       │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ 🏠 About    │ │ 🥗 Nutrition │ │ 🏷️ Labels   │           │
│  │ FoodPulse  │ │             │ │             │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐                            │
│  │ 🌾 Food     │ │ 💻 Using    │                            │
│  │ Systems    │ │ FoodPulse  │                            │
│  └─────────────┘ └─────────────┘                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Category Nav Specs
```css
/* Container */
position: sticky;
top: top-16; /* Below header */
background: white;
padding: py-4;
border-bottom: border-b border-neutral-200;
z-index: z-10;
overflow-x: auto; /* Horizontal scroll on mobile */

/* Category Button */
display: inline-flex;
align-items: center;
gap: gap-2;
padding: px-4 py-2;
border-radius: rounded-lg;
font-size: text-sm;
font-weight: font-medium;
color: var(--neutral-700);
background: var(--neutral-100);
white-space: nowrap;
transition: all 0.15s;

/* Active State */
.active {
  background: var(--green-600);
  color: white;
}

/* Hover State */
:hover {
  background: var(--green-50);
  color: var(--green-700);
}
```

## 5.3 FAQ Accordion Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ## 🏠 About FoodPulse                                      │
│                                                              │
│  [Category description text here]                           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ▼ What is FoodPulse?                                   │ │
│  │                                                         │ │
│  │   FoodPulse is a free, evidence-based food education   │ │
│  │   platform that helps consumers make informed          │ │
│  │   decisions about nutrition, food systems, and         │ │
│  │   healthy eating.                                      │ │
│  │                                                         │ │
│  │   [Extended content if available...]                   │ │
│  │                                                         │ │
│  │   Learn more about us →                                │ │
│  │                                                         │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ ▶ Who writes FoodPulse content?                        │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ ▶ Is FoodPulse free to use?                            │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ ▶ How can I contact FoodPulse?                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Accordion Specs
```css
/* Section Container */
margin-bottom: mb-12;
scroll-margin-top: scroll-mt-32; /* Account for sticky nav */

/* Section Heading */
font-family: var(--font-display);
font-size: text-2xl;
font-weight: font-bold;
color: var(--neutral-900);
margin-bottom: mb-2;
display: flex;
align-items: center;
gap: gap-3;

/* Section Description */
font-size: text-base;
color: var(--neutral-600);
margin-bottom: mb-6;
max-width: max-w-3xl;

/* Accordion Container */
border: border border-neutral-200;
border-radius: rounded-xl;
overflow: hidden;
background: white;

/* Accordion Item */
border-bottom: border-b border-neutral-200;
last:border-bottom: border-b-0;

/* Accordion Button (Question) */
width: w-full;
display: flex;
align-items: center;
justify-content: space-between;
padding: p-5;
text-align: text-left;
font-size: text-base lg:text-lg;
font-weight: font-medium;
color: var(--neutral-800);
background: bg-white;
hover: hover:bg-neutral-50;
transition: background 0.15s;

/* Accordion Icon */
flex-shrink: flex-shrink-0;
width: w-5 h-5;
color: var(--neutral-400);
transition: transform 0.2s;
.open: rotate-180;

/* Accordion Content */
padding: px-5 pb-5;
color: var(--neutral-700);
line-height: leading-relaxed;

/* Related Link */
margin-top: mt-4;
font-size: text-sm;
font-weight: font-medium;
color: var(--green-600);
hover: hover:text-green-700;
```

## 5.4 CTA Section

```
┌─────────────────────────────────────────────────────────────┐
│                    STILL HAVE QUESTIONS?                     │
│                    (bg: green-600, text: white)              │
│                                                              │
│     Can't find what you're looking for?                     │
│     We're here to help.                                     │
│                                                              │
│     ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│     │ Contact Us  │ │ Browse      │ │ Read        │        │
│     │             │ │ Articles    │ │ Glossary    │        │
│     └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                              │
│     Or suggest a question: [Email input] [Submit]           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

# 6. Content Guidelines

## 6.1 Question Writing Rules

### Format
- Start with a question word: What, How, Why, Is, Can, Should, Does
- Use natural language (how people actually ask)
- Keep under 100 characters
- End with a question mark

### Good vs Bad Examples

```
✅ Good Questions:
"What are macronutrients?"
"How much protein do I need daily?"
"Is organic food better for you?"
"Why is fiber important?"
"Can I eat too much fruit?"

❌ Bad Questions:
"Macronutrients" (not a question)
"Protein intake recommendations" (not a question)
"The benefits of organic" (not a question)
"Fiber importance" (not a question)
"Fruit consumption limits" (not a question)
```

## 6.2 Answer Writing Rules

### Short Answer (Required)
- 1-3 sentences
- Direct answer first, then brief explanation
- Under 500 characters
- This is what appears in schema/snippets

### Full Answer (Optional)
- Expanded explanation
- Can include lists, links, examples
- 100-300 words typical
- Include a call-to-action link

### Answer Structure Pattern

```markdown
[Direct answer to the question in first sentence.]
[Brief explanation or context in 1-2 more sentences.]

[Optional: Expanded details in full answer section]

[Link to related content]
```

### Example

**Question:** What are macronutrients?

**Short Answer:**
Macronutrients are the three main nutrients your body needs in large amounts: proteins, carbohydrates, and fats. They provide energy (calories) and serve essential functions like building tissue, fueling activity, and supporting cellular processes.

**Full Answer:**
Macronutrients ("macros") differ from micronutrients (vitamins and minerals) in that your body needs them in much larger quantities—measured in grams rather than milligrams.

**The three macronutrients:**
- **Proteins** (4 cal/g) — Build and repair tissues
- **Carbohydrates** (4 cal/g) — Primary energy source
- **Fats** (9 cal/g) — Energy storage, cell function, nutrient absorption

Most dietary guidelines recommend getting 45-65% of calories from carbs, 20-35% from fats, and 10-35% from protein.

[Read our complete guide to macronutrients →]

## 6.3 Tone Guidelines

| Do | Don't |
|----|-------|
| Be direct and helpful | Be preachy or judgmental |
| Use simple language | Use excessive jargon |
| Acknowledge nuance | Oversimplify to the point of inaccuracy |
| Cite sources when needed | Make unsupported claims |
| Suggest consulting professionals for medical questions | Give specific medical advice |

## 6.4 Category Content Guidelines

### About FoodPulse
- Focus on mission, credibility, team
- Be transparent and personal
- Build trust

### Food & Nutrition Basics
- Answer fundamental questions
- Link to glossary for terms
- Include specific numbers where helpful

### Understanding Food Labels
- Explain what terms mean legally
- Help decode marketing claims
- Be factual about certifications

### Food Systems & Sustainability
- Explain how food systems work
- Present balanced perspectives
- Connect to consumer choices

### Using FoodPulse
- Answer site-specific questions
- Explain features
- Guide users to content

---

# 7. Technical Implementation

## 7.1 GROQ Queries

### All FAQs Grouped by Category

```groq
{
  "categories": [
    {
      "slug": "about-foodpulse",
      "title": "About FoodPulse",
      "icon": "🏠",
      "description": "Learn about our mission, team, and how we create content.",
      "faqs": *[_type == "faqItem" && category == "about-foodpulse" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    },
    {
      "slug": "food-nutrition",
      "title": "Food & Nutrition Basics",
      "icon": "🥗",
      "description": "Common questions about nutrients, diet, and healthy eating.",
      "faqs": *[_type == "faqItem" && category == "food-nutrition" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    },
    {
      "slug": "food-labels",
      "title": "Understanding Food Labels",
      "icon": "🏷️",
      "description": "Decode nutrition labels, certifications, and marketing claims.",
      "faqs": *[_type == "faqItem" && category == "food-labels" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    },
    {
      "slug": "food-systems",
      "title": "Food Systems & Sustainability",
      "icon": "🌾",
      "description": "Understand where food comes from and its environmental impact.",
      "faqs": *[_type == "faqItem" && category == "food-systems" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    },
    {
      "slug": "using-foodpulse",
      "title": "Using FoodPulse",
      "icon": "💻",
      "description": "Get the most out of FoodPulse content and features.",
      "faqs": *[_type == "faqItem" && category == "using-foodpulse" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    }
  ],
  "totalCount": count(*[_type == "faqItem" && isPublished == true]),
  "featuredFaqs": *[_type == "faqItem" && isFeatured == true && isPublished == true] | order(order asc) {
    _id,
    question,
    "slug": slug.current,
    shortAnswer,
    category
  }
}
```

### All FAQs for Schema (Flat List)

```groq
*[_type == "faqItem" && isPublished == true] | order(category asc, order asc) {
  question,
  shortAnswer
}
```

### Search FAQs

```groq
*[_type == "faqItem" && isPublished == true && (
  question match $query + "*" ||
  shortAnswer match $query + "*" ||
  pt::text(fullAnswer) match $query + "*"
)] | order(order asc) {
  _id,
  question,
  "slug": slug.current,
  shortAnswer,
  category
}[0...20]
```

## 7.2 Next.js Page Structure

```
src/
└── app/
    └── resources/
        └── faq/
            ├── page.tsx          # Main FAQ page
            └── loading.tsx       # Loading state
```

## 7.3 Page Component Structure

```tsx
// app/resources/faq/page.tsx
import { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { FAQJsonLd } from '@/components/FAQJsonLd'
import { FAQPage } from '@/components/faq/FAQPage'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Food & Nutrition FAQ | FoodPulse',
  description: 'Find answers to common questions about food, nutrition, food labels, and healthy eating. Evidence-based answers from FoodPulse.',
  openGraph: {
    title: 'Food & Nutrition FAQ | FoodPulse',
    description: 'Answers to your food and nutrition questions',
    url: 'https://foodpulse.co/resources/faq',
  },
}

export default async function FAQPageRoute() {
  const data = await sanityFetch({
    query: faqQuery, // The grouped query from above
  })

  // Flatten all FAQs for schema
  const allFaqs = data.categories.flatMap((cat) => cat.faqs)

  return (
    <>
      <FAQJsonLd faqs={allFaqs} />
      <FAQPage
        categories={data.categories}
        totalCount={data.totalCount}
        featuredFaqs={data.featuredFaqs}
      />
    </>
  )
}
```

## 7.4 FAQ Accordion Component

```tsx
// components/faq/FAQAccordion.tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

interface FAQItem {
  _id: string
  question: string
  slug: string
  shortAnswer: string
  fullAnswer?: any[] // Portable Text
  relatedArticle?: { title: string; slug: string }
  relatedGlossaryTerm?: { term: string; slug: string }
}

interface FAQAccordionProps {
  faqs: FAQItem[]
  categorySlug: string
}

export function FAQAccordion({ faqs, categorySlug }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
      {faqs.map((faq, index) => (
        <div
          key={faq._id}
          id={faq.slug}
          className={index < faqs.length - 1 ? 'border-b border-neutral-200' : ''}
        >
          {/* Question Button */}
          <button
            type="button"
            onClick={() => toggle(faq._id)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
            aria-expanded={openId === faq._id}
            aria-controls={`answer-${faq._id}`}
          >
            <span className="text-base lg:text-lg font-medium text-neutral-800 pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                openId === faq._id ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Answer Content */}
          <div
            id={`answer-${faq._id}`}
            className={`overflow-hidden transition-all duration-200 ${
              openId === faq._id ? 'max-h-[2000px]' : 'max-h-0'
            }`}
          >
            <div className="px-5 pb-5">
              {/* Short Answer */}
              <p className="text-neutral-700 leading-relaxed">
                {faq.shortAnswer}
              </p>

              {/* Full Answer (if exists) */}
              {faq.fullAnswer && faq.fullAnswer.length > 0 && (
                <div className="mt-4 prose prose-neutral prose-sm max-w-none">
                  <PortableText value={faq.fullAnswer} />
                </div>
              )}

              {/* Related Links */}
              <div className="mt-4 flex flex-wrap gap-3">
                {faq.relatedArticle && (
                  <Link
                    href={`/articles/${faq.relatedArticle.slug}`}
                    className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
                  >
                    Read full article →
                  </Link>
                )}
                {faq.relatedGlossaryTerm && (
                  <Link
                    href={`/glossary/${faq.relatedGlossaryTerm.slug}`}
                    className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
                  >
                    See in glossary →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
```

## 7.5 FAQ Search Component

```tsx
// components/faq/FAQSearch.tsx
'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'

interface FAQ {
  _id: string
  question: string
  slug: string
  shortAnswer: string
  category: string
}

interface FAQSearchProps {
  allFaqs: FAQ[]
  onResultClick: (categorySlug: string, faqSlug: string) => void
}

export function FAQSearch({ allFaqs, onResultClick }: FAQSearchProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const results = useMemo(() => {
    if (!query || query.length < 2) return []

    const lowerQuery = query.toLowerCase()
    return allFaqs
      .filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowerQuery) ||
          faq.shortAnswer.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
  }, [query, allFaqs])

  const handleSelect = (faq: FAQ) => {
    onResultClick(faq.category, faq.slug)
    setQuery('')
    setIsFocused(false)
  }

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full pl-12 pr-10 py-3 border-2 border-neutral-200 rounded-lg focus:border-green-500 focus:outline-none"
          aria-label="Search frequently asked questions"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden z-20">
          {results.map((faq) => (
            <button
              key={faq._id}
              type="button"
              onClick={() => handleSelect(faq)}
              className="w-full text-left px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0"
            >
              <p className="font-medium text-neutral-800">{faq.question}</p>
              <p className="text-sm text-neutral-500 mt-1 line-clamp-1">
                {faq.shortAnswer}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isFocused && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 z-20">
          <p className="text-neutral-600 text-center">
            No questions found for "{query}"
          </p>
        </div>
      )}
    </div>
  )
}
```

## 7.6 Sitemap Entry

```typescript
// app/sitemap.ts
export default async function sitemap() {
  return [
    // ... other pages
    {
      url: 'https://foodpulse.co/resources/faq',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
```

---

# 8. Starter FAQ Content

## 8.1 About FoodPulse (5 questions)

| Question | Short Answer |
|----------|--------------|
| What is FoodPulse? | FoodPulse is a free, evidence-based food education platform that helps consumers make informed decisions about nutrition, food systems, and healthy eating. We provide reliable, actionable content backed by scientific research. |
| Who writes FoodPulse content? | FoodPulse content is created by Etornam C. Tsyawo, a Food Systems Research Engineer and Doctoral Researcher at McGill University, along with a team of contributors with backgrounds in nutrition and food science. |
| Is FoodPulse free to use? | Yes, all FoodPulse content is completely free. We believe food education should be accessible to everyone. There are no paywalls, subscriptions, or hidden costs. |
| How does FoodPulse make money? | FoodPulse is currently funded independently. In the future, we may explore ethical advertising partnerships or affiliate links, but we will always maintain editorial independence and disclose any partnerships. |
| How can I contact FoodPulse? | You can reach us through our contact page or email us directly at hello@foodpulse.co. We welcome questions, feedback, and content suggestions. |

## 8.2 Food & Nutrition Basics (10 questions)

| Question | Short Answer |
|----------|--------------|
| What are macronutrients? | Macronutrients are the three main nutrients your body needs in large amounts: proteins, carbohydrates, and fats. They provide energy (calories) and serve essential functions like building tissue and fueling activity. |
| What are micronutrients? | Micronutrients are vitamins and minerals your body needs in small amounts. While they don't provide calories, they're essential for functions like immune health, bone strength, and energy production. |
| How much protein do I need daily? | Most adults need 0.8 grams of protein per kilogram of body weight daily, or about 46-56 grams. Active individuals, athletes, and older adults may need more—up to 1.2-2.0 grams per kilogram. |
| Are carbs bad for you? | No, carbohydrates are not inherently bad. They're your body's primary energy source. The key is choosing quality carbs like whole grains, fruits, and vegetables over refined carbs and added sugars. |
| What's the difference between saturated and unsaturated fat? | Saturated fats (found in meat, dairy, coconut oil) are solid at room temperature and may raise cholesterol. Unsaturated fats (found in olive oil, nuts, fish) are liquid and generally heart-healthy. |
| How much water should I drink daily? | A general guideline is 8 cups (64 oz) daily, but needs vary by body size, activity level, and climate. A better indicator is urine color—pale yellow suggests good hydration. |
| Is sugar bad for you? | Sugar itself isn't toxic, but most people consume too much added sugar. Natural sugars in fruits and dairy come with nutrients and fiber. Limit added sugars to less than 10% of daily calories. |
| What is fiber and why is it important? | Fiber is the indigestible part of plant foods. It supports digestive health, feeds beneficial gut bacteria, helps control blood sugar, and may reduce heart disease risk. Adults need 25-30 grams daily. |
| Do I need to take vitamins? | Most people can get adequate vitamins from a varied diet. However, some groups benefit from supplements: vitamin D for those with limited sun exposure, B12 for vegans, and prenatal vitamins for pregnant women. |
| What does "balanced diet" actually mean? | A balanced diet includes a variety of foods from all food groups in appropriate proportions: plenty of fruits and vegetables, whole grains, lean proteins, and healthy fats, while limiting added sugars, sodium, and saturated fats. |

## 8.3 Understanding Food Labels (8 questions)

| Question | Short Answer |
|----------|--------------|
| What does "organic" actually mean? | Organic foods are produced without synthetic pesticides, fertilizers, GMOs, antibiotics, or growth hormones. USDA Organic certification requires farms to meet strict standards verified by inspectors. |
| What does "natural" mean on food labels? | Unlike "organic," "natural" has no strict definition for most foods. The FDA generally considers it to mean no artificial colors, flavors, or synthetic substances, but it doesn't address farming practices. |
| What's the difference between "sell by" and "use by" dates? | "Sell by" tells stores when to remove products—you can still eat them after. "Use by" indicates peak quality. "Best by" is about quality, not safety. Most foods are safe past these dates if stored properly. |
| How do I read a nutrition facts label? | Start with serving size (all numbers are per serving), then check calories and nutrients you want to limit (saturated fat, sodium, added sugars) and nutrients you want more of (fiber, protein, vitamins). |
| What does "non-GMO" mean? | Non-GMO means the food contains no genetically modified organisms. The Non-GMO Project verification is the most common standard. Note that GMOs are considered safe by major scientific organizations. |
| What are "added sugars" on labels? | Added sugars are sugars and syrups added during processing, not naturally present in the food. The daily limit is 50 grams (200 calories) or less. Check both the grams and the % Daily Value. |
| What does "whole grain" mean on labels? | "Whole grain" means the grain includes all three parts: bran, germ, and endosperm. Look for "100% whole grain" or check that a whole grain is the first ingredient. |
| What does "free-range" mean for eggs? | Free-range eggs come from hens with some access to the outdoors. However, standards vary and outdoor access may be limited. "Pasture-raised" typically indicates more outdoor time. |

## 8.4 Food Systems & Sustainability (5 questions)

| Question | Short Answer |
|----------|--------------|
| What are "food miles"? | Food miles measure the distance food travels from production to consumer. While lower food miles can mean less transportation emissions, the full environmental impact depends on many factors including production methods. |
| What is a food desert? | A food desert is an area with limited access to affordable, nutritious food, often due to lack of grocery stores. This affects approximately 23.5 million Americans, particularly in low-income and rural areas. |
| What is sustainable food? | Sustainable food is produced in ways that protect the environment, support fair treatment of workers, and remain economically viable. This includes practices like reducing waste, conserving water, and minimizing emissions. |
| Is local food better for the environment? | Local food often has lower transportation emissions, but the full picture is complex. How food is grown matters more than distance—a local heated greenhouse may have higher emissions than food shipped from a favorable climate. |
| What is regenerative agriculture? | Regenerative agriculture focuses on restoring soil health through practices like cover cropping, minimal tillage, and diverse crop rotations. It aims to sequester carbon, improve water retention, and increase biodiversity. |

## 8.5 Using FoodPulse (5 questions)

| Question | Short Answer |
|----------|--------------|
| How often does FoodPulse publish new content? | We publish new articles weekly, with our newsletter going out every Sunday. We also regularly update existing content to reflect new research and guidelines. |
| Can I suggest a topic for FoodPulse to cover? | Absolutely! We welcome topic suggestions. Contact us through our contact page or reply to any newsletter. We prioritize topics that help consumers make better food decisions. |
| How do I subscribe to the FoodPulse newsletter? | Enter your email in the subscription box on any page or visit our newsletter page. We send weekly updates with new articles, food news, and practical tips. You can unsubscribe anytime. |
| Can I share FoodPulse content? | Yes, please share! All content can be shared on social media or via link. For republishing, please contact us first. We appreciate attribution and links back to the original. |
| How do I know FoodPulse information is accurate? | We cite peer-reviewed research and authoritative sources (NIH, WHO, USDA). Our founder has academic credentials in food systems research. We disclose any limitations and update content when new evidence emerges. |

---

# 9. Launch Checklist

## 9.1 Pre-Launch: Schema & Content

- [ ] Create `faqItem` document type in Sanity
- [ ] Add FAQ to Sanity desk structure
- [ ] Test schema with sample content
- [ ] Write minimum 25 FAQs (5 per category)
- [ ] Review all answers for accuracy
- [ ] Add related article/glossary links where applicable
- [ ] Set display order within categories

## 9.2 Pre-Launch: Technical

- [ ] Create `/resources/faq` page route
- [ ] Implement FAQ accordion component
- [ ] Implement category navigation (sticky)
- [ ] Implement search functionality
- [ ] Add JSON-LD FAQPage schema
- [ ] Test schema with Rich Results Test
- [ ] Test on mobile devices
- [ ] Test keyboard navigation
- [ ] Add loading states

## 9.3 Pre-Launch: SEO

- [ ] Configure meta tags
- [ ] Add Open Graph tags
- [ ] Add to sitemap
- [ ] Add internal links from existing pages
- [ ] Add FAQ to header/footer navigation

## 9.4 Launch Day

- [ ] Publish all FAQ content
- [ ] Test all accordion interactions
- [ ] Test all internal links
- [ ] Submit sitemap update to Search Console
- [ ] Announce on social media (optional)

## 9.5 Post-Launch (Week 1)

- [ ] Monitor for errors
- [ ] Check Search Console for indexing
- [ ] Track featured snippet appearances
- [ ] Review user behavior in analytics
- [ ] Add any missed questions

## 9.6 Ongoing Maintenance

### Weekly
- [ ] Review analytics for popular questions
- [ ] Check for questions in contact form to add
- [ ] Monitor featured snippet performance

### Monthly
- [ ] Add 2-5 new questions based on demand
- [ ] Update any outdated answers
- [ ] Review and improve underperforming FAQs

### Quarterly
- [ ] Full content audit
- [ ] Check all external links
- [ ] Update based on new research/guidelines
- [ ] Review category structure

---

# Summary

## Quick Reference

```
URL: /resources/faq
Schema: FAQPage (critical for rich results)
Target: Featured snippets, PAA boxes, voice search

Categories:
1. About FoodPulse (5 FAQs min)
2. Food & Nutrition Basics (10 FAQs min)
3. Understanding Food Labels (8 FAQs min)
4. Food Systems & Sustainability (5 FAQs min)
5. Using FoodPulse (5 FAQs min)

Total Launch Target: 25-35 FAQs
```

## Key Success Factors

1. **Implement FAQPage schema** — Without it, no rich results
2. **Write natural questions** — Match how people actually search
3. **Lead with direct answers** — First sentence answers the question
4. **Link to deeper content** — FAQs → Articles → Glossary
5. **Update regularly** — Add new questions based on user demand

## Expected Outcomes

| Timeframe | Expected Result |
|-----------|-----------------|
| Week 1 | Page indexed, schema validated |
| Month 1 | First featured snippets appear |
| Month 3 | 30%+ questions in featured snippets |
| Month 6 | Significant organic traffic from FAQ queries |

---

**Document Version:** 1.0  
**Created:** January 2025  
**For:** FoodPulse Development Team
