/**
 * TypeScript type definitions for FoodPulse
 */

// ========== Article Types ==========

export interface Author {
  name: string;
  bio?: string;
  image?: string;
  email?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface ArticleImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
}

export type CategorySlug =
  | "food-wellbeing"
  | "smart-food-choices"
  | "food-system-insights"
  | "practical-food-tips"
  | "recipes";

export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: CategorySlug;
  tags: string[];
  publishedAt: string | Date;
  updatedAt?: string | Date;
  author: Author;
  featured?: boolean;
  image: ArticleImage;
  readTime?: number;
  seo?: ArticleSEO;
  relatedArticles?: string[]; // Article slugs
  sources?: Source[];
}

export interface Source {
  title: string;
  url: string;
  type?: "study" | "article" | "book" | "website";
  author?: string;
  date?: string;
}

// ========== Recipe Types ==========

export type DietaryInfo =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "nut-free"
  | "low-carb"
  | "high-protein"
  | "keto"
  | "paleo";

export type RecipeDifficulty = "easy" | "medium" | "hard";

export interface RecipeIngredient {
  item: string;
  amount: string;
  notes?: string;
  group?: string; // e.g., "For the sauce", "For the topping"
}

export interface RecipeInstruction {
  step: number;
  instruction: string;
  image?: string;
  time?: number; // minutes
}

export interface RecipeNutrition {
  servingSize: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sugar?: number; // grams
  sodium?: number; // mg
  saturatedFat?: number; // grams
  cholesterol?: number; // mg
}

export interface Recipe extends Omit<Article, "category"> {
  category: "recipes";
  recipe: {
    prepTime: number; // minutes
    cookTime: number; // minutes
    totalTime: number; // minutes
    servings: number;
    difficulty: RecipeDifficulty;
    cuisine?: string;
    dietaryInfo?: DietaryInfo[];
    ingredients: RecipeIngredient[];
    instructions: RecipeInstruction[];
    nutrition?: RecipeNutrition;
    equipment?: string[];
    notes?: string;
    tips?: string[];
  };
}

// ========== Category Types ==========

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  longDescription?: string;
  icon: string;
  color: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// ========== Navigation Types ==========

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href: string;
}

// ========== Form Types ==========

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  tags?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CommentFormData {
  articleSlug: string;
  name: string;
  email: string;
  comment: string;
  parentId?: string;
}

export interface CoachingInquiryData {
  name: string;
  email: string;
  phone?: string;
  goals: string;
  timeline: "immediate" | "1-3months" | "3-6months" | "flexible";
  heardFrom?: string;
}

// ========== API Response Types ==========

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ArticlesResponse extends PaginatedResponse<Article> {
  featured?: Article[];
}

// ========== Resource Types ==========

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: "guide" | "tool" | "download" | "template";
  category?: string;
  image?: ArticleImage;
  downloadUrl?: string;
  requiresEmail?: boolean;
  publishedAt: string | Date;
  tags?: string[];
}

// ========== Search Types ==========

export interface SearchParams {
  query: string;
  category?: CategorySlug;
  tags?: string[];
  page?: number;
  limit?: number;
}

export interface SearchResult {
  type: "article" | "recipe" | "resource";
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: CategorySlug;
  url: string;
  image?: ArticleImage;
  relevance?: number;
}

// ========== Analytics Types ==========

export interface PageView {
  page: string;
  referrer?: string;
  timestamp: Date;
}

export interface ArticleAnalytics {
  views: number;
  averageReadTime?: number;
  completionRate?: number;
  shares?: {
    facebook?: number;
    twitter?: number;
    pinterest?: number;
    email?: number;
  };
}

// ========== UI Component Types ==========

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "accent";
export type ButtonSize = "sm" | "md" | "lg";

export type CardVariant = "default" | "featured" | "horizontal" | "minimal";

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

// ========== CMS Types (Sanity, Contentful, etc.) ==========

export interface CMSImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface CMSReference {
  _type: "reference";
  _ref: string;
}

// ========== Utility Types ==========

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
