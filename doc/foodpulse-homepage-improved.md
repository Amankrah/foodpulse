# FoodPulse Homepage — Improved Implementation

## Current vs. Improved Structure

| Current | Improved |
|---------|----------|
| Hero | Enhanced Hero with value props |
| Featured Articles | Featured Content (articles + guides) |
| Category Grid | Category Grid (keep) |
| Recent Articles | Recent Articles (keep) |
| Newsletter CTA | Resources Showcase (NEW) |
| — | Quick Tools Section (NEW) |
| — | "Why FoodPulse" Section (NEW) |
| — | Newsletter CTA (moved to end) |

---

## 1. Updated Homepage Component

```tsx
// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  BookOpen, 
  Calculator, 
  Book, 
  HelpCircle,
  CheckCircle,
  Users,
  FileText,
  Sparkles
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
  getPopularGlossaryTerms 
} from "@/lib/sanity";

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
  const [featuredArticles, recentArticles, featuredGuides, popularTerms] = await Promise.all([
    getFeaturedArticles(3),
    getArticles(6),
    getFeaturedGuides(2),
    getPopularGlossaryTerms(6),
  ]);

  return (
    <>
      {/* Hero Section - Enhanced */}
      <HeroSection />

      {/* Quick Stats Bar */}
      <QuickStatsBar />

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
// HERO SECTION - Enhanced
// ============================================

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Free food education for everyone
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 leading-tight mb-6">
              Make{" "}
              <span className="text-green-600">Smarter</span>{" "}
              Food Choices
            </h1>

            <p className="text-xl text-neutral-600 mb-8 max-w-lg">
              Evidence-based guides, practical tools, and clear explanations 
              to help you understand nutrition and eat better.
            </p>

            {/* Value Props */}
            <div className="space-y-3 mb-8">
              {[
                "Learn to read nutrition labels like a pro",
                "Understand what's really in your food",
                "Get personalized nutrition calculations",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
              >
                <BookOpen className="h-5 w-5" />
                Browse Free Guides
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-colors border-2 border-green-200"
              >
                <Calculator className="h-5 w-5" />
                Try Our Tools
              </Link>
            </div>
          </div>

          {/* Right: Featured Visual */}
          <div className="relative hidden lg:block">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Mock Tool Preview */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-sm text-green-600 font-medium mb-2">
                  Protein Calculator
                </div>
                <div className="text-4xl font-bold text-neutral-900 mb-1">
                  120g
                </div>
                <div className="text-neutral-500 text-sm">
                  Your daily protein goal
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-2 text-center">
                    <div className="text-lg font-semibold text-neutral-900">30g</div>
                    <div className="text-xs text-neutral-500">per meal</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <div className="text-lg font-semibold text-neutral-900">1.5g</div>
                    <div className="text-xs text-neutral-500">per kg</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <div className="text-lg font-semibold text-neutral-900">480</div>
                    <div className="text-xs text-neutral-500">calories</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-neutral-500">Try it free →</span>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-green-100 border-2 border-white" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-white flex items-center justify-center text-white text-xs">
                    +2k
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 transform -rotate-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Book className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500">Glossary</div>
                  <div className="text-sm font-semibold">150+ terms</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 transform rotate-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500">Articles</div>
                  <div className="text-sm font-semibold">50+ guides</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// QUICK STATS BAR
// ============================================

function QuickStatsBar() {
  const stats = [
    { label: "Free Articles", value: "50+", icon: FileText },
    { label: "Guides & Tools", value: "15+", icon: BookOpen },
    { label: "Glossary Terms", value: "150+", icon: Book },
    { label: "Monthly Readers", value: "5K+", icon: Users },
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
  articles: any[];
  guides: any[];
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
            {articles.slice(0, 4).map((article) => (
              <Link
                key={article._id}
                href={`/articles/${article.category?.slug}/${article.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-green-300 hover:shadow-lg transition-all h-full flex flex-col">
                  {/* Image */}
                  {article.featuredImage && (
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={article.featuredImage}
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
            ))}
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
        { name: "Reading Nutrition Labels", href: "/guides/nutrition-labels" },
        { name: "Meal Planning 101", href: "/guides/meal-planning" },
        { name: "Supplement Checklist", href: "/guides/supplements" },
      ],
    },
    {
      title: "Food Glossary",
      description: "150+ nutrition and food terms explained in simple, easy-to-understand language.",
      icon: Book,
      href: "/glossary",
      color: "amber",
      featured: [
        { name: "Macronutrients", href: "/glossary/macronutrients" },
        { name: "Organic", href: "/glossary/organic" },
        { name: "Glycemic Index", href: "/glossary/glycemic-index" },
      ],
    },
    {
      title: "FAQ",
      description: "Quick answers to common questions about food, nutrition, and healthy eating.",
      icon: HelpCircle,
      href: "/resources/faq",
      color: "green",
      featured: [
        { name: "How much protein do I need?", href: "/resources/faq#protein" },
        { name: "Is organic food better?", href: "/resources/faq#organic" },
        { name: "What are macros?", href: "/resources/faq#macros" },
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
      title: "Free Forever",
      description: "Core content will always be free. We believe food education should be accessible to everyone.",
      icon: "💚",
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
          We're building the most trustworthy food education resource on the web
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
```

---

## 2. Additional Sanity Queries

```typescript
// lib/sanity.ts - Add these queries

export async function getFeaturedGuides(limit: number = 3) {
  return sanityFetch({
    query: `
      *[_type == "guide" && isPublished == true && isFeatured == true] | order(publishedAt desc) [0...$limit] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        category,
        guideType,
        accessType,
        featuredImage
      }
    `,
    params: { limit },
  });
}

export async function getPopularGlossaryTerms(limit: number = 6) {
  // In a real scenario, you might track views and sort by popularity
  // For now, we'll use a "popular" boolean or just get featured/common terms
  return sanityFetch({
    query: `
      *[_type == "glossaryTerm" && isPublished == true] | order(term asc) [0...$limit] {
        _id,
        term,
        "slug": slug.current,
        shortDefinition,
        category
      }
    `,
    params: { limit },
  });
}

export async function getHomePageData() {
  // Single query for all homepage data (more efficient)
  return sanityFetch({
    query: `{
      "featuredArticles": *[_type == "article" && isFeatured == true] | order(publishedAt desc) [0...3] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "category": category->{title, "slug": slug.current},
        featuredImage,
        publishedAt
      },
      "recentArticles": *[_type == "article"] | order(publishedAt desc) [0...6] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "category": category->{title, "slug": slug.current},
        featuredImage,
        publishedAt
      },
      "featuredGuides": *[_type == "guide" && isPublished == true && isFeatured == true] | order(publishedAt desc) [0...2] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        category,
        guideType
      },
      "popularTerms": *[_type == "glossaryTerm"] | order(term asc) [0...6] {
        _id,
        term,
        "slug": slug.current,
        shortDefinition,
        category
      },
      "stats": {
        "articleCount": count(*[_type == "article"]),
        "guideCount": count(*[_type == "guide" && isPublished == true]),
        "termCount": count(*[_type == "glossaryTerm"]),
        "toolCount": 8
      }
    }`,
  });
}
```

---

## 3. Optimized Version Using Single Query

```tsx
// app/page.tsx - Optimized version

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <>
      <HeroSection />
      <QuickStatsBar stats={data.stats} />
      <FeaturedContentSection 
        articles={data.featuredArticles} 
        guides={data.featuredGuides} 
      />
      <ResourceShowcase />
      <CategoryGrid />
      {data.recentArticles.length > 0 && (
        <RecentArticlesSection articles={data.recentArticles} />
      )}
      {data.popularTerms.length > 0 && (
        <PopularTermsSection terms={data.popularTerms} />
      )}
      <WhyFoodPulseSection />
      <NewsletterCTA />
    </>
  );
}

