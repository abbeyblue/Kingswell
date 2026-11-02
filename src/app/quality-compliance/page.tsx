import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactBand } from "@/components/layout/ContactBand";
import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";
import { QualityTimeline } from "@/components/quality/QualityTimeline";
import { OrbitField } from "@/components/visuals/OrbitField";
import { PhotoBand } from "@/components/visuals/PhotoBand";
import { company, qualityFunction } from "@/lib/content";

export const metadata: Metadata = {
  title: "Quality & Compliance",
  description: qualityFunction.intro,
};

export default function QualityCompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & Compliance"
        lines={["Quality assurance,", "regulatory compliance", "and risk management."]}
        accentLine={1}
        intro={qualityFunction.intro}
        visual={<OrbitField interactive className="mx-auto w-full max-w-[460px]" />}
      />

      {/* Timeline */}
      <section data-nav="light" className="bg-paper py-24 text-ink lg:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cobalt">Quality and compliance activities</p>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
                From requirements to continuous improvement
              </h2>
            </div>
            <p role="note" className="rounded-2xl border border-ink/10 bg-white p-5 text-[14px] leading-relaxed text-ink/65 lg:col-span-5">
              This sequence is a visual organisation of the quality and compliance activities stated in our company profile. It is not an official or
              mandatory workflow.
            </p>
          </div>
          <div className="mt-16">
            <QualityTimeline />
          </div>
        </div>
      </section>

      <PhotoBand src="/images/circuit-blue.jpg" alt="Circuit board and wiring lit in blue" height="h-[48svh] min-h-[320px] lg:h-[60svh]" />

      {/* What the profile says */}
      <section data-nav="dark" className="relative overflow-hidden bg-midnight py-24 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">The quality function</p>
              <KineticText
                lines={["Documented, implemented,", "monitored and reviewed."]}
                lineClassNames={["", "text-gradient-line"]}
                className="mt-5 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
              />
            </div>
            <Reveal className="space-y-5 text-[17px] leading-relaxed text-white/65 lg:col-span-6">
              <p>{qualityFunction.scope}</p>
              <p>{qualityFunction.responsibility}</p>
            </Reveal>
          </div>

          <div className="mt-20">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">The company&apos;s quality and compliance activities include</h3>
            <ol className="mt-8 grid gap-x-10 md:grid-cols-2">
              {qualityFunction.activities.map((a, i) => (
                <Reveal as="li" key={a} delay={(i % 2) * 0.06} className="flex gap-5 border-t border-white/10 py-5">
                  <span className="font-display text-sm font-semibold text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] leading-snug text-white/85">{a}.</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section data-nav="light" className="bg-paper bg-grid-light py-24 text-ink lg:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cobalt lg:col-span-3">Commitment to quality and compliance</p>
          <div className="space-y-8 lg:col-span-9">
            {company.commitment.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] tracking-[-0.02em]" : "text-[17px] leading-relaxed text-ink/70"}>
                  {c}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactBand lines={["Discuss your quality", "and compliance needs."]} />
    </>
  );
}
