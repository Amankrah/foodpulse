import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { NewsletterLive } from "./NewsletterLive";

export const metadata: Metadata = {
  title: `Newsletter`,
  description: `${SITE_NAME} newsletter: one honest conversation about food each month (12 issues a year). Grounded in real life, evidence when it matters, and you can reply.`,
};

export default function NewsletterPage() {
  return <NewsletterLive />;
}
