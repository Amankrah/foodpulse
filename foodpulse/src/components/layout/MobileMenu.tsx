"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mobileNavigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden z-40",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          "fixed top-16 right-0 bottom-0 z-50 w-full max-w-sm overflow-y-auto border-l border-[var(--color-teal)]/20 bg-[color-mix(in_srgb,white_96%,var(--color-mint))] shadow-xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="space-y-2 p-6">
          {mobileNavigation.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item}
              expanded={expandedItems.includes(item.label)}
              onToggle={() => toggleItem(item.label)}
              onClose={onClose}
            />
          ))}

          {/* Newsletter CTA */}
          <div className="mt-6 border-t border-[var(--color-sage)]/25 pt-6">
            <Button variant="primary" size="md" href="/newsletter" fullWidth>
              Subscribe to Newsletter
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}

interface MobileNavItemProps {
  item: typeof mobileNavigation[0];
  expanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

/** Literal aria-expanded for Microsoft Edge Tools ARIA static analysis. */
function MobileNavExpandChevron({
  expanded,
  onToggle,
  className,
}: {
  expanded: boolean;
  onToggle: () => void;
  className: string;
}) {
  if (expanded) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={className}
        aria-expanded="true"
        aria-label="Collapse submenu"
      >
        <ChevronDown className="mx-auto h-5 w-5 rotate-180 text-[var(--color-teal)] transition-transform" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onToggle}
      className={className}
      aria-expanded="false"
      aria-label="Expand submenu"
    >
      <ChevronDown className="mx-auto h-5 w-5 text-[var(--color-teal)] transition-transform" />
    </button>
  );
}

function MobileNavItem({
  item,
  expanded,
  onToggle,
  onClose,
}: MobileNavItemProps) {
  if (!item.children) {
    return (
      <Link
        href={item.href!}
        onClick={onClose}
        className="block rounded-lg border border-transparent px-4 py-3 text-base font-medium text-[var(--color-primary)] transition-colors hover:border-[var(--color-teal)]/15 hover:bg-[var(--color-mint)]/80"
      >
        {item.label}
      </Link>
    );
  }

  const parentHref =
    "href" in item && typeof item.href === "string" ? item.href : undefined;

  const rowClass =
    "rounded-lg border border-transparent text-base font-medium text-[var(--color-primary)] transition-colors hover:border-[var(--color-teal)]/15 hover:bg-[var(--color-mint)]/80";

  if (parentHref) {
    return (
      <div>
        <div className="flex gap-1">
          <Link
            href={parentHref}
            onClick={onClose}
            className={`flex-1 px-4 py-3 ${rowClass}`}
          >
            {item.label}
          </Link>
          <MobileNavExpandChevron
            expanded={expanded}
            onToggle={onToggle}
            className={`shrink-0 px-3 ${rowClass}`}
          />
        </div>

        {expanded && item.children && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="block rounded-lg border border-transparent px-4 py-2 text-sm text-[var(--color-support)] transition-colors hover:border-[var(--color-teal)]/12 hover:bg-[var(--color-mint)]/70 hover:text-[var(--color-primary)]"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {expanded ? (
        <button
          onClick={onToggle}
          type="button"
          className={`flex w-full items-center justify-between px-4 py-3 ${rowClass}`}
          aria-expanded="true"
          aria-haspopup="true"
          aria-label="Collapse submenu"
        >
          {item.label}
          <ChevronDown className="h-5 w-5 rotate-180 text-[var(--color-teal)] transition-transform" />
        </button>
      ) : (
        <button
          onClick={onToggle}
          type="button"
          className={`flex w-full items-center justify-between px-4 py-3 ${rowClass}`}
          aria-expanded="false"
          aria-haspopup="true"
          aria-label="Expand submenu"
        >
          {item.label}
          <ChevronDown className="h-5 w-5 text-[var(--color-teal)] transition-transform" />
        </button>
      )}

      {expanded && item.children && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="block rounded-lg border border-transparent px-4 py-2 text-sm text-[var(--color-support)] transition-colors hover:border-[var(--color-teal)]/12 hover:bg-[var(--color-mint)]/70 hover:text-[var(--color-primary)]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
