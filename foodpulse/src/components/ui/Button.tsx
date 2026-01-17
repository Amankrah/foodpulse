import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: "_blank" | "_self";
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: `
    bg-green-700 text-white
    hover:bg-green-600
    focus:ring-2 focus:ring-green-500 focus:ring-offset-2
    shadow-[var(--shadow-green)] hover:shadow-[var(--shadow-green-lg)]
    transition-all duration-200
    disabled:bg-neutral-400 disabled:cursor-not-allowed
  `,
  secondary: `
    bg-brown-500 text-neutral-900
    hover:bg-brown-400
    focus:ring-2 focus:ring-brown-400 focus:ring-offset-2
    shadow-[var(--shadow-brown)]
    transition-all duration-200
    disabled:bg-neutral-400 disabled:cursor-not-allowed
  `,
  outline: `
    bg-transparent text-green-700
    border-2 border-green-700
    hover:bg-green-50
    focus:ring-2 focus:ring-green-500 focus:ring-offset-2
    transition-all duration-200
    disabled:border-neutral-400 disabled:text-neutral-400 disabled:cursor-not-allowed
  `,
  ghost: `
    bg-transparent text-green-700
    hover:bg-green-50
    focus:ring-2 focus:ring-green-500 focus:ring-offset-2
    transition-all duration-200
    disabled:text-neutral-400 disabled:cursor-not-allowed
  `,
  accent: `
    bg-white text-green-700
    hover:bg-green-50
    focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700
    shadow-md hover:shadow-lg
    transition-all duration-200
    disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed
  `,
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-md",
  lg: "px-8 py-4 text-lg rounded-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className,
  type = "button",
  target = "_self",
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2",
    "font-sans font-semibold tracking-wide",
    "transition-all duration-200",
    "focus:outline-none",
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && "w-full",
    (disabled || loading) && "opacity-60 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a
          href={href}
          className={baseStyles}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseStyles}
    >
      {content}
    </button>
  );
}
