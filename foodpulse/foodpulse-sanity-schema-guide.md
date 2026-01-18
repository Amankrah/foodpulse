# FoodPulse Sanity Schema Enhancement Guide

## Complete Developer Documentation for SEO-Optimized Content Management

**Version:** 1.0  
**Last Updated:** January 2025  
**Sanity Version:** v3.x  
**Reference:** [Sanity Documentation](https://www.sanity.io/docs)

---

# Table of Contents

1. [Current Schema Analysis](#1-current-schema-analysis)
2. [Schema Architecture Overview](#2-schema-architecture-overview)
3. [New Document Types to Create](#3-new-document-types-to-create)
4. [Enhanced Article Schema](#4-enhanced-article-schema)
5. [Enhanced Category Schema](#5-enhanced-category-schema)
6. [SEO Optimization Features](#6-seo-optimization-features)
7. [Recipe-Specific Implementation](#7-recipe-specific-implementation)
8. [Studio Customization](#8-studio-customization)
9. [GROQ Query Patterns](#9-groq-query-patterns)
10. [Migration Strategy](#10-migration-strategy)
11. [Quality Checklist](#11-quality-checklist)

---

# 1. Current Schema Analysis

## 1.1 What's Working Well ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Basic article structure | ✅ Good | Title, slug, excerpt, body |
| Category reference | ✅ Good | Proper reference type |
| Image with alt text | ✅ Good | Required alt text validation |
| SEO object | ✅ Good | Meta title, description, keywords |
| Tags array | ✅ Good | Flexible tagging system |
| Callout block type | ✅ Good | Custom portable text block |
| Preview configuration | ✅ Good | Shows author and category |

## 1.2 Issues to Address ⚠️

### Critical Issues

| Issue | Current State | Problem | Impact |
|-------|---------------|---------|--------|
| Author is inline object | `type: 'object'` | Can't reuse authors, no author pages, weak E-E-A-T | High |
| No recipe data structure | Mixed in body content | Can't generate Recipe schema, no filtering | High |
| SEO metaDescription not required | Optional field | May be published without meta description | High |
| No reading time | Not calculated | Missing user experience feature | Medium |

### Enhancement Opportunities

| Area | Current | Recommended |
|------|---------|-------------|
| Author | Inline object | Separate document type with reference |
| Related articles | None | Reference array or automatic by category |
| FAQ support | None | Structured FAQ block type |
| Table of contents | None | Auto-generated from headings |
| Social images | Uses featured image | Dedicated OG image field |
| Redirects | None | Redirect document type for URL changes |
| Series/Collections | None | Series document type for multi-part content |

## 1.3 File Structure Recommendation

```
src/
└── sanity/
    ├── schemaTypes/
    │   ├── index.ts              # Schema exports
    │   ├── documents/
    │   │   ├── articleType.ts    # Article document
    │   │   ├── authorType.ts     # NEW: Author document
    │   │   ├── categoryType.ts   # Category document
    │   │   ├── tagType.ts        # NEW: Tag document (optional)
    │   │   ├── seriesType.ts     # NEW: Series document
    │   │   ├── redirectType.ts   # NEW: Redirect document
    │   │   └── settingsType.ts   # NEW: Site settings singleton
    │   ├── objects/
    │   │   ├── seoType.ts        # SEO fields object
    │   │   ├── recipeType.ts     # NEW: Recipe data object
    │   │   ├── faqType.ts        # NEW: FAQ item object
    │   │   └── socialType.ts     # NEW: Social links object
    │   └── blocks/
    │       ├── blockContent.ts   # Portable text configuration
    │       └── calloutType.ts    # Callout block
    ├── structure.ts              # Desk structure
    └── env.ts                    # Environment variables
```

---

# 2. Schema Architecture Overview

## 2.1 Document Type Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                      DOCUMENT TYPES                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐            │
│  │  Author  │◄────│ Article  │────►│ Category │            │
│  └──────────┘     └────┬─────┘     └──────────┘            │
│       │                │                                     │
│       │                ▼                                     │
│       │          ┌──────────┐                               │
│       │          │  Series  │ (optional)                    │
│       │          └──────────┘                               │
│       │                                                      │
│       ▼                                                      │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐            │
│  │ Settings │     │ Redirect │     │   Tag    │ (optional) │
│  │(singleton)│     └──────────┘     └──────────┘            │
│  └──────────┘                                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      OBJECT TYPES                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │   SEO   │  │ Recipe  │  │   FAQ   │  │ Social  │        │
│  │ Object  │  │  Data   │  │  Item   │  │  Links  │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Schema Design Principles

### Principle 1: Separation of Concerns
Keep reusable data in separate document types. Authors, categories, and tags should be their own documents so they can be:
- Referenced from multiple articles
- Have their own pages (/author/etornam)
- Updated in one place

### Principle 2: Conditional Fields
Use Sanity's `hidden` property to show/hide fields based on context:
- Recipe fields only appear when category is "Recipes"
- FAQ section only appears when enabled

### Principle 3: Validation for SEO
Required fields that impact SEO should have validation:
- Meta description: Required, 150-160 characters
- Alt text: Required for all images
- Slug: Required, auto-generated

### Principle 4: Developer Experience
Use field groups to organize the Studio UI:
- Content (title, body, images)
- Metadata (category, tags, dates)
- SEO (meta title, description, keywords)
- Recipe (prep time, ingredients, etc.)

---

# 3. New Document Types to Create

## 3.1 Author Document Type

### Purpose
Separate author data for reusability, author pages, and E-E-A-T signals.

### Fields to Include

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name |
| `slug` | slug | Yes | URL-friendly identifier |
| `image` | image | Yes | Profile photo |
| `bio` | text | Yes | Short bio (for article bylines) |
| `fullBio` | array (block) | No | Extended bio (for author page) |
| `role` | string | No | Job title/role |
| `credentials` | array (string) | No | Qualifications, degrees |
| `expertise` | array (string) | No | Areas of expertise (for schema) |
| `social` | object | No | Social media links |
| `email` | string | No | Contact email |
| `website` | url | No | Personal website |
| `isFounder` | boolean | No | Flag for primary author |

### Key Implementation Notes

```typescript
// Use defineField for each field (Sanity v3 pattern)
defineField({
  name: 'credentials',
  title: 'Credentials',
  type: 'array',
  of: [{type: 'string'}],
  description: 'Professional qualifications (e.g., "PhD in Food Science")',
})
```

### Preview Configuration
Show name, role, and profile image in the Studio list view.

### Validation
- Name: Required, max 100 characters
- Slug: Required, generated from name
- Bio: Required, max 300 characters
- Image: Required with alt text

---

## 3.2 Series Document Type

### Purpose
Group multi-part articles together (e.g., "Gut Health 101" series).

### Fields to Include

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Series name |
| `slug` | slug | Yes | URL identifier |
| `description` | text | Yes | Series overview |
| `image` | image | No | Series cover image |
| `articles` | array (reference) | No | Ordered list of articles |
| `isComplete` | boolean | No | Whether series is finished |

### Usage in Article
Add optional `series` reference field to article schema:

```typescript
defineField({
  name: 'series',
  title: 'Series',
  type: 'reference',
  to: [{type: 'series'}],
  description: 'If this article is part of a series',
})

defineField({
  name: 'seriesOrder',
  title: 'Order in Series',
  type: 'number',
  hidden: ({document}) => !document?.series,
  description: 'Position in the series (1, 2, 3...)',
})
```

---

## 3.3 Redirect Document Type

### Purpose
Manage URL redirects when article slugs change.

### Fields to Include

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `source` | string | Yes | Old URL path |
| `destination` | string | Yes | New URL path |
| `permanent` | boolean | Yes | 301 (permanent) or 302 (temporary) |
| `createdAt` | datetime | Yes | When redirect was created |
| `notes` | string | No | Reason for redirect |

### Example Entry
```
source: /the-perfect-make-ahead-coleslaw-vegetable-side-dish
destination: /recipes/overnight-coleslaw
permanent: true
notes: "URL cleanup - moved to recipes category"
```

### Integration
Query redirects in Next.js middleware or `next.config.js`:

```typescript
// In next.config.js
async redirects() {
  const redirects = await sanityClient.fetch(`*[_type == "redirect"]`)
  return redirects.map(r => ({
    source: r.source,
    destination: r.destination,
    permanent: r.permanent,
  }))
}
```

---

## 3.4 Site Settings Singleton

### Purpose
Global settings managed in Sanity (site name, social links, default SEO).

### Fields to Include

| Field | Type | Description |
|-------|------|-------------|
| `siteName` | string | "FoodPulse" |
| `tagline` | string | "Explore all things food" |
| `description` | text | Default meta description |
| `logo` | image | Site logo |
| `favicon` | image | Favicon |
| `socialLinks` | object | Social media URLs |
| `defaultAuthor` | reference | Fallback author |
| `footerText` | string | Copyright text |
| `analyticsId` | string | GA4 ID |

### Singleton Pattern
Use Sanity's desk structure to make this a singleton (only one document):

```typescript
// In structure.ts
S.listItem()
  .title('Settings')
  .id('settings')
  .child(
    S.document()
      .schemaType('settings')
      .documentId('settings') // Fixed ID = singleton
  )
```

---

# 4. Enhanced Article Schema

## 4.1 Field Groups

Organize fields into logical groups for better Studio UX:

```typescript
groups: [
  {name: 'content', title: 'Content', default: true},
  {name: 'metadata', title: 'Metadata'},
  {name: 'seo', title: 'SEO'},
  {name: 'recipe', title: 'Recipe Data'},
]
```

Then assign each field to a group:

```typescript
defineField({
  name: 'title',
  title: 'Title',
  type: 'string',
  group: 'content', // Appears in Content tab
})
```

## 4.2 New Fields to Add

### Reading Time (Calculated)
Option 1: Calculate in frontend from body content
Option 2: Add manual field for editor control

```typescript
defineField({
  name: 'readingTime',
  title: 'Reading Time (minutes)',
  type: 'number',
  description: 'Estimated reading time. Leave empty to auto-calculate.',
  group: 'metadata',
})
```

### Related Articles
Manual selection of related content:

```typescript
defineField({
  name: 'relatedArticles',
  title: 'Related Articles',
  type: 'array',
  of: [{type: 'reference', to: [{type: 'article'}]}],
  validation: (rule) => rule.max(4).unique(),
  description: 'Select up to 4 related articles',
  group: 'metadata',
})
```

### Table of Contents Toggle

```typescript
defineField({
  name: 'showTableOfContents',
  title: 'Show Table of Contents',
  type: 'boolean',
  description: 'Display a table of contents (auto-generated from H2/H3 headings)',
  initialValue: true,
  group: 'content',
})
```

### Social Share Image

```typescript
defineField({
  name: 'ogImage',
  title: 'Social Share Image',
  type: 'image',
  description: 'Custom image for social sharing (1200x630px). Falls back to featured image.',
  options: {
    accept: 'image/*',
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    }),
  ],
  group: 'seo',
})
```

### FAQ Section

```typescript
defineField({
  name: 'faq',
  title: 'FAQ Section',
  type: 'array',
  of: [{type: 'faqItem'}], // Custom object type
  description: 'Add FAQ items for rich snippets in search results',
  group: 'seo',
})
```

### Last Reviewed Date (E-E-A-T)

```typescript
defineField({
  name: 'reviewedAt',
  title: 'Last Reviewed',
  type: 'datetime',
  description: 'Date content was last fact-checked/reviewed',
  group: 'metadata',
})
```

### Sources/References

```typescript
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
        {name: 'author', type: 'string', title: 'Author (optional)'},
        {name: 'year', type: 'string', title: 'Year (optional)'},
      ],
      preview: {
        select: {title: 'title', subtitle: 'url'},
      },
    },
  ],
  description: 'Academic sources and references for E-E-A-T',
  group: 'content',
})
```

## 4.3 Author Field Update

Change from inline object to reference:

```typescript
// BEFORE (current)
defineField({
  name: 'author',
  type: 'object',
  fields: [...]
})

// AFTER (improved)
defineField({
  name: 'author',
  title: 'Author',
  type: 'reference',
  to: [{type: 'author'}],
  validation: (rule) => rule.required(),
  group: 'metadata',
})
```

## 4.4 Conditional Recipe Fields

Show recipe-specific fields only when category is "Recipes":

```typescript
defineField({
  name: 'recipeData',
  title: 'Recipe Information',
  type: 'recipeData', // Custom object type
  hidden: ({document}) => {
    // Hide unless category slug is 'recipes'
    // Note: This requires async resolution which Sanity doesn't support
    // Alternative: Use a boolean toggle
    return !document?.isRecipe
  },
  group: 'recipe',
})

// Simpler approach: Add a toggle
defineField({
  name: 'isRecipe',
  title: 'This is a Recipe',
  type: 'boolean',
  description: 'Enable recipe-specific fields',
  initialValue: false,
  group: 'metadata',
})
```

---

# 5. Enhanced Category Schema

## 5.1 Additional Fields

### SEO Fields for Category Pages

```typescript
defineField({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title for category page (e.g., "Food & Wellbeing Articles | FoodPulse")',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: (rule) => rule.max(160),
    }),
  ],
})
```

### Featured Image for Category Pages

```typescript
defineField({
  name: 'image',
  title: 'Category Image',
  type: 'image',
  description: 'Hero image for category landing page',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    }),
  ],
})
```

### Sort Order

```typescript
defineField({
  name: 'order',
  title: 'Display Order',
  type: 'number',
  description: 'Order in navigation (1 = first)',
  initialValue: 99,
})
```

---

# 6. SEO Optimization Features

## 6.1 SEO Object Type (Reusable)

Create a reusable SEO object that can be used across document types:

```typescript
// objects/seoType.ts
export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Overrides the default title. Keep under 60 characters.',
      validation: (rule) => rule.max(60).warning('Meta titles over 60 characters may be truncated'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description for search results. 150-160 characters recommended.',
      validation: (rule) => [
        rule.required().error('Meta description is required for SEO'),
        rule.min(120).warning('Meta description should be at least 120 characters'),
        rule.max(160).warning('Meta description should not exceed 160 characters'),
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Target keywords for this content',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'If this content exists elsewhere, enter the canonical URL',
    }),
  ],
})
```

## 6.2 Validation Patterns

### Character Count Validation with Warnings

```typescript
validation: (rule) => [
  rule.required().error('This field is required'),
  rule.min(100).warning('Consider adding more content'),
  rule.max(160).error('Maximum 160 characters'),
]
```

### Slug Validation

```typescript
defineField({
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title',
    maxLength: 96,
    slugify: (input) =>
      input
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .slice(0, 96),
  },
  validation: (rule) => rule.required(),
})
```

### Image Alt Text Validation

```typescript
defineField({
  name: 'image',
  type: 'image',
  validation: (rule) => rule.required(),
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Describe the image for accessibility and SEO',
      validation: (rule) => rule.required().error('Alt text is required for accessibility'),
    }),
  ],
})
```

## 6.3 Preview Improvements

Show SEO status in document list:

```typescript
preview: {
  select: {
    title: 'title',
    author: 'author.name',
    category: 'category.title',
    media: 'image',
    metaDescription: 'seo.metaDescription',
  },
  prepare({title, author, category, media, metaDescription}) {
    const seoStatus = metaDescription ? '✓ SEO' : '⚠️ No meta'
    return {
      title,
      subtitle: `${author || 'No author'} | ${category || 'No category'} | ${seoStatus}`,
      media,
    }
  },
}
```

---

# 7. Recipe-Specific Implementation

## 7.1 Recipe Data Object Type

Create a dedicated object type for recipe-specific data:

```typescript
// objects/recipeDataType.ts
export const recipeDataType = defineType({
  name: 'recipeData',
  title: 'Recipe Data',
  type: 'object',
  fields: [
    // Timing
    defineField({
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'restingTime',
      title: 'Resting/Marinating Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'totalTime',
      title: 'Total Time (minutes)',
      type: 'number',
      description: 'Auto-calculated if left empty',
      readOnly: true, // Calculate in frontend
    }),

    // Yield
    defineField({
      name: 'servings',
      title: 'Servings',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'yield',
      title: 'Yield',
      type: 'string',
      description: 'e.g., "12 cookies" or "2 loaves"',
    }),

    // Difficulty
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Easy', value: 'easy'},
          {title: 'Medium', value: 'medium'},
          {title: 'Hard', value: 'hard'},
        ],
        layout: 'radio',
      },
      initialValue: 'easy',
    }),

    // Categorization
    defineField({
      name: 'cuisine',
      title: 'Cuisine',
      type: 'string',
      description: 'e.g., Mediterranean, Asian, American',
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'string',
      options: {
        list: [
          'Breakfast',
          'Lunch',
          'Dinner',
          'Appetizer',
          'Side Dish',
          'Dessert',
          'Snack',
          'Beverage',
        ],
      },
    }),
    defineField({
      name: 'diet',
      title: 'Dietary Information',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Vegetarian', value: 'vegetarian'},
          {title: 'Vegan', value: 'vegan'},
          {title: 'Gluten-Free', value: 'gluten-free'},
          {title: 'Dairy-Free', value: 'dairy-free'},
          {title: 'Nut-Free', value: 'nut-free'},
          {title: 'Low-Carb', value: 'low-carb'},
          {title: 'Keto', value: 'keto'},
          {title: 'Paleo', value: 'paleo'},
        ],
      },
    }),

    // Ingredients
    defineField({
      name: 'ingredientGroups',
      title: 'Ingredient Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'groupName',
              title: 'Group Name',
              type: 'string',
              description: 'e.g., "For the dressing" (optional)',
            },
            {
              name: 'ingredients',
              title: 'Ingredients',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'amount', type: 'string', title: 'Amount'},
                    {name: 'unit', type: 'string', title: 'Unit'},
                    {name: 'ingredient', type: 'string', title: 'Ingredient'},
                    {name: 'notes', type: 'string', title: 'Notes'},
                  ],
                  preview: {
                    select: {
                      amount: 'amount',
                      unit: 'unit',
                      ingredient: 'ingredient',
                    },
                    prepare({amount, unit, ingredient}) {
                      return {
                        title: `${amount || ''} ${unit || ''} ${ingredient || ''}`.trim(),
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {groupName: 'groupName', ingredients: 'ingredients'},
            prepare({groupName, ingredients}) {
              const count = ingredients?.length || 0
              return {
                title: groupName || 'Ingredients',
                subtitle: `${count} ingredient${count !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    }),

    // Instructions
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            },
            {
              name: 'image',
              title: 'Step Image (optional)',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'tip',
              title: 'Tip (optional)',
              type: 'string',
              description: 'Optional tip for this step',
            },
          ],
          preview: {
            select: {step: 'step'},
            prepare({step}, {index}) {
              return {
                title: `Step ${(index || 0) + 1}`,
                subtitle: step?.slice(0, 50) + '...',
              }
            },
          },
        },
      ],
    }),

    // Nutrition
    defineField({
      name: 'nutrition',
      title: 'Nutrition (per serving)',
      type: 'object',
      fields: [
        {name: 'calories', type: 'number', title: 'Calories'},
        {name: 'protein', type: 'string', title: 'Protein'},
        {name: 'carbohydrates', type: 'string', title: 'Carbohydrates'},
        {name: 'fat', type: 'string', title: 'Fat'},
        {name: 'fiber', type: 'string', title: 'Fiber'},
        {name: 'sugar', type: 'string', title: 'Sugar'},
        {name: 'sodium', type: 'string', title: 'Sodium'},
      ],
    }),

    // Notes
    defineField({
      name: 'notes',
      title: 'Recipe Notes',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tips, variations, storage instructions',
    }),
  ],
})
```

## 7.2 Conditional Display in Article

The recipe data should only appear when the article is flagged as a recipe:

```typescript
// In articleType.ts
defineField({
  name: 'isRecipe',
  title: 'This is a Recipe Article',
  type: 'boolean',
  description: 'Enable to show recipe-specific fields',
  initialValue: false,
  group: 'metadata',
}),

defineField({
  name: 'recipeData',
  title: 'Recipe Information',
  type: 'recipeData',
  hidden: ({document}) => !document?.isRecipe,
  group: 'recipe',
}),
```

## 7.3 Recipe Schema Generation

Use the structured recipe data to generate JSON-LD in your frontend:

```typescript
// Example GROQ query for recipe
const recipeQuery = `*[_type == "article" && slug.current == $slug && isRecipe == true][0]{
  title,
  "slug": slug.current,
  excerpt,
  image,
  author->{name, image},
  publishedAt,
  recipeData {
    prepTime,
    cookTime,
    restingTime,
    servings,
    difficulty,
    cuisine,
    course,
    diet,
    ingredientGroups[] {
      groupName,
      ingredients[] {
        amount,
        unit,
        ingredient,
        notes
      }
    },
    instructions[] {
      step,
      image,
      tip
    },
    nutrition
  }
}`
```

---

# 8. Studio Customization

## 8.1 Desk Structure

Organize the Studio sidebar for better navigation:

```typescript
// structure.ts
import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Articles Section
      S.listItem()
        .title('Articles')
        .child(
          S.list()
            .title('Articles')
            .items([
              // All Articles
              S.listItem()
                .title('All Articles')
                .child(S.documentTypeList('article').title('All Articles')),
              
              // By Category
              S.listItem()
                .title('By Category')
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Articles')
                        .filter('_type == "article" && category._ref == $categoryId')
                        .params({categoryId})
                    )
                ),
              
              // Featured Articles
              S.listItem()
                .title('Featured Articles')
                .child(
                  S.documentList()
                    .title('Featured')
                    .filter('_type == "article" && featured == true')
                ),
              
              // Recipes
              S.listItem()
                .title('Recipes')
                .child(
                  S.documentList()
                    .title('Recipes')
                    .filter('_type == "article" && isRecipe == true')
                ),
              
              // Drafts
              S.listItem()
                .title('Drafts')
                .child(
                  S.documentList()
                    .title('Drafts')
                    .filter('_type == "article" && !defined(publishedAt)')
                ),
            ])
        ),
      
      S.divider(),
      
      // Authors
      S.listItem()
        .title('Authors')
        .child(S.documentTypeList('author').title('Authors')),
      
      // Categories
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),
      
      // Series
      S.listItem()
        .title('Series')
        .child(S.documentTypeList('series').title('Series')),
      
      S.divider(),
      
      // Redirects
      S.listItem()
        .title('Redirects')
        .child(S.documentTypeList('redirect').title('Redirects')),
      
      // Settings (Singleton)
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
    ])
