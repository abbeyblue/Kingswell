import Image from "next/image";

type Props = {
  /** Largest rendered height in px (used for image sizing). */
  size?: number;
  /** Optional responsive height classes, e.g. "h-[60px] lg:h-[76px]". Overrides the fixed size. */
  heightClass?: string;
  priority?: boolean;
  className?: string;
};

/**
 * The approved Kingswell Orion Ltd logo, used exactly as supplied
 * (public/brand/kingswell-orion-logo.png, 224×231 px). It is never redrawn.
 * The artwork carries its own dark background, so it sits in a rounded tile.
 */
export function Logo({ size = 48, heightClass, priority = false, className = "" }: Props) {
  const width = Math.round((size * 224) / 231);
  return (
    <Image
      src="/brand/kingswell-orion-logo.png"
      alt="Kingswell Orion Ltd"
      width={224}
      height={231}
      quality={90}
      priority={priority}
      sizes={`${width}px`}
      style={heightClass ? { objectFit: "contain" } : { width, height: size, objectFit: "contain" }}
      className={`rounded-[12px] ring-1 ring-white/10 ${heightClass ? `${heightClass} w-auto` : ""} ${className}`}
    />
  );
}
