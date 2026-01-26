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
    { label: 'Articles', href: '/articles', icon: FileText, color: 'text-blue-600' },
    { label: 'Guides', href: '/guides', icon: BookOpen, color: 'text-purple-600' },
    { label: 'Glossary', href: '/glossary', icon: Book, color: 'text-amber-600' },
    { label: 'Tools', href: '/guides#tools', icon: Calculator, color: 'text-green-600' },
    { label: 'FAQ', href: '/faq', icon: HelpCircle, color: 'text-emerald-600' },
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
        className="p-2 text-neutral-600 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
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
              <div className="flex items-center px-6 py-4 border-b border-neutral-200">
                <Search className="h-5 w-5 text-green-600 flex-shrink-0" />
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
              <div className="border-b border-neutral-200 bg-white">
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
            <div className="px-6 py-4 bg-gradient-to-br from-green-50/50 to-brown-50/50">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                Browse by Category
              </p>
              <div className="grid grid-cols-5 gap-2">
                {quickLinks.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl hover:shadow-md transition-all duration-200 group border border-neutral-100"
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
              <div className="px-6 py-4 bg-white border-t border-neutral-200">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSuggestionClick(term)}
                      className="px-3 py-1.5 bg-neutral-50 hover:bg-green-50 rounded-full text-sm text-neutral-700 hover:text-green-700 border border-neutral-200 hover:border-green-300 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Keyboard Shortcut Hint */}
            <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 flex items-center justify-center gap-2">
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
