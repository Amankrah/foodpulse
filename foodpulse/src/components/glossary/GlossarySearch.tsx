"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import type { GlossaryTermListItem } from "@/lib/sanity/types";

interface GlossarySearchProps {
  terms: GlossaryTermListItem[];
  onFilter: (filtered: GlossaryTermListItem[]) => void;
}

export function GlossarySearch({ terms, onFilter }: GlossarySearchProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) {
      onFilter(terms);
      return;
    }

    const filtered = terms.filter(
      (term) =>
        term.term.toLowerCase().includes(query.toLowerCase()) ||
        term.shortDefinition.toLowerCase().includes(query.toLowerCase())
    );
    onFilter(filtered);
  }, [query, terms, onFilter]);

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
      <input
        type="search"
        placeholder="Search terms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
        aria-label="Search glossary terms"
      />
    </div>
  );
}
