/**
 * Featured solutions rendered as alternating editorial blocks on /services.
 *
 * Each media entry can stay a marked placeholder or carry a real asset — set
 * `src` (and `type` for video) and the frame keeps its aspect ratio, so
 * swapping one in never reflows the layout.
 */

export type SolutionMedia = {
  label: string;
  /** Aspect ratio used by the placeholder and the eventual real asset. */
  ratio: "4/5" | "3/2" | "16/9" | "1/1" | "4/3";
  alt: string;
  /** Omit to keep the marked placeholder. */
  src?: string;
  type?: "image" | "video";
};

export type Solution = {
  id: string;
  title: string;
  lede: string;
  body: string;
  capabilities: string[];
  media: SolutionMedia;
  /** Secondary inset media — only used by layouts that support it. */
  insetMedia?: SolutionMedia;
  /** Anchor for the matching practice area in the service directory. */
  href: string;
};

export const solutions: Solution[] = [
  {
    id: "ocean-freight",
    title: "Ocean Freight",
    lede: "Contracted capacity, controlled consolidation, and one accountable operator from booking to discharge.",
    body: "We operate as both forwarder and NVOCC, which means allocation is held under our own contracts and equipment is managed as our own. Weekly consolidation programmes on core lanes give smaller consignments the transit reliability normally reserved for full-container volume.",
    capabilities: [
      "FCL — full container load",
      "LCL — less than container load",
      "Buyer's and shipper's consolidation",
      "NVOCC house bill operations",
      "Inbound and outbound handling",
    ],
    media: {
      label: "OCEAN FREIGHT IMAGE",
      // Square to match the source asset exactly — no crop.
      ratio: "1/1",
      alt: "Operations supervisor checking documentation at the gangway as a container vessel is worked alongside",
      src: "/media/ocean-freight.webp",
      type: "image",
    },
    href: "/services#ocean-freight",
  },
  {
    id: "air-freight",
    title: "Air Freight",
    lede: "Capacity secured against the clock, for cargo where a missed schedule costs more than the freight.",
    body: "Consolidated, direct and charter options are priced and planned side by side, so the decision is made on landed transit time rather than on airline rate alone. Airport-to-airport movements are handed to our own road network at both ends.",
    capabilities: [
      "Priority, standard and deferred products",
      "Direct and consolidated services",
      "Charter and part-charter",
      "Perishables and temperature-sensitive cargo",
      "Airport transfer and final-mile delivery",
    ],
    media: {
      label: "AIR FREIGHT VIDEO",
      ratio: "4/3",
      alt: "Air cargo operations on the ramp",
      src: "/media/air-freight.webm",
      type: "video",
    },
    insetMedia: {
      label: "AIR CARGO DETAIL",
      ratio: "1/1",
      alt: "Widebody freighter aircraft being loaded at the terminal apron",
      src: "/media/air-freight-photo.webp",
      type: "image",
    },
    href: "/services#ocean-freight",
  },
];
