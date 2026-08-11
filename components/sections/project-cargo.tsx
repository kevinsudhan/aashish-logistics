"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";

const scope = [
  "Heavy equipment",
  "Oversized & out-of-gauge cargo",
  "Route planning & surveys",
  "Special equipment sourcing",
  "Multimodal movement",
  "Project coordination",
];

export function ProjectCargo() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Very small travel — enough to feel considered, not enough to notice.
  const y = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);

  return (
    <section
      id="project-cargo"
      ref={ref}
      className="relative overflow-hidden border-b border-rule bg-bone py-20 md:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          {/* --------------------------------------------------- Media */}
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden">
              <motion.div style={reduced ? undefined : { y }} className="scale-[1.06]">
                <MediaPlaceholder
                  label="PROJECT CARGO IMAGE / VIDEO"
                  note="Heavy-lift, out-of-gauge or module transport footage."
                  alt="Heavy-lift crane loading an oversized industrial module onto a vessel"
                  ratio="5/4"
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="lg:aspect-[4/3]"
                />
              </motion.div>
            </div>
          </Reveal>

          {/* -------------------------------------------------- Content */}
          <div className="lg:col-span-5 lg:self-center">
            <Reveal delay={0.05}>
              <h2 className="text-[1.875rem] leading-[1.12] tracking-[-0.025em] text-navy-900 lg:text-[2.75rem]">
                Complex cargo.
                <br />
                Precisely managed.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-[1.75] text-muted">
                Project movements are won or lost before the cargo is lifted.
                We start with the survey and the route study — bridge and axle
                loadings, port capability, lifting gear, permits — and only then
                commit to a method and a schedule. Every stage is supervised by
                the same team that planned it.
              </p>

              <ul className="mt-10 grid grid-cols-1 gap-x-8 border-t border-rule sm:grid-cols-2">
                {scope.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-b border-rule py-3 text-sm text-navy-800"
                  >
                    <span className="eyebrow tnum text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Button asChild variant="primary" size="md" className="mt-10">
                <Link href="/services#project-cargo">
                  Explore Project Cargo
                  <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