```

## 8.2 Document Actions

Customize which actions appear for each document type:

```typescript
// In sanity.config.ts
import {defineConfig} from 'sanity'

export default defineConfig({
  // ... other config
  document: {
    actions: (prev, context) => {
      // Remove delete action for settings singleton
      if (context.schemaType === 'settings') {
        return prev.filter((action) => action.action !== 'delete')
      }
      return prev
    },
  },
})
```

## 8.3 Input Components (Optional)

Create custom input components for specialized needs:

```typescript
// Example: Character count input
// components/CharacterCountInput.tsx
import {TextInput, Stack, Text} from '@sanity/ui'
import {StringInputProps} from 'sanity'

export function CharacterCountInput(props: StringInputProps) {
  const {value = '', elementProps} = props
  const maxLength = 160

  return (
    <Stack space={2}>
      <TextInput {...elementProps} />
      <Text size={1} muted>
        {value.length}/{maxLength} characters
        {value.length > maxLength && ' (too long!)'}
      </Text>
    </Stack>
  )
}

// Use in schema:
defineField({
  name: 'metaDescription',
  type: 'string',
  components: {
    input: CharacterCountInput,
  },
})
```

---

# 9. GROQ Query Patterns

## 9.1 Article List Query

```groq
*[_type == "article" && defined(publishedAt)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "category": category->{
    title,
    "slug": slug.current,
    color,
    icon
  },
  "author": author->{
    name,
    "slug": slug.current,
    image
  },
  image {
    asset->{url},
    alt
  },
  "readingTime": round(length(pt::text(body)) / 5 / 200)
}[0...12]
```

## 9.2 Single Article Query

```groq
*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  updatedAt,
  reviewedAt,
  "category": category->{
    title,
    "slug": slug.current,
    color
  },
  "author": author->{
    name,
    "slug": slug.current,
    image,
    bio,
    credentials,
    social
  },
  image {
    asset->{url, metadata},
    alt
  },
  "ogImage": ogImage.asset->url,
  seo,
  tags,
  faq,
  sources,
  isRecipe,
  recipeData,
  showTableOfContents,
  "relatedArticles": relatedArticles[]->{
    title,
    "slug": slug.current,
    excerpt,
    image,
    "category": category->{title, color}
  },
  "series": series->{
    title,
    "slug": slug.current,
    "articles": *[_type == "article" && references(^._id)] | order(seriesOrder asc) {
      title,
      "slug": slug.current,
      seriesOrder
    }
  },
  "readingTime": round(length(pt::text(body)) / 5 / 200)
}
```

## 9.3 Category Page Query

```groq
{
  "category": *[_type == "category" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    image,
    seo
  },
  "articles": *[_type == "article" && category->slug.current == $slug && defined(publishedAt)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image,
    "author": author->{name},
    "readingTime": round(length(pt::text(body)) / 5 / 200)
  }[0...$limit],
  "total": count(*[_type == "article" && category->slug.current == $slug])
}
```

## 9.4 Sitemap Query

```groq
{
  "articles": *[_type == "article" && defined(publishedAt)] | order(publishedAt desc) {
    "slug": slug.current,
    "category": category->slug.current,
    publishedAt,
    updatedAt
  },
  "categories": *[_type == "category"] {
    "slug": slug.current
  },
  "authors": *[_type == "author"] {
    "slug": slug.current
  }
}
```

## 9.5 Recipe-Specific Query

```groq
*[_type == "article" && isRecipe == true && defined(publishedAt)] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  image,
  "prepTime": recipeData.prepTime,
  "cookTime": recipeData.cookTime,
  "totalTime": recipeData.prepTime + coalesce(recipeData.cookTime, 0) + coalesce(recipeData.restingTime, 0),
  "servings": recipeData.servings,
  "difficulty": recipeData.difficulty,
  "diet": recipeData.diet,
  "course": recipeData.course
}
```

---

# 10. Migration Strategy

## 10.1 Migration Order

Execute changes in this order to avoid breaking the Studio:

### Phase 1: Non-Breaking Additions
1. Create new document types (Author, Series, Redirect, Settings)
2. Create new object types (recipeData, faqItem, seo)
3. Add new optional fields to Article schema
4. Deploy and verify Studio works

### Phase 2: Data Migration
1. Create Author documents from existing inline author data
2. Link existing articles to new Author documents
3. Backfill SEO meta descriptions where missing
4. Create redirect entries for any URL changes

### Phase 3: Breaking Changes
1. Change author field from object to reference
2. Remove deprecated fields
3. Update frontend queries

## 10.2 Author Migration Script

```typescript
// Example migration script (run via Sanity CLI)
// sanity exec migrations/migrateAuthors.ts --with-user-token

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
})

