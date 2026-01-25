# RecipeCard Component Audit & Improvements

## Comprehensive Review for FoodPulse

**Component:** `RecipeCard.tsx`  
**Lines:** 482  
**Last Reviewed:** January 2025

---

# Current State Analysis

## What's Working Well ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Visual Design | ✅ Good | Clean, hierarchical, branded |
| Responsive Layout | ✅ Good | Grid adapts to screen size |
| Print Support | ✅ Basic | Hides buttons, basic support |
| Download Feature | ✅ Good | Generates .txt file |
| Conditional Rendering | ✅ Good | Handles optional fields |
| Difficulty Badges | ✅ Good | Color-coded |
| Step Numbering | ✅ Good | Clear visual hierarchy |
| Tip Callouts | ✅ Good | Yellow highlight boxes |
| Nutrition Grid | ✅ Good | Responsive cards |

## Issues Found ⚠️

### Critical Issues (Impact: SEO & Discoverability)

| Issue | Impact | Priority |
|-------|--------|----------|
| **No JSON-LD Schema** | Recipe rich results won't appear in Google | 🔴 Critical |
| **Generic H2 heading** | "Recipe Details" isn't semantic | 🔴 High |
| **No structured data** | AI/LLMs can't parse recipe data | 🔴 High |

### Accessibility Issues

| Issue | WCAG | Priority |
|-------|------|----------|
| Icon buttons missing aria-labels | 2.1.1 | 🟡 Medium |
| No skip link to recipe sections | 2.4.1 | 🟡 Medium |
| Ingredient checkboxes not interactive | 1.3.1 | 🟢 Low |
| Color alone indicates difficulty | 1.4.1 | 🟢 Low |

### UX Improvements

| Issue | Impact | Priority |
|-------|--------|----------|
| No "Jump to Recipe" button | Users must scroll | 🟡 Medium |
| No ingredient checkboxes | Can't track progress | 🟡 Medium |
| No servings adjuster | Can't scale recipe | 🟢 Low |
| No copy ingredients button | Inconvenient | 🟢 Low |
| Long scroll on mobile | Navigation difficult | 🟢 Low |

### Code Quality

| Issue | Impact | Priority |
|-------|--------|----------|
| Repetitive nutrition rendering | Maintainability | 🟢 Low |
| No error boundary | Resilience | 🟢 Low |
| Missing TypeScript strictness | Type safety | 🟢 Low |

---

# Recommended Improvements

## 1. Add JSON-LD Recipe Schema (Critical)

This is the #1 priority. Without it, your recipes won't show rich results in Google.

### Schema Component

