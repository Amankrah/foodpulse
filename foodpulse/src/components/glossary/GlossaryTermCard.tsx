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

/** Scientific register — matches tools hub (Trust Blue + sage) */
export function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  return (
    <Link
      href={`/glossary/${term.slug}`}
      className="group block rounded-2xl border border-[var(--color-sage)]/30 bg-white p-5 shadow-sm transition-all hover:border-[var(--color-trust-blue)]/35 hover:shadow-md"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-[length:var(--size-subheading)] font-display font-semibold text-[var(--color-primary)] tracking-tight leading-snug mb-2 group-hover:text-[var(--color-trust-blue)] transition-colors">
          {term.term}
        </h3>

        <p className="text-sm leading-relaxed text-[var(--color-support)] mb-3 line-clamp-3 flex-grow">
          {term.shortDefinition}
        </p>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-[color-mix(in_srgb,var(--color-sage)_14%,white)] text-[var(--color-support)] border border-[var(--color-sage)]/25">
            {categoryLabels[term.category] || term.category}
          </span>

          <span className="text-sm font-semibold text-[var(--color-trust-blue)] group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)] transition-all shrink-0">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}
