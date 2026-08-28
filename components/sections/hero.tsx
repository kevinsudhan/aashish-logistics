"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { cn } from "@/lib/utils";

const floatingData = [
  { label: "Global Coverage", position: "left-0 top-10 -translate-x-1/3" },
  {
    label: "Ocean / Air / Road",
    position: "right-6 top-1/2 translate-x-1/4 -translate-y-1/2",
  },
  {
    label: "End-to-End Logistics",
    position: "bottom-10 left-0 -translate-x-1/4",
  },
];

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-rule bg-mist pt-20 lg:pt-[88px]"
    >
      <Container className="relative">
        <div className="grid items-center gap-x-12 gap-y-14 py-14 lg:grid-cols-12 lg:py-24">
          {/* ---------------------------------------------------- Copy */}
          <div className="lg:col-span-5">
            <motion.p
              {...rise(0)}
              className="eyebrow flex items-center gap-3 text-accent"
            >
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              Cargo Consolidation &amp; Global Logistics
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className="mt-7 text-[2.5rem] leading-[1.05] tracking-[-0.03em] text-navy-900 sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4rem]"
            >
              Moving Cargo.
              <br />
              <span className="text-accent">Connecting Business.</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted"
            >
              We consolidate and move cargo across ocean, air and road — our
              own consolidation programmes, customs clearance and inland
              transport under a single point of accountability.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="primary">
                <Link href="/services">
                  Explore Services
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#quote">Request a Quote</Link>
              </Button>
            </motion.div>

            {/* Inline credential strip */}
            <motion.dl
              {...rise(0.32)}
              className="mt-14 grid max-w-md grid-cols-1 border-t border-rule-strong sm:grid-cols-3"
            >
              {[
                { k: "Trade Lanes", v: "Worldwide" },
                { k: "Operations", v: "24/7" },
                { k: "Coverage", v: "Door-to-Door" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-3 sm:block sm:border-b-0 sm:py-0 sm:pr-4 sm:pt-4"
                >
                  <dt className="eyebrow text-faint">{item.k}</dt>
                  <dd className="text-sm font-medium text-navy-900 sm:mt-2">
                    {item.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* --------------------------------------------------- Media */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.985 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-7"
          >
            <MediaPlaceholder
              label="HERO IMAGE / VIDEO"
              alt="Cinematic logistics footage of global freight operations"
              src="/media/hero.webm"
              type="video"
              poster="/media/hero-poster.jpg"
              ratio="5/4"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="rounded-2xl lg:aspect-[4/3]"
            />

            {/* Restrained floating operational data */}
            {floatingData.map((item, i) => (
              <motion.div
                key={item.label}
                initial={reduced ? undefined : { opacity: 0, y: 6 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "pointer-events-none absolute hidden items-center gap-2.5 border border-rule bg-paper px-4 py-2.5 shadow-[0_1px_2px_rgba(18,89,160,0.06)] xl:flex",
                  item.position,
                )}
              >
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="eyebrow whitespace-nowrap text-navy-800">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Ticker rule — quiet, non-animated anchor to the next section */}
      <div className="border-t border-rule">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
          <span className="eyebrow text-faint">
            Consolidation · Sea &amp; Air Freight · Customs · Break Bulk
          </span>
          <Link
            href="#about"
            className="eyebrow hidden items-center gap-1.5 text-navy-700 transition-colors hover:text-accent sm:inline-flex"
          >
            Scroll to explore
            <ArrowUpRight className="size-3" />
          </Link>
        </Container>
      </div>
    </section>
  );
}