// Dynamic stats bar
function QuickStatsBar({ stats }: { stats: any }) {
  const items = [
    { label: "Free Articles", value: `${stats.articleCount}+`, icon: FileText },
    { label: "Guides & Tools", value: `${stats.guideCount + stats.toolCount}+`, icon: BookOpen },
    { label: "Glossary Terms", value: `${stats.termCount}+`, icon: Book },
    { label: "Monthly Readers", value: "5K+", icon: Users },
  ];
  // ... rest of component
}
```

---

## 4. Visual Summary of New Homepage

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              ENHANCED HERO SECTION                   │    │
│  │                                                      │    │
│  │  [Badge] Free food education for everyone           │    │
│  │                                                      │    │
│  │  Make Smarter Food Choices                          │    │
│  │                                                      │    │
│  │  ✓ Learn to read nutrition labels                   │    │
│  │  ✓ Understand what's in your food                   │    │
│  │  ✓ Get personalized calculations                    │    │
│  │                                                      │    │
│  │  [Browse Guides] [Try Our Tools]                    │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  ████████ QUICK STATS BAR (dark green) ████████████████████ │
│  50+ Articles  |  15+ Guides  |  150+ Terms  |  5K+ Readers │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              FEATURED CONTENT SECTION                 │   │
│  │                                                       │   │
│  │  ┌──────────┐  ┌───────────┐ ┌───────────┐          │   │
│  │  │ FEATURED │  │ Article 1 │ │ Article 2 │          │   │
│  │  │  GUIDE   │  ├───────────┤ ├───────────┤          │   │
│  │  │  (tall)  │  │ Article 3 │ │ Article 4 │          │   │
│  │  └──────────┘  └───────────┘ └───────────┘          │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              RESOURCE SHOWCASE                        │   │
│  │                                                       │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │   │
│  │  │  Tools  │ │ Guides  │ │Glossary │ │   FAQ   │    │   │
│  │  │ (blue)  │ │(purple) │ │(amber)  │ │ (green) │    │   │
│  │  │         │ │         │ │         │ │         │    │   │
│  │  │ → Calc1 │ │ → Guide1│ │ → Term1 │ │ → FAQ1  │    │   │
│  │  │ → Calc2 │ │ → Guide2│ │ → Term2 │ │ → FAQ2  │    │   │
│  │  │ → Calc3 │ │ → Guide3│ │ → Term3 │ │ → FAQ3  │    │   │
│  │  │         │ │         │ │         │ │         │    │   │
│  │  │View All→│ │View All→│ │View All→│ │View All→│    │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                    CATEGORY GRID                             │
│              (existing component)                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                 RECENT ARTICLES SECTION                      │
│           (existing, with articles from Sanity)              │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              POPULAR GLOSSARY TERMS                   │   │
│  │                                                       │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐                │   │
│  │  │ Term 1  │ │ Term 2  │ │ Term 3  │                │   │
│  │  ├─────────┤ ├─────────┤ ├─────────┤                │   │
│  │  │ Term 4  │ │ Term 5  │ │ Term 6  │                │   │
│  │  └─────────┘ └─────────┘ └─────────┘                │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              WHY FOODPULSE (green bg)                 │   │
│  │                                                       │   │
│  │  🔬 Evidence-Based  |  💚 Free Forever                │   │
│  │  ✅ No Fads         |  💡 Clear & Practical           │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                   NEWSLETTER CTA                             │
│              (existing component)                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Improvements

| Area | Before | After |
|------|--------|-------|
| **Hero** | Basic title + CTA | Value props, dual CTAs, visual preview |
| **Social Proof** | None | Stats bar with counts |
| **Content Types** | Articles only | Articles + Guides featured |
| **Resources** | Not showcased | 4-card showcase with quick links |
| **Glossary** | Not on homepage | Popular terms section |
| **Trust** | None | "Why FoodPulse" section |
| **Data Fetching** | Multiple queries | Single optimized query option |
