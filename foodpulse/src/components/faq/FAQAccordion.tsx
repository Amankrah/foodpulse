'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import type { PortableTextBlock } from '@portabletext/types'

interface FAQItem {
  _id: string
  question: string
  slug: string
  shortAnswer: string
  fullAnswer?: PortableTextBlock[]
  relatedArticle?: { title: string; slug: string; category: string }
  relatedGlossaryTerm?: { term: string; slug: string }
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  if (!faqs || faqs.length === 0) {
    return (
      <div className="border border-neutral-200 rounded-xl p-8 bg-white text-center">
        <p className="text-neutral-600">No questions available in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        const isExpanded = openId === faq._id
        return (
        <div
          key={faq._id}
          id={faq.slug}
          className={`border border-neutral-200 rounded-2xl bg-white overflow-hidden transition-all duration-200 ${
            isExpanded ? 'shadow-md border-green-200' : 'hover:border-neutral-300'
          }`}
          style={{ scrollMarginTop: '8rem' }}
        >
          {/* Question Button */}
          <button
            type="button"
            onClick={() => toggle(faq._id)}
            className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
              isExpanded ? 'bg-green-50' : 'hover:bg-neutral-50'
            }`}
            {...(isExpanded ? { 'aria-expanded': true } : { 'aria-expanded': false })}
            aria-controls={`answer-${faq._id}`}
          >
            <span className={`text-base lg:text-lg font-semibold pr-4 ${
              isExpanded ? 'text-green-700' : 'text-neutral-800'
            }`}>
              {faq.question}
            </span>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isExpanded ? 'bg-green-600 rotate-180' : 'bg-neutral-100'
            }`}>
              <ChevronDown
                className={`w-4 h-4 ${
                  isExpanded ? 'text-white' : 'text-neutral-600'
                }`}
                aria-hidden="true"
              />
            </div>
          </button>

          {/* Answer Content */}
          <div
            id={`answer-${faq._id}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-6 pt-2">
              {/* Short Answer */}
              <p className="text-neutral-700 leading-relaxed text-base">
                {faq.shortAnswer}
              </p>

              {/* Full Answer (if exists) */}
              {faq.fullAnswer && faq.fullAnswer.length > 0 && (
                <div className="mt-4 prose prose-neutral prose-sm max-w-none prose-headings:text-neutral-800 prose-p:text-neutral-700 prose-strong:text-neutral-900">
                  <PortableText value={faq.fullAnswer} />
                </div>
              )}

              {/* Related Links */}
              {(faq.relatedArticle || faq.relatedGlossaryTerm) && (
                <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-3">
                  {faq.relatedArticle && (
                    <Link
                      href={`/articles/${faq.relatedArticle.category}/${faq.relatedArticle.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                    >
                      📄 Read full article
                    </Link>
                  )}
                  {faq.relatedGlossaryTerm && (
                    <Link
                      href={`/glossary/${faq.relatedGlossaryTerm.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      📚 See in glossary
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )})}
    </div>
  )
}
