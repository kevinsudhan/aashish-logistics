import { Container, Section } from "@/components/ui/container";

/**
 * Instant navigation feedback for /services.
 *
 * The built page is static and responds in milliseconds, so this rarely shows
 * in production — but it removes the "nothing happened" pause on a slow
 * connection, and while the dev server compiles the route on first visit.
 * The skeleton mirrors the real masthead so the swap is not jarring.
 */
export default function ServicesLoading() {
  return (
    <div aria-busy="true" aria-label="Loading services">
      <div className="border-b border-rule bg-bone pt-28 lg:pt-36">
        <Container>
          <div className="animate-pulse">
            {/* Breadcrumb */}
            <div className="flex gap-2">
              <div className="h-3 w-12 rounded bg-navy-200/70" />
              <div className="h-3 w-16 rounded bg-navy-200/70" />
            </div>

            {/* Headline + lede */}
            <div className="mt-10 grid gap-x-12 gap-y-6 pb-16 lg:mt-14 lg:grid-cols-12 lg:pb-24">
              <div className="space-y-4 lg:col-span-6">
                <div className="h-9 w-full rounded bg-navy-200/70" />
                <div className="h-9 w-4/5 rounded bg-navy-200/70" />
              </div>
              <div className="space-y-3 lg:col-span-5 lg:col-start-8 lg:self-end">
                <div className="h-3 w-full rounded bg-navy-200/50" />
                <div className="h-3 w-11/12 rounded bg-navy-200/50" />
                <div className="h-3 w-3/4 rounded bg-navy-200/50" />
              </div>
            </div>

            {/* Meta strip */}
            <div className="grid grid-cols-1 border-t border-rule sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="py-5 pr-6">
                  <div className="h-2.5 w-24 rounded bg-navy-200/50" />
                  <div className="mt-3 h-3.5 w-32 rounded bg-navy-200/70" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Directory rows */}
      <Section className="bg-paper">
        <Container>
          <div className="animate-pulse space-y-12">
            {[0, 1].map((group) => (
              <div key={group} className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <div className="h-3.5 w-40 rounded bg-navy-200/70" />
                  <div className="mt-4 space-y-2">
                    <div className="h-2.5 w-full rounded bg-navy-200/50" />
                    <div className="h-2.5 w-5/6 rounded bg-navy-200/50" />
                  </div>
                </div>
                <div className="space-y-6 lg:col-span-8 lg:col-start-5">
                  {[0, 1, 2].map((row) => (
                    <div key={row} className="border-b border-rule pb-6">
                      <div className="h-3.5 w-56 rounded bg-navy-200/70" />
                      <div className="mt-3 h-2.5 w-full rounded bg-navy-200/50" />
                      <div className="mt-2 h-2.5 w-4/5 rounded bg-navy-200/50" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
