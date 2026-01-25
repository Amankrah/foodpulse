"use client";

import { useState, useMemo, useCallback } from "react";
import type { GlossaryTermListItem } from "@/lib/sanity/types";
import { GlossaryTermCard } from "./GlossaryTermCard";
import { GlossarySearch } from "./GlossarySearch";
import { AlphabetNavigation } from "./AlphabetNavigation";

interface GlossaryHubProps {
  groupedTerms: Record<string, GlossaryTermListItem[]>;
  categories: string[];
  totalCount: number;
}

export function GlossaryHub({
  groupedTerms,
  categories,
  totalCount,
}: GlossaryHubProps) {
  const allTerms = useMemo(
    () => Object.values(groupedTerms).flat(),
    [groupedTerms]
  );
  const [filteredTerms, setFilteredTerms] =
    useState<GlossaryTermListItem[]>(allTerms);

  const handleFilter = useCallback((filtered: GlossaryTermListItem[]) => {
    setFilteredTerms(filtered);
  }, []);

  const filteredGroupedTerms = useMemo(() => {
    const grouped: Record<string, GlossaryTermListItem[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.letter;
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(term);
    });
    return grouped;
  }, [filteredTerms]);

  const availableLetters = Object.keys(filteredGroupedTerms);

  return (
    <div className="w-full">
      {/* Search */}
      <div className="flex justify-center mb-8">
        <GlossarySearch terms={allTerms} onFilter={handleFilter} />
      </div>

      {/* A-Z Navigation */}
      <AlphabetNavigation availableLetters={availableLetters} />

      {/* Terms by Letter */}
      <div className="mt-12">
        {availableLetters.length > 0 ? (
          Object.keys(filteredGroupedTerms)
            .sort()
            .map((letter) => (
              <div
                key={letter}
                id={`letter-${letter.toLowerCase()}`}
                className="scroll-mt-24 mb-12"
              >
                <h2 className="text-2xl font-bold text-green-700 pb-2 border-b-2 border-green-200 mb-6">
                  {letter}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {filteredGroupedTerms[letter].map((term) => (
                    <GlossaryTermCard key={term._id} term={term} />
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-neutral-600 mb-2">No terms found</p>
            <p className="text-neutral-500">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
