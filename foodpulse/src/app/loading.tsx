import { Section } from "@/components/layout/Section";

export default function Loading() {
  return (
    <Section background="white" padding="xl">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    </Section>
  );
}
