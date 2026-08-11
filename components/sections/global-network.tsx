import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";

/**
 * Global network — a split section: heading and copy on the left, network
 * footage on the right. Swap the `src` below to change the video; the frame
 * keeps its aspect ratio so the layout does not shift.
 */
export function GlobalNetwork() {
  return (
    <Section id="network" className="border-y border-rule bg-paper">
      <Container>
        <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
          {/* ---------------------------------------------------- Copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-[1.875rem] leading-[1.12] tracking-[-0.025em] text-navy-900 sm:text-[2.25rem] lg:text-[2.75rem]">
                Connected across borders.
              </h2>

              <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-navy-700">
                Direct operations on core trade lanes, extended by a vetted
                agent network across every major trading region — so a shipment
                is handled by people we know at both ends.
              </p>

              <p className="mt-5 max-w-[48ch] text-[0.9375rem] leading-[1.75] text-muted">
                Where we do not operate directly, we work with agents we have
                used for years rather than whoever is cheapest on the day. That
                is what makes an origin collection in one country and a customs
                query in another feel like the same shipment, handled by the
                same team.
              </p>

              <Button asChild variant="outline" size="md" className="mt-9">
                <Link href="/services">
                  Explore Our Services
                  <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>

          {/* --------------------------------------------------- Media */}
          <Reveal delay={0.05} className="lg:col-span-6 lg:col-start-7">
            <MediaPlaceholder
              label="GLOBAL NETWORK VIDEO"
              alt="Animated view of global freight routes connecting major trading regions"
              src="/media/global-network.webm"
              type="video"
              ratio="16/9"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="rounded-2xl"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
