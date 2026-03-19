"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, Linkedin, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "@/components/shared/Logo";
import { footerNavigation, legalNavigation } from "@/content/navigation";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

type SectionKey = "explore" | "categories" | "company" | "connect" | null;

const SECTION_ORDER: SectionKey[] = ["explore", "categories", "company", "connect"];

export function FooterMobile() {
  const [openSection, setOpenSection] = useState<SectionKey>(null);

  const currentYear = new Date().getFullYear();

  const toggle = (key: SectionKey) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <footer className="bg-[var(--color-primary)] text-white lg:hidden">
      <Container className="py-6">
        {/* Logo + intro */}
        <div className="flex items-start gap-3 border-b border-[var(--color-teal)]/25 pb-6">
          <Logo variant="white" size="lg" showText={false} />
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold text-white">FoodPulse</h2>
            <p className="mt-0.5 text-sm text-[var(--color-mint)]/88">
              Evidence-based nutrition, practical tips, and food systems.
            </p>
          </div>
        </div>

        {/* Collapsible sections */}
        <nav className="py-4" aria-label="Footer navigation">
          {SECTION_ORDER.map((key) => {
            if (!key) return null;
            const section = footerNavigation[key];
            const isOpen = openSection === key;
            return (
              <div
                key={key}
                className="border-b border-[var(--color-teal)]/20 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  className="flex min-h-[48px] w-full touch-manipulation items-center justify-between gap-3 py-4 text-left"
                  {...(isOpen ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                  aria-controls={`footer-section-${key}`}
                  id={`footer-heading-${key}`}
                >
                  <span className="text-base font-semibold text-white">
                    {section.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-[var(--color-mint)]/75 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  id={`footer-section-${key}`}
                  role="region"
                  aria-labelledby={`footer-heading-${key}`}
                  className={cn(
                    "grid transition-all duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <ul className="overflow-hidden">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        {"external" in link && link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-[44px] touch-manipulation items-center py-3 pl-1 text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="flex min-h-[44px] touch-manipulation items-center py-3 pl-1 text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Social — always visible, large tap targets */}
        <div className="flex items-center justify-center gap-6 py-6">
          <a
            href={SOCIAL_LINKS.kit}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] min-w-[48px] touch-manipulation items-center justify-center rounded-full p-3 text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
            aria-label="FoodPulse on Kit"
          >
            <ExternalLink className="h-6 w-6" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] min-w-[48px] touch-manipulation items-center justify-center rounded-full p-3 text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] min-w-[48px] touch-manipulation items-center justify-center rounded-full p-3 text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
            aria-label="YouTube"
          >
            <Youtube className="h-6 w-6" />
          </a>
        </div>

        {/* Legal links — stacked for easy tapping */}
        <div className="border-t border-[var(--color-teal)]/25 pb-2 pt-4">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {legalNavigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-[44px] touch-manipulation items-center py-2 text-sm text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-sm text-[var(--color-mint)]/80">
            © {currentYear} {SITE_NAME}
          </p>
          <p className="mt-2 text-center text-xs font-medium text-[var(--color-gold)]/95">
            Nourish well. Live well.
          </p>
        </div>
      </Container>
    </footer>
  );
}
