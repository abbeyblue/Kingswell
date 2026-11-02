"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

type Sector = "healthcare" | "pharmaceuticals" | "biotechnology" | "medtech";

/** Abstract line-art per sector. Illustrative only — no real products, sites or people. */
export function SectorArt({ sector, className = "" }: { sector: Sector; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "80px" });
  return (
    <div ref={ref} data-paused={!inView} aria-hidden="true" className={className}>
      <svg viewBox="0 0 480 320" className="size-full">
        <defs>
          <linearGradient id={`sa-${sector}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#0879F9" stopOpacity="0" />
            <stop offset="30%" stopColor="#53BEFF" />
            <stop offset="100%" stopColor="#CFE9FA" />
          </linearGradient>
        </defs>
        {sector === "healthcare" && <Pulse id={`sa-${sector}`} />}
        {sector === "pharmaceuticals" && <Molecule id={`sa-${sector}`} />}
        {sector === "biotechnology" && <Helix />}
        {sector === "medtech" && <Circuit id={`sa-${sector}`} />}
      </svg>
    </div>
  );
}

function Pulse({ id }: { id: string }) {
  const d = "M0 170 H120 L140 170 L155 120 L172 230 L192 70 L212 250 L228 150 L240 170 H480";
  return (
    <g>
      {[90, 130, 170, 210, 250].map((y) => (
        <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="#CFE9FA" strokeOpacity="0.06" />
      ))}
      <path d={d} fill="none" stroke="#53BEFF" strokeOpacity="0.15" strokeWidth="2" />
      <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="draw-loop" style={{ ["--len" as string]: 720 }} />
      <circle cx="192" cy="70" r="6" fill="#ffffff" className="pulse-soft" />
    </g>
  );
}

function Molecule({ id }: { id: string }) {
  const nodes = [
    [150, 160, 22], [230, 110, 14], [230, 210, 16], [310, 160, 24], [390, 110, 10], [390, 215, 12], [80, 110, 10],
  ] as const;
  const links = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [0, 6]];
  return (
    <g>
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={`url(#${id})`} strokeWidth="2" />
      ))}
      {nodes.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r + 10} fill="#0879F9" fillOpacity="0.1" className="pulse-soft" style={{ animationDelay: `${i * 0.35}s` }} />
          <circle cx={x} cy={y} r={r} fill="#0B2846" stroke="#53BEFF" strokeWidth="1.6" />
        </g>
      ))}
      <rect x="120" y="250" width="120" height="36" rx="18" fill="none" stroke="#CFE9FA" strokeOpacity="0.4" />
      <line x1="180" x2="180" y1="250" y2="286" stroke="#CFE9FA" strokeOpacity="0.4" />
    </g>
  );
}

function Helix() {
  const pts = Array.from({ length: 22 }, (_, i) => i);
  return (
    <g>
      {pts.map((i) => {
        const x = 30 + i * 20;
        const a = (i / 22) * Math.PI * 3.2;
        // Rounded so server and browser render identical attributes
        const y1 = Math.round((160 + Math.sin(a) * 80) * 10) / 10;
        const y2 = Math.round((160 - Math.sin(a) * 80) * 10) / 10;
        const c = Math.round(Math.cos(a) * 15) / 10;
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={y1} y2={y2} stroke="#CFE9FA" strokeOpacity="0.14" />
            <circle cx={x} cy={y1} r={4 + c} fill="#53BEFF" className="pulse-soft" style={{ animationDelay: `${i * 0.12}s` }} />
            <circle cx={x} cy={y2} r={4 - c} fill="#0879F9" />
          </g>
        );
      })}
    </g>
  );
}

function Circuit({ id }: { id: string }) {
  return (
    <g>
      <rect x="170" y="100" width="140" height="120" rx="16" fill="#0B2846" stroke="#53BEFF" strokeOpacity="0.6" />
      <path d="M190 175 L215 175 L228 140 L245 200 L258 160 L290 160" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {[120, 160, 200].map((y) => (
        <g key={y}>
          <path d={`M170 ${y} H90 V${y - 30} H20`} fill="none" stroke="#53BEFF" strokeOpacity="0.25" />
          <path d={`M170 ${y} H90 V${y - 30} H20`} fill="none" stroke={`url(#${id})`} strokeWidth="1.8" className="dash-flow" />
          <path d={`M310 ${y} H390 V${y + 30} H460`} fill="none" stroke="#53BEFF" strokeOpacity="0.25" />
          <path d={`M310 ${y} H390 V${y + 30} H460`} fill="none" stroke="#53BEFF" strokeWidth="1.8" className="dash-flow" style={{ animationDirection: "reverse" }} />
          <circle cx="20" cy={y - 30} r="4" fill="#53BEFF" />
          <circle cx="460" cy={y + 30} r="4" fill="#53BEFF" />
        </g>
      ))}
    </g>
  );
}