async function migrateAuthors() {
  // 1. Get all unique author names from articles
  const articles = await client.fetch(`*[_type == "article" && defined(author.name)]{
    _id,
    author
  }`)

  const uniqueAuthors = [...new Set(articles.map(a => a.author?.name).filter(Boolean))]

  // 2. Create author documents
  for (const name of uniqueAuthors) {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    
    await client.createIfNotExists({
      _id: `author-${slug}`,
      _type: 'author',
      name,
      slug: {current: slug},
      bio: 'Evidence-based food education', // Default
    })
    
    console.log(`Created author: ${name}`)
  }

  // 3. Update articles to reference author documents
  // (This step requires the schema change to be deployed first)
}

migrateAuthors()
```

## 10.3 Backup Before Migration

Always create a backup before major changes:

```bash
# Export current dataset
sanity dataset export production backup-before-migration.tar.gz

# Or copy to a staging dataset
sanity dataset copy production staging
```

---

# 11. Quality Checklist

## 11.1 Schema Validation Checklist

### Article Schema
- [ ] Title: Required, max 100 characters
- [ ] Slug: Required, auto-generated from title
- [ ] Excerpt: Required, 100-160 characters
- [ ] Category: Required, reference to category
- [ ] Author: Required, reference to author
- [ ] Featured Image: Required with alt text
- [ ] Body: Required
- [ ] SEO Meta Title: Optional, max 60 characters
- [ ] SEO Meta Description: Required, 120-160 characters
- [ ] Published At: Required (can default to creation date)

### Author Schema
- [ ] Name: Required, max 100 characters
- [ ] Slug: Required, auto-generated
- [ ] Image: Required with alt text
- [ ] Bio: Required, max 300 characters

### Category Schema
- [ ] Title: Required
- [ ] Slug: Required, auto-generated
- [ ] Description: Recommended
- [ ] Color: Valid hex format

## 11.2 SEO Requirements Checklist

### Every Article Must Have:
- [ ] Unique, descriptive title (under 70 characters)
- [ ] Meta description (150-160 characters)
- [ ] Featured image with descriptive alt text
- [ ] Author attribution (for E-E-A-T)
- [ ] Category assignment
- [ ] At least 3 target keywords
- [ ] Proper heading hierarchy in body (H2 → H3)
- [ ] Internal links to related content
- [ ] Published date visible

### Recipe Articles Must Also Have:
- [ ] Prep time, cook time, total time
- [ ] Serving size/yield
- [ ] Complete ingredient list
- [ ] Step-by-step instructions
- [ ] Nutrition information (recommended)
- [ ] Difficulty level

## 11.3 Content Quality Checklist

### Before Publishing:
- [ ] Title is compelling and includes primary keyword
- [ ] Excerpt summarizes the article and entices clicks
- [ ] Featured image is high-quality and relevant
- [ ] Body content is well-structured with headings
- [ ] All images have alt text
- [ ] Links are working (internal and external)
- [ ] No placeholder text remaining
- [ ] Spelling and grammar checked
- [ ] Meta description written (not auto-generated)
- [ ] At least 3 related articles selected (if available)

---

# Summary: Priority Implementation Order

## Immediate (This Week)
1. ✅ Create Author document type
2. ✅ Create reusable SEO object type
3. ✅ Add `ogImage` field to Article
4. ✅ Make `seo.metaDescription` required
5. ✅ Add `relatedArticles` field
6. ✅ Update desk structure for better navigation

## Short-Term (This Month)
1. Create Recipe data object type
2. Add `isRecipe` toggle and `recipeData` field
3. Create Redirect document type
4. Create Site Settings singleton
5. Migrate existing inline authors to Author documents
6. Add FAQ object type

## Medium-Term (Next Quarter)
1. Create Series document type
2. Add reading time calculation
3. Add sources/references field
4. Add `reviewedAt` field for E-E-A-T
5. Build custom input components (character count, etc.)
6. Set up automated validation checks

---

**Document Version:** 1.0  
**Created:** January 2025  
**For:** FoodPulse Development Team  
**Sanity Docs Reference:** https://www.sanity.io/docs
