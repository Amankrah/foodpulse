import Link from "next/link";
import type { GlossaryTermListItem } from "@/lib/sanity/types";

interface GlossaryTermCardProps {
  term: GlossaryTermListItem;
}

const categoryLabels: Record<string, string> = {
  "food-and-wellbeing": "🥗 Wellbeing",
  "kitchen-and-cooking": "🍳 Kitchen",
  "food-literacy": "📚 Literacy",
  "food-systems": "🌾 Systems",
};

export function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  return (
    <Link
      href={`/glossary/${term.slug}`}
      className="group block bg-white border border-neutral-200 rounded-xl p-5 transition-all hover:border-green-300 hover:shadow-md"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-green-700 transition-colors">
          {term.term}
        </h3>

        <p className="text-sm text-neutral-600 leading-relaxed mb-3 line-clamp-3 flex-grow">
          {term.shortDefinition}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">
            {categoryLabels[term.category] || term.category}
          </span>

          <span className="text-sm font-medium text-green-600 group-hover:translate-x-1 transition-transform">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}
