import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { allServices, serviceCategories } from "@/content/services";
import { numberWord } from "@/lib/utils";

/**
 * Homepage capability index.
 *
 * Deliberately not a services section — it names the practice areas and routes
 * into the directory rather than reproducing it here. The counts are derived
 * from the content so they cannot drift when a service or area is added.
 */
export function Capabilities() {
  const areaCount = numberWord(serviceCategories.length);

  return (
    <Section id="capabilities" className="border-y border-rule bg-bone">
      <Container>
        <SectionHeader
          title={`${areaCount} practice areas. One operating standard.`}
          lede={`Our ${allServices.length} operational services are grouped by how cargo actually moves. Each area is delivered by our own teams under a single point of accountability.`}
          aside={
            <Button asChild variant="outline" size="md">
              <Link href="/services">
                View All Services
                <ArrowRight />
              </Link>
            </Button>
          }
        />

        <ul className="mt-14 grid border-t border-rule-strong lg:mt-20 lg:grid-cols-2 lg:gap-x-16">
          {serviceCategories.map((category, i) => (
            <Reveal
              as="li"
              key={category.id}
              delay={(i % 2) * 0.05}
              className="border-b border-rule"
            >
              <Link
                href={`/services#${category.id}`}
                className="group flex items-start gap-6 border-l-2 border-transparent py-7 pl-4 outline-none transition-colors duration-200 hover:border-accent md:-mx-4 md:pr-4 md:hover:bg-paper md:focus-visible:border-accent md:focus-visible:bg-paper"
              >
                <span className="eyebrow tnum mt-1.5 shrink-0 text-faint transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[1.125rem] font-medium text-navy-900 transition-transform duration-300 ease-out md:group-hover:translate-x-1">
                      {category.label}
                    </h3>
                    <ArrowUpRight
                      className="mt-1 size-4 shrink-0 text-faint opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:-translate-x-1 md:group-hover:translate-x-0"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted">
                    {category.summary}
                  </p>
                  <p className="eyebrow mt-4 inline-block bg-accent-soft px-2 py-1 text-accent">
                    {category.services.length}{" "}
                    {category.services.length === 1 ? "Service" : "Services"}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
