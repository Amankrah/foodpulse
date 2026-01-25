import type { Metadata } from "next";
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

      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="text-sm text-neutral-600 mb-4">
            <a href="/" className="hover:text-green-700">
              Home
            </a>
            <span className="mx-2">&gt;</span>
            <a href="/resources" className="hover:text-green-700">
              Resources
            </a>
            <span className="mx-2">&gt;</span>
            <span>Glossary</span>
          </nav>

          <SectionHeader
            title="Food & Nutrition Glossary"
            description={`Clear definitions for ${totalCount}+ food and nutrition terms. Your A-Z reference guide.`}
            centered
          />
        </div>
      </Section>

      {/* Glossary Content */}
      <Section background="white" padding="lg">
        <div className="max-w-7xl mx-auto">
          {terms.length > 0 ? (
            <GlossaryHub
              groupedTerms={grouped}
              categories={categories}
              totalCount={totalCount}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-neutral-600 mb-6">
                No glossary terms available yet. Check back soon!
              </p>
              <p className="text-neutral-500">
                We're building a comprehensive food and nutrition glossary.
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
