import type { Metadata } from "next";
import { ContactBand } from "@/components/layout/ContactBand";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { ThreadMap } from "@/components/services/ThreadMap";
import { OrbitField } from "@/components/visuals/OrbitField";
import { PhotoBand } from "@/components/visuals/PhotoBand";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "IT consultancy and digital transformation, software quality assurance, regulatory compliance and technology governance, IT risk management, and quality and compliance support for regulated industries.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Entrance: oversized blue-on-midnight word */}
      <section data-nav="dark" className="relative isolate overflow-hidden bg-midnight pt-32 pb-16 lg:pt-40 lg:pb-24">
        <OrbitField className="pointer-events-none absolute -right-60 -top-20 -z-10 w-[820px] opacity-40 lg:-right-20 lg:opacity-60" />
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Services</p>
          <KineticText
            as="h1"
            immediate
            lines={["Consultancy", "& support."]}
            delay={0.1}
            stagger={0.1}
            lineClassNames={["", "text-gradient-line"]}
            className="mt-4 font-display text-[clamp(3.4rem,13vw,11rem)] font-semibold leading-[0.88] tracking-[-0.05em]"
          />
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
            <Reveal delay={0.3}>
              <p className="text-[17px] leading-relaxed text-white/70">{company.overview[1]}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-[15px] leading-relaxed text-white/50">
                The areas listed under each service describe what our services may include.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-nav="dark" className="bg-midnight pb-24 lg:pb-36">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <ServiceExplorer />
        </div>
      </section>

      <PhotoBand
        src="/images/server-cabling.jpg"
        alt="Server racks with neatly routed network cabling"
        lines={["Technology, quality,", "compliance and risk."]}
        eyebrow="Five services"
      />

      {/* Relationship map */}
      <section data-nav="light" className="bg-paper py-24 text-ink lg:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cobalt">How the services connect</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Shared threads across the five services
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink/65">
              Select a theme to see where it appears in each service&apos;s areas of support.
            </p>
          </div>
          <div className="mt-14">
            <ThreadMap />
          </div>
        </div>
      </section>

      <ContactBand lines={["Discuss which service", "fits your needs."]} secondary={{ href: "/quality-compliance", label: "Our quality focus" }} />
    </>
  );
}
