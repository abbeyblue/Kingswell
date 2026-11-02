"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { services, type Service } from "@/lib/content";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";

/**
 * Large numbered index of the five services. Each row is a real link.
 * Fine pointers get a floating illustration that follows the cursor;
 * touch devices see the same content without hover.
 */
export function ServiceIndex() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28 });
  const y = useSpring(my, { stiffness: 260, damping: 28 });

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <div ref={wrapRef} className="relative" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ul className="relative border-t border-white/12">
        {services.map((s, i) => (
          <Row key={s.slug} service={s} active={active === i} dimmed={active !== null && active !== i} onActivate={() => setActive(i)} />
        ))}
      </ul>

      <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[260px] [@media(pointer:fine)]:lg:block"
              style={{ x, y, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-[28px] border border-cyan/25 bg-midnight/80 p-4 shadow-[0_30px_80px_-20px_rgb(8_121_249/0.6)] backdrop-blur-md">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={services[active].slug}
                    initial={{ opacity: 0, rotate: -8 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <ServiceGlyph slug={services[active].slug} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}

function Row({ service, active, dimmed, onActivate }: { service: Service; active: boolean; dimmed: boolean; onActivate: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  // Scroll-linked underline that fills as the row travels up the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 45%"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <li ref={ref} className="relative">
      <Link
        href={`/services/${service.slug}`}
        onPointerEnter={onActivate}
        onFocus={onActivate}
        className={`group relative grid grid-cols-[3rem_1fr_auto] items-start gap-x-4 gap-y-3 py-7 transition-opacity duration-300 sm:py-9 lg:grid-cols-[5rem_minmax(0,1.35fr)_minmax(0,1fr)_3rem] lg:items-center lg:gap-x-8 ${
          dimmed ? "lg:opacity-40" : "opacity-100"
        }`}
      >
        <span className="pt-2 font-display text-sm font-medium text-cyan lg:pt-0 lg:text-base">{service.number}</span>
        <span
          className={`font-display text-[clamp(1.5rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em] transition-transform duration-300 ease-out ${
            active ? "lg:translate-x-3" : ""
          }`}
        >
          {service.title}
        </span>
        <span className="col-span-3 col-start-1 text-[15px] leading-relaxed text-white/60 sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-auto">
          {service.summary}
        </span>
        <span
          aria-hidden="true"
          className={`row-start-1 col-start-3 flex size-11 items-center justify-center rounded-full border transition-all duration-300 lg:col-start-4 lg:row-start-auto ${
            active ? "border-cobalt bg-cobalt text-white" : "border-white/20 text-white/70 group-hover:border-cyan"
          }`}
        >
          <svg viewBox="0 0 20 20" className={`size-4 transition-transform duration-300 ${active ? "-rotate-45" : ""}`}>
            <path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/12" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-cobalt via-cyan to-transparent"
        style={{ scaleX: progress }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-cyan"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
    </li>
  );
}
