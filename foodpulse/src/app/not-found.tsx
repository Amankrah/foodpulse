import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";

export default function NotFound() {
  return (
    <Section background="white" padding="xl">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl lg:text-8xl font-display font-bold text-green-700 mb-4">
          404
        </h1>
        <h2 className="text-3xl lg:text-4xl font-display font-semibold text-neutral-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-neutral-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="/">
            Back to Home
          </Button>
          <Button variant="outline" size="lg" href="/articles">
            Browse Articles
          </Button>
        </div>
      </div>
    </Section>
  );
}
