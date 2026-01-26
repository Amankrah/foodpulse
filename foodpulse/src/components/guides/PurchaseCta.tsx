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
        "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-200">
          Premium Guide
        </span>
      </div>

      <h3 className="text-xl font-bold text-neutral-900 mb-4">{title}</h3>

      {features && features.length > 0 && (
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-neutral-700"
            >
              <Check className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-3xl font-bold text-neutral-900">
            ${price.toFixed(2)}
          </div>
          <p className="text-sm text-neutral-600">One-time payment</p>
        </div>

        <a
          href={purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-colors whitespace-nowrap"
        >
          Get This Guide
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <p className="text-xs text-neutral-600 mt-4 text-center">
        Instant access after purchase. No subscription required.
      </p>
    </div>
  );
}
