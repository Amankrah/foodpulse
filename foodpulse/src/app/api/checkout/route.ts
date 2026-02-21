import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/sanity";
import { SITE_URL } from "@/lib/constants";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout is not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const productSlug = typeof body?.productSlug === "string" ? body.productSlug.trim() : null;
    const quantity = typeof body?.quantity === "number" && body.quantity >= 1 ? Math.min(body.quantity, 99) : 1;

    if (!productSlug) {
      return NextResponse.json(
        { error: "Missing productSlug." },
        { status: 400 }
      );
    }

    const product = await getProductBySlug(productSlug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const successUrl = `${SITE_URL}/shop/thank-you?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${SITE_URL}/shop`;

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = product.stripePriceId
      ? {
          price: product.stripePriceId,
          quantity,
        }
      : {
          price_data: {
            currency: (product.currency || "usd").toLowerCase(),
            product_data: {
              name: product.title,
              description: product.description ?? undefined,
              images: product.image?.asset?.url ? [product.image.asset.url] : undefined,
            },
            unit_amount: Math.round(Number(product.price) * 100), // cents
          },
          quantity,
        };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [lineItem],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        productId: product._id,
        productSlug: product.slug,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Checkout API]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed." },
      { status: 500 }
    );
  }
}
