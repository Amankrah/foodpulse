// ========================================
// GROQ Query Fragments
// ========================================

const imageFragment = `
  asset->{url, metadata},
  alt,
  caption
`

const authorFragment = `
  name,
  "slug": slug.current,
  image {${imageFragment}},
  bio,
  role,
  credentials,
  expertise,
  social
`

const categoryFragment = `
  title,
  "slug": slug.current,
  color,
  icon,
  description
`

const seoFragment = `
  metaTitle,
  metaDescription,
  keywords,
  noIndex,
  canonicalUrl
`

// ========================================
// Article List Query (for grids/cards)
// ========================================

export const ARTICLE_LIST_QUERY = `
*[_type == "article" && defined(publishedAt)] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,

  "category": category->{${categoryFragment}},

  "author": author->{
    name,
    "slug": slug.current
  },

  image {
    "url": asset->url,
    alt
  },

  "readingTime": coalesce(readingTime, round(length(pt::text(body)) / 5 / 200)),

  isRecipe,
  "recipePreview": select(
    isRecipe => {
      "prepTime": recipeData.prepTime,
      "cookTime": recipeData.cookTime,
      "servings": recipeData.servings,
      "difficulty": recipeData.difficulty
    }
  )
}
`

// ========================================
// Featured Articles Query
// ========================================

export const FEATURED_ARTICLES_QUERY = `
*[_type == "article" && featured == true && defined(publishedAt)]
  | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,

  image {
    "url": asset->url,
    alt
  },

  "category": category->{${categoryFragment}},

  "author": author->{
    name,
    "slug": slug.current
  },

  "readingTime": coalesce(readingTime, round(length(pt::text(body)) / 5 / 200))
}
`

// ========================================
// Single Article Query (Full)
// ========================================

export const ARTICLE_BY_SLUG_QUERY = `
*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  updatedAt,
  reviewedAt,
  featured,
  showTableOfContents,

  "category": category->{
    _id,
    ${categoryFragment}
  },

  "author": author->{
    _id,
    ${authorFragment}
  },

  image {${imageFragment}},

  "ogImage": coalesce(
    ogImage.asset->url,
    image.asset->url
  ),

  seo {${seoFragment}},

  tags,

  faq[] {
    question,
    answer
  },

  sources[] {
    title,
    url,
    author,
    year
  },

  "readingTime": coalesce(readingTime, round(length(pt::text(body)) / 5 / 200)),

  "relatedArticles": relatedArticles[]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image {
      "url": asset->url,
      alt
    },
    "category": category->{${categoryFragment}},
    "author": author->name
  },

  "series": series->{
    _id,
    title,
    "slug": slug.current,
    description,
    isComplete,
    "articles": *[_type == "article" && references(^._id)] | order(seriesOrder asc) {
      title,
      "slug": slug.current,
      seriesOrder,
      excerpt
    }
  },

  seriesOrder,

  isRecipe,
  recipeData {
    author,
    prepTime,
    cookTime,
    restingTime,
    servings,
    yield,
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
      image {${imageFragment}},
      tip
    },
    nutrition {
      calories,
      protein,
      carbohydrates,
      fat,
      fiber,
      sugar,
      sodium
    },
    notes
  }
}
`

// ========================================
// Articles by Category Query
// ========================================

export const ARTICLES_BY_CATEGORY_QUERY = `
{
  "category": *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    color,
    icon,
    image {${imageFragment}},
    seo {
      metaTitle,
      metaDescription
    }
  },

  "articles": *[_type == "article" && category->slug.current == $slug && defined(publishedAt)]
    | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image {
      "url": asset->url,
      alt
    },
    "category": category->{${categoryFragment}},
    "author": author->{
      name,
      "slug": slug.current
    },
    "readingTime": coalesce(readingTime, round(length(pt::text(body)) / 5 / 200)),
    isRecipe
  },

  "total": count(*[_type == "article" && category->slug.current == $slug && defined(publishedAt)])
}
`

// ========================================
// All Categories Query
// ========================================

