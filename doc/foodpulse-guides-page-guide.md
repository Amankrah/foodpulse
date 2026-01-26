# FoodPulse Guides Page — Complete Development Guide

## Building a Comprehensive Educational Resource Hub

**Version:** 1.0  
**Last Updated:** January 2025  
**URL:** `/guides` and `/guides/[slug]`  
**Priority:** High (Lead generation + Authority building)

---

# Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Strategic Vision](#2-strategic-vision)
3. [Information Architecture](#3-information-architecture)
4. [Sanity Schema Design](#4-sanity-schema-design)
5. [Page Specifications](#5-page-specifications)
6. [SEO Strategy](#6-seo-strategy)
7. [Lead Generation Integration](#7-lead-generation-integration)
8. [Technical Implementation](#8-technical-implementation)
9. [Content Strategy](#9-content-strategy)
10. [Launch Checklist](#10-launch-checklist)

---

# 1. Current State Analysis

## 1.1 Current Guides Page Content

| Guide | Type | Access | Status |
|-------|------|--------|--------|
| The Instant Food Decision Guide | PDF + Templates | Paid ($) | Featured product |
| The Sweet Swap Tracker | PDF | Free download | Active |
| Never Skip a Nutrition Panel Again | PDF | Free download | Active |
| Before You Buy The Supplement | PDF | Free download | Active |
| Carousels | Interactive | Free | Incomplete |

## 1.2 Current Issues

| Issue | Impact | Priority |
|-------|--------|----------|
| PDF-only format | No SEO value, not indexable | 🔴 High |
| No dedicated guide pages | Missing long-tail traffic | 🔴 High |
| No lead capture on free guides | Missed email opportunities | 🔴 High |
| No categorization | Hard to navigate as library grows | 🟡 Medium |
| No schema markup | No rich results | 🟡 Medium |
| "Carousels" section incomplete | Confusing UX | 🟡 Medium |

## 1.3 Opportunity

Transform static PDF downloads into a dynamic guide library with:
- **Web-based guides** for SEO (while still offering PDF downloads)
- **Lead capture** before downloads
- **Tiered access** (free preview → email gate → premium)
- **Rich content types** (multi-chapter guides, checklists, calculators)

---

# 2. Strategic Vision

## 2.1 Guide Types

### Type 1: Quick Guides (1-2 pages)
- **Format:** Single page with downloadable PDF
- **Purpose:** Quick wins, checklists, cheat sheets
- **Access:** Free (optional email gate)
- **Examples:** 
  - "5 Questions Before Buying Supplements"
  - "Reading Nutrition Labels Cheat Sheet"
  - "Healthy Pantry Staples List"

### Type 2: Comprehensive Guides (Multi-chapter)
- **Format:** Multi-page web guide with chapters
- **Purpose:** Deep dives, educational series
- **Access:** Free web content + gated PDF download
- **Examples:**
  - "Complete Guide to Macronutrients"
  - "Understanding Food Labels: A-Z"
  - "Meal Planning 101"

### Type 3: Premium Guides (Paid)
- **Format:** Premium content behind paywall
- **Purpose:** Revenue, premium value
- **Access:** Paid (via Gumroad, BMC, or Stripe)
- **Examples:**
  - "The Instant Food Decision Guide" (existing)
  - "30-Day Meal Planning System"
  - "Food Budget Mastery Course"

### Type 4: Interactive Tools
- **Format:** Web-based calculators/tools
- **Purpose:** Engagement, practical utility
- **Access:** Free (drives traffic)
- **Examples:**
  - "Protein Calculator"
  - "Hydration Tracker"
  - "Grocery Budget Planner"

## 2.2 Content Funnel

```
AWARENESS          CONSIDERATION         CONVERSION
    │                    │                    │
    ▼                    ▼                    ▼
┌─────────┐        ┌─────────┐         ┌─────────┐
│  Blog   │        │  Free   │         │ Premium │
│Articles │───────▶│ Guides  │────────▶│ Guides  │
│         │        │(Gated)  │         │ (Paid)  │
└─────────┘        └─────────┘         └─────────┘
                        │
                        ▼
                   Email List
                        │
                        ▼
                   Newsletter
                        │
                        ▼
                   Coaching/
                   Products
```

## 2.3 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Guide page views | 500+/month per guide | GA4 |
| PDF downloads | 100+/month | Download tracking |
| Email captures | 50+/month | Email platform |
| Paid conversions | 5-10% of engaged users | Payment platform |
| Time on guide | 3+ minutes | GA4 |
| Guide → Article clicks | 20%+ | GA4 events |

---

# 3. Information Architecture

## 3.1 URL Structure

```
/guides                              → Guide library (hub page)
/guides/[slug]                       → Individual guide page
/guides/category/[category]          → Category filter (optional)

Examples:
/guides                              → All guides
/guides/macronutrients-complete-guide
/guides/reading-nutrition-labels
/guides/meal-planning-101
/guides/supplement-checklist
/guides/category/nutrition           → Nutrition guides
/guides/category/meal-planning       → Meal planning guides
```

## 3.2 Navigation

### Header
```
Resources ▼
├── Guides ← Main hub
├── Glossary
├── FAQ
└── Newsletter
```

### Guide Hub Page
```
/guides
├── Featured Guide (hero)
├── Category Filters
├── Guide Grid
│   ├── Free Guides
│   ├── Premium Guides (badge)
│   └── Tools (badge)
└── Newsletter CTA
```

### Individual Guide Page
```
/guides/[slug]
├── Hero (title, description, image)
├── Quick Stats (reading time, difficulty, type)
├── Table of Contents (for multi-chapter)
├── Main Content
│   ├── Chapters/Sections
│   ├── Inline CTAs
│   └── Related Resources
├── Download CTA (gated or ungated)
├── Related Guides
└── Newsletter CTA
```

## 3.3 Page Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                     GUIDE HUB PAGE                           │
│                        /guides                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   FEATURED GUIDE                        │ │
│  │  "The Instant Food Decision Guide"                      │ │
│  │  [Get Yours Today →]                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  [All] [Nutrition] [Meal Planning] [Food Labels] [Tools]│ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │    GUIDE     │ │    GUIDE     │ │    GUIDE     │        │
│  │    CARD      │ │    CARD      │ │    CARD      │        │
│  │  [FREE]      │ │  [PREMIUM]   │ │  [TOOL]      │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │    GUIDE     │ │    GUIDE     │ │    GUIDE     │        │
│  │    CARD      │ │    CARD      │ │    CARD      │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  INDIVIDUAL GUIDE PAGE                       │
│                   /guides/[slug]                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Breadcrumb: Home > Guides > Macronutrients Guide           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                      HERO                               │ │
│  │  [Category Badge]                                       │ │
│  │  [H1] The Complete Guide to Macronutrients             │ │
│  │  [Subtitle] Everything you need to know about...       │ │
│  │  [Stats] 15 min read • Beginner • Free                 │ │
│  │  [CTA] Download PDF →                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────┬───────────────────────────────┐ │
│  │                        │                               │ │
│  │     MAIN CONTENT       │       SIDEBAR (sticky)        │ │
│  │                        │                               │ │
│  │  ## What You'll Learn  │  TABLE OF CONTENTS            │ │
│  │  • Point 1             │  • What are Macros?           │ │
│  │  • Point 2             │  • Protein                    │ │
│  │  • Point 3             │  • Carbohydrates              │ │
│  │                        │  • Fats                       │ │
│  │  ## Chapter 1          │  • How Much You Need          │ │
│  │  Content...            │  • Tracking Tips              │ │
│  │                        │                               │ │
│  │  ## Chapter 2          │  ─────────────────────────    │ │
│  │  Content...            │                               │ │
│  │                        │  DOWNLOAD BOX                 │ │
│  │  [Inline CTA]          │  Get the PDF version          │ │
│  │                        │  [Download Free →]            │ │
│  │  ## Chapter 3          │                               │ │
│  │  Content...            │  ─────────────────────────    │ │
│  │                        │                               │ │
│  │  ## Key Takeaways      │  RELATED GUIDES               │ │
│  │  • Takeaway 1          │  • Protein Guide              │ │
│  │  • Takeaway 2          │  • Meal Planning 101          │ │
│  │                        │                               │ │
│  └────────────────────────┴───────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  RELATED GUIDES                         │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐               │ │
│  │  │  Guide   │ │  Guide   │ │  Guide   │               │ │
│  │  └──────────┘ └──────────┘ └──────────┘               │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

# 4. Sanity Schema Design

## 4.1 Guide Document Type

```typescript
// src/sanity/schemaTypes/documents/guideType.ts
import {defineField, defineType} from 'sanity'

export const guideType = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media & Files'},
    {name: 'access', title: 'Access & Pricing'},
    {name: 'metadata', title: 'Metadata'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // === CONTENT GROUP ===
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Guide title (e.g., "The Complete Guide to Macronutrients")',
      validation: (rule) => rule.required().max(100),
      group: 'content',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short compelling subtitle',
      validation: (rule) => rule.max(150),
      group: 'content',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief description for cards and meta (150-200 chars)',
      validation: (rule) => rule.required().min(100).max(250),
      rows: 3,
      group: 'content',
    }),

    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
      description: 'Introduction shown before chapters',
      group: 'content',
    }),

    defineField({
      name: 'whatYoullLearn',
      title: 'What You\'ll Learn',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bullet points of key takeaways (shown in hero)',
      validation: (rule) => rule.min(3).max(6),
      group: 'content',
    }),

    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          title: 'Chapter',
          fields: [
            {
              name: 'title',
              title: 'Chapter Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'slug',
              title: 'Chapter Slug',
              type: 'slug',
              options: {source: 'title'},
              description: 'For anchor links',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'},
                    {title: 'Quote', value: 'blockquote'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Code', value: 'code'},
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
                      {
                        name: 'glossaryLink',
                        type: 'object',
                        title: 'Glossary Term',
                        fields: [
                          {
                            name: 'term',
                            type: 'reference',
                            to: [{type: 'glossaryTerm'}],
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
                {
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    {name: 'alt', type: 'string', title: 'Alt Text', validation: (rule) => rule.required()},
                    {name: 'caption', type: 'string', title: 'Caption'},
                  ],
                },
                {
                  type: 'object',
                  name: 'callout',
                  title: 'Callout Box',
                  fields: [
                    {
                      name: 'type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Info', value: 'info'},
                          {title: 'Tip', value: 'tip'},
                          {title: 'Warning', value: 'warning'},
                          {title: 'Example', value: 'example'},
                        ],
                      },
                    },
                    {name: 'title', type: 'string', title: 'Title (optional)'},
                    {name: 'content', type: 'text', title: 'Content'},
                  ],
                  preview: {
                    select: {type: 'type', content: 'content'},
                    prepare({type, content}) {
                      const icons = {info: 'ℹ️', tip: '💡', warning: '⚠️', example: '📝'}
                      return {
                        title: `${icons[type] || '📌'} Callout`,
                        subtitle: content?.slice(0, 50) + '...',
                      }
                    },
                  },
                },
                {
                  type: 'object',
                  name: 'inlineCta',
                  title: 'Inline CTA',
                  fields: [
                    {name: 'text', type: 'string', title: 'CTA Text'},
                    {name: 'buttonText', type: 'string', title: 'Button Text'},
                    {name: 'link', type: 'url', title: 'Link'},
                  ],
                  preview: {
                    select: {text: 'text'},
                    prepare({text}) {
                      return {title: '📣 CTA', subtitle: text}
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {title: `📖 ${title}`}
            },
          },
        },
      ],
      description: 'Guide chapters/sections',
      group: 'content',
    }),

    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Summary points shown at the end',
      group: 'content',
    }),

    // === MEDIA GROUP ===
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt Text', validation: (rule) => rule.required()},
      ],
      validation: (rule) => rule.required(),
      group: 'media',
    }),

    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Square image for cards (optional, uses featured if not set)',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt Text'},
      ],
      group: 'media',
    }),

    defineField({
      name: 'downloadFile',
      title: 'Downloadable PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'PDF version of the guide',
      group: 'media',
    }),

    defineField({
      name: 'downloadFileName',
      title: 'Download File Name',
      type: 'string',
      description: 'Name for the downloaded file (e.g., "macronutrients-guide-foodpulse.pdf")',
      group: 'media',
    }),

    // === ACCESS GROUP ===
    defineField({
      name: 'guideType',
      title: 'Guide Type',
      type: 'string',
      options: {
        list: [
          {title: 'Quick Guide', value: 'quick'},
          {title: 'Comprehensive Guide', value: 'comprehensive'},
          {title: 'Premium Guide', value: 'premium'},
          {title: 'Interactive Tool', value: 'tool'},
        ],
        layout: 'radio',
      },
      initialValue: 'comprehensive',
      validation: (rule) => rule.required(),
      group: 'access',
    }),

    defineField({
      name: 'accessType',
      title: 'Access Type',
      type: 'string',
      options: {
        list: [
          {title: 'Free (No Gate)', value: 'free'},
          {title: 'Email Gated', value: 'email-gated'},
          {title: 'Paid', value: 'paid'},
        ],
        layout: 'radio',
      },
      initialValue: 'free',
      validation: (rule) => rule.required(),
      group: 'access',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in USD (for paid guides)',
      hidden: ({document}) => document?.accessType !== 'paid',
      group: 'access',
    }),

    defineField({
      name: 'purchaseLink',
      title: 'Purchase Link',
      type: 'url',
      description: 'Link to purchase (Gumroad, BMC, Stripe, etc.)',
      hidden: ({document}) => document?.accessType !== 'paid',
      group: 'access',
    }),

    defineField({
      name: 'previewContent',
      title: 'Preview Content',
      type: 'text',
      description: 'Teaser content shown before paywall (for paid guides)',
      hidden: ({document}) => document?.accessType !== 'paid',
      rows: 4,
      group: 'access',
    }),

    // === METADATA GROUP ===
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Nutrition Basics', value: 'nutrition'},
          {title: 'Meal Planning', value: 'meal-planning'},
          {title: 'Food Labels', value: 'food-labels'},
          {title: 'Healthy Eating', value: 'healthy-eating'},
          {title: 'Food Systems', value: 'food-systems'},
          {title: 'Tools & Calculators', value: 'tools'},
        ],
      },
      validation: (rule) => rule.required(),
      group: 'metadata',
    }),

    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
      initialValue: 'beginner',
      group: 'metadata',
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time',
      validation: (rule) => rule.min(1),
      group: 'metadata',
    }),

    defineField({
      name: 'relatedGuides',
      title: 'Related Guides',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'guide'}]}],
      validation: (rule) => rule.max(4).unique(),
      group: 'metadata',
    }),

    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
      validation: (rule) => rule.max(4).unique(),
      group: 'metadata',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'metadata',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      group: 'metadata',
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Guide',
      type: 'boolean',
      description: 'Show in featured section on hub page',
      initialValue: false,
      group: 'metadata',
    }),

    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      group: 'metadata',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'metadata',
    }),

    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      group: 'metadata',
    }),

    // === SEO GROUP ===
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (60 chars max)',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description (155-160 chars)',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          options: {layout: 'tags'},
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Custom OG image (1200x630px)',
        }),
      ],
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category',
      guideType: 'guideType',
      accessType: 'accessType',
      isPublished: 'isPublished',
      media: 'featuredImage',
    },
    prepare({title, category, guideType, accessType, isPublished, media}) {
      const statusIcon = isPublished ? '✓' : '○'
      const typeIcon = {
        quick: '📄',
        comprehensive: '📚',
        premium: '💎',
        tool: '🔧',
      }[guideType] || '📖'
      const accessIcon = {
        free: '',
        'email-gated': '📧',
        paid: '💰',
      }[accessType] || ''

      return {
        title: `${statusIcon} ${title}`,
        subtitle: `${typeIcon} ${category} ${accessIcon}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Recently Published',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{field: 'category', direction: 'asc'}, {field: 'title', direction: 'asc'}],
    },
  ],
})
```

## 4.2 Register Schema

```typescript
// src/sanity/schemaTypes/index.ts
import {guideType} from './documents/guideType'

export const schemaTypes = [
  // ... existing types
  guideType,
]
```

## 4.3 Desk Structure

```typescript
// In structure.ts
S.listItem()
  .title('Guides')
  .child(
    S.list()
      .title('Guides')
      .items([
        // All Guides
        S.listItem()
          .title('All Guides')
          .child(
            S.documentTypeList('guide')
              .title('All Guides')
              .defaultOrdering([{field: 'title', direction: 'asc'}])
          ),

        // By Type
        S.listItem()
          .title('By Type')
          .child(
            S.list()
              .title('Guide Types')
              .items([
                S.listItem()
                  .title('📄 Quick Guides')
                  .child(
                    S.documentList()
                      .title('Quick Guides')
                      .filter('_type == "guide" && guideType == "quick"')
                  ),
                S.listItem()
                  .title('📚 Comprehensive Guides')
                  .child(
                    S.documentList()
                      .title('Comprehensive Guides')
                      .filter('_type == "guide" && guideType == "comprehensive"')
                  ),
                S.listItem()
                  .title('💎 Premium Guides')
                  .child(
                    S.documentList()
                      .title('Premium Guides')
                      .filter('_type == "guide" && guideType == "premium"')
                  ),
                S.listItem()
                  .title('🔧 Tools')
                  .child(
                    S.documentList()
                      .title('Interactive Tools')
                      .filter('_type == "guide" && guideType == "tool"')
                  ),
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
                  .title('🥗 Nutrition')
                  .child(
                    S.documentList()
                      .title('Nutrition Guides')
                      .filter('_type == "guide" && category == "nutrition"')
                  ),
                S.listItem()
                  .title('📅 Meal Planning')
                  .child(
                    S.documentList()
                      .title('Meal Planning Guides')
                      .filter('_type == "guide" && category == "meal-planning"')
                  ),
                S.listItem()
                  .title('🏷️ Food Labels')
                  .child(
                    S.documentList()
                      .title('Food Label Guides')
                      .filter('_type == "guide" && category == "food-labels"')
                  ),
                // ... other categories
              ])
          ),

        S.divider(),

        // By Access
        S.listItem()
          .title('Free Guides')
          .child(
            S.documentList()
              .title('Free Guides')
              .filter('_type == "guide" && accessType == "free"')
          ),
        S.listItem()
          .title('Email Gated')
          .child(
            S.documentList()
              .title('Email Gated')
              .filter('_type == "guide" && accessType == "email-gated"')
          ),
        S.listItem()
          .title('💰 Paid Guides')
          .child(
            S.documentList()
              .title('Paid Guides')
              .filter('_type == "guide" && accessType == "paid"')
          ),

        S.divider(),

        // Featured
        S.listItem()
          .title('⭐ Featured')
          .child(
            S.documentList()
              .title('Featured Guides')
              .filter('_type == "guide" && isFeatured == true')
          ),

        // Drafts
        S.listItem()
          .title('Drafts')
          .child(
            S.documentList()
              .title('Unpublished')
              .filter('_type == "guide" && isPublished != true')
          ),
      ])
  ),
```

---

# 5. Page Specifications

## 5.1 Guide Hub Page (`/guides`)

### Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                     HERO (bg: green-50)                      │
│                                                              │
│  [Breadcrumb] Home > Guides                                 │
│                                                              │
│  [H1] Free Guides & Resources                               │
│                                                              │
│  [Subtitle] Practical guides to help you make better        │
│  food decisions. Download, learn, and take action.          │
│                                                              │
│  [Stats] 12 guides • Free & Premium • Downloadable PDFs     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Featured Guide Section

```
┌─────────────────────────────────────────────────────────────┐
│              FEATURED GUIDE (Full Width Card)                │
│                                                              │
│  ┌────────────────────────┬─────────────────────────────┐   │
│  │                        │                              │   │
│  │       [IMAGE]          │  [PREMIUM BADGE]            │   │
│  │                        │                              │   │
│  │                        │  The Instant Food Decision  │   │
│  │                        │  Guide                       │   │
│  │                        │                              │   │
│  │                        │  Cut out the decision       │   │
│  │                        │  fatigue completely...      │   │
│  │                        │                              │   │
│  │                        │  ✓ Comprehensive list       │   │
│  │                        │  ✓ Personalized sections    │   │
│  │                        │  ✓ Weekly meal template     │   │
│  │                        │                              │   │
│  │                        │  [Get Yours - $X →]         │   │
│  │                        │                              │   │
│  └────────────────────────┴─────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Category Filters

```
┌─────────────────────────────────────────────────────────────┐
│                    CATEGORY FILTERS                          │
│                                                              │
│  [All Guides] [Nutrition] [Meal Planning] [Food Labels]     │
│  [Healthy Eating] [Food Systems] [Tools]                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Guide Cards Grid

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ## Free Guides                                              │
│                                                              │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│  │    [IMAGE]     │ │    [IMAGE]     │ │    [IMAGE]     │   │
│  │                │ │                │ │                │   │
│  │ [FREE]         │ │ [FREE]         │ │ [📧 EMAIL]     │   │
│  │                │ │                │ │                │   │
│  │ Reading        │ │ Sweet Swap     │ │ Supplement     │   │
│  │ Nutrition      │ │ Tracker        │ │ Checklist      │   │
│  │ Labels         │ │                │ │                │   │
│  │                │ │                │ │                │   │
│  │ 5 min • Easy   │ │ 3 min • Easy   │ │ 5 min • Easy   │   │
│  │                │ │                │ │                │   │
│  │ [Read Guide →] │ │ [Read Guide →] │ │ [Get Guide →]  │   │
│  └────────────────┘ └────────────────┘ └────────────────┘   │
│                                                              │
│  ## Premium Guides                                           │
│                                                              │
│  ┌────────────────┐ ┌────────────────┐                      │
│  │    [IMAGE]     │ │    [IMAGE]     │                      │
│  │                │ │                │                      │
│  │ [PREMIUM $X]   │ │ [PREMIUM $X]   │                      │
│  │                │ │                │                      │
│  │ Instant Food   │ │ 30-Day Meal    │                      │
│  │ Decision       │ │ Planning       │                      │
│  │ Guide          │ │ System         │                      │
│  │                │ │                │                      │
│  │ [Get Guide →]  │ │ [Get Guide →]  │                      │
│  └────────────────┘ └────────────────┘                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Guide Card Component Specs

```css
/* Card Container */
background: white;
border: 1px solid var(--neutral-200);
border-radius: 16px;
overflow: hidden;
transition: all 0.2s;

/* Hover State */
:hover {
  border-color: var(--green-300);
  box-shadow: 0 8px 24px rgba(0, 51, 23, 0.1);
  transform: translateY(-2px);
}

/* Image */
aspect-ratio: 4/3;
object-fit: cover;

/* Badge */
position: absolute;
top: 12px;
left: 12px;
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 600;

/* Free Badge */
background: var(--green-100);
color: var(--green-700);

/* Email Badge */
background: var(--blue-100);
color: var(--blue-700);

/* Premium Badge */
background: var(--amber-100);
color: var(--amber-700);

/* Title */
font-size: 18px;
font-weight: 600;
color: var(--neutral-900);
margin-bottom: 8px;

/* Description */
font-size: 14px;
color: var(--neutral-600);
line-height: 1.5;
display: -webkit-box;
-webkit-line-clamp: 2;
overflow: hidden;

/* Meta */
font-size: 13px;
color: var(--neutral-500);
margin-top: auto;

/* CTA Button */
width: 100%;
padding: 12px;
background: var(--green-600);
color: white;
font-weight: 500;
border-radius: 8px;
text-align: center;
```

## 5.2 Individual Guide Page (`/guides/[slug]`)

### Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                   GUIDE HERO                                 │
│                                                              │
│  [Breadcrumb] Home > Guides > Macronutrients Guide          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [Nutrition] [Beginner] [FREE]                         │   │
│  │                                                        │   │
│  │ [H1] The Complete Guide to Macronutrients            │   │
│  │                                                        │   │
│  │ [Subtitle] Everything you need to know about         │   │
│  │ proteins, carbs, and fats to fuel your body right.   │   │
│  │                                                        │   │
│  │ ┌────────────────────────────────────────────────┐   │   │
│  │ │ 📖 15 min read  •  👤 Etornam Tsyawo  •  📅 Jan 2025│   │
│  │ └────────────────────────────────────────────────┘   │   │
│  │                                                        │   │
│  │ ## What You'll Learn                                  │   │
│  │ ✓ What macronutrients are and why they matter        │   │
│  │ ✓ How much protein, carbs, and fat you need          │   │
│  │ ✓ Practical tips for balancing your meals            │   │
│  │ ✓ Common misconceptions debunked                     │   │
│  │                                                        │   │
│  │ [Download PDF →]  [Jump to Guide ↓]                   │   │
│  │                                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  [FEATURED IMAGE - Full Width]                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Content Layout (2-Column)

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌────────────────────────────┬─────────────────────────┐   │
│  │                            │                          │   │
│  │      MAIN CONTENT          │     SIDEBAR (sticky)     │   │
│  │         (2/3)              │         (1/3)            │   │
│  │                            │                          │   │
│  │  ## Introduction           │  TABLE OF CONTENTS       │   │
│  │                            │  ─────────────────────   │   │
│  │  Intro paragraph...        │  • Introduction          │   │
│  │                            │  • What are Macros?      │   │
│  │  ─────────────────────     │  • Protein               │   │
│  │                            │  • Carbohydrates         │   │
│  │  ## Chapter 1: What Are    │  • Fats                  │   │
│  │  Macronutrients?           │  • How Much You Need     │   │
│  │                            │  • Tracking Tips         │   │
│  │  Content with images,      │  • Key Takeaways         │   │
│  │  callouts, examples...     │                          │   │
│  │                            │  ─────────────────────   │   │
│  │  [CALLOUT BOX]             │                          │   │
│  │  💡 Did you know...        │  DOWNLOAD PDF            │   │
│  │                            │  ┌─────────────────────┐ │   │
│  │  ─────────────────────     │  │ Get the full guide  │ │   │
│  │                            │  │ as a PDF to read    │ │   │
│  │  ## Chapter 2: Protein     │  │ offline.            │ │   │
│  │                            │  │                     │ │   │
│  │  Content...                │  │ [Download Free →]   │ │   │
│  │                            │  └─────────────────────┘ │   │
│  │  ─────────────────────     │                          │   │
│  │                            │  ─────────────────────   │   │
│  │  [INLINE CTA]              │                          │   │
│  │  Want more? Get our        │  RELATED GUIDES          │   │
│  │  meal planning guide →     │  • Protein Guide         │   │
│  │                            │  • Meal Planning 101     │   │
│  │  ─────────────────────     │  • Reading Labels        │   │
│  │                            │                          │   │
│  │  ## Chapter 3: Carbs       │                          │   │
│  │                            │                          │   │
│  │  Content...                │                          │   │
│  │                            │                          │   │
│  │  ─────────────────────     │                          │   │
│  │                            │                          │   │
│  │  ## Key Takeaways          │                          │   │
│  │  ✓ Takeaway 1              │                          │   │
│  │  ✓ Takeaway 2              │                          │   │
│  │  ✓ Takeaway 3              │                          │   │
│  │                            │                          │   │
│  └────────────────────────────┴─────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

# 6. SEO Strategy

## 6.1 Keyword Targeting

### Hub Page
```
Primary: food guides, nutrition guides, healthy eating guides
Secondary: free nutrition resources, food education, meal planning guides
Long-tail: free guide to macronutrients, how to read nutrition labels guide
```

### Individual Guide Keywords

| Guide | Primary Keyword | Secondary Keywords |
|-------|-----------------|-------------------|
| Macronutrients Guide | macronutrients guide | what are macros, protein carbs fats guide |
| Reading Labels | how to read nutrition labels | food label guide, nutrition facts guide |
| Meal Planning | meal planning guide | weekly meal planning, meal prep guide |
| Supplement Guide | supplement guide | should i take supplements, vitamin guide |

## 6.2 Meta Tags

### Hub Page
```html
<title>Free Guides & Resources | Food & Nutrition Guides | FoodPulse</title>
<meta name="description" content="Download free guides on nutrition, meal planning, and healthy eating. Practical, evidence-based resources to help you make better food decisions." />
```

### Individual Guide Template
```html
<title>[Guide Title] | Free Guide | FoodPulse</title>
<meta name="description" content="[Excerpt]. Download this free guide to [benefit]." />

Example:
<title>The Complete Guide to Macronutrients | Free Guide | FoodPulse</title>
<meta name="description" content="Learn everything about proteins, carbs, and fats. This free macronutrients guide explains what they are, how much you need, and how to balance your meals." />
```

## 6.3 Schema Markup

### Guide Page - Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Complete Guide to Macronutrients",
  "description": "Everything you need to know about proteins, carbs, and fats.",
  "image": "https://foodpulse.co/images/macros-guide.jpg",
  "author": {
    "@type": "Person",
    "name": "Etornam C. Tsyawo",
    "url": "https://foodpulse.co/about"
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
  "dateModified": "2025-01-20",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://foodpulse.co/guides/macronutrients-complete-guide"
  }
}
```

### Hub Page - ItemList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "FoodPulse Guides",
  "description": "Free and premium guides on food and nutrition",
  "numberOfItems": 12,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "The Complete Guide to Macronutrients",
      "url": "https://foodpulse.co/guides/macronutrients-complete-guide"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "How to Read Nutrition Labels",
      "url": "https://foodpulse.co/guides/reading-nutrition-labels"
    }
  ]
}
```

### Product Schema (for Paid Guides)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "The Instant Food Decision Guide",
  "description": "Cut out the decision fatigue completely. Your go-to resource for simplifying food decisions.",
  "image": "https://foodpulse.co/images/instant-food-decision-guide.jpg",
  "brand": {
    "@type": "Brand",
    "name": "FoodPulse"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://buymeacoffee.com/etornamctsyawo/e/247058",
    "priceCurrency": "USD",
    "price": "9.99",
    "availability": "https://schema.org/InStock"
  }
}
```

---

# 7. Lead Generation Integration

## 7.1 Email Gate Component

For email-gated guides, show a form before download:

```tsx
// components/guides/EmailGate.tsx
'use client'

import { useState } from 'react'
import { Download, CheckCircle } from 'lucide-react'

interface EmailGateProps {
  guideTitle: string
  guideSlug: string
  downloadUrl: string
  listId?: string // ConvertKit/Mailchimp list
}

export function EmailGate({ guideTitle, guideSlug, downloadUrl, listId }: EmailGateProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Submit to your email service
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: `guide-${guideSlug}`,
          listId,
        }),
      })

      if (!response.ok) throw new Error('Subscription failed')

      setIsSuccess(true)
      
      // Track download event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'guide_download', {
          guide_title: guideTitle,
          guide_slug: guideSlug,
        })
      }

      // Trigger download
      window.open(downloadUrl, '_blank')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          You're all set!
        </h3>
        <p className="text-green-700 mb-4">
          Your download should start automatically. If not, click below.
        </p>
        <a
          href={downloadUrl}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          download
        >
          <Download className="w-4 h-4" />
          Download Again
        </a>
      </div>
    )
  }

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
        Get This Free Guide
      </h3>
      <p className="text-neutral-600 mb-4">
        Enter your email to download "{guideTitle}" as a PDF.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:outline-none"
        />
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {isSubmitting ? 'Processing...' : 'Download Free Guide'}
        </button>
        <p className="text-xs text-neutral-500 text-center">
          We'll also send you our weekly newsletter. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}
```

## 7.2 Download Tracking

```tsx
// components/guides/DownloadButton.tsx
'use client'

import { Download } from 'lucide-react'

interface DownloadButtonProps {
  guideTitle: string
  guideSlug: string
  downloadUrl: string
  fileName?: string
}

export function DownloadButton({
  guideTitle,
  guideSlug,
  downloadUrl,
  fileName,
}: DownloadButtonProps) {
  const handleDownload = () => {
    // Track download event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'guide_download', {
        guide_title: guideTitle,
        guide_slug: guideSlug,
      })
    }
  }

  return (
    <a
      href={downloadUrl}
      download={fileName}
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
    >
      <Download className="w-4 h-4" />
      Download PDF
    </a>
  )
}
```

## 7.3 Paid Guide CTA

```tsx
// components/guides/PurchaseCta.tsx
interface PurchaseCtaProps {
  title: string
  price: number
  purchaseLink: string
  features?: string[]
}

export function PurchaseCta({ title, price, purchaseLink, features }: PurchaseCtaProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
          Premium Guide
        </span>
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
      {features && features.length > 0 && (
        <ul className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-neutral-700">
              <span className="text-amber-600">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-neutral-900">
          ${price.toFixed(2)}
        </span>
        <a
          href={purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-colors"
        >
          Get This Guide →
        </a>
      </div>
    </div>
  )
}
```

---

# 8. Technical Implementation

## 8.1 GROQ Queries

### Guide Hub Query

```groq
{
  "featured": *[_type == "guide" && isFeatured == true && isPublished == true][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    excerpt,
    featuredImage,
    guideType,
    accessType,
    price,
    purchaseLink,
    whatYoullLearn,
    category,
    difficulty,
    readingTime
  },
  "guides": *[_type == "guide" && isPublished == true && isFeatured != true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    thumbnailImage,
    guideType,
    accessType,
    price,
    category,
    difficulty,
    readingTime,
    tags
  },
  "categories": array::unique(*[_type == "guide" && isPublished == true].category),
  "totalCount": count(*[_type == "guide" && isPublished == true])
}
```

### Individual Guide Query

```groq
*[_type == "guide" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  subtitle,
  excerpt,
  introduction,
  whatYoullLearn,
  chapters[] {
    title,
    "slug": slug.current,
    content
  },
  keyTakeaways,
  featuredImage,
  "downloadUrl": downloadFile.asset->url,
  downloadFileName,
  guideType,
  accessType,
  price,
  purchaseLink,
  previewContent,
  category,
  difficulty,
  readingTime,
  "author": author->{
    name,
    image,
    bio
  },
  "relatedGuides": relatedGuides[]->{
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    guideType,
    accessType
  },
  "relatedArticles": relatedArticles[]->{
    title,
    "slug": slug.current,
    excerpt,
    "category": category->{title, slug}
  },
  tags,
  seo,
  publishedAt,
  updatedAt
}
```

### Guides by Category Query

```groq
*[_type == "guide" && isPublished == true && category == $category] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  guideType,
  accessType,
  category,
  difficulty,
  readingTime
}
```

## 8.2 Next.js Page Structure

```
src/
└── app/
    └── guides/
        ├── page.tsx              # Hub page /guides
        ├── [slug]/
        │   └── page.tsx          # Individual guide /guides/[slug]
        ├── category/
        │   └── [category]/
        │       └── page.tsx      # Category filter (optional)
        └── loading.tsx           # Loading state
```

## 8.3 File Structure for Components

```
src/
└── components/
    └── guides/
        ├── GuideCard.tsx         # Card for hub page
        ├── GuideFeatured.tsx     # Featured guide hero
        ├── GuideHero.tsx         # Individual guide hero
        ├── GuideContent.tsx      # Main content renderer
        ├── GuideSidebar.tsx      # Sticky sidebar (TOC, download)
        ├── GuideTableOfContents.tsx
        ├── EmailGate.tsx         # Email capture
        ├── DownloadButton.tsx    # Download tracking
        ├── PurchaseCta.tsx       # Paid guide CTA
        └── GuideJsonLd.tsx       # Schema markup
```

## 8.4 Static Generation

```typescript
// app/guides/[slug]/page.tsx

export async function generateStaticParams() {
  const guides = await sanityFetch({
    query: `*[_type == "guide" && isPublished == true]{ "slug": slug.current }`,
  })
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const guide = await getGuide(params.slug)
  
  if (!guide) return { title: 'Guide Not Found' }
  
  return {
    title: guide.seo?.metaTitle || `${guide.title} | FoodPulse Guide`,
    description: guide.seo?.metaDescription || guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      images: guide.seo?.ogImage || guide.featuredImage,
      type: 'article',
    },
  }
}
```

## 8.5 Sitemap Entry

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const guides = await sanityFetch({
    query: `*[_type == "guide" && isPublished == true]{
      "slug": slug.current,
      publishedAt,
      updatedAt
    }`,
  })

  const guideUrls = guides.map((guide) => ({
    url: `https://foodpulse.co/guides/${guide.slug}`,
    lastModified: guide.updatedAt || guide.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    // ... other pages
    {
      url: 'https://foodpulse.co/guides',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...guideUrls,
  ]
}
```

---

# 9. Content Strategy

## 9.1 Existing Guides Migration

| Current Guide | New Type | Access | Action |
|---------------|----------|--------|--------|
| The Instant Food Decision Guide | Premium | Paid | Keep as-is, add web preview |
| The Sweet Swap Tracker | Quick Guide | Email-gated | Create web version + PDF |
| Never Skip a Nutrition Panel Again | Quick Guide | Email-gated | Create web version + PDF |
| Before You Buy The Supplement | Quick Guide | Email-gated | Create web version + PDF |

## 9.2 New Guides to Create

### Priority 1 (High SEO Value)

| Guide Title | Type | Category | Keywords |
|-------------|------|----------|----------|
| The Complete Guide to Macronutrients | Comprehensive | Nutrition | macronutrients guide, what are macros |
| How to Read Nutrition Labels | Comprehensive | Food Labels | read nutrition labels, food label guide |
| Meal Planning 101 | Comprehensive | Meal Planning | meal planning guide, weekly meal prep |
| Understanding Organic Food | Comprehensive | Food Labels | organic food guide, what is organic |

### Priority 2 (Lead Magnets)

| Guide Title | Type | Category | Format |
|-------------|------|----------|--------|
| Healthy Pantry Staples Checklist | Quick | Healthy Eating | PDF checklist |
| Grocery Shopping Guide | Quick | Healthy Eating | PDF + web |
| High-Protein Foods List | Quick | Nutrition | PDF list |
| Fiber-Rich Foods Chart | Quick | Nutrition | PDF chart |

### Priority 3 (Tools)

| Tool | Type | Category |
|------|------|----------|
| Protein Calculator | Tool | Tools |
| Daily Water Intake Calculator | Tool | Tools |
| Meal Cost Calculator | Tool | Tools |

## 9.3 Content Calendar

| Week | Action |
|------|--------|
| 1-2 | Migrate existing PDFs to web + gate |
| 3-4 | Create "Macronutrients Guide" |
| 5-6 | Create "Reading Labels Guide" |
| 7-8 | Create "Meal Planning 101" |
| 9-10 | Create 3-4 quick guide PDFs |
| 11-12 | Build first interactive tool |

---

# 10. Launch Checklist

## 10.1 Pre-Launch: Schema & Setup

- [ ] Create `guide` document type in Sanity
- [ ] Add guide to Sanity desk structure
- [ ] Test schema with sample guide
- [ ] Set up file upload for PDFs
- [ ] Configure email service integration (ConvertKit/Mailchimp)

## 10.2 Pre-Launch: Content

- [ ] Migrate existing 4 guides to new schema
- [ ] Create web versions of existing PDF guides
- [ ] Write at least 1 comprehensive guide
- [ ] Add featured guide (Instant Food Decision)
- [ ] Set up categories
- [ ] Add meta descriptions to all guides

## 10.3 Pre-Launch: Technical

- [ ] Build guide hub page
- [ ] Build individual guide page
- [ ] Implement email gate component
- [ ] Implement download tracking
- [ ] Add JSON-LD schema markup
- [ ] Test PDF downloads
- [ ] Test email capture flow
- [ ] Mobile responsive testing

## 10.4 Pre-Launch: SEO

- [ ] Configure meta tags for hub page
- [ ] Configure meta tags for individual guides
- [ ] Add Open Graph images
- [ ] Add to sitemap
- [ ] Add to main navigation
- [ ] Internal link from relevant articles

## 10.5 Launch Day

- [ ] Publish all guides
- [ ] Test all download links
- [ ] Test email capture
- [ ] Submit sitemap to Search Console
- [ ] Announce on newsletter
- [ ] Share on social media

## 10.6 Post-Launch (Week 1)

- [ ] Monitor download stats
- [ ] Check email captures
- [ ] Monitor for errors
- [ ] Review analytics
- [ ] Gather feedback

## 10.7 Ongoing Maintenance

### Weekly
- [ ] Monitor download stats
- [ ] Review email capture rates
- [ ] Add internal links from new articles

### Monthly
- [ ] Add 1-2 new guides
- [ ] Update existing guides if needed
- [ ] Review conversion rates

### Quarterly
- [ ] Full content audit
- [ ] Review SEO performance
- [ ] Plan new guide topics
- [ ] Consider new premium offerings

---

# Summary

## Quick Reference

```
Hub URL: /guides
Guide URL: /guides/[slug]

Guide Types:
├── Quick Guide (1-2 pages, PDF)
├── Comprehensive Guide (multi-chapter, web + PDF)
├── Premium Guide (paid)
└── Interactive Tool (calculator/tracker)

Access Types:
├── Free (no gate)
├── Email-gated (capture before download)
└── Paid (link to payment)
```

## Key Success Factors

1. **Web versions for SEO** — Don't just link PDFs, create indexable pages
2. **Email gate free guides** — Build your list with every download
3. **Quality over quantity** — One great guide > five mediocre ones
4. **Internal linking** — Connect guides to articles and glossary
5. **Track everything** — Downloads, email captures, conversions

## Expected Outcomes

| Timeframe | Expected Result |
|-----------|-----------------|
| Month 1 | 4 guides live, email capture working |
| Month 3 | 8-10 guides, 200+ email captures |
| Month 6 | 15+ guides, established resource hub |
| Year 1 | Comprehensive library, significant lead generation |

---

**Document Version:** 1.0  
**Created:** January 2025  
**For:** FoodPulse Development Team
