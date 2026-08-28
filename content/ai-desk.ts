/**
 * AI freight desk — condensed from the full capability deck into the five
 * claims that carry it, trimmed to one line each so they sit in a single
 * horizontal row. Deliberately excludes the customer portal and the live 3D
 * container view: those describe software, not a marketing claim, and should
 * only go up once they can be demonstrated.
 */

export type DeskPoint = { title: string; description: string };

export const deskHeading = "Call the desk. Get a quote before you hang up.";

export const deskLede =
  "Our AI-powered freight desk answers every call, checks that container space physically exists, and quotes your shipment while you are still on the line.";

export const deskPoints: DeskPoint[] = [
  {
    title: "Answered in seconds",
    description:
      "Every call picked up immediately — no queue, no callback. Ten callers at once, ten answered.",
  },
  {
    title: "Tamil and English",
    description:
      "Describe cargo as you would to a colleague. The desk follows you mid-sentence between languages.",
  },
  {
    title: "A real rate card",
    description:
      "Quotes come from our published rates. Unpriced routes get a callback — never an invented number.",
  },
  {
    title: "Space checked, not estimated",
    description:
      "Volume lies. Cargo is checked in three dimensions before we quote, so when we say there is space, it loads.",
  },
  {
    title: "Documents from your call",
    description:
      "Booking confirmation through to bill of lading, built from what you told us. Gaps shown, never guessed.",
  },
];
