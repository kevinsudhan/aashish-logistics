import { AnimatedMark } from "@/components/ui/animated-mark";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * PLACEHOLDER LOGO.
 * Replace the <svg> mark with the real asset (or an <Image> of it) and keep
 * the wordmark markup for consistent alignment in the navbar and footer.
 */
export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
  animatedMark = false,
}: {
  className?: string;
  /** "dark" = navy mark on light ground, "light" = white mark on dark ground */
  tone?: "dark" | "light";
  showWordmark?: boolean;
  /** Cycle the container / ship / aircraft marks instead of the static mark. */
  animatedMark?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={`${site.legalName} home`}
    >
      {animatedMark ? <AnimatedMark /> : null}
      {animatedMark ? null : <svg
        viewBox="0 0 28 28"
        className={cn("h-7 w-7 shrink-0", isLight ? "text-white" : "text-navy-900")}
        aria-hidden
      >
        {/* Placeholder mark — a bearing line crossing a meridian */}
        <rect
          x="0.75"
          y="0.75"
          width="26.5"
          height="26.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 4.5v19M6.5 14h15"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.35"
        />
        <path
          d="M7 21 21 7"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="21" cy="7" r="2.25" fill="currentColor" />
      </svg>}

      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-[0.9375rem] font-semibold tracking-[0.02em]",
              isLight ? "text-white" : "text-navy-900",
            )}
          >
            {site.wordmark.primary.toUpperCase()}
          </span>
          <span
            className={cn(
              "mt-[3px] whitespace-nowrap text-[0.5rem] font-medium uppercase tracking-[0.18em]",
              isLight ? "text-white/55" : "text-faint",
            )}
          >
            {site.wordmark.secondary}
          </span>
        </span>
      ) : null}
    </span>
  );
}
