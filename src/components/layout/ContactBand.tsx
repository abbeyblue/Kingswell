import { KineticText } from "@/components/motion/KineticText";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { Reveal } from "@/components/motion/Reveal";
import { OrbitField } from "@/components/visuals/OrbitField";

type Props = {
  lines?: string[];
  href?: string;
  cta?: string;
  secondary?: { href: string; label: string };
};

export function ContactBand({
  lines = ["Let's talk about", "your requirements."],
  href = "/contact",
  cta = "Start an enquiry",
  secondary = { href: "/services", label: "Browse services" },
}: Props) {
  return (
    <section data-nav="dark" className="relative overflow-hidden bg-abyss py-24 lg:py-32">
      <OrbitField className="pointer-events-none absolute -right-56 top-1/2 w-[680px] -translate-y-1/2 opacity-45 lg:-right-24 lg:opacity-80" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <KineticText
          lines={lines}
          className="max-w-3xl font-display text-[clamp(2.3rem,6vw,4.75rem)] font-semibold leading-[1] tracking-[-0.035em]"
          lineClassNames={["", "text-cyan"]}
        />
        <Reveal className="mt-10 flex flex-wrap gap-4">
          <MagneticLink href={href}>{cta}</MagneticLink>
          {secondary && (
            <MagneticLink href={secondary.href} variant="ghost">
              {secondary.label}
            </MagneticLink>
          )}
        </Reveal>
      </div>
    </section>
  );
}
