import type { Metadata } from "next";
import { PhotoBand } from "@/components/visuals/PhotoBand";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { AreasColumns, DetailHero, RelatedServices, ServiceEnquiry } from "@/components/services/ServiceDetail";
import { conditionalNotice, getService, sectors } from "@/lib/content";

const service = getService("regulated-industry-quality");

export const metadata: Metadata = {
  title: service.title,
  description: `${service.summary} ${conditionalNotice}`,
};

export default function Page() {
  return (
    <>
      <DetailHero service={service} variant="split-reverse" titleLines={["Quality & Compliance", "for Regulated", "Industries"]}>
        <Reveal delay={0.45} className="mt-8">
          <p role="note" className="flex max-w-xl gap-3 rounded-2xl border border-cyan/35 bg-cyan/[0.08] p-5 text-[15px] leading-relaxed text-ice">
            <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-cyan" />
            <span>
              <strong className="font-semibold text-white">Conditional scope.</strong> {conditionalNotice}
            </span>
          </p>
          <ul aria-label="Regulated industries named in the company profile" className="mt-6 flex flex-wrap gap-2">
            {sectors.map((s) => (
              <li key={s.key} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                {s.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </DetailHero>
      <PhotoBand src="/images/lab-bench.jpg" alt="Laboratory workbench with a microscope and analytical equipment" height="h-[46svh] min-h-[300px] lg:h-[62svh]" />
      <AreasColumns areas={service.areas} note={conditionalNotice} />
      <section data-nav="dark" className="bg-midnight py-20">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="max-w-2xl font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            See where specialist support may apply across healthcare, pharmaceuticals, biotechnology and medical technology.
          </p>
          <Link href="/industries" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 font-semibold hover:border-cyan">
            Industries <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
      <RelatedServices current={service.slug} light />
      <ServiceEnquiry service={service} note={conditionalNotice} />
    </>
  );
}
