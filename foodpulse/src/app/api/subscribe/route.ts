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

/**
 * Subscribe endpoint for email-gated guides and other flows.
 * Adds the subscriber to the same ConvertKit form as the main newsletter.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parse = subscribeSchema.safeParse(body);

    if (!parse.success) {
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

    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

    if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
      console.error("ConvertKit credentials not configured");
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

    // Optional: pass custom fields if you've created them in ConvertKit (Settings → Custom fields)
    const fields: Record<string, string> = {};
    if (source) fields.source = source;
    if (slug) fields.guide_slug = slug;
    if (title) fields.guide_title = title;
    if (Object.keys(fields).length > 0) payload.fields = fields;

    const convertkitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await convertkitResponse.json();

    if (!convertkitResponse.ok) {
      if (data.message?.toLowerCase().includes("already subscribed")) {
        return NextResponse.json({ success: true });
      }
      console.error("ConvertKit API error:", data);
      return NextResponse.json(
        { success: false, error: data.message || "Subscription failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
