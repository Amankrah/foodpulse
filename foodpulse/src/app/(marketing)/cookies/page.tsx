import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE_NAME}`,
  description: "Learn about how FoodPulse uses cookies and similar technologies.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  const lastUpdated = "January 18, 2026";

  return (
    <Section background="white" padding="lg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
            Cookie Policy
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
              1. What Are Cookies?
            </h2>
            <p className="text-neutral-700 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a
              website. They are widely used to make websites work more efficiently and provide information to
              the site owners.
            </p>
            <p className="text-neutral-700">
              This Cookie Policy explains how {SITE_NAME} uses cookies and similar tracking technologies when
              you visit our website, and your choices regarding these technologies.
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              2. Types of Cookies We Use
            </h2>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              2.1 Essential Cookies
            </h3>
            <p className="text-neutral-700 mb-4">
              These cookies are necessary for the website to function and cannot be switched off in our systems.
              They are usually only set in response to actions made by you which amount to a request for services,
              such as setting your privacy preferences or filling in forms.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-neutral-800 font-medium mb-2">Purpose:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-700">
                <li>Enable basic website functionality</li>
                <li>Remember your cookie consent preferences</li>
                <li>Maintain security and prevent fraud</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              2.2 Performance & Analytics Cookies
            </h3>
            <p className="text-neutral-700 mb-4">
              These cookies allow us to count visits and traffic sources so we can measure and improve the
              performance of our site. They help us understand which pages are the most and least popular and
              see how visitors move around the site.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-neutral-800 font-medium mb-2">Purpose:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-700">
                <li>Track website usage and visitor behavior</li>
                <li>Understand how users interact with our content</li>
                <li>Improve website performance and user experience</li>
                <li>Generate analytics reports</li>
              </ul>
              <p className="text-neutral-700 mt-3">
                <strong>Third-party services used:</strong> Google Analytics
              </p>
            </div>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              2.3 Functionality Cookies
            </h3>
            <p className="text-neutral-700 mb-4">
              These cookies enable the website to provide enhanced functionality and personalization. They may
              be set by us or by third-party providers whose services we have added to our pages.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <p className="text-neutral-800 font-medium mb-2">Purpose:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-700">
                <li>Remember your preferences (e.g., language, region)</li>
                <li>Provide personalized content</li>
                <li>Enable social media features</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              2.4 Targeting/Advertising Cookies
            </h3>
            <p className="text-neutral-700 mb-4">
              These cookies may be set through our site by our advertising partners. They may be used to build
              a profile of your interests and show you relevant ads on other sites.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <p className="text-neutral-800 font-medium mb-2">Purpose:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-700">
                <li>Deliver relevant advertisements</li>
                <li>Limit the number of times you see an ad</li>
                <li>Measure the effectiveness of advertising campaigns</li>
              </ul>
              <p className="text-neutral-700 mt-3 text-sm">
                <em>Note: We currently do not use advertising cookies, but this may change in the future.</em>
              </p>
            </div>
          </section>

          {/* Specific Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              3. Specific Cookies We Use
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-neutral-200 text-sm">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="border border-neutral-200 px-4 py-3 text-left font-semibold">
                      Cookie Name
                    </th>
                    <th className="border border-neutral-200 px-4 py-3 text-left font-semibold">
                      Purpose
                    </th>
                    <th className="border border-neutral-200 px-4 py-3 text-left font-semibold">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-200 px-4 py-3">
                      cookie_consent
                    </td>
                    <td className="border border-neutral-200 px-4 py-3">
                      Stores your cookie preferences
                    </td>
                    <td className="border border-neutral-200 px-4 py-3">
                      1 year
                    </td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-200 px-4 py-3">
                      _ga
                    </td>
                    <td className="border border-neutral-200 px-4 py-3">
                      Google Analytics - distinguishes users
                    </td>
                    <td className="border border-neutral-200 px-4 py-3">
                      2 years
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-200 px-4 py-3">
                      _gid
                    </td>
                    <td className="border border-neutral-200 px-4 py-3">
                      Google Analytics - distinguishes users
                    </td>
                    <td className="border border-neutral-200 px-4 py-3">
                      24 hours
                    </td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-200 px-4 py-3">
                      _gat
                    </td>
                    <td className="border border-neutral-200 px-4 py-3">
                      Google Analytics - throttles request rate
                    </td>
                    <td className="border border-neutral-200 px-4 py-3">
                      1 minute
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              4. Third-Party Cookies
            </h2>
            <p className="text-neutral-700 mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report usage
              statistics and deliver advertisements.
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              4.1 Google Analytics
            </h3>
            <p className="text-neutral-700 mb-4">
              We use Google Analytics to collect information about how visitors use our website. This helps us
              understand which content is popular and how we can improve our site.
            </p>
            <p className="text-neutral-700 mb-4">
              Google Analytics uses cookies to collect information such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-700 mb-4">
              <li>The pages you visit</li>
              <li>How long you spend on each page</li>
              <li>How you arrived at our site</li>
              <li>What you click on while visiting our site</li>
            </ul>
            <p className="text-neutral-700 mb-4">
              This information is anonymous and cannot be used to identify you personally. For more information
              on how Google uses data, visit{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 underline"
              >
                Google&apos;s Privacy & Terms
              </a>
              .
            </p>
            <p className="text-neutral-700">
              You can opt out of Google Analytics by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          {/* Managing Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              5. How to Control Cookies
            </h2>
            <p className="text-neutral-700 mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie
              preferences by:
            </p>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              5.1 Browser Settings
            </h3>
            <p className="text-neutral-700 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, if
              you limit the ability of websites to set cookies, you may worsen your overall user experience.
            </p>
            <div className="bg-neutral-50 p-6 rounded-lg mb-6">
              <p className="text-neutral-800 font-medium mb-3">Browser-specific instructions:</p>
              <ul className="space-y-2 text-neutral-700">
                <li>
                  <strong>Chrome:</strong>{" "}
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    Cookie settings in Chrome
                  </a>
                </li>
                <li>
                  <strong>Firefox:</strong>{" "}
                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    Cookie settings in Firefox
                  </a>
                </li>
                <li>
                  <strong>Safari:</strong>{" "}
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    Cookie settings in Safari
                  </a>
                </li>
                <li>
                  <strong>Edge:</strong>{" "}
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    Cookie settings in Edge
                  </a>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-neutral-800 mb-3">
              5.2 Cookie Consent Tool
            </h3>
            <p className="text-neutral-700">
              When you first visit our website, you&apos;ll see a cookie consent banner. You can manage your
              preferences through this banner or update them at any time.
            </p>
          </section>

          {/* Do Not Track */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              6. Do Not Track Signals
            </h2>
            <p className="text-neutral-700">
              Some browsers have a &quot;Do Not Track&quot; feature that lets you tell websites that you do not want to
              have your online activities tracked. At this time, we do not respond to browser &quot;Do Not Track&quot;
              signals. We will honor your cookie preferences as set through our cookie consent tool or your
              browser settings.
            </p>
          </section>

          {/* Updates */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              7. Changes to This Cookie Policy
            </h2>
            <p className="text-neutral-700 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for
              other operational, legal, or regulatory reasons.
            </p>
            <p className="text-neutral-700">
              We encourage you to review this Cookie Policy periodically to stay informed about how we use
              cookies. The &quot;Last updated&quot; date at the top of this page indicates when this policy was last
              revised.
            </p>
          </section>

          {/* More Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              8. More Information
            </h2>
            <p className="text-neutral-700 mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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

          {/* Related Policies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              9. Related Policies
            </h2>
            <p className="text-neutral-700 mb-4">
              For more information about how we handle your data, please see:
            </p>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-green-600 hover:text-green-700 underline font-medium">
                  Privacy Policy →
                </a>
              </li>
              <li>
                <a href="/terms" className="text-green-600 hover:text-green-700 underline font-medium">
                  Terms of Use →
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </Section>
  );
}
