import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The site grid. A single max width with generous gutters keeps every
 * section aligned to the same vertical rules.
 */
export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/** Standard vertical rhythm for a page section. */
export function Section({
  className,
  as: Comp = "section",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return (
    <Comp
      className={cn("py-20 md:py-28 lg:py-32", className)}
      {...props}
    />
  );
}
