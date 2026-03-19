import Link from "next/link";
import { ExternalLink, Linkedin, Youtube } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "@/components/shared/Logo";
import { FooterMobile } from "./FooterMobile";
import { footerNavigation, legalNavigation } from "@/content/navigation";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Mobile: collapsible sections, large touch targets */}
      <FooterMobile />

      {/* Desktop: 4-column grid (hidden on mobile) */}
      <footer className="hidden bg-[var(--color-primary)] text-white lg:block">
      {/* Main Footer Content */}
      <Container className="py-12 lg:py-16">
        {/* Logo Section */}
        <div className="mb-8 flex items-start gap-4 border-b border-[var(--color-teal)]/25 pb-8">
          <Logo variant="white" size="xl" showText={false} />
          <div>
            <h2 className="mb-2 font-display text-2xl font-bold text-white">FoodPulse</h2>
            <p className="max-w-md text-[var(--color-mint)]/90">
              Your hub for all things food. Evidence-based nutrition science, practical tips, and insights into food systems.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Explore */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {footerNavigation.explore.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.explore.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {footerNavigation.categories.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.categories.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {footerNavigation.company.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {footerNavigation.connect.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.connect.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.kit}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                aria-label="FoodPulse on Kit"
              >
                <ExternalLink className="h-6 w-6" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--color-teal)]/25">
        <Container className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-sm text-[var(--color-mint)]/80">
              © {currentYear} {SITE_NAME}. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4">
              {legalNavigation.map((link, index) => (
                <span key={link.href} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-mint)]/88 transition-colors hover:text-[var(--color-gold)]"
                  >
                    {link.label}
                  </Link>
                  {index < legalNavigation.length - 1 && (
                    <span className="text-[var(--color-teal)]/35" aria-hidden>
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Tagline */}
            <p className="text-sm font-medium text-[var(--color-gold)]/95">
              Nourish well. Live well.
            </p>
          </div>
        </Container>
      </div>
    </footer>
    </>
  );
}
