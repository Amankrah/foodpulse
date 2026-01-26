import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/layout/Section";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { SITE_NAME } from "@/lib/constants";
import { getArticles, getFeaturedArticles } from "@/lib/sanity";

export const metadata: Metadata = {
  title: `All Articles | ${SITE_NAME}`,
  description:
    "Explore all our evidence-based articles on food systems, nutrition, healthy eating, and practical food tips.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function AllArticlesPage() {
  const [articles, featuredArticles] = await Promise.all([
    getArticles(12),
    getFeaturedArticles(1),
  ]);

  const featuredArticle = featuredArticles[0] || null;

  return (
    <Section background="white" padding="lg">
      <SectionHeader
        eyebrow="Latest Content"
        title="All Articles"
        description="Evidence-based food education for smarter choices"
        centered
      />

      {articles.length > 0 ? (
        <ArticleGrid articles={articles} featured={featuredArticle || undefined} />
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
