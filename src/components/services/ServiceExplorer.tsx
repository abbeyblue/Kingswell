"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { services } from "@/lib/content";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";

/**
 * Desktop: a rail of real links; hover or keyboard focus previews each service on the right.
 * Mobile/tablet: an accordion with explicit buttons — nothing depends on hover.
 */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const current = services[active];

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-12">
        <ul className="relative lg:col-span-6" aria-label="Services">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-describedby={`${baseId}-preview`}
                  className="group relative flex items-center gap-6 rounded-2xl px-6 py-6"
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-rail"
                      className="absolute inset-0 rounded-2xl border border-cyan/30 bg-white/[0.04]"
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className={`relative font-display text-sm font-semibold transition-colors ${isActive ? "text-cyan" : "text-white/40"}`}>{s.number}</span>
                  <span
                    className={`relative font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.02em] transition-colors duration-200 xl:text-[1.85rem] ${
                      isActive ? "text-white" : "text-white/55 group-hover:text-white/80"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span aria-hidden="true" className={`relative ml-auto transition-all duration-300 ${isActive ? "translate-x-0 text-cyan opacity-100" : "-translate-x-2 opacity-0"}`}>
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div id={`${baseId}-preview`} aria-live="polite" className="relative lg:col-span-6">
          <div className="sticky top-28 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-deep to-midnight p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ServiceGlyph slug={current.slug} className="mx-auto w-[64%]" />
                <p className="mt-6 font-display text-sm font-semibold text-cyan">{current.number}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{current.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{current.summary}</p>
                <Link
                  href={`/services/${current.slug}`}
                  tabIndex={-1}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:underline"
                >
                  View service details <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile and tablet */}
      <ul className="space-y-3 lg:hidden">
        {services.map((s, i) => {
          const isOpen = open === i;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <li key={s.slug} className={`overflow-hidden rounded-3xl border transition-colors ${isOpen ? "border-cyan/35 bg-white/[0.04]" : "border-white/10"}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-16 w-full items-center gap-4 px-5 py-5 text-left"
                >
                  <span className={`font-display text-sm font-semibold ${isOpen ? "text-cyan" : "text-white/45"}`}>{s.number}</span>
                  <span className="font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl">{s.title}</span>
                  <motion.span aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }} className="ml-auto text-2xl leading-none text-cyan">
                    +
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="grid gap-5 px-5 pb-6 sm:grid-cols-[1fr_180px] sm:items-center">
                      <div>
                        <p className="text-[15px] leading-relaxed text-white/65">{s.summary}</p>
                        <Link
                          href={`/services/${s.slug}`}
                          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-cobalt px-5 text-sm font-semibold text-white"
                        >
                          View service details <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                      <ServiceGlyph slug={s.slug} className="mx-auto w-40 sm:w-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </>
  );
}
