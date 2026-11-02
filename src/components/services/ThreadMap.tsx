"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { services } from "@/lib/content";

/**
 * Themes that recur across the five service lists in the company profile.
 * Each match quotes the exact list item it comes from — nothing is inferred.
 */
const THREADS: { key: string; label: string; match: RegExp }[] = [
  { key: "documentation", label: "Documentation", match: /documentation|documentation of/i },
  { key: "risk", label: "Risk", match: /risk/i },
  { key: "audit", label: "Audit", match: /audit/i },
  { key: "corrective", label: "Corrective action", match: /corrective/i },
  { key: "improvement", label: "Improvement", match: /improvement|optimisation/i },
];

// Pentagon positions in a 400×400 map
const POS = [
  [200, 52],
  [345, 158],
  [290, 330],
  [110, 330],
  [55, 158],
] as const;

export function ThreadMap() {
  const [thread, setThread] = useState(THREADS[0]);
  const hits = services.map((s) => s.areas.filter((a) => thread.match.test(a)));

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div role="group" aria-label="Choose a theme" className="flex flex-wrap gap-2">
          {THREADS.map((t) => {
            const on = t.key === thread.key;
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={on}
                onClick={() => setThread(t)}
                className={`relative min-h-11 rounded-full px-5 text-sm font-semibold transition-colors duration-200 ${on ? "text-white" : "text-ink/70 hover:text-ink"}`}
              >
                {on && <motion.span layoutId="thread-pill" className="absolute inset-0 rounded-full bg-cobalt" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                {!on && <span className="absolute inset-0 rounded-full border border-ink/15" />}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>
        <ul className="mt-10 space-y-5" aria-live="polite">
          {services.map((s, i) =>
            hits[i].length ? (
              <motion.li key={`${thread.key}-${s.slug}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Link href={`/services/${s.slug}`} className="group block">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cobalt">
                    {s.number} · {s.short}
                  </p>
                  {hits[i].map((a) => (
                    <p key={a} className="mt-1 text-[15px] leading-snug text-ink/75 group-hover:text-ink">
                      {a}
                    </p>
                  ))}
                </Link>
              </motion.li>
            ) : null,
          )}
        </ul>
      </div>

      <div className="lg:col-span-7">
        <svg viewBox="-60 0 520 400" className="mx-auto w-full max-w-[560px]" role="img" aria-label={`${thread.label} appears in ${hits.filter((h) => h.length).length} of the five service areas`}>
          <circle cx="200" cy="200" r="150" fill="none" stroke="#10233C" strokeOpacity="0.08" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#10233C" strokeOpacity="0.06" strokeDasharray="3 6" />
          {POS.map(([x, y], i) => (
            <g key={i}>
              <line x1="200" y1="200" x2={x} y2={y} stroke="#10233C" strokeOpacity="0.1" />
              <motion.line
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke="#0879F9"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: hits[i].length ? 1 : 0, opacity: hits[i].length ? 1 : 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
            </g>
          ))}
          <circle cx="200" cy="200" r="46" fill="#10233C" />
          <text x="200" y="205" textAnchor="middle" fill="#F5F9FD" fontSize={thread.label.length > 11 ? 11 : 13} fontWeight="600" fontFamily="var(--font-display-face)">
            {thread.key === "corrective" ? "Corrective" : thread.label}
          </text>
          {POS.map(([x, y], i) => {
            const on = hits[i].length > 0;
            return (
              <g key={`n-${i}`}>
                <motion.circle cx={x} cy={y} initial={false} animate={{ r: on ? 30 : 24 }} fill={on ? "#0879F9" : "#ffffff"} stroke={on ? "#53BEFF" : "#10233C"} strokeOpacity={on ? 1 : 0.15} />
                <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={on ? "#ffffff" : "#10233C"} fontFamily="var(--font-display-face)">
                  {services[i].number}
                </text>
                <text x={x} y={y + (y > 200 ? 50 : -40)} textAnchor="middle" fontSize="11" fill="#10233C" fillOpacity={on ? 0.9 : 0.45} fontFamily="var(--font-body)">
                  {services[i].short}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
