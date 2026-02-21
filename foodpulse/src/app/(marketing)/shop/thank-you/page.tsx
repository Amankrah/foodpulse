import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank you for your purchase | FoodPulse",
  description: "Your order was successful. Check your email for next steps.",
  robots: "noindex, nofollow",
};

export default function ThankYouPage() {
  return (
    <Section background="white" padding="lg">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Thank you for your purchase
          </h1>
          <p className="text-neutral-600 mb-8">
            Your payment was successful. If this was a digital product, check your
            email for delivery details and any download links.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" href="/shop">
              Continue shopping
            </Button>
            <Button variant="outline" href="/">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
