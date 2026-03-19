import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/layout/Section";
import { GlossaryHub } from "@/components/glossary/GlossaryHub";
import { GlossaryJsonLd } from "@/components/glossary/GlossaryJsonLd";
import { getGlossaryHub } from "@/lib/sanity";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Food & Nutrition Glossary | 100+ Terms Explained | ${SITE_NAME}`,
  description:
    "Comprehensive glossary of food and nutrition terms. Clear definitions for macronutrients, gut health, organic food, food systems, and more. A-Z reference guide.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function GlossaryPage() {
  const { terms, categories, totalCount } = await getGlossaryHub();

  // Group terms by letter
  const grouped = terms.reduce(
    (acc, term) => {
      const letter = term.letter;
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(term);
      return acc;
    },
    {} as Record<string, typeof terms>
  );

  return (
    <>
      <GlossaryJsonLd terms={terms} />

      {/* Hero — scientific register (layout: data-brand-mode="scientific") */}
      <Section
        background="green"
        padding="lg"
        className="border-b border-[var(--color-sage)]/25"
      >
        <div className="max-w-4xl mx-auto text-center">
          <nav
            className="text-sm text-[var(--color-support)] mb-4"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[var(--color-trust-blue)] underline-offset-2 hover:underline"
            >
              Home
            </Link>
            <span className="mx-2 text-[var(--color-sage)]" aria-hidden>
              /
            </span>
            <Link
              href="/resources"
              className="hover:text-[var(--color-trust-blue)] underline-offset-2 hover:underline"
            >
              Resources
            </Link>
            <span className="mx-2 text-[var(--color-sage)]" aria-hidden>
              /
            </span>
            <span className="font-medium text-[var(--color-primary)]">Glossary</span>
          </nav>

          <SectionHeader
            eyebrow="Food reference"
            title="Food & nutrition glossary"
            description={`Clear definitions for ${totalCount}+ terms—your A–Z guide for labels, nutrition, and food systems.`}
            centered
          />
        </div>
      </Section>

      {/* Hub */}
      <Section
        background="white"
        padding="lg"
        className="bg-[color-mix(in_srgb,var(--color-trust-blue)_3.5%,var(--neutral-50))]"
      >
        <div className="max-w-7xl mx-auto">
          {terms.length > 0 ? (
            <GlossaryHub groupedTerms={grouped} />
          ) : (
            <div className="text-center py-12 max-w-lg mx-auto">
              <p className="text-[length:var(--size-subheading)] font-display font-semibold text-[var(--color-primary)] mb-3">
                No terms yet
              </p>
              <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)]">
                We&apos;re building a comprehensive food and nutrition glossary—check
                back soon.
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
