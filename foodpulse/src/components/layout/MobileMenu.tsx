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

  return (
    <div>
      <button
        onClick={onToggle}
        type="button"
        className="flex w-full items-center justify-between rounded-lg border border-transparent px-4 py-3 text-base font-medium text-[var(--color-primary)] transition-colors hover:border-[var(--color-teal)]/15 hover:bg-[var(--color-mint)]/80"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[var(--color-teal)] transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>

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
