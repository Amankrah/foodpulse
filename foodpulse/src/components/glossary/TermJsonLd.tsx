import type { GlossaryTerm } from "@/lib/sanity/types";

interface TermJsonLdProps {
  term: GlossaryTerm;
}

export function TermJsonLd({ term }: TermJsonLdProps) {
  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.shortDefinition,
    url: `https://foodpulse.co/resources/glossary/${term.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "FoodPulse Food & Nutrition Glossary",
      url: "https://foodpulse.co/resources/glossary",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${term.term.toLowerCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: term.shortDefinition,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://foodpulse.co",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://foodpulse.co/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Glossary",
        item: "https://foodpulse.co/resources/glossary",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: term.term,
        item: `https://foodpulse.co/resources/glossary/${term.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
