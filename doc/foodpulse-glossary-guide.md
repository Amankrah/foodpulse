# FoodPulse Glossary Page — Complete Development Guide

## Comprehensive Documentation for Building an SEO-Optimized Food & Nutrition Glossary

**Version:** 1.0  
**Last Updated:** January 2025  
**URL Structure:** `/glossary` and `/glossary/[term-slug]`  
**Priority:** High (Major SEO Opportunity)

---

# Table of Contents

1. [Strategic Overview](#1-strategic-overview)
2. [SEO Strategy](#2-seo-strategy)
3. [Sanity Schema Design](#3-sanity-schema-design)
4. [Information Architecture](#4-information-architecture)
5. [Page Specifications](#5-page-specifications)
6. [Content Guidelines](#6-content-guidelines)
7. [AI/LLM Optimization](#7-aillm-optimization)
8. [Technical Implementation](#8-technical-implementation)
9. [Starter Glossary Terms](#9-starter-glossary-terms)
10. [Launch Checklist](#10-launch-checklist)

---

# 1. Strategic Overview

## 1.1 Why Build a Glossary?

A well-structured glossary serves multiple strategic purposes:

### SEO Benefits
| Benefit | Description |
|---------|-------------|
| **Long-tail keyword capture** | Ranks for "what is [term]" searches |
| **Topical authority** | Signals expertise to search engines |
| **Internal linking hub** | Natural anchor text opportunities |
| **Featured snippets** | Definition format ideal for position 0 |
| **AI citation source** | LLMs cite clear definitions |

### User Benefits
| Benefit | Description |
|---------|-------------|
| **Education** | Helps readers understand complex terms |
| **Reference** | Bookmarkable resource they return to |
| **Trust** | Demonstrates expertise and thoroughness |
| **Accessibility** | Makes content approachable for beginners |

### Content Strategy Benefits
| Benefit | Description |
|---------|-------------|
| **Internal linking** | Link from articles to glossary terms |
| **Content gaps** | Identifies topics for full articles |
| **Evergreen content** | Definitions rarely need major updates |
| **Scalable** | Easy to add new terms over time |

## 1.2 Glossary Scope for FoodPulse

### Categories of Terms to Cover

```
1. Nutrition Science
   - Macronutrients, micronutrients, vitamins, minerals
   - Metabolic terms, dietary patterns

2. Food Science
   - Processing methods, preservation, fermentation
   - Food chemistry terms

3. Food Systems
   - Supply chain, agriculture, sustainability
   - Food policy, food security

4. Health & Wellness
   - Gut health, inflammation, disease-related terms
   - Wellness concepts

5. Consumer/Practical
   - Label terms, certifications, shopping terminology
   - Cooking methods, kitchen terms
```

### Target: 100-200 Terms Initially
Start with 50 high-value terms, expand to 100-200 over 6 months.

---

# 2. SEO Strategy

## 2.1 Keyword Targeting

### Primary Keywords (Glossary Hub Page)
| Keyword | Monthly Volume | Target |
|---------|---------------|--------|
| food glossary | 720 | Title, H1 |
| nutrition terms | 590 | H2, body |
| food terminology | 390 | Body content |
| food definitions | 320 | Meta description |
| nutrition glossary | 260 | H2 |

### Individual Term Keywords (Pattern)
Each glossary term targets:
- "what is [term]"
- "[term] definition"
- "[term] meaning"
- "[term] in food/nutrition"

### Example Term Keywords
| Term | Target Keywords |
|------|-----------------|
| Macronutrients | "what are macronutrients," "macronutrients definition," "macros meaning" |
| Gut microbiome | "what is gut microbiome," "gut microbiome definition," "microbiome explained" |
| Organic food | "what is organic food," "organic food definition," "organic meaning" |
| Processed food | "what is processed food," "processed food definition," "ultra-processed" |

## 2.2 URL Structure

### Option A: Flat Structure (Recommended for <200 terms)
```
/glossary                     → Main glossary page (A-Z listing)
/glossary/macronutrients      → Individual term page
/glossary/gut-microbiome      → Individual term page
/glossary/organic-food        → Individual term page
```

### Option B: Categorized Structure (For larger glossaries)
```
/glossary                           → Main hub
/glossary/nutrition                 → Nutrition terms
/glossary/nutrition/macronutrients  → Individual term
/glossary/food-systems              → Food system terms
```

**Recommendation:** Start with Option A. Simpler, avoids thin category pages.

## 2.3 Meta Tags

### Glossary Hub Page
```
Title: Food & Nutrition Glossary | 100+ Terms Explained | FoodPulse
Description: Comprehensive glossary of food and nutrition terms. Clear definitions for macronutrients, gut health, organic food, food systems, and more. A-Z reference guide.
```

### Individual Term Page Template
```
Title: [Term] — Definition & Explanation | FoodPulse Glossary
Description: What is [term]? [One sentence definition]. Learn more about [term] and how it relates to [category] in our complete guide.

Example:
Title: Macronutrients — Definition & Explanation | FoodPulse Glossary
Description: What are macronutrients? The three main nutrients your body needs in large amounts: proteins, carbohydrates, and fats. Learn about macros and nutrition.
```

## 2.4 Schema Markup

### Glossary Hub Page — ItemList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "FoodPulse Food & Nutrition Glossary",
  "description": "Comprehensive glossary of food and nutrition terms",
  "numberOfItems": 100,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Macronutrients",
      "url": "https://foodpulse.co/glossary/macronutrients"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Micronutrients",
      "url": "https://foodpulse.co/glossary/micronutrients"
    }
  ]
}
```

### Individual Term Page — DefinedTerm Schema
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Macronutrients",
  "description": "The three main nutrients required by the body in large amounts: proteins, carbohydrates, and fats.",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "FoodPulse Food & Nutrition Glossary",
    "url": "https://foodpulse.co/glossary"
  }
}
```

### Alternative: FAQPage Schema (for "What is X?" format)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What are macronutrients?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Macronutrients are the three main nutrients your body needs in large amounts: proteins, carbohydrates, and fats. They provide energy (calories) and serve essential functions in the body."
    }
  }]
}
```

## 2.5 Internal Linking Strategy

### From Glossary to Articles
Each glossary term should link to:
- 2-3 related articles that discuss the term in depth
- Related glossary terms (see "Related Terms" section)

### From Articles to Glossary
When a glossary term appears in an article:
- First mention can be linked to glossary definition
- Use consistent anchor text: "macronutrients" → `/glossary/macronutrients`

### Implementation Pattern
```tsx
// In article body, auto-link glossary terms (optional advanced feature)
// Or manually link important terms

<p>
  Understanding <a href="/glossary/macronutrients">macronutrients</a> is 
  essential for making informed food choices. The three macros—
  <a href="/glossary/protein">protein</a>, 
  <a href="/glossary/carbohydrates">carbohydrates</a>, and 
  <a href="/glossary/fats">fats</a>—each play unique roles in your body.
</p>
```

---

# 3. Sanity Schema Design

## 3.1 Glossary Term Document Type

```typescript
// schemas/documents/glossaryTermType.ts
import {defineField, defineType} from 'sanity'

export const glossaryTermType = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'relationships', title: 'Relationships'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // === CONTENT GROUP ===
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      description: 'The term being defined (e.g., "Macronutrients")',
      validation: (rule) => rule.required().max(100),
      group: 'content',
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'term',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    
    defineField({
      name: 'pronunciation',
      title: 'Pronunciation',
      type: 'string',
      description: 'Phonetic pronunciation (e.g., "mak-roh-NOO-tree-ents")',
      group: 'content',
    }),
    
    defineField({
      name: 'shortDefinition',
      title: 'Short Definition',
      type: 'text',
      description: 'One-sentence definition (for cards and AI citations). 150-200 characters.',
      validation: (rule) => [
        rule.required().error('Short definition is required'),
        rule.min(50).warning('Definition seems too short'),
        rule.max(250).warning('Keep under 250 characters for snippets'),
      ],
      rows: 3,
      group: 'content',
    }),
    
    defineField({
      name: 'fullDefinition',
      title: 'Full Definition',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
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
              {
                name: 'glossaryLink',
                type: 'object',
                title: 'Glossary Term Link',
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
      ],
      description: 'Expanded explanation with examples, context, and details',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    
    defineField({
      name: 'example',
      title: 'Example in Context',
      type: 'text',
      description: 'A practical example showing how this term is used or applied',
      rows: 3,
      group: 'content',
    }),
    
    defineField({
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'text',
      description: 'Brief explanation of why this concept is important for consumers',
      rows: 3,
      group: 'content',
    }),
    
    defineField({
      name: 'commonMisconceptions',
      title: 'Common Misconceptions',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Myths or misunderstandings about this term',
      group: 'content',
    }),
    
    // === RELATIONSHIPS GROUP ===
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Nutrition Science', value: 'nutrition-science'},
          {title: 'Food Science', value: 'food-science'},
          {title: 'Food Systems', value: 'food-systems'},
          {title: 'Health & Wellness', value: 'health-wellness'},
          {title: 'Consumer & Practical', value: 'consumer-practical'},
          {title: 'Cooking & Kitchen', value: 'cooking-kitchen'},
        ],
      },
      validation: (rule) => rule.required(),
      group: 'relationships',
    }),
    
    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'glossaryTerm'}]}],
      description: 'Other glossary terms related to this one',
      validation: (rule) => rule.max(6),
      group: 'relationships',
    }),
    
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
      description: 'Articles that discuss this term in depth',
      validation: (rule) => rule.max(5),
      group: 'relationships',
    }),
    
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Source Title'},
            {name: 'url', type: 'url', title: 'URL'},
            {name: 'organization', type: 'string', title: 'Organization'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'organization'},
          },
        },
      ],
      description: 'Authoritative sources for this definition',
      group: 'relationships',
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
          description: 'SEO title (default: "[Term] — Definition | FoodPulse Glossary")',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description (default: uses short definition)',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          options: {layout: 'tags'},
        }),
      ],
      group: 'seo',
    }),
    
    // === METADATA ===
    defineField({
      name: 'letter',
      title: 'Starting Letter',
      type: 'string',
      description: 'Auto-populated for A-Z navigation',
      readOnly: true,
      hidden: true,
    }),
    
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
  ],
  
  preview: {
    select: {
      title: 'term',
      subtitle: 'category',
      definition: 'shortDefinition',
    },
    prepare({title, subtitle, definition}) {
      const categoryLabels: Record<string, string> = {
        'nutrition-science': '🧬 Nutrition',
        'food-science': '🔬 Food Science',
        'food-systems': '🌾 Food Systems',
        'health-wellness': '💚 Health',
        'consumer-practical': '🛒 Consumer',
        'cooking-kitchen': '🍳 Cooking',
      }
      return {
        title,
        subtitle: `${categoryLabels[subtitle] || subtitle} — ${definition?.slice(0, 50)}...`,
      }
    },
  },
  
  orderings: [
    {
      title: 'Term (A-Z)',
      name: 'termAsc',
      by: [{field: 'term', direction: 'asc'}],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{field: 'category', direction: 'asc'}, {field: 'term', direction: 'asc'}],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{field: 'updatedAt', direction: 'desc'}],
    },
  ],
})
```

## 3.2 Glossary Category Document Type (Optional)

If you want more control over categories:

```typescript
// schemas/documents/glossaryCategoryType.ts
export const glossaryCategoryType = defineType({
  name: 'glossaryCategory',
  title: 'Glossary Category',
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
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon name',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for category badge',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
```

Then update the glossaryTerm to use a reference:

```typescript
defineField({
  name: 'category',
  title: 'Category',
  type: 'reference',
  to: [{type: 'glossaryCategory'}],
  validation: (rule) => rule.required(),
  group: 'relationships',
}),
```

## 3.3 Update Schema Index

```typescript
// schemas/index.ts
import {glossaryTermType} from './documents/glossaryTermType'
// import {glossaryCategoryType} from './documents/glossaryCategoryType' // if using

export const schemaTypes = [
  // ... existing types
  glossaryTermType,
  // glossaryCategoryType,
]
```

## 3.4 Desk Structure for Glossary

```typescript
// In structure.ts
S.listItem()
  .title('Glossary')
  .child(
    S.list()
      .title('Glossary')
      .items([
        // All Terms
        S.listItem()
          .title('All Terms')
          .child(
            S.documentTypeList('glossaryTerm')
              .title('All Glossary Terms')
              .defaultOrdering([{field: 'term', direction: 'asc'}])
          ),
        
        // By Category
        S.listItem()
          .title('By Category')
          .child(
            S.list()
              .title('Categories')
              .items([
                S.listItem()
                  .title('🧬 Nutrition Science')
                  .child(
                    S.documentList()
                      .title('Nutrition Science')
                      .filter('_type == "glossaryTerm" && category == "nutrition-science"')
                      .defaultOrdering([{field: 'term', direction: 'asc'}])
                  ),
                S.listItem()
                  .title('🔬 Food Science')
                  .child(
                    S.documentList()
                      .title('Food Science')
                      .filter('_type == "glossaryTerm" && category == "food-science"')
                  ),
                S.listItem()
                  .title('🌾 Food Systems')
                  .child(
                    S.documentList()
                      .title('Food Systems')
                      .filter('_type == "glossaryTerm" && category == "food-systems"')
                  ),
                S.listItem()
                  .title('💚 Health & Wellness')
                  .child(
                    S.documentList()
                      .title('Health & Wellness')
                      .filter('_type == "glossaryTerm" && category == "health-wellness"')
                  ),
                S.listItem()
                  .title('🛒 Consumer & Practical')
                  .child(
                    S.documentList()
                      .title('Consumer & Practical')
                      .filter('_type == "glossaryTerm" && category == "consumer-practical"')
                  ),
                S.listItem()
                  .title('🍳 Cooking & Kitchen')
                  .child(
                    S.documentList()
                      .title('Cooking & Kitchen')
                      .filter('_type == "glossaryTerm" && category == "cooking-kitchen"')
                  ),
              ])
          ),
        
        // By Letter
        S.listItem()
          .title('By Letter (A-Z)')
          .child(
            S.list()
              .title('A-Z')
              .items(
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) =>
                  S.listItem()
                    .title(letter)
                    .child(
                      S.documentList()
                        .title(`Terms starting with ${letter}`)
                        .filter('_type == "glossaryTerm" && term match $letter + "*"')
                        .params({letter: letter.toLowerCase()})
                    )
                )
              )
          ),
        
        S.divider(),
        
        // Recently Updated
        S.listItem()
          .title('Recently Updated')
          .child(
            S.documentList()
              .title('Recently Updated')
              .filter('_type == "glossaryTerm"')
              .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
          ),
      ])
  ),
