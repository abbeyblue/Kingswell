"use client";

import { useInView } from "motion/react";
import { useId, useRef } from "react";
import type { ServiceSlug } from "@/lib/content";

/** Abstract, illustrative line-work — one per service. Not depictions of real systems or work. */
export function ServiceGlyph({ slug, className = "" }: { slug: ServiceSlug; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "80px" });
  const uid = useId().replace(/:/g, "");
  const Art = ART[slug];
  return (
    <div ref={ref} data-paused={!inView} aria-hidden="true" className={`relative aspect-square ${className}`}>
      <svg viewBox="0 0 400 400" className="size-full overflow-visible">
        <defs>
          <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#CFE9FA" />
            <stop offset="55%" stopColor="#53BEFF" />
            <stop offset="100%" stopColor="#0879F9" />
          </linearGradient>
          <radialGradient id={`r-${uid}`}>
            <stop offset="0%" stopColor="#53BEFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#061324" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill={`url(#r-${uid})`} />
        <Art g={`url(#g-${uid})`} />
      </svg>
    </div>
  );
}

type ArtProps = { g: string };

// 01 — systems connected through a central hub: integration and transformation
function Network({ g }: ArtProps) {
  const nodes = [
    [200, 200, 16], [92, 110, 7], [312, 96, 9], [336, 236, 7], [262, 322, 8], [112, 300, 9], [62, 206, 6], [200, 58, 6],
  ] as const;
  return (
    <g>
      {nodes.slice(1).map(([x, y], i) => (
        <g key={i}>
          <line x1="200" y1="200" x2={x} y2={y} stroke="#53BEFF" strokeOpacity="0.25" />
          <line x1="200" y1="200" x2={x} y2={y} stroke={g} strokeWidth="1.6" className="dash-flow" style={{ animationDelay: `${i * -0.5}s` }} />
        </g>
      ))}
      <path d="M92 110 L200 58 L312 96 L336 236 L262 322 L112 300 L62 206 Z" fill="none" stroke="#CFE9FA" strokeOpacity="0.14" />
      {nodes.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r * 2.2} fill="#0879F9" fillOpacity="0.12" className="pulse-soft" style={{ animationDelay: `${i * 0.4}s` }} />
          <circle cx={x} cy={y} r={r} fill="#061324" stroke={g} strokeWidth="1.8" />
        </g>
      ))}
      <rect x="186" y="186" width="28" height="28" rx="6" fill={g} />
    </g>
  );
}

