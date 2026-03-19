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
  params: Promise<{ slug: string }>;
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
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  const metaTitle =
    guide.seo?.metaTitle || `${guide.title} | Guide | FoodPulse`;
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
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const showEmailGate = guide.accessType === "email-gated";
  const showDownloadButton = guide.accessType === "free" && guide.downloadUrl;
  const showPurchaseCta = guide.accessType === "paid";

  return (
    <>
      {/* Breadcrumb */}
      <Section background="white" padding="none" className="border-b border-[var(--color-sage)]/20">
        <Container>
          <nav
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-support)] py-4"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[var(--color-teal)] underline-offset-2 hover:underline shrink-0"
            >
              Home
            </Link>
            <span className="text-[var(--color-sage)]" aria-hidden>
              /
            </span>
            <Link
              href="/guides"
              className="hover:text-[var(--color-teal)] underline-offset-2 hover:underline shrink-0"
            >
              Guides
            </Link>
            <span className="text-[var(--color-sage)]" aria-hidden>
              /
            </span>
            <span className="font-medium text-[var(--color-primary)] truncate min-w-0">
              {guide.title}
            </span>
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
                <div className="mt-12 pt-12 border-t border-[var(--color-sage)]/25">
                  {showEmailGate && guide.downloadUrl && (
                    <EmailGate
                      guideTitle={guide.title}
                      guideSlug={guide.slug}
                      downloadUrl={guide.downloadUrl}
                    />
                  )}

                  {showDownloadButton && guide.downloadUrl && (
                    <div
                      id="download"
                      className="max-w-md mx-auto rounded-2xl border border-[var(--color-teal)]/25 bg-[var(--color-mint)] p-8 text-center"
                    >
                      <h3 className="text-2xl font-display font-bold text-[var(--color-primary)] mb-3">
                        Download this guide
                      </h3>
                      <p className="text-[var(--color-support)] mb-6 leading-relaxed">
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
            <h2 className="text-3xl font-display font-bold text-[var(--color-primary)] tracking-tight mb-8">
              Related guides
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
            <h2 className="text-3xl font-display font-bold text-[var(--color-primary)] tracking-tight mb-8">
              Related articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guide.relatedArticles.slice(0, 3).map((article) => (
                <a
                  key={article._id}
                  href={`/articles/${article.category.slug}/${article.slug}`}
                  className="group block rounded-2xl border border-[var(--color-sage)]/30 bg-white overflow-hidden hover:border-[var(--color-teal)]/35 hover:shadow-md transition-all"
                >
                  <div className="p-5">
                    <div className="mb-2">
                      <span className="eyebrow !normal-case !tracking-wide text-[0.65rem]">
                        {article.category.title}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-[var(--color-primary)] mb-2 line-clamp-2 group-hover:text-[var(--color-teal)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--color-support)] line-clamp-2 leading-relaxed">
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
