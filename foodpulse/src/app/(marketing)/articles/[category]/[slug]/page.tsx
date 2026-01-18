import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { ShareButtons } from "@/components/articles/ShareButtons";
import { CategoryBadge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/shared/StructuredData";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";
import { getArticleBySlug, getAllArticlePaths } from "@/lib/sanity";
import { Clock, Calendar, User, RefreshCw } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { ArticleCard } from "@/components/articles/ArticleCard";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

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
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.ogImage || article.image.asset.url,
          width: 1200,
          height: 630,
          alt: article.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo?.metaTitle || article.title,
      description: article.seo?.metaDescription || article.excerpt,
      images: [article.ogImage || article.image.asset.url],
    },
    alternates: {
      canonical: article.seo?.canonicalUrl,
    },
    robots: {
      index: !article.seo?.noIndex,
      follow: !article.seo?.noIndex,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category: categorySlug, slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

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

          {/* Series Info */}
          {article.series && (
            <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Part {article.seriesOrder || 1}</strong> of{" "}
                <Link
                  href={`/series/${article.series.slug}`}
                  className="underline hover:text-green-900"
                >
                  {article.series.title}
                </Link>
              </p>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-neutral-700 mb-8">{article.excerpt}</p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-8 pb-8 border-b border-neutral-200">
            <Link
              href={`/authors/${article.author.slug}`}
              className="flex items-center gap-2 hover:text-green-600"
            >
              <User className="h-4 w-4" />
              <span className="font-medium">{article.author.name}</span>
            </Link>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            {article.updatedAt && (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Updated {formatDate(article.updatedAt)}</span>
              </div>
            )}
            {article.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={article.image.asset.url}
                alt={article.image.alt}
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
              {article.image.caption && (
                <p className="text-sm text-neutral-600 mt-2 text-center italic">
                  {article.image.caption}
                </p>
              )}
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
          <div className="prose prose-lg prose-green max-w-none">
            <PortableText value={article.body} />
          </div>

          {/* Sources & References */}
          {article.sources && article.sources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Sources & References
              </h3>
              <ul className="space-y-2">
                {article.sources.map((source, index) => (
                  <li key={index} className="text-sm text-neutral-700">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      {source.title}
                    </a>
                    {source.author && <> by {source.author}</>}
                    {source.year && <> ({source.year})</>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {article.faq.map((item, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                      {item.question}
                    </h4>
                    <p className="text-neutral-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
          {article.author && (
            <div className="mt-12 p-6 bg-green-50 rounded-xl">
              <div className="flex items-start gap-4">
                {article.author.image && (
                  <Image
                    src={article.author.image.asset.url}
                    alt={article.author.image.alt}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    <Link
                      href={`/authors/${article.author.slug}`}
                      className="hover:text-green-600"
                    >
                      {article.author.name}
                    </Link>
                  </h3>
                  {article.author.role && (
                    <p className="text-sm text-neutral-600 mb-2">
                      {article.author.role}
                    </p>
                  )}
                  <p className="text-neutral-700">{article.author.bio}</p>
                  {article.author.credentials && article.author.credentials.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-neutral-600 mb-1">
                        <strong>Credentials:</strong>
                      </p>
                      <ul className="text-sm text-neutral-700 list-disc list-inside">
                        {article.author.credentials.map((cred, i) => (
                          <li key={i}>{cred}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </article>
      </Section>

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <Section background="neutral" padding="lg">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {article.relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle._id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articlePaths = await getAllArticlePaths();

  return articlePaths.map((path) => ({
    category: path.category,
    slug: path.slug,
  }));
}
