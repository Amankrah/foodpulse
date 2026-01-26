import Image from "next/image";
import { Clock, User, Calendar, Download, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/image";
import type { Guide } from "@/lib/sanity/types";

interface GuideHeroProps {
  guide: Guide;
  className?: string;
}

const categoryLabels: Record<string, string> = {
  nutrition: "Nutrition Basics",
  "meal-planning": "Meal Planning",
  "food-labels": "Food Labels",
  "healthy-eating": "Healthy Eating",
  "food-systems": "Food Systems",
  tools: "Tools & Calculators",
};

const difficultyColors = {
  beginner: "bg-green-100 text-green-700 border-green-200",
  intermediate: "bg-blue-100 text-blue-700 border-blue-200",
  advanced: "bg-purple-100 text-purple-700 border-purple-200",
};

const accessLabels = {
  free: "Free",
  "email-gated": "Free Download",
  paid: "Premium",
};

const accessColors = {
  free: "bg-green-100 text-green-700 border-green-200",
  "email-gated": "bg-blue-100 text-blue-700 border-blue-200",
  paid: "bg-amber-100 text-amber-700 border-amber-200",
};

export function GuideHero({ guide, className }: GuideHeroProps) {
  const imageUrl = guide.featuredImage
    ? urlFor(guide.featuredImage)?.width(1200).height(600).url()
    : null;

  return (
    <div className={cn("bg-gradient-to-b from-green-50 to-white", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
            {categoryLabels[guide.category] || guide.category}
          </span>
          {guide.difficulty && (
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
                difficultyColors[guide.difficulty]
              )}
            >
              {guide.difficulty.charAt(0).toUpperCase() +
                guide.difficulty.slice(1)}
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
              accessColors[guide.accessType]
            )}
          >
            {accessLabels[guide.accessType]}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
          {guide.title}
        </h1>

        {/* Subtitle */}
        {guide.subtitle && (
          <p className="text-xl text-neutral-600 mb-6">{guide.subtitle}</p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-8 pb-8 border-b border-neutral-200">
          {guide.readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{guide.readingTime} min read</span>
            </div>
          )}
          {guide.author && (
            <>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{guide.author.name}</span>
              </div>
            </>
          )}
          {guide.publishedAt && (
            <>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </>
          )}
        </div>

        {/* What You'll Learn */}
        {guide.whatYoullLearn && guide.whatYoullLearn.length > 0 && (
          <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              What You'll Learn
            </h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {guide.whatYoullLearn.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {guide.downloadUrl && guide.accessType === "free" && (
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          )}
          {guide.accessType === "email-gated" && (
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              Get Free Guide
            </a>
          )}
          {guide.accessType === "paid" && guide.purchaseLink && (
            <a
              href={guide.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-colors"
            >
              Get Guide - ${guide.price}
            </a>
          )}
          <a
            href="#content"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 font-medium transition-colors"
          >
            Jump to Guide
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>

        {/* Featured Image */}
        {imageUrl && (
          <div className="relative aspect-[2/1] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={guide.featuredImage?.alt || guide.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
