import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "Learn how FoodPulse collects, uses, and protects your personal information.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 18, 2026";

  return (
    <Section background="white" padding="lg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-green max-w-none">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-neutral-700 mb-4">
              Welcome to {SITE_NAME}. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law protects you.
            </p>
            <p className="text-neutral-700">
              This privacy policy applies to information we collect about you when you use our website,
              subscribe to our newsletter, or otherwise interact with us.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              2.1 Information You Provide to Us
            </h3>
            <p className="text-neutral-700 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6">
              <li>
                <strong>Contact Information:</strong> Name and email address when you subscribe to our newsletter
              </li>
              <li>
                <strong>Communication Data:</strong> Any messages you send us through our contact form
              </li>
              <li>
                <strong>Coaching Inquiries:</strong> Information you provide when inquiring about coaching services
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              2.2 Information Automatically Collected
            </h3>
            <p className="text-neutral-700 mb-4">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6">
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, operating system, IP address
              </li>
              <li>
                <strong>Analytics Data:</strong> We use Google Analytics to understand how visitors use our site
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-neutral-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>Send you our newsletter (if you've subscribed)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and content</li>
              <li>Understand how our website is used and optimize user experience</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-neutral-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold
              certain information. Cookies are files with a small amount of data which may include an
              anonymous unique identifier.
            </p>
            <p className="text-neutral-700 mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
            <p className="text-neutral-700">
              For more information about how we use cookies, please see our{" "}
              <a href="/cookies" className="text-green-600 hover:text-green-700 underline">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          {/* Data Sharing */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              5. How We Share Your Information
            </h2>
            <p className="text-neutral-700 mb-4">
              We do not sell your personal information. We may share your information in the following situations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>
                <strong>Service Providers:</strong> We may share information with third-party service providers
                who perform services on our behalf (e.g., email delivery, analytics)
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information if required by law or in response
                to valid legal requests
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              6. Data Security
            </h2>
            <p className="text-neutral-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
            <p className="text-neutral-700">
              However, please note that no method of transmission over the internet or method of electronic storage
              is 100% secure. While we strive to use commercially acceptable means to protect your personal data,
              we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              7. Your Privacy Rights
            </h2>
            <p className="text-neutral-700 mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-6">
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your data</li>
              <li><strong>Objection:</strong> Object to processing of your data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where we rely on it</li>
            </ul>
            <p className="text-neutral-700">
              To exercise these rights, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:text-green-700 underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          {/* Newsletter */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              8. Newsletter and Email Communications
            </h2>
            <p className="text-neutral-700 mb-4">
              If you subscribe to our newsletter, we will use your email address to send you regular updates
              about food education, nutrition tips, and new content.
            </p>
            <p className="text-neutral-700">
              You can unsubscribe from our newsletter at any time by clicking the "unsubscribe" link at the
              bottom of any email we send you, or by contacting us directly.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              9. Third-Party Links
            </h2>
            <p className="text-neutral-700">
              Our website may contain links to third-party websites. We are not responsible for the privacy
              practices or content of these external sites. We encourage you to read the privacy policies of
              any third-party sites you visit.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              10. Children's Privacy
            </h2>
            <p className="text-neutral-700">
              Our website is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children under 13. If you are a parent or guardian and believe your
              child has provided us with personal information, please contact us.
            </p>
          </section>

          {/* International Transfers */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              11. International Data Transfers
            </h2>
            <p className="text-neutral-700">
              Your information may be transferred to and maintained on computers located outside of your state,
              province, country, or other governmental jurisdiction where data protection laws may differ. We
              will take appropriate steps to ensure your data is treated securely and in accordance with this
              privacy policy.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-neutral-700 mb-4">
              We may update our privacy policy from time to time. We will notify you of any changes by posting
              the new privacy policy on this page and updating the "Last updated" date.
            </p>
            <p className="text-neutral-700">
              We encourage you to review this privacy policy periodically for any changes. Changes to this
              privacy policy are effective when they are posted on this page.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              13. Contact Us
            </h2>
            <p className="text-neutral-700 mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-neutral-900 font-medium mb-2">{SITE_NAME}</p>
              <p className="text-neutral-700">
                Email:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:text-green-700 underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </Section>
  );
}
