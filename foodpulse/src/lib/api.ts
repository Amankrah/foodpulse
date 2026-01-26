/**
 * API helper functions for FoodPulse
 * Handles data fetching from CMS, newsletter subscriptions, etc.
 */

import { type ArticleMeta, type Recipe } from "./schemas";

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

/**
 * Article API functions
 */
export const articles = {
  /**
   * Get all articles with optional filtering
   */
  getAll: async (params?: {
    category?: string;
    tag?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ articles: ArticleMeta[]; total: number }> => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set("category", params.category);
    if (params?.tag) searchParams.set("tag", params.tag);
    if (params?.featured) searchParams.set("featured", "true");
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());

    const query = searchParams.toString();
    return fetchAPI(`/api/articles${query ? `?${query}` : ""}`);
  },

  /**
   * Get single article by slug
   */
  getBySlug: async (
    category: string,
    slug: string
  ): Promise<ArticleMeta | null> => {
    try {
      return fetchAPI(`/api/articles/${category}/${slug}`);
    } catch {
      return null;
    }
  },

  /**
   * Get related articles
   */
  getRelated: async (
    articleSlug: string,
    limit: number = 3
  ): Promise<ArticleMeta[]> => {
    return fetchAPI(`/api/articles/${articleSlug}/related?limit=${limit}`);
  },

  /**
   * Search articles
   */
  search: async (query: string, options?: { category?: string; limit?: number }): Promise<ArticleMeta[]> => {
    const searchParams = new URLSearchParams({ q: query });
    if (options?.category) searchParams.set("category", options.category);
    if (options?.limit) searchParams.set("limit", options.limit.toString());

    return fetchAPI(`/api/articles/search?${searchParams.toString()}`);
  },

  /**
   * Get popular articles
   */
  getPopular: async (limit: number = 6): Promise<ArticleMeta[]> => {
    return fetchAPI(`/api/articles/popular?limit=${limit}`);
  },
};

/**
 * Recipe API functions
 */
export const recipes = {
  /**
   * Get all recipes
   */
  getAll: async (params?: {
    cuisine?: string;
    difficulty?: string;
    dietary?: string;
    page?: number;
  }): Promise<{ recipes: Recipe[]; total: number }> => {
    const searchParams = new URLSearchParams();
    if (params?.cuisine) searchParams.set("cuisine", params.cuisine);
    if (params?.difficulty) searchParams.set("difficulty", params.difficulty);
    if (params?.dietary) searchParams.set("dietary", params.dietary);
    if (params?.page) searchParams.set("page", params.page.toString());

    const query = searchParams.toString();
    return fetchAPI(`/api/recipes${query ? `?${query}` : ""}`);
  },

  /**
   * Get single recipe by slug
   */
  getBySlug: async (slug: string): Promise<Recipe | null> => {
    try {
      return fetchAPI(`/api/recipes/${slug}`);
    } catch {
      return null;
    }
  },
};

/**
 * Newsletter API functions
 */
export const newsletter = {
  /**
   * Subscribe to newsletter
   */
  subscribe: async (data: {
    email: string;
    firstName?: string;
    tags?: string[];
  }): Promise<{ success: boolean; message: string }> => {
    return fetchAPI("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Unsubscribe from newsletter
   */
  unsubscribe: async (email: string): Promise<{ success: boolean }> => {
    return fetchAPI("/api/newsletter/unsubscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
};

/**
 * Contact form submission
 */
export const contact = {
  submit: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> => {
    return fetchAPI("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

/**
 * Coaching inquiry submission
 */
export const coaching = {
  submit: async (data: {
    name: string;
    email: string;
    phone?: string;
    goals: string;
    timeline: string;
    heardFrom?: string;
  }): Promise<{ success: boolean; message: string }> => {
    return fetchAPI("/api/coaching/inquiry", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

/**
 * Analytics/tracking
 */
export const analytics = {
  /**
   * Track article view
   */
  trackView: async (articleSlug: string): Promise<void> => {
    try {
      await fetchAPI("/api/analytics/view", {
        method: "POST",
        body: JSON.stringify({ articleSlug }),
      });
    } catch {
      // Silently fail for analytics
    }
  },

  /**
   * Track newsletter signup
   */
  trackSignup: async (source: string): Promise<void> => {
    try {
      await fetchAPI("/api/analytics/signup", {
        method: "POST",
        body: JSON.stringify({ source }),
      });
    } catch {
      // Silently fail for analytics
    }
  },
};

/**
 * Resource download (for gated content)
 */
export const resources = {
  download: async (data: {
    email: string;
    firstName: string;
    resourceId: string;
  }): Promise<{ downloadUrl: string }> => {
    return fetchAPI("/api/resources/download", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
