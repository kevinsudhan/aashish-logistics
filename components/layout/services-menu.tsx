import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { allServices, serviceCategories } from "@/content/services";
import { quoteHref } from "@/content/site";

/**
 * Contents of the Services mega-menu. Split out from the navbar so the panel
 * markup stays readable; the navbar owns all open/close behaviour.
 */
export function ServicesMenuPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-x-10 py-10">
      {/* ------------------------------------------- Category columns */}
      <div className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-9">
        {serviceCategories.map((category) => (
          <div key={category.id}>
            <Link
              href={`/services#${category.id}`}
              onClick={onNavigate}
              className="eyebrow text-accent transition-colors hover:text-accent-hover"
            >
              {category.label}
            </Link>

            <ul className="mt-4 space-y-2.5">
              {category.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${category.id}`}
                    onClick={onNavigate}
                    className="group flex items-baseline gap-2.5 text-[0.8125rem] leading-snug text-ink-soft transition-colors hover:text-navy-900"
                  >
                    <span className="eyebrow tnum shrink-0 text-faint transition-colors group-hover:text-accent">
                      {service.index}
                    </span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------ Side panel */}
      <div className="col-span-3 border-l border-rule pl-10">
        <p className="text-[0.9375rem] leading-relaxed text-navy-800">
          {allServices.length} operational services across{" "}
          {serviceCategories.length} practice areas, delivered under a single
          point of accountability.
        </p>

        <Link
          href="/services"
          onClick={onNavigate}
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy-900 transition-colors hover:text-accent"
        >
          View all services
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>

        <div className="mt-8 border-t border-rule pt-6">
          <p className="eyebrow text-faint">Not sure what you need?</p>
          <Link
            href={quoteHref}
            onClick={onNavigate}
            className="group mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Talk to an operations specialist
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Collapsible services list used inside the mobile navigation panel. */
export function ServicesMenuMobile({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="pb-5">
      {serviceCategories.map((category) => (
        <div key={category.id} className="border-t border-rule py-4 first:border-t-0">
          <Link
            href={`/services#${category.id}`}
            onClick={onNavigate}
            className="eyebrow text-accent"
          >
            {category.label}
          </Link>
          <ul className="mt-3 space-y-2.5">
            {category.services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${category.id}`}
                  onClick={onNavigate}
                  className="flex items-baseline gap-3 text-sm text-ink-soft"
                >
                  <span className="eyebrow tnum shrink-0 text-faint">
                    {service.index}
                  </span>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
