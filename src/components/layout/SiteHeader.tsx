"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { navItems } from "@/lib/content";

type Tone = "dark" | "light";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [tone, setTone] = useState<Tone>("dark");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Close the menu whenever the route changes (including back/forward).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Read the tone of whatever section sits under the header. Hidden (Activity) routes are skipped
  // automatically because elementsFromPoint only returns rendered elements.
  const measure = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    const y = header.offsetHeight / 2;
    const stack = document.elementsFromPoint(window.innerWidth / 2, y);
    const section = stack.find((el) => !header.contains(el) && el.closest("[data-nav]"))?.closest("[data-nav]");
    setTone((section?.getAttribute("data-nav") as Tone) ?? "dark");
    setScrolled(window.scrollY > 12);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  // Re-measure after route changes (new page content).
  useEffect(() => {
    const t = setTimeout(measure, 60);
    return () => clearTimeout(t);
  }, [pathname, measure]);

  // Mobile menu: lock scroll, Escape closes, focus is trapped and restored.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
      const all = [menuButtonRef.current!, ...items];
      const idx = all.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && idx <= 0) {
        e.preventDefault();
        all[all.length - 1].focus();
      } else if (!e.shiftKey && idx === all.length - 1) {
        e.preventDefault();
        all[0].focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const light = tone === "light" && !open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cobalt focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-300 ${
          light
            ? "bg-paper/85 text-ink shadow-[0_1px_0_rgb(16_35_60/0.08)] backdrop-blur-xl"
            : scrolled && !open
              ? "bg-abyss/70 text-white shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl"
              : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-10">
          <Link href="/" className="flex items-center gap-3 rounded-[12px]" aria-label="Kingswell Orion Ltd — home">
            <Logo size={76} heightClass="h-[60px] lg:h-[76px]" priority />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                const isContact = item.href === "/contact";
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-full px-4 py-2.5 text-[14px] font-medium tracking-tight transition-colors duration-200 ${
                        isContact
                          ? "ml-3 bg-cobalt text-white hover:bg-[#1a86ff]"
                          : light
                            ? "text-ink/75 hover:text-ink"
                            : "text-white/75 hover:text-white"
                      }`}
                    >
                      {active && !isContact && (
                        <motion.span
                          layoutId="nav-active"
                          className={`absolute inset-0 rounded-full ${light ? "bg-ink/[0.07]" : "bg-white/10"}`}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className={`relative ${active && !isContact ? (light ? "text-ink" : "text-white") : ""}`}>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="relative z-[60] flex size-12 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <motion.span
                className="absolute left-0 top-0 h-[2px] w-6 rounded bg-current"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-6 rounded bg-current"
                animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-abyss/97 px-6 pb-10 pt-28 text-white backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 size-[420px] rounded-full border border-cyan/15" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-36 size-[300px] rounded-full border border-cobalt/25" />
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {navItems.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onNavigate={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-[clamp(1.75rem,7vw,2.5rem)] font-semibold tracking-tight"
                      >
                        <span className="w-8 font-sans text-xs font-medium text-cyan">0{i + 1}</span>
                        <span className={active ? "text-cyan" : "text-white"}>{item.label}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <p className="mt-auto pt-10 text-sm text-white/55">Kingswell Orion Ltd · Ireland-based</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
