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
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
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

      {/* Pinterest */}
      <a
        href={shareLinks.pinterest}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-neutral-100 hover:bg-green-50 text-neutral-700 hover:text-green-700 transition-colors"
        aria-label="Share on Pinterest"
      >
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
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
