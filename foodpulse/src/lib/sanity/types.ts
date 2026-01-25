import type { PortableTextBlock } from '@portabletext/types'

// ========================================
// Base Types
// ========================================

export interface SanityImage {
  asset: {
    url: string
    metadata?: {
      dimensions?: {
        width: number
        height: number
        aspectRatio: number
      }
      lqip?: string
    }
  }
  alt: string
  caption?: string
}

export interface SEO {
  metaTitle?: string
  metaDescription: string
  keywords?: string[]
  noIndex?: boolean
  canonicalUrl?: string
}

export interface FAQItem {
  question: string
  answer: string
}

// ========================================
// Author
// ========================================

export interface Author {
  _id: string
  name: string
  slug: string
  image: SanityImage
  bio: string
  fullBio?: PortableTextBlock[]
  role?: string
  credentials?: string[]
  expertise?: string[]
  social?: {
    twitter?: string
    linkedin?: string
    instagram?: string
    website?: string
  }
  email?: string
  isFounder?: boolean
}

// ========================================
// Category
// ========================================

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  image?: SanityImage
  color?: string
  icon?: string
  order?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

// ========================================
// Series
// ========================================

export interface Series {
  _id: string
  title: string
  slug: string
  description: string
  image?: SanityImage
  isComplete?: boolean
  articles?: ArticleListItem[]
}

// ========================================
// Recipe
// ========================================

export interface RecipeIngredient {
  amount?: string
  unit?: string
  ingredient: string
  notes?: string
}

export interface RecipeIngredientGroup {
  groupName?: string
  ingredients: RecipeIngredient[]
}

export interface RecipeInstruction {
  step: string
  image?: SanityImage
  tip?: string
}

export interface RecipeNutrition {
  calories?: number
  protein?: string
  carbohydrates?: string
  fat?: string
  fiber?: string
  sugar?: string
  sodium?: string
}

export interface RecipeData {
  author?: string
  prepTime: number
  cookTime?: number
  restingTime?: number
  servings: number
  yield?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  cuisine?: string
  course?: string
  diet?: string[]
  ingredientGroups?: RecipeIngredientGroup[]
  instructions?: RecipeInstruction[]
  nutrition?: RecipeNutrition
  notes?: string[]
}

// ========================================
// Source/Reference
// ========================================

export interface Source {
  title: string
  url: string
  author?: string
  year?: string
}

// ========================================
// Article (Full)
// ========================================

export interface Article {
  _id: string
  title: string
  slug: string
  excerpt: string
  body: PortableTextBlock[]
  publishedAt: string
  updatedAt?: string
  reviewedAt?: string
  featured?: boolean
  showTableOfContents?: boolean

  // Relations
  category: Category
  author: Author
  tags?: string[]

  // Media
  image: SanityImage
  ogImage?: string

  // SEO
  seo?: SEO
  faq?: FAQItem[]
  sources?: Source[]

  // Metadata
  readingTime?: number
  relatedArticles?: ArticleListItem[]
  series?: Series
  seriesOrder?: number

  // Recipe
  isRecipe?: boolean
  recipeData?: RecipeData
}

// ========================================
// Article (List Item - for grids/cards)
// ========================================

export interface ArticleListItem {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  featured?: boolean
  category: {
    title: string
    slug: string
    color?: string
    icon?: string
  }
  author: {
    name: string
    slug: string
  }
  image: {
    url: string
    alt: string
  }
  readingTime?: number
  isRecipe?: boolean
  recipePreview?: {
    prepTime: number
    cookTime?: number
    servings: number
    difficulty?: string
  }
}

// ========================================
// Settings
// ========================================

export interface SiteSettings {
  _id: string
  siteName: string
  tagline?: string
  description?: string
  logo?: SanityImage
  favicon?: SanityImage
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    pinterest?: string
  }
  defaultAuthor?: Author
  footerText?: string
  analyticsId?: string
}

// ========================================
// Redirect
// ========================================

export interface Redirect {
  source: string
  destination: string
  permanent: boolean
}

// ========================================
// Glossary
// ========================================

export interface GlossarySource {
  title: string
  url: string
  organization?: string
}

export interface GlossaryTerm {
  _id: string
  term: string
  slug: string
  pronunciation?: string
  shortDefinition: string
  fullDefinition: PortableTextBlock[]
  example?: string
  whyItMatters?: string
  commonMisconceptions?: string[]
  category: string
  relatedTerms?: {
    term: string
    slug: string
    shortDefinition: string
    category: string
  }[]
  relatedArticles?: {
    title: string
    slug: string
    excerpt: string
    category: {
      title: string
      slug: string
    }
  }[]
  sources?: GlossarySource[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  publishedAt: string
  updatedAt?: string
}

export interface GlossaryTermListItem {
  _id: string
  term: string
  slug: string
  shortDefinition: string
  category: string
  letter: string
}
