import { Metadata } from "next";
import Link from "next/link";
import { getGuidesHub } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GuideCard } from "@/components/guides/GuideCard";
import { GuideFeatured } from "@/components/guides/GuideFeatured";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";

export const metadata: Metadata = {
  title: "Free Guides & Resources | Food & Nutrition Guides | FoodPulse",
  description:
    "Download free guides on nutrition, meal planning, and healthy eating. Practical, evidence-based resources to help you make better food decisions.",
  openGraph: {
    title: "Free Guides & Resources | FoodPulse",
    description:
      "Practical guides to help you make better food decisions. Download, learn, and take action.",
    type: "website",
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function GuidesPage() {
  const { featured, guides, totalCount } = await getGuidesHub();

  // Group guides by access type
  const freeGuides = guides.filter((g) => g.accessType === "free");
  const emailGatedGuides = guides.filter((g) => g.accessType === "email-gated");
  const premiumGuides = guides.filter((g) => g.accessType === "paid");
  const tools = guides.filter((g) => g.guideType === "tool");

  return (
    <>
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-sm text-neutral-600 mb-6">
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
              <span className="text-neutral-900">Guides</span>
            </nav>

            <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
              Free Guides & Resources
            </h1>

            <p className="text-xl text-neutral-600 mb-6">
              Practical guides to help you make better food decisions. Download,
              learn, and take action.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-neutral-600">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                {totalCount} guides
              </span>
              <span className="text-neutral-300">•</span>
              <span>Free & Premium</span>
              <span className="text-neutral-300">•</span>
              <span>Downloadable PDFs</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Guide */}
      {featured && (
        <Section background="white" padding="lg">
          <Container>
            <GuideFeatured guide={featured} />
          </Container>
        </Section>
      )}

      {/* Free Guides */}
      {freeGuides.length > 0 && (
        <Section background="neutral" padding="lg">
          <Container>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                Free Guides
              </h2>
              <p className="text-neutral-600">
                No email required. Download and start learning right away.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeGuides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Email-Gated Guides */}
      {emailGatedGuides.length > 0 && (
        <Section background="white" padding="lg">
          <Container>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                Free Downloads
              </h2>
              <p className="text-neutral-600">
                Enter your email to download these guides and get weekly tips.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {emailGatedGuides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Premium Guides */}
      {premiumGuides.length > 0 && (
        <Section background="neutral" padding="lg">
          <Container>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                Premium Guides
              </h2>
              <p className="text-neutral-600">
                In-depth resources with templates, worksheets, and advanced
                strategies.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumGuides.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Interactive Tools */}
      {tools.length > 0 && (
        <Section background="white" padding="lg">
          <Container>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                Interactive Tools
              </h2>
              <p className="text-neutral-600">
                Calculators and tools to help you make better food decisions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((guide) => (
                <GuideCard key={guide._id} guide={guide} />
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
