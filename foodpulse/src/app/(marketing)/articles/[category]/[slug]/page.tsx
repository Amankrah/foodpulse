import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { CategoryBadge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/shared/StructuredData";
import { getCategoryBySlug } from "@/content/categories";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";
import { Clock, Calendar, User } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// TODO: Replace with actual data fetching from CMS
async function getArticle(category: string, slug: string) {
  // This is a placeholder - replace with actual CMS/API call
  return null;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticle(category, slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    keywords: article.seo?.keywords || article.tags,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.image.src,
          width: article.image.width || 1200,
          height: article.image.height || 630,
          alt: article.image.alt,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category: categorySlug, slug } = await params;
  const article = await getArticle(categorySlug, slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryBySlug(categorySlug);
  const articleUrl = `${SITE_URL}/articles/${categorySlug}/${slug}`;

  return (
    <>
      {/* Structured Data */}
      <StructuredData type="article" data={article} />

      {/* Article Header */}
      <Section background="white" padding="lg">
        <article className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-4">
            <CategoryBadge category={categorySlug} />
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-8">
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author.name}</span>
              </div>
            )}
            {article.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={article.image.src}
                alt={article.image.alt}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Share Buttons */}
          <div className="mb-8">
            <ShareButtons
              url={articleUrl}
              title={article.title}
              description={article.excerpt}
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* TODO: Render article content from markdown/MDX */}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {article.author && article.author.bio && (
            <div className="mt-12 p-6 bg-green-50 rounded-xl">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                About {article.author.name}
              </h3>
              <p className="text-neutral-700">{article.author.bio}</p>
            </div>
          )}
        </article>
      </Section>

      {/* Related Articles */}
      {/* TODO: Add related articles section */}
    </>
  );
}
