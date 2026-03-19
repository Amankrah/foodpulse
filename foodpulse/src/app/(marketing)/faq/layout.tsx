/**
 * Brand guide §03 — Scientific mode (Q&A / citation-friendly content)
 */
export default function FaqLayout({
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
