import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-3xl", // 768px
  md: "max-w-4xl", // 896px
  lg: "max-w-5xl", // 1024px
  xl: "max-w-6xl", // 1152px
  "2xl": "max-w-7xl", // 1280px
  full: "max-w-full",
};

export function Container({
  children,
  className,
  as: Component = "div",
  maxWidth = "2xl",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "container mx-auto px-4 lg:px-8",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </Component>
  );
}
