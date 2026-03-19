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
      <footer className="bg-green-800 text-white hidden lg:block">
      {/* Main Footer Content */}
      <Container className="py-12 lg:py-16">
        {/* Logo Section */}
        <div className="mb-8 pb-8 border-b border-green-700 flex items-start gap-4">
          <Logo variant="white" size="xl" showText={false} />
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">FoodPulse</h2>
            <p className="text-green-100 max-w-md">
              Your hub for all things food. Evidence-based nutrition science, practical tips, and insights into food systems.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Explore */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {footerNavigation.explore.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.explore.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {footerNavigation.categories.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.categories.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {footerNavigation.company.title}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
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
                      className="text-green-100 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-green-100 hover:text-white transition-colors"
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
                className="text-green-100 hover:text-white transition-colors"
                aria-label="FoodPulse on Kit"
              >
                <ExternalLink className="h-6 w-6" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-green-700">
        <Container className="py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-sm text-green-100">
              © {currentYear} {SITE_NAME}. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4">
              {legalNavigation.map((link, index) => (
                <span key={link.href} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="text-sm text-green-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                  {index < legalNavigation.length - 1 && (
                    <span className="text-green-700">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Tagline */}
            <p className="text-sm text-green-100">
              Know your food. Nourish your life.
            </p>
          </div>
        </Container>
      </div>
    </footer>
    </>
  );
}
