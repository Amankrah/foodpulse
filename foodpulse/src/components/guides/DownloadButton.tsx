"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  guideTitle: string;
  guideSlug: string;
  downloadUrl: string;
  fileName?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export function DownloadButton({
  guideTitle,
  guideSlug,
  downloadUrl,
  fileName,
  className,
  variant = "primary",
}: DownloadButtonProps) {
  const handleDownload = () => {
    // Track download event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "guide_download", {
        guide_title: guideTitle,
        guide_slug: guideSlug,
        download_type: "free",
      });
    }
  };

  return (
    <a
      href={downloadUrl}
      download={fileName}
      onClick={handleDownload}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all",
        variant === "primary"
          ? "bg-[var(--color-gold)] text-[var(--color-primary)] hover:brightness-95 shadow-md"
          : "bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-mint)]",
        className
      )}
    >
      <Download className="w-4 h-4" />
      Download PDF
    </a>
  );
}
