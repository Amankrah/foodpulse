import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/image";
import type { ProductListItem } from "@/lib/sanity/types";

interface ProductCardProps {
  product: ProductListItem;
  className?: string;
}

function formatPrice(price: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(price);
}

export function ProductCard({ product, className }: ProductCardProps) {
  const imageUrl = product.image
    ? urlFor(product.image)?.width(600).height(400).url()
    : null;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div
        className={cn(
          "h-full bg-white border border-neutral-200 rounded-xl overflow-hidden",
          "transition-all duration-200",
          "hover:border-green-300 hover:shadow-lg hover:-translate-y-1",
          className
        )}
      >
        <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.image?.alt || product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              <ShoppingBag className="w-16 h-16" />
            </div>
          )}
          <span className="absolute top-3 right-3 bg-green-700 text-white text-sm font-semibold px-2.5 py-1 rounded-md">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-display font-bold text-neutral-900 mb-2 group-hover:text-green-700 transition-colors">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
              {product.description}
            </p>
          )}
          <span className="text-green-700 font-medium text-sm inline-flex items-center gap-1.5">
            View product
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
