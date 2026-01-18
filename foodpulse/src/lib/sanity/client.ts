import { client } from '@/sanity/lib/client'
import type {
  Article,
  ArticleListItem,
  Author,
  Category,
  Redirect,
  SiteSettings,
} from './types'
import {
  ARTICLE_LIST_QUERY,
  FEATURED_ARTICLES_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  ARTICLES_BY_CATEGORY_QUERY,
  ALL_CATEGORIES_QUERY,
  AUTHOR_BY_SLUG_QUERY,
  ALL_AUTHORS_QUERY,
  SITE_SETTINGS_QUERY,
  REDIRECTS_QUERY,
  SEARCH_QUERY,
  RECIPES_QUERY,
  SITEMAP_QUERY,
} from './queries'

// ========================================
// Article Functions
// ========================================

export async function getArticles(limit: number = 12): Promise<ArticleListItem[]> {
  return await client.fetch(ARTICLE_LIST_QUERY, { limit })
}

export async function getFeaturedArticles(limit: number = 4): Promise<ArticleListItem[]> {
  return await client.fetch(FEATURED_ARTICLES_QUERY, { limit })
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
}

export async function getArticlesByCategory(
  categorySlug: string,
  limit: number = 12
): Promise<{
  category: Category
  articles: ArticleListItem[]
  total: number
}> {
  return await client.fetch(ARTICLES_BY_CATEGORY_QUERY, { slug: categorySlug, limit })
}

export async function searchArticles(searchTerm: string): Promise<ArticleListItem[]> {
  // Add wildcards for partial matching
  const term = `*${searchTerm}*`
  return await client.fetch(SEARCH_QUERY, { searchTerm: term })
}

export async function getRecipes(limit: number = 12): Promise<ArticleListItem[]> {
  return await client.fetch(RECIPES_QUERY, { limit })
}

// ========================================
// Category Functions
// ========================================

export async function getAllCategories(): Promise<Category[]> {
  return await client.fetch(ALL_CATEGORIES_QUERY)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const query = `*[_type == "category" && slug.current == $slug][0]`
  return await client.fetch(query, { slug })
}

// ========================================
// Author Functions
// ========================================

export async function getAllAuthors(): Promise<Author[]> {
  return await client.fetch(ALL_AUTHORS_QUERY)
}

export async function getAuthorBySlug(
  slug: string
): Promise<{
  author: Author
  articles: ArticleListItem[]
  articleCount: number
} | null> {
  return await client.fetch(AUTHOR_BY_SLUG_QUERY, { slug })
}

// ========================================
// Settings Functions
// ========================================

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await client.fetch(SITE_SETTINGS_QUERY)
}

// ========================================
// Redirect Functions
// ========================================

export async function getRedirects(): Promise<Redirect[]> {
  return await client.fetch(REDIRECTS_QUERY)
}

// ========================================
// Sitemap Functions
// ========================================

export async function getSitemapData() {
  return await client.fetch(SITEMAP_QUERY)
}

// ========================================
// Utility Functions
// ========================================

/**
 * Generate all article paths for static generation
 */
export async function getAllArticlePaths(): Promise<
  { category: string; slug: string }[]
> {
  const query = `
    *[_type == "article" && defined(publishedAt)] {
      "slug": slug.current,
      "category": category->slug.current
    }
  `
  return await client.fetch(query)
}

/**
 * Generate all category paths for static generation
 */
export async function getAllCategoryPaths(): Promise<string[]> {
  const query = `*[_type == "category"].slug.current`
  return await client.fetch(query)
}

/**
 * Generate all author paths for static generation
 */
export async function getAllAuthorPaths(): Promise<string[]> {
  const query = `*[_type == "author"].slug.current`
  return await client.fetch(query)
}
