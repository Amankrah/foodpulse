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
  free: "bg-[var(--color-mint)]/95 text-[var(--color-teal)] border-[var(--color-teal)]/25",
  "email-gated":
    "bg-[color-mix(in_srgb,var(--color-mint)_88%,var(--color-sage)_12%)] text-[var(--color-support)] border-[var(--color-support)]/25",
  paid: "bg-[color-mix(in_srgb,var(--color-gold)_25%,white)] text-[var(--color-primary)] border-[var(--color-gold)]/45",
};

const accessLabels = {
  free: "Open",
  "email-gated": "Email Required",
  paid: "Premium",
};

const categoryLabels: Record<string, string> = {
  "food-and-wellbeing": "Food and Wellbeing",
  "kitchen-and-cooking": "Kitchen and Cooking",
  "food-literacy": "Food Literacy",
  "food-systems": "Food Systems",
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
          "h-full bg-white border border-[var(--color-sage)]/30 rounded-2xl overflow-hidden shadow-sm",
          "transition-all duration-200",
          "hover:border-[var(--color-teal)]/35 hover:shadow-md hover:-translate-y-0.5",
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
            <span className="eyebrow !normal-case !tracking-wide text-[0.65rem]">
              {categoryLabels[guide.category] || guide.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-display font-semibold text-[var(--color-primary)] mb-2 line-clamp-2 transition-colors group-hover:text-[var(--color-teal)]">
            {guide.title}
          </h3>

          <p className="text-sm text-[var(--color-support)] line-clamp-2 mb-4 leading-relaxed">
            {guide.excerpt}
          </p>

          <div className="flex items-center gap-3 text-xs text-[var(--color-support)]">
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
                <span className="text-[var(--color-sage)]">•</span>
                <span className="capitalize">{guide.difficulty}</span>
              </>
            )}
            {guide.guideType === "tool" && (
              <>
                <span className="text-[var(--color-sage)]">•</span>
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
          <div className="mt-4 pt-4 border-t border-[var(--color-sage)]/20">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-teal)] transition-colors group-hover:text-[var(--color-primary)]">
              {guide.accessType === "paid" ? "View Details" : "Read Guide"}
              <Download className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