```

---

# 4. Information Architecture

## 4.1 Page Types

### 1. Glossary Hub Page (`/glossary`)
- Lists all terms A-Z
- Category filter/tabs
- Search functionality
- Jump-to-letter navigation

### 2. Individual Term Page (`/glossary/[slug]`)
- Full definition and explanation
- Related terms sidebar
- Related articles
- Breadcrumb navigation

### 3. Category Landing Page (`/glossary/category/[slug]`) — Optional
- Only if you have 20+ terms per category
- Lists terms in that category
- Category-specific introduction

## 4.2 Navigation Flow

```
/glossary
├── A-Z Quick Jump → #letter-a, #letter-b, etc.
├── Category Tabs → Filter by category
├── Search → Filter results
└── Term Cards → Link to /glossary/[slug]

/glossary/[slug]
├── Breadcrumb → Glossary > Category > Term
├── Definition Content
├── Related Terms → Link to other /glossary/[slug]
├── Related Articles → Link to /articles/[category]/[slug]
└── Back to Glossary → /glossary
```

## 4.3 URL Structure

```
/glossary                           → Hub page (A-Z listing)
/glossary/macronutrients            → Term page
/glossary/gut-microbiome            → Term page
/glossary/organic-food              → Term page
/glossary?category=nutrition-science → Filtered hub (query param)
/glossary?search=protein            → Search results (query param)
/glossary#letter-m                  → Jump to M section
```

---

# 5. Page Specifications

## 5.1 Glossary Hub Page (`/glossary`)

### Layout Overview
```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      HERO SECTION                            │
│               (Light green background)                       │
│                                                              │
│     [Breadcrumb] Home > Glossary                            │
│                                                              │
│     [H1] Food & Nutrition Glossary                          │
│                                                              │
│     [Subhead] Clear definitions for 100+ food and           │
│     nutrition terms. Your A-Z reference guide.              │
│                                                              │
│     [Search Bar] 🔍 Search terms...                         │
│                                                              │
│     [A-Z Jump] A B C D E F G H I J K L M N O P Q R S T...   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                   CATEGORY TABS (Optional)                   │
│                                                              │
│     [All] [Nutrition] [Food Science] [Food Systems] ...     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                   TERMS LISTING                              │
│                                                              │
│     ## A                                            anchor   │
│     ┌─────────────────┐ ┌─────────────────┐                 │
│     │ Amino Acids     │ │ Antioxidants    │                 │
│     │ Short def...    │ │ Short def...    │                 │
│     │ [Category tag]  │ │ [Category tag]  │                 │
│     │ Read more →     │ │ Read more →     │                 │
│     └─────────────────┘ └─────────────────┘                 │
│                                                              │
│     ## B                                            anchor   │
│     ┌─────────────────┐ ┌─────────────────┐                 │
│     │ B Vitamins      │ │ Bioavailability │                 │
│     ...                                                      │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      CTA SECTION                             │
│                                                              │
│     Missing a term? Suggest one →                           │
│     Subscribe for new terms →                               │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                        FOOTER                                │
└─────────────────────────────────────────────────────────────┘
```

### Hero Section Specs
```css
/* Background */
background: var(--green-50); /* #e1ffed */
padding: py-12 lg:py-16;

