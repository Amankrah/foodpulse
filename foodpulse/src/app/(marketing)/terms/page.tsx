import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Use | ${SITE_NAME}`,
  description: "Read the terms and conditions for using FoodPulse.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  const lastUpdated = "January 18, 2026";

  return (
    <Section background="white" padding="lg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
            Terms of Use
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
              1. Agreement to Terms
            </h2>
            <p className="text-neutral-700 mb-4">
              Welcome to {SITE_NAME}. By accessing or using our website at{" "}
              <a href={SITE_URL} className="text-green-600 hover:text-green-700 underline">
                {SITE_URL}
              </a>
              , you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>
            <p className="text-neutral-700">
              If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </section>

          {/* Use License */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              2. Use License
            </h2>
            <p className="text-neutral-700 mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software)
              on {SITE_NAME}'s website for personal, non-commercial transitory viewing only. This is the grant
              of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on our website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            <p className="text-neutral-700">
              This license shall automatically terminate if you violate any of these restrictions and may be
              terminated by {SITE_NAME} at any time.
            </p>
          </section>

          {/* Content Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              3. Content and Medical Disclaimer
            </h2>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              3.1 Educational Purpose Only
            </h3>
            <p className="text-neutral-700 mb-4">
              The content on {SITE_NAME} is provided for educational and informational purposes only. It is not
              intended to be a substitute for professional medical advice, diagnosis, or treatment.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              3.2 Not Medical Advice
            </h3>
            <p className="text-neutral-700 mb-4">
              <strong>Always seek the advice of your physician or other qualified health provider</strong> with any
              questions you may have regarding a medical condition, dietary changes, or nutrition plans. Never
              disregard professional medical advice or delay in seeking it because of something you have read on
              this website.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              3.3 Individual Results May Vary
            </h3>
            <p className="text-neutral-700">
              Any health, nutrition, or dietary information shared on {SITE_NAME} represents our views and opinions.
              Individual results may vary, and what works for one person may not work for another.
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              4. User Responsibilities
            </h2>
            <p className="text-neutral-700 mb-4">
              By using our website, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>Provide accurate and complete information when subscribing or contacting us</li>
              <li>Use the website only for lawful purposes</li>
              <li>Not engage in any activity that interferes with or disrupts the website</li>
              <li>Not attempt to gain unauthorized access to any portion of the website</li>
              <li>Not use automated systems to access the website without our permission</li>
              <li>Respect the intellectual property rights of {SITE_NAME} and others</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              5. Intellectual Property Rights
            </h2>
            <p className="text-neutral-700 mb-4">
              All content on {SITE_NAME}, including but not limited to text, graphics, logos, images, recipes,
              articles, and software, is the property of {SITE_NAME} or its content suppliers and is protected
              by international copyright laws.
            </p>
            <p className="text-neutral-700 mb-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, republish,
              download, store, or transmit any of the material on our website, except as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
              <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use</li>
              <li>You may share links to our content on social media with proper attribution</li>
            </ul>
          </section>

          {/* Recipe Usage */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              6. Recipe and Content Usage
            </h2>
            <p className="text-neutral-700 mb-4">
              If you wish to share or republish our recipes or content:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700">
              <li>You may share a link to the original recipe with a brief excerpt</li>
              <li>You must provide proper attribution to {SITE_NAME}</li>
              <li>You may not copy the full recipe or article without written permission</li>
              <li>Commercial use of our recipes requires written authorization</li>
            </ul>
          </section>

          {/* User Generated Content */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              7. User-Generated Content
            </h2>
            <p className="text-neutral-700 mb-4">
              If we enable features that allow you to submit comments, reviews, or other content ("User Content"),
              you grant {SITE_NAME} a non-exclusive, royalty-free, perpetual, and worldwide license to use,
              reproduce, modify, and display such User Content.
            </p>
            <p className="text-neutral-700">
              You represent and warrant that you own or have the necessary rights to any User Content you submit
              and that such content does not violate any third-party rights.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              8. Third-Party Links and Resources
            </h2>
            <p className="text-neutral-700 mb-4">
              Our website may contain links to third-party websites or services that are not owned or controlled
              by {SITE_NAME}. We have no control over, and assume no responsibility for, the content, privacy
              policies, or practices of any third-party websites or services.
            </p>
            <p className="text-neutral-700">
              We strongly advise you to read the terms and conditions and privacy policies of any third-party
              websites or services that you visit.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              9. Disclaimer of Warranties
            </h2>
            <p className="text-neutral-700 mb-4">
              The materials on {SITE_NAME}'s website are provided on an 'as is' basis. {SITE_NAME} makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of merchantability, fitness for a particular
              purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-neutral-700">
              Further, {SITE_NAME} does not warrant or make any representations concerning the accuracy, likely
              results, or reliability of the use of the materials on its website or otherwise relating to such
              materials or on any sites linked to this site.
            </p>
          </section>

          {/* Limitations of Liability */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              10. Limitations of Liability
            </h2>
            <p className="text-neutral-700 mb-4">
              In no event shall {SITE_NAME} or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on {SITE_NAME}'s website.
            </p>
            <p className="text-neutral-700">
              Some jurisdictions do not allow limitations on implied warranties or limitations of liability for
              consequential or incidental damages. In such jurisdictions, our liability shall be limited to the
              maximum extent permitted by law.
            </p>
          </section>

          {/* Indemnification */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              11. Indemnification
            </h2>
            <p className="text-neutral-700">
              You agree to indemnify, defend, and hold harmless {SITE_NAME}, its officers, directors, employees,
              agents, and third parties, for any losses, costs, liabilities and expenses relating to or arising
              out of your use of or inability to use the website, your violation of these Terms of Use, or your
              violation of any rights of a third party.
            </p>
          </section>

          {/* Modifications */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              12. Modifications to Terms
            </h2>
            <p className="text-neutral-700 mb-4">
              {SITE_NAME} may revise these Terms of Use at any time without notice. By using this website, you
              are agreeing to be bound by the then current version of these Terms of Use.
            </p>
            <p className="text-neutral-700">
              We will indicate the date these terms were last revised at the top of this page. Your continued
              use of the website after any changes constitutes your acceptance of the new Terms of Use.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              13. Termination
            </h2>
            <p className="text-neutral-700">
              We may terminate or suspend your access to our website immediately, without prior notice or
              liability, for any reason whatsoever, including without limitation if you breach the Terms of Use.
              All provisions of the Terms which by their nature should survive termination shall survive
              termination.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              14. Governing Law
            </h2>
            <p className="text-neutral-700">
              These Terms shall be governed and construed in accordance with the laws of your jurisdiction,
              without regard to its conflict of law provisions. Our failure to enforce any right or provision
              of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          {/* Severability */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              15. Severability
            </h2>
            <p className="text-neutral-700">
              If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
              provisions of these Terms will remain in effect.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              16. Contact Information
            </h2>
            <p className="text-neutral-700 mb-4">
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-neutral-900 font-medium mb-2">{SITE_NAME}</p>
              <p className="text-neutral-700">
                Email:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-600 hover:text-green-700 underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-neutral-700">Website: {SITE_URL}</p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="mb-10 bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
            <p className="text-neutral-800 font-medium mb-2">
              By using {SITE_NAME}, you acknowledge that you have read, understood, and agree to be bound by
              these Terms of Use.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
