import { KineticText } from "@/components/motion/KineticText";
import { Photo } from "@/components/visuals/Photo";

type Props = {
  src: string;
  alt: string;
  eyebrow?: string;
  lines?: string[];
  tone?: "brand" | "soft";
  height?: string;
};

/** Full-bleed cinematic photo break between sections, with optional overlaid statement. */
export function PhotoBand({ src, alt, eyebrow, lines, tone = "brand", height = "h-[62svh] min-h-[380px] lg:h-[78svh]" }: Props) {
  return (
    <section data-nav="dark" className="bg-abyss">
      <Photo src={src} alt={alt} tone={tone} parallax={90} rounded="rounded-none" className={height}>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-abyss/40" />
        {lines && (
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[1240px] px-4 pb-14 sm:px-6 lg:px-10 lg:pb-20">
              {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan">{eyebrow}</p>}
              <KineticText
                lines={lines}
                stagger={0.06}
                lineClassNames={lines.map((_, i) => (i === lines.length - 1 ? "text-gradient-line" : ""))}
                className="mt-4 max-w-4xl font-display text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white"
              />
            </div>
          </div>
        )}
      </Photo>
    </section>
  );
}
