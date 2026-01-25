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
            No questions found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
