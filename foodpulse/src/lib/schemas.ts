/**
 * Zod validation schemas for FoodPulse
 */
import { z } from "zod";

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  tags: z.array(z.string()).optional(),
  firstName: z.string().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Search schema
export const searchSchema = z.object({
  query: z.string().min(2, "Search query must be at least 2 characters"),
  category: z.string().optional(),
  page: z.number().positive().default(1),
  limit: z.number().positive().default(12),
});

export type SearchParams = z.infer<typeof searchSchema>;

// Article metadata schema
export const articleMetaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.enum([
    "food-wellbeing",
    "smart-food-choices",
    "food-system-insights",
    "practical-food-tips",
    "recipes",
  ]),
  tags: z.array(z.string()),
  publishedAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()).optional(),
  author: z.object({
    name: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
  }),
  featured: z.boolean().default(false),
  image: z.object({
    src: z.string(),
    alt: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
  readTime: z.number().optional(),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
});

export type ArticleMeta = z.infer<typeof articleMetaSchema>;

// Recipe schema (extends article)
export const recipeSchema = articleMetaSchema.extend({
  recipe: z.object({
    prepTime: z.number(), // minutes
    cookTime: z.number(), // minutes
    totalTime: z.number(), // minutes
    servings: z.number(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    cuisine: z.string().optional(),
    dietaryInfo: z
      .array(
        z.enum([
          "vegetarian",
          "vegan",
          "gluten-free",
          "dairy-free",
          "nut-free",
          "low-carb",
          "high-protein",
        ])
      )
      .optional(),
    ingredients: z.array(
      z.object({
        item: z.string(),
        amount: z.string(),
        notes: z.string().optional(),
      })
    ),
    instructions: z.array(
      z.object({
        step: z.number(),
        instruction: z.string(),
        image: z.string().optional(),
      })
    ),
    nutrition: z
      .object({
        calories: z.number(),
        protein: z.number(), // grams
        carbs: z.number(), // grams
        fat: z.number(), // grams
        fiber: z.number().optional(), // grams
        sugar: z.number().optional(), // grams
        sodium: z.number().optional(), // mg
      })
      .optional(),
    notes: z.string().optional(),
  }),
});

export type Recipe = z.infer<typeof recipeSchema>;

// Comment schema (if implementing comments)
export const commentSchema = z.object({
  articleSlug: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment must be less than 1000 characters"),
  parentId: z.string().optional(), // For nested replies
});

export type CommentFormData = z.infer<typeof commentSchema>;

// Coaching inquiry schema
export const coachingInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  goals: z.string().min(20, "Please describe your goals in detail"),
  timeline: z.enum(["immediate", "1-3months", "3-6months", "flexible"]),
  heardFrom: z.string().optional(),
});

export type CoachingInquiryData = z.infer<typeof coachingInquirySchema>;

// Resource download schema (for lead capture)
export const resourceDownloadSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name is required"),
  resourceId: z.string(),
  subscribeToNewsletter: z.boolean().default(true),
});

export type ResourceDownloadData = z.infer<typeof resourceDownloadSchema>;
