# Articles Directory

This directory will contain article content files. Articles can be stored as:

1. **MDX files** - For file-based content management
2. **JSON files** - For structured content
3. **CMS integration** - Via Sanity, Contentful, or similar

## Structure

```
articles/
├── food-wellbeing/
│   ├── gut-health-beginners-guide.mdx
│   ├── anti-inflammatory-foods.mdx
│   └── ...
├── smart-food-choices/
│   ├── reading-nutrition-labels.mdx
│   ├── organic-vs-conventional.mdx
│   └── ...
├── food-system-insights/
│   ├── what-is-a-food-system.mdx
│   ├── sustainable-agriculture.mdx
│   └── ...
├── practical-food-tips/
│   ├── meal-prep-beginners.mdx
│   ├── seasonal-eating-guide.mdx
│   └── ...
└── recipes/
    ├── mediterranean-quinoa-bowl.mdx
    ├── overnight-oats-variations.mdx
    └── ...
```

## Article Front Matter

Each article should include front matter with metadata:

```yaml
---
title: "Your Article Title"
slug: "article-url-slug"
excerpt: "Brief description of the article (150-160 characters)"
category: "food-wellbeing"
tags: ["gut health", "nutrition", "digestion"]
publishedAt: "2025-01-15"
updatedAt: "2025-01-16"
author:
  name: "FoodPulse Team"
  bio: "Evidence-based food education"
featured: false
image:
  src: "/images/articles/article-image.jpg"
  alt: "Descriptive alt text"
seo:
  metaTitle: "SEO Optimized Title | FoodPulse"
  metaDescription: "Meta description for search engines"
  keywords: ["keyword1", "keyword2"]
---
```

## Content Guidelines

Follow the editorial guidelines from the FoodPulse development guide:

- Evidence-based and well-researched
- Cite sources and studies
- Clear, accessible language
- Actionable takeaways
- Proper heading hierarchy (H2, H3, H4)
- Include images with alt text
- Add internal links to related articles
