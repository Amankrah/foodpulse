/**
 * Brand guide §03 — Scientific mode (calculators & data tools)
 */
export default function ToolsLayout({
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
