import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
}: {
  className?: string;
  /** "dark" = navy wordmark on light ground, "light" = white on dark ground */
  tone?: "dark" | "light";
  showWordmark?: boolean;
}) {
  const isLight = tone === "light";

  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label={`${site.legalName} home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo.webp"
        alt=""
        aria-hidden
        width={45}
        height={40}
        className="h-10 w-auto shrink-0"
      />
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
