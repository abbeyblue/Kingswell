import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { QualityStrip } from "@/components/home/QualityStrip";
import { KineticText } from "@/components/motion/KineticText";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { Reveal } from "@/components/motion/Reveal";
import { ContactBand } from "@/components/layout/ContactBand";
import { Photo } from "@/components/visuals/Photo";
import { PhotoBand } from "@/components/visuals/PhotoBand";
import { company, conditionalNotice, sectors } from "@/lib/content";
import { sectorPhotos } from "@/lib/images";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Service index */}
      <section id="services-index" data-nav="dark" className="relative scroll-mt-24 bg-midnight py-24 lg:py-36">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">What we do</p>
              <KineticText
                lines={["Five areas of", "consultancy and support."]}
                className="mt-5 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
              />
            </div>
            <Reveal className="lg:col-span-5">
              <p className="text-[17px] leading-relaxed text-white/65">
                Supporting organisations in developing reliable IT systems, establishing effective quality management frameworks and implementing
                structured compliance processes.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 lg:mt-20">
            <ServiceIndex />
          </div>
        </div>
      </section>

      <PhotoBand
        src="/images/network-cables.jpg"
        alt="Close-up of blue network cables connected to server ports"
        eyebrow="Our focus"
        lines={["Reliable IT systems.", "Effective quality management.", "Structured compliance."]}
      />

      {/* Editorial about panel */}
      <section data-nav="light" className="relative overflow-hidden bg-paper bg-grid-light py-24 text-ink lg:py-36">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cobalt">About Kingswell Orion</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-ink/70">
              <span className="size-1.5 rounded-full bg-cobalt" aria-hidden="true" />
              {company.location}
            </p>
            <Photo
              src="/images/glass-tower.jpg"
              alt="Looking up at a modern glass tower against a pale sky"
              sizes="(min-width: 1024px) 340px, 100vw"
              className="mt-10 aspect-[16/10] w-full lg:aspect-[3/4]"
            />
          </div>
          <div className="lg:col-span-8">
            <KineticText
              as="h2"
              lines={[
                "Helping businesses improve operational efficiency,",
                "strengthen internal controls, enhance software quality",
                "and maintain compliance.",
              ]}
              stagger={0.04}
              className="font-display text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.12] tracking-[-0.025em]"
              lineClassNames={["", "", "text-cobalt"]}
            />
            <Reveal delay={0.1} className="mt-10 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-2">
              <p className="text-[16px] leading-relaxed text-ink/70">{company.overview[1]}</p>
              <div>
                <p className="text-[16px] leading-relaxed text-ink/70">{company.aim}</p>
                <Link
                  href="/about"
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-cobalt underline-offset-4 hover:underline"
                >
                  More about the company
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quality preview */}
      <section data-nav="dark" className="relative overflow-hidden bg-deep py-24 lg:py-32">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Quality &amp; compliance</p>
              <KineticText
                lines={["Documented. Implemented.", "Monitored. Reviewed."]}
                className="mt-5 font-display text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
              />
            </div>
            <Reveal className="lg:col-span-5">
              <p className="text-[17px] leading-relaxed text-white/65">
                A dedicated focus on quality assurance, regulatory compliance and risk management — supporting quality standards across consultancy
                services, software solutions and internal processes.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 lg:mt-20">
            <QualityStrip />
          </div>
          <Reveal className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-white/50">
              A visual organisation of the company&apos;s stated quality and compliance activities — not a fixed or mandatory workflow.
            </p>
            <MagneticLink href="/quality-compliance" variant="ghost">
              See the full sequence
            </MagneticLink>
          </Reveal>
        </div>
      </section>

      {/* Regulated industries + contact */}
      <section data-nav="light" className="relative bg-paper py-24 text-ink lg:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cobalt">Where specialist support may apply</p>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                Potential regulated-industry applications
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-2 gap-3">
                {sectors.map((s, i) => (
                  <Reveal as="li" key={s.key} delay={i * 0.08} className="group relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-abyss p-5 text-white">
                    <Image
                      src={sectorPhotos[s.key].src}
                      alt={sectorPhotos[s.key].alt}
                      fill
                      sizes="(min-width: 1024px) 340px, 50vw"
                      className="-z-10 object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-abyss via-abyss/40 to-abyss/10" />
                    <span className="rounded-full bg-abyss/75 px-2 py-1 font-display text-xs font-semibold text-cyan backdrop-blur-sm">0{i + 1}</span>
                    <p className="absolute bottom-5 left-5 right-5 font-display text-lg font-semibold tracking-tight sm:text-xl">{s.name}</p>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-6 flex gap-3 rounded-2xl border border-cobalt/25 bg-cobalt/[0.06] p-5 text-[15px] leading-relaxed text-ink/80">
                <span aria-hidden="true" className="mt-1 size-2 shrink-0 rounded-full bg-cobalt" />
                {conditionalNotice}
              </p>
              <Link href="/industries" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-cobalt underline-offset-4 hover:underline">
                About regulated-industry support
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
