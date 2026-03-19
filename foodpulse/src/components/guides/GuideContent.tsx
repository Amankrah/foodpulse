import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Info, Lightbulb, AlertTriangle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/image";
import type { Guide } from "@/lib/sanity/types";

interface GuideContentProps {
  guide: Guide;
  className?: string;
}

interface PortableTextComponentProps<T = unknown> {
  value?: T;
  children?: React.ReactNode;
}

interface PortableTextImage {
  _type: "image";
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
  alt?: string;
  caption?: string;
}

interface PortableTextCallout {
  _type: "callout";
  type?: "info" | "tip" | "warning" | "example";
  title?: string;
  content?: string;
}

interface PortableTextInlineCta {
  _type: "inlineCta";
  text?: string;
  link?: string;
  buttonText?: string;
}

interface PortableTextLink {
  _type: "link";
  href?: string;
}

const calloutIcons = {
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  example: FileText,
};

/** Editorial callouts — mint/sage/teal/gold (brand guide) */
const calloutStyles = {
  info: "bg-[var(--color-mint)] border-[var(--color-teal)]/30 text-[var(--color-charcoal)]",
  tip: "bg-[var(--color-mint)] border-[var(--color-sage)]/35 text-[var(--color-charcoal)]",
  warning:
    "bg-[color-mix(in_srgb,var(--color-mint)_88%,var(--color-gold)_12%)] border-[var(--color-gold)]/35 text-[var(--color-charcoal)]",
  example: "bg-white border-[var(--color-support)]/25 text-[var(--color-charcoal)]",
};

const calloutIconColors = {
  info: "text-[var(--color-teal)]",
  tip: "text-[var(--color-teal)]",
  warning: "text-[var(--color-primary)]",
  example: "text-[var(--color-support)]",
};

const components = {
  block: {
    normal: ({ children }: PortableTextComponentProps) => (
      <p className="mb-6 text-[var(--color-support)] leading-relaxed text-[length:var(--size-body)]">
        {children}
      </p>
    ),
    h3: ({ children }: PortableTextComponentProps) => (
      <h3 className="text-2xl font-display font-bold text-[var(--color-primary)] mt-8 mb-4 tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: PortableTextComponentProps) => (
      <h4 className="text-xl font-display font-semibold text-[var(--color-primary)] mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }: PortableTextComponentProps) => (
      <blockquote className="border-l-4 border-[var(--color-gold)] pl-4 py-2 my-6 italic text-[var(--color-support)] text-[length:var(--size-quote)] leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-[var(--color-support)] leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }: PortableTextComponentProps) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-[var(--color-support)] leading-relaxed">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: PortableTextComponentProps) => (
      <strong className="font-semibold text-[var(--color-primary)]">{children}</strong>
    ),
    em: ({ children }: PortableTextComponentProps) => <em className="italic">{children}</em>,
    code: ({ children }: PortableTextComponentProps) => (
      <code className="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono text-neutral-900">
        {children}
      </code>
    ),
    link: ({ children, value }: PortableTextComponentProps<PortableTextLink>) => (
      <a
        href={value?.href}
        className="text-[var(--color-teal)] hover:text-[var(--color-primary)] underline underline-offset-2 font-medium"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: PortableTextComponentProps<PortableTextImage>) => {
      if (!value || !value.asset) return null;
      const imageUrl = urlFor(value)?.width(800).url();
      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={value?.alt || ""}
              fill
              className="object-cover"
            />
          </div>
          {value?.caption && (
            <figcaption className="text-sm text-[var(--color-support)] text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }: PortableTextComponentProps<PortableTextCallout>) => {
      const Icon = calloutIcons[value?.type as keyof typeof calloutIcons] || Info;
      return (
        <div
          className={cn(
            "border rounded-lg p-4 my-6",
            calloutStyles[value?.type as keyof typeof calloutStyles]
          )}
        >
          <div className="flex gap-3">
            <Icon
              className={cn(
                "w-5 h-5 flex-shrink-0 mt-0.5",
                calloutIconColors[value?.type as keyof typeof calloutIconColors]
              )}
            />
            <div className="flex-1">
              {value?.title && (
                <div className="font-semibold mb-1">{value.title}</div>
              )}
              <div className="text-sm">{value?.content}</div>
            </div>
          </div>
        </div>
      );
    },
    inlineCta: ({ value }: PortableTextComponentProps<PortableTextInlineCta>) => (
      <div className="rounded-2xl border border-[var(--color-teal)]/20 bg-[var(--color-mint)] p-6 my-8 text-center">
        <p className="text-[var(--color-support)] mb-4 leading-relaxed">{value?.text}</p>
        <a
          href={value?.link}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-[var(--color-gold)] text-[var(--color-primary)] hover:brightness-95 shadow-sm"
        >
          {value?.buttonText || "Learn more"}
        </a>
      </div>
    ),
  },
};

export function GuideContent({ guide, className }: GuideContentProps) {
  return (
    <div className={cn("max-w-none", className)} id="content">
      {/* Introduction */}
      {guide.introduction && guide.introduction.length > 0 && (
        <div className="mb-12">
          <PortableText value={guide.introduction} components={components} />
        </div>
      )}

      {/* Chapters */}
      {guide.chapters && guide.chapters.length > 0 && (
        <div className="space-y-12">
          {guide.chapters.map((chapter, index) => (
            <div key={index} id={chapter.slug || `chapter-${index}`}>
              <h2 className="text-3xl font-display font-bold text-[var(--color-primary)] tracking-tight mb-6">
                {chapter.title}
              </h2>
              <div className="prose prose-neutral max-w-none prose-a:text-[var(--color-teal)]">
                <PortableText value={chapter.content} components={components} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Key Takeaways */}
      {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
        <div className="mt-12 rounded-2xl border border-[var(--color-teal)]/20 bg-[var(--color-mint)] p-8">
          <h2 className="text-2xl font-display font-bold text-[var(--color-primary)] mb-6">
            Key takeaways
          </h2>
          <ul className="space-y-3">
            {guide.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-[var(--color-teal)] flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[var(--color-support)] text-lg leading-relaxed">
                  {takeaway}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
