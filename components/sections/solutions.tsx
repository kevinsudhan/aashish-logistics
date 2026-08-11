import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { solutions, type Solution } from "@/content/solutions";
import { cn } from "@/lib/utils";

/**
 * Two featured solutions on mirrored layouts, so the pair reads as an edited
 * sequence rather than a repeated template.
 */
export function Solutions() {
  const [ocean, air] = solutions;

  return (
    <section id="solutions">
      <Section className="border-t border-rule bg-paper pb-0">
        <Container>
          <SectionHeader
            title="Depth where it counts."
            lede="Two areas where our own operations, equipment control and licences make a measurable difference to transit time and landed cost."
          />
        </Container>
      </Section>

      <MediaLeft solution={ocean} />
      <MediaRightInset solution={air} />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout A — tall media left, content right                                   */
/* -------------------------------------------------------------------------- */

function MediaLeft({ solution }: { solution: Solution }) {
  return (
    <Section id={solution.id} className="bg-paper">
      <Container>
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <MediaPlaceholder
              label={solution.media.label}
              alt={solution.media.alt}
              ratio={solution.media.ratio}
              src={solution.media.src}
              type={solution.media.type}
              note="Replace with vessel or terminal footage."
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="rounded-2xl"
            />
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <SolutionCopy solution={solution} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout B — content left, media right with an offset inset frame             */
/* -------------------------------------------------------------------------- */

function MediaRightInset({ solution }: { solution: Solution }) {
  return (
    <Section id={solution.id} className="border-y border-rule bg-bone">
      <Container>
        <div className="grid items-center gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SolutionCopy solution={solution} />
          </div>

          <Reveal delay={0.05} className="relative lg:col-span-7 lg:col-start-6">
            <MediaPlaceholder
              label={solution.media.label}
              alt={solution.media.alt}
              ratio={solution.media.ratio}
              src={solution.media.src}
              type={solution.media.type}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="rounded-2xl"
            />
            {solution.insetMedia ? (
              <div className="absolute -bottom-10 -left-10 hidden w-52 xl:block">
                <MediaPlaceholder
                  label={solution.insetMedia.label}
                  alt={solution.insetMedia.alt}
                  ratio={solution.insetMedia.ratio}
                  src={solution.insetMedia.src}
                  type={solution.insetMedia.type}
                  className="rounded-xl ring-4 ring-bone"
                  sizes="208px"
                />
              </div>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared pieces                                                               */
/* -------------------------------------------------------------------------- */

function SolutionCopy({ solution }: { solution: Solution }) {
  return (
    <Reveal delay={0.05}>
      <h3 className="text-[1.75rem] leading-[1.15] tracking-[-0.025em] text-navy-900 lg:text-[2.25rem]">
        {solution.title}
      </h3>

      <p className="mt-5 text-[1.0625rem] leading-relaxed text-navy-700">
        {solution.lede}
      </p>

      <p className="mt-5 text-[0.9375rem] leading-[1.75] text-muted">
        {solution.body}
      </p>

      <CapabilityList capabilities={solution.capabilities} className="mt-9" />

      <Button asChild variant="outline" size="md" className="mt-9">
        <Link href={solution.href}>
          Learn More
          <ArrowRight />
        </Link>
      </Button>
    </Reveal>
  );
}

function CapabilityList({
  capabilities,
  className,
}: {
  capabilities: string[];
  className?: string;
}) {
  return (
    <ul className={cn("border-t border-rule", className)}>
      {capabilities.map((capability) => (
        <li
          key={capability}
          className="flex items-baseline gap-3 border-b border-rule py-3 text-sm text-navy-800"
        >
          <span aria-hidden className="mt-1.5 h-px w-3 shrink-0 bg-navy-300" />
          {capability}
        </li>
      ))}
    </ul>
  );
}