export const ALL_CATEGORIES_QUERY = `
*[_type == "category"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  color,
  icon,
  order,
  "articleCount": count(*[_type == "article" && references(^._id) && defined(publishedAt)])
}
`

// ========================================
// Author Query
// ========================================

export const AUTHOR_BY_SLUG_QUERY = `
{
  "author": *[_type == "author" && slug.current == $slug][0] {
    _id,
    ${authorFragment},
    fullBio,
    email,
    isFounder
  },

  "articles": *[_type == "article" && author->slug.current == $slug && defined(publishedAt)]
    | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image {
      "url": asset->url,
      alt
    },
    "category": category->{${categoryFragment}}
  },

  "articleCount": count(*[_type == "article" && author->slug.current == $slug && defined(publishedAt)])
}
`

// ========================================
// All Authors Query
// ========================================

export const ALL_AUTHORS_QUERY = `
*[_type == "author"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  bio,
  role,
  image {
    "url": asset->url,
    alt
  },
  isFounder,
  "articleCount": count(*[_type == "article" && references(^._id) && defined(publishedAt)])
}
`

// ========================================
// Site Settings Query
// ========================================

export const SITE_SETTINGS_QUERY = `
*[_type == "settings" && _id == "settings"][0] {
  _id,
  siteName,
  tagline,
  description,
  logo {${imageFragment}},
  favicon {
    "url": asset->url
  },
  socialLinks {
    facebook,
    twitter,
    instagram,
    youtube,
    pinterest
  },
  "defaultAuthor": defaultAuthor->{
    name,
    "slug": slug.current
  },
  footerText,
  analyticsId
}
`

// ========================================
// Redirects Query
// ========================================

export const REDIRECTS_QUERY = `
*[_type == "redirect"] {
  source,
  destination,
  permanent
}
`

// ========================================
// Search Query
// ========================================

export const SEARCH_QUERY = `
*[
  _type == "article"
  && (
    title match $searchTerm
    || excerpt match $searchTerm
    || pt::text(body) match $searchTerm
  )
  && defined(publishedAt)
] | order(publishedAt desc) [0...20] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "category": category->title,
  "author": author->name,
  image {
    "url": asset->url,
    alt
  }
}
`

// ========================================
// Recipes Query
// ========================================

export const RECIPES_QUERY = `
*[_type == "article" && isRecipe == true && defined(publishedAt)]
  | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  image {
    "url": asset->url,
    alt
  },
  "category": category->{${categoryFragment}},
  "prepTime": recipeData.prepTime,
  "cookTime": recipeData.cookTime,
  "totalTime": recipeData.prepTime + coalesce(recipeData.cookTime, 0) + coalesce(recipeData.restingTime, 0),
  "servings": recipeData.servings,
  "difficulty": recipeData.difficulty,
  "diet": recipeData.diet,
  "course": recipeData.course,
  "cuisine": recipeData.cuisine,
  publishedAt
}
`

// ========================================
// Previous/Next Article Navigation Query
// ========================================

export const PREV_NEXT_ARTICLES_QUERY = `
{
  "previous": *[
    _type == "article"
    && category->slug.current == $categorySlug
    && publishedAt < $currentPublishedAt
    && defined(publishedAt)
  ] | order(publishedAt desc) [0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image {
      "url": asset->url,
      alt
    },
    "category": category->{${categoryFragment}}
  },

  "next": *[
    _type == "article"
    && category->slug.current == $categorySlug
    && publishedAt > $currentPublishedAt
    && defined(publishedAt)
  ] | order(publishedAt asc) [0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image {
      "url": asset->url,
      alt
    },
    "category": category->{${categoryFragment}}
  }
}
`

// ========================================
// Sitemap Query
// ========================================

export const SITEMAP_QUERY = `
{
  "articles": *[_type == "article" && defined(publishedAt)]
    | order(publishedAt desc) {
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
  },

  "glossaryTerms": *[_type == "glossaryTerm" && defined(publishedAt)] {
    "slug": slug.current,
    publishedAt,
    updatedAt
  }
}
`

