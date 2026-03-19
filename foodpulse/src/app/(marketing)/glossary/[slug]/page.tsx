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
  "food-and-wellbeing": "🥗 Food and Wellbeing",
  "kitchen-and-cooking": "🍳 Kitchen and Cooking",
  "food-literacy": "📚 Food Literacy",
  "food-systems": "🌾 Food Systems",
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

      <Section
        background="white"
        padding="lg"
        className="bg-[color-mix(in_srgb,var(--color-trust-blue)_2.5%,white)]"
      >
        <div className="max-w-7xl mx-auto">
          <nav
            className="text-sm text-[var(--color-support)] mb-6"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[var(--color-trust-blue)] underline-offset-2 hover:underline"
            >
              Home
            </Link>
            <span className="mx-2 text-[var(--color-sage)]" aria-hidden>
              /
            </span>
            <Link
              href="/glossary"
              className="hover:text-[var(--color-trust-blue)] underline-offset-2 hover:underline"
            >
              Glossary
            </Link>
            <span className="mx-2 text-[var(--color-sage)]" aria-hidden>
              /
            </span>
            <span className="font-medium text-[var(--color-primary)]">{term.term}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-[color-mix(in_srgb,var(--color-trust-blue)_10%,white)] text-[var(--color-trust-blue)] border border-[var(--color-trust-blue)]/20">
                  {categoryLabels[term.category] || term.category}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-[var(--color-primary)] tracking-tight mb-2">
                {term.term}
              </h1>

              {term.pronunciation && (
                <p className="text-lg text-[var(--color-support)] italic mb-6">
                  {term.pronunciation}
                </p>
              )}

              <hr className="my-6 border-[var(--color-sage)]/30" />

              <div className="bg-[color-mix(in_srgb,var(--color-mint)_85%,var(--color-sage)_15%)] border-l-4 border-[var(--color-trust-blue)] rounded-r-xl p-6 my-8">
                <p className="text-lg lg:text-xl leading-relaxed text-[var(--color-charcoal)]">
                  {term.shortDefinition}
                </p>
              </div>

              {term.fullDefinition && (
                <div className="prose prose-lg max-w-none mb-8 prose-headings:font-display prose-headings:text-[var(--color-primary)] prose-p:text-[var(--color-support)] prose-li:text-[var(--color-support)]">
                  <h2 className="text-xl lg:text-2xl font-display font-semibold text-[var(--color-trust-blue)] mb-4 not-prose">
                    Full explanation
                  </h2>
                  <PortableText
                    value={term.fullDefinition}
                    components={portableTextComponents}
                  />
                </div>
              )}

              {term.whyItMatters && (
                <div className="mb-8">
                  <h2 className="text-xl lg:text-2xl font-display font-semibold text-[var(--color-trust-blue)] mb-4">
                    Why it matters
                  </h2>
                  <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)]">
                    {term.whyItMatters}
                  </p>
                </div>
              )}

              {term.example && (
                <div className="mb-8">
                  <h2 className="text-xl lg:text-2xl font-display font-semibold text-[var(--color-trust-blue)] mb-4">
                    Example
                  </h2>
                  <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)]">
                    {term.example}
                  </p>
                </div>
              )}

              {term.commonMisconceptions &&
                term.commonMisconceptions.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl lg:text-2xl font-display font-semibold text-[var(--color-trust-blue)] mb-4">
                      Common misconceptions
                    </h2>
                    <ul className="space-y-3">
                      {term.commonMisconceptions.map((misconception, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span
                            className="mt-1 font-semibold text-[var(--color-sage)]"
                            aria-hidden
                          >
                            ×
                          </span>
                          <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)]">
                            {misconception}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <div className="mt-12 pt-8 border-t border-[var(--color-sage)]/25">
                <Link
                  href="/glossary"
                  className="inline-flex items-center gap-2 font-semibold text-[var(--color-trust-blue)] hover:text-[var(--color-primary)] underline-offset-2 hover:underline"
                >
                  ← Back to glossary
                </Link>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit space-y-6">
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="rounded-2xl border border-[var(--color-sage)]/30 bg-white/95 p-5 shadow-sm">
                  <h3 className="eyebrow mb-3 !normal-case !tracking-wide text-[0.65rem] sm:text-[var(--size-label)]">
                    Related terms
                  </h3>
                  <div className="space-y-1">
                    {term.relatedTerms.map((relatedTerm) => (
                      <Link
                        key={relatedTerm.slug}
                        href={`/glossary/${relatedTerm.slug}`}
                        className="block py-2 text-[var(--color-support)] hover:text-[var(--color-trust-blue)] border-b border-[var(--color-sage)]/15 transition-colors text-[length:var(--size-body)] last:border-0"
                      >
                        {relatedTerm.term}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {term.relatedArticles && term.relatedArticles.length > 0 && (
                <div className="rounded-2xl border border-[var(--color-sage)]/30 bg-white/95 p-5 shadow-sm">
                  <h3 className="eyebrow mb-3 !normal-case !tracking-wide text-[0.65rem] sm:text-[var(--size-label)]">
                    Related articles
                  </h3>
                  <div className="space-y-3">
                    {term.relatedArticles.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/articles/${article.category.slug}/${article.slug}`}
                        className="block group"
                      >
                        <h4 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-trust-blue)] transition-colors mb-1">
                          {article.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-[var(--color-support)] line-clamp-2">
                          {article.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {term.sources && term.sources.length > 0 && (
                <div className="rounded-2xl border border-[var(--color-sage)]/30 bg-white/95 p-5 shadow-sm">
                  <h3 className="eyebrow mb-3 !normal-case !tracking-wide text-[0.65rem] sm:text-[var(--size-label)]">
                    Sources
                  </h3>
                  <div className="space-y-2">
                    {term.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm font-medium text-[var(--color-trust-blue)] hover:text-[var(--color-primary)] hover:underline underline-offset-2"
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
