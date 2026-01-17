"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useNewsletterForm } from "@/hooks/useNewsletter";
import { Mail, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: "📰",
    title: "Weekly Articles",
    description: "Get our best food and nutrition articles delivered every Saturday",
  },
  {
    icon: "🍳",
    title: "Exclusive Recipes",
    description: "Subscriber-only healthy recipes you won't find anywhere else",
  },
  {
    icon: "💡",
    title: "Quick Tips",
    description: "Practical food tips you can implement right away",
  },
  {
    icon: "🎁",
    title: "Free Resources",
    description: "Early access to guides, tools, and downloadable content",
  },
];

export default function NewsletterPage() {
  const {
    email,
    setEmail,
    firstName,
    setFirstName,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
  } = useNewsletterForm();

  return (
    <>
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-6">
            Get Fresh Insights Weekly
          </h1>
          <p className="text-xl text-green-800">
            Join thousands of readers who get evidence-based food knowledge
            delivered to their inbox every Saturday. No spam, ever.
          </p>
        </div>
      </Section>

      {/* Newsletter Form Section */}
      <Section background="white" padding="lg">
        <div className="max-w-2xl mx-auto">
          {!isSuccess ? (
            <Card padding="lg">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2 text-center">
                Subscribe Now
              </h2>
              <p className="text-neutral-600 text-center mb-8">
                Get weekly food insights straight to your inbox
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  label="First Name (Optional)"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                  fullWidth
                />

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  icon={<Mail className="h-5 w-5" />}
                  error={error || undefined}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading}
                  loading={isLoading}
                  fullWidth
                >
                  Subscribe to Newsletter
                </Button>

                <p className="text-sm text-neutral-500 text-center">
                  Unsubscribe anytime.{" "}
                  <a
                    href="/legal/privacy-policy"
                    className="text-green-700 hover:text-green-600 underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </Card>
          ) : (
            <Card padding="lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                  You're Subscribed!
                </h2>
                <p className="text-neutral-600 mb-6">
                  Check your email to confirm your subscription. You'll receive
                  your first newsletter this Saturday.
                </p>
                <Button variant="outline" size="md" href="/articles">
                  Browse Articles
                </Button>
              </div>
            </Card>
          )}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section background="neutral" padding="lg">
        <SectionHeader
          eyebrow="What You'll Get"
          title="Why Subscribe?"
          centered
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.title} padding="lg">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-neutral-600">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Social Proof */}
      <Section background="white" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl font-display text-neutral-800 mb-4">
            "The only food newsletter I actually read. No fluff, just solid
            information I can use."
          </blockquote>
          <p className="text-neutral-600">— FoodPulse Reader</p>
        </div>
      </Section>
    </>
  );
}
