import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";
import { OrbitField } from "@/components/visuals/OrbitField";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send an enquiry to Kingswell Orion Ltd, an Ireland-based IT consultancy, software quality assurance and regulatory compliance company.",
};

export default function ContactPage() {
  // Read at build/render time. Set the variable before building for production.
  const configured = Boolean(process.env.CONTACT_FORM_ENDPOINT);
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <section data-nav="dark" className="relative isolate overflow-hidden bg-abyss pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_60%,rgb(8_121_249/0.3),transparent_55%)]" />
      <OrbitField interactive className="pointer-events-none absolute -left-[30%] top-[38%] -z-10 w-[720px] opacity-45 sm:-left-[12%] lg:-left-[10%] lg:top-[30%] lg:w-[820px] lg:opacity-70" />

      <div className="mx-auto grid max-w-[1240px] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal y={10}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Contact</p>
          </Reveal>
          <KineticText
            as="h1"
            immediate
            lines={["Discuss your", "requirements."]}
            delay={0.1}
            lineClassNames={["", "text-gradient-line"]}
            className="mt-6 font-display text-[clamp(2.6rem,5vw,4.1rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          />
          <Reveal delay={0.35} className="mt-8 max-w-md space-y-6">
            <p className="text-[17px] leading-relaxed text-white/70">
              Use the form to send an enquiry about IT consultancy, software quality assurance, regulatory compliance, IT risk management or
              regulated-industry quality support.
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ice">
              <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
              {company.name} · {company.location}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-7">
          <ContactForm configured={configured} isDev={isDev} />
        </Reveal>
      </div>
    </section>
  );
}