// 02 — layered quality planes with a review scan line
function Layers({ g }: ArtProps) {
  const planes = [0, 1, 2, 3];
  return (
    <g>
      {planes.map((i) => {
        const y = 110 + i * 56;
        return (
          <g key={i} opacity={1 - i * 0.14}>
            <path d={`M200 ${y - 44} L330 ${y} L200 ${y + 44} L70 ${y} Z`} fill="#0B2846" fillOpacity="0.55" stroke={g} strokeWidth="1.4" />
            <path d={`M200 ${y - 22} L265 ${y} L200 ${y + 22} L135 ${y} Z`} fill="none" stroke="#CFE9FA" strokeOpacity="0.22" />
            <path d={`M${232 - 10} ${y - 2} l7 7 l14 -14`} fill="none" stroke="#53BEFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      <g className="scan-line" style={{ transformOrigin: "200px 200px" }}>
        <line x1="52" x2="348" y1="200" y2="200" stroke="#53BEFF" strokeWidth="1.5" />
        <rect x="52" y="196" width="296" height="8" fill="#53BEFF" opacity="0.12" />
      </g>
    </g>
  );
}

// 03 — governance gauge over a ruled document frame
function Gauge({ g }: ArtProps) {
  const ticks = Array.from({ length: 36 }, (_, i) => i);
  return (
    <g>
      <rect x="116" y="96" width="168" height="212" rx="14" fill="#0B2846" fillOpacity="0.5" stroke="#CFE9FA" strokeOpacity="0.2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="140" x2={i % 2 ? 236 : 260} y1={136 + i * 26} y2={136 + i * 26} stroke="#CFE9FA" strokeOpacity={i === 2 ? 0.7 : 0.22} strokeWidth="3" strokeLinecap="round" />
      ))}
      <g transform="translate(200 200)">
        {ticks.map((i) => (
          <line
            key={i}
            x1="0"
            y1="-168"
            x2="0"
            y2={i % 3 === 0 ? -152 : -160}
            stroke="#53BEFF"
            strokeOpacity={i % 3 === 0 ? 0.8 : 0.3}
            transform={`rotate(${i * 10})`}
          />
        ))}
        <g className="orbit-spin" style={{ ["--orbit-duration" as string]: "18s" }}>
          <circle r="140" fill="none" stroke="none" />
          <path d="M0 -140 A140 140 0 0 1 121 70" fill="none" stroke={g} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="121" cy="70" r="6" fill="#ffffff" />
        </g>
      </g>
    </g>
  );
}

// 04 — risk matrix: likelihood × impact, with a mitigation threshold
function Matrix({ g }: ArtProps) {
  const cells = Array.from({ length: 25 }, (_, i) => ({ c: i % 5, r: Math.floor(i / 5) }));
  return (
    <g>
      {cells.map(({ c, r }) => {
        const score = (c + 1) * (5 - r);
        const x = 90 + c * 46;
        const y = 90 + r * 46;
        const hot = c === 3 && r === 1;
        return (
          <g key={`${c}-${r}`}>
            <rect x={x} y={y} width="38" height="38" rx="7" fill="#0879F9" fillOpacity={0.05 + score * 0.022} stroke="#53BEFF" strokeOpacity="0.18" />
            {hot && <rect x={x - 4} y={y - 4} width="46" height="46" rx="10" fill="none" stroke={g} strokeWidth="2" className="pulse-soft" />}
          </g>
        );
      })}
      <line x1="80" y1="330" x2="330" y2="80" stroke={g} strokeWidth="1.6" className="dash-flow" />
      <path d="M78 336 V78 M78 336 H336" fill="none" stroke="#CFE9FA" strokeOpacity="0.35" />
    </g>
  );
}

// 05 — molecular lattice within an orbit: regulated-sector quality (abstract)
function Lattice({ g }: ArtProps) {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  const centres = [
    [200, 200], [252, 170], [252, 230], [200, 260], [148, 230], [148, 170], [200, 140],
  ] as const;
  return (
    <g>
      {centres.map(([x, y], i) => (
        <polygon key={i} points={hex(x, y, 30)} fill={i === 0 ? "#0879F9" : "#0B2846"} fillOpacity={i === 0 ? 0.3 : 0.5} stroke={i === 0 ? g : "#53BEFF"} strokeOpacity={i === 0 ? 1 : 0.45} strokeWidth="1.4" />
      ))}
      <g transform="translate(200 200) rotate(-24) scale(1 0.42)">
        <circle r="168" fill="none" stroke={g} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        <g className="orbit-spin" style={{ ["--orbit-duration" as string]: "16s" }}>
          <circle r="190" fill="none" stroke="none" />
          <g transform="translate(168 0)">
            <g className="orbit-spin-rev" style={{ ["--orbit-duration" as string]: "16s" }}>
              <ellipse rx="6" ry={6 / 0.42} fill="#ffffff" />
            </g>
          </g>
        </g>
      </g>
      {centres.slice(1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#CFE9FA" className="pulse-soft" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
    </g>
  );
}

const ART: Record<ServiceSlug, (p: ArtProps) => React.ReactElement> = {
  "it-consultancy-digital-transformation": Network,
  "software-quality-assurance": Layers,
  "regulatory-compliance-governance": Gauge,
  "it-risk-management": Matrix,
  "regulated-industry-quality": Lattice,
};
