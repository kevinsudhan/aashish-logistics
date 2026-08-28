import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { deskHeading, deskLede, deskPoints } from "@/content/ai-desk";
import { contact } from "@/content/site";

/**
 * The AI quote desk, condensed to one section: the pitch and phone CTA on the
 * left, the five substantive claims as hairline rows on the right.
 */
export function AiDesk() {
  const telHref = `tel:${contact.desk.phone.replace(/[\s-]/g, "")}`;

  return (
    <Section id="ai-desk" className="border-t border-rule bg-paper">
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          {/* ------------------------------------------ Pitch and CTA */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-[1.75rem] leading-[1.12] tracking-[-0.025em] text-navy-900 sm:text-[2.125rem] lg:text-[2.5rem]">
                {deskHeading}
              </h2>

              <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
                {deskLede}
              </p>

              <div className="mt-9">
                <Button asChild size="lg" variant="primary">
                  <a href={telHref}>
                    <Phone strokeWidth={1.75} />
                    <span className="tnum">{contact.desk.phone}</span>
                  </a>
                </Button>

                <p className="mt-4 text-xs text-faint">
                  {contact.desk.hours} · {contact.desk.languages}
                </p>

                <Link
                  href="/#quote"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy-900 transition-colors hover:text-accent"
                >
                  Or send your details instead
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------- The claims */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-rule-strong">
              {deskPoints.map((point, i) => (
                <Reveal
                  as="li"
                  key={point.title}
                  delay={i * 0.04}
                  className="border-b border-rule py-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow tnum shrink-0 text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.0625rem] font-medium leading-snug text-navy-900">
                      {point.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[62ch] pl-10 text-sm leading-relaxed text-muted">
                    {point.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
