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
        "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
        variant === "primary"
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50",
        className
      )}
    >
      <Download className="w-4 h-4" />
      Download PDF
    </a>
  );
}
