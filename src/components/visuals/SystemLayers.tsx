"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const LAYERS = ["Technology", "Quality", "Compliance", "Risk"];

/** Abstract stacked system planes that separate as the page scrolls. Illustrative only. */
export function SystemLayers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spread = useTransform(scrollYProgress, [0.1, 0.6], [0.55, 1.25]);

  return (
    <div ref={ref} aria-hidden="true" className={`relative mx-auto aspect-[4/5] w-full max-w-[440px] ${className}`}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(8_121_249/0.28),transparent_65%)]" />
      {LAYERS.map((label, i) => (
        <Plane key={label} label={label} index={i} spread={spread} />
      ))}
    </div>
  );
}

function Plane({ label, index, spread }: { label: string; index: number; spread: MotionValue<number> }) {
  const offset = (index - 1.5) * 92;
  const y = useTransform(spread, (s) => offset * s);
  return (
    <motion.div className="absolute left-1/2 top-1/2 w-[86%]" style={{ y, x: "-50%", translateY: "-50%" }}>
      <svg viewBox="0 0 400 200" className="w-full overflow-visible">
        <defs>
          <linearGradient id={`plane-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#53BEFF" stopOpacity={0.9 - index * 0.12} />
            <stop offset="100%" stopColor="#0879F9" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M200 20 L380 100 L200 180 L20 100 Z" fill="#0B2846" fillOpacity="0.75" stroke={`url(#plane-${index})`} strokeWidth="1.5" />
        <path d="M200 52 L308 100 L200 148 L92 100 Z" fill="none" stroke="#CFE9FA" strokeOpacity="0.15" />
        <circle cx="200" cy="100" r="4" fill="#53BEFF" />
        <line x1="200" y1="100" x2="200" y2="-40" stroke="#53BEFF" strokeOpacity="0.25" strokeDasharray="2 4" />
        <text x="300" y="44" textAnchor="middle" fill="#CFE9FA" fontSize="13" fontFamily="var(--font-body)" letterSpacing="2">
          {label.toUpperCase()}
        </text>
      </svg>
    </motion.div>
  );
}
