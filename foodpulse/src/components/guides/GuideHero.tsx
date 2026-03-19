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
  "food-and-wellbeing": "Food and Wellbeing",
  "kitchen-and-cooking": "Kitchen and Cooking",
  "food-literacy": "Food Literacy",
  "food-systems": "Food Systems",
};

/** Editorial brand — teal / support / gold (no generic blue/purple) */
const difficultyColors = {
  beginner: "bg-[var(--color-mint)] text-[var(--color-teal)] border-[var(--color-teal)]/25",
  intermediate:
    "bg-[color-mix(in_srgb,var(--color-mint)_80%,var(--color-sage)_20%)] text-[var(--color-support)] border-[var(--color-support)]/25",
  advanced: "bg-[color-mix(in_srgb,var(--color-mint)_65%,var(--color-primary)_35%)] text-[var(--color-primary)] border-[var(--color-primary)]/20",
};

const accessLabels = {
  free: "Open",
  "email-gated": "Download",
  paid: "Premium",
};

const accessColors = {
  free: "bg-[var(--color-mint)] text-[var(--color-teal)] border-[var(--color-teal)]/25",
  "email-gated":
    "bg-[color-mix(in_srgb,var(--color-mint)_88%,var(--color-sage)_12%)] text-[var(--color-support)] border-[var(--color-support)]/25",
  paid: "bg-[color-mix(in_srgb,var(--color-gold)_22%,white)] text-[var(--color-primary)] border-[var(--color-gold)]/50",
};

const DEFAULT_ASPECT_RATIO = 16 / 9; // Fallback when dimensions missing

export function GuideHero({ guide, className }: GuideHeroProps) {
  const featured = guide.featuredImage;
  const dimensions = featured?.asset?.metadata?.dimensions;
  const aspectRatio = dimensions
    ? dimensions.width / dimensions.height
    : DEFAULT_ASPECT_RATIO;

  const imageUrl = featured
    ? urlFor(featured)
        ?.width(1200)
        .fit("max")
        .url()
    : null;

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-[var(--color-mint)] via-white to-white border-b border-[var(--color-sage)]/20",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/90 text-[var(--color-primary)] border border-[var(--color-teal)]/20 shadow-sm">
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
        <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
          {guide.title}
        </h1>

        {guide.subtitle && (
          <p className="text-xl font-light text-[var(--color-support)] leading-relaxed mb-6">
            {guide.subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-support)] mb-8 pb-8 border-b border-[var(--color-sage)]/25">
          {guide.readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{guide.readingTime} min read</span>
            </div>
          )}
          {guide.author && (
            <>
              <span className="text-[var(--color-sage)]">•</span>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{guide.author.name}</span>
              </div>
            </>
          )}
          {guide.publishedAt && (
            <>
              <span className="text-[var(--color-sage)]">•</span>
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
          <div className="rounded-2xl border border-[var(--color-teal)]/20 bg-white/95 p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-display font-semibold text-[var(--color-primary)] mb-4">
              What you&apos;ll learn
            </h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {guide.whatYoullLearn.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--color-teal)] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[var(--color-support)] leading-relaxed">{item}</span>
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-[var(--color-gold)] text-[var(--color-primary)] hover:brightness-95 shadow-md"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </a>
          )}
          {guide.accessType === "email-gated" && (
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-[var(--color-gold)] text-[var(--color-primary)] hover:brightness-95 shadow-md"
            >
              <Download className="w-5 h-5" />
              Get guide
            </a>
          )}
          {guide.accessType === "paid" && guide.purchaseLink && (
            <a
              href={guide.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-[var(--color-gold)] text-[var(--color-primary)] hover:brightness-95 shadow-md"
            >
              Get guide — ${guide.price}
            </a>
          )}
          <a
            href="#content"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-white hover:bg-[var(--color-mint)] transition-colors"
          >
            Jump to guide
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>

        {/* Featured Image - uses Sanity asset aspect ratio for correct sizing */}
        {imageUrl && (
          <div
            className="relative w-full rounded-xl overflow-hidden shadow-lg"
            style={{ aspectRatio: `${aspectRatio}` }}
          >
            <Image
              src={imageUrl}
              alt={featured?.alt || guide.title}
              fill
              className="object-contain"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
