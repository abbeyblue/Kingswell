"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { qualityStages } from "@/lib/content";

/** Eight-stage preview of the quality activities, drawn as the section scrolls into view. */
export function QualityStrip() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 lg:grid-cols-8 lg:gap-0">
      <span aria-hidden="true" className="absolute left-0 right-0 top-[19px] hidden h-px bg-white/12 lg:block" />
      <motion.span aria-hidden="true" style={{ scaleX: scale }} className="absolute left-0 right-0 top-[19px] hidden h-px origin-left bg-gradient-to-r from-cobalt via-cyan to-ice lg:block" />
      {qualityStages.map((stage, i) => (
        <motion.li
          key={stage.label}
          className="relative lg:pr-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="relative flex size-10 items-center justify-center rounded-full border border-cyan/40 bg-abyss font-display text-sm font-semibold text-cyan">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-4 font-display text-base font-semibold tracking-tight text-white">{stage.label}</p>
          <p className="mt-1 text-sm leading-snug text-white/55">{stage.title}</p>
        </motion.li>
      ))}
    </ol>
  );
}
