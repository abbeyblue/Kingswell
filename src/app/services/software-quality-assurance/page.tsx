import type { Metadata } from "next";
import { PhotoBand } from "@/components/visuals/PhotoBand";
import { KineticText } from "@/components/motion/KineticText";
import { AreasLedger, DetailHero, RelatedServices, ServiceEnquiry } from "@/components/services/ServiceDetail";
import { getService } from "@/lib/content";

const service = getService("software-quality-assurance");

export const metadata: Metadata = { title: service.title, description: service.summary };

export default function Page() {
  return (
    <>
      <DetailHero service={service} variant="overlay" titleLines={["Software Quality", "Assurance & Quality", "Management"]} />
      <PhotoBand src="/images/circuit-board.jpg" alt="Macro view of components on a green circuit board" height="h-[46svh] min-h-[300px] lg:h-[62svh]" />
      <section data-nav="dark" className="bg-midnight py-24 lg:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Focus</p>
          <KineticText
            as="p"
            lines={["Structured quality assurance", "processes for software", "applications and IT systems."]}
            lineClassNames={["", "text-gradient-line", ""]}
            className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.8vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
          />
        </div>
      </section>
      <AreasLedger areas={service.areas} />
      <RelatedServices current={service.slug} />
      <ServiceEnquiry service={service} />
    </>
  );
}
