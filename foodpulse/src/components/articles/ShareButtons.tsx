"use client";

import { useState } from "react";
import { Facebook, Twitter, Link as LinkIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description
    ? encodeURIComponent(description)
    : "";

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-neutral-700 mr-2">Share:</span>

      {/* Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-neutral-100 hover:bg-green-50 text-neutral-700 hover:text-green-700 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-5 w-5" />
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-neutral-100 hover:bg-green-50 text-neutral-700 hover:text-green-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-5 w-5" />
      </a>

      {/* Email */}
      <a
        href={shareLinks.email}
        className="p-2 rounded-lg bg-neutral-100 hover:bg-green-50 text-neutral-700 hover:text-green-700 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="h-5 w-5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg bg-neutral-100 hover:bg-green-50 text-neutral-700 hover:text-green-700 transition-colors relative"
        aria-label="Copy link"
      >
        <LinkIcon className="h-5 w-5" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
