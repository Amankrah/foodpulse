import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getProductBySlug, getAllProductPaths } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/sanity/image";
import { BuyButton } from "@/components/shop/BuyButton";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductPaths();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  const metaDescription = product.description || `${product.title} – ${product.price} USD`;
  return {
    title: `${product.title} | Shop | FoodPulse`,
    description: metaDescription,
    openGraph: {
      title: product.title,
      description: metaDescription,
      type: "website",
    },
  };
}

function formatPrice(price: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(price);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const imageUrl = product.image
    ? urlFor(product.image)?.width(800).height(600).url()
    : null;

  return (
    <>
      <Section background="white" padding="lg">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
            <Link href="/" className="hover:text-green-700 transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/shop" className="hover:text-green-700 transition-colors">
              Shop
            </Link>
            <span aria-hidden>/</span>
            <span className="text-neutral-900">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl">
            <div className="aspect-[4/3] bg-neutral-100 rounded-xl overflow-hidden relative">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.image?.alt || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                  <span className="text-6xl">📦</span>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                {product.title}
              </h1>
              <p className="text-2xl text-green-700 font-semibold mb-6">
                {formatPrice(product.price, product.currency)}
              </p>
              {product.description && (
                <p className="text-neutral-600 mb-6">{product.description}</p>
              )}
              {product.body && product.body.length > 0 && (
                <div className="prose prose-neutral mb-8">
                  <PortableText value={product.body} />
                </div>
              )}
              <div className="flex flex-wrap gap-4">
                <BuyButton productSlug={product.slug} />
                <Button variant="outline" href="/shop">
                  Back to shop
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <NewsletterCTA />
    </>
  );
}
