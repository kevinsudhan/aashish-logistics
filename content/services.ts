import {
  Anchor,
  Boxes,
  Container,
  FileText,
  Layers,
  MonitorSmartphone,
  Package,
  Plane,
  Stamp,
  TrainTrack,
  TriangleAlert,
  Truck,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import { slugify } from "@/lib/utils";

export type Service = {
  /** Directory index, 01–17. Assigned automatically at export. */
  index: string;
  name: string;
  slug: string;
  /** One-line summary used in directories and meta descriptions. */
  description: string;
  /** Longer editorial copy for the service's own page. */
  overview: string[];
  /** "What's included" rows on the service page. */
  highlights: string[];
  /** Media placeholder label for the service page hero. */
  mediaLabel: string;
  /** Alt text for the eventual real asset. */
  mediaAlt: string;
  icon: LucideIcon;
  /** Back-reference, populated at export. */
  categoryId: string;
  categoryLabel: string;
};

export type ServiceCategory = {
  id: string;
  label: string;
  summary: string;
  services: Service[];
};

type RawService = Omit<
  Service,
  "index" | "slug" | "categoryId" | "categoryLabel"
>;

const rawCategories: Array<
  Omit<ServiceCategory, "services"> & { services: RawService[] }
> = [
  {
    id: "ocean-freight",
    label: "Ocean & Air Freight",
    summary:
      "Contracted allocation with mainline carriers and airlines, backed by our own consolidation and NVOCC operations.",
    services: [
      {
        name: "FCL / LCL",
        description:
          "Full and less-than-container load movements on direct and transhipment services, with weekly sailing options across major trade lanes.",
        overview: [
          "Whether a shipment fills a container or a corner of one, it is planned against the same criteria: required delivery date, total landed cost, and the risk attached to each routing. We quote FCL and LCL side by side so the trade-off is visible rather than assumed.",
          "FCL bookings draw on contracted allocation with mainline operators. LCL consignments move on our own weekly consolidation programmes, which keeps the handling — and the accountability — inside our network rather than with a third-party groupage operator.",
        ],
        highlights: [
          "20ft, 40ft, 40ft HC and 45ft equipment",
          "Direct and transhipment routing options",
          "Weekly LCL consolidation on core lanes",
          "Shipper-owned and carrier-owned container handling",
          "Door, ramp, port and terminal delivery terms",
        ],
        mediaLabel: "FCL / LCL IMAGE",
        mediaAlt: "Containers stacked at a marine terminal awaiting loading",
        icon: Container,
      },
      {
        name: "Cargo Consolidations",
        description:
          "Buyer's and shipper's consolidation programmes that combine multiple orders into a single optimised container.",
        overview: [
          "Consolidation converts freight spend from a per-shipment cost into a planned one. We receive orders from multiple suppliers at origin, hold them to an agreed cut-off, and load to a container plan that maximises utilisation against your delivery windows.",
          "Buyer's consolidation is particularly effective where a single destination draws from many vendors. It reduces the number of arrivals to clear, receive and reconcile — often a larger saving than the freight rate itself.",
        ],
        highlights: [
          "Buyer's and shipper's consolidation programmes",
          "Origin cargo receipt and vendor management",
          "Container load planning and stuffing supervision",
          "Purchase-order level reporting",
          "Agreed weekly or fortnightly cut-offs",
        ],
        mediaLabel: "CONSOLIDATION IMAGE",
        mediaAlt: "Cargo being consolidated and loaded inside a container",
        icon: Layers,
      },
      {
        name: "NVOCC Operations — Inbound & Outbound",
        description:
          "House bill issuance, equipment control and box management on both inbound and outbound legs under our own NVOCC licence.",
        overview: [
          "Operating as a Non-Vessel Operating Common Carrier gives us direct control of the elements that usually sit outside a forwarder's reach: equipment availability, house documentation, and the commercial terms attached to the box itself.",
          "We run inbound and outbound programmes as a single balanced operation. Managing both directions on a lane improves equipment positioning and gives customers more consistent space in peak periods.",
        ],
        highlights: [
          "House bill of lading issuance under own licence",
          "Container equipment control and positioning",
          "Balanced inbound / outbound lane management",
          "Co-loading and slot arrangements",
          "Direct carrier contract negotiation",
        ],
        mediaLabel: "NVOCC OPERATIONS IMAGE",
        mediaAlt: "Container yard with equipment being repositioned",
        icon: Anchor,
      },
      {
        name: "Air Freight",
        description:
          "Consolidated, direct and charter air services with deferred, standard and priority products across global gateways.",
        overview: [
          "Air freight is bought on total transit time, not on the flight. We price the airport-to-airport leg alongside the collection, build-up, screening and delivery legs, because that is where schedules are usually won or lost.",
          "Priority, standard and deferred products are offered against the same routing so the cost of speed is explicit. Where no scheduled option meets the requirement, we quote part-charter and full-charter alternatives.",
        ],
        highlights: [
          "Priority, standard and deferred products",
          "Direct and consolidated services",
          "Charter and part-charter arrangements",
          "Perishable and temperature-sensitive handling",
          "Airport transfer and final-mile delivery",
        ],
        mediaLabel: "AIR FREIGHT IMAGE / VIDEO",
        mediaAlt: "Freighter aircraft being loaded with palletised air cargo",
        icon: Plane,
      },
    ],
  },
  {
    id: "project-cargo",
    label: "Project & Specialised Cargo",
    summary:
      "Engineered movements for cargo that will not fit a standard box, a standard lane, or a standard schedule.",
    services: [
      {
        name: "Project Cargo Handling",
        description:
          "On-site supervision, lashing and securing, heavy-lift coordination and port handling for out-of-gauge units.",
        overview: [
          "Execution is supervised by the team that produced the plan. Our people attend the load port, the discharge port and — where the cargo warrants it — the delivery site, so decisions are taken by someone who understands the whole movement.",
          "Lashing and securing is carried out to an approved cargo securing manual and, where required, certified by an independent marine warranty surveyor.",
        ],
        highlights: [
          "On-site loading and discharge supervision",
          "Lashing, securing and stowage plans",
          "Heavy-lift and crane coordination",
          "Marine warranty surveyor liaison",
          "Port and terminal handling management",
        ],
        mediaLabel: "PROJECT CARGO HANDLING IMAGE",
        mediaAlt: "Out-of-gauge cargo being secured on a flat rack at the quay",
        icon: Boxes,
      },
      {
        name: "Break Bulk Cargo",
        description:
          "Non-containerised cargo loaded directly into the hold — steel, machinery, plant and oversized units handled piece by piece.",
        overview: [
          "Cargo that cannot be containerised is booked, tallied and stowed as individual pieces, which makes the handling plan as important as the vessel booking. We arrange the port of loading, the stevedoring and the stowage position, and supervise the tally at both ends.",
          "Break bulk moves on liner and chartered tonnage depending on volume and lane. Where a shipment sits between break bulk and container, we price both so the decision rests on total landed cost rather than on habit.",
        ],
        highlights: [
          "Steel, machinery, plant and structures",
          "Liner and chartered break bulk tonnage",
          "Stevedoring and stowage planning",
          "Piece-by-piece tally and survey",
          "Lashing, securing and dunnage",
        ],
        mediaLabel: "BREAK BULK CARGO IMAGE",
        mediaAlt: "Break bulk cargo being lifted into a vessel hold",
        icon: Package,
      },
      {
        name: "Special Equipment",
        description:
          "Flat rack, open top, reefer, tank and platform equipment sourced and positioned for non-standard dimensions.",
        overview: [
          "Cargo that exceeds standard internal dimensions needs equipment secured well ahead of the booking. We source and position flat racks, open tops, platforms, tank containers and reefers against the measured dimensions of the unit, not against an assumption.",
          "Where equipment is scarce on a lane, we advise early on the alternatives — break-bulk, alternative routing, or a revised loading method — rather than allowing the shipment to wait on availability.",
        ],
        highlights: [
          "Flat rack and open top equipment",
          "Platform and bolster arrangements",
          "Tank container movements",
          "Reefer and controlled-atmosphere units",
          "Equipment sourcing and pre-positioning",
        ],
        mediaLabel: "SPECIAL EQUIPMENT IMAGE",
        mediaAlt: "Flat rack and open top containers loaded with oversized cargo",
        icon: Container,
      },
      {
        name: "Haz Cargo Handling",
        description:
          "IMDG and IATA-compliant dangerous goods movement — classification, packing certification, segregation and approvals.",
        overview: [
          "Dangerous goods are handled by certified staff against the IMDG Code for sea and IATA DGR for air. Classification, packing group, marking, labelling and documentation are checked in-house before the booking is placed, not after a carrier rejects it.",
          "We manage carrier and port approvals, segregation requirements and any restrictions applying at transhipment points, and advise where a routing change removes a restriction altogether.",
        ],
        highlights: [
          "IMDG and IATA DGR compliance",
          "Classification and packing group verification",
          "Dangerous goods declarations and packing certificates",
          "Carrier, port and terminal approvals",
          "Segregation and stowage planning",
        ],
        mediaLabel: "DANGEROUS GOODS IMAGE",
        mediaAlt: "Placarded dangerous goods container at a port terminal",
        icon: TriangleAlert,
      },
    ],
  },
  {
    id: "land-multimodal",
    label: "Land & Multimodal",
    summary:
      "Inland legs planned as part of the through-movement, not bolted on at the end.",
    services: [
      {
        name: "Transport",
        description:
          "First-mile collection and final-mile delivery by road, with dedicated, shared and oversized vehicle options.",
        overview: [
          "The road legs at either end of an international movement are where most delivery failures occur, because they are usually planned last. We schedule collection and delivery at the point of booking, against the vessel or flight schedule rather than after arrival.",
          "Dedicated, shared and specialised vehicles are available, including low loaders and extendable trailers for cargo that exceeds standard road dimensions.",
        ],
        highlights: [
          "First-mile collection and final-mile delivery",
          "Dedicated and shared vehicle options",
          "Low loader and extendable trailer capability",
          "Scheduled and time-slot deliveries",
          "Site access and offloading coordination",
        ],
        mediaLabel: "ROAD TRANSPORT IMAGE",
        mediaAlt: "Container haulage vehicles departing a distribution yard",
        icon: Truck,
      },
      {
        name: "ICD Movements",
        description:
          "Inland container depot handling and rail-linked repositioning between seaports and interior terminals.",
        overview: [
          "Moving containers to an inland container depot shifts clearance and handling away from congested seaports, and frequently reduces both cost and dwell time on interior-bound cargo.",
          "We manage the rail or road leg, the depot handling, and the customs interface at the ICD, so the container arrives inland cleared and ready for delivery rather than waiting for a second process to begin.",
        ],
        highlights: [
          "Seaport to ICD repositioning",
          "Rail-linked inland movements",
          "Depot handling and storage",
          "Inland customs clearance interface",
          "Empty container return management",
        ],
        mediaLabel: "ICD MOVEMENT IMAGE",
        mediaAlt: "Containers being transferred to rail at an inland depot",
        icon: TrainTrack,
      },
      {
        name: "Multimodal Transport",
        description:
          "Single-contract movements combining sea, air, rail and road under one through bill of lading and one point of accountability.",
        overview: [
          "Where a lane has more than one viable routing, we model each combination — sea–air, rail–road, direct ocean — against cost, transit time and risk before committing to a method.",
          "The movement is then issued under a single through document. The interchanges between modes remain our responsibility, which is the point: those handover moments are where cargo is most often delayed or damaged.",
        ],
        highlights: [
          "Single through bill of lading",
          "Sea–air and rail–road combinations",
          "Routing and modal optimisation modelling",
          "One operational point of accountability",
          "Interchange and transhipment management",
        ],
        mediaLabel: "MULTIMODAL TRANSPORT IMAGE",
        mediaAlt: "Intermodal rail terminal transferring containers to road haulage",
        icon: Waypoints,
      },
    ],
  },
  {
    id: "customs-trade",
    label: "Trade & Customs",
    summary:
      "Compliance handled as an operational discipline — before the cargo arrives, not after it is held.",
    services: [
      {
        name: "Customs Clearance",
        description:
          "Import and export entry filing, tariff classification, valuation support and liaison with customs authorities.",
        overview: [
          "Entries are prepared against documents received in advance of arrival, so clearance is a formality rather than an exception. Where a query does arise, it is answered by the team already holding the file.",
          "We handle classification, valuation, duty relief and preference claims, and represent the shipment directly with the authority — including at inspection, where attendance usually determines how quickly cargo is released.",
        ],
        highlights: [
          "Import and export entry filing",
          "Pre-arrival document preparation",
          "Duty relief and preference claims",
          "Inspection attendance and authority liaison",
          "Bonded movement and warehousing interface",
        ],
        mediaLabel: "CUSTOMS CLEARANCE IMAGE",
        mediaAlt: "Customs documentation review at a freight operations desk",
        icon: Stamp,
      },
      {
        name: "Documentation",
        description:
          "Bills of lading, certificates of origin, letters of credit and shipping instructions prepared and checked in-house.",
        overview: [
          "Documentation errors are the most avoidable cause of delay in international freight, and the most expensive to correct once cargo has sailed. Every document set is prepared and independently checked in-house before release.",
          "For letter of credit shipments, we work to the credit terms from the outset — checking presentation requirements against what the movement can actually evidence, before the goods are shipped rather than at presentation.",
        ],
        highlights: [
          "Bills of lading and air waybills",
          "Certificates of origin and legalisation",
          "Letter of credit document preparation",
          "Shipping instructions and cargo manifests",
          "Independent pre-release document checking",
        ],
        mediaLabel: "DOCUMENTATION IMAGE",
        mediaAlt: "Shipping documentation being prepared and checked",
        icon: FileText,
      },
    ],
  },
  {
    id: "digital-logistics",
    label: "Digital Logistics",
    summary:
      "Operational data made available to the people who need to act on it.",
    services: [
      {
        name: "Digital Customer Service",
        description:
          "Shipment tracking, milestone alerts, digital document access and a named operational contact in a single interface.",
        overview: [
          "Consolidation is an information business as much as a transport one. Our digital layer exposes the same operational record our own teams work from, so planning, finance and warehouse teams are not waiting on an email to know where cargo stands.",
          "Tracking runs at container and air waybill level across every leg. Milestone and exception alerts are routed to the people who need to act on them, and documents are issued and archived against the shipment record.",
        ],
        highlights: [
          "Container and AWB level shipment tracking",
          "Milestone and exception alerting",
          "Digital document issuance and archive",
          "Lane, cost and transit reporting",
          "Named operational contact per file",
        ],
        mediaLabel: "DIGITAL LOGISTICS DASHBOARD IMAGE / VIDEO",
        mediaAlt: "Shipment tracking dashboard showing active consignments",
        icon: MonitorSmartphone,
      },
    ],
  },
];

let counter = 0;
export const serviceCategories: ServiceCategory[] = rawCategories.map(
  (category) => ({
    ...category,
    services: category.services.map((service) => {
      counter += 1;
      return {
        ...service,
        index: String(counter).padStart(2, "0"),
        slug: slugify(service.name),
        categoryId: category.id,
        categoryLabel: category.label,
      };
    }),
  }),
);

export const allServices: Service[] = serviceCategories.flatMap(
  (category) => category.services,
);
