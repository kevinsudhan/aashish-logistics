"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  ServicesMenuMobile,
  ServicesMenuPanel,
} from "@/components/layout/services-menu";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { navItems, quoteHref } from "@/content/site";
import { cn } from "@/lib/utils";

/** Broadcast so sibling fixed elements can yield to the open menu. */
export const MENU_EVENT = "aashish:menu-toggle";

/** Only the Services item opens the mega-menu — one trigger, one panel. */
const MEGA_MENU_HREF = "/services";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** A nav item is active when its route segment matches the current path. */
  const isActive = (href: string) => {
    const [path] = href.split("#");
    if (!path || path === "/") return pathname === "/" && !href.includes("#");
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  /* ----------------------------------------------- mega-menu timing ---
     A short close delay lets the pointer travel diagonally from the
     trigger into the panel without the menu collapsing underneath it. */
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const closeMega = (immediate = false) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (immediate) {
      setMegaOpen(false);
      return;
    }
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Let other fixed UI (the mobile quote bar) react to the menu state
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: { open } }));
  }, [open]);

  // Close everything whenever navigation completes
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Escape closes whichever menu is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      closeMega(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the mobile panel is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      // Closing here rather than on the trigger makes the trigger, the gap
      // beneath it and the panel one continuous hover region: the panel is a
      // DOM descendant, so mouseleave cannot fire while the pointer is on it.
      onMouseLeave={() => closeMega()}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[height,background-color,border-color] duration-300 ease-out",
        // NB: deliberately not keyed to `megaOpen`. Shrinking the bar on hover
        // moved the nav row out from under the cursor, which fired mouseleave,
        // which closed the menu, which grew the bar back — an endless flicker.
        // Only scroll (and the click-driven mobile panel) may change height.
        scrolled || open
          ? "h-16 border-rule bg-paper/95 backdrop-blur-sm"
          : "h-20 border-transparent bg-paper lg:h-[88px]",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-8">
        <Link
          href="/"
          className="shrink-0 rounded-[2px]"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const hasMenu = item.href === MEGA_MENU_HREF;

              return (
                <li
                  key={item.label}
                  // Entering any other nav item dismisses the panel at once.
                  onMouseEnter={hasMenu ? openMega : () => closeMega(true)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={hasMenu ? megaOpen : undefined}
                    aria-haspopup={hasMenu ? "true" : undefined}
                    onFocus={hasMenu ? openMega : () => closeMega(true)}
                    className={cn(
                      "group relative inline-flex items-center gap-1 py-2 text-[0.8125rem] font-medium transition-colors duration-200 hover:text-navy-900",
                      active ? "text-navy-900" : "text-ink-soft",
                    )}
                  >
                    {item.label}
                    {hasMenu ? (
                      <ChevronDown
                        className={cn(
                          "size-3 text-faint transition-transform duration-200",
                          megaOpen && "rotate-180",
                        )}
                        aria-hidden
                      />
                    ) : null}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 -bottom-px h-px origin-left bg-navy-900 transition-transform duration-300 ease-out group-hover:scale-x-100",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>

                  {/* Anchored to the <header>, the nearest positioned
                      ancestor. Closing is owned by the header; re-opening on
                      enter just cancels any close already in flight. */}
                  {hasMenu ? (
                    <div
                      inert={!megaOpen}
                      onMouseEnter={openMega}
                      className={cn(
                        "absolute inset-x-0 top-full border-b border-rule bg-paper shadow-[0_16px_32px_-24px_rgba(11,27,40,0.25)] transition-[opacity,transform] duration-200 ease-out",
                        megaOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0",
                      )}
                    >
                      <Container>
                        <ServicesMenuPanel
                          onNavigate={() => closeMega(true)}
                        />
                      </Container>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            <Link href={quoteHref}>Get a Quote</Link>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-[2px] text-navy-900 transition-colors hover:bg-bone lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel — slides down beneath the bar */}
      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full origin-top overflow-y-auto border-b border-rule bg-paper transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-2">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-rule">
              {navItems.map((item, i) => {
                const hasMenu = item.href === "/services";

                return (
                  <li key={item.label}>
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex flex-1 items-baseline gap-4 py-4 text-lg text-navy-900"
                      >
                        <span className="eyebrow tnum w-6 text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>

                      {hasMenu ? (
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          aria-expanded={mobileServicesOpen}
                          aria-label={
                            mobileServicesOpen
                              ? "Collapse services"
                              : "Expand services"
                          }
                          className="inline-flex size-9 items-center justify-center rounded-[2px] text-navy-700 transition-colors hover:bg-bone"
                        >
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-200",
                              mobileServicesOpen && "rotate-180",
                            )}
                          />
                        </button>
                      ) : null}
                    </div>

                    {hasMenu ? (
                      <div
                        inert={!mobileServicesOpen}
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                          mobileServicesOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <ServicesMenuMobile
                            onNavigate={() => setOpen(false)}
                          />
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="py-5">
            <Button asChild size="md" className="w-full" variant="primary">
              <Link href={quoteHref} onClick={() => setOpen(false)}>
                Get a Quote
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
