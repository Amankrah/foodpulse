import { SITE_NAME, SITE_URL, SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import type { Article } from "@/lib/sanity";

interface BreadcrumbItem {
  label: string;
  href: string;
}

type StructuredDataData = Article | BreadcrumbItem[] | undefined;

interface StructuredDataProps {
  type: "organization" | "website" | "article" | "breadcrumbs";
  data?: StructuredDataData;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let schema = {};

  switch (type) {
    case "organization":
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description:
          "Evidence-based food education platform covering nutrition science, food systems, and healthy eating guidance.",
        sameAs: [
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.pinterest,
          SOCIAL_LINKS.youtube,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: CONTACT_EMAIL,
        },
      };
      break;

    case "website":
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };
      break;

    case "article":
      if (data as Article) {
        const article = data as Article;

        // Base article schema
        const articleSchema: Record<string, unknown> = {
          "@context": "https://schema.org",
          "@type": article.isRecipe ? "Recipe" : "Article",
          headline: article.title,
          description: article.excerpt,
          image: article.ogImage || article.image.asset.url,
          author: {
            "@type": "Person",
            name: article.author.name,
            ...(article.author.image && {
              image: article.author.image.asset.url,
            }),
            ...(article.author.role && {
              jobTitle: article.author.role,
            }),
            ...(article.author.credentials && article.author.credentials.length > 0 && {
              hasCredential: article.author.credentials.map(cred => ({
                "@type": "EducationalOccupationalCredential",
                credentialCategory: cred,
              })),
            }),
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/logo.png`,
            },
          },
          datePublished: article.publishedAt,
          dateModified: article.updatedAt || article.publishedAt,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/articles/${article.category.slug}/${article.slug}`,
          },
        };

        // Add review date for E-E-A-T
        if (article.reviewedAt) {
          articleSchema.reviewedBy = {
            "@type": "Person",
            name: article.author.name,
          };
          articleSchema.lastReviewed = article.reviewedAt;
        }

        // Add citations/sources for E-E-A-T
        if (article.sources && article.sources.length > 0) {
          articleSchema.citation = article.sources.map(source => ({
            "@type": "CreativeWork",
            name: source.title,
            url: source.url,
            ...(source.author && { author: { "@type": "Person", name: source.author } }),
          }));
        }

        // Recipe-specific schema
        if (article.isRecipe && article.recipeData) {
          const recipe = article.recipeData;

          articleSchema.prepTime = `PT${recipe.prepTime}M`;
          if (recipe.cookTime) {
            articleSchema.cookTime = `PT${recipe.cookTime}M`;
          }
          const totalTime = recipe.prepTime + (recipe.cookTime || 0) + (recipe.restingTime || 0);
          articleSchema.totalTime = `PT${totalTime}M`;

          articleSchema.recipeYield = recipe.yield || `${recipe.servings} servings`;
          articleSchema.recipeCategory = recipe.course;
          articleSchema.recipeCuisine = recipe.cuisine;

          if (recipe.diet && recipe.diet.length > 0) {
            articleSchema.suitableForDiet = recipe.diet.map(d =>
              `https://schema.org/${d.charAt(0).toUpperCase() + d.slice(1).replace('-', '')}Diet`
            );
          }

          // Ingredients
          if (recipe.ingredientGroups && recipe.ingredientGroups.length > 0) {
            articleSchema.recipeIngredient = recipe.ingredientGroups.flatMap(group =>
              group.ingredients.map(ing => {
                const parts = [ing.amount, ing.unit, ing.ingredient].filter(Boolean);
                return parts.join(' ');
              })
            );
          }

          // Instructions
          if (recipe.instructions && recipe.instructions.length > 0) {
            articleSchema.recipeInstructions = recipe.instructions.map((inst, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              text: inst.step,
              ...(inst.image && { image: inst.image.asset.url }),
            }));
          }

          // Nutrition
          if (recipe.nutrition) {
            articleSchema.nutrition = {
              "@type": "NutritionInformation",
              ...(recipe.nutrition.calories && { calories: `${recipe.nutrition.calories} calories` }),
              ...(recipe.nutrition.protein && { proteinContent: recipe.nutrition.protein }),
              ...(recipe.nutrition.carbohydrates && { carbohydrateContent: recipe.nutrition.carbohydrates }),
              ...(recipe.nutrition.fat && { fatContent: recipe.nutrition.fat }),
              ...(recipe.nutrition.fiber && { fiberContent: recipe.nutrition.fiber }),
            };
          }

          // Keywords/tags
          if (article.tags && article.tags.length > 0) {
            articleSchema.keywords = article.tags.join(', ');
          }
        }

        // FAQ Schema (separate schema)
        const schemas = [articleSchema];

        if (article.faq && article.faq.length > 0) {
          schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faq.map(item => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          });
        }

        schema = schemas.length === 1 ? schemas[0] : schemas;
      }
      break;


    case "breadcrumbs":
      if (data && Array.isArray(data)) {
        schema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `${SITE_URL}${item.href}`,
          })),
        };
      }
      break;
  }

  // Handle multiple schemas (e.g., Article + FAQ)
  if (Array.isArray(schema)) {
    return (
      <>
        {schema.map((s, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </>
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
