/**
 * Brand guide §03 — Scientific mode (glossary: definitions, evidence register)
 */
export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-brand-mode="scientific" className="min-w-0">
      {children}
    </div>
  );
}
