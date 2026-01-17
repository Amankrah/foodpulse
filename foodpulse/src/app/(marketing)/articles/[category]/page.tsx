import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHeader } from "@/components/layout/Section";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { getCategoryBySlug } from "@/content/categories";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.seo.title,
    description: category.seo.description,
    keywords: category.seo.keywords,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  // TODO: Fetch articles for this category from CMS or API
  const articles = [];

  return (
    <>
      {/* Category Header */}
      <Section background="green" padding="md">
        <div className="max-w-3xl">
          <div className="text-4xl mb-4">{category.icon}</div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-green-800">{category.longDescription}</p>
        </div>
      </Section>

      {/* Articles Grid */}
      <Section background="white" padding="lg">
        {articles.length > 0 ? (
          <ArticleGrid articles={articles} columns={3} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-neutral-600 mb-6">
              No articles in this category yet. Check back soon!
            </p>
            <p className="text-neutral-500">
              We're working on bringing you quality content about {category.name.toLowerCase()}.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  const { categoryList } = await import("@/content/categories");

  return categoryList.map((category) => ({
    category: category.slug,
  }));
}