/* Breadcrumb */
font-size: text-sm;
color: var(--neutral-600);
margin-bottom: mb-4;

/* H1 */
font-family: var(--font-display);
font-size: text-3xl lg:text-4xl xl:text-5xl;
font-weight: font-bold;
color: var(--green-700);
margin-bottom: mb-4;

/* Subhead */
font-size: text-lg lg:text-xl;
color: var(--neutral-600);
max-width: max-w-2xl;
margin-bottom: mb-8;

/* Search Bar */
width: w-full max-w-xl;
padding: px-4 py-3;
border: border-2 border-neutral-200;
border-radius: rounded-lg;
focus: focus:border-green-500;

/* A-Z Navigation */
display: flex;
flex-wrap: wrap;
gap: gap-1 lg:gap-2;
margin-top: mt-8;

/* Letter Button */
width: w-8 h-8 lg:w-10 lg:h-10;
display: flex items-center justify-center;
border-radius: rounded-md;
background: bg-white hover:bg-green-50;
color: text-neutral-700 hover:text-green-700;
font-weight: font-medium;
/* Disabled state for letters with no terms */
disabled: opacity-40 cursor-not-allowed;
```

### Term Card Specs
```css
/* Card Container */
display: grid;
grid-template-columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
gap: gap-4 lg:gap-6;

