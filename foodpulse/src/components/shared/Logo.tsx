import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

export function Logo({
  variant = "default",
  size = "md",
  className,
  showText = true
}: LogoProps) {
  const sizeMap = {
    sm: { height: 72, width: 72, text: "text-5xl" },
    md: { height: 96, width: 96, text: "text-6xl" },
    lg: { height: 112, width: 112, text: "text-7xl" },
    xl: { height: 144, width: 144, text: "text-8xl" },
  };

  const colorClasses = {
    default: "text-green-700",
    white: "text-white",
  };

  const { height, width, text } = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 hover:opacity-80 transition-opacity",
        className
      )}
    >
      <Image
        src="/foodpulse-logo.png"
        alt="FoodPulse Logo"
        width={width}
        height={height}
        className={cn(
          "object-contain",
          variant === "white" && "brightness-0 invert"
        )}
        priority
      />
      {showText && (
        <span
          className={cn(
            "font-display font-bold",
            text,
            colorClasses[variant]
          )}
        >
          FoodPulse
        </span>
      )}
    </Link>
  );
}
