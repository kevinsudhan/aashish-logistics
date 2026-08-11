import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { processSteps } from "@/content/process";

/**
 * Five-step operating sequence, set on the one saturated band in the page
 * body. Horizontal with a connecting hairline on desktop; vertical against a
 * left rail on mobile.
 */
export function Process() {
  return (
    <Section id="process" className="bg-navy-900">
      <Container>
        <SectionHeader
          title="One sequence, every shipment."
          lede="The same five stages govern a single pallet and a multi-vessel project movement. Only the complexity within each stage changes."
          tone="dark"
        />

        {/* ------------------------------------------------ Desktop rail */}
        <div className="mt-16 hidden lg:mt-24 lg:block">
          <div className="relative">
            {/* Connecting hairline sits behind the step markers */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-[7px] h-px bg-white/15"
            />
            <ol className="grid grid-cols-5">
              {processSteps.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.index}
                  delay={i * 0.08}
                  className="relative pr-8"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 block size-[15px] rounded-full border border-white/30 bg-navy-900"
                  >
                    <span className="absolute inset-[3px] rounded-full bg-seafoam-bright" />
                  </span>
                  <div className="pt-12">
                    <span className="eyebrow tnum text-white/45">
                      {step.index}
                    </span>
                    <h3 className="mt-3 text-lg font-medium uppercase tracking-[0.06em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* ------------------------------------------------ Mobile stack */}
        <ol className="mt-14 lg:hidden">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.index}
              delay={i * 0.06}
              className="relative pb-9 pl-10 last:pb-0"
            >
              {i < processSteps.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-[7px] top-5 w-px bg-white/15"
                />
              ) : null}
              <span
                aria-hidden
                className="absolute left-0 top-1 block size-[15px] rounded-full border border-white/30 bg-navy-900"
              >
                <span className="absolute inset-[3px] rounded-full bg-seafoam-bright" />
              </span>
              <span className="eyebrow tnum text-white/45">{step.index}</span>
              <h3 className="mt-2 text-base font-medium uppercase tracking-[0.06em] text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
