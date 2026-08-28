/**
 * Single source of truth for company identity, navigation and contact data.
 * Replace the placeholder contact values here — no component edits required.
 */

export const site = {
  /** Short form, used where the full name would crowd the layout. */
  name: "Aashish",
  legalName: "Aashish Logistics Global",
  /** Two-line lockup rendered by the logo mark. */
  wordmark: { primary: "Aashish", secondary: "Logistics Global" },
  tagline: "Cargo Consolidation & Global Logistics",
  description:
    "Aashish Logistics Global is a cargo consolidation agent and NVOCC operator providing sea and air freight, break bulk and project cargo.",
  /** Canonical origin. Drives metadataBase, canonicals, OG URLs, sitemap. */
  url: "https://aashishlogisticsglobal.com",
  foundedYear: 2026,
} as const;

/**
 * Primary navigation.
 *
 * Company content lives on the homepage as sections; services live on their
 * own routes. Anchors are absolute ("/#about") so they resolve correctly from
 * interior pages too.
 */
export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/#contact" },
];

export const quoteHref = "/#quote";

export const contact = {
  addressLabel: "Head Office",
  address: [
    "No 55 W Block, 3B 3rd Floor",
    "3rd Main Road, Anna Nagar",
    "Chennai - 600040",
  ],
  /** Displayed as given; the `*Dial` forms are E.164, used in tel: links. */
  phone: "044 4811 6348",
  phoneDial: "+914448116348",
  mobile: "+91 97908 48744",
  mobileDial: "+919790848744",
  email: "info@aashishlogistics.com",
  operations: {
    label: "Operations Desk",
    detail: "24/7 shipment support",
    email: "operations@example.com",
  },
  /** Availability line for the AI quote desk section. */
  desk: {
    hours: "Answered 24 hours",
    languages: "English and 22 Indian languages",
  },
} as const;


