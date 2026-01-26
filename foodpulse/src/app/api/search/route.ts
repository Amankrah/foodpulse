import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const contentType = searchParams.get('type') || 'all' // all, articles, guides, glossary, faq, tools
  const category = searchParams.get('category') || ''
  const limit = parseInt(searchParams.get('limit') || '20')

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: false,
      error: 'Query must be at least 2 characters',
    })
  }

  try {
    const results = await searchContent(query, contentType, category, limit)

    return NextResponse.json({
      success: true,
      data: {
        query,
        contentType,
        results,
        totalCount: results.length,
      },
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({
      success: false,
      error: 'Search failed',
    }, { status: 500 })
  }
}

// Local tools data (static pages)
const LOCAL_TOOLS = [
  {
    _id: 'tool-macro-calculator',
    _type: 'tool' as const,
    title: 'Macro Calculator',
    slug: 'macro-calculator',
    excerpt: 'Calculate your daily macronutrient needs based on your goals and activity level.',
    category: 'Nutrition Tools',
  },
  {
    _id: 'tool-protein-calculator',
    _type: 'tool' as const,
    title: 'Protein Calculator',
    slug: 'protein-calculator',
    excerpt: 'Determine your optimal daily protein intake for your fitness goals.',
    category: 'Nutrition Tools',
  },
  {
    _id: 'tool-calorie-calculator',
    _type: 'tool' as const,
    title: 'Calorie Calculator',
    slug: 'calorie-calculator',
    excerpt: 'Calculate your daily calorie needs for weight loss, maintenance, or muscle gain.',
    category: 'Nutrition Tools',
  },
  {
    _id: 'tool-fiber-calculator',
    _type: 'tool' as const,
    title: 'Fiber Calculator',
    slug: 'fiber-calculator',
    excerpt: 'Find out how much dietary fiber you need daily for optimal digestive health.',
    category: 'Nutrition Tools',
  },
  {
    _id: 'tool-bmi-calculator',
    _type: 'tool' as const,
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    excerpt: 'Calculate your Body Mass Index and understand your weight category.',
    category: 'Health Tools',
  },
  {
    _id: 'tool-hydration-calculator',
    _type: 'tool' as const,
    title: 'Hydration Calculator',
    slug: 'hydration-calculator',
    excerpt: 'Calculate your daily water intake needs based on your weight and activity level.',
    category: 'Health Tools',
  },
  {
    _id: 'tool-caffeine-calculator',
    _type: 'tool' as const,
    title: 'Caffeine Calculator',
    slug: 'caffeine-calculator',
    excerpt: 'Track your caffeine consumption and find your optimal intake level.',
    category: 'Health Tools',
  },
]

async function searchContent(
  query: string,
  contentType: string,
  category: string,
  limit: number
) {
  const lowerQuery = query.toLowerCase()

  // Build queries for each content type
  // Note: GROQ match is case-insensitive by default
  const queries: Record<string, string> = {
    articles: `
      *[_type == "article" && (
        title match $searchTerm ||
        excerpt match $searchTerm ||
        pt::text(body) match $searchTerm
      ) ${category ? '&& category->slug.current == $category' : ''}] | order(_createdAt desc) [0...$limit] {
        _id,
        _type,
        title,
        "slug": slug.current,
        excerpt,
        "category": category->{title, "slug": slug.current},
        featuredImage,
        publishedAt
      }
    `,
    guides: `
      *[_type == "guide" && isPublished == true && (
        title match $searchTerm ||
        excerpt match $searchTerm ||
        pt::text(chapters[].content) match $searchTerm
      )] | order(publishedAt desc) [0...$limit] {
        _id,
        _type,
        title,
        "slug": slug.current,
        excerpt,
        category,
        guideType,
        accessType,
        featuredImage
      }
    `,
    glossary: `
      *[_type == "glossaryTerm" && defined(publishedAt) && (
        term match $searchTerm ||
        shortDefinition match $searchTerm ||
        pt::text(fullDefinition) match $searchTerm ||
        $rawQuery in aliases[]
      )] | order(term asc) [0...$limit] {
        _id,
        _type,
        "title": term,
        "slug": slug.current,
        "excerpt": shortDefinition,
        category
      }
    `,
    faq: `
      *[_type == "faqDocument" && isPublished == true && (
        question match $searchTerm ||
        shortAnswer match $searchTerm ||
        pt::text(fullAnswer) match $searchTerm
      )] | order(category asc, order asc) [0...$limit] {
        _id,
        _type,
        "title": question,
        "slug": slug.current,
        "excerpt": shortAnswer,
        category
      }
    `,
  }

  const params = {
    searchTerm: `*${query}*`,
    rawQuery: lowerQuery,
    category,
    limit
  }

  if (contentType === 'all') {
    // Search all content types
    const [articles, guides, glossary, faq] = await Promise.all([
      client.fetch(queries.articles, params),
      client.fetch(queries.guides, params),
      client.fetch(queries.glossary, params),
      client.fetch(queries.faq, params),
    ])

    // Search local tools
    const tools = LOCAL_TOOLS.filter(tool =>
      tool.title.toLowerCase().includes(lowerQuery) ||
      tool.excerpt.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery)
    ).slice(0, limit)

    // Combine and sort by relevance (title match first)
    type SearchResult = Record<string, unknown>
    const allResults = [
      ...(articles || []).map((r: SearchResult) => ({ ...r, _type: 'article' as const })),
      ...(guides || []).map((r: SearchResult) => ({ ...r, _type: 'guide' as const })),
      ...(glossary || []).map((r: SearchResult) => ({ ...r, _type: 'glossaryTerm' as const })),
      ...(faq || []).map((r: SearchResult) => ({ ...r, _type: 'faqDocument' as const })),
      ...(tools || []).map((r: SearchResult) => ({ ...r, _type: 'tool' as const })),
    ]

    // Sort: exact title matches first, then partial matches
    return allResults.sort((a, b) => {
      const aTitle = a.title?.toLowerCase() || ''
      const bTitle = b.title?.toLowerCase() || ''
      const aExact = aTitle === lowerQuery
      const bExact = bTitle === lowerQuery
      const aStarts = aTitle.startsWith(lowerQuery)
      const bStarts = bTitle.startsWith(lowerQuery)

      if (aExact && !bExact) return -1
      if (bExact && !aExact) return 1
      if (aStarts && !bStarts) return -1
      if (bStarts && !aStarts) return 1
      return 0
    }).slice(0, limit)
  }

  // Search specific content type
  if (contentType === 'tools') {
    // Search local tools only
    return LOCAL_TOOLS.filter(tool =>
      tool.title.toLowerCase().includes(lowerQuery) ||
      tool.excerpt.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery)
    ).slice(0, limit)
  }

  if (queries[contentType]) {
    const result = await client.fetch(queries[contentType], params)
    return result || []
  }

  return []
}
