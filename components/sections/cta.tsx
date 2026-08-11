import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";

/**
 * Light, premium CTA. The media sits behind a paper scrim rather than a
 * colour wash — the section stays part of the white-ground system.
 */
export function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden border-b border-rule">
      {/* Background media */}
      <div className="absolute inset-0 -z-10">
        <MediaPlaceholder
          label="CTA BACKGROUND IMAGE / VIDEO"
          note="Wide port, road or terminal footage. Sits behind a light scrim."
          alt="Aerial view of a container terminal at dawn"
          fill
          className="ring-0"
          sizes="100vw"
        />
        {/* Scrim keeps text legible once real photography is dropped in */}
        <div aria-hidden className="absolute inset-0 bg-mist/88" />
      </div>

      <Container>
        <div className="grid gap-x-16 gap-y-10 py-24 md:py-32 lg:grid-cols-12 lg:py-40">
          <Reveal className="lg:col-span-6">
            <h2 className="text-[2rem] leading-[1.1] tracking-[-0.03em] text-navy-900 sm:text-[2.5rem] lg:text-[3.25rem]">
              Let&rsquo;s move your cargo forward.
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-navy-700">
              Tell us what you&rsquo;re moving, where it needs to go, and when it
              needs to arrive.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="primary">
                <Link href="/#quote">
                  Request a Quote
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
