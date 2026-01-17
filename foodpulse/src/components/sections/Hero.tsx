"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const rotatingWords = [
  "healthy foods",
  "food choices",
  "food systems",
];

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Fresh produce and healthy foods"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "var(--gradient-hero)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Eyebrow */}
        <div className="mb-6 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            Your hub for all things food
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline mb-6 animate-fade-in-up">
          Explore all things{" "}
          <span className="inline-block min-w-[280px] text-left">
            <span
              key={currentWordIndex}
              className="text-green-200 animate-fade-in"
            >
              {rotatingWords[currentWordIndex]}
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="lead-text !text-white max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          Your hub for all things food. Once it concerns you as a consumer,
          you&apos;re covered.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animation-delay-400">
          <Button variant="accent" size="lg" href="/articles">
            Explore All
          </Button>
        </div>
      </div>
    </section>
  );
}
