"use client";

import type { RecipeData } from "@/lib/sanity/types";
import {
  Clock,
  Users,
  ChefHat,
  Download,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { useState, useEffect, useRef } from "react";
import { RecipeJsonLd } from "./RecipeJsonLd";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

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
  easy: {
    color: "bg-green-100 text-green-700 border-green-300",
    label: "Easy",
  },
  medium: {
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    label: "Medium",
  },
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
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set()
  );
  const [copiedIngredients, setCopiedIngredients] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState(1);

  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Total active time (excludes resting/marinating time)
  const totalTime = recipe.prepTime + (recipe.cookTime || 0);
  const adjustedServings = recipe.servings * servingMultiplier;

  // Format time display (shows hours if >= 60 minutes)
  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (mins === 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
      return `${hours} hr${hours > 1 ? 's' : ''} ${mins} min`;
    }
    return `${minutes} min`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadMenuRef.current &&
        !downloadMenuRef.current.contains(event.target as Node)
      ) {
        setShowDownloadMenu(false);
      }
    };

    if (showDownloadMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDownloadMenu]);

  // Scale ingredient amounts based on serving multiplier
  const scaleAmount = (amount: string | undefined) => {
    if (!amount || servingMultiplier === 1) return amount;
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const scaled = num * servingMultiplier;
    return scaled === Math.floor(scaled)
      ? scaled.toString()
      : scaled.toFixed(1).replace(/\.0$/, "");
  };

  // Toggle ingredient checkbox
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

  // Copy ingredients to clipboard
  const copyIngredients = async () => {
    const text = recipe.ingredientGroups
      ?.map((group) => {
        const header = group.groupName ? `${group.groupName}:\n` : "";
        const items = group.ingredients
          .map((ing) =>
            [
              scaleAmount(ing.amount),
              ing.unit,
              ing.ingredient,
              ing.notes && `(${ing.notes})`,
            ]
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

  // Download recipe card as PNG image
  const handleDownloadPNG = async () => {
    setIsDownloading(true);
    setShowDownloadMenu(false);

    try {
      const recipeElement = document.getElementById("recipe-card");
      if (!recipeElement) {
        console.error("Recipe card element not found");
        setIsDownloading(false);
        return;
      }

      // Use html-to-image to capture the recipe card
      const dataUrl = await toPng(recipeElement, {
        backgroundColor: "#f0fdf4",
        pixelRatio: 2, // Higher quality (2x resolution)
        cacheBust: true, // Prevent caching issues
      });

      // Create download link
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-foodpulse.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => setIsDownloading(false), 1000);
    } catch (error) {
      console.error("Error generating recipe image:", error);
      setIsDownloading(false);
    }
  };

  // Download recipe card as PDF
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setShowDownloadMenu(false);

    try {
      const recipeElement = document.getElementById("recipe-card");
      if (!recipeElement) {
        console.error("Recipe card element not found");
        setIsDownloading(false);
        return;
      }

      // Capture the recipe card as image
      const dataUrl = await toPng(recipeElement, {
        backgroundColor: "#f0fdf4",
        pixelRatio: 2,
        cacheBust: true,
      });

      // Get element dimensions
      const imgWidth = recipeElement.offsetWidth;
      const imgHeight = recipeElement.offsetHeight;

      // Create PDF with appropriate dimensions
      // A4 width in mm is 210, we'll use that as reference
      const pdfWidth = 210;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      // Add image to PDF
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Download PDF
      pdf.save(`${title.toLowerCase().replace(/\s+/g, "-")}-foodpulse.pdf`);

      setTimeout(() => setIsDownloading(false), 1000);
    } catch (error) {
      console.error("Error generating recipe PDF:", error);
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      {description && image && author && publishedAt && url && (
        <RecipeJsonLd
          title={title}
          description={description}
          image={image}
          author={recipe.author || author.name}
          datePublished={publishedAt}
          recipe={recipe}
          url={url}
        />
      )}

      {/* Skip Links for Accessibility */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:z-50 focus-within:left-4 focus-within:top-4">
        <a
          href="#ingredients"
          className="bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Skip to ingredients
        </a>
        <a
          href="#instructions"
          className="bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 ml-2"
        >
          Skip to instructions
        </a>
      </div>

      <div
        id="recipe-card"
        className="my-8 bg-gradient-to-br from-[var(--green-50)] to-[var(--green-100)] border-2 border-[var(--green-200)] rounded-2xl shadow-lg overflow-hidden print:shadow-none print:border print:border-neutral-300 print:bg-white"
      >
        {/* Header */}
        <div className="bg-[var(--green-600)] text-white p-6 print:bg-white print:text-black print:border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg print:bg-[var(--green-100)]">
                <ChefHat className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {title} Recipe
              </h2>
            </div>
            <div className="flex gap-2 print:hidden relative">
              <div className="relative" ref={downloadMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  disabled={isDownloading}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 focus:ring-2 focus:ring-[var(--green-400)]"
                  aria-label="Download recipe card"
                >
                  <Download
                    className={`h-5 w-5 ${isDownloading ? "animate-bounce" : ""}`}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium">
                    {isDownloading ? "Downloading..." : "Download"}
                  </span>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>

                {/* Dropdown Menu */}
                {showDownloadMenu && !isDownloading && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[var(--green-200)] overflow-hidden z-10">
                    <button
                      type="button"
                      onClick={handleDownloadPNG}
                      className="w-full px-4 py-3 text-left hover:bg-[var(--green-50)] transition-colors flex items-center gap-3 text-[var(--neutral-700)]"
                    >
                      <Download className="h-4 w-4 text-[var(--green-600)]" />
                      <div>
                        <div className="font-medium text-sm">PNG Image</div>
                        <div className="text-xs text-neutral-500">
                          High quality image
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="w-full px-4 py-3 text-left hover:bg-[var(--green-50)] transition-colors flex items-center gap-3 text-[var(--neutral-700)] border-t border-[var(--green-100)]"
                    >
                      <Download className="h-4 w-4 text-[var(--green-600)]" />
                      <div>
                        <div className="font-medium text-sm">PDF Document</div>
                        <div className="text-xs text-neutral-500">
                          Print-ready format
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Quick Info Cards with Servings Adjuster */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {/* Prep Time */}
            <QuickInfoCard
              icon={Clock}
              label="Prep"
              value={formatTime(recipe.prepTime)}
            />

            {/* Cook Time (always show, 0 is valid for no-cook recipes) */}
            {recipe.cookTime !== undefined && (
              <QuickInfoCard
                icon={Clock}
                label="Cook"
                value={formatTime(recipe.cookTime)}
              />
            )}

            {/* Resting Time (only show if exists and > 0) */}
            {recipe.restingTime && recipe.restingTime > 0 && (
              <QuickInfoCard
                icon={Clock}
                label="Rest"
                value={formatTime(recipe.restingTime)}
              />
            )}

            {/* Total Time */}
            <QuickInfoCard
              icon={Clock}
              label="Total"
              value={formatTime(totalTime)}
            />

            {/* Servings with Adjuster */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--green-100)]">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-[var(--green-600)]" aria-hidden="true" />
                <p className="text-xs font-medium text-neutral-500 uppercase">
                  Serves
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setServingMultiplier((m) => Math.max(0.5, m - 0.5))
                  }
                  className="w-7 h-7 flex items-center justify-center bg-[var(--green-100)] text-[var(--green-700)] rounded-full hover:bg-[var(--green-200)] font-bold text-sm print:hidden"
                  aria-label="Decrease servings"
                >
                  −
                </button>
                <p className="text-lg font-bold text-[var(--neutral-900)] min-w-[2ch] text-center">
                  {adjustedServings}
                </p>
                <button
                  type="button"
                  onClick={() => setServingMultiplier((m) => m + 0.5)}
                  className="w-7 h-7 flex items-center justify-center bg-[var(--green-100)] text-[var(--green-700)] rounded-full hover:bg-[var(--green-200)] font-bold text-sm print:hidden"
                  aria-label="Increase servings"
                >
                  +
                </button>
              </div>
              {servingMultiplier !== 1 && (
                <button
                  type="button"
                  onClick={() => setServingMultiplier(1)}
                  className="text-xs text-[var(--green-600)] mt-1 hover:underline print:hidden"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Recipe Meta Information */}
          <div className="space-y-4 mb-8">
            {/* Difficulty Badge (if exists) */}
            {recipe.difficulty && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Difficulty:
                </span>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${difficultyConfig[recipe.difficulty].color} difficulty`}
                >
                  {difficultyConfig[recipe.difficulty].label}
                </span>
              </div>
            )}

            {/* Recipe Details Row */}
            {(recipe.yield || recipe.cuisine || recipe.course) && (
              <div className="flex flex-wrap gap-4">
                {recipe.yield && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Yield:
                    </span>
                    <span className="px-4 py-2 bg-white border border-[var(--green-200)] rounded-full text-sm font-medium text-[var(--neutral-700)]">
                      {recipe.yield}
                    </span>
                  </div>
                )}
                {recipe.cuisine && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider">
                      Cuisine:
                    </span>
                    <span className="px-4 py-2 bg-white border border-[var(--green-200)] rounded-full text-sm font-medium text-[var(--neutral-700)]">
                      {recipe.cuisine}
                    </span>
                  </div>
                )}
                {recipe.course && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider">
                      Course:
                    </span>
                    <span className="px-4 py-2 bg-white border border-[var(--green-200)] rounded-full text-sm font-medium text-[var(--neutral-700)]">
                      {recipe.course}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Dietary Information Row (only if exists) */}
            {recipe.diet && recipe.diet.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider">
                  Dietary:
                </span>
                {recipe.diet.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1.5 bg-[var(--green-600)] text-white rounded-full text-xs font-medium"
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Ingredients Section */}
          {recipe.ingredientGroups && recipe.ingredientGroups.length > 0 && (
            <div id="ingredients" className="mb-8 scroll-mt-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[var(--neutral-900)] flex items-center gap-2">
                  <span
                    className="w-1 h-8 bg-[var(--green-600)] rounded"
                    aria-hidden="true"
                  ></span>
                  Ingredients
                  {servingMultiplier !== 1 && (
                    <span className="text-sm font-normal text-[var(--green-600)]">
                      (adjusted for {adjustedServings} servings)
                    </span>
                  )}
                </h3>
                <button
                  type="button"
                  onClick={copyIngredients}
                  className="text-sm text-[var(--green-600)] hover:text-[var(--green-700)] flex items-center gap-1 print:hidden"
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
                      <h4 className="font-bold text-lg text-[var(--green-800)] mb-3 mt-4">
                        {group.groupName}
                      </h4>
                    )}
                    <ul className="bg-white rounded-xl p-5 shadow-sm border border-[var(--green-100)] space-y-3">
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
                                  ? "bg-[var(--green-600)] border-[var(--green-600)]"
                                  : "border-[var(--neutral-300)] hover:border-[var(--green-400)]"
                              }`}
                              aria-label={`Mark ${ingredient.ingredient} as ${isChecked ? "not gathered" : "gathered"}`}
                            >
                              {isChecked && (
                                <Check
                                  className="w-full h-full text-white p-0.5"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                            {/* Print-only bullet */}
                            <span
                              className="hidden print:flex w-2 h-2 bg-[var(--green-600)] rounded-full mt-2 flex-shrink-0"
                              aria-hidden="true"
                            />
                            <span
                              className={`text-[var(--neutral-700)] leading-relaxed transition-opacity ${
                                isChecked ? "opacity-50 line-through" : ""
                              }`}
                            >
                              {ingredient.amount && (
                                <strong className="text-[var(--neutral-900)]">
                                  {scaleAmount(ingredient.amount)}
                                </strong>
                              )}
                              {ingredient.unit && <> {ingredient.unit}</>}
                              {(ingredient.amount || ingredient.unit) && <> </>}
                              <span className="text-[var(--neutral-900)]">
                                {ingredient.ingredient}
                              </span>
                              {ingredient.notes && (
                                <span className="text-[var(--neutral-500)] text-sm italic">
                                  {" "}
                                  ({ingredient.notes})
                                </span>
                              )}
                            </span>
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
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div id="instructions" className="mb-8 scroll-mt-20">
              <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-4 flex items-center gap-2">
                <span
                  className="w-1 h-8 bg-[var(--green-600)] rounded"
                  aria-hidden="true"
                ></span>
                Instructions
              </h3>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-[var(--green-600)] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md print:bg-[var(--green-100)] print:text-[var(--green-800)]">
                      {index + 1}
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="text-[var(--neutral-800)] leading-relaxed mb-3 text-lg">
                        {instruction.step}
                      </p>
                      {instruction.image && (
                        <div className="my-4 rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={urlFor(instruction.image)?.url() || ""}
                            alt={instruction.image.alt || `Step ${index + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-auto"
                          />
                          {instruction.image.caption && (
                            <p className="text-sm text-[var(--neutral-600)] mt-2 px-2 italic">
                              {instruction.image.caption}
                            </p>
                          )}
                        </div>
                      )}
                      {instruction.tip && (
                        <div className="mt-3 p-4 bg-[var(--warning-100)] border-l-4 border-[var(--warning-500)] rounded-r-lg">
                          <p className="text-sm text-[var(--warning-600)]">
                            <strong className="font-semibold">💡 Tip:</strong>{" "}
                            {instruction.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Nutrition Section */}
          {recipe.nutrition &&
            Object.values(recipe.nutrition).some((val) => val) && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-4 flex items-center gap-2">
                  <span
                    className="w-1 h-8 bg-[var(--green-600)] rounded"
                    aria-hidden="true"
                  ></span>
                  Nutrition Information
                  <span className="text-sm font-normal text-[var(--neutral-500)]">
                    (per serving)
                  </span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 print:grid-cols-4">
                  {recipe.nutrition.calories && (
                    <NutritionCard
                      label="Calories"
                      value={recipe.nutrition.calories}
                      isCalories
                    />
                  )}
                  {recipe.nutrition.protein && (
                    <NutritionCard
                      label="Protein"
                      value={recipe.nutrition.protein}
                    />
                  )}
                  {recipe.nutrition.carbohydrates && (
                    <NutritionCard
                      label="Carbs"
                      value={recipe.nutrition.carbohydrates}
                    />
                  )}
                  {recipe.nutrition.fat && (
                    <NutritionCard label="Fat" value={recipe.nutrition.fat} />
                  )}
                  {recipe.nutrition.fiber && (
                    <NutritionCard
                      label="Fiber"
                      value={recipe.nutrition.fiber}
                    />
                  )}
                  {recipe.nutrition.sugar && (
                    <NutritionCard
                      label="Sugar"
                      value={recipe.nutrition.sugar}
                    />
                  )}
                  {recipe.nutrition.sodium && (
                    <NutritionCard
                      label="Sodium"
                      value={recipe.nutrition.sodium}
                    />
                  )}
                </div>
              </div>
            )}

          {/* Notes Section */}
          {recipe.notes && recipe.notes.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-[var(--neutral-900)] mb-4 flex items-center gap-2">
                <span
                  className="w-1 h-8 bg-[var(--green-600)] rounded"
                  aria-hidden="true"
                ></span>
                Chef&apos;s Notes
              </h3>
              <ul className="bg-white rounded-xl p-5 shadow-sm border border-[var(--green-100)] space-y-3">
                {recipe.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-[var(--green-600)] text-xl">
                      📝
                    </span>
                    <span className="text-[var(--neutral-700)] leading-relaxed">
                      {note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t-2 border-[var(--green-200)] text-center">
            {recipe.author && (
              <p className="text-sm text-[var(--neutral-700)] mb-2">
                Recipe by{" "}
                <strong className="text-[var(--green-700)]">{recipe.author}</strong>
              </p>
            )}
            <p className="text-sm text-[var(--neutral-600)]">
              From{" "}
              <strong className="text-[var(--green-700)]">FoodPulse.co</strong>
            </p>
            <p className="text-xs text-[var(--neutral-500)] mt-1">
              Your trusted source for food & nutrition insights
            </p>
          </div>
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
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--green-100)]">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-[var(--green-600)]" aria-hidden="true" />
        <p className="text-xs font-medium text-[var(--neutral-500)] uppercase">
          {label}
        </p>
      </div>
      <p className="text-lg font-bold text-[var(--neutral-900)]">{value}</p>
    </div>
  );
}

// Helper component for nutrition cards
function NutritionCard({
  label,
  value,
  isCalories,
}: {
  label: string;
  value: string | number;
  isCalories?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--green-100)] text-center">
      <p className="text-xs text-[var(--neutral-500)] uppercase mb-1">{label}</p>
      <p
        className={`font-bold ${isCalories ? "text-xl text-[var(--green-700)]" : "text-lg text-[var(--neutral-900)]"}`}
      >
        {value}
      </p>
    </div>
  );
}
