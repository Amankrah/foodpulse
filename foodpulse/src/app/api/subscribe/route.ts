import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  firstName: z.string().optional(),
  source: z.string().optional(),
  guideSlug: z.string().optional(),
  guideTitle: z.string().optional(),
  metadata: z
    .object({
      guideTitle: z.string().optional(),
      guideSlug: z.string().optional(),
    })
    .optional(),
});

const isDev = process.env.NODE_ENV === "development";

/**
 * Subscribe endpoint for email-gated guides and other flows.
 * Adds the subscriber to the same ConvertKit form as the main newsletter.
 */
export async function POST(request: NextRequest) {
  console.log("[Subscribe API] POST received");
  try {
    const body = await request.json();
    const parse = subscribeSchema.safeParse(body);

    if (!parse.success) {
      console.log("[Subscribe API] Validation failed:", parse.error.issues);
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const {
      email,
      firstName,
      source,
      guideSlug,
      guideTitle,
      metadata,
    } = parse.data;
    const slug = guideSlug ?? metadata?.guideSlug;
    const title = guideTitle ?? metadata?.guideTitle;
    console.log("[Subscribe API] Valid payload:", { email: email?.slice(0, 3) + "***", source, guideSlug: slug });

    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

    if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
      console.error("[Subscribe API] ConvertKit not configured:", {
        hasApiKey: !!CONVERTKIT_API_KEY,
        hasFormId: !!CONVERTKIT_FORM_ID,
        formId: CONVERTKIT_FORM_ID || "(missing)",
      });
      return NextResponse.json(
        { success: false, error: "Newsletter service not configured." },
        { status: 500 }
      );
    }

    const payload: Record<string, unknown> = {
      api_key: CONVERTKIT_API_KEY,
      email,
      first_name: firstName || undefined,
    };

    const fields: Record<string, string> = {};
    if (source) fields.source = source;
    if (slug) fields.guide_slug = slug;
    if (title) fields.guide_title = title;
    if (Object.keys(fields).length > 0) payload.fields = fields;

    const convertkitUrl = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;
    console.log("[Subscribe API] Calling ConvertKit:", convertkitUrl);

    const convertkitResponse = await fetch(convertkitUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await convertkitResponse.json();
    console.log("[Subscribe API] ConvertKit response:", {
      status: convertkitResponse.status,
      ok: convertkitResponse.ok,
      body: data,
    });

    if (!convertkitResponse.ok) {
      if (data.message?.toLowerCase().includes("already subscribed")) {
        return NextResponse.json({ success: true });
      }
      console.error("[Subscribe API] ConvertKit API error:", data);
      const errMessage = data.message || "Subscription failed";
      return NextResponse.json(
        { success: false, error: isDev ? errMessage : "Subscription failed. Please try again." },
        { status: 500 }
      );
    }

    console.log("[Subscribe API] Subscription successful");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Subscribe API] Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: isDev ? message : "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
