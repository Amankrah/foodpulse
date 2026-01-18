import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { Section, SectionHeader } from "@/components/layout/Section";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { SITE_NAME } from "@/lib/constants";
import { getFeaturedArticles, getArticles } from "@/lib/sanity";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Your Hub for All Things Food`,
  description:
    "Explore evidence-based food education covering nutrition science, food systems, and practical healthy eating tips. Make smarter food choices with FoodPulse.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [featuredArticles, recentArticles] = await Promise.all([
    getFeaturedArticles(3),
    getArticles(6),
  ]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <Section background="neutral" padding="lg">
          <SectionHeader
            eyebrow="Featured Content"
            title="Editor's Picks"
            description="Hand-picked articles to help you make smarter food choices"
            centered
          />
          <ArticleGrid articles={featuredArticles} columns={3} />
        </Section>
      )}

      {/* Category Navigation */}
      <CategoryGrid />

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <Section background="white" padding="lg">
          <SectionHeader
            eyebrow="Latest Articles"
            title="Recent Content"
            description="Stay updated with our latest evidence-based insights"
            centered
          />
          <ArticleGrid articles={recentArticles} columns={3} />

          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Articles
            </Link>
          </div>
        </Section>
      )}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
