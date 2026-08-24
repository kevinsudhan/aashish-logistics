import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Intro() {
  return (
    <Section id="about" className="bg-paper">
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="text-[1.875rem] leading-[1.15] tracking-[-0.025em] text-navy-900 sm:text-[2.375rem] lg:text-[2.75rem]">
              From origin to destination, we manage the movement of your cargo.
            </h2>
          </Reveal>

          <div className="space-y-6 text-[0.9375rem] leading-[1.75] text-muted lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.05}>
              <p>
                We are a consolidation agent. Cargo moves on our own weekly
                consolidation programmes — received, grouped and loaded under
                our control, rather than handed to a third-party groupage
                operator. One team stays accountable from booking to delivery.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                That structure covers full and part container loads, break
                bulk, air freight, project and out-of-gauge cargo, dangerous
                goods, and multimodal movements issued under a single through
                document. Our NVOCC operations give us direct control of
                equipment and allocation on core trade lanes.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Alongside it sits a digital layer — shipment tracking, milestone
                alerts and document access — so the people planning around your
                cargo are working from the same information as the people moving
                it.
              </p>
            </Reveal>
          </div>
        </div>

      </Container>
    </Section>
  );
}
