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
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
      {faqs.map((faq, index) => (
        <div
          key={faq._id}
          id={faq.slug}
          className={index < faqs.length - 1 ? 'border-b border-neutral-200' : ''}
          style={{ scrollMarginTop: '8rem' }}
        >
          {/* Question Button */}
          <button
            type="button"
            onClick={() => toggle(faq._id)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
            aria-expanded={Boolean(openId === faq._id)}
            aria-controls={`answer-${faq._id}`}
          >
            <span className="text-base lg:text-lg font-medium text-neutral-800 pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                openId === faq._id ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Answer Content */}
          <div
            id={`answer-${faq._id}`}
            className={`overflow-hidden transition-all duration-200 ${
              openId === faq._id ? 'max-h-[2000px]' : 'max-h-0'
            }`}
          >
            <div className="px-5 pb-5">
              {/* Short Answer */}
              <p className="text-neutral-700 leading-relaxed">
                {faq.shortAnswer}
              </p>

              {/* Full Answer (if exists) */}
              {faq.fullAnswer && faq.fullAnswer.length > 0 && (
                <div className="mt-4 prose prose-neutral prose-sm max-w-none">
                  <PortableText value={faq.fullAnswer} />
                </div>
              )}

              {/* Related Links */}
              {(faq.relatedArticle || faq.relatedGlossaryTerm) && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {faq.relatedArticle && (
                    <Link
                      href={`/articles/${faq.relatedArticle.category}/${faq.relatedArticle.slug}`}
                      className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      Read full article →
                    </Link>
                  )}
                  {faq.relatedGlossaryTerm && (
                    <Link
                      href={`/glossary/${faq.relatedGlossaryTerm.slug}`}
                      className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      See in glossary →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
