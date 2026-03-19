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

/** Scientific register — Trust Blue + sage surfaces (brand guide §03); parent sets data-brand-mode="scientific" */
export function ToolCard({ title, description, slug, icon, category }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${slug}`}
      className="group block p-6 rounded-2xl border border-[var(--color-sage)]/30 bg-white shadow-sm hover:border-[var(--color-trust-blue)]/35 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors bg-[color-mix(in_srgb,var(--color-trust-blue)_10%,white)] text-[var(--color-trust-blue)] group-hover:bg-[var(--color-trust-blue)] group-hover:text-white"
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          {category && (
            <span className="eyebrow mb-1 block">
              {category}
            </span>
          )}
          <h3 className="text-[length:var(--size-subheading)] font-display font-semibold text-[var(--color-primary)] tracking-tight leading-snug mb-2 group-hover:text-[var(--color-trust-blue)] transition-colors">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-support)] mb-3 line-clamp-2">
            {description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-trust-blue)] group-hover:gap-2 group-hover:text-[var(--color-primary)] transition-all">
            Use tool <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}
