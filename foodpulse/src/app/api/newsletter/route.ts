import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas";

const isDev = process.env.NODE_ENV === "development";

export async function POST(request: NextRequest) {
  console.log("[Newsletter API] POST received");
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = newsletterSchema.safeParse(body);

    if (!validationResult.success) {
      console.log("[Newsletter API] Validation failed:", validationResult.error.issues);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { email, firstName, tags } = validationResult.data;
    console.log("[Newsletter API] Valid payload:", { email: email?.slice(0, 3) + "***", hasFirstName: !!firstName, tags });

    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

    if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
      console.error("[Newsletter API] ConvertKit not configured:", {
        hasApiKey: !!CONVERTKIT_API_KEY,
        hasFormId: !!CONVERTKIT_FORM_ID,
        formId: CONVERTKIT_FORM_ID || "(missing)",
      });
      return NextResponse.json(
        {
          success: false,
          message: "Newsletter service not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    const convertkitUrl = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;
    console.log("[Newsletter API] Calling ConvertKit:", convertkitUrl);

    const convertkitResponse = await fetch(convertkitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email,
        first_name: firstName || undefined,
        tags: tags || [],
      }),
    });

    const convertkitData = await convertkitResponse.json();
    console.log("[Newsletter API] ConvertKit response:", {
      status: convertkitResponse.status,
      ok: convertkitResponse.ok,
      body: convertkitData,
    });

    if (!convertkitResponse.ok) {
      console.error("[Newsletter API] ConvertKit API error:", convertkitData);

      if (convertkitData.message?.includes("already subscribed")) {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed to our newsletter!",
        });
      }

      const errMessage = convertkitData.message || "Failed to subscribe";
      return NextResponse.json(
        {
          success: false,
          message: isDev ? errMessage : "Failed to subscribe. Please try again later.",
        },
        { status: 500 }
      );
    }

    console.log("[Newsletter API] Subscription successful:", { email: email?.slice(0, 3) + "***" });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("[Newsletter API] Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: isDev ? message : "Failed to subscribe. Please try again later.",
      },
      { status: 500 }
    );
  }
}
