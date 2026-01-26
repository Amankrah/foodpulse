import Link from 'next/link'
import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface ToolCardProps {
  title: string
  description: string
  slug: string
  icon: ReactNode
  category?: string
}

export function ToolCard({ title, description, slug, icon, category }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${slug}`}
      className="group block p-6 bg-white rounded-xl border border-neutral-200 hover:border-green-500 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          {category && (
            <span className="eyebrow !text-green-600 mb-1 block">
              {category}
            </span>
          )}
          <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-green-700 transition-colors">
            {title}
          </h3>
          <p className="body-text !text-sm mb-3 line-clamp-2">
            {description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 group-hover:gap-2 transition-all">
            Use Tool <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
