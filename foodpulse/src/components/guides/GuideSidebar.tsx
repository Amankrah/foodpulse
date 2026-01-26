"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
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
        <div className="bg-white border border-neutral-200 rounded-xl p-6 sticky top-6">
          <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide mb-4">
            Table of Contents
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
                          ? "bg-green-50 text-green-700 font-medium"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
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

      {/* Download Box */}
      {guide.downloadUrl && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6" id="download">
          <h3 className="text-sm font-semibold text-green-900 uppercase tracking-wide mb-3">
            Download PDF
          </h3>
          <p className="text-sm text-green-800 mb-4">
            Get the full guide as a PDF to read offline or print.
          </p>
          <a
            href={guide.downloadUrl}
            download={guide.downloadFileName}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Free
          </a>
        </div>
      )}

      {/* Related Guides */}
      {relatedGuides && relatedGuides.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide mb-4">
            Related Guides
          </h3>
          <ul className="space-y-3">
            {relatedGuides.map((relatedGuide) => (
              <li key={relatedGuide._id}>
                <Link
                  href={`/guides/${relatedGuide.slug}`}
                  className="block text-sm text-green-700 hover:text-green-800 hover:underline"
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
