import Link from "next/link";
import { Section, SectionHeader } from "@/components/layout/Section";
import { categoryList } from "@/content/categories";

export function CategoryGrid() {
  return (
    <Section background="white" padding="lg">
      <SectionHeader
        eyebrow="Explore Topics"
        title="What interests you today?"
        centered
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categoryList.map((category) => (
          <Link
            key={category.slug}
            href={`/articles/${category.slug}`}
            className="group block p-6 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all"
          >
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center bg-green-50 text-green-700 rounded-lg text-2xl group-hover:bg-green-100 transition-colors mb-4">
              {category.icon}
            </div>

            {/* Title */}
            <h3 className="font-sans text-lg font-semibold text-neutral-800 group-hover:text-green-700 transition-colors mb-2">
              {category.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-neutral-600 line-clamp-3">
              {category.description}
            </p>

            {/* Arrow */}
            <div className="mt-4 text-green-600 font-medium text-sm flex items-center gap-1">
              Explore
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
