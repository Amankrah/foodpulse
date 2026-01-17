import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-md border border-neutral-300 bg-white px-4 py-3",
              "text-base text-neutral-900 placeholder:text-neutral-500",
              "transition-all duration-200",
              "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
              error && "border-[var(--error-500)] focus:border-[var(--error-500)] focus:ring-[var(--error-500)]",
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              className
            )}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500">
              {icon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-[var(--error-500)]">{error}</p>
        )}

        {helperText && !error && (
          <p className="text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, fullWidth = false, className, id, ...props },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-md border border-neutral-300 bg-white px-4 py-3",
            "text-base text-neutral-900 placeholder:text-neutral-500",
            "transition-all duration-200",
            "focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
            error && "border-[var(--error-500)] focus:border-[var(--error-500)] focus:ring-[var(--error-500)]",
            "min-h-[120px] resize-y",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-sm text-[var(--error-500)]">{error}</p>
        )}

        {helperText && !error && (
          <p className="text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
