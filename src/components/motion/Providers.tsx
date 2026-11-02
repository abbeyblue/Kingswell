"use client";

import { MotionConfig } from "motion/react";

/** reducedMotion="user" makes every Motion animation respect prefers-reduced-motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
