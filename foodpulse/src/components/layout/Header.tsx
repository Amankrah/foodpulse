"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollPast } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/shared/Logo";
import { mainNavigation } from "@/content/navigation";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hasScrolled = useScrollPast(50);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Close mobile menu on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      startTransition(() => {
        setMobileMenuOpen(false);
      });
    }
  }, [pathname]);

  const isTransparent = transparent && !hasScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "glass-header shadow-sm"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Logo
              variant={isTransparent ? "white" : "default"}
              size="xl"
              showText={false}
            />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainNavigation.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isTransparent={isTransparent}
                />
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                variant={isTransparent ? "accent" : "primary"}
                size="sm"
                href="/newsletter"
              >
                Newsletter
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 transition-colors",
                isTransparent
                  ? "text-white hover:text-green-100"
                  : "text-neutral-700 hover:text-green-700"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}

interface NavItemProps {
  item: typeof mainNavigation[0];
  isTransparent: boolean;
}

function NavItem({ item, isTransparent }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href || "#"}
        className={cn(
          "text-base font-medium transition-colors",
          isTransparent
            ? "text-white hover:text-green-100"
            : "text-neutral-700 hover:text-green-700"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-base font-medium transition-colors",
          isTransparent
            ? "text-white hover:text-green-100"
            : "text-neutral-700 hover:text-green-700"
        )}
      >
        {item.label}
        <svg
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 pt-2 w-72">
          {/* Invisible bridge area to prevent dropdown from closing when moving cursor */}
          <div className="absolute top-0 left-0 right-0 h-2" />
          <div className="glass-dropdown rounded-xl shadow-xl border border-white/20">
            <div className="p-2">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block rounded-lg px-4 py-3 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-200"
                >
                  <div className="font-semibold text-neutral-900">
                    {child.label}
                  </div>
                  {child.description && (
                    <div className="text-sm text-neutral-700 mt-0.5">
                      {child.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
