"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { qualityFunction, qualityStages } from "@/lib/content";

/**
 * Scroll-driven visual organisation of the quality activities listed in the company profile.
 * Desktop: sticky dark stage with clickable step navigation. Mobile: vertical timeline that
 * highlights the step in view. No scroll-jacking.
 */
export function QualityTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function goTo(i: number) {
    const el = document.getElementById(`stage-${i}`);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    el.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
  }

  const stage = qualityStages[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Sticky stage (desktop) */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 overflow-hidden rounded-[32px] bg-abyss p-10 text-white shadow-[0_40px_80px_-40px_rgb(6_19_36/0.8)]">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Stage</p>
              <ProgressRing progress={progress} />
            </div>
            <div className="mt-6 h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-display text-[5.5rem] font-semibold leading-none tracking-[-0.05em] text-gradient">{String(active + 1).padStart(2, "0")}</p>
                  <p className="mt-3 font-display text-2xl font-semibold tracking-tight">{stage.label}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <nav aria-label="Quality stages" className="mt-6 border-t border-white/10 pt-6">
              <ol className="grid grid-cols-2 gap-1">
                {qualityStages.map((s, i) => (
                  <li key={s.label}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? "step" : undefined}
                      className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                        i === active ? "text-white" : "text-white/50 hover:text-white/85"
                      }`}
                    >
                      {i === active && (
                        <motion.span layoutId="stage-pill" className="absolute inset-0 rounded-xl bg-white/[0.08]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                      )}
                      <span className="relative font-display text-xs font-semibold text-cyan">{String(i + 1).padStart(2, "0")}</span>
                      <span className="relative">{s.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol ref={listRef} className="relative pl-12 lg:col-span-7 lg:pl-16">
        <span aria-hidden="true" className="absolute bottom-0 left-[15px] top-0 w-[2px] rounded bg-ink/10 lg:left-[23px]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-[15px] top-0 w-[2px] origin-top rounded bg-gradient-to-b from-cobalt to-cyan lg:left-[23px]"
        />
        {qualityStages.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.label} id={`stage-${i}`} data-step={i} className="relative scroll-mt-32 py-10 lg:min-h-[40vh] lg:py-14">
              <span
                aria-hidden="true"
                className={`absolute -left-12 top-11 flex size-8 items-center justify-center rounded-full border-2 font-display text-[11px] font-bold transition-all duration-300 lg:-left-16 lg:top-[68px] lg:size-12 lg:text-sm ${
                  on ? "border-cobalt bg-cobalt text-white shadow-[0_0_0_8px_rgb(8_121_249/0.12)]" : "border-ink/15 bg-paper text-ink/45"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] transition-colors ${on ? "text-cobalt" : "text-ink/40"}`}>{s.label}</p>
              <h3 tabIndex={-1} className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] outline-none">
                {s.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {s.activities.map((a) => (
                  <li
                    key={a}
                    className={`rounded-2xl border p-5 text-[16px] leading-relaxed transition-all duration-300 ${
                      on ? "border-cobalt/25 bg-white text-ink shadow-[0_18px_40px_-28px_rgb(8_121_249/0.6)]" : "border-ink/10 bg-white/50 text-ink/60"
                    }`}
                  >
                    <span className="mr-2 font-display text-xs font-semibold text-cobalt">Activity {a + 1}</span>
                    {qualityFunction.activities[a]}.
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProgressRing({ progress }: { progress: ReturnType<typeof useSpring> }) {
  return (
    <svg viewBox="0 0 40 40" className="size-11 -rotate-90" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="3" />
      <motion.circle cx="20" cy="20" r="16" fill="none" stroke="#53BEFF" strokeWidth="3" strokeLinecap="round" style={{ pathLength: progress }} />
    </svg>
  );
}
