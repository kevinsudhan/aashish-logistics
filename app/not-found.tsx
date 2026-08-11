import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="border-b border-rule bg-bone pt-28 lg:pt-36">
      <Container>
        <div className="grid gap-x-16 gap-y-8 pb-24 lg:grid-cols-12 lg:pb-32">
          <div className="lg:col-span-6">
            <span className="eyebrow flex items-center gap-3 text-accent">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              Error 404
            </span>
            <h1 className="mt-7 text-[2.125rem] leading-[1.08] tracking-[-0.03em] text-navy-900 sm:text-[2.75rem] lg:text-[3.25rem]">
              This page could not be found.
            </h1>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
              The page may have moved. You can return to the homepage or browse
              the full service directory.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="md" variant="primary">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild size="md" variant="outline">
                <Link href="/services">All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
