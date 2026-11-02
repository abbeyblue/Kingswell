import type { Metadata } from "next";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { OrbitField } from "@/components/visuals/OrbitField";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section data-nav="dark" className="relative flex min-h-svh items-center overflow-hidden bg-abyss bg-grid">
      <OrbitField className="pointer-events-none absolute -right-40 top-1/2 w-[760px] max-w-none -translate-y-1/2 opacity-60" />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Error 404</p>
        <h1 className="mt-4 max-w-xl font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1] tracking-tight">This page is out of orbit.</h1>
        <p className="mt-6 max-w-md text-white/65">The page you were looking for does not exist or has moved.</p>
        <div className="mt-10">
          <MagneticLink href="/">Back to home</MagneticLink>
        </div>
      </div>
    </section>
  );
}
