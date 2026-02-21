import { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProductCard } from "@/components/shop/ProductCard";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";

export const metadata: Metadata = {
  title: "Shop | Guides, Ebooks & Resources | FoodPulse",
  description:
    "Evidence-based guides, ebooks, and digital resources to help you make smarter food choices. Support FoodPulse and level up your nutrition knowledge.",
  openGraph: {
    title: "Shop | FoodPulse",
    description: "Guides, ebooks, and resources for better food decisions.",
    type: "website",
  },
};

export const revalidate = 3600;

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <Section background="green" padding="lg">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-neutral-600 mb-6">
              <Link href="/" className="hover:text-green-800 transition-colors">
                Home
              </Link>
              <span aria-hidden>/</span>
              <span className="text-neutral-900">Shop</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
              Shop
            </h1>
            <p className="text-xl text-neutral-700">
              Guides, ebooks, and digital resources to support your food journey.
              Every purchase helps us create more evidence-based content.
            </p>
          </div>
        </Container>
      </Section>

      <Section background="white" padding="lg">
        <Container>
          {products.length === 0 ? (
            <div className="text-center py-16 text-neutral-600">
              <p className="text-lg">No products available yet.</p>
              <p className="mt-2">Check back soon for guides and resources.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <NewsletterCTA />
    </>
  );
}