/* Card */
background: bg-white;
border: border border-neutral-200;
border-radius: rounded-xl;
padding: p-5;
transition: transition-all;
hover: hover:border-green-300 hover:shadow-md;

/* Term Title */
font-family: var(--font-sans);
font-size: text-lg;
font-weight: font-semibold;
color: var(--neutral-800);
margin-bottom: mb-2;

/* Short Definition */
font-size: text-sm;
color: var(--neutral-600);
line-height: leading-relaxed;
margin-bottom: mb-3;
/* Clamp to 2-3 lines */
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;

/* Category Tag */
display: inline-flex;
padding: px-2 py-0.5;
font-size: text-xs;
font-weight: font-medium;
border-radius: rounded-full;
background: bg-green-50;
color: var(--green-700);

/* Read More Link */
font-size: text-sm;
font-weight: font-medium;
color: var(--green-600);
margin-top: mt-auto;
```

### Letter Section Specs
```css
/* Letter Heading */
font-family: var(--font-display);
font-size: text-2xl;
font-weight: font-bold;
color: var(--green-700);
padding-bottom: pb-2;
border-bottom: border-b-2 border-green-200;
margin-bottom: mb-6;
margin-top: mt-12;

/* Anchor offset for sticky header */
scroll-margin-top: scroll-mt-24;
```

## 5.2 Individual Term Page (`/glossary/[slug]`)

### Layout Overview
```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│     [Breadcrumb] Home > Glossary > Macronutrients           │
│                                                              │
├────────────────────────────────────┬────────────────────────┤
│                                    │                        │
│           MAIN CONTENT             │       SIDEBAR          │
│              (2/3)                 │        (1/3)           │
│                                    │                        │
│  [Category Badge] Nutrition        │  ## Related Terms      │
│                                    │                        │
│  [H1] Macronutrients               │  • Protein             │
│                                    │  • Carbohydrates       │
│  [Pronunciation] mak-roh-NOO...    │  • Fats                │
│                                    │  • Calories            │
│  ─────────────────────────────     │                        │
│                                    │  ─────────────────     │
│  [Short Definition Box]            │                        │
│  The three main nutrients your     │  ## Related Articles   │
│  body needs in large amounts...    │                        │
│                                    │  • Guide to Macros     │
│  ─────────────────────────────     │  • Protein 101         │
│                                    │  • Understanding...    │
│  ## Full Explanation               │                        │
│                                    │  ─────────────────     │
│  [Portable Text Content]           │                        │
│  Macronutrients are the...         │  ## Sources            │
│                                    │                        │
│  ## Why It Matters                 │  • WHO                 │
│                                    │  • NIH                 │
│  Understanding macronutrients...   │                        │
│                                    │                        │
│  ## Common Misconceptions          │                        │
│                                    │                        │
│  • Carbs are bad for you           │                        │
│  • All fats are unhealthy          │                        │
│                                    │                        │
│  ## Example                        │                        │
│                                    │                        │
│  A balanced meal might include...  │                        │
│                                    │                        │
├────────────────────────────────────┴────────────────────────┤
│                                                              │
│                  BACK TO GLOSSARY CTA                        │
│                                                              │
│         ← Back to Glossary    |    Suggest a Term           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                        FOOTER                                │
└─────────────────────────────────────────────────────────────┘
```

### Component Specs

#### Definition Box (Highlighted)
```css
/* AI-citable definition block */
background: var(--green-50);
border-left: border-l-4 border-green-500;
padding: p-6;
border-radius: rounded-r-lg;
margin: my-8;

