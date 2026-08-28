import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { deskHeading, deskLede, deskPoints } from "@/content/ai-desk";
import { contact } from "@/content/site";

/**
 * The AI quote desk, condensed to one section: header across the top, the
 * five claims in a single horizontal row beneath. Kept to one line of copy
 * per box so five columns stay shallow rather than stacking into a wall.
 */
export function AiDesk() {
  return (
    // Tighter vertical rhythm than the default section: this is a supporting
    // band, not a headline act.
    <Section
      id="ai-desk"
      className="border-t border-rule bg-paper py-16 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeader
          title={deskHeading}
          lede={deskLede}
          aside={
            <div>
              <Button asChild variant="outline" size="md">
                <Link href="/#quote">
                  Request a Quote
                  <ArrowRight />
                </Link>
              </Button>
              <p className="mt-3 text-xs text-faint">
                {contact.desk.hours} · {contact.desk.languages}
              </p>
            </div>
          }
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5">
          {deskPoints.map((point, i) => (
            <Reveal
              as="li"
              key={point.title}
              delay={i * 0.04}
              className="flex flex-col rounded-xl border border-rule bg-mist p-5 sm:last:col-span-2 lg:last:col-span-1"
            >
              <span className="eyebrow tnum text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[0.9375rem] font-medium leading-snug text-navy-900">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {point.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
