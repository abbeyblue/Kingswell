"use server";

import { enquiryOptions, readEnquiry, validateEnquiry, type ContactState } from "@/lib/contact";

/**
 * Sends an enquiry to CONTACT_FORM_ENDPOINT (JSON POST) when configured.
 * Without that variable nothing is sent, and the form is told so — it never reports a false success.
 */
export async function submitEnquiry(form: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(form.get("website") ?? "").trim()) {
    return { status: "error", message: "Your enquiry could not be processed." };
  }

  const values = readEnquiry(form);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) return { status: "unconfigured" };

  const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
  if (process.env.CONTACT_FORM_TOKEN) headers.Authorization = `Bearer ${process.env.CONTACT_FORM_TOKEN}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        service: enquiryOptions.find((o) => o.value === values.service)?.label ?? values.service,
        phone: values.phone.trim() || undefined,
        message: values.message.trim(),
        source: "kingswell-orion-website",
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[contact] endpoint responded ${res.status}`);
      return { status: "error", message: "Your enquiry could not be sent right now. Please try again later." };
    }
    return { status: "sent" };
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return { status: "error", message: "Your enquiry could not be sent right now. Please try again later." };
  }
}
