import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/layout/Section";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { ARTICLES_PER_PAGE, SITE_NAME } from "@/lib/constants";
import { getArticlesPaginated, getFeaturedArticles } from "@/lib/sanity";

export const metadata: Metadata = {
  title: `All Articles | ${SITE_NAME}`,
  description:
    "Explore all our evidence-based articles on food systems, nutrition, healthy eating, and practical food tips.",
};

export const revalidate = 60; // Revalidate every 60 seconds

type Props = {
  searchParams?: Promise<{ page?: string }>;
};

function parsePage(raw: string | undefined): number {
  const n = parseInt(raw ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

export default async function AllArticlesPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const requestedPage = parsePage(sp.page);

  const featuredArticles = await getFeaturedArticles(1);
  const featuredArticle = featuredArticles[0] ?? null;
  const excludeId = featuredArticle?._id ?? "";

  const { articles, total, page } = await getArticlesPaginated(requestedPage, {
    excludeId,
  });

  const totalPages = Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));
  const showFeatured = Boolean(featuredArticle && page === 1);

  return (
    <Section background="white" padding="lg">
      <SectionHeader
        eyebrow="Latest Content"
        title="All Articles"
        description="Evidence-based food education for smarter choices"
        centered
      />

      {articles.length > 0 ? (
        <>
          <ArticleGrid
            articles={articles}
            featured={showFeatured ? featuredArticle : undefined}
          />
          {totalPages > 1 ? (
            <nav
              className="mt-12 flex flex-wrap items-center justify-center gap-4 border-t border-neutral-200 pt-10"
              aria-label="Article pages"
            >
              {page > 1 ? (
                <Link
                  href={page === 2 ? "/articles" : `/articles?page=${page - 1}`}
                  className="min-w-[8rem] rounded-lg border-2 border-[var(--color-primary)] bg-white px-5 py-2.5 text-center text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-mint)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]"
                >
                  Previous
                </Link>
              ) : (
                <span className="min-w-[8rem]" aria-hidden />
              )}
              <span className="text-sm text-neutral-600">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link
                  href={`/articles?page=${page + 1}`}
                  className="min-w-[8rem] rounded-lg border-2 border-[var(--color-primary)] bg-white px-5 py-2.5 text-center text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-mint)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]"
                >
                  Next
                </Link>
              ) : (
                <span className="min-w-[8rem]" aria-hidden />
              )}
            </nav>
          ) : null}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-600 mb-6">
            No articles available yet. Check back soon!
          </p>
          <p className="text-neutral-500">
            We&apos;re working hard to bring you quality food content.
          </p>
        </div>
      )}
    </Section>
  );
}
