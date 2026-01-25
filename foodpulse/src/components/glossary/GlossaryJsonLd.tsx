import type { GlossaryTermListItem } from "@/lib/sanity/types";

interface GlossaryJsonLdProps {
  terms: GlossaryTermListItem[];
}

export function GlossaryJsonLd({ terms }: GlossaryJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FoodPulse Food & Nutrition Glossary",
    description: "Comprehensive glossary of food and nutrition terms",
    numberOfItems: terms.length,
    itemListElement: terms.map((term, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: term.term,
      url: `https://foodpulse.co/resources/glossary/${term.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
