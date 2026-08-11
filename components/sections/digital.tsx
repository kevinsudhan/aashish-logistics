import { Bell, FileCheck2, MapPin, MessagesSquare, Radar } from "lucide-react";

import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const capabilities = [
  {
    icon: MapPin,
    title: "Shipment tracking",
    description: "Container and AWB level status across every leg of the move.",
  },
  {
    icon: FileCheck2,
    title: "Digital documentation",
    description: "Bills, invoices and certificates issued and archived online.",
  },
  {
    icon: Bell,
    title: "Status updates",
    description: "Milestone and exception alerts routed to the right people.",
  },
  {
    icon: MessagesSquare,
    title: "Customer communication",
    description: "A named operations contact against every active file.",
  },
  {
    icon: Radar,
    title: "Operational visibility",
    description: "Lane, cost and transit reporting across your whole portfolio.",
  },
];

export function Digital() {
  return (
    <Section id="digital" className="border-t border-rule bg-paper">
      <Container>
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          {/* ---------------------------------------------------- Copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-[1.875rem] leading-[1.15] tracking-[-0.025em] text-navy-900 lg:text-[2.5rem]">
                Visibility beyond the shipment.
              </h2>
              <p className="mt-6 max-w-[48ch] text-[0.9375rem] leading-[1.75] text-muted">
                Freight forwarding is an information business as much as a
                transport one. Our digital layer exposes the same operational
                record our teams work from — so planning, finance and warehouse
                teams are not waiting on an email to know where cargo stands.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-10 border-t border-rule">
                {capabilities.map((capability) => {
                  const Icon = capability.icon;
                  return (
                    <li
                      key={capability.title}
                      className="flex gap-4 border-b border-rule py-4"
                    >
                      <Icon
                        className="mt-0.5 size-[18px] shrink-0 text-navy-400"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <div>
                        <h3 className="text-sm font-medium text-navy-900">
                          {capability.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {capability.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* ----------------------------------------------- Dashboard */}
          <Reveal delay={0.05} className="lg:col-span-6 lg:col-start-7">
            <DashboardMock />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * [DIGITAL LOGISTICS DASHBOARD IMAGE / VIDEO PLACEHOLDER]
 *
 * A deliberately minimal, static representation of the tracking interface —
 * enough to read as real product without pretending to be a live dashboard.
 * To use a real screenshot or screen recording instead, replace this whole
 * component with:
 *   <MediaPlaceholder label="DIGITAL LOGISTICS DASHBOARD" ratio="4/5"
 *     src="/media/dashboard.webp" alt="…" />
 */
function DashboardMock() {
  const shipments = [
    {
      ref: "ASH-48210",
      lane: "Shanghai → Rotterdam",
      mode: "Ocean FCL",
      status: "In transit",
      progress: 62,
      active: true,
    },
    {
      ref: "ASH-48196",
      lane: "Jebel Ali → Nhava Sheva",
      mode: "Ocean LCL",
      status: "Customs",
      progress: 84,
      active: false,
    },
    {
      ref: "ASH-48174",
      lane: "Singapore → Sydney",
      mode: "Air Freight",
      status: "Delivered",
      progress: 100,
      active: false,
    },
  ];

  const milestones = ["Booked", "Departed", "In transit", "Cleared", "Delivered"];

  return (
    <div className="border border-rule bg-paper">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-rule bg-mist px-5 py-3.5">
        <span className="eyebrow text-navy-800">Shipment Overview</span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-accent motion-safe:animate-[node-pulse_3s_ease-out_infinite]"
          />
          <span className="eyebrow text-faint">Live</span>
        </span>
      </div>

      {/* Summary figures */}
      <dl className="grid grid-cols-3 border-b border-rule">
        {[
          { k: "Active", v: "34" },
          { k: "In Customs", v: "06" },
          { k: "Exceptions", v: "01" },
        ].map((item, i) => (
          <div
            key={item.k}
            className={i < 2 ? "border-r border-rule px-5 py-4" : "px-5 py-4"}
          >
            <dd className="tnum text-2xl font-medium tracking-[-0.02em] text-accent">
              {item.v}
            </dd>
            <dt className="eyebrow mt-2 text-faint">{item.k}</dt>
          </div>
        ))}
      </dl>

      {/* Shipment rows */}
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment.ref} className="border-b border-rule px-5 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="tnum text-[0.8125rem] font-medium text-navy-900">
                {shipment.ref}
              </span>
              <span className="eyebrow text-faint">{shipment.mode}</span>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="text-[0.8125rem] text-muted">
                {shipment.lane}
              </span>
              <span
                className={
                  shipment.active
                    ? "eyebrow bg-accent-soft px-2 py-1 text-accent"
                    : "eyebrow bg-bone px-2 py-1 text-muted"
                }
              >
                {shipment.status}
              </span>
            </div>
            <div
              className="mt-3 h-px w-full bg-rule"
              role="img"
              aria-label={`${shipment.progress}% of route completed`}
            >
              <div
                className="h-px bg-accent"
                style={{ width: `${shipment.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Milestone strip */}
      <div className="flex items-center justify-between gap-2 px-5 py-4">
        {milestones.map((milestone, i) => (
          <span
            key={milestone}
            className={
              i <= 2
                ? "eyebrow text-[0.5625rem] text-navy-800"
                : "eyebrow text-[0.5625rem] text-faint"
            }
          >
            {milestone}
          </span>
        ))}
      </div>

      {/* Placeholder tag */}
      <p className="border-t border-rule bg-bone px-5 py-3 text-[0.625rem] uppercase tracking-[0.14em] text-faint">
        [ Dashboard image / video placeholder ]
      </p>
    </div>
  );
}

