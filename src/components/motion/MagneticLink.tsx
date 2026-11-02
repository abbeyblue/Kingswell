"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "ink";
  className?: string;
};

const styles = {
  primary:
    "bg-cobalt text-white shadow-[0_10px_40px_-10px_rgb(8_121_249/0.8)] hover:bg-[#1a86ff]",
  ghost: "border border-white/25 text-white hover:border-cyan hover:bg-white/5",
  ink: "bg-ink text-paper hover:bg-deep",
};

/** CTA that leans toward a fine pointer. Touch and reduced-motion users get a plain link. */
export function MagneticLink({ href, children, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span ref={ref} style={{ x, y }} className="inline-block" onPointerMove={onMove} onPointerLeave={reset}>
      <Link
        href={href}
        className={`group inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 text-[15px] font-semibold tracking-tight transition-colors duration-200 ${styles[variant]} ${className}`}
      >
        {children}
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 transition-transform duration-200 group-hover:translate-x-1">
          <path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </motion.span>
  );
}
