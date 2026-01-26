import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { getArticlesByCategory, getAllCategoryPaths } from "@/lib/sanity";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const data = await getArticlesByCategory(categorySlug, 12);

  if (!data.category) {
    return {
      title: "Category Not Found",
    };
  }

  const { category } = data;

  return {
    title: category.seo?.metaTitle || `${category.title} Articles`,
    description: category.seo?.metaDescription || category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const data = await getArticlesByCategory(categorySlug, 12);

  if (!data.category) {
    notFound();
  }

  const { category, articles } = data;

  return (
    <>
      {/* Category Header */}
      <Section background="green" padding="md">
        <div className="max-w-3xl">
          {category.icon && <div className="text-4xl mb-4">{category.icon}</div>}
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-4">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-xl text-green-800">{category.description}</p>
          )}
        </div>

        {/* Category Image */}
        {category.image && (
          <div className="mt-8 rounded-xl overflow-hidden max-w-4xl">
            <Image
              src={category.image.asset.url}
              alt={category.image.alt}
              width={1200}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
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
              We&apos;re working on bringing you quality content about {category.title.toLowerCase()}.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categoryPaths = await getAllCategoryPaths();

  return categoryPaths.map((slug) => ({
    category: slug,
  }));
}
