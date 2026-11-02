import { KineticText } from "@/components/motion/KineticText";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: string;
  lines: string[];
  accentLine?: number;
  intro?: React.ReactNode;
  visual?: React.ReactNode;
  children?: React.ReactNode;
  /** Layout of the visual relative to the text. */
  layout?: "split" | "split-reverse" | "stacked";
  className?: string;
};

/** Dark editorial page header shared by inner pages; each page supplies its own visual and layout. */
export function PageHero({ eyebrow, lines, accentLine, intro, visual, children, layout = "split", className = "" }: Props) {
  const lineClassNames = lines.map((_, i) => (i === accentLine ? "text-gradient-line" : ""));
  const stacked = layout === "stacked";
  return (
    <section data-nav="dark" className={`relative isolate overflow-hidden bg-abyss bg-grid pt-32 pb-20 lg:pt-40 lg:pb-28 ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_30%,rgb(8_121_249/0.2),transparent_55%)]" />
      <div
        className={`mx-auto grid max-w-[1240px] items-center gap-12 px-4 sm:px-6 lg:px-10 ${
          stacked ? "" : "lg:grid-cols-12"
        }`}
      >
        <div className={stacked ? "max-w-4xl" : layout === "split-reverse" ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}>
          <Reveal y={12}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">{eyebrow}</p>
          </Reveal>
          <KineticText
            as="h1"
            immediate
            lines={lines}
            delay={0.1}
            lineClassNames={lineClassNames}
            className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.035em]"
          />
          {intro && (
            <Reveal delay={0.35} className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/70 sm:text-lg">
              {intro}
            </Reveal>
          )}
          {children}
        </div>
        {visual && (
          <Reveal
            delay={0.2}
            y={0}
            className={stacked ? "" : layout === "split-reverse" ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}
          >
            {visual}
          </Reveal>
        )}
      </div>
    </section>
  );
}
