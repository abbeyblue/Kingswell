import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { company, navItems, services } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer data-nav="dark" className="relative overflow-hidden border-t border-white/10 bg-abyss text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 left-1/2 size-[720px] -translate-x-1/2 rounded-full border border-cyan/10" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-10 lg:py-20">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Kingswell Orion Ltd — home" className="inline-block rounded-[14px]">
            <Logo size={120} heightClass="h-[104px] lg:h-[120px]" />
          </Link>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">{company.short}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-ice">
            <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
            {company.location}
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Navigate</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/70 transition-colors duration-200 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Services" className="md:col-span-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Services</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/70 transition-colors duration-200 hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-4 py-6 text-xs text-white/45 sm:flex-row sm:justify-between sm:px-6 lg:px-10">
          <p>© Kingswell Orion Ltd. All rights reserved.</p>
          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
