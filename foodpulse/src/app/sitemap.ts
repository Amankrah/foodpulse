import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { categoryList } from "@/content/categories";
import { getSitemapData } from "@/lib/sanity";

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
      url: `${SITE_URL}/resources/glossary`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/resources/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
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

  // Fetch dynamic content from Sanity
  const sitemapData = await getSitemapData();

  // Article pages
  const articlePages: MetadataRoute.Sitemap =
    sitemapData.articles?.map((article: any) => ({
      url: `${SITE_URL}/articles/${article.category}/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) || [];

  // Glossary term pages
  const glossaryPages: MetadataRoute.Sitemap =
    sitemapData.glossaryTerms?.map((term: any) => ({
      url: `${SITE_URL}/resources/glossary/${term.slug}`,
      lastModified: new Date(term.updatedAt || term.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) || [];

  return [...staticPages, ...categoryPages, ...articlePages, ...glossaryPages];
}