/* Definition Text */
font-size: text-lg lg:text-xl;
line-height: leading-relaxed;
color: var(--neutral-800);
font-style: normal; /* Not italic - clearer for AI parsing */
```

#### Sidebar
```css
/* Sidebar Container */
position: lg:sticky;
top: top-24; /* Below header */
height: h-fit;
max-height: max-h-[calc(100vh-8rem)];
overflow-y: auto;

/* Sidebar Section */
margin-bottom: mb-8;

/* Sidebar Title */
font-size: text-sm;
font-weight: font-semibold;
text-transform: uppercase;
letter-spacing: tracking-wider;
color: var(--neutral-500);
margin-bottom: mb-3;

/* Related Term Link */
display: block;
padding: py-2;
color: var(--neutral-700);
hover: hover:text-green-700;
border-bottom: border-b border-neutral-100;
```

#### Section Headings
```css
/* H2 in content */
font-family: var(--font-display);
font-size: text-xl lg:text-2xl;
font-weight: font-semibold;
color: var(--green-700);
margin-top: mt-10;
margin-bottom: mb-4;
```

---

# 6. Content Guidelines

## 6.1 Term Structure Template

Each glossary term should follow this structure:

```markdown
# [Term]

**Pronunciation:** [phonetic spelling]

**Category:** [category name]

---

## Definition
[One clear sentence that directly answers "What is [term]?"]

This definition should be:
- Direct and concise (under 250 characters)
- Self-contained (makes sense without context)
- Citable by AI systems
- Free of jargon (or defines jargon inline)

---

## Full Explanation
[2-4 paragraphs expanding on the definition]

Include:
- More detailed explanation
- Types or categories if applicable
- How it relates to food/nutrition/health
- Scientific context (accessible language)

---

## Why It Matters
[1-2 paragraphs on practical significance]

- Why should consumers care about this?
- How does understanding this help with food choices?
- Connection to health outcomes

---

## Example
[Practical example showing the term in context]

- Real-world application
- Food examples
- How to identify/apply this concept

---

## Common Misconceptions (if applicable)
- Misconception 1: [myth]
  Reality: [truth]
- Misconception 2: [myth]
  Reality: [truth]

---

## Related Terms
- [Related term 1]
- [Related term 2]
- [Related term 3]

## Sources
- [Source 1]
- [Source 2]
```

## 6.2 Writing Guidelines

### Voice & Tone
- **Authoritative but accessible:** Demonstrate expertise without being academic
- **Direct:** Lead with the answer, then explain
- **Practical:** Connect concepts to real food decisions
- **Neutral:** Avoid promoting specific diets or products

### Definition Writing Rules

#### DO ✅
```
"Macronutrients are the three main nutrients your body needs in large 
amounts—proteins, carbohydrates, and fats—that provide energy and serve 
essential biological functions."
```

#### DON'T ❌
```
"So, macronutrients... have you ever wondered what they are? Well, let me 
tell you! They're basically the big nutrients your body uses."
```

### First Sentence Rule
The first sentence must directly answer "What is [term]?" — this is what AI systems will cite.

**Pattern:**
```
[Term] is/are [direct definition].

Examples:
- "Macronutrients are the three main nutrients required by the body in large amounts."
- "The gut microbiome is the community of trillions of microorganisms living in your digestive tract."
- "Organic food is produce grown without synthetic pesticides, fertilizers, or GMOs."
```

### Length Guidelines
| Section | Length |
|---------|--------|
| Short Definition | 1-2 sentences (150-250 chars) |
| Full Explanation | 200-500 words |
| Why It Matters | 50-150 words |
| Example | 50-100 words |
| Misconceptions | 2-4 items |

## 6.3 Category-Specific Guidelines

### Nutrition Science Terms
- Include recommended daily amounts where relevant
- Reference authoritative sources (NIH, WHO)
- Explain metabolic/biological function
- Example: vitamins, minerals, macronutrients

### Food Science Terms
- Explain the process/mechanism
- Include practical implications for consumers
- Note common foods where this applies
- Example: fermentation, pasteurization, emulsification

### Food Systems Terms
- Provide systemic context
- Explain impact on consumer and environment
- Include scale/statistics where relevant
- Example: food miles, supply chain, food desert

### Consumer/Practical Terms
- Focus on actionable understanding
- Include "how to identify" guidance
- Reference label reading where applicable
- Example: organic, non-GMO, whole grain

---

# 7. AI/LLM Optimization

## 7.1 Why AI Optimization Matters

AI assistants (ChatGPT, Perplexity, Claude, Google SGE) increasingly answer user questions by citing web sources. Glossary pages are ideal for AI citation because:

1. **Clear definitions** — AI looks for direct answers
2. **Structured format** — Easy for AI to parse
3. **Authoritative tone** — Signals expertise
4. **Comprehensive coverage** — Answers follow-up questions

## 7.2 Optimization Strategies

### Strategy 1: Lead with the Answer
```
✅ GOOD (AI-friendly):
"Macronutrients are the three main nutrients required by the body in large 
amounts: proteins, carbohydrates, and fats."

❌ BAD (Not AI-friendly):
"When we talk about nutrition, one of the most important concepts to 
understand is macronutrients. But what exactly are they?"
```

### Strategy 2: Use Question-Based Headings
```
✅ GOOD:
## What are macronutrients?
## Why do macronutrients matter?
## What foods contain macronutrients?

❌ BAD:
## Overview
## Importance
## Sources
```

### Strategy 3: Self-Contained Paragraphs
Each paragraph should be quotable on its own:
```
✅ GOOD:
"Fiber is a type of carbohydrate that the body cannot digest. Unlike other 
carbs, fiber passes through the digestive system mostly intact, supporting 
gut health and regular bowel movements. The recommended daily intake is 
25-30 grams for adults."

