import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/shared/StructuredData";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data for Organization and Website */}
      <StructuredData type="organization" />
      <StructuredData type="website" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
}
