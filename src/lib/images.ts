import type { sectors } from "@/lib/content";

/** Illustrative stock photos per sector (credits in docs/image-credits.md). */
export const sectorPhotos: Record<(typeof sectors)[number]["key"], { src: string; alt: string }> = {
  healthcare: { src: "/images/healthcare-monitoring.jpg", alt: "Patient monitoring equipment and an IV stand in a hospital room" },
  pharmaceuticals: { src: "/images/pharmaceutical-capsules.jpg", alt: "Scattered pharmaceutical capsules on a pale surface" },
  biotechnology: { src: "/images/biotech-microscope.jpg", alt: "Gloved hand placing a slide under a laboratory microscope" },
  medtech: { src: "/images/medtech-diagnostic-equipment.jpg", alt: "Wall-mounted diagnostic instruments in a clinical room" },
};
