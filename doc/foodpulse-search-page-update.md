# FoodPulse Search Page — Updated Implementation

## What's Changing

Your current search only searches articles. Now you need to search across:
- Articles
- Guides
- Glossary terms
- FAQ items
- Tools (by title/description)

---

## 1. Updated Search API Route

```typescript
// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const contentType = searchParams.get('type') || 'all' // all, articles, guides, glossary, faq
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

async function searchContent(
  query: string,
  contentType: string,
  category: string,
  limit: number
) {
  const searchQuery = `*${query}*` // Wildcard search

  // Build queries for each content type
  const queries: Record<string, string> = {
    articles: `
      *[_type == "article" && (
        title match $query ||
        excerpt match $query ||
        pt::text(body) match $query
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
        title match $query ||
        excerpt match $query ||
        pt::text(chapters[].content) match $query
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
      *[_type == "glossaryTerm" && (
        term match $query ||
        shortDefinition match $query ||
        pt::text(fullDefinition) match $query ||
        $rawQuery in aliases
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
      *[_type == "faqItem" && isPublished == true && (
        question match $query ||
        shortAnswer match $query
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
    query: searchQuery, 
    rawQuery: query.toLowerCase(),
    category, 
    limit 
  }

  if (contentType === 'all') {
    // Search all content types
    const [articles, guides, glossary, faq] = await Promise.all([
      sanityFetch({ query: queries.articles, params }),
      sanityFetch({ query: queries.guides, params }),
      sanityFetch({ query: queries.glossary, params }),
      sanityFetch({ query: queries.faq, params }),
    ])

    // Combine and sort by relevance (title match first)
    const allResults = [
      ...articles.map((r: any) => ({ ...r, _type: 'article' })),
      ...guides.map((r: any) => ({ ...r, _type: 'guide' })),
      ...glossary.map((r: any) => ({ ...r, _type: 'glossaryTerm' })),
      ...faq.map((r: any) => ({ ...r, _type: 'faqItem' })),
    ]

    // Sort: exact title matches first, then partial matches
    const lowerQuery = query.toLowerCase()
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
  if (queries[contentType]) {
    return sanityFetch({ query: queries[contentType], params })
  }

  return []
}
```

---

## 2. Updated Search Page Component

```tsx
// app/search/page.tsx
"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { 
  Search as SearchIcon, 
  X, 
  FileText, 
  BookOpen, 
  HelpCircle, 
  Calculator,
  Book,
  ArrowRight
} from "lucide-react";
import { categoryList } from "@/content/categories";
import { urlFor } from "@/sanity/image";

// Content type configuration
const contentTypes = [
  { id: 'all', label: 'All', icon: SearchIcon },
  { id: 'articles', label: 'Articles', icon: FileText },
  { id: 'guides', label: 'Guides', icon: BookOpen },
  { id: 'glossary', label: 'Glossary', icon: Book },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
] as const;

type ContentType = typeof contentTypes[number]['id'];

interface SearchResult {
  _id: string;
  _type: 'article' | 'guide' | 'glossaryTerm' | 'faqItem';
  title: string;
  slug: string;
  excerpt?: string;
  category?: { title: string; slug: string } | string;
  featuredImage?: any;
  guideType?: string;
  accessType?: string;
}

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL params
  const initialQuery = searchParams.get("q") || "";
  const initialType = (searchParams.get("type") as ContentType) || "all";
  const initialCategory = searchParams.get("category") || "";

  // State
  const [query, setQuery] = useState(initialQuery);
  const [contentType, setContentType] = useState<ContentType>(initialType);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);

  // Perform search
  const performSearch = useCallback(async (
    searchQuery: string, 
    type: ContentType = "all",
    category: string = ""
  ) => {
    if (!searchQuery.trim() || searchQuery.length < 2) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        q: searchQuery,
        type,
        ...(category && { category }),
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search on initial load if query exists
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, initialType, initialCategory);
    }
  }, [initialQuery, initialType, initialCategory, performSearch]);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    performSearch(query, contentType, selectedCategory);
    updateURL(query, contentType, selectedCategory);
  };

  // Update URL without navigation
  const updateURL = (q: string, type: ContentType, category: string) => {
    const params = new URLSearchParams({ q });
    if (type !== 'all') params.set("type", type);
    if (category) params.set("category", category);
    window.history.pushState({}, "", `/search?${params}`);
  };

  // Handle content type change
  const handleTypeChange = (type: ContentType) => {
    setContentType(type);
    if (query.trim()) {
      performSearch(query, type, selectedCategory);
      updateURL(query, type, selectedCategory);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (query.trim()) {
      performSearch(query, contentType, category);
      updateURL(query, contentType, category);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setContentType("all");
    setSelectedCategory("");
    setResults([]);
    setHasSearched(false);
    window.history.pushState({}, "", "/search");
  };

  // Get URL for result
  const getResultUrl = (result: SearchResult): string => {
    switch (result._type) {
      case 'article':
        const catSlug = typeof result.category === 'object' ? result.category?.slug : '';
        return `/articles/${catSlug}/${result.slug}`;
      case 'guide':
        return `/guides/${result.slug}`;
      case 'glossaryTerm':
        return `/glossary/${result.slug}`;
      case 'faqItem':
        return `/resources/faq#${result.slug}`;
      default:
        return '#';
    }
  };

  // Get badge for result type
  const getTypeBadge = (type: SearchResult['_type']) => {
    const config = {
      article: { label: 'Article', color: 'bg-blue-100 text-blue-700' },
      guide: { label: 'Guide', color: 'bg-purple-100 text-purple-700' },
      glossaryTerm: { label: 'Glossary', color: 'bg-amber-100 text-amber-700' },
      faqItem: { label: 'FAQ', color: 'bg-green-100 text-green-700' },
    };
    return config[type] || { label: type, color: 'bg-neutral-100 text-neutral-700' };
  };

  // Group results by type for display
  const groupedResults = results.reduce((acc, result) => {
    const type = result._type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <>
      {/* Search Header */}
      <Section background="green" padding="lg">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-4">
            Search FoodPulse
          </h1>
          <p className="text-xl text-green-800 mb-8">
            Find articles, guides, glossary terms, and answers
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search for anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-green-200 bg-white focus:border-green-500 focus:outline-none text-lg"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                variant="accent"
                size="lg"
                disabled={isLoading || !query.trim()}
                className="px-8"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>

            {/* Content Type Tabs */}
            <div className="flex flex-wrap gap-2">
              {contentTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleTypeChange(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    contentType === id
                      ? "bg-white text-green-700 shadow-sm"
                      : "bg-green-800/50 text-green-100 hover:bg-green-700/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Category Filter (only for articles) */}
            {(contentType === 'all' || contentType === 'articles') && (
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-green-200 text-sm self-center mr-2">
                  Filter by category:
                </span>
                <button
                  type="button"
                  onClick={() => handleCategoryChange("")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === ""
                      ? "bg-white/90 text-green-700"
                      : "bg-green-900/30 text-green-100 hover:bg-green-800/50"
                  }`}
                >
                  All
                </button>
                {categoryList.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === category.slug
                        ? "bg-white/90 text-green-700"
                        : "bg-green-900/30 text-green-100 hover:bg-green-800/50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </Section>

      {/* Search Results */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <LoadingState />
          ) : hasSearched ? (
            <>
              {/* Results Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-neutral-900">
                    {results.length > 0
                      ? `Found ${results.length} result${results.length !== 1 ? "s" : ""}`
                      : "No results found"}
                  </h2>
                  <p className="text-neutral-600 mt-1">
                    Searching for: <span className="font-semibold">"{query}"</span>
                    {contentType !== 'all' && (
                      <> in <span className="font-semibold">{contentType}</span></>
                    )}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={clearSearch}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>

              {/* Results */}
              {results.length > 0 ? (
                contentType === 'all' ? (
                  // Grouped results for "All" search
                  <GroupedResults 
                    groupedResults={groupedResults} 
                    getResultUrl={getResultUrl}
                    getTypeBadge={getTypeBadge}
                  />
                ) : (
                  // Flat list for specific type
                  <div className="space-y-4">
                    {results.map((result) => (
                      <SearchResultCard
                        key={result._id}
                        result={result}
                        url={getResultUrl(result)}
                        badge={getTypeBadge(result._type)}
                      />
                    ))}
                  </div>
                )
              ) : (
                <NoResultsState query={query} />
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </Section>

      {/* Popular Searches / Quick Links */}
      {!hasSearched && (
        <Section background="neutral" padding="md">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {['protein', 'macros', 'fiber', 'organic', 'meal planning', 'nutrition labels'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    performSearch(term, 'all', '');
                    updateURL(term, 'all', '');
                  }}
                  className="px-4 py-2 bg-white rounded-full text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 border border-neutral-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

// Grouped Results Component
function GroupedResults({ 
  groupedResults, 
  getResultUrl, 
  getTypeBadge 
}: { 
  groupedResults: Record<string, SearchResult[]>;
  getResultUrl: (result: SearchResult) => string;
  getTypeBadge: (type: SearchResult['_type']) => { label: string; color: string };
}) {
  const typeOrder = ['article', 'guide', 'glossaryTerm', 'faqItem'] as const;
  const typeLabels = {
    article: 'Articles',
    guide: 'Guides',
    glossaryTerm: 'Glossary Terms',
    faqItem: 'FAQ',
  };

  return (
    <div className="space-y-8">
      {typeOrder.map((type) => {
        const items = groupedResults[type];
        if (!items || items.length === 0) return null;

        return (
          <div key={type}>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${getTypeBadge(type).color.split(' ')[0]}`} />
              {typeLabels[type]}
              <span className="text-neutral-400 font-normal">({items.length})</span>
            </h3>
            <div className="space-y-3">
              {items.slice(0, 5).map((result) => (
                <SearchResultCard
                  key={result._id}
                  result={result}
                  url={getResultUrl(result)}
                  badge={getTypeBadge(result._type)}
                  compact
                />
              ))}
              {items.length > 5 && (
                <Link
                  href={`/search?q=${encodeURIComponent('')}&type=${type}`}
                  className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  View all {items.length} {typeLabels[type].toLowerCase()}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Search Result Card Component
function SearchResultCard({ 
  result, 
  url, 
  badge,
  compact = false
}: { 
  result: SearchResult; 
  url: string; 
  badge: { label: string; color: string };
  compact?: boolean;
}) {
  return (
    <Link
      href={url}
      className={`block bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      <div className="flex gap-4">
        {/* Image (for articles and guides) */}
        {result.featuredImage && !compact && (
          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src={urlFor(result.featuredImage)?.width(96).height(96).url() || ''}
              alt=""
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Badge */}
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${badge.color} mb-2`}>
            {badge.label}
          </span>

          {/* Title */}
          <h4 className={`font-semibold text-neutral-900 ${compact ? 'text-base' : 'text-lg'} line-clamp-1`}>
            {result.title}
          </h4>

          {/* Excerpt */}
          {result.excerpt && (
            <p className={`text-neutral-600 mt-1 ${compact ? 'line-clamp-1 text-sm' : 'line-clamp-2'}`}>
              {result.excerpt}
            </p>
          )}

          {/* Category (for articles) */}
          {result._type === 'article' && typeof result.category === 'object' && result.category?.title && (
            <span className="inline-block mt-2 text-xs text-neutral-500">
              in {result.category.title}
            </span>
          )}
        </div>

        {/* Arrow */}
        <ArrowRight className="flex-shrink-0 h-5 w-5 text-neutral-300 self-center" />
      </div>
    </Link>
  );
}

// Loading State
function LoadingState() {
  return (
    <div className="text-center py-12">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
      <p className="mt-4 text-neutral-600">Searching across all content...</p>
    </div>
  );
}

// Empty State (before search)
function EmptyState() {
  return (
    <div className="text-center py-16">
      <SearchIcon className="h-16 w-16 text-neutral-200 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
        What are you looking for?
      </h3>
      <p className="text-neutral-600 max-w-md mx-auto">
        Search across articles, guides, glossary terms, and frequently asked questions.
      </p>
    </div>
  );
}

// No Results State
function NoResultsState({ query }: { query: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <SearchIcon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
        No results for "{query}"
      </h3>
      <p className="text-neutral-600 mb-6 max-w-md mx-auto">
        We couldn't find anything matching your search. Try different keywords or browse our content.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="outline" size="md" href="/articles">
          Browse Articles
        </Button>
        <Button variant="outline" size="md" href="/guides">
          View Guides
        </Button>
        <Button variant="outline" size="md" href="/glossary">
          Explore Glossary
        </Button>
      </div>
    </div>
  );
}

// Main export with Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SearchPageContent />
    </Suspense>
  );
}
```

---

## 3. Add Search to Header (Global Search)

```tsx
// components/layout/SearchTrigger.tsx
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-neutral-600 hover:text-green-600 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Box */}
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center px-4">
                <Search className="h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search articles, guides, glossary..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-4 py-4 text-lg focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Quick Links */}
            <div className="border-t px-4 py-3 bg-neutral-50">
              <p className="text-xs text-neutral-500 mb-2">Quick links:</p>
              <div className="flex flex-wrap gap-2">
                {['Articles', 'Guides', 'Glossary', 'FAQ'].map((link) => (
                  <a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="px-3 py-1 bg-white rounded-full text-sm text-neutral-600 hover:text-green-600 border"
                    onClick={() => setIsOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

---

## 4. Key Changes Summary

| Before | After |
|--------|-------|
| Only searches articles | Searches articles, guides, glossary, FAQ |
| No content type filter | Tabs to filter by content type |
| Simple list results | Grouped results by type |
| No visual type indicators | Colored badges per type |
| Basic empty state | Rich empty state with suggestions |
| No popular searches | Popular searches when empty |

---

## 5. SEO Metadata

```tsx
// app/search/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | FoodPulse",
  description: "Search FoodPulse for articles, guides, glossary terms, and answers about food and nutrition.",
  robots: {
    index: false, // Don't index search results pages
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```
