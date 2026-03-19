"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

const rotatingWords = ["food facts", "food systems"];

// Friendly food emojis floating around
const floatingFoods = [
  { icon: "🥑", delay: 0, position: "top-[18%] left-[10%]", size: "text-4xl" },
  { icon: "🍎", delay: 0.5, position: "top-[25%] right-[15%]", size: "text-3xl" },
  { icon: "🥕", delay: 1, position: "bottom-[30%] left-[8%]", size: "text-3xl" },
  { icon: "🍳", delay: 1.5, position: "top-[45%] right-[8%]", size: "text-4xl" },
  { icon: "🥦", delay: 2, position: "bottom-[22%] right-[12%]", size: "text-3xl" },
  { icon: "🧀", delay: 2.5, position: "top-[65%] left-[12%]", size: "text-3xl" },
];

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-[var(--color-primary)] to-green-800">
      {/* Editorial hero — deep green anchor (brand guide §03) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[var(--color-teal)]/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-teal)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Food Emojis */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        {floatingFoods.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} animate-hero-float`}
            style={{ animationDelay: `${item.delay}s` }}
          >
            <div className={`${item.size} filter drop-shadow-md`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Friendly Eyebrow */}
            <div className="mb-6 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-semibold border border-white/15">
                <span className="text-lg">👋</span>
                Welcome to FoodPulse
              </span>
            </div>

            {/* TITLE scale — ExtraBold, light subtitle register on supporting line below */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 animate-fade-in-up leading-[1.05] tracking-tight">
              Finally understand{" "}
              <span className="relative inline-block">
                <span
                  key={currentWordIndex}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-[var(--color-mint)]"
                >
                  {rotatingWords[currentWordIndex]}
                </span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 5c50-3 100-3 150 0s46 3 46 0" stroke="url(#underline-brand)" strokeWidth="3" strokeLinecap="round" className="animate-draw-line" />
                  <defs>
                    <linearGradient id="underline-brand" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#7a9e8e" />
                      <stop offset="100%" stopColor="#f2b705" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="lead-text !text-white/85 !max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up animation-delay-200">
              Your go-to resource for understanding food, from what&apos;s on your plate
              to how it got there. Clear, evidence-based, consumer-focused.
            </p>

            {/* Primary CTA — Honey Gold (brand) */}
            <div className="flex justify-center lg:justify-start animate-fade-in-up animation-delay-400">
              <Button variant="primary" size="lg" href="/start-here">
                Start Here
              </Button>
            </div>
          </div>

          {/* Right: Friendly Illustration */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in-up animation-delay-200">
            <div className="relative">
              {/* Main Card Stack */}
              <div className="relative w-[400px] h-[400px]">
                {/* Background card */}
                <div className="absolute top-8 left-8 w-72 h-[360px] bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl transform rotate-6" />

                {/* Middle card */}
                <div className="absolute top-4 left-4 w-72 h-[360px] bg-white/60 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl transform rotate-3" />

                {/* Front card - Main content */}
                <div className="absolute top-0 left-0 w-72 h-[360px] bg-white rounded-3xl border border-green-100 shadow-2xl p-5 flex flex-col">
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-[var(--color-teal)] to-[var(--color-support)] rounded-xl flex items-center justify-center text-white text-lg">
                      🍽️
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 text-sm">Explore Our Topics</h3>
                      <p className="text-xs text-green-600">4 ways to learn</p>
                    </div>
                  </div>

                  {/* Card content - 4 categories */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 p-2.5 bg-green-50 rounded-xl">
                      <span className="text-xl">🥗</span>
                      <div>
                        <p className="text-sm font-medium text-green-900">Food & Wellbeing</p>
                        <p className="text-xs text-green-600">Nutrition & health</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 bg-orange-50 rounded-xl">
                      <span className="text-xl">🍳</span>
                      <div>
                        <p className="text-sm font-medium text-green-900">Kitchen & Cooking</p>
                        <p className="text-xs text-green-600">Recipes & skills</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 bg-blue-50 rounded-xl">
                      <span className="text-xl">📚</span>
                      <div>
                        <p className="text-sm font-medium text-green-900">Food Literacy</p>
                        <p className="text-xs text-green-600">Labels & choices</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 bg-amber-50 rounded-xl">
                      <span className="text-xl">🌾</span>
                      <div>
                        <p className="text-sm font-medium text-green-900">Food Systems</p>
                        <p className="text-xs text-green-600">Farm to fork</p>
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="pt-3 border-t border-green-100">
                    <p className="text-xs text-green-600 text-center">Pick a topic and start learning</p>
                  </div>
                </div>

                {/* Floating elements around the card */}
                <div className="absolute -top-6 right-8 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl animate-bounce-slow">
                  🍊
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl shadow-lg flex items-center justify-center text-xl animate-bounce-slow animation-delay-200">
                  ⭐
                </div>
                <div className="absolute top-1/2 -right-6 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-lg animate-bounce-slow animation-delay-400">
                  ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
