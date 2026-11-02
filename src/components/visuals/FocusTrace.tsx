"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const STEPS = ["Documented", "Implemented", "Monitored", "Reviewed"];

/** A connecting line traces through the four words as the section scrolls. */
export function FocusTrace() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });

  return (
    <ol ref={ref} className="relative grid gap-10 pl-10 lg:grid-cols-4 lg:gap-6 lg:pl-0 lg:pt-14">
      {/* vertical track (mobile) */}
      <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-white/12 lg:hidden" />
      <motion.span aria-hidden="true" style={{ scaleY: scrollYProgress }} className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-cyan lg:hidden" />
      {/* horizontal track (desktop) */}
      <span aria-hidden="true" className="absolute left-0 right-0 top-[11px] hidden h-px bg-white/12 lg:block" />
      <motion.span aria-hidden="true" style={{ scaleX: scrollYProgress }} className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-gradient-to-r from-cobalt to-cyan lg:block" />
      {STEPS.map((word, i) => (
        <Step key={word} word={word} index={i} progress={scrollYProgress} />
      ))}
    </ol>
  );
}

function Step({ word, index, progress }: { word: string; index: number; progress: MotionValue<number> }) {
  const at = index / (STEPS.length - 1);
  const opacity = useTransform(progress, [Math.max(0, at - 0.25), at], [0.25, 1]);
  const scale = useTransform(progress, [Math.max(0, at - 0.05), at], [0.6, 1]);
  return (
    <li className="relative">
      <motion.span
        aria-hidden="true"
        style={{ scale }}
        className="absolute -left-10 top-1 size-[23px] rounded-full border-2 border-cyan bg-abyss shadow-[0_0_24px_rgb(83_190_255/0.6)] lg:-top-14 lg:left-0"
      />
      <motion.p style={{ opacity }} className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold tracking-[-0.03em]">
        {word}
      </motion.p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan/80">0{index + 1}</p>
    </li>
  );
}
