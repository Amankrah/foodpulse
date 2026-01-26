import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Book,
  HelpCircle,
  FileText
} from "lucide-react";

import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { Section, SectionHeader } from "@/components/layout/Section";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { SITE_NAME } from "@/lib/constants";
import {
  getFeaturedArticles,
  getArticles,
  getFeaturedGuides,
  getPopularGlossaryTerms,
  getContentCounts
} from "@/lib/sanity";
import { urlFor } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Evidence-Based Food Education`,
  description:
    "Free guides, tools, and articles to help you make smarter food choices. Learn about nutrition, read food labels, and understand what you eat.",
  openGraph: {
    title: `${SITE_NAME} | Evidence-Based Food Education`,
    description: "Free guides, tools, and articles for smarter food choices.",
    type: "website",
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const [featuredArticles, recentArticles, featuredGuides, popularTerms, counts] = await Promise.all([
    getFeaturedArticles(3),
    getArticles(6),
    getFeaturedGuides(2),
    getPopularGlossaryTerms(6),
    getContentCounts(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Quick Stats Bar */}
      <QuickStatsBar counts={counts} />

      {/* Featured Content (Articles + Guides) */}
      <FeaturedContentSection
        articles={featuredArticles}
        guides={featuredGuides}
      />

      {/* Resource Showcase */}
      <ResourceShowcase />

      {/* Category Navigation */}
      <CategoryGrid />

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <Section background="white" padding="lg">
          <SectionHeader
            eyebrow="Latest Articles"
            title="Fresh From the Blog"
            description="Stay updated with evidence-based insights on food and nutrition"
            centered
          />
          <ArticleGrid articles={recentArticles} columns={3} />
          <div className="text-center mt-10">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* Popular Glossary Terms */}
      {popularTerms.length > 0 && (
        <PopularTermsSection terms={popularTerms} />
      )}

      {/* Why FoodPulse */}
      <WhyFoodPulseSection />

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}

// ============================================
// QUICK STATS BAR
// ============================================

function QuickStatsBar({ counts }: { counts: { articles: number; guides: number; tools: number; glossaryTerms: number } }) {
  const stats = [
    { label: "Articles", value: counts.articles.toString(), icon: FileText },
    { label: "Guides", value: counts.guides.toString(), icon: BookOpen },
    { label: "Tools", value: counts.tools.toString(), icon: Calculator },
    { label: "Glossary Terms", value: counts.glossaryTerms.toString(), icon: Book },
  ];

  return (
    <div className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-green-300" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-green-300 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// FEATURED CONTENT SECTION
// ============================================

interface FeaturedContentProps {
  articles: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    category?: { title: string; slug: string };
    featuredImage?: unknown;
  }>;
  guides: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
  }>;
}

function FeaturedContentSection({ articles, guides }: FeaturedContentProps) {
  if (articles.length === 0 && guides.length === 0) return null;

  return (
    <Section background="neutral" padding="lg">
      <SectionHeader
        eyebrow="Featured Content"
        title="Editor's Picks"
        description="Hand-picked content to help you on your food education journey"
        centered
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Featured Guide (Large) */}
        {guides[0] && (
          <div className="lg:col-span-1">
            <Link
              href={`/guides/${guides[0].slug}`}
              className="group block h-full"
            >
              <div className="relative h-full bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl overflow-hidden p-6 flex flex-col justify-end min-h-[300px]">
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-sm font-medium">
                    📚 Featured Guide
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:underline">
                    {guides[0].title}
                  </h3>
                  <p className="text-green-100 text-sm line-clamp-2 mb-4">
                    {guides[0].excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white font-medium">
                    Read Guide
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Featured Articles */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4 h-full">
            {articles.slice(0, 4).map((article) => {
              const imageUrl = article.featuredImage
                ? urlFor(article.featuredImage as SanityImageSource)?.width(400).height(225).url() || ''
                : null;

              return (
                <Link
                  key={article._id}
                  href={`/articles/${article.category?.slug}/${article.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-green-300 hover:shadow-lg transition-all h-full flex flex-col">
                    {/* Image */}
                    {imageUrl && (
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      {article.category && (
                        <span className="text-xs font-medium text-green-600 mb-1">
                          {article.category.title}
                        </span>
                      )}
                      <h3 className="font-semibold text-neutral-900 group-hover:text-green-700 line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2 mt-auto">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ============================================
// RESOURCE SHOWCASE
// ============================================

function ResourceShowcase() {
  const resources = [
    {
      title: "Nutrition Tools",
      description: "Calculate your protein, macros, calories, and more with our free interactive calculators.",
      icon: Calculator,
      href: "/tools",
      color: "blue",
      featured: [
        { name: "Protein Calculator", href: "/tools/protein-calculator" },
        { name: "Macro Calculator", href: "/tools/macro-calculator" },
        { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
      ],
    },
    {
      title: "Free Guides",
      description: "Comprehensive, downloadable guides on nutrition, meal planning, and reading food labels.",
      icon: BookOpen,
      href: "/guides",
      color: "purple",
      featured: [
        { name: "Browse All Guides", href: "/guides" },
        { name: "View Resources", href: "/resources" },
        { name: "Learn More", href: "/about" },
      ],
    },
    {
      title: "Food Glossary",
      description: "150+ nutrition and food terms explained in simple, easy-to-understand language.",
      icon: Book,
      href: "/glossary",
      color: "amber",
      featured: [
        { name: "Browse Glossary", href: "/glossary" },
        { name: "Search Terms", href: "/search?type=glossary" },
        { name: "Popular Terms", href: "/glossary" },
      ],
    },
    {
      title: "FAQ",
      description: "Quick answers to common questions about food, nutrition, and healthy eating.",
      icon: HelpCircle,
      href: "/faq",
      color: "green",
      featured: [
        { name: "View All FAQs", href: "/faq" },
        { name: "Ask a Question", href: "/contact" },
        { name: "Get Help", href: "/faq" },
      ],
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
      link: "text-blue-600 hover:text-blue-700",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "bg-purple-100 text-purple-600",
      link: "text-purple-600 hover:text-purple-700",
    },
    amber: {
      bg: "bg-amber-50",
      icon: "bg-amber-100 text-amber-600",
      link: "text-amber-600 hover:text-amber-700",
    },
    green: {
      bg: "bg-green-50",
      icon: "bg-green-100 text-green-600",
      link: "text-green-600 hover:text-green-700",
    },
  };

  return (
    <Section background="white" padding="lg">
      <SectionHeader
        eyebrow="Resources"
        title="Everything You Need"
        description="Free tools and resources to support your food education journey"
        centered
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => {
          const colors = colorClasses[resource.color as keyof typeof colorClasses];
          return (
            <div
              key={resource.title}
              className={`${colors.bg} rounded-2xl p-6 flex flex-col`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center mb-4`}>
                <resource.icon className="h-6 w-6" />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                {resource.description}
              </p>

              {/* Featured Links */}
              <div className="space-y-2 mb-4 flex-1">
                {resource.featured.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block text-sm ${colors.link} hover:underline`}
                  >
                    → {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={resource.href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 hover:underline"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ============================================
// POPULAR GLOSSARY TERMS
// ============================================

interface PopularTermsProps {
  terms: {
    _id: string;
    term: string;
    slug: string;
    shortDefinition: string;
    category: string;
  }[];
}

function PopularTermsSection({ terms }: PopularTermsProps) {
  return (
    <Section background="neutral" padding="md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-neutral-900">
            Popular Terms
          </h2>
          <p className="text-neutral-600">
            Commonly searched nutrition and food terms
          </p>
        </div>
        <Link
          href="/glossary"
          className="inline-flex items-center gap-1 text-green-600 font-medium hover:underline"
        >
          View Full Glossary
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {terms.map((term) => (
          <Link
            key={term._id}
            href={`/glossary/${term.slug}`}
            className="group block bg-white rounded-xl p-4 border border-neutral-200 hover:border-green-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-neutral-900 group-hover:text-green-700 mb-1">
              {term.term}
            </h3>
            <p className="text-sm text-neutral-600 line-clamp-2">
              {term.shortDefinition}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

// ============================================
// WHY FOODPULSE SECTION
// ============================================

function WhyFoodPulseSection() {
  const features = [
    {
      title: "Evidence-Based",
      description: "All content is backed by scientific research and authoritative sources like NIH, WHO, and peer-reviewed journals.",
      icon: "🔬",
    },
    {
      title: "No Fads or Gimmicks",
      description: "We focus on sustainable, practical advice—not quick fixes or trendy diets that don't last.",
      icon: "✅",
    },
    {
      title: "Clear & Practical",
      description: "Complex nutrition topics explained simply, with actionable takeaways you can apply today.",
      icon: "💡",
    },
  ];

  return (
    <Section background="green" padding="lg">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-green-900 mb-4">
          Why Choose FoodPulse?
        </h2>
        <p className="text-lg text-green-800">
          We&apos;re building the most trustworthy food education resource on the web
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white/80 backdrop-blur rounded-2xl p-6 text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-neutral-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-green-800 font-medium hover:underline"
        >
          Learn more about our mission
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
