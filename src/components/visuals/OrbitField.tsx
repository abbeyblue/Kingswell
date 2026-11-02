"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useId, useRef } from "react";

type Ring = { rx: number; ratio: number; tilt: number; dur: number; rev?: boolean; dots: number[]; strong?: boolean };

// Orbit motif inspired by the logo's star-and-arc, drawn procedurally. It is not the logo.
const RINGS: Ring[] = [
  { rx: 282, ratio: 0.34, tilt: -16, dur: 28, dots: [0, 180], strong: true },
  { rx: 238, ratio: 0.52, tilt: 22, dur: 22, rev: true, dots: [60] },
  { rx: 196, ratio: 0.8, tilt: -6, dur: 18, dots: [200] },
  { rx: 150, ratio: 0.4, tilt: 48, dur: 15, rev: true, dots: [30, 210], strong: true },
  { rx: 104, ratio: 0.66, tilt: -34, dur: 14, dots: [120] },
];

const STAR = "M0,-46 C4,-8 8,-4 46,0 C8,4 4,8 0,46 C-4,8 -8,4 -46,0 C-8,-4 -4,-8 0,-46Z";

const SPECKS = [
  [72, 110, 1.4], [520, 90, 1.1], [540, 470, 1.6], [96, 500, 1.2], [300, 40, 1], [580, 300, 1.3],
  [30, 300, 1], [430, 560, 1.2], [180, 560, 0.9], [470, 180, 1], [150, 190, 0.8], [420, 400, 0.9],
] as const;

type Props = {
  className?: string;
  /** 0→1 progress used for scroll-driven tilt and scale. */
  progress?: MotionValue<number>;
  /** Enable pointer parallax (desktop, fine pointers only). */
  interactive?: boolean;
};

export function OrbitField({ className = "", progress, interactive = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const inView = useInView(ref, { margin: "100px" });
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const backX = useTransform(sx, (v) => v * -10);
  const backY = useTransform(sy, (v) => v * -10);
  const midX = useTransform(sx, (v) => v * 16);
  const midY = useTransform(sy, (v) => v * 16);
  const frontX = useTransform(sx, (v) => v * 30);
  const frontY = useTransform(sy, (v) => v * 30);

  const fallback = useMotionValue(0);
  const p = progress ?? fallback;
  const ringsRotate = useTransform(p, [0, 1], [0, 24]);
  const ringsScale = useTransform(p, [0, 1], [1, 1.18]);
  const starScale = useTransform(p, [0, 1], [1, 0.6]);

  useEffect(() => {
    if (!interactive || reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    function onMove(e: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        px.set(e.clientX / window.innerWidth - 0.5);
        py.set(e.clientY / window.innerHeight - 0.5);
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [interactive, reduce, px, py]);

  return (
    <div ref={ref} data-paused={!inView} aria-hidden="true" className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative "}aspect-square ${className}`}>
      {/* Back: glow and fine specks */}
      <motion.svg viewBox="0 0 600 600" className="absolute inset-0 size-full" style={{ x: backX, y: backY }}>
        <defs>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#53BEFF" stopOpacity="0.38" />
            <stop offset="35%" stopColor="#0879F9" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#061324" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="300" fill={`url(#glow-${uid})`} />
        <circle cx="300" cy="300" r="292" fill="none" stroke="#CFE9FA" strokeOpacity="0.07" strokeDasharray="2 7" />
        <circle cx="300" cy="300" r="228" fill="none" stroke="#CFE9FA" strokeOpacity="0.05" />
        {SPECKS.map(([x, y, r], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill="#CFE9FA"
            className="twinkle"
            style={{ ["--twinkle-duration" as string]: `${2.4 + (i % 5) * 0.7}s`, animationDelay: `${i * 0.31}s` }}
          />
        ))}
      </motion.svg>

      {/* Middle: tilted orbits with travelling satellites */}
      <motion.svg viewBox="0 0 600 600" className="absolute inset-0 size-full" style={{ x: midX, y: midY, rotate: ringsRotate, scale: ringsScale }}>
        <defs>
          <linearGradient id={`ring-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#53BEFF" stopOpacity="0.05" />
            <stop offset="45%" stopColor="#53BEFF" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#0879F9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0879F9" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id={`sat-${uid}`}>
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#53BEFF" />
            <stop offset="100%" stopColor="#0879F9" stopOpacity="0" />
          </radialGradient>
        </defs>
        {RINGS.map((ring, i) => (
          <g key={i} transform={`translate(300 300) rotate(${ring.tilt}) scale(1 ${ring.ratio})`}>
            <circle
              r={ring.rx}
              fill="none"
              stroke={`url(#ring-${uid})`}
              strokeWidth={ring.strong ? 1.6 : 1}
              vectorEffect="non-scaling-stroke"
            />
            <g
              className={ring.rev ? "orbit-spin-rev" : "orbit-spin"}
              style={{ ["--orbit-duration" as string]: `${ring.dur}s` }}
            >
              {/* Invisible bounds keep the spin centred on the orbit, not the satellites */}
              <circle r={ring.rx + 40} fill="none" stroke="none" />
              {ring.dots.map((deg) => {
                const a = (deg * Math.PI) / 180;
                return (
                  <g key={deg} transform={`translate(${(ring.rx * Math.cos(a)).toFixed(2)} ${(ring.rx * Math.sin(a)).toFixed(2)})`}>
                    <g
                      className={ring.rev ? "orbit-spin" : "orbit-spin-rev"}
                      style={{ ["--orbit-duration" as string]: `${ring.dur}s` }}
                    >
                      {/* Pre-stretched so the parent squash renders it round */}
                      <ellipse rx={11} ry={11 / ring.ratio} fill={`url(#sat-${uid})`} opacity="0.55" />
                      <ellipse rx={3.2} ry={3.2 / ring.ratio} fill="#ffffff" />
                    </g>
                  </g>
                );
              })}
            </g>
          </g>
        ))}
      </motion.svg>

      {/* Front: luminous four-point star */}
      <motion.svg viewBox="0 0 600 600" className="absolute inset-0 size-full" style={{ x: frontX, y: frontY, scale: starScale }}>
        <defs>
          <radialGradient id={`core-${uid}`}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#53BEFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0879F9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`star-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#CFE9FA" />
            <stop offset="100%" stopColor="#53BEFF" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="70" fill={`url(#core-${uid})`} className="twinkle" style={{ ["--twinkle-duration" as string]: "5s" }} />
        <g transform="translate(300 300)">
          <path d={STAR} fill={`url(#star-${uid})`} />
          <path d={STAR} fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="0.8" transform="scale(1.5) rotate(45)" opacity="0.25" />
        </g>
      </motion.svg>
    </div>
  );
}
