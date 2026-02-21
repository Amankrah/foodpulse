"use client";

import { Section } from "@/components/layout/Section";
import { ConvertKitEmbed } from "@/components/newsletter/ConvertKitEmbed";

export function NewsletterCTA() {
  return (
    <Section background="white" padding="lg">
      <div className="bg-green-700 rounded-2xl p-8 lg:p-12 text-center">
        <div className="max-w-lg mx-auto">
          <ConvertKitEmbed
            className="[&_.formkit-form]:!bg-white [&_.formkit-header]:!text-green-800 [&_.formkit-subheader]:!text-neutral-600 [&_.formkit-guarantee]:!text-neutral-500"
            hidePoweredBy
          />
        </div>
        <p className="text-sm text-green-100 mt-4">
          Unsubscribe anytime.{" "}
          <a
            href="/legal/privacy-policy"
            className="underline hover:text-white transition-colors"
          >
            Read our privacy policy
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
