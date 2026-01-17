import Link from "next/link";
import { Clock } from "lucide-react";
import {
  Card,
  CardImage,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import { CategoryBadge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Article, CardVariant } from "@/types";

interface ArticleCardProps {
  article: Article;
  variant?: CardVariant;
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
}

export function ArticleCard({
  article,
  variant = "default",
  showExcerpt = true,
  showDate = false,
  showAuthor = false,
}: ArticleCardProps) {
  const articleUrl = `/articles/${article.category}/${article.slug}`;

  return (
    <Link href={articleUrl} className="group block">
      <Card variant={variant} padding="none" hover>
        {/* Image */}
        <CardImage
          src={article.image.src}
          alt={article.image.alt}
          aspectRatio="16/10"
          className="rounded-t-xl"
        />

        {/* Content */}
        <div className="p-5 lg:p-6">
          <CardHeader className="mb-0">
            {/* Category Badge */}
            <div className="mb-3">
              <CategoryBadge category={article.category} />
            </div>

            {/* Title */}
            <CardTitle as="h3">{article.title}</CardTitle>
          </CardHeader>

          {/* Excerpt */}
          {showExcerpt && (
            <CardDescription clamp={2} className="mt-3">
              {article.excerpt}
            </CardDescription>
          )}

          {/* Footer Meta */}
          <CardFooter className="mt-4 text-sm text-neutral-500">
            {/* Read Time */}
            {article.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
            )}

            {/* Date */}
            {showDate && article.publishedAt && (
              <span>{formatDate(article.publishedAt)}</span>
            )}

            {/* Author */}
            {showAuthor && article.author && (
              <span>By {article.author.name}</span>
            )}
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

interface FeaturedArticleCardProps {
  article: Article;
}

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  const articleUrl = `/articles/${article.category}/${article.slug}`;

  return (
    <Link href={articleUrl} className="group block">
      <Card variant="featured" padding="none" hover>
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 lg:h-full">
            <img
              src={article.image.src}
              alt={article.image.alt}
              className="h-full w-full object-cover rounded-tl-xl lg:rounded-l-xl lg:rounded-tr-none transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <CategoryBadge category={article.category} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <div className="eyebrow mb-2">Featured</div>

            <h3 className="text-2xl lg:text-3xl font-display font-semibold text-neutral-800 group-hover:text-green-700 transition-colors mb-4">
              {article.title}
            </h3>

            <p className="text-neutral-600 text-lg mb-6 line-clamp-3">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-4 text-sm text-neutral-500">
              {article.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
              )}
              {article.author && <span>By {article.author.name}</span>}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
