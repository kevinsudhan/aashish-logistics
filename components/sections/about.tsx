import { Container, Section } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { site } from "@/content/site";

export function About() {
  return (
    <Section id="company" className="border-t border-rule bg-bone">
      <Container>
        <SectionHeader
          title="A freight forwarder built around accountability."
          lede="We were established to remove the handovers that make international freight unpredictable — by holding operations, compliance and customer service under one roof."
        />

        <div className="mt-16 grid gap-x-16 gap-y-12 lg:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <MediaPlaceholder
              label="ABOUT COMPANY IMAGE"
              note="Operations team, control room or terminal photography."
              alt="Aashish Logistics operations team coordinating shipments from the control desk"
              ratio="4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.05}>
              <p className="text-[1.25rem] leading-[1.5] tracking-[-0.015em] text-navy-800 lg:text-[1.5rem]">
                Freight rarely fails on the water. It fails at the interfaces —
                between the shipper and the forwarder, the forwarder and the
                carrier, the carrier and the customs broker.
              </p>
              <div className="mt-8 space-y-6 text-[0.9375rem] leading-[1.75] text-muted">
                <p>
                  {site.legalName} is structured to own those interfaces. Booking,
                  consolidation, documentation, clearance and inland transport
                  sit with the same team, working from one file and one system.
                  When something moves — a rolled booking, a customs query, a
                  berthing delay — the person who tells you is the person who is
                  already fixing it.
                </p>
                <p>
                  That model scales from a single LCL consignment to a
                  multi-vessel project movement. It is supported by our own NVOCC
                  operations, in-house customs capability, and a digital layer
                  that makes the operational record available to everyone
                  planning around the cargo.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

      </Container>
    </Section>
  );
}
