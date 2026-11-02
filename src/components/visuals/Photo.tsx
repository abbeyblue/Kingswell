"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** "brand": blue duotone grade. "soft": natural colour with a light blue wash. */
  tone?: "brand" | "soft";
  /** Parallax travel in px (0 disables). */
  parallax?: number;
  rounded?: string;
  children?: React.ReactNode;
};

/**
 * Stock photograph with the site's colour grade, a slow scroll parallax and a reveal on entry.
 * Illustrative only — never presented as the company's own premises, people or work.
 */
export function Photo({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  tone = "brand",
  parallax = 60,
  rounded = "rounded-[28px]",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-parallax, parallax]);

  return (
    <motion.div
      ref={ref}
      className={`relative isolate overflow-hidden bg-abyss ${rounded} ${className}`}
      initial={{ clipPath: "inset(12% 6% 12% 6% round 28px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="absolute inset-x-0 -z-10" style={{ y, top: -parallax, bottom: -parallax }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${tone === "brand" ? "opacity-80 mix-blend-luminosity" : "opacity-95"}`}
        />
      </motion.div>
      {/* Colour grade */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${
          tone === "brand"
            ? "bg-[linear-gradient(160deg,rgb(8_121_249/0.45),rgb(6_19_36/0.15)_45%,rgb(6_19_36/0.75))] mix-blend-multiply"
            : "bg-[linear-gradient(180deg,rgb(8_121_249/0.10),rgb(6_19_36/0.35))]"
        }`}
      />
      {tone === "brand" && <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cyan/10 mix-blend-color" />}
      {children}
    </motion.div>
  );
}
