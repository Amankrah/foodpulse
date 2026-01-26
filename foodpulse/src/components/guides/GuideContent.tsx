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

const calloutIcons = {
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  example: FileText,
};

const calloutStyles = {
  info: "bg-blue-50 border-blue-200 text-blue-900",
  tip: "bg-green-50 border-green-200 text-green-900",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
  example: "bg-purple-50 border-purple-200 text-purple-900",
};

const calloutIconColors = {
  info: "text-blue-600",
  tip: "text-green-600",
  warning: "text-amber-600",
  example: "text-purple-600",
};

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 text-neutral-700 leading-relaxed">{children}</p>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-neutral-900 mt-6 mb-3">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-green-600 pl-4 py-2 my-6 italic text-neutral-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-neutral-700">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="px-1.5 py-0.5 bg-neutral-100 rounded text-sm font-mono text-neutral-900">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        className="text-green-700 hover:text-green-800 underline"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value)?.width(800).url();
      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-neutral-600 text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }: any) => {
      const Icon = calloutIcons[value.type as keyof typeof calloutIcons] || Info;
      return (
        <div
          className={cn(
            "border rounded-lg p-4 my-6",
            calloutStyles[value.type as keyof typeof calloutStyles]
          )}
        >
          <div className="flex gap-3">
            <Icon
              className={cn(
                "w-5 h-5 flex-shrink-0 mt-0.5",
                calloutIconColors[value.type as keyof typeof calloutIconColors]
              )}
            />
            <div className="flex-1">
              {value.title && (
                <div className="font-semibold mb-1">{value.title}</div>
              )}
              <div className="text-sm">{value.content}</div>
            </div>
          </div>
        </div>
      );
    },
    inlineCta: ({ value }: any) => (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8 text-center">
        <p className="text-neutral-700 mb-4">{value.text}</p>
        <a
          href={value.link}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
        >
          {value.buttonText || "Learn More"}
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
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                {chapter.title}
              </h2>
              <div className="prose prose-neutral max-w-none">
                <PortableText value={chapter.content} components={components} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Key Takeaways */}
      {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
        <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {guide.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-neutral-700 text-lg">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
