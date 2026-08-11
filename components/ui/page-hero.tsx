import { ChevronRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Masthead for interior pages: breadcrumb, controlled headline, and either a
 * lede or a media block in the second column. Sits directly under the fixed
 * navbar, so it carries its own top padding.
 */
export function PageHero({
  crumbs,
  title,
  lede,
  media,
  meta,
  className,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Occupies the second column; takes precedence over `lede`. */
  media?: React.ReactNode;
  /** Optional key/value pairs rendered as a hairline strip. */
  meta?: Array<{ label: string; value: string }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-rule bg-bone pt-28 lg:pt-36",
        className,
      )}
    >
      <Container>
        <Breadcrumb crumbs={crumbs} />

        <Reveal className="mt-10 lg:mt-14">
          <div
            className={cn(
              "grid gap-x-12 gap-y-8 pb-16 lg:grid-cols-12 lg:pb-24",
              media && "lg:items-center",
            )}
          >
            <h1 className="text-[2.125rem] leading-[1.08] tracking-[-0.03em] text-navy-900 sm:text-[2.75rem] lg:col-span-6 lg:text-[3.25rem]">
              {title}
            </h1>

            {media ? (
              <div className="lg:col-span-5 lg:col-start-8">{media}</div>
            ) : lede ? (
              <div className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-8 lg:self-end">
                {lede}
              </div>
            ) : null}
          </div>
        </Reveal>

        {meta && meta.length > 0 ? (
          <dl className="grid grid-cols-1 border-t border-rule sm:grid-cols-3">
            {meta.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 border-b border-rule py-4 sm:block sm:border-b-0 sm:py-5 sm:pr-6"
              >
                <dt className="eyebrow text-faint">{item.label}</dt>
                <dd className="text-sm font-medium text-navy-900 sm:mt-2">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </div>
  );
}

function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="eyebrow text-muted transition-colors hover:text-navy-900"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="eyebrow text-navy-900"
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight className="size-3 text-faint" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
