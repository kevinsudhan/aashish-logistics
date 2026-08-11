import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { serviceCategories, type Service } from "@/content/services";

/**
 * The full service directory: six practice areas listed in place.
 *
 * Rows are static rather than links — every service is described here in
 * full, so there is nothing to click through to.
 */
export function ServicesDirectory() {
  return (
    <Container>
      {serviceCategories.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className="grid gap-x-12 gap-y-6 border-t border-rule-strong py-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:py-14"
          aria-labelledby={`${category.id}-heading`}
        >
          {/* ------------------------------------------- Category label */}
          <Reveal className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-baseline gap-3">
                <span className="eyebrow tnum text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2
                  id={`${category.id}-heading`}
                  className="text-base font-semibold uppercase tracking-[0.08em] text-accent"
                >
                  {category.label}
                </h2>
              </div>
              <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-muted">
                {category.summary}
              </p>
            </div>
          </Reveal>

          {/* ---------------------------------------------- Service rows */}
          <div className="lg:col-span-8 lg:col-start-5">
            <ul className="border-t border-rule">
              {category.services.map((service, i) => (
                <ServiceRow
                  key={service.slug}
                  service={service}
                  delay={i * 0.04}
                />
              ))}
            </ul>
          </div>
        </section>
      ))}
    </Container>
  );
}

function ServiceRow({ service, delay }: { service: Service; delay: number }) {
  const Icon = service.icon;

  return (
    <Reveal as="li" delay={delay} className="border-b border-rule py-5">
      <div className="flex items-start gap-4 md:gap-6">
        <span className="eyebrow tnum mt-1.5 w-6 shrink-0 text-faint">
          {service.index}
        </span>

        <Icon
          className="mt-0.5 size-[18px] shrink-0 text-navy-400"
          strokeWidth={1.5}
          aria-hidden
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-[1.0625rem] font-medium leading-snug text-navy-900">
            {service.name}
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted">
            {service.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
