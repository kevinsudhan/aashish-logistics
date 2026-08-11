import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type SectionHeaderProps = {
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Content pinned beneath the lede, or to the right when there is no lede. */
  aside?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  tone?: "light" | "dark";
};

/**
 * The recurring section opener: a controlled headline with an optional lede in
 * the second column. No rule, index or eyebrow — sections lead with the
 * headline itself.
 */
export function SectionHeader({
  title,
  lede,
  aside,
  className,
  titleClassName,
  tone = "light",
}: SectionHeaderProps) {
  return (
    <Reveal as="header" className={className}>
      <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
        <h2
          className={cn(
            "text-[1.75rem] leading-[1.12] sm:text-[2.125rem] lg:text-[2.75rem]",
            lede || aside ? "lg:col-span-6" : "lg:col-span-8",
            tone === "dark" && "text-white",
            titleClassName,
          )}
        >
          {title}
        </h2>

        {lede ? (
          <div className="lg:col-span-5 lg:col-start-8">
            <div
              className={cn(
                "max-w-[52ch] text-[0.9375rem] leading-relaxed",
                tone === "dark" ? "text-white/70" : "text-muted",
              )}
            >
              {lede}
            </div>
            {aside ? <div className="mt-8">{aside}</div> : null}
          </div>
        ) : null}

        {aside && !lede ? (
          <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            {aside}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

