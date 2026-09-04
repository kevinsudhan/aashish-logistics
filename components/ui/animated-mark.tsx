"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** Cycled in order. Decorative — the wordmark carries the accessible name. */
const MARKS = [
  "/brand/mark-container.webp",
  "/brand/mark-ship.webp",
  "/brand/mark-plane.webp",
];

const HOLD_MS = 2800;

/**
 * The brand mark, cycling through the three modes we move cargo by.
 *
 * A true swipe: the outgoing mark travels a full slot width to the right as
 * the incoming one arrives from the left, so one is always clear of the frame
 * before the other reaches it. No cross-fade — the slot clips them instead.
 *
 * With reduced motion it settles on the first mark and never cycles: a
 * looping animation in the masthead is exactly the kind of persistent motion
 * that setting exists to stop.
 */
export function AnimatedMark({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % MARKS.length),
      HOLD_MS,
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <>
      {/*
        React hoists these into <head>. Without them the second and third
        marks are only fetched at their first turn, which showed as a visible
        pop-in during the opening cycle.
      */}
      {MARKS.map((src) => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}

      <span
        aria-hidden
        className={cn(
          // Tall enough that the container mark — the deepest of the three —
          // fills the width rather than leaving a gap before the wordmark.
          "relative block h-11 w-24 shrink-0 overflow-hidden",
          className,
        )}
      >
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={MARKS[0]}
            alt=""
            className="absolute inset-0 h-full w-full object-contain object-left"
          />
        ) : (
          <AnimatePresence initial={false}>
            <motion.img
              key={MARKS[index]}
              src={MARKS[index]}
              alt=""
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-contain object-left"
            />
          </AnimatePresence>
        )}
      </span>
    </>
  );
}
