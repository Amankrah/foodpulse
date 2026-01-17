"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { contact } from "@/lib/api";
import { contactSchema } from "@/lib/schemas";
import { Mail, MessageSquare, CheckCircle } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate form data
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const result = await contact.submit(formData);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-green-800">
            Have questions, feedback, or ideas? We'd love to hear from you.
            We typically respond within 24-48 hours.
          </p>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section background="white" padding="lg">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            {!isSuccess ? (
              <Card padding="lg">
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    label="Your Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    fullWidth
                  />

                  <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    icon={<Mail className="h-5 w-5" />}
                    fullWidth
                  />

                  <Input
                    type="text"
                    name="subject"
                    label="Subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    fullWidth
                  />

                  <Textarea
                    name="message"
                    label="Message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    rows={6}
                    fullWidth
                  />

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isLoading}
                    loading={isLoading}
                    fullWidth
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            ) : (
              <Card padding="lg">
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Thank you for reaching out. We'll get back to you within
                    24-48 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <Card padding="md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        Email Us
                      </h3>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-green-700 hover:text-green-600"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>
                </Card>

                {/* General Inquiries */}
                <Card padding="md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        General Inquiries
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        Questions about articles, resources, or the site
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* FAQ */}
            <div className="p-6 bg-green-50 rounded-xl">
              <h3 className="font-semibold text-neutral-900 mb-2">
                Before you contact us...
              </h3>
              <p className="text-neutral-700 text-sm mb-4">
                Check out our FAQ page. Your question might already be answered!
              </p>
              <Button variant="outline" size="sm" href="/resources/faq">
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