// ========================================
// Glossary Queries
// ========================================

export const GLOSSARY_HUB_QUERY = `
{
  "terms": *[_type == "glossaryTerm" && defined(publishedAt)] | order(term asc) {
    _id,
    term,
    "slug": slug.current,
    shortDefinition,
    category,
    "letter": upper(string::split(term, "")[0])
  },
  "categories": array::unique(*[_type == "glossaryTerm"].category),
  "totalCount": count(*[_type == "glossaryTerm" && defined(publishedAt)])
}
`

export const GLOSSARY_TERM_BY_SLUG_QUERY = `
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
  "relatedTerms": relatedTerms[]-> {
    term,
    "slug": slug.current,
    shortDefinition,
    category
  },
  "relatedArticles": relatedArticles[]-> {
    title,
    "slug": slug.current,
    excerpt,
    "category": category->{title, "slug": slug.current}
  },
  sources,
  seo,
  publishedAt,
  updatedAt
}
`

export const GLOSSARY_TERMS_BY_CATEGORY_QUERY = `
*[_type == "glossaryTerm" && category == $category && defined(publishedAt)] | order(term asc) {
  term,
  "slug": slug.current,
  shortDefinition,
  category
}
`

export const GLOSSARY_SEARCH_QUERY = `
*[_type == "glossaryTerm" && (
  term match $query + "*" ||
  shortDefinition match $query + "*" ||
  pt::text(fullDefinition) match $query + "*"
) && defined(publishedAt)] | order(term asc) [0...20] {
  term,
  "slug": slug.current,
  shortDefinition,
  category
}
`

export const ALL_GLOSSARY_SLUGS_QUERY = `
*[_type == "glossaryTerm" && defined(publishedAt)] {
  "slug": slug.current
}
`

// ========================================
// FAQ Queries
// ========================================

export const FAQ_PAGE_QUERY = `
{
  "categories": [
    {
      "slug": "about-foodpulse",
      "title": "About FoodPulse",
      "icon": "🏠",
      "description": "Learn about our mission, team, and how we create content.",
      "faqs": *[_type == "faqDocument" && category == "about-foodpulse" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current, "category": category->slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    },
    {
      "slug": "food-nutrition",
      "title": "Food & Nutrition Basics",
      "icon": "🥗",
      "description": "Common questions about nutrients, diet, and healthy eating.",
      "faqs": *[_type == "faqDocument" && category == "food-nutrition" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current, "category": category->slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    },
    {
      "slug": "food-labels",
      "title": "Understanding Food Labels",
      "icon": "🏷️",
      "description": "Decode nutrition labels, certifications, and marketing claims.",
      "faqs": *[_type == "faqDocument" && category == "food-labels" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current, "category": category->slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    },
    {
      "slug": "food-systems",
      "title": "Food Systems & Sustainability",
      "icon": "🌾",
      "description": "Understand where food comes from and its environmental impact.",
      "faqs": *[_type == "faqDocument" && category == "food-systems" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current, "category": category->slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    },
    {
      "slug": "using-foodpulse",
      "title": "Using FoodPulse",
      "icon": "💻",
      "description": "Get the most out of FoodPulse content and features.",
      "faqs": *[_type == "faqDocument" && category == "using-foodpulse" && isPublished == true] | order(order asc) {
        _id,
        question,
        "slug": slug.current,
        shortAnswer,
        fullAnswer,
        "relatedArticle": relatedArticle->{title, "slug": slug.current, "category": category->slug.current},
        "relatedGlossaryTerm": relatedGlossaryTerm->{term, "slug": slug.current}
      }
    }
  ],
  "totalCount": count(*[_type == "faqDocument" && isPublished == true]),
  "featuredFaqs": *[_type == "faqDocument" && isFeatured == true && isPublished == true] | order(order asc) {
    _id,
    question,
    "slug": slug.current,
    shortAnswer,
    category
  }
}
`

export const FAQ_SEARCH_QUERY = `
*[_type == "faqDocument" && isPublished == true && (
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
`
