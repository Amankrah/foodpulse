'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import type { FAQCategory } from '@/lib/sanity/types'
import { FAQAccordion } from './FAQAccordion'
import { FAQSearch } from './FAQSearch'

interface FAQPageProps {
  categories: FAQCategory[]
  totalCount: number
  featuredFaqs?: {
    _id: string
    question: string
    slug: string
    shortAnswer: string
    category: string
  }[]
}

export function FAQPage({ categories, totalCount }: FAQPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({})

  // Flatten all FAQs for search
  const allFaqs = categories.flatMap((cat) =>
    cat.faqs.map((faq) => ({
      ...faq,
      category: cat.slug,
    }))
  )

  const handleSearchResultClick = (categorySlug: string, faqSlug: string) => {
    // Scroll to the FAQ
    const element = document.getElementById(faqSlug)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Open the accordion item by clicking it
      setTimeout(() => {
        const button = element.querySelector('button')
        button?.click()
      }, 500)
    }
  }

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug)
    const element = categoryRefs.current[slug]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-green-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-neutral-600">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="/resources" className="hover:text-green-600">
              Resources
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-neutral-900 font-medium">FAQ</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-green-700 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Find answers to common questions about food, nutrition, and healthy eating.
            </p>

            {/* Search Bar */}
            <FAQSearch allFaqs={allFaqs} onResultClick={handleSearchResultClick} />

            {/* Quick Stats */}
            <div className="mt-6 text-sm text-neutral-600">
              {totalCount} questions answered • {categories.length} categories
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="sticky top-16 bg-white border-b border-neutral-200 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.slug
                    ? 'bg-green-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {categories.map((category) => (
            <section
              key={category.slug}
              id={category.slug}
              ref={(el) => {
                categoryRefs.current[category.slug] = el
              }}
              className="scroll-mt-32"
            >
              {/* Category Header */}
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-neutral-900 mb-2 flex items-center gap-3">
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                </h2>
                <p className="text-base text-neutral-600 max-w-3xl">
                  {category.description}
                </p>
              </div>

              {/* FAQ Accordion */}
              <FAQAccordion faqs={category.faqs} />
            </section>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg mb-8 text-green-50">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/articles"
              className="px-6 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
            >
              Browse Articles
            </Link>
            <Link
              href="/glossary"
              className="px-6 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
            >
              Read Glossary
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
