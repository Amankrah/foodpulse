import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ToolJsonLd } from './ToolJsonLd'

interface ToolLayoutProps {
  title: string
  description: string
  icon: ReactNode
  slug?: string
  children: ReactNode
  educationalContent?: ReactNode
  relatedTools?: { title: string; slug: string; icon: ReactNode }[]
}

export function ToolLayout({
  title,
  description,
  icon,
  slug,
  children,
  educationalContent,
  relatedTools,
}: ToolLayoutProps) {
  return (
    <>
      <ToolJsonLd title={title} description={description} slug={slug} />

      <div className="min-h-screen bg-neutral-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-neutral-600">
              <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tools" className="hover:text-green-700 transition-colors">Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-neutral-800 font-medium">{title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600">
              {icon}
            </div>
            <h1 className="section-headline mb-4">
              {title}
            </h1>
            <p className="lead-text max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="section">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-md border border-neutral-200 overflow-hidden">
              {children}
            </div>
          </div>
        </div>

        {/* Educational Content */}
        {educationalContent && (
          <div className="max-w-4xl mx-auto px-4 pb-16">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 prose prose-neutral max-w-none">
              {educationalContent}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools && relatedTools.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-16">
            <h2 className="article-title mb-6">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-green-500 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {tool.icon}
                  </div>
                  <span className="font-medium text-neutral-800 group-hover:text-green-700 transition-colors">
                    {tool.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
