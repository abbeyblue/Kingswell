import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ContactBand } from "@/components/layout/ContactBand";
import { Reveal } from "@/components/motion/Reveal";
import { SectorArt } from "@/components/visuals/SectorArt";
import { Photo } from "@/components/visuals/Photo";
import { sectorPhotos } from "@/lib/images";
import { conditionalNotice, getService, sectors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: `Where specialist quality and compliance support may apply: healthcare, pharmaceuticals, biotechnology and medical technology. ${conditionalNotice}`,
};

const regulated = getService("regulated-industry-quality");

// Wording kept deliberately general: the profile names these sectors but gives no sector-specific scope.
const sectorLines: Record<(typeof sectors)[number]["key"], string> = {
  healthcare: "Healthcare is named in our company profile as a regulated industry where quality and compliance support may be offered.",
  pharmaceuticals: "Pharmaceuticals is listed among the regulated industries where the company may support organisations with quality and compliance.",
  biotechnology: "Biotechnology appears in our company profile as a regulated industry where specialist support may apply.",
  medtech: "Medical technology is named as a regulated industry where quality and compliance services may be undertaken, subject to the conditions below.",
};

function Notice({ tone }: { tone: "dark" | "light" }) {
  return (
    <p
      role="note"
      className={`flex gap-3 rounded-2xl border p-5 text-[15px] leading-relaxed ${
        tone === "dark" ? "border-cyan/35 bg-cyan/[0.08] text-ice" : "border-cobalt/25 bg-cobalt/[0.06] text-ink/80"
      }`}
    >
      <span aria-hidden="true" className={`mt-1.5 size-2 shrink-0 rounded-full ${tone === "dark" ? "bg-cyan" : "bg-cobalt"}`} />
      <span>
        <strong className="font-semibold">Conditional scope.</strong> {conditionalNotice}
      </span>
    </p>
  );
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        lines={["Where specialist", "support may apply."]}
        accentLine={1}
        layout="stacked"
        intro="Our company profile names four regulated industries where quality and compliance support may be offered, where relevant to the company's actual client services."
      >
        <Reveal delay={0.5} className="mt-10 max-w-2xl">
          <Notice tone="dark" />
        </Reveal>
      </PageHero>

      {/* Sector bands */}
      <section aria-label="Potential regulated-industry applications">
        {sectors.map((s, i) => {
          const dark = i % 2 === 0;
          return (
            <div
              key={s.key}
              data-nav={dark ? "dark" : "light"}
              className={`relative overflow-hidden ${dark ? "bg-midnight text-white" : "bg-paper text-ink"}`}
            >
              <div className="mx-auto grid max-w-[1240px] items-center gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-10 lg:py-28">
                <Reveal className={i % 2 ? "md:order-2" : ""}>
                  <p className={`font-display text-sm font-semibold ${dark ? "text-cyan" : "text-cobalt"}`}>0{i + 1} / 04</p>
                  <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{s.name}</h2>
                  <p className={`mt-6 max-w-md text-[17px] leading-relaxed ${dark ? "text-white/65" : "text-ink/70"}`}>{sectorLines[s.key]}</p>
                </Reveal>
                <div className={`relative ${i % 2 ? "md:order-1" : ""}`}>
                  <Photo
                    src={sectorPhotos[s.key].src}
                    alt={sectorPhotos[s.key].alt}
                    tone="soft"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[4/3] w-full"
                  >
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 w-[44%] max-w-[220px] rounded-2xl border border-white/15 bg-abyss/70 p-2 backdrop-blur-md">
                      <SectorArt sector={s.key} className="aspect-[3/2] w-full" />
                    </div>
                  </Photo>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Potential support areas */}
      <section data-nav="dark" className="bg-deep py-24 lg:py-32">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Potential support</p>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                What specialist services may include
              </h2>
              <Link
                href={`/services/${regulated.slug}`}
                className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 font-semibold hover:border-cyan"
              >
                Regulated-industry service <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {regulated.areas.map((a, i) => (
                <Reveal as="li" key={a} delay={i * 0.05} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[15px] leading-snug text-white/85">
                  {a}
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="mt-14 max-w-3xl">
            <Notice tone="dark" />
          </div>
        </div>
      </section>

      <ContactBand lines={["Working in a", "regulated environment?"]} secondary={{ href: `/services/${regulated.slug}`, label: "View the service" }} />
    </>
  );
}