```tsx
// components/RecipeJsonLd.tsx
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
  const ingredients = recipe.ingredientGroups?.flatMap((group) =>
    group.ingredients.map((ing) =>
      [ing.amount, ing.unit, ing.ingredient, ing.notes ? `(${ing.notes})` : '']
        .filter(Boolean)
        .join(' ')
        .trim()
    )
  ) || [];

  // Convert instructions to HowToStep format
  const instructions = recipe.instructions?.map((inst, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    text: inst.step,
    ...(inst.image && {
      image: {
        '@type': 'ImageObject',
        url: inst.image, // You'll need to resolve this URL
      },
    }),
    ...(inst.tip && {
      tip: inst.tip,
    }),
  })) || [];

  // Calculate total time in ISO 8601 duration format
  const totalMinutes = recipe.prepTime + (recipe.cookTime || 0) + (recipe.restingTime || 0);
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `PT${hours > 0 ? `${hours}H` : ''}${mins > 0 ? `${mins}M` : ''}`;
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    description: description,
    image: image,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: datePublished,
    prepTime: formatDuration(recipe.prepTime),
    ...(recipe.cookTime && { cookTime: formatDuration(recipe.cookTime) }),
    totalTime: formatDuration(totalMinutes),
    recipeYield: recipe.yield || `${recipe.servings} servings`,
    recipeCategory: recipe.course,
    recipeCuisine: recipe.cuisine,
    ...(recipe.diet && recipe.diet.length > 0 && {
      suitableForDiet: recipe.diet.map((d) => {
        const dietMap: Record<string, string> = {
          vegetarian: 'https://schema.org/VegetarianDiet',
          vegan: 'https://schema.org/VeganDiet',
          'gluten-free': 'https://schema.org/GlutenFreeDiet',
          'dairy-free': 'https://schema.org/DairyFreeDiet',
          'low-carb': 'https://schema.org/LowCalorieDiet',
          keto: 'https://schema.org/LowCarbDiet',
        };
        return dietMap[d] || d;
      }),
    }),
    recipeIngredient: ingredients,
    recipeInstructions: instructions,
    ...(recipe.nutrition && {
      nutrition: {
        '@type': 'NutritionInformation',
        ...(recipe.nutrition.calories && { calories: `${recipe.nutrition.calories} calories` }),
        ...(recipe.nutrition.protein && { proteinContent: recipe.nutrition.protein }),
        ...(recipe.nutrition.carbohydrates && { carbohydrateContent: recipe.nutrition.carbohydrates }),
        ...(recipe.nutrition.fat && { fatContent: recipe.nutrition.fat }),
        ...(recipe.nutrition.fiber && { fiberContent: recipe.nutrition.fiber }),
        ...(recipe.nutrition.sugar && { sugarContent: recipe.nutrition.sugar }),
        ...(recipe.nutrition.sodium && { sodiumContent: recipe.nutrition.sodium }),
      },
    }),
    url: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Usage in RecipeCard

```tsx
// At the top of RecipeCard, add the schema
export function RecipeCard({ recipe, title, description, image, author, datePublished, url }: RecipeCardProps) {
  return (
    <>
      <RecipeJsonLd
        title={title || 'Recipe'}
        description={description || ''}
        image={image}
        author={author}
        datePublished={datePublished}
        recipe={recipe}
        url={url}
      />
      <div className="my-8 bg-gradient-to-br ...">
        {/* Rest of component */}
      </div>
    </>
  );
}
```

---

## 2. Add Jump to Recipe Button

Users on food sites expect to skip the intro and jump straight to the recipe.

```tsx
// Add this just below the article intro, before the recipe card
function JumpToRecipeButton() {
  const scrollToRecipe = () => {
    const recipeCard = document.getElementById('recipe-card');
    if (recipeCard) {
      recipeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      onClick={scrollToRecipe}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
    >
      <ChefHat className="w-4 h-4" />
      Jump to Recipe
    </button>
  );
}

// Add id to the main recipe container
<div
  id="recipe-card"
  className="my-8 bg-gradient-to-br from-green-50 to-green-100 ..."
>
```

---

## 3. Add Interactive Ingredient Checkboxes

This is a highly requested feature on recipe sites.

```tsx
'use client';

import { useState } from 'react';

// Inside RecipeCard component
const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

const toggleIngredient = (id: string) => {
  setCheckedIngredients((prev) => {
    const next = new Set(prev);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  });
};

// In the ingredients section
<ul className="bg-white rounded-xl p-5 shadow-sm border border-green-100 space-y-3">
  {group.ingredients.map((ingredient, index) => {
    const ingredientId = `${groupIndex}-${index}`;
    const isChecked = checkedIngredients.has(ingredientId);
    
    return (
      <li key={index} className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => toggleIngredient(ingredientId)}
          className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 transition-colors ${
            isChecked
              ? 'bg-green-600 border-green-600'
              : 'border-neutral-300 hover:border-green-400'
          }`}
          aria-label={`Mark ${ingredient.ingredient} as ${isChecked ? 'not gathered' : 'gathered'}`}
        >
          {isChecked && (
            <svg className="w-full h-full text-white" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              />
            </svg>
          )}
        </button>
        <span
          className={`text-neutral-700 leading-relaxed transition-opacity ${
            isChecked ? 'opacity-50 line-through' : ''
          }`}
        >
          {/* ingredient content */}
        </span>
      </li>
    );
  })}
</ul>
```

---

## 4. Improve Accessibility

### Add aria-labels to icon buttons

```tsx
// Before
<button
  type="button"
  onClick={handlePrint}
  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
  title="Print recipe"
>
  <Printer className="h-5 w-5" />
</button>

// After
<button
  type="button"
  onClick={handlePrint}
  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
  aria-label="Print recipe"
>
  <Printer className="h-5 w-5" aria-hidden="true" />
</button>
```

### Add skip links

```tsx
// At the very top of the recipe card, visually hidden but keyboard accessible
<div className="sr-only focus-within:not-sr-only">
  <a
    href="#ingredients"
    className="absolute left-4 top-4 z-50 bg-green-600 text-white px-4 py-2 rounded"
  >
    Skip to ingredients
  </a>
  <a
    href="#instructions"
    className="absolute left-4 top-4 z-50 bg-green-600 text-white px-4 py-2 rounded"
  >
    Skip to instructions
  </a>
</div>

// Add IDs to sections
<div id="ingredients" className="mb-8">
  <h3>Ingredients</h3>
  ...
</div>

<div id="instructions" className="mb-8">
  <h3>Instructions</h3>
  ...
</div>
```

### Improve heading semantics

```tsx
// Instead of generic "Recipe Details"
<h2 className="text-2xl md:text-3xl font-bold">
  {title ? `${title} Recipe` : 'Recipe Details'}
</h2>
```

---

## 5. Add Servings Adjuster (Optional Enhancement)

```tsx
const [servingMultiplier, setServingMultiplier] = useState(1);
const originalServings = recipe.servings;
const adjustedServings = originalServings * servingMultiplier;

// Helper to scale ingredient amounts
const scaleAmount = (amount: string | undefined) => {
  if (!amount) return '';
  const num = parseFloat(amount);
  if (isNaN(num)) return amount; // Return as-is if not a number
  const scaled = num * servingMultiplier;
  // Handle fractions nicely
  if (scaled === Math.floor(scaled)) return scaled.toString();
  return scaled.toFixed(1).replace(/\.0$/, '');
};

// Servings adjuster UI
<div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
  <div className="flex items-center gap-2 mb-1">
    <Users className="h-4 w-4 text-green-600" />
    <p className="text-xs font-medium text-neutral-500 uppercase">Serves</p>
  </div>
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => setServingMultiplier((m) => Math.max(0.5, m - 0.5))}
      className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full hover:bg-green-200 font-bold"
      aria-label="Decrease servings"
    >
      −
    </button>
    <p className="text-lg font-bold text-neutral-900 min-w-[3ch] text-center">
      {adjustedServings}
    </p>
    <button
      type="button"
      onClick={() => setServingMultiplier((m) => m + 0.5)}
      className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full hover:bg-green-200 font-bold"
      aria-label="Increase servings"
    >
      +
    </button>
  </div>
  {servingMultiplier !== 1 && (
    <button
      type="button"
      onClick={() => setServingMultiplier(1)}
      className="text-xs text-green-600 mt-1 hover:underline"
    >
      Reset to original
    </button>
  )}
</div>

// Then in ingredients, use scaleAmount()
<strong className="text-neutral-900">
  {scaleAmount(ingredient.amount)}
</strong>
```

---

## 6. Add Copy Ingredients Button

```tsx
const copyIngredientsToClipboard = () => {
  const ingredientText = recipe.ingredientGroups
    ?.map((group) => {
      const header = group.groupName ? `${group.groupName}:\n` : '';
      const items = group.ingredients
        .map((ing) =>
          [ing.amount, ing.unit, ing.ingredient, ing.notes ? `(${ing.notes})` : '']
            .filter(Boolean)
            .join(' ')
        )
        .join('\n');
      return header + items;
    })
    .join('\n\n');

  if (ingredientText) {
    navigator.clipboard.writeText(ingredientText);
    // Show toast notification
  }
};

// Add button near ingredients heading
<div className="flex items-center justify-between mb-4">
  <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
    <span className="w-1 h-8 bg-green-600 rounded"></span>
    Ingredients
  </h3>
  <button
    type="button"
    onClick={copyIngredientsToClipboard}
    className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
    aria-label="Copy ingredients to clipboard"
  >
    <Copy className="w-4 h-4" />
    Copy
  </button>
</div>
```

---

## 7. Improve Print Styles

```tsx
// Add more comprehensive print styles
<div className="my-8 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl shadow-lg overflow-hidden 
  print:shadow-none print:border print:border-neutral-300 print:bg-white print:rounded-none">

// In globals.css or as a style tag
@media print {
  /* Hide non-essential elements */
  .print\\:hidden {
    display: none !important;
  }
  
  /* Reset backgrounds for printing */
  .bg-gradient-to-br,
  .bg-green-50,
  .bg-green-100,
  .bg-green-600 {
    background: white !important;
    color: black !important;
  }
  
  /* Ensure text is black */
  h2, h3, p, li, span {
    color: black !important;
  }
  
  /* Keep badges visible but simplified */
  .rounded-full {
    border: 1px solid #ccc !important;
    background: white !important;
  }
  
  /* Optimize layout for paper */
  .grid {
    display: block !important;
  }
  
  /* Avoid page breaks inside sections */
  .mb-8 {
    page-break-inside: avoid;
  }
  
  /* Page margins */
  @page {
    margin: 1.5cm;
  }
}
```

---

## 8. DRY Up Nutrition Cards

```tsx
// Extract nutrition card to a reusable component
interface NutritionCardProps {
  label: string;
  value: string | number;
  isCalories?: boolean;
}

function NutritionCard({ label, value, isCalories }: NutritionCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
      <p className="text-xs text-neutral-500 uppercase mb-1">{label}</p>
      <p className={`font-bold ${isCalories ? 'text-xl text-green-700' : 'text-lg text-neutral-900'}`}>
        {value}
      </p>
    </div>
  );
}

// Usage
const nutritionFields = [
  { key: 'calories', label: 'Calories', isCalories: true },
  { key: 'protein', label: 'Protein' },
  { key: 'carbohydrates', label: 'Carbs' },
  { key: 'fat', label: 'Fat' },
  { key: 'fiber', label: 'Fiber' },
  { key: 'sugar', label: 'Sugar' },
  { key: 'sodium', label: 'Sodium' },
] as const;

// In render
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
  {nutritionFields.map(({ key, label, isCalories }) => {
    const value = recipe.nutrition?.[key];
    if (!value) return null;
    return (
      <NutritionCard
        key={key}
        label={label}
        value={value}
        isCalories={isCalories}
      />
    );
  })}
</div>
```

---

## 9. Update TypeScript Interface

```tsx
// Update the props interface to include all needed data for schema
interface RecipeCardProps {
  recipe: RecipeData;
  title: string;
  description?: string;
  image?: string;
  author?: {
    name: string;
    url?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  url?: string;
}
```

---

# Complete Improved Component

Here's how the improved component structure should look:

```tsx
"use client";

import type { RecipeData } from "@/lib/sanity/types";
import { Clock, Users, ChefHat, Download, Printer, Copy, Check } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { useState } from "react";
import { RecipeJsonLd } from "./RecipeJsonLd";

interface RecipeCardProps {
  recipe: RecipeData;
  title: string;
  description?: string;
  image?: string;
  author?: { name: string };
  publishedAt?: string;
  url?: string;
}

const difficultyConfig = {
  easy: { color: "bg-green-100 text-green-700 border-green-300", label: "Easy" },
  medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-300", label: "Medium" },
  hard: { color: "bg-red-100 text-red-700 border-red-300", label: "Hard" },
};

export function RecipeCard({
  recipe,
  title,
  description,
  image,
  author,
  publishedAt,
  url,
}: RecipeCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [copiedIngredients, setCopiedIngredients] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState(1);

  const totalTime =
    recipe.prepTime + (recipe.cookTime || 0) + (recipe.restingTime || 0);
  const adjustedServings = recipe.servings * servingMultiplier;

  // Scale ingredient amounts based on serving multiplier
  const scaleAmount = (amount: string | undefined) => {
    if (!amount || servingMultiplier === 1) return amount;
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const scaled = num * servingMultiplier;
    return scaled === Math.floor(scaled) ? scaled.toString() : scaled.toFixed(1);
  };

  // Toggle ingredient checkbox
  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Copy ingredients to clipboard
  const copyIngredients = async () => {
    const text = recipe.ingredientGroups
      ?.map((group) => {
        const header = group.groupName ? `${group.groupName}:\n` : "";
        const items = group.ingredients
          .map((ing) =>
            [scaleAmount(ing.amount), ing.unit, ing.ingredient, ing.notes && `(${ing.notes})`]
              .filter(Boolean)
              .join(" ")
          )
          .join("\n");
        return header + items;
      })
      .join("\n\n");

    if (text) {
      await navigator.clipboard.writeText(text);
      setCopiedIngredients(true);
      setTimeout(() => setCopiedIngredients(false), 2000);
    }
  };

  // Download recipe as text file
  const handleDownload = () => {
    // ... existing download logic
  };

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <RecipeJsonLd
        title={title}
        description={description || ""}
        image={image || ""}
        author={author?.name || "FoodPulse Team"}
        datePublished={publishedAt || ""}
        recipe={recipe}
        url={url || ""}
      />

      {/* Skip Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:z-50">
        <a
          href="#ingredients"
          className="bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2"
        >
          Skip to ingredients
        </a>
        <a
          href="#instructions"
          className="bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 ml-2"
        >
          Skip to instructions
        </a>
      </div>

      <div
        id="recipe-card"
        className="my-8 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl shadow-lg overflow-hidden print:shadow-none print:border print:border-neutral-300 print:bg-white"
      >
        {/* Header */}
        <div className="bg-green-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <ChefHat className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {title} Recipe
              </h2>
            </div>
            <div className="flex gap-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                aria-label="Print recipe"
              >
                <Printer className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50"
                aria-label="Download recipe"
              >
                <Download
                  className={`h-5 w-5 ${isDownloading ? "animate-bounce" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Quick Info Cards with Servings Adjuster */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {/* Prep Time */}
            <QuickInfoCard icon={Clock} label="Prep" value={`${recipe.prepTime} min`} />
            
            {/* Cook Time (if exists) */}
            {recipe.cookTime && recipe.cookTime > 0 && (
              <QuickInfoCard icon={Clock} label="Cook" value={`${recipe.cookTime} min`} />
            )}
            
            {/* Total Time */}
            <QuickInfoCard icon={Clock} label="Total" value={`${totalTime} min`} />
            
            {/* Servings with Adjuster */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-green-600" aria-hidden="true" />
                <p className="text-xs font-medium text-neutral-500 uppercase">Serves</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setServingMultiplier((m) => Math.max(0.5, m - 0.5))}
                  className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-700 rounded-full hover:bg-green-200 font-bold text-sm print:hidden"
                  aria-label="Decrease servings"
                >
                  −
                </button>
                <p className="text-lg font-bold text-neutral-900 min-w-[2ch] text-center">
                  {adjustedServings}
                </p>
                <button
                  type="button"
                  onClick={() => setServingMultiplier((m) => m + 0.5)}
                  className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-700 rounded-full hover:bg-green-200 font-bold text-sm print:hidden"
                  aria-label="Increase servings"
                >
                  +
                </button>
              </div>
              {servingMultiplier !== 1 && (
                <button
                  type="button"
                  onClick={() => setServingMultiplier(1)}
                  className="text-xs text-green-600 mt-1 hover:underline print:hidden"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Meta Tags (difficulty, cuisine, diet, etc.) */}
          {/* ... existing meta tags code ... */}

          {/* Ingredients Section */}
          {recipe.ingredientGroups && recipe.ingredientGroups.length > 0 && (
            <div id="ingredients" className="mb-8 scroll-mt-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                  <span className="w-1 h-8 bg-green-600 rounded" aria-hidden="true"></span>
                  Ingredients
                  {servingMultiplier !== 1 && (
                    <span className="text-sm font-normal text-green-600">
                      (adjusted for {adjustedServings} servings)
                    </span>
                  )}
                </h3>
                <button
                  type="button"
                  onClick={copyIngredients}
                  className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1 print:hidden"
                  aria-label="Copy ingredients to clipboard"
                >
                  {copiedIngredients ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Ingredient groups with checkboxes */}
              <div className="space-y-4">
                {recipe.ingredientGroups.map((group, groupIndex) => (
                  <div key={groupIndex}>
                    {group.groupName && (
                      <h4 className="font-bold text-lg text-green-800 mb-3 mt-4">
                        {group.groupName}
                      </h4>
                    )}
                    <ul className="bg-white rounded-xl p-5 shadow-sm border border-green-100 space-y-3">
                      {group.ingredients.map((ingredient, index) => {
                        const ingredientId = `${groupIndex}-${index}`;
                        const isChecked = checkedIngredients.has(ingredientId);

                        return (
                          <li key={index} className="flex items-start gap-3">
                            <button
                              type="button"
                              onClick={() => toggleIngredient(ingredientId)}
                              className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 transition-colors print:hidden ${
                                isChecked
                                  ? "bg-green-600 border-green-600"
                                  : "border-neutral-300 hover:border-green-400"
                              }`}
                              aria-label={`Mark ${ingredient.ingredient} as ${isChecked ? "not gathered" : "gathered"}`}
                            >
                              {isChecked && (
                                <Check className="w-full h-full text-white p-0.5" aria-hidden="true" />
                              )}
                            </button>
                            <span
                              className={`text-neutral-700 leading-relaxed transition-opacity ${
                                isChecked ? "opacity-50 line-through" : ""
                              }`}
                            >
                              {ingredient.amount && (
                                <strong className="text-neutral-900">
                                  {scaleAmount(ingredient.amount)}
                                </strong>
                              )}
                              {ingredient.unit && <> {ingredient.unit}</>}
                              {(ingredient.amount || ingredient.unit) && <> </>}
                              <span className="text-neutral-900">{ingredient.ingredient}</span>
                              {ingredient.notes && (
                                <span className="text-neutral-500 text-sm italic">
                                  {" "}({ingredient.notes})
                                </span>
                              )}
                            </span>
                            {/* Print-only bullet */}
                            <span className="hidden print:flex w-2 h-2 bg-green-600 rounded-full mt-2" aria-hidden="true" />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions Section */}
          <div id="instructions" className="mb-8 scroll-mt-20">
            {/* ... existing instructions code with aria improvements ... */}
          </div>

          {/* Nutrition Section */}
          {/* ... existing nutrition code, consider DRYing up ... */}

          {/* Notes Section */}
          {/* ... existing notes code ... */}

          {/* Footer */}
          {/* ... existing footer ... */}
        </div>
      </div>
    </>
  );
}

// Helper component for quick info cards
function QuickInfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-green-600" aria-hidden="true" />
        <p className="text-xs font-medium text-neutral-500 uppercase">{label}</p>
      </div>
      <p className="text-lg font-bold text-neutral-900">{value}</p>
    </div>
  );
}
```

---

# Priority Implementation Order

## Immediate (This Week)
1. ✅ **Add JSON-LD Recipe Schema** — Critical for SEO
2. ✅ **Add aria-labels** to buttons — Accessibility fix
3. ✅ **Update H2 to include recipe title** — SEO improvement

## Short-Term (This Month)
1. ✅ Add ingredient checkboxes
2. ✅ Add servings adjuster
3. ✅ Add copy ingredients button
4. ✅ Add skip links

## Nice-to-Have (Future)
1. Improve print styles
2. Add timer functionality for cook/rest times
3. Add save/bookmark feature
4. Add "I made this" feedback mechanism

---

# Testing Checklist

## Schema Validation
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test with [Schema.org Validator](https://validator.schema.org/)
- [ ] Verify recipe shows in Google Search Console

## Accessibility Testing
- [ ] Test with keyboard navigation
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Verify WCAG 2.1 AA compliance

## Functionality Testing
- [ ] Ingredient checkboxes persist during session
- [ ] Servings adjuster scales amounts correctly
- [ ] Copy button works and shows feedback
- [ ] Download generates correct content
- [ ] Print layout is readable

## Cross-Browser Testing
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Mobile iOS Safari
- [ ] Mobile Chrome

---

**Document Version:** 1.0  
**Created:** January 2025  
**Component:** RecipeCard.tsx
