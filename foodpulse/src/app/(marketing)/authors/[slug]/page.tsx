import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { getAuthorBySlug, getAllAuthorPaths } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { Twitter, Linkedin, Instagram, Globe } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAuthorBySlug(slug);

  if (!data?.author) {
    return {
      title: "Author Not Found",
    };
  }

  const { author } = data;

  return {
    title: `${author.name} | FoodPulse`,
    description: author.bio,
    openGraph: {
      title: author.name,
      description: author.bio,
      images: author.image ? [author.image.asset.url] : [],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const data = await getAuthorBySlug(slug);

  if (!data?.author) {
    notFound();
  }

  const { author, articles, articleCount } = data;

  return (
    <>
      {/* Author Header */}
      <Section background="green" padding="lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Author Image */}
            {author.image && (
              <div className="flex-shrink-0">
                <Image
                  src={author.image.asset.url}
                  alt={author.image.alt}
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              </div>
            )}

            {/* Author Info */}
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-2">
                {author.name}
              </h1>

              {author.role && (
                <p className="text-xl text-green-800 mb-4">{author.role}</p>
              )}

              <p className="text-lg text-green-800 mb-6">{author.bio}</p>

              {/* Credentials */}
              {author.credentials && author.credentials.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-green-900 mb-2 uppercase">
                    Credentials
                  </h3>
                  <ul className="space-y-1">
                    {author.credentials.map((cred, i) => (
                      <li key={i} className="text-green-800 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expertise */}
              {author.expertise && author.expertise.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-green-900 mb-2 uppercase">
                    Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {author.expertise.map((area, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/50 text-green-900 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {author.social && (
                <div className="flex gap-4">
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-800 hover:text-green-900"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-800 hover:text-green-900"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {author.social.instagram && (
                    <a
                      href={author.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-800 hover:text-green-900"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {author.social.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-800 hover:text-green-900"
                      aria-label="Website"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}

              {/* Article Count */}
              <p className="mt-6 text-green-800 font-medium">
                {articleCount} {articleCount === 1 ? "article" : "articles"} published
              </p>
            </div>
          </div>

          {/* Full Bio */}
          {author.fullBio && author.fullBio.length > 0 && (
            <div className="mt-12 prose prose-lg prose-green max-w-none">
              <PortableText value={author.fullBio} />
            </div>
          )}
        </div>
      </Section>

      {/* Author's Articles */}
      {articles.length > 0 && (
        <Section background="white" padding="lg">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8">
              Articles by {author.name}
            </h2>
            <ArticleGrid articles={articles} columns={3} />
          </div>
        </Section>
      )}
    </>
  );
}

// Generate static params for all authors
export async function generateStaticParams() {
  const authorPaths = await getAllAuthorPaths();

  return authorPaths.map((slug) => ({
    slug,
  }));
}
