import Link from "next/link";
import { KineticText } from "@/components/motion/KineticText";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";
import { services, type Service } from "@/lib/content";

/* ---------- Hero ---------- */

type HeroProps = {
  service: Service;
  titleLines: string[];
  variant: "split" | "split-reverse" | "overlay";
  children?: React.ReactNode;
};

export function DetailHero({ service, titleLines, variant, children }: HeroProps) {
  const overlay = variant === "overlay";
  return (
    <section data-nav="dark" className="relative isolate overflow-hidden bg-abyss bg-grid pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_40%,rgb(8_121_249/0.22),transparent_60%)]" />
      {overlay && (
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[min(900px,140vw)] -translate-x-1/2 -translate-y-1/2 opacity-35">
          <ServiceGlyph slug={service.slug} />
        </div>
      )}
      <div className={`mx-auto grid max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:px-10 ${overlay ? "text-center" : "lg:grid-cols-12"}`}>
        <div className={overlay ? "mx-auto max-w-5xl" : variant === "split-reverse" ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}>
          <Reveal y={10}>
            <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${overlay ? "justify-center" : ""}`}>
              <Link href="/services" className="text-white/50 hover:text-white">
                Services
              </Link>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-cyan" aria-current="page">
                {service.number}
              </span>
            </nav>
          </Reveal>
          <KineticText
            as="h1"
            immediate
            lines={titleLines}
            delay={0.1}
            lineClassNames={titleLines.map((_, i) => (i === titleLines.length - 1 ? "text-gradient-line" : ""))}
            className="mt-6 font-display text-[clamp(2.4rem,6.4vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          />
          <Reveal delay={0.35} className={`mt-8 text-[17px] leading-relaxed text-white/70 sm:text-lg ${overlay ? "mx-auto max-w-2xl" : "max-w-xl"}`}>
            <p>{service.summary}</p>
          </Reveal>
          {children}
        </div>
        {!overlay && (
          <Reveal delay={0.2} y={0} className={variant === "split-reverse" ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
            <ServiceGlyph slug={service.slug} className="mx-auto w-full max-w-[460px]" />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- Areas of support: five different compositions ---------- */

function AreasHeader({ light = true, note }: { light?: boolean; note?: string }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-cobalt" : "text-cyan"}`}>Areas of support</p>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">Services may include</h2>
      </div>
      {note && <p className={`max-w-sm text-[15px] ${light ? "text-ink/60" : "text-white/55"}`}>{note}</p>}
    </div>
  );
}

