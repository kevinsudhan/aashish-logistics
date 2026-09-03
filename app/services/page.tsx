import type { Metadata } from "next";

import { CallToAction } from "@/components/sections/cta";
import { ServicesDirectory } from "@/components/sections/services-directory";
import { Solutions } from "@/components/sections/solutions";
import { Section } from "@/components/ui/container";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { PageHero } from "@/components/ui/page-hero";
import { allServices, serviceCategories } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ocean and air freight, project and specialised cargo, land and multimodal transport, customs and trade compliance, and digital logistics — delivered end to end.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title="Logistics solutions built around your cargo."
        media={
          <MediaPlaceholder
            label="SERVICES HERO VIDEO"
            alt="Laden container vessel under way at sea"
            src="/media/services-hero.webm"
            type="video"
            ratio="4/3"
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="rounded-2xl"
          />
        }
        meta={[
          { label: "Practice Areas", value: String(serviceCategories.length) },
          { label: "Services", value: String(allServices.length) },
          { label: "Coverage", value: "Door-to-Door, Worldwide" },
        ]}
      />

      <Section className="bg-paper">
        <ServicesDirectory />
      </Section>

      <Solutions />
      <CallToAction />
    </>
  );
}
