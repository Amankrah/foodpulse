"use client";

import Script from "next/script";

const FORM_ACTION = "https://app.kit.com/forms/6610123/subscriptions";
const FORM_UID = "0bacd8cebd";
const FORM_ID = "6610123";

// Kit form options (after_subscribe message, etc.). Must be valid JSON string.
const DATA_OPTIONS = JSON.stringify({
  settings: {
    after_subscribe: {
      action: "message",
      success_message:
        "Thank you! Now check your email for a surprise gift and let's get acquainted.",
      redirect_url: "",
    },
    analytics: {
      google: null,
      fathom: null,
      facebook: null,
      segment: null,
      pinterest: null,
      sparkloop: null,
      googletagmanager: null,
    },
    powered_by: { show: true, url: "https://kit.com/features/forms" },
    recaptcha: { enabled: false },
    return_visitor: { action: "show", custom_content: "" },
  },
  version: "5",
});

type ConvertKitEmbedProps = {
  /** Optional class for the wrapper (e.g. for footer CTA styling) */
  className?: string;
  /** Hide the "Built with Kit" link */
  hidePoweredBy?: boolean;
};

export function ConvertKitEmbed({ className, hidePoweredBy }: ConvertKitEmbedProps) {
  return (
    <>
      <Script
        src="https://f.convertkit.com/ckjs/ck.5.js"
        strategy="afterInteractive"
      />
      <div className={className}>
        <form
          action={FORM_ACTION}
          className="seva-form formkit-form"
          method="post"
          data-sv-form={FORM_ID}
          data-uid={FORM_UID}
          data-format="inline"
          data-version="5"
          data-options={DATA_OPTIONS}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            border: "1px solid rgba(43, 122, 107, 0.2)",
            maxWidth: 700,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div data-style="minimal" style={{ padding: 20, position: "relative" }}>
            <div
              className="formkit-header"
              data-element="header"
              style={{
                color: "rgb(0, 51, 23)",
                fontSize: 20,
                fontWeight: 700,
                margin: "0 0 27px 0",
                textAlign: "center",
              }}
            >
              <h2>Food Decisions Simplified</h2>
            </div>
            <div
              className="formkit-subheader"
              data-element="subheader"
              style={{
                color: "#245f55",
                fontSize: 17,
                lineHeight: 1.6,
                margin: "18px 0",
                textAlign: "center",
              }}
            >
              <p>
                Cut through the noise with monthly updates featuring honest
                conversations, research-informed perspectives and practical
                insights for your everyday food decisions.
              </p>
            </div>
            <ul
              className="formkit-alert formkit-alert-error"
              data-element="errors"
              data-group="alert"
            />
            <div
              data-element="fields"
              data-stacked="true"
              className="seva-fields formkit-fields"
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: "25px auto 0 auto",
              }}
            >
              <div className="formkit-field" style={{ flex: "1 0 100%", marginBottom: 15 }}>
                <input
                  className="formkit-input"
                  aria-label="Your first name"
                  name="fields[first_name]"
                  placeholder="Your first name"
                  type="text"
                  style={{
                    width: "100%",
                    padding: 12,
                    border: "1px solid rgba(36, 95, 85, 0.25)",
                    borderRadius: 8,
                    fontSize: 15,
                  }}
                />
              </div>
              <div className="formkit-field" style={{ flex: "1 0 100%", marginBottom: 15 }}>
                <input
                  className="formkit-input"
                  name="email_address"
                  aria-label="Email Address"
                  placeholder="Email Address"
                  required
                  type="email"
                  style={{
                    width: "100%",
                    padding: 12,
                    border: "1px solid rgba(36, 95, 85, 0.25)",
                    borderRadius: 8,
                    fontSize: 15,
                  }}
                />
              </div>
              <div style={{ flex: "1 0 100%", marginBottom: 15 }}>
                <button
                  type="submit"
                  data-element="submit"
                  className="formkit-submit"
                  style={{
                    color: "#003317",
                    backgroundColor: "#f2b705",
                    border: 0,
                    borderRadius: 8,
                    fontWeight: 700,
                    padding: "12px 24px",
                    fontSize: 16,
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <span>Join Today</span>
                </button>
              </div>
            </div>
            <div
              className="formkit-guarantee"
              data-element="guarantee"
              style={{
                color: "rgb(65, 65, 65)",
                fontSize: 10,
                margin: "10px 0 15px 0",
                textAlign: "center",
              }}
            >
              <p>No worries, you can unsubscribe at any time.</p>
            </div>
            {!hidePoweredBy && (
              <div
                className="formkit-powered-by-convertkit-container"
                style={{ margin: "10px 0", textAlign: "center" }}
              >
                <a
                  href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"
                  data-element="powered-by"
                  className="formkit-powered-by-convertkit"
                  data-variant="dark"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  style={{ fontSize: 12, color: "#3d3d3d" }}
                >
                  Built with Kit
                </a>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
