import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/image";
import type { GuideListItem } from "@/lib/sanity/types";

interface GuideFeaturedProps {
  guide: GuideListItem & {
    subtitle?: string;
    whatYoullLearn?: string[];
    purchaseLink?: string;
  };
  className?: string;
}

export function GuideFeatured({ guide, className }: GuideFeaturedProps) {
  const imageUrl = guide.featuredImage
    ? urlFor(guide.featuredImage)?.width(800).height(600).url()
    : null;

  const isPaid = guide.accessType === "paid";
  const buttonText = isPaid
    ? `Get Yours - $${guide.price}`
    : guide.accessType === "email-gated"
    ? "Get Free Guide"
    : "Read Guide";

  const buttonHref = isPaid && guide.purchaseLink ? guide.purchaseLink : `/guides/${guide.slug}`;
  const isExternalLink = isPaid && guide.purchaseLink;

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-green-50 via-white to-green-50/50 border border-green-200 rounded-2xl overflow-hidden",
        className
      )}
    >
      <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Image */}
        {imageUrl && (
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt={guide.featuredImage?.alt || guide.title}
              fill
              className="object-cover"
            />
            {/* Badge */}
            {isPaid && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-sm font-bold shadow-sm">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Premium Guide
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold uppercase tracking-wide">
              Featured Guide
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
            {guide.title}
          </h2>

          {guide.subtitle && (
            <p className="text-lg text-neutral-600 mb-6">{guide.subtitle}</p>
          )}

          {guide.whatYoullLearn && guide.whatYoullLearn.length > 0 && (
            <ul className="space-y-3 mb-8">
              {guide.whatYoullLearn.slice(0, 4).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-neutral-600 mb-6">
            {guide.readingTime && (
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
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
                {guide.readingTime} min read
              </span>
            )}
            {guide.difficulty && (
              <>
                <span className="text-neutral-300">•</span>
                <span className="capitalize">{guide.difficulty}</span>
              </>
            )}
          </div>

          {/* CTA Button */}
          <div>
            <Link
              href={buttonHref}
              {...(isExternalLink && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200",
                isPaid
                  ? "bg-amber-600 text-white hover:bg-amber-700 shadow-md hover:shadow-lg"
                  : "bg-green-700 text-white hover:bg-green-800 shadow-md hover:shadow-lg"
              )}
            >
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
