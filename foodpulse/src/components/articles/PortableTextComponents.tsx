import Image from "next/image";
import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      // Get image URL without forcing dimensions - preserves original aspect ratio
      const imageUrl = urlFor(value)?.url();

      if (!imageUrl) {
        return null;
      }

      return (
        <figure className="my-8">
          <div className="relative w-full rounded-xl overflow-hidden bg-neutral-50">
            <Image
              src={imageUrl}
              alt={value.alt || "Article image"}
              width={1200}
              height={800}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-sm text-neutral-600 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }: any) => {
      const bgColors = {
        info: "bg-info-100 border-info-500",
        warning: "bg-warning-100 border-warning-600",
        tip: "bg-success-100 border-success-600",
      };

      const icons = {
        info: "ℹ️",
        warning: "⚠️",
        tip: "💡",
      };

      const type = value.type || "info";

      return (
        <div
          className={`my-6 p-4 rounded-lg border-l-4 ${bgColors[type as keyof typeof bgColors] || bgColors.info}`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">
              {icons[type as keyof typeof icons] || icons.info}
            </span>
            <p className="text-sm leading-relaxed">{value.text}</p>
          </div>
        </div>
      );
    },
    embed: ({ value }: any) => {
      if (!value?.embedCode) {
        return null;
      }

      return (
        <div className="my-8">
          <div
            className="embed-container relative w-full overflow-hidden rounded-xl bg-neutral-50 p-4"
            dangerouslySetInnerHTML={{ __html: value.embedCode }}
          />
          {value.caption && (
            <p className="mt-2 text-sm text-neutral-600 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noopener noreferrer"
        : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;

      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-green-600 hover:text-green-700 underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="section-headline mt-12 mb-4 scroll-mt-24" id={generateId(children)}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-neutral-800 mt-8 mb-3 scroll-mt-24" id={generateId(children)}>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-neutral-700 mt-6 mb-2 scroll-mt-24" id={generateId(children)}>
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 pl-6 border-l-4 border-green-500 italic text-lg text-neutral-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="body-text my-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-6 ml-6 space-y-2 list-disc marker:text-green-600">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 ml-6 space-y-2 list-decimal marker:text-green-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="body-text pl-2">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="body-text pl-2">{children}</li>
    ),
  },
};

// Helper function to generate IDs for headings (for table of contents)
function generateId(children: any): string {
  if (!children) return "";

  const text = children
    .map((child: any) => {
      if (typeof child === "string") return child;
      if (child?.props?.text) return child.props.text;
      return "";
    })
    .join("");

  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