❌ BAD:
"It's important for gut health. You should eat 25-30 grams daily. This 
nutrient supports regular bowel movements."
(Missing context—what is "it"?)
```

### Strategy 4: Include Specific Facts
AI systems prefer citable facts over vague statements:
```
✅ GOOD:
"Protein should make up 10-35% of daily calories, according to the 
Dietary Guidelines for Americans."

❌ BAD:
"You should eat a good amount of protein every day."
```

### Strategy 5: Structured Data
Include FAQ schema markup for common questions:
```json
{
  "@type": "Question",
  "name": "What are macronutrients?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Macronutrients are the three main nutrients required by the body in large amounts: proteins, carbohydrates, and fats. They provide energy (calories) and serve essential functions including muscle building, energy storage, and hormone production."
  }
}
```

## 7.3 Featured Snippet Optimization

Glossary terms are ideal for Google's featured snippets. Optimize for:

### Definition Snippets
```
[Term] is [definition].

The gut microbiome is the community of trillions of microorganisms—including 
bacteria, viruses, and fungi—that live in your digestive tract.
```

### List Snippets
```
The three macronutrients are:
1. Proteins — build and repair tissues
2. Carbohydrates — provide energy
3. Fats — support cell function and hormone production
```

### Table Snippets
```
| Macronutrient | Calories/gram | Primary Function |
|---------------|---------------|------------------|
| Protein       | 4             | Build tissue     |
| Carbohydrate  | 4             | Provide energy   |
| Fat           | 9             | Store energy     |
```

---

# 8. Technical Implementation

## 8.1 GROQ Queries

### Glossary Hub Page Query
```groq
// Get all terms grouped by starting letter
{
  "terms": *[_type == "glossaryTerm" && defined(publishedAt)] | order(term asc) {
    _id,
    term,
    "slug": slug.current,
    shortDefinition,
    category,
    "letter": upper(substring(term, 0, 1))
  },
  "categories": array::unique(*[_type == "glossaryTerm"].category),
  "totalCount": count(*[_type == "glossaryTerm"])
}
```

### Individual Term Page Query
```groq
*[_type == "glossaryTerm" && slug.current == $slug][0] {
  _id,
  term,
  "slug": slug.current,
  pronunciation,
  shortDefinition,
  fullDefinition,
  example,
  whyItMatters,
  commonMisconceptions,
  category,
  "relatedTerms": relatedTerms[]->{
    term,
    "slug": slug.current,
    shortDefinition,
    category
  },
  "relatedArticles": relatedArticles[]->{
    title,
    "slug": slug.current,
    excerpt,
    "category": category->{title, slug}
  },
  sources,
  seo,
  publishedAt,
  updatedAt
}
```

### Terms by Category Query
```groq
*[_type == "glossaryTerm" && category == $category && defined(publishedAt)] | order(term asc) {
  term,
  "slug": slug.current,
  shortDefinition,
  category
}
```

### Search Query
```groq
*[_type == "glossaryTerm" && (
  term match $query + "*" ||
  shortDefinition match $query + "*" ||
  pt::text(fullDefinition) match $query + "*"
)] | order(term asc) {
  term,
  "slug": slug.current,
  shortDefinition,
  category
}[0...20]
```

### Sitemap Query
```groq
*[_type == "glossaryTerm" && defined(publishedAt)] | order(term asc) {
  "slug": slug.current,
  publishedAt,
  updatedAt
}
```

## 8.2 Next.js Page Structure

### File Structure
```
app/
├── glossary/
│   ├── page.tsx              # Hub page /glossary
│   ├── [slug]/
│   │   └── page.tsx          # Individual term /glossary/[slug]
│   ├── loading.tsx           # Loading state
│   └── not-found.tsx         # 404 for invalid terms
```

### Hub Page Implementation Notes

```typescript
// app/glossary/page.tsx

// 1. Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Food & Nutrition Glossary | 100+ Terms Explained | FoodPulse',
    description: 'Comprehensive glossary of food and nutrition terms...',
    // ... other meta
  }
}

// 2. Fetch all terms grouped by letter
async function getGlossaryTerms() {
  const data = await sanityFetch({
    query: glossaryHubQuery,
  })
  
  // Group by letter
  const grouped = data.terms.reduce((acc, term) => {
    const letter = term.letter
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(term)
    return acc
  }, {})
  
  return { grouped, categories: data.categories, total: data.totalCount }
}

// 3. Render with client-side search/filter
export default async function GlossaryPage() {
  const { grouped, categories, total } = await getGlossaryTerms()
  
  return (
    <>
      <GlossaryJsonLd terms={Object.values(grouped).flat()} />
      <GlossaryHub 
        groupedTerms={grouped}
        categories={categories}
        totalCount={total}
      />
    </>
  )
}
```

### Term Page Implementation Notes

```typescript
// app/glossary/[slug]/page.tsx

// 1. Generate static params for all terms
export async function generateStaticParams() {
  const terms = await sanityFetch({
    query: `*[_type == "glossaryTerm"]{ "slug": slug.current }`,
  })
  return terms.map((term) => ({ slug: term.slug }))
}

// 2. Generate metadata per term
export async function generateMetadata({ params }): Promise<Metadata> {
  const term = await getTerm(params.slug)
  
  if (!term) return { title: 'Term Not Found' }
  
  return {
    title: term.seo?.metaTitle || `${term.term} — Definition | FoodPulse Glossary`,
    description: term.seo?.metaDescription || term.shortDefinition,
    // ... other meta
  }
}

