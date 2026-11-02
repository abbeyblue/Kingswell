"use client";

import { motion } from "motion/react";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Set false when a parent already provides the accessible text. */
  srText?: boolean;
  className?: string;
  lineClassNames?: string[];
  /** Applied to each animated word (e.g. gradient text, which must sit on the transformed element). */
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Splits lines into words that rise out of a mask in sequence.
 * Screen readers get the plain text once; the animated words are hidden from them.
 */
export function KineticText({ lines, as = "h2", className = "", lineClassNames = [], wordClassName = "", delay = 0, stagger = 0.08, immediate = false, srText = true }: Props) {
  const Tag = as;
  let wordIndex = 0;
  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={`${Tag === "span" ? "block " : ""}${className}`}>
      {srText && <span className="sr-only">{lines.join(" ")}</span>}
      <motion.span aria-hidden="true" className="block" {...trigger}>
        {lines.map((line, li) => (
          <span key={li} className={`block ${lineClassNames[li] ?? ""}`}>
            {line.split(" ").map((word, wi) => {
              const i = wordIndex++;
              return (
                <span key={wi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
                  <motion.span
                    className={`inline-block will-change-transform ${wordClassName}`}
                    variants={{
                      hidden: { y: "108%", opacity: 0 },
                      show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease, delay: delay + i * stagger } },
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < line.split(" ").length - 1 ? " " : null}
                </span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
