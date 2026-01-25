import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ArticleListItem } from "@/lib/sanity/types";

interface PrevNextNavigationProps {
  previous: ArticleListItem | null;
  next: ArticleListItem | null;
  categorySlug: string;
}

export function PrevNextNavigation({
  previous,
  next,
  categorySlug,
}: PrevNextNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      className="grid md:grid-cols-2 gap-6 mt-12 pt-12 border-t border-neutral-200"
      aria-label="Article navigation"
    >
      {/* Previous Article */}
      {previous ? (
        <Link
          href={`/articles/${categorySlug}/${previous.slug}`}
          className="group flex items-start gap-4 p-6 rounded-xl bg-white border border-neutral-200 hover:border-green-500 hover:shadow-md transition-all duration-300"
        >
          <div className="flex-shrink-0 mt-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-neutral-600 mb-1">Previous Article</p>
            <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-green-600 transition-colors line-clamp-2">
              {previous.title}
            </h3>
            {previous.excerpt && (
              <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                {previous.excerpt}
              </p>
            )}
          </div>
        </Link>
      ) : (
        <div /> // Empty div to maintain grid layout
      )}

      {/* Next Article */}
      {next ? (
        <Link
          href={`/articles/${categorySlug}/${next.slug}`}
          className="group flex items-start gap-4 p-6 rounded-xl bg-white border border-neutral-200 hover:border-green-500 hover:shadow-md transition-all duration-300 md:text-right"
        >
          <div className="flex-1 min-w-0 md:order-1">
            <p className="text-sm text-neutral-600 mb-1">Next Article</p>
            <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-green-600 transition-colors line-clamp-2">
              {next.title}
            </h3>
            {next.excerpt && (
              <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                {next.excerpt}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 mt-1 md:order-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </Link>
      ) : (
        <div /> // Empty div to maintain grid layout
      )}
    </nav>
  );
}