// 3. Render term page
export default async function TermPage({ params }) {
  const term = await getTerm(params.slug)
  
  if (!term) notFound()
  
  return (
    <>
      <TermJsonLd term={term} />
      <TermPage term={term} />
    </>
  )
}
```

## 8.3 JSON-LD Components

### Glossary Hub Schema
```typescript
// components/GlossaryJsonLd.tsx
export function GlossaryJsonLd({ terms }: { terms: GlossaryTerm[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FoodPulse Food & Nutrition Glossary',
    description: 'Comprehensive glossary of food and nutrition terms',
    numberOfItems: terms.length,
    itemListElement: terms.map((term, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: term.term,
      url: `https://foodpulse.co/glossary/${term.slug}`,
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

### Individual Term Schema
```typescript
// components/TermJsonLd.tsx
export function TermJsonLd({ term }: { term: GlossaryTerm }) {
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortDefinition,
    url: `https://foodpulse.co/glossary/${term.slug}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'FoodPulse Food & Nutrition Glossary',
      url: 'https://foodpulse.co/glossary',
    },
  }
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${term.term.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: term.shortDefinition,
        },
      },
    ],
  }
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://foodpulse.co' },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://foodpulse.co/glossary' },
      { '@type': 'ListItem', position: 3, name: term.term, item: `https://foodpulse.co/glossary/${term.slug}` },
    ],
  }
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  )
}
```

## 8.4 Search Implementation

### Client-Side Search (Simple)
```typescript
// components/GlossarySearch.tsx
'use client'

export function GlossarySearch({ 
  terms, 
  onFilter 
}: { 
  terms: GlossaryTerm[]
  onFilter: (filtered: GlossaryTerm[]) => void 
}) {
  const [query, setQuery] = useState('')
  
  useEffect(() => {
    if (!query) {
      onFilter(terms)
      return
    }
    
    const filtered = terms.filter(term => 
      term.term.toLowerCase().includes(query.toLowerCase()) ||
      term.shortDefinition.toLowerCase().includes(query.toLowerCase())
    )
    onFilter(filtered)
  }, [query, terms, onFilter])
  
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
      <input
        type="search"
        placeholder="Search terms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-green-500 focus:outline-none"
      />
    </div>
  )
}
```

### Server-Side Search (For Larger Glossaries)
```typescript
// app/api/glossary/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')
  
  if (!query || query.length < 2) {
    return NextResponse.json({ terms: [] })
  }
  
  const terms = await sanityFetch({
    query: `*[_type == "glossaryTerm" && (
      term match $query + "*" ||
      shortDefinition match $query + "*"
    )] | order(term asc) [0...20] {
      term,
      "slug": slug.current,
      shortDefinition,
      category
    }`,
    params: { query },
  })
  
  return NextResponse.json({ terms })
}
```

---

# 9. Starter Glossary Terms

## 9.1 Priority Terms (Start Here)

### Tier 1: High-Volume Terms (Launch with these)

| Term | Category | Why Priority |
|------|----------|--------------|
| Macronutrients | Nutrition Science | High search volume, foundational |
| Micronutrients | Nutrition Science | Pairs with macronutrients |
| Protein | Nutrition Science | Very high search volume |
| Carbohydrates | Nutrition Science | Very high search volume |
| Fiber | Nutrition Science | High search volume, gut health |
| Gut Microbiome | Health & Wellness | Trending topic |
| Probiotics | Health & Wellness | High search volume |
| Prebiotics | Health & Wellness | Pairs with probiotics |
| Organic Food | Consumer & Practical | High search volume |
| Processed Food | Consumer & Practical | High search volume |
| Whole Grains | Nutrition Science | Label term, practical |
| Antioxidants | Health & Wellness | High search volume |
| Inflammation | Health & Wellness | Health topic |
| Calorie | Nutrition Science | Fundamental term |
| Metabolism | Health & Wellness | High search volume |

### Tier 2: Important Supporting Terms

| Term | Category |
|------|----------|
| Amino Acids | Nutrition Science |
| Saturated Fat | Nutrition Science |
| Unsaturated Fat | Nutrition Science |
| Trans Fat | Nutrition Science |
| Cholesterol | Nutrition Science |
| Glycemic Index | Nutrition Science |
| Bioavailability | Food Science |
| Fortified Foods | Consumer & Practical |
| Non-GMO | Consumer & Practical |
| Free Range | Consumer & Practical |
| Food Miles | Food Systems |
| Farm to Table | Food Systems |
| Food Desert | Food Systems |
| Sustainable Agriculture | Food Systems |
| Fermentation | Food Science |

### Tier 3: Expand Over Time

```
Vitamins: A, B Complex, C, D, E, K
Minerals: Iron, Calcium, Magnesium, Zinc, Potassium
Diet Types: Mediterranean, Plant-Based, Keto, Paleo
Food Science: Pasteurization, Emulsification, Oxidation
Labels: Natural, Fresh, Locally Sourced
Health: Blood Sugar, Insulin Resistance, Leaky Gut
```

## 9.2 Sample Term Content

### Example: Macronutrients

```yaml
term: Macronutrients
slug: macronutrients
pronunciation: "mak-roh-NOO-tree-ents"
category: nutrition-science

shortDefinition: >
  The three main nutrients your body needs in large amounts—proteins, 
  carbohydrates, and fats—that provide energy and serve essential 
  biological functions.

