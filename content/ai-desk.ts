/**
 * AI freight desk — condensed from the full capability deck into the five
 * claims that carry it. Deliberately excludes the customer portal and the
 * live 3D container view: those describe software, not a marketing claim,
 * and should only go up once they can be demonstrated.
 */

export type DeskPoint = { title: string; description: string };

export const deskHeading = "Call the desk. Get a quote before you hang up.";

export const deskLede =
  "Our AI-powered freight desk answers every call, checks that container space physically exists, and quotes your shipment while you are still on the line.";

export const deskPoints: DeskPoint[] = [
  {
    title: "Answered in seconds, at any hour",
    description:
      "Every call is picked up immediately — no queue, no hold music, no waiting on a callback. Ten people can call at once and all ten get answered.",
  },
  {
    title: "Tamil and English, as you speak them",
    description:
      "Describe your cargo the way you would to a colleague. The desk follows you mid-sentence between languages, and greets you next time in the one you used.",
  },
  {
    title: "A real price, from a real rate card",
    description:
      "Quotes come from our published rates for that lane. Where we do not price a route you are told so on the call and given a callback — never an invented number.",
  },
  {
    title: "Space checked, not estimated",
    description:
      "Volume lies: 30 CBM looks like it fits a 33 CBM container, but a 2.6 m crate will not enter a 2.39 m box in any orientation. Cargo is checked in three dimensions before we quote, so when we say there is space, it loads.",
  },
  {
    title: "Documents prepared from your call",
    description:
      "Booking confirmation through to bill of lading, built from what you told us. Anything still missing is shown as a gap rather than filled with a guess.",
  },
];
