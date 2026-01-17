import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ variant = "default", size = "md", className }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const colorClasses = {
    default: "text-green-700",
    white: "text-white",
  };

  return (
    <Link
      href="/"
      className={cn(
        "font-display font-bold hover:opacity-80 transition-opacity",
        sizeClasses[size],
        colorClasses[variant],
        className
      )}
    >
      FoodPulse
    </Link>
  );
}
