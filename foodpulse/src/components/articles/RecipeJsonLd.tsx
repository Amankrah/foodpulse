import type { RecipeData } from "@/lib/sanity/types";
import { urlFor } from "@/sanity/image";

interface RecipeJsonLdProps {
  title: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  recipe: RecipeData;
  url: string;
}

export function RecipeJsonLd({
  title,
  description,
  image,
  author,
  datePublished,
  recipe,
  url,
}: RecipeJsonLdProps) {
  // Flatten all ingredients into a single array
  const ingredients =
    recipe.ingredientGroups?.flatMap((group) =>
      group.ingredients.map((ing) =>
        [
          ing.amount,
          ing.unit,
          ing.ingredient,
          ing.notes ? `(${ing.notes})` : "",
        ]
          .filter(Boolean)
          .join(" ")
          .trim()
      )
    ) || [];

  // Convert instructions to HowToStep format
  const instructions =
    recipe.instructions?.map((inst, index) => {
      const step: any = {
        "@type": "HowToStep",
        position: index + 1,
        text: inst.step,
      };

      // Add image if present
      if (inst.image) {
        const imageUrl = urlFor(inst.image)?.url();
        if (imageUrl) {
          step.image = {
            "@type": "ImageObject",
            url: imageUrl,
          };
        }
      }

      // Add tip if present
      if (inst.tip) {
        step.tip = inst.tip;
      }

      return step;
    }) || [];

  // Calculate total time in ISO 8601 duration format
  const totalMinutes =
    recipe.prepTime + (recipe.cookTime || 0) + (recipe.restingTime || 0);
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `PT${hours > 0 ? `${hours}H` : ""}${mins > 0 ? `${mins}M` : ""}`;
  };

  // Map diet values to schema.org URLs
  const dietMap: Record<string, string> = {
    vegetarian: "https://schema.org/VegetarianDiet",
    vegan: "https://schema.org/VeganDiet",
    "gluten-free": "https://schema.org/GlutenFreeDiet",
    "dairy-free": "https://schema.org/DairyFreeDiet",
    "low-carb": "https://schema.org/LowCalorieDiet",
    keto: "https://schema.org/LowCarbDiet",
    paleo: "https://schema.org/LowCarbDiet",
    "nut-free": "https://schema.org/GlutenFreeDiet",
  };

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: title,
    description: description,
    image: image,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: datePublished,
    prepTime: formatDuration(recipe.prepTime),
    totalTime: formatDuration(totalMinutes),
    recipeYield: recipe.yield || `${recipe.servings} servings`,
    recipeIngredient: ingredients,
    recipeInstructions: instructions,
    url: url,
  };

  // Add optional fields
  if (recipe.cookTime) {
    schema.cookTime = formatDuration(recipe.cookTime);
  }

  if (recipe.course) {
    schema.recipeCategory = recipe.course;
  }

  if (recipe.cuisine) {
    schema.recipeCuisine = recipe.cuisine;
  }

  if (recipe.diet && recipe.diet.length > 0) {
    schema.suitableForDiet = recipe.diet.map(
      (d) => dietMap[d] || `${d} diet`
    );
  }

  if (recipe.nutrition) {
    const nutrition: any = {
      "@type": "NutritionInformation",
    };

    if (recipe.nutrition.calories) {
      nutrition.calories = `${recipe.nutrition.calories} calories`;
    }
    if (recipe.nutrition.protein) {
      nutrition.proteinContent = recipe.nutrition.protein;
    }
    if (recipe.nutrition.carbohydrates) {
      nutrition.carbohydrateContent = recipe.nutrition.carbohydrates;
    }
    if (recipe.nutrition.fat) {
      nutrition.fatContent = recipe.nutrition.fat;
    }
    if (recipe.nutrition.fiber) {
      nutrition.fiberContent = recipe.nutrition.fiber;
    }
    if (recipe.nutrition.sugar) {
      nutrition.sugarContent = recipe.nutrition.sugar;
    }
    if (recipe.nutrition.sodium) {
      nutrition.sodiumContent = recipe.nutrition.sodium;
    }

    schema.nutrition = nutrition;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
