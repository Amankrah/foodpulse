"use client";

interface AlphabetNavigationProps {
  availableLetters: string[];
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function AlphabetNavigation({
  availableLetters,
}: AlphabetNavigationProps) {
  const handleLetterClick = (letter: string) => {
    const element = document.getElementById(`letter-${letter.toLowerCase()}`);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-1 lg:gap-2 justify-center mt-8">
      {ALPHABET.map((letter) => {
        const isAvailable = availableLetters.includes(letter);
        return (
          <button
            key={letter}
            onClick={() => isAvailable && handleLetterClick(letter)}
            disabled={!isAvailable}
            className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
              isAvailable
                ? "bg-white text-[var(--color-support)] border border-[var(--color-sage)]/35 hover:border-[var(--color-trust-blue)]/40 hover:bg-[color-mix(in_srgb,var(--color-trust-blue)_6%,white)] hover:text-[var(--color-trust-blue)]"
                : "bg-[var(--neutral-100)] text-[var(--color-sage)]/45 cursor-not-allowed border border-transparent"
            }`}
            aria-label={`Jump to letter ${letter}`}
            title={
              isAvailable
                ? `Jump to ${letter}`
                : `No terms starting with ${letter}`
            }
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
