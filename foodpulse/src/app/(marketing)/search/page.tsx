"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { CategoryBadge } from "@/components/ui/Badge";
import { Search as SearchIcon, X } from "lucide-react";
import { categoryList } from "@/content/categories";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, initialCategory);
    }
  }, [initialQuery, initialCategory]);

  const performSearch = async (searchQuery: string, category: string = "") => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // TODO: Replace with actual API call
      const params = new URLSearchParams({
        q: searchQuery,
        ...(category && { category }),
      });

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data.results);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, selectedCategory);

    // Update URL
    const params = new URLSearchParams({ q: query });
    if (selectedCategory) params.set("category", selectedCategory);
    window.history.pushState({}, "", `/search?${params}`);
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedCategory("");
    setResults([]);
    setHasSearched(false);
    window.history.pushState({}, "", "/search");
  };

  return (
    <>
      {/* Search Header */}
      <Section background="green" padding="lg">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-6">
            Search FoodPulse
          </h1>
          <p className="text-xl text-green-800 mb-8">
            Find articles, guides, and resources on food and nutrition
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search articles, recipes, topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  icon={<SearchIcon className="h-5 w-5" />}
                  className="bg-white"
                  fullWidth
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                size="lg"
                disabled={isLoading || !query.trim()}
              >
                Search
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === ""
                    ? "bg-white text-green-700"
                    : "bg-green-800 text-green-100 hover:bg-green-700"
                }`}
              >
                All Categories
              </button>
              {categoryList.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-white text-green-700"
                      : "bg-green-800 text-green-100 hover:bg-green-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </form>
        </div>
      </Section>

      {/* Search Results */}
      <Section background="white" padding="lg">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />
            <p className="mt-4 text-neutral-600">Searching...</p>
          </div>
        ) : hasSearched ? (
          <>
            {/* Results Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-900">
                  {results.length > 0
                    ? `Found ${results.length} result${results.length !== 1 ? "s" : ""}`
                    : "No results found"}
                </h2>
                <p className="text-neutral-600 mt-1">
                  Searching for: <span className="font-semibold">{query}</span>
                  {selectedCategory && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-semibold">
                        {categoryList.find((c) => c.slug === selectedCategory)?.name}
                      </span>
                    </>
                  )}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={clearSearch}>
                <X className="h-4 w-4" />
                Clear
              </Button>
            </div>

            {/* Results Grid */}
            {results.length > 0 ? (
              <ArticleGrid articles={results} columns={3} />
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-600 mb-4">
                  No articles found matching your search.
                </p>
                <p className="text-neutral-500 mb-6">
                  Try different keywords or browse by category
                </p>
                <Button variant="outline" size="md" href="/articles">
                  Browse All Articles
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-xl text-neutral-600">
              Enter a search query to find articles
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
