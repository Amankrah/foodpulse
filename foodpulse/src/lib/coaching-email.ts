import { CONTACT_EMAIL } from "@/lib/constants";

/**
 * Build a mailto URL. Uses encodeURIComponent (spaces → %20).
 * URLSearchParams uses application/x-www-form-urlencoded (+ for space), which
 * Outlook and some clients leave as literal "+" in the draft subject/body.
 */
export function buildMailtoHref(
  email: string,
  options: { subject?: string; body?: string }
): string {
  const parts: string[] = [];
  if (options.subject != null && options.subject !== "") {
    parts.push(`subject=${encodeURIComponent(options.subject)}`);
  }
  if (options.body != null && options.body !== "") {
    parts.push(`body=${encodeURIComponent(options.body)}`);
  }
  return parts.length === 0
    ? `mailto:${email}`
    : `mailto:${email}?${parts.join("&")}`;
}

export function coachingInquiryMailto(subject: string, body?: string): string {
  return buildMailtoHref(CONTACT_EMAIL, body ? { subject, body } : { subject });
}

/** Pre-filled mailto for visitors who want to say hello before booking (coaching page, final CTA). */
export const COACHING_SOFT_INQUIRY_SUBJECT =
  "FoodPulse coaching: message first";

export const COACHING_SOFT_INQUIRY_BODY = [
  "Hi,",
  "",
  "I'm interested in FoodPulse coaching and I'd like to reach out before booking a session.",
  "",
  "Here's what's on my mind:",
  "",
  "[Add a few sentences about your situation, or what feels unclear. A short note is fine.]",
  "",
  "If helpful for your reply:",
  "• Rough time zone or country:",
  "• Whether you're curious about the Clarity Session, the 3-week focused coaching, mentorship, or you're not sure yet:",
  "",
  "Thank you,",
  "[Your name]",
].join("\n");

export function coachingSoftInquiryMailto(): string {
  return buildMailtoHref(CONTACT_EMAIL, {
    subject: COACHING_SOFT_INQUIRY_SUBJECT,
    body: COACHING_SOFT_INQUIRY_BODY,
  });
}
