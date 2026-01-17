import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: "white" | "green" | "brown" | "neutral" | "gradient";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
}

const backgroundClasses = {
  white: "bg-white",
  green: "bg-green-50",
  brown: "bg-brown-50",
  neutral: "bg-neutral-50",
  gradient: "bg-gradient-to-br from-green-50 to-brown-50",
};

const paddingClasses = {
  none: "",
  sm: "py-8 lg:py-12",
  md: "py-12 lg:py-16",
  lg: "py-16 lg:py-24",
  xl: "py-20 lg:py-32",
};

export function Section({
  children,
  className,
  containerClassName,
  background = "white",
  padding = "lg",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        centered && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div className="eyebrow mb-3">{eyebrow}</div>
      )}
      <h2 className="section-headline">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-neutral-600 lg:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
