"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Guide, GuideListItem } from "@/lib/sanity/types";

interface GuideSidebarProps {
  guide: Guide;
  relatedGuides?: GuideListItem[];
  className?: string;
}

export function GuideSidebar({
  guide,
  relatedGuides,
  className,
}: GuideSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    // Observe all chapter sections
    guide.chapters?.forEach((chapter, index) => {
      const id = chapter.slug || `chapter-${index}`;
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [guide.chapters]);

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Table of Contents */}
      {guide.chapters && guide.chapters.length > 0 && (
        <div className="rounded-2xl border border-[var(--color-sage)]/30 bg-white/95 p-6 shadow-sm sticky top-6">
          <h3 className="eyebrow mb-4 !normal-case !tracking-wide text-[0.65rem] sm:text-[var(--size-label)]">
            Table of contents
          </h3>
          <nav>
            <ul className="space-y-2">
              {guide.chapters.map((chapter, index) => {
                const id = chapter.slug || `chapter-${index}`;
                const isActive = activeSection === id;

                return (
                  <li key={index}>
                    <a
                      href={`#${id}`}
                      className={cn(
                        "block py-2 px-3 text-sm rounded-lg transition-colors",
                        isActive
                          ? "bg-[var(--color-mint)] text-[var(--color-primary)] font-semibold border border-[var(--color-teal)]/15"
                          : "text-[var(--color-support)] hover:text-[var(--color-teal)] hover:bg-[var(--color-mint)]/50"
                      )}
                    >
                      {chapter.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}

      {relatedGuides && relatedGuides.length > 0 && (
        <div className="rounded-2xl border border-[var(--color-sage)]/30 bg-white/95 p-6 shadow-sm">
          <h3 className="eyebrow mb-4 !normal-case !tracking-wide text-[0.65rem] sm:text-[var(--size-label)]">
            Related guides
          </h3>
          <ul className="space-y-3">
            {relatedGuides.map((relatedGuide) => (
              <li key={relatedGuide._id}>
                <Link
                  href={`/guides/${relatedGuide.slug}`}
                  className="block text-sm font-medium text-[var(--color-teal)] hover:text-[var(--color-primary)] hover:underline underline-offset-2"
                >
                  {relatedGuide.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
