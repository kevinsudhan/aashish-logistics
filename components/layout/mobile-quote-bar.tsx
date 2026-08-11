"use client";

import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MENU_EVENT } from "@/components/layout/navbar";
import { contact, quoteHref } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Small-screen persistent access to the two actions that matter.
 * Appears after the hero and retracts once the quote form is in view.
 */
export function MobileQuoteBar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Yield to the mobile navigation panel rather than competing with it
  useEffect(() => {
    const onMenu = (event: Event) => {
      setMenuOpen((event as CustomEvent<{ open: boolean }>).detail.open);
    };
    window.addEventListener(MENU_EVENT, onMenu);
    return () => window.removeEventListener(MENU_EVENT, onMenu);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const form = document.getElementById("quote");
      const formInView = form
        ? form.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(past && !formInView);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown = visible && !menuOpen;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/97 backdrop-blur-sm transition-transform duration-300 ease-out lg:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      inert={!shown}
    >
      <div className="flex items-stretch">
        <a
          href={`tel:${contact.phone.replace(/\s/g, "")}`}
          tabIndex={shown ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 border-r border-rule py-4 text-sm font-medium text-navy-900"
        >
          <Phone className="size-4" strokeWidth={1.75} />
          Call Us
        </a>
        <Link
          href={quoteHref}
          tabIndex={shown ? 0 : -1}
          className="flex flex-[1.4] items-center justify-center gap-2 bg-navy-900 py-4 text-sm font-medium text-white"
        >
          Get a Quote
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
