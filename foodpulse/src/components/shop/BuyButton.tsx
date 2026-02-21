"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";

interface BuyButtonProps {
  productSlug: string;
  quantity?: number;
  children?: React.ReactNode;
  className?: string;
}

export function BuyButton({
  productSlug,
  quantity = 1,
  children,
  className,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, quantity }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Checkout failed.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("No checkout URL received.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={handleBuy}
        disabled={loading}
        loading={loading}
        icon={<ShoppingCart className="w-5 h-5" />}
        iconPosition="left"
      >
        {children ?? "Buy now"}
      </Button>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
