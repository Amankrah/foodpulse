import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  rounded?: boolean;
}

const badgeVariants = {
  default: "bg-green-50 text-green-700 border-green-200",
  success: "bg-[var(--success-100)] text-[var(--success-600)] border-[var(--success-600)]",
  warning: "bg-[var(--warning-100)] text-[var(--warning-600)] border-[var(--warning-600)]",
  error: "bg-[var(--error-100)] text-[var(--error-600)] border-[var(--error-600)]",
  info: "bg-[var(--info-100)] text-[var(--info-600)] border-[var(--info-600)]",
  secondary: "bg-brown-50 text-brown-700 border-brown-200",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  icon,
  rounded = true,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium border",
        badgeVariants[variant],
        badgeSizes[size],
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const categoryColors: Record<string, string> = {
    "food-wellbeing": "bg-green-50 text-green-700",
    "smart-food-choices": "bg-blue-50 text-blue-700",
    "food-system-insights": "bg-amber-50 text-amber-700",
    "practical-food-tips": "bg-orange-50 text-orange-700",
    recipes: "bg-red-50 text-red-700",
  };

  const categoryLabels: Record<string, string> = {
    "food-wellbeing": "Food & Wellbeing",
    "smart-food-choices": "Smart Choices",
    "food-system-insights": "Food Systems",
    "practical-food-tips": "Practical Tips",
    recipes: "Recipes",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        categoryColors[category] || "bg-neutral-100 text-neutral-700",
        className
      )}
    >
      {categoryLabels[category] || category}
    </span>
  );
}

interface TagBadgeProps {
  tag: string;
  onClick?: () => void;
  className?: string;
}

export function TagBadge({ tag, onClick, className }: TagBadgeProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700",
        "transition-colors duration-200",
        onClick && "cursor-pointer hover:bg-neutral-200",
        className
      )}
    >
      {tag}
    </Component>
  );
}
