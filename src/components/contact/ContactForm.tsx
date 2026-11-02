"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useLayoutEffect, useRef, useState, useTransition } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { enquiryOptions, readEnquiry, validateEnquiry, type ContactState, type EnquiryErrors, type EnquiryField } from "@/lib/contact";

type Props = {
  /** CONTACT_FORM_ENDPOINT is set. */
  configured: boolean;
  /** Development build: explain the missing configuration to the developer. */
  isDev: boolean;
};

const FIELD_ORDER: EnquiryField[] = ["fullName", "email", "service", "phone", "message"];

export function ContactForm({ configured, isDev }: Props) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [result, setResult] = useState<ContactState>({ status: "idle" });
  const [pending, startTransition] = useTransition();

  // Production without a configured endpoint: submission is disabled rather than faked.
  const blocked = !configured && !isDev;

  // Preselect the service when arriving from a service page (?service=slug).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && serviceRef.current && enquiryOptions.some((o) => o.value === slug)) serviceRef.current.value = slug;
  }, []);

  // Clear stale result messages when the page is hidden by client navigation.
  useLayoutEffect(() => () => setResult({ status: "idle" }), []);

  function validateField(name: EnquiryField) {
    if (!attempted || !formRef.current) return;
    const all = validateEnquiry(readEnquiry(new FormData(formRef.current)));
    setErrors((prev) => ({ ...prev, [name]: all[name] }));
  }

  function focusFirst(errs: EnquiryErrors) {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (blocked) return;
    setAttempted(true);
    const data = new FormData(e.currentTarget);
    const errs = validateEnquiry(readEnquiry(data));
    setErrors(errs);
    if (Object.keys(errs).length) {
      setResult({ status: "idle" });
      focusFirst(errs);
      return;
    }
    startTransition(async () => {
      const res = await submitEnquiry(data);
      if (res.status === "invalid") {
        setErrors(res.errors);
        focusFirst(res.errors);
      }
      if (res.status === "sent") {
        formRef.current?.reset();
        setAttempted(false);
      }
      setResult(res);
    });
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="rounded-[32px] bg-paper p-6 text-ink shadow-[0_40px_120px_-40px_rgb(8_121_249/0.55)] sm:p-10">
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">Send an enquiry</h2>
      <p className="mt-2 text-[15px] text-ink/60">
        Fields marked <span aria-hidden="true" className="text-cobalt">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {!configured && (
        <div role="note" className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-50 p-4 text-[14px] leading-relaxed text-amber-950">
          {isDev ? (
            <>
              <strong className="font-semibold">Contact sending not configured.</strong> Set <code className="rounded bg-amber-100 px-1">CONTACT_FORM_ENDPOINT</code> in{" "}
              <code className="rounded bg-amber-100 px-1">.env.local</code> to deliver enquiries. Until then, the form validates input but nothing is sent.
            </>
          ) : (
            <>
              <strong className="font-semibold">Online enquiries are not yet available.</strong> This form is not currently connected, so submissions are
              disabled.
            </>
          )}
        </div>
      )}

      <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-8 space-y-5" aria-describedby={errorCount ? `${id}-summary` : undefined}>
        {attempted && errorCount > 0 && (
          <p id={`${id}-summary`} role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] font-medium text-red-800">
            Please correct {errorCount === 1 ? "1 field" : `${errorCount} fields`} below.
          </p>
        )}

        <Field id={id} name="fullName" label="Full name" required error={errors.fullName}>
          {(p) => <input {...p} type="text" autoComplete="name" maxLength={120} onBlur={() => validateField("fullName")} />}
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id} name="email" label="Email" required error={errors.email}>
            {(p) => <input {...p} type="email" autoComplete="email" inputMode="email" maxLength={254} onBlur={() => validateField("email")} />}
          </Field>
          <Field id={id} name="phone" label="Phone (optional)" error={errors.phone}>
            {(p) => <input {...p} type="tel" autoComplete="tel" inputMode="tel" maxLength={24} onBlur={() => validateField("phone")} />}
          </Field>
        </div>

        <Field id={id} name="service" label="Enquiry about" required error={errors.service}>
          {(p) => (
            <div className="relative">
              <select {...p} ref={serviceRef} defaultValue="" onChange={() => validateField("service")} className={`${p.className} appearance-none pr-12`}>
                <option value="" disabled>
                  Choose a service…
                </option>
                {enquiryOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/50">
                <path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </Field>

        <Field id={id} name="message" label="Message" required error={errors.message} hint="Please avoid sharing sensitive personal information.">
          {(p) => <textarea {...p} rows={6} maxLength={4000} onBlur={() => validateField("message")} className={`${p.className} resize-y`} />}
        </Field>

        {/* Honeypot for bots — hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <motion.button
            type="submit"
            disabled={pending || blocked}
            whileTap={blocked ? undefined : { scale: 0.97 }}
            className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-cobalt px-7 py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-[#1a86ff] disabled:cursor-not-allowed disabled:bg-ink/30"
          >
            {pending ? (
              <>
                <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending…
              </>
            ) : (
              <>
                Send enquiry <span aria-hidden="true">→</span>
              </>
            )}
          </motion.button>
        </div>

        <div aria-live="polite" className="min-h-0">
          <AnimatePresence mode="wait">
            {result.status !== "idle" && result.status !== "invalid" && (
              <motion.div
                key={result.status}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`rounded-2xl p-4 text-[15px] leading-relaxed ${
                  result.status === "sent" ? "bg-emerald-50 text-emerald-900" : result.status === "unconfigured" ? "bg-amber-50 text-amber-950" : "bg-red-50 text-red-800"
                }`}
              >
                {result.status === "sent" && <p><strong className="font-semibold">Thank you.</strong> Your enquiry has been sent.</p>}
                {result.status === "unconfigured" && (
                  <p>
                    <strong className="font-semibold">Your message was not sent.</strong> Your details passed validation, but contact sending is not configured
                    in this environment.
                  </p>
                )}
                {result.status === "error" && <p>{result.message}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

type FieldRenderProps = {
  id: string;
  name: EnquiryField;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  className: string;
};

function Field({
  id,
  name,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  name: EnquiryField;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (p: FieldRenderProps) => React.ReactNode;
}) {
  const inputId = `${id}-${name}`;
  const describedBy = [hint ? `${inputId}-hint` : "", error ? `${inputId}-error` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={inputId} className="flex items-baseline gap-1 text-[14px] font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-cobalt">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={`${inputId}-hint`} className="mt-0.5 text-[13px] text-ink/55">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {children({
          id: inputId,
          name,
          "aria-required": required || undefined,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
          className: `block w-full rounded-xl border bg-white px-4 py-3.5 text-[16px] text-ink placeholder:text-ink/35 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4 ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : "border-ink/15 focus:border-cobalt focus:ring-cobalt/15"
          }`,
        })}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-2 flex items-center gap-2 text-[14px] font-medium text-red-700">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 shrink-0">
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M10 6v5m0 3h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
