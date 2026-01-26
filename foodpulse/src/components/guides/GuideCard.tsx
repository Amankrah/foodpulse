import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/image";
import type { GuideListItem } from "@/lib/sanity/types";

interface GuideCardProps {
  guide: GuideListItem;
  className?: string;
}

const accessIcons = {
  free: null,
  "email-gated": Mail,
  paid: Lock,
};

const accessColors = {
  free: "bg-green-100 text-green-700 border-green-200",
  "email-gated": "bg-blue-100 text-blue-700 border-blue-200",
  paid: "bg-amber-100 text-amber-700 border-amber-200",
};

const accessLabels = {
  free: "Free",
  "email-gated": "Email Required",
  paid: "Premium",
};

const categoryLabels: Record<string, string> = {
  nutrition: "Nutrition Basics",
  "meal-planning": "Meal Planning",
  "food-labels": "Food Labels",
  "healthy-eating": "Healthy Eating",
  "food-systems": "Food Systems",
  tools: "Tools & Calculators",
};

export function GuideCard({ guide, className }: GuideCardProps) {
  const imageUrl = guide.thumbnailImage
    ? urlFor(guide.thumbnailImage)?.width(600).height(450).url()
    : guide.featuredImage
    ? urlFor(guide.featuredImage)?.width(600).height(450).url()
    : null;

  const AccessIcon = accessIcons[guide.accessType];

  return (
    <Link href={`/guides/${guide.slug}`} className="group block">
      <div
        className={cn(
          "h-full bg-white border border-neutral-200 rounded-xl overflow-hidden",
          "transition-all duration-200",
          "hover:border-green-300 hover:shadow-lg hover:-translate-y-1",
          className
        )}
      >
        {/* Image */}
        {imageUrl && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageUrl}
              alt={guide.featuredImage?.alt || guide.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Access Badge - Overlay on Image */}
            <div className="absolute top-3 left-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
                  accessColors[guide.accessType]
                )}
              >
                {AccessIcon && <AccessIcon className="w-3 h-3" />}
                {accessLabels[guide.accessType]}
                {guide.accessType === "paid" && guide.price && (
                  <span className="ml-0.5">${guide.price}</span>
                )}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-medium text-green-700 uppercase tracking-wide">
              {categoryLabels[guide.category] || guide.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 transition-colors group-hover:text-green-700">
            {guide.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
            {guide.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            {guide.readingTime && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {guide.readingTime} min
              </span>
            )}
            {guide.difficulty && (
              <>
                <span className="text-neutral-300">•</span>
                <span className="capitalize">{guide.difficulty}</span>
              </>
            )}
            {guide.guideType === "tool" && (
              <>
                <span className="text-neutral-300">•</span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Interactive
                </span>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700 transition-colors group-hover:text-green-800">
              {guide.accessType === "paid" ? "View Details" : "Read Guide"}
              <Download className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
