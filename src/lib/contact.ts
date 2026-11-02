import { services } from "@/lib/content";

export const enquiryOptions = [
  ...services.map((s) => ({ value: s.slug as string, label: s.title })),
  { value: "general", label: "General enquiry" },
];

export type EnquiryField = "fullName" | "email" | "service" | "phone" | "message";
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;
export type EnquiryValues = Record<EnquiryField, string>;

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: EnquiryErrors }
  | { status: "unconfigured" }
  | { status: "sent" }
  | { status: "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{6,24}$/;

/** Shared by the browser (instant feedback) and the server action (authoritative). */
export function validateEnquiry(v: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = v.fullName.trim();
  if (!name) errors.fullName = "Please enter your full name.";
  else if (name.length < 2 || name.length > 120) errors.fullName = "Name should be between 2 and 120 characters.";

  const email = v.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(email) || email.length > 254) errors.email = "Please enter a valid email address, like name@example.com.";

  if (!enquiryOptions.some((o) => o.value === v.service)) errors.service = "Please choose what your enquiry is about.";

  const phone = v.phone.trim();
  if (phone && !PHONE.test(phone)) errors.phone = "Please enter a valid phone number, or leave this blank.";

  const message = v.message.trim();
  if (!message) errors.message = "Please enter a message.";
  else if (message.length < 20) errors.message = "Please add a little more detail (at least 20 characters).";
  else if (message.length > 4000) errors.message = "Please keep your message under 4,000 characters.";

  return errors;
}

export function readEnquiry(form: FormData): EnquiryValues {
  const get = (k: string) => String(form.get(k) ?? "");
  return { fullName: get("fullName"), email: get("email"), service: get("service"), phone: get("phone"), message: get("message") };
}
