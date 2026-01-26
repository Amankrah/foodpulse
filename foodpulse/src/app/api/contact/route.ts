import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas";
import { CONTACT_EMAIL } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = contactSchema.safeParse(body);

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

    const { name, email, subject, message } = validationResult.data;

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      console.error("Resend credentials not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Email service not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Send email using Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>

            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">${name}</p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                <p style="margin: 0; font-size: 16px; color: #111827;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
                <p style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">${subject}</p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                <div style="color: #374151; font-size: 15px; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>

            <div style="margin-top: 20px; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">This email was sent from the FoodPulse contact form</p>
              <p style="margin: 10px 0 0 0;">Reply directly to this email to respond to ${name}</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Contact form submission sent successfully:", { name, email, subject });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
