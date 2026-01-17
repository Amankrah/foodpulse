import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { categoryList } from "@/content/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categoryList.map((category) => ({
    url: `${SITE_URL}/articles/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // TODO: Add article pages when you have articles
  // const articles = await getArticles();
  // const articlePages = articles.map(article => ({
  //   url: `${SITE_URL}/articles/${article.category}/${article.slug}`,
  //   lastModified: new Date(article.updatedAt || article.publishedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  return [...staticPages, ...categoryPages];
}
