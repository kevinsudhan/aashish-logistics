import { MobileQuoteBar } from "@/components/layout/mobile-quote-bar";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { GlobalNetwork } from "@/components/sections/global-network";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Process } from "@/components/sections/process";

/**
 * Homepage — the company showcase.
 *
 * Service detail lives on /services; this page carries only the capability
 * index that routes there.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Capabilities />
      <GlobalNetwork />
      <Process />
      <Contact />
      <MobileQuoteBar />
    </>
  );
}
