import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { newsletterSchema } from "@/lib/schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

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
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, firstName, tags } = validationResult.data;

    // TODO: Add to your email service provider (Resend, Mailchimp, ConvertKit, etc.)
    // This is a placeholder implementation

    // Example with Resend (uncomment when configured):
    /*
    await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });
    */

    console.log("Newsletter subscription:", { email, firstName, tags });

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