/** Bento: first two items large. */
export function AreasBento({ areas }: { areas: string[] }) {
  return (
    <section data-nav="light" className="bg-paper py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <AreasHeader />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a, i) => (
            <Reveal
              as="li"
              key={a}
              delay={i * 0.07}
              className={`group relative overflow-hidden rounded-[24px] border border-ink/10 bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgb(8_121_249/0.45)] ${
                i < 2 ? "lg:col-span-2 lg:min-h-[240px]" : "lg:min-h-[220px]"
              }`}
            >
              <span className="font-display text-xs font-semibold text-cobalt">{String(i + 1).padStart(2, "0")}</span>
              <p className={`mt-10 font-display font-semibold leading-snug tracking-tight ${i < 2 ? "text-2xl" : "text-lg"}`}>{a}</p>
              <span aria-hidden="true" className="absolute -right-10 -top-10 size-28 rounded-full border border-cobalt/15 transition-transform duration-500 group-hover:scale-125" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Ledger: numbered rows with a check mark, like a review checklist. */
export function AreasLedger({ areas }: { areas: string[] }) {
  return (
    <section data-nav="light" className="bg-paper bg-grid-light py-24 text-ink lg:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <AreasHeader />
          </div>
        </div>
        <ol className="border-t border-ink/12 lg:col-span-8">
          {areas.map((a, i) => (
            <Reveal as="li" key={a} delay={i * 0.06} className="group flex items-center gap-6 border-b border-ink/12 py-6">
              <span className="w-8 font-display text-sm font-semibold text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <p className="flex-1 font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl">{a}</p>
              <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cobalt/30 text-cobalt transition-colors duration-200 group-hover:bg-cobalt group-hover:text-white">
                <svg viewBox="0 0 20 20" className="size-4">
                  <path d="m5 10.5 3.2 3L15 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Register: dark two-column index with reference-style numbering. */
export function AreasRegister({ areas }: { areas: string[] }) {
  return (
    <section data-nav="dark" className="bg-midnight py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <AreasHeader light={false} />
        <ul className="mt-12 grid gap-x-10 md:grid-cols-2">
          {areas.map((a, i) => (
            <Reveal as="li" key={a} delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.05} className="group flex gap-5 border-t border-white/10 py-6">
              <span className="mt-1 rounded-md border border-cyan/30 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[17px] leading-snug text-white/85 transition-colors group-hover:text-white">{a}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Matrix: tiles on a grid with a highlighted diagonal. */
export function AreasMatrix({ areas }: { areas: string[] }) {
  return (
    <section data-nav="light" className="bg-paper py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <AreasHeader />
        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal
              as="li"
              key={a}
              delay={i * 0.06}
              className={`group relative flex min-h-[150px] flex-col justify-between rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 ${
                i % 4 === 0 ? "bg-ink text-paper" : "border border-ink/10 bg-white"
              } ${i === areas.length - 1 && areas.length % 3 === 1 ? "lg:col-span-3" : ""}`}
            >
              <span className={`font-display text-xs font-semibold ${i % 4 === 0 ? "text-cyan" : "text-cobalt"}`}>{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-6 font-display text-lg font-semibold leading-snug tracking-tight">{a}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Columns: plain two-column list for the conditional regulated-industry scope. */
export function AreasColumns({ areas, note }: { areas: string[]; note: string }) {
  return (
    <section data-nav="light" className="bg-paper py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <AreasHeader note={note} />
        <ul className="mt-12 columns-1 gap-10 md:columns-2">
          {areas.map((a, i) => (
            <Reveal as="li" key={a} delay={i * 0.05} className="mb-4 flex break-inside-avoid items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5">
              <span aria-hidden="true" className="mt-2 size-2 shrink-0 rotate-45 bg-cobalt" />
              <p className="text-[16px] font-medium leading-snug">{a}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Scope narrative (only where the profile's own wording supplies the stages) ---------- */

export function ScopeSteps({ eyebrow, title, steps, caption }: { eyebrow: string; title: string; steps: string[]; caption: string }) {
  return (
    <section data-nav="dark" className="relative overflow-hidden bg-deep py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">{eyebrow}</p>
        <KineticText lines={[title]} className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]" />
        <ol className={`mt-14 grid gap-4 sm:grid-cols-2 ${steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {steps.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 0.1} className="relative rounded-[24px] border border-white/10 bg-white/[0.03] p-7">
              <span className="font-display text-[3.5rem] font-semibold leading-none tracking-tight text-white/10">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-6 font-display text-2xl font-semibold tracking-tight">{s}</p>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full bg-cobalt text-xs text-white lg:flex">
                  →
                </span>
              )}
            </Reveal>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-sm text-white/50">{caption}</p>
      </div>
    </section>
  );
}

/* ---------- Related services + enquiry ---------- */

export function RelatedServices({ current, light = false }: { current: Service["slug"]; light?: boolean }) {
  const others = services.filter((s) => s.slug !== current);
  return (
    <section data-nav={light ? "light" : "dark"} className={light ? "bg-paper py-20 text-ink" : "bg-midnight py-20"}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <h2 className={`text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-cobalt" : "text-cyan"}`}>Related services</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className={`group flex h-full flex-col justify-between gap-8 rounded-2xl border p-6 transition-colors duration-200 ${
                  light ? "border-ink/10 bg-white hover:border-cobalt" : "border-white/10 hover:border-cyan/50 hover:bg-white/[0.03]"
                }`}
              >
                <span className={`font-display text-xs font-semibold ${light ? "text-cobalt" : "text-cyan"}`}>{s.number}</span>
                <span className="flex items-end justify-between gap-4">
                  <span className="font-display text-lg font-semibold leading-snug tracking-tight">{s.title}</span>
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceEnquiry({ service, note }: { service: Service; note?: string }) {
  return (
    <section data-nav="dark" className="relative overflow-hidden bg-abyss py-24">
      <div aria-hidden="true" className="absolute -right-32 top-1/2 size-[520px] -translate-y-1/2 rounded-full border border-cyan/15" />
      <div aria-hidden="true" className="absolute -right-10 top-1/2 size-[320px] -translate-y-1/2 rounded-full border border-cobalt/30" />
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Enquire</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Talk to us about {service.short}.
          </h2>
          {note && <p className="mt-5 text-[15px] leading-relaxed text-white/55">{note}</p>}
        </div>
        <MagneticLink href={`/contact?service=${service.slug}`}>Start an enquiry</MagneticLink>
      </div>
    </section>
  );
}
