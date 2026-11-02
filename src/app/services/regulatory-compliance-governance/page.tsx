import type { Metadata } from "next";
import { PhotoBand } from "@/components/visuals/PhotoBand";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { AreasRegister, DetailHero, RelatedServices, ServiceEnquiry } from "@/components/services/ServiceDetail";
import { getService, qualityFunction } from "@/lib/content";

const service = getService("regulatory-compliance-governance");

export const metadata: Metadata = { title: service.title, description: service.summary };

export default function Page() {
  return (
    <>
      <DetailHero service={service} variant="split-reverse" titleLines={["Regulatory Compliance", "& Technology", "Governance"]} />
      <PhotoBand src="/images/glass-curve.jpg" alt="Curved glass building framing a clear sky" height="h-[46svh] min-h-[300px] lg:h-[62svh]" />
      <AreasRegister areas={service.areas} />
      <section data-nav="light" className="bg-paper py-24 text-ink lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cobalt">Our own approach</p>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              Compliance controls that are documented, implemented, monitored and reviewed.
            </h2>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="text-[17px] leading-relaxed text-ink/70">{qualityFunction.responsibility}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {["Documented", "Implemented", "Monitored", "Reviewed"].map((w) => (
                <li key={w} className="rounded-full border border-cobalt/30 bg-white px-4 py-2 text-sm font-semibold text-cobalt">
                  {w}
                </li>
              ))}
            </ul>
            <Link href="/quality-compliance" className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-cobalt hover:underline">
              Our quality &amp; compliance focus <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
      <RelatedServices current={service.slug} />
      <ServiceEnquiry service={service} />
    </>
  );
}
