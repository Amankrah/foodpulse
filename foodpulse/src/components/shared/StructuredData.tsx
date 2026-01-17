import { SITE_NAME, SITE_URL, SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import type { Article, Recipe } from "@/types";

interface StructuredDataProps {
  type: "organization" | "website" | "article" | "recipe" | "breadcrumbs";
  data?: any;
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
        schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          image: article.image.src,
          author: {
            "@type": "Organization",
            name: SITE_NAME,
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
            "@id": `${SITE_URL}/articles/${article.category}/${article.slug}`,
          },
        };
      }
      break;

    case "recipe":
      if (data as Recipe) {
        const recipe = data as Recipe;
        schema = {
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: recipe.title,
          description: recipe.excerpt,
          image: [recipe.image.src],
          author: {
            "@type": "Organization",
            name: SITE_NAME,
          },
          datePublished: recipe.publishedAt,
          prepTime: `PT${recipe.recipe.prepTime}M`,
          cookTime: `PT${recipe.recipe.cookTime}M`,
          totalTime: `PT${recipe.recipe.totalTime}M`,
          recipeYield: `${recipe.recipe.servings} servings`,
          recipeCuisine: recipe.recipe.cuisine,
          recipeCategory: "Main Course",
          nutrition: recipe.recipe.nutrition
            ? {
                "@type": "NutritionInformation",
                calories: `${recipe.recipe.nutrition.calories} calories`,
                proteinContent: `${recipe.recipe.nutrition.protein}g`,
                carbohydrateContent: `${recipe.recipe.nutrition.carbs}g`,
                fatContent: `${recipe.recipe.nutrition.fat}g`,
                fiberContent: recipe.recipe.nutrition.fiber
                  ? `${recipe.recipe.nutrition.fiber}g`
                  : undefined,
              }
            : undefined,
          recipeIngredient: recipe.recipe.ingredients.map((ing) =>
            ing.amount ? `${ing.amount} ${ing.item}` : ing.item
          ),
          recipeInstructions: recipe.recipe.instructions.map((inst) => ({
            "@type": "HowToStep",
            text: inst.instruction,
            image: inst.image,
          })),
        };
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
