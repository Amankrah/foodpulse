"use client";

import type { RecipeData } from "@/lib/sanity/types";
import { Clock, Users, ChefHat, Download, Printer } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { useState } from "react";

interface RecipeCardProps {
  recipe: RecipeData;
  title?: string;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-700 border-green-300",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
  hard: "bg-red-100 text-red-700 border-red-300",
};

export function RecipeCard({ recipe, title }: RecipeCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const totalTime =
    recipe.prepTime + (recipe.cookTime || 0) + (recipe.restingTime || 0);

  const handleDownload = () => {
    setIsDownloading(true);

    // Create text content
    let content = `${title || "Recipe"}\n`;
    content += `${"=".repeat(title?.length || 6)}\n\n`;
    content += `From FoodPulse.co\n\n`;

    // Meta information
    content += `RECIPE INFORMATION\n`;
    content += `------------------\n`;
    content += `Prep Time: ${recipe.prepTime} minutes\n`;
    if (recipe.cookTime) content += `Cook Time: ${recipe.cookTime} minutes\n`;
    if (recipe.restingTime)
      content += `Resting Time: ${recipe.restingTime} minutes\n`;
    content += `Total Time: ${totalTime} minutes\n`;
    content += `Servings: ${recipe.servings}\n`;
    if (recipe.yield) content += `Yield: ${recipe.yield}\n`;
    if (recipe.difficulty)
      content += `Difficulty: ${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}\n`;
    if (recipe.cuisine) content += `Cuisine: ${recipe.cuisine}\n`;
    if (recipe.course) content += `Course: ${recipe.course}\n`;
    if (recipe.diet && recipe.diet.length > 0)
      content += `Diet: ${recipe.diet.join(", ")}\n`;
    content += `\n`;

    // Ingredients
    if (recipe.ingredientGroups && recipe.ingredientGroups.length > 0) {
      content += `INGREDIENTS\n`;
      content += `-----------\n`;
      recipe.ingredientGroups.forEach((group) => {
        if (group.groupName) {
          content += `\n${group.groupName}:\n`;
        }
        group.ingredients.forEach((ingredient) => {
          const line = [
            ingredient.amount,
            ingredient.unit,
            ingredient.ingredient,
            ingredient.notes ? `(${ingredient.notes})` : "",
          ]
            .filter(Boolean)
            .join(" ");
          content += `  • ${line}\n`;
        });
      });
      content += `\n`;
    }

    // Instructions
    if (recipe.instructions && recipe.instructions.length > 0) {
      content += `INSTRUCTIONS\n`;
      content += `------------\n`;
      recipe.instructions.forEach((instruction, index) => {
        content += `${index + 1}. ${instruction.step}\n`;
        if (instruction.tip) {
          content += `   TIP: ${instruction.tip}\n`;
        }
        content += `\n`;
      });
    }

    // Nutrition
    if (recipe.nutrition) {
      content += `NUTRITION (per serving)\n`;
      content += `-----------------------\n`;
      if (recipe.nutrition.calories)
        content += `Calories: ${recipe.nutrition.calories}\n`;
      if (recipe.nutrition.protein)
        content += `Protein: ${recipe.nutrition.protein}\n`;
      if (recipe.nutrition.carbohydrates)
        content += `Carbohydrates: ${recipe.nutrition.carbohydrates}\n`;
      if (recipe.nutrition.fat) content += `Fat: ${recipe.nutrition.fat}\n`;
      if (recipe.nutrition.fiber)
        content += `Fiber: ${recipe.nutrition.fiber}\n`;
      if (recipe.nutrition.sugar)
        content += `Sugar: ${recipe.nutrition.sugar}\n`;
      if (recipe.nutrition.sodium)
        content += `Sodium: ${recipe.nutrition.sodium}\n`;
      content += `\n`;
    }

    // Notes
    if (recipe.notes && recipe.notes.length > 0) {
      content += `NOTES\n`;
      content += `-----\n`;
      recipe.notes.forEach((note) => {
        content += `• ${note}\n`;
      });
      content += `\n`;
    }

    content += `\n---\nRecipe from FoodPulse.co\nYour trusted source for food & nutrition insights\n`;

    // Create and download file
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(title || "recipe").toLowerCase().replace(/\s+/g, "-")}-foodpulse.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloading(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="my-8 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl shadow-lg overflow-hidden print:shadow-none print:border print:border-neutral-300">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <ChefHat className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Recipe Details</h2>
          </div>
          <div className="flex gap-2 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Print recipe"
            >
              <Printer className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50"
              title="Download recipe"
            >
              <Download
                className={`h-5 w-5 ${isDownloading ? "animate-bounce" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Recipe Meta - Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-green-600" />
              <p className="text-xs font-medium text-neutral-500 uppercase">
                Prep
              </p>
            </div>
            <p className="text-lg font-bold text-neutral-900">
              {recipe.prepTime} min
            </p>
          </div>

          {recipe.cookTime && recipe.cookTime > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-green-600" />
                <p className="text-xs font-medium text-neutral-500 uppercase">
                  Cook
                </p>
              </div>
              <p className="text-lg font-bold text-neutral-900">
                {recipe.cookTime} min
              </p>
            </div>
          )}

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-green-600" />
              <p className="text-xs font-medium text-neutral-500 uppercase">
                Total
              </p>
            </div>
            <p className="text-lg font-bold text-neutral-900">
              {totalTime} min
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-green-600" />
              <p className="text-xs font-medium text-neutral-500 uppercase">
                Serves
              </p>
            </div>
            <p className="text-lg font-bold text-neutral-900">
              {recipe.servings}
            </p>
          </div>
        </div>

        {/* Additional Meta Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {recipe.difficulty && (
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${difficultyColors[recipe.difficulty]}`}
            >
              {recipe.difficulty.charAt(0).toUpperCase() +
                recipe.difficulty.slice(1)}
            </span>
          )}
          {recipe.yield && (
            <span className="px-4 py-2 bg-white border border-green-200 rounded-full text-sm font-medium text-neutral-700">
              Yields: {recipe.yield}
            </span>
          )}
          {recipe.cuisine && (
            <span className="px-4 py-2 bg-white border border-green-200 rounded-full text-sm font-medium text-neutral-700">
              {recipe.cuisine}
            </span>
          )}
          {recipe.course && (
            <span className="px-4 py-2 bg-white border border-green-200 rounded-full text-sm font-medium text-neutral-700">
              {recipe.course}
            </span>
          )}
          {recipe.diet && recipe.diet.length > 0 && (
            <>
              {recipe.diet.map((d) => (
                <span
                  key={d}
                  className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium"
                >
                  {d}
                </span>
              ))}
            </>
          )}
        </div>

        {/* Ingredients Section */}
        {recipe.ingredientGroups && recipe.ingredientGroups.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-8 bg-green-600 rounded"></span>
              Ingredients
            </h3>
            <div className="space-y-4">
              {recipe.ingredientGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.groupName && (
                    <h4 className="font-bold text-lg text-green-800 mb-3 mt-4">
                      {group.groupName}
                    </h4>
                  )}
                  <ul className="bg-white rounded-xl p-5 shadow-sm border border-green-100 space-y-3">
                    {group.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></span>
                        <span className="text-neutral-700 leading-relaxed">
                          {ingredient.amount && (
                            <strong className="text-neutral-900">
                              {ingredient.amount}
                            </strong>
                          )}
                          {ingredient.unit && <> {ingredient.unit}</>}
                          {(ingredient.amount || ingredient.unit) && <> </>}
                          <span className="text-neutral-900">
                            {ingredient.ingredient}
                          </span>
                          {ingredient.notes && (
                            <span className="text-neutral-500 text-sm italic">
                              {" "}
                              ({ingredient.notes})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions Section */}
        {recipe.instructions && recipe.instructions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-8 bg-green-600 rounded"></span>
              Instructions
            </h3>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {index + 1}
                  </span>
                  <div className="flex-1 pt-1">
                    <p className="text-neutral-800 leading-relaxed mb-3 text-lg">
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
                          <p className="text-sm text-neutral-600 mt-2 px-2 italic">
                            {instruction.image.caption}
                          </p>
                        )}
                      </div>
                    )}
                    {instruction.tip && (
                      <div className="mt-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                        <p className="text-sm text-yellow-900">
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
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-8 bg-green-600 rounded"></span>
                Nutrition Information
                <span className="text-sm font-normal text-neutral-500">
                  (per serving)
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {recipe.nutrition.calories && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Calories
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      {recipe.nutrition.calories}
                    </p>
                  </div>
                )}
                {recipe.nutrition.protein && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Protein
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {recipe.nutrition.protein}
                    </p>
                  </div>
                )}
                {recipe.nutrition.carbohydrates && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Carbs
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {recipe.nutrition.carbohydrates}
                    </p>
                  </div>
                )}
                {recipe.nutrition.fat && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Fat
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {recipe.nutrition.fat}
                    </p>
                  </div>
                )}
                {recipe.nutrition.fiber && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Fiber
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {recipe.nutrition.fiber}
                    </p>
                  </div>
                )}
                {recipe.nutrition.sugar && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Sugar
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {recipe.nutrition.sugar}
                    </p>
                  </div>
                )}
                {recipe.nutrition.sodium && (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Sodium
                    </p>
                    <p className="text-lg font-bold text-neutral-900">
                      {recipe.nutrition.sodium}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Notes Section */}
        {recipe.notes && recipe.notes.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-8 bg-green-600 rounded"></span>
              Chef's Notes
            </h3>
            <ul className="bg-white rounded-xl p-5 shadow-sm border border-green-100 space-y-3">
              {recipe.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-green-600 text-xl">
                    📝
                  </span>
                  <span className="text-neutral-700 leading-relaxed">
                    {note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2 border-green-200 text-center">
          <p className="text-sm text-neutral-600">
            Recipe from{" "}
            <strong className="text-green-700">FoodPulse.co</strong>
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            Your trusted source for food & nutrition insights
          </p>
        </div>
      </div>
    </div>
  );
}