fullDefinition: |
  ## What are macronutrients?
  
  Macronutrients are the nutrients your body requires in large quantities 
  to function properly. Unlike micronutrients (vitamins and minerals), 
  which are needed in small amounts, macronutrients make up the bulk of 
  your diet and provide the calories your body uses for energy.
  
  ## The Three Macronutrients
  
  **Protein** (4 calories per gram)
  Builds and repairs tissues, supports immune function, and produces 
  enzymes and hormones. Found in meat, fish, eggs, dairy, legumes, and nuts.
  
  **Carbohydrates** (4 calories per gram)
  Your body's primary energy source. Includes sugars, starches, and fiber. 
  Found in grains, fruits, vegetables, and legumes.
  
  **Fats** (9 calories per gram)
  Stores energy, protects organs, supports cell function, and helps absorb 
  certain vitamins. Found in oils, nuts, seeds, dairy, and fatty fish.
  
  ## Recommended Intake
  
  The Dietary Guidelines for Americans recommend:
  - Protein: 10-35% of daily calories
  - Carbohydrates: 45-65% of daily calories
  - Fats: 20-35% of daily calories

whyItMatters: >
  Understanding macronutrients helps you make balanced food choices. Rather 
  than focusing on individual foods as "good" or "bad," thinking in terms 
  of macros helps you see the bigger picture of your overall diet and 
  ensure you're getting adequate nutrition for energy and health.

example: >
  A balanced meal might include grilled chicken (protein), brown rice 
  (carbohydrates), roasted vegetables (carbohydrates + fiber), and olive 
  oil dressing (fats). This combination provides all three macronutrients 
  in reasonable proportions.

commonMisconceptions:
  - "Carbs are bad for you" — Carbohydrates are essential; the type and 
    quantity matter more than avoiding them entirely.
  - "All fats make you fat" — Dietary fat doesn't directly become body fat; 
    excess calories from any source can lead to weight gain.
  - "You need protein powder to get enough protein" — Most people can meet 
    protein needs through whole foods.

relatedTerms:
  - protein
  - carbohydrates
  - fats
  - micronutrients
  - calories

relatedArticles:
  - understanding-macros-guide
  - balanced-diet-basics

sources:
  - title: "Dietary Guidelines for Americans 2020-2025"
    url: "https://www.dietaryguidelines.gov/"
    organization: "USDA"
  - title: "Macronutrients"
    url: "https://www.hsph.harvard.edu/nutritionsource/"
    organization: "Harvard T.H. Chan School of Public Health"

seo:
  metaTitle: "Macronutrients — Definition & Guide | FoodPulse Glossary"
  metaDescription: "What are macronutrients? The three main nutrients—proteins, carbs, and fats—your body needs in large amounts. Learn about macros and balanced nutrition."
  keywords:
    - macronutrients
    - what are macronutrients
    - macros definition
    - protein carbs fats
    - macronutrient ratio
```

---

# 10. Launch Checklist

## 10.1 Pre-Launch: Schema & Setup

- [ ] Create `glossaryTerm` document type in Sanity
- [ ] Add glossary to Sanity desk structure
- [ ] Test schema with 3-5 sample terms
- [ ] Set up validation rules (required fields, character limits)
- [ ] Configure preview in Studio

## 10.2 Pre-Launch: Content

- [ ] Write 15-20 Tier 1 terms minimum
- [ ] Ensure each term has:
  - [ ] Short definition (required)
  - [ ] Full definition (required)
  - [ ] Why it matters (recommended)
  - [ ] At least 2 related terms
  - [ ] At least 1 source
  - [ ] SEO meta description
- [ ] Internal review for accuracy
- [ ] Proofread all content

## 10.3 Pre-Launch: Technical

- [ ] Create `/glossary` page route
- [ ] Create `/glossary/[slug]` dynamic route
- [ ] Implement A-Z navigation
- [ ] Implement search functionality
- [ ] Implement category filtering
- [ ] Add breadcrumb navigation
- [ ] Implement JSON-LD schemas
- [ ] Add to sitemap
- [ ] Test on mobile devices
- [ ] Test page load speed (<3s)

## 10.4 Pre-Launch: SEO

- [ ] Configure meta tags for hub page
- [ ] Configure meta tag templates for term pages
- [ ] Verify Open Graph images
- [ ] Test structured data with Google Rich Results Test
- [ ] Add glossary to main navigation
- [ ] Add glossary link to footer
- [ ] Create internal links from existing articles

## 10.5 Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Monitor for indexing issues
- [ ] Track keyword rankings for target terms
- [ ] Add 5-10 new terms per week
- [ ] Link to glossary terms from new articles
- [ ] Collect user feedback (missing terms?)
- [ ] Monitor search console for new keyword opportunities

## 10.6 Content Calendar

| Week | Terms to Add | Focus Category |
|------|--------------|----------------|
| 1 | 15-20 terms | Tier 1 (high volume) |
| 2 | 10 terms | Nutrition Science |
| 3 | 10 terms | Consumer & Practical |
| 4 | 10 terms | Health & Wellness |
| 5 | 10 terms | Food Systems |
| 6 | 10 terms | Food Science |
| 7+ | 5 terms/week | Mixed, based on gaps |

**Goal:** 100 terms within 2 months, 200 terms within 6 months.

---

# Summary

## Key Success Factors

1. **Start with high-value terms** — Target terms people actually search for
2. **Optimize for AI citation** — Lead with direct definitions
3. **Implement proper schema** — DefinedTerm + FAQ for rich results
4. **Internal linking** — Connect glossary to articles bidirectionally
5. **Consistent structure** — Every term follows the same format
6. **Regular expansion** — Add new terms weekly

## Expected Outcomes

| Metric | Timeline | Target |
|--------|----------|--------|
| Terms published | Month 1 | 50+ |
| Terms published | Month 6 | 200+ |
| Featured snippets | Month 3 | 5-10 terms |
| Organic traffic | Month 6 | 500+ monthly visits |
| AI citations | Ongoing | Measurable presence |

---

**Document Version:** 1.0  
**Created:** January 2025  
**For:** FoodPulse Development Team
