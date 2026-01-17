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
          "fixed top-16 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 lg:hidden z-50 overflow-y-auto",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="p-6 space-y-2">
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
          <div className="pt-6 mt-6 border-t border-neutral-200">
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
        className="block rounded-md px-4 py-3 text-base font-medium text-neutral-900 hover:bg-green-50 transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium text-neutral-900 hover:bg-green-50 transition-colors"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
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
              className="block rounded-md px-4 py-2 text-sm text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
