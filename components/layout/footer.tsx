import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { contact, site } from "@/content/site";

/** Address as a single line, for the map query and the directions link. */
const mapQuery = encodeURIComponent(contact.address.join(", "));

/**
 * Deep navy footer — the one saturated block on the page. It anchors the
 * light editorial system rather than introducing a dark theme.
 */
export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <Container>
        <div className="grid gap-x-12 gap-y-12 py-16 lg:grid-cols-12 lg:py-20">
          {/* ------------------------------------------- Identity */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
          </div>

          {/* -------------------------------------------- Contact */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h2 className="eyebrow text-white/60">Contact</h2>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-white/45">
                  {contact.addressLabel}
                </dt>
                <dd>
                  <address className="mt-2 text-sm not-italic leading-relaxed text-white/80">
                    {contact.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-white/45">
                  Telephone
                </dt>
                <dd className="mt-2 text-sm">
                  <a
                    href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-white/45">
                  Email
                </dt>
                <dd className="mt-2 text-sm">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* ------------------------------------------------ Map */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="eyebrow text-white/60">Find Us</h2>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/15">
              <iframe
                title={`Map showing ${site.legalName} head office`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-56 w-full grayscale-[0.4] contrast-[1.05] transition-[filter] duration-500 hover:grayscale-0"
              />
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
            >
              Get directions
              <ArrowUpRight className="size-3.5 text-white/40 transition-colors group-hover:text-white" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
