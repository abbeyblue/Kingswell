import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactBand } from "@/components/layout/ContactBand";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";
import { FocusTrace } from "@/components/visuals/FocusTrace";
import { SystemLayers } from "@/components/visuals/SystemLayers";
import { Photo } from "@/components/visuals/Photo";
import { company, qualityFunction } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: company.overview[0],
};

// Focus areas, each phrased from the company overview (not formal corporate values).
const focusAreas = [
  {
    title: "Quality",
    text: "Establishing effective quality management frameworks and enhancing software quality.",
  },
  {
    title: "Compliance",
    text: "Implementing structured compliance processes and maintaining compliance with applicable industry standards and regulatory requirements.",
  },
  {
    title: "Technology risk",
    text: "Strengthening internal controls and helping businesses identify, assess and manage operational and technology-related risks.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Kingswell Orion"
        lines={["Professional standards.", "Effective quality.", "Responsible practice."]}
        accentLine={1}
        intro={company.commitment[0]}
        visual={<SystemLayers />}
      />

      {/* Overview manifesto */}
      <section data-nav="light" className="bg-paper py-24 text-ink lg:py-36">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cobalt">Company overview</p>
          <KineticText
            lines={[company.overview[0]]}
            stagger={0.025}
            className="mt-8 max-w-[1080px] font-display text-[clamp(1.6rem,3.3vw,2.85rem)] font-semibold leading-[1.18] tracking-[-0.025em]"
          />
          <Photo
            src="/images/glass-facade.jpg"
            alt="Angular blue glass facade of a modern building"
            sizes="(min-width: 1240px) 1160px, 100vw"
            className="mt-14 aspect-[16/9] w-full sm:aspect-[21/9] lg:mt-20"
          />
          <div className="mt-14 grid gap-10 border-t border-ink/10 pt-10 md:grid-cols-2">
            <Reveal>
              <p className="text-[17px] leading-relaxed text-ink/70">{company.overview[1]}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[17px] leading-relaxed text-ink/70">{company.overview[2]}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How we focus our work */}
      <section data-nav="dark" className="relative overflow-hidden bg-midnight py-24 lg:py-36">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">How we focus our work</p>
              <KineticText
                lines={["Controls that are", "documented, implemented,", "monitored and reviewed."]}
                className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
              />
            </div>
            <Reveal className="space-y-5 text-[17px] leading-relaxed text-white/65 lg:col-span-5 lg:col-start-8 lg:pt-10">
              <p>{qualityFunction.intro}</p>
              <p>{qualityFunction.responsibility}</p>
            </Reveal>
          </div>
          <div className="mt-20">
            <FocusTrace />
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section data-nav="light" className="bg-paper bg-grid-light py-24 text-ink lg:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cobalt">Our focus</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">Three areas of focus</h2>
            </div>
            <p className="max-w-sm text-[15px] text-ink/60">Areas of focus drawn from the company overview.</p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-ink/10 bg-ink/10 md:grid-cols-3">
            {focusAreas.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.12} className="group relative bg-white p-8 lg:p-10">
                <span className="font-display text-sm font-semibold text-cobalt">0{i + 1}</span>
                <h3 className="mt-16 font-display text-2xl font-semibold tracking-tight lg:mt-24 lg:text-[1.75rem]">{f.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{f.text}</p>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-cobalt transition-transform duration-300 group-hover:scale-x-100" />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What we aim to deliver */}
      <section data-nav="dark" className="relative overflow-hidden bg-deep py-24 lg:py-36">
        <div aria-hidden="true" className="absolute -left-40 top-1/2 size-[640px] -translate-y-1/2 rounded-full border border-cyan/10" />
        <div aria-hidden="true" className="absolute -left-20 top-1/2 size-[440px] -translate-y-1/2 rounded-full border border-cobalt/20" />
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan lg:col-span-3">What we aim to deliver</p>
          <div className="lg:col-span-9">
            <blockquote>
              <KineticText
                as="p"
                lines={[company.aim]}
                stagger={0.03}
                className="font-display text-[clamp(1.6rem,3.3vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white"
              />
            </blockquote>
            <Reveal className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
              <p className="text-[16px] leading-relaxed text-white/60">{company.commitment[1]}</p>
              <p className="text-[16px] leading-relaxed text-white/60">{company.commitment[2]}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactBand lines={["Explore how we", "can support you."]} />
    </>
  );
}
