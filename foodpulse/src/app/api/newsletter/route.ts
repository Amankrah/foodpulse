import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = newsletterSchema.safeParse(body);

    if (!validationResult.success) {
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

    // Subscribe to ConvertKit
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

    if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
      console.error("ConvertKit credentials not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Newsletter service not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Add subscriber to ConvertKit
    const convertkitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
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
      }
    );

    const convertkitData = await convertkitResponse.json();

    if (!convertkitResponse.ok) {
      console.error("ConvertKit API error:", convertkitData);

      // Check for duplicate subscriber
      if (convertkitData.message?.includes("already subscribed")) {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed to our newsletter!",
        });
      }

      throw new Error(convertkitData.message || "Failed to subscribe");
    }

    console.log("Newsletter subscription successful:", { email, firstName, tags });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to subscribe. Please try again later.",
      },
      { status: 500 }
    );
  }
}
