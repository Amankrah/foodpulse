import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Section } from "@/components/layout/Section";
import { TermJsonLd } from "@/components/glossary/TermJsonLd";
import { portableTextComponents } from "@/components/articles/PortableTextComponents";
import { getGlossaryTermBySlug, getAllGlossaryPaths } from "@/lib/sanity";
import { SITE_NAME } from "@/lib/constants";

interface TermPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const categoryLabels: Record<string, string> = {
  "nutrition-science": "🧬 Nutrition Science",
  "food-science": "🔬 Food Science",
  "food-systems": "🌾 Food Systems",
  "health-wellness": "💚 Health & Wellness",
  "consumer-practical": "🛒 Consumer & Practical",
  "cooking-kitchen": "🍳 Cooking & Kitchen",
};

export async function generateStaticParams() {
  const slugs = await getAllGlossaryPaths();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = await getGlossaryTermBySlug(slug);

  if (!term) {
    return { title: "Term Not Found" };
  }

  return {
    title:
      term.seo?.metaTitle ||
      `${term.term} — Definition & Explanation | ${SITE_NAME} Glossary`,
    description: term.seo?.metaDescription || term.shortDefinition,
    keywords: term.seo?.keywords,
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function TermPage({ params }: TermPageProps) {
  const { slug } = await params;
  const term = await getGlossaryTermBySlug(slug);

  if (!term) {
    notFound();
  }

  return (
    <>
      <TermJsonLd term={term} />

      <Section background="white" padding="lg">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-neutral-600 mb-6">
            <Link href="/" className="hover:text-green-700">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="/resources" className="hover:text-green-700">
              Resources
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="/resources/glossary" className="hover:text-green-700">
              Glossary
            </Link>
            <span className="mx-2">&gt;</span>
            <span>{term.term}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-50 text-green-700">
                  {categoryLabels[term.category] || term.category}
                </span>
              </div>

              {/* Term & Pronunciation */}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 mb-2">
                {term.term}
              </h1>

              {term.pronunciation && (
                <p className="text-lg text-neutral-500 italic mb-6">
                  {term.pronunciation}
                </p>
              )}

              <hr className="my-6 border-neutral-200" />

              {/* Short Definition (Highlighted) */}
              <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6 my-8">
                <p className="text-lg lg:text-xl leading-relaxed text-neutral-800">
                  {term.shortDefinition}
                </p>
              </div>

              {/* Full Definition */}
              {term.fullDefinition && (
                <div className="prose prose-lg max-w-none mb-8">
                  <h2 className="text-xl lg:text-2xl font-semibold text-green-700 mb-4">
                    Full Explanation
                  </h2>
                  <PortableText
                    value={term.fullDefinition}
                    components={portableTextComponents}
                  />
                </div>
              )}

              {/* Why It Matters */}
              {term.whyItMatters && (
                <div className="mb-8">
                  <h2 className="text-xl lg:text-2xl font-semibold text-green-700 mb-4">
                    Why It Matters
                  </h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {term.whyItMatters}
                  </p>
                </div>
              )}

              {/* Example */}
              {term.example && (
                <div className="mb-8">
                  <h2 className="text-xl lg:text-2xl font-semibold text-green-700 mb-4">
                    Example
                  </h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {term.example}
                  </p>
                </div>
              )}

              {/* Common Misconceptions */}
              {term.commonMisconceptions &&
                term.commonMisconceptions.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl lg:text-2xl font-semibold text-green-700 mb-4">
                      Common Misconceptions
                    </h2>
                    <ul className="space-y-3">
                      {term.commonMisconceptions.map((misconception, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-red-500 mt-1">✗</span>
                          <p className="text-neutral-700 leading-relaxed">
                            {misconception}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Back to Glossary */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <Link
                  href="/resources/glossary"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  ← Back to Glossary
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 h-fit">
              {/* Related Terms */}
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                    Related Terms
                  </h3>
                  <div className="space-y-2">
                    {term.relatedTerms.map((relatedTerm) => (
                      <Link
                        key={relatedTerm.slug}
                        href={`/resources/glossary/${relatedTerm.slug}`}
                        className="block py-2 text-neutral-700 hover:text-green-700 border-b border-neutral-100 transition-colors"
                      >
                        {relatedTerm.term}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {term.relatedArticles && term.relatedArticles.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                    Related Articles
                  </h3>
                  <div className="space-y-3">
                    {term.relatedArticles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/articles/${article.category.slug}/${article.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-neutral-800 group-hover:text-green-700 transition-colors mb-1">
                          {article.title}
                        </h4>
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {term.sources && term.sources.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                    Sources
                  </h3>
                  <div className="space-y-2">
                    {term.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-green-600 hover:text-green-700 hover:underline"
                      >
                        {source.organization || source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
