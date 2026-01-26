import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CardVariant } from "@/types";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
}

const cardVariants: Record<CardVariant, string> = {
  default: "bg-white rounded-xl shadow-sm",
  featured: "bg-white rounded-xl shadow-md",
  horizontal: "bg-white rounded-xl shadow-sm",
  minimal: "bg-transparent",
};

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  md: "p-5 lg:p-6",
  lg: "p-6 lg:p-8",
};

export function Card({
  children,
  variant = "default",
  className,
  padding = "md",
  hover = true,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        cardVariants[variant],
        paddingClasses[padding],
        hover && "transition-shadow duration-300 hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "16/10";
  className?: string;
}

export function CardImage({
  src,
  alt,
  aspectRatio = "16/10",
  className,
}: CardImageProps) {
  const aspectClasses = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "16/10": "aspect-[16/10]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        aspectClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({
  children,
  className,
  as: Component = "h3",
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        "font-sans text-xl font-semibold text-neutral-800 line-clamp-2 transition-colors group-hover:text-green-700",
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
  clamp?: number;
}

export function CardDescription({
  children,
  className,
  clamp = 2,
}: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-neutral-600",
        clamp && `line-clamp-${clamp}`,
        className
      )}
    >
      {children}
    </p>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-4 flex items-center gap-4", className)}>
      {children}
    </div>
  );
}

interface CardBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

export function CardBadge({
  children,
  variant = "default",
  className,
}: CardBadgeProps) {
  const badgeVariants = {
    default: "bg-green-50 text-green-700",
    success: "bg-[var(--success-100)] text-[var(--success-600)]",
    warning: "bg-[var(--warning-100)] text-[var(--warning-600)]",
    error: "bg-[var(--error-100)] text-[var(--error-600)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
