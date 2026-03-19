"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, X, TrendingUp, BookOpen, FileText, Book, HelpCircle, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";

const popularSearches = [
  'protein', 'macro', 'fiber', 'organic',
  'meal planning', 'nutrition labels', 'calories', 'vitamins'
];

export function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const quickLinks = [
    { label: "Articles", href: "/articles", icon: FileText, color: "text-[var(--color-teal)]" },
    { label: "Guides", href: "/guides", icon: BookOpen, color: "text-[var(--color-primary)]" },
    { label: "Glossary", href: "/glossary", icon: Book, color: "text-[var(--color-support)]" },
    { label: "Tools", href: "/tools", icon: Calculator, color: "text-[var(--color-sage)]" },
    { label: "FAQ", href: "/faq", icon: HelpCircle, color: "text-[var(--color-trust-blue)]" },
  ];

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Filter suggestions based on query
  const suggestions = useMemo(() => {
    if (query.trim()) {
      const filtered = popularSearches.filter(term =>
        term.toLowerCase().includes(query.toLowerCase())
      );
      return filtered.slice(0, 5);
    }
    return [];
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Search Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-[var(--color-mint)]/60 hover:text-[var(--color-teal)]"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Box */}
          <div className="relative w-full max-w-2xl glass-dropdown rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center border-b border-[var(--color-sage)]/25 px-6 py-4">
                <Search className="h-5 w-5 flex-shrink-0 text-[var(--color-teal)]" />
                <input
                  type="text"
                  placeholder="Search articles, guides, glossary, tools..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-4 py-2 text-lg focus:outline-none bg-transparent text-neutral-900 placeholder:text-neutral-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors flex-shrink-0"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-b border-[var(--color-sage)]/20 bg-white">
                <div className="px-6 py-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Suggestions
                  </div>
                  <div className="space-y-1">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2 rounded-lg text-neutral-700 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center gap-2"
                      >
                        <Search className="h-4 w-4 text-neutral-400" />
                        <span className="font-medium">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-[var(--color-mint)]/50 to-[color-mix(in_srgb,var(--color-mint)_65%,white)] px-6 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-support)]">
                Browse by category
              </p>
              <div className="grid grid-cols-5 gap-2">
                {quickLinks.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-[var(--color-teal)]/12 bg-white p-3 transition-all duration-200 hover:border-[var(--color-teal)]/25 hover:shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`${color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-neutral-700 text-center">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            {!query && (
              <div className="border-t border-[var(--color-sage)]/20 bg-white px-6 py-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-support)]">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSuggestionClick(term)}
                      className="rounded-full border border-[var(--color-sage)]/25 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:border-[var(--color-teal)]/30 hover:bg-[var(--color-mint)]/70 hover:text-[var(--color-primary)]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Keyboard Shortcut Hint */}
            <div className="border-t border-[var(--color-sage)]/20 bg-[color-mix(in_srgb,var(--color-mint)_32%,#f5f5f5)] px-6 py-3">
              <p className="flex items-center justify-center gap-2 text-xs text-[var(--color-support)]">
                Press
                <kbd className="px-2 py-0.5 bg-white border border-neutral-300 rounded text-neutral-700 font-mono text-xs">
                  ESC
                </kbd>
                to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
