import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuidePaths } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GuideHero } from "@/components/guides/GuideHero";
import { GuideContent } from "@/components/guides/GuideContent";
import { GuideSidebar } from "@/components/guides/GuideSidebar";
import { EmailGate } from "@/components/guides/EmailGate";
import { DownloadButton } from "@/components/guides/DownloadButton";
import { PurchaseCta } from "@/components/guides/PurchaseCta";
import { GuideCard } from "@/components/guides/GuideCard";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";

interface GuidePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllGuidePaths();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const guide = await getGuideBySlug(params.slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  const metaTitle =
    guide.seo?.metaTitle || `${guide.title} | Free Guide | FoodPulse`;
  const metaDescription = guide.seo?.metaDescription || guide.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: guide.author ? [guide.author.name] : undefined,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  const showEmailGate = guide.accessType === "email-gated";
  const showDownloadButton = guide.accessType === "free" && guide.downloadUrl;
  const showPurchaseCta = guide.accessType === "paid";

  return (
    <>
      {/* Breadcrumb */}
      <Section background="white" padding="none">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-neutral-600 py-4">
            <Link href="/" className="hover:text-green-700 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              href="/guides"
              className="hover:text-green-700 transition-colors"
            >
              Guides
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-neutral-900 truncate">{guide.title}</span>
          </nav>
        </Container>
      </Section>

      {/* Hero */}
      <GuideHero guide={guide} />

      {/* Main Content */}
      <Section background="white" padding="lg">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content Column (2/3) */}
            <div className="lg:col-span-2">
              <GuideContent guide={guide} />

              {/* Download/Email Gate Section */}
              {(showEmailGate || showDownloadButton || showPurchaseCta) && (
                <div className="mt-12 pt-12 border-t border-neutral-200">
                  {showEmailGate && guide.downloadUrl && (
                    <EmailGate
                      guideTitle={guide.title}
                      guideSlug={guide.slug}
                      downloadUrl={guide.downloadUrl}
                    />
                  )}

                  {showDownloadButton && guide.downloadUrl && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                        Download This Guide
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        Get the full guide as a PDF to read offline or print.
                      </p>
                      <DownloadButton
                        guideTitle={guide.title}
                        guideSlug={guide.slug}
                        downloadUrl={guide.downloadUrl}
                        fileName={guide.downloadFileName}
                        className="mx-auto"
                      />
                    </div>
                  )}

                  {showPurchaseCta && guide.price && guide.purchaseLink && (
                    <PurchaseCta
                      title={guide.title}
                      price={guide.price}
                      purchaseLink={guide.purchaseLink}
                      features={guide.whatYoullLearn}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Sidebar (1/3) */}
            <div className="lg:col-span-1">
              <GuideSidebar
                guide={guide}
                relatedGuides={guide.relatedGuides}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Guides */}
      {guide.relatedGuides && guide.relatedGuides.length > 0 && (
        <Section background="neutral" padding="lg">
          <Container>
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8">
              Related Guides
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guide.relatedGuides.slice(0, 3).map((relatedGuide) => (
                <GuideCard key={relatedGuide._id} guide={relatedGuide} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Related Articles */}
      {guide.relatedArticles && guide.relatedArticles.length > 0 && (
        <Section background="white" padding="lg">
          <Container>
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guide.relatedArticles.slice(0, 3).map((article) => (
                <a
                  key={article._id}
                  href={`/blog/${article.category.slug}/${article.slug}`}
                  className="group block bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-green-300 hover:shadow-lg transition-all"
                >
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-green-700 uppercase tracking-wide">
                        {article.category.title}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
