import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "@/components/shared/Logo";
import { footerNavigation, legalNavigation } from "@/content/navigation";
import { SITE_NAME, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-800 text-white">
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
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href={SOCIAL_LINKS.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
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

            {/* Made with love */}
            <p className="text-sm text-green-100">
              Made with 🥗 for better food choices
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
