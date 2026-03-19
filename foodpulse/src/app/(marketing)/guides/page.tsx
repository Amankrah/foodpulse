import { Metadata } from "next";
import Link from "next/link";
import { getGuidesHub } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GuideCard } from "@/components/guides/GuideCard";
import { GuideFeatured } from "@/components/guides/GuideFeatured";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";

export const metadata: Metadata = {
  title: "Guides & Resources | Food & Nutrition Guides | FoodPulse",
  description:
    "Download guides on nutrition, meal planning, and healthy eating. Practical, evidence-based resources to help you make better food decisions.",
  openGraph: {
    title: "Guides & Resources | FoodPulse",
    description:
      "Practical guides to help you make better food decisions. Download, learn, and take action.",
    type: "website",
  },
};

export const revalidate = 3600;

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
      <Section
        background="green"
        padding="lg"
        className="border-b border-[var(--color-teal)]/15"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <nav
              className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-[var(--color-support)] mb-6"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-[var(--color-teal)] underline-offset-2 hover:underline transition-colors"
              >
                Home
              </Link>
              <span className="text-[var(--color-sage)]" aria-hidden>
                /
              </span>
              <span className="font-medium text-[var(--color-primary)]">Guides</span>
            </nav>

            <p className="eyebrow mb-3">Editorial</p>
            <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
              Guides & resources
            </h1>

            <p className="text-xl font-light text-[var(--color-support)] leading-relaxed mb-6">
              Practical, evidence-based guides—download, learn, and take action at your pace.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[var(--color-support)]">
              <span className="flex items-center gap-1.5 font-semibold text-[var(--color-primary)]">
                <svg
                  className="w-5 h-5 text-[var(--color-teal)]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                {totalCount} guides
              </span>
              <span className="text-[var(--color-sage)]">•</span>
              <span>Free, email & premium</span>
              <span className="text-[var(--color-sage)]">•</span>
              <span>Downloadable PDFs</span>
            </div>
          </div>
        </Container>
      </Section>

      {featured && (
        <Section
          background="white"
          padding="lg"
          className="border-t border-[var(--color-sage)]/15 bg-[color-mix(in_srgb,var(--color-mint)_35%,white)]"
        >
          <Container>
            <p className="eyebrow mb-4 text-center">Featured</p>
            <GuideFeatured guide={featured} />
          </Container>
        </Section>
      )}

      {freeGuides.length > 0 && (
        <Section
          background="neutral"
          padding="lg"
          className="border-t border-[var(--color-sage)]/10"
        >
          <Container>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-[var(--color-primary)] tracking-tight mb-2">
                Guides
              </h2>
              <p className="text-[length:var(--size-body)] text-[var(--color-support)] leading-relaxed">
                No email required—download and start learning right away.
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
        <Section
          background="white"
          padding="lg"
          className="border-t border-[var(--color-sage)]/15"
        >
          <Container>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-[var(--color-primary)] tracking-tight mb-2">
                Downloads
              </h2>
              <p className="text-[length:var(--size-body)] text-[var(--color-support)] leading-relaxed">
                Enter your email to download these guides and get monthly updates.
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
        <Section
          background="neutral"
          padding="lg"
          className="border-t border-[var(--color-sage)]/10 bg-[color-mix(in_srgb,var(--color-mint)_12%,var(--neutral-50))]"
        >
          <Container>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-[var(--color-primary)] tracking-tight mb-2">
                Premium guides
              </h2>
              <p className="text-[length:var(--size-body)] text-[var(--color-support)] leading-relaxed">
                In-depth resources with templates, worksheets, and advanced strategies.
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
        <Section
          background="white"
          padding="lg"
          className="border-t border-[var(--color-sage)]/15"
        >
          <Container>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-[var(--color-primary)] tracking-tight mb-2">
                Interactive tools
              </h2>
              <p className="text-[length:var(--size-body)] text-[var(--color-support)] leading-relaxed">
                Calculators and planners that pair with our guides—see also the{" "}
                <Link href="/tools" className="font-semibold text-[var(--color-teal)] hover:text-[var(--color-primary)] underline-offset-2 hover:underline">
                  tools hub
                </Link>
                .
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

      {/* Shop mention */}
      <Section
        background="neutral"
        padding="sm"
        className="border-t border-[var(--color-sage)]/10"
      >
        <Container>
          <p className="text-center text-[length:var(--size-body)] text-[var(--color-support)] leading-relaxed">
            More guides and digital resources in our{" "}
            <Link
              href="/shop"
              className="font-semibold text-[var(--color-teal)] hover:text-[var(--color-primary)] underline-offset-2 hover:underline"
            >
              shop
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
