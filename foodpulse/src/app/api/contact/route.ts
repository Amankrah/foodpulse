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
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // Send email using Resend
    // Uncomment when configured:
    /*
    await resend.emails.send({
      from: `FoodPulse Contact Form <${process.env.RESEND_FROM_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    */

    console.log("Contact form submission:", { name, email, subject });

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
