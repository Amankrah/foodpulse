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
    <footer className="bg-green-800 text-white lg:hidden">
      <Container className="py-6">
        {/* Logo + tagline */}
        <div className="flex items-start gap-3 pb-6 border-b border-green-700">
          <Logo variant="white" size="lg" showText={false} />
          <div className="min-w-0">
            <h2 className="text-xl font-display font-bold text-white">FoodPulse</h2>
            <p className="text-sm text-green-100 mt-0.5">
              Evidence-based nutrition, practical tips, food systems.
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
              <div key={key} className="border-b border-green-700/80 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left min-h-[48px] touch-manipulation"
                  {...(isOpen ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                  aria-controls={`footer-section-${key}`}
                  id={`footer-heading-${key}`}
                >
                  <span className="text-base font-semibold text-white">
                    {section.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-green-200 shrink-0 transition-transform duration-200",
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
                            className="block py-3 pl-1 text-green-100 hover:text-white transition-colors min-h-[44px] flex items-center touch-manipulation"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="block py-3 pl-1 text-green-100 hover:text-white transition-colors min-h-[44px] flex items-center touch-manipulation"
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
        <div className="py-6 flex items-center justify-center gap-6">
          <a
            href={SOCIAL_LINKS.kit}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-green-100 hover:text-white transition-colors rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation"
            aria-label="FoodPulse on Kit"
          >
            <ExternalLink className="h-6 w-6" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-green-100 hover:text-white transition-colors rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-green-100 hover:text-white transition-colors rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation"
            aria-label="YouTube"
          >
            <Youtube className="h-6 w-6" />
          </a>
        </div>

        {/* Legal links — stacked for easy tapping */}
        <div className="pt-4 pb-2 border-t border-green-700">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {legalNavigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-green-100 hover:text-white transition-colors py-2 min-h-[44px] flex items-center touch-manipulation"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-center text-sm text-green-200 mt-4">
            © {currentYear} {SITE_NAME}
          </p>
          <p className="text-center text-xs text-green-100 mt-1">
            Made with 🥗 for better food choices
          </p>
        </div>
      </Container>
    </footer>
  );
}
