"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { KineticText } from "@/components/motion/KineticText";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { OrbitField } from "@/components/visuals/OrbitField";

const ease = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Headline lines release upward at different speeds as the hero scrolls away.
  const line1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const line2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} data-nav="dark" className="relative isolate flex min-h-svh items-center overflow-hidden bg-abyss bg-grid pt-24 pb-16 lg:pt-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_45%,rgb(8_121_249/0.22),transparent_60%),radial-gradient(ellipse_at_10%_90%,rgb(83_190_255/0.08),transparent_50%)]" />

      {/* Orbit: right column on desktop, behind the headline on mobile */}
      <motion.div
        className="pointer-events-none absolute -right-[38%] top-[8%] w-[120vw] max-w-[760px] opacity-55 sm:-right-[20%] sm:w-[90vw] lg:right-[-4%] lg:top-1/2 lg:w-[52vw] lg:max-w-[780px] lg:-translate-y-1/2 lg:opacity-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease }}
      >
        <OrbitField interactive progress={scrollYProgress} className="w-full" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <motion.div style={{ opacity: fade }} className="max-w-[760px] lg:w-[64%]">
          <motion.p
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan sm:text-xs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span>IT Consultancy</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-cyan/60" />
            <span>Software Quality Assurance</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-cyan/60" />
            <span>Regulatory Compliance</span>
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(2.9rem,6.6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            <span className="sr-only">Reliable Technology. Structured Quality.</span>
            <motion.span style={{ y: line1 }} className="block">
              <KineticText as="span" srText={false} immediate lines={["Reliable Technology."]} delay={0.15} stagger={0.09} />
            </motion.span>
            <motion.span style={{ y: line2 }} className="block">
              <KineticText as="span" srText={false} immediate lines={["Structured Quality."]} delay={0.38} stagger={0.09} wordClassName="text-gradient" />
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-[34rem] text-[17px] leading-relaxed text-white/70 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
          >
            Kingswell Orion Ltd is an Ireland-based IT and consultancy company specialising in IT solutions, software quality assurance, regulatory
            compliance, digital transformation and technology risk management.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
          >
            <MagneticLink href="/services">Explore services</MagneticLink>
            <MagneticLink href="/contact" variant="ghost">
              Contact
            </MagneticLink>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#services-index"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-cyan"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
