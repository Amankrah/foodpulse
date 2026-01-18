import { ArticleCard, FeaturedArticleCard } from "./ArticleCard";
import type { ArticleListItem } from "@/lib/sanity";

interface ArticleGridProps {
  articles: ArticleListItem[];
  featured?: ArticleListItem;
  columns?: 2 | 3 | 4;
  showExcerpt?: boolean;
}

export function ArticleGrid({
  articles,
  featured,
  columns = 3,
  showExcerpt = true,
}: ArticleGridProps) {
  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className="space-y-8">
      {/* Featured Article */}
      {featured && (
        <div className="mb-12">
          <FeaturedArticleCard article={featured} />
        </div>
      )}

      {/* Article Grid */}
      <div
        className={`grid grid-cols-1 ${gridColsClass[columns]} gap-6 lg:gap-8`}
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            showExcerpt={showExcerpt}
          />
        ))}
      </div>
    </div>
  );
}
