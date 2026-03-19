import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PurchaseCtaProps {
  title: string;
  price: number;
  purchaseLink: string;
  features?: string[];
  className?: string;
}

export function PurchaseCta({
  title,
  price,
  purchaseLink,
  features,
  className,
}: PurchaseCtaProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-gold)]/40 bg-gradient-to-br from-[var(--color-mint)] to-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 rounded-full text-sm font-bold border bg-[color-mix(in_srgb,var(--color-gold)_22%,white)] text-[var(--color-primary)] border-[var(--color-gold)]/45">
          Premium guide
        </span>
      </div>

      <h3 className="text-xl font-display font-bold text-[var(--color-primary)] mb-4">
        {title}
      </h3>

      {features && features.length > 0 && (
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-[var(--color-support)] leading-relaxed"
            >
              <Check className="w-5 h-5 text-[var(--color-teal)] flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-3xl font-display font-extrabold text-[var(--color-primary)]">
            ${price.toFixed(2)}
          </div>
          <p className="text-sm text-[var(--color-support)]">One-time payment</p>
        </div>

        <a
          href={purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap bg-[var(--color-gold)] text-[var(--color-primary)] hover:brightness-95 shadow-md"
        >
          Get this guide
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <p className="text-xs text-[var(--color-support)] mt-4 text-center leading-relaxed">
        Instant access after purchase. No subscription required.
      </p>
    </div>
  );
}
