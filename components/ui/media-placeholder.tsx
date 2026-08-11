"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/** Derive the <source> MIME type from the file extension. */
function videoMimeType(src: string) {
  const extension = src.split("?")[0].split(".").pop()?.toLowerCase();
  switch (extension) {
    case "webm":
      return "video/webm";
    case "ogv":
      return "video/ogg";
    case "mov":
      return "video/quicktime";
    default:
      return "video/mp4";
  }
}

type Ratio = "4/5" | "3/2" | "16/9" | "1/1" | "21/9" | "5/4" | "3/4" | "4/3";

const ratioClass: Record<Ratio, string> = {
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
  "5/4": "aspect-[5/4]",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
};

export type MediaPlaceholderProps = {
  /** Label shown while no asset is wired, e.g. "HERO IMAGE / VIDEO". */
  label: string;
  /** Optional second line of guidance for whoever replaces the asset. */
  note?: string;
  alt: string;
  ratio?: Ratio;
  /**
   * Drop in any of the following to replace the placeholder:
   *  - image: "/media/ocean.jpg" | ".png" | ".webp" | ".avif"
   *  - video: "/media/ocean.mp4"  (set `type="video"`)
   *  - embed: a YouTube/Vimeo embed URL (set `type="embed"`)
   */
  src?: string;
  type?: "image" | "video" | "embed";
  poster?: string;
  priority?: boolean;
  /** Fills the parent instead of imposing its own aspect ratio. */
  fill?: boolean;
  className?: string;
  /** Sizes hint for next/image; defaults to a sensible responsive value. */
  sizes?: string;
  /**
   * "center" (default) for standalone placeholders; "corner" when content is
   * overlaid on top — keeps the caption clear of the overlay.
   */
  labelPosition?: "center" | "corner";
  children?: React.ReactNode;
};

/**
 * The single media primitive used across the site.
 *
 * With no `src` it renders a clearly-marked, correctly-proportioned
 * placeholder. With a `src` it renders an optimised, lazy-loaded asset at the
 * exact same dimensions — so swapping assets never reflows the design.
 */
export function MediaPlaceholder({
  label,
  note,
  alt,
  ratio = "3/2",
  src,
  type = "image",
  poster,
  priority = false,
  fill = false,
  className,
  sizes = "(min-width: 1280px) 50vw, (min-width: 768px) 60vw, 100vw",
  labelPosition = "center",
  children,
}: MediaPlaceholderProps) {
  const [loaded, setLoaded] = useState(false);
  const reduced = useReducedMotion();

  const frame = cn(
    "relative isolate overflow-hidden bg-bone-deep",
    "ring-1 ring-inset ring-rule",
    !fill && ratioClass[ratio],
    fill && "h-full w-full",
    className,
  );

  if (src && type === "image") {
    return (
      <figure className={frame}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          onLoad={() => setLoaded(true)}
          className={cn(
            "object-cover transition-opacity duration-700 ease-out",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Loading state — a calm tonal block, never a shimmering skeleton */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-bone-deep transition-opacity duration-700",
            loaded ? "opacity-0" : "opacity-100",
          )}
        />
        {children}
      </figure>
    );
  }

  if (src && type === "video") {
    return (
      <figure className={frame}>
        {/*
          Decorative footage autoplays muted and loops. When the visitor has
          asked for reduced motion we stop autoplaying and expose controls so
          the video is still reachable, just not moving unbidden.
        */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={!reduced}
          controls={!!reduced}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={alt}
        >
          <source src={src} type={videoMimeType(src)} />
        </video>
        {children}
      </figure>
    );
  }

  if (src && type === "embed") {
    return (
      <figure className={frame}>
        <iframe
          src={src}
          title={alt}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
        {children}
      </figure>
    );
  }

  return (
    <figure className={frame} role="img" aria-label={`Placeholder: ${alt}`}>
      <PlaceholderSurface label={label} note={note} position={labelPosition} />
      {children}
    </figure>
  );
}

function PlaceholderSurface({
  label,
  note,
  position,
}: {
  label: string;
  note?: string;
  position: "center" | "corner";
}) {
  return (
    <div aria-hidden className="absolute inset-0">
      {/* Fine technical grid — reads as a spec sheet, not a decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-rule) 1px, transparent 1px), linear-gradient(to bottom, var(--color-rule) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Corner registration marks */}
      <Corner className="left-3 top-3 border-l border-t" />
      <Corner className="right-3 top-3 border-r border-t" />
      <Corner className="bottom-3 left-3 border-b border-l" />
      <Corner className="bottom-3 right-3 border-b border-r" />

      <div
        className={cn(
          "absolute flex flex-col px-6",
          position === "center"
            ? "inset-0 items-center justify-center text-center"
            : "bottom-5 left-5 items-start text-left",
        )}
      >
        <span className="eyebrow text-navy-600">[ {label} ]</span>
        {note ? (
          <span className="mt-2 max-w-[34ch] text-xs leading-relaxed text-faint">
            {note}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      className={cn("absolute h-5 w-5 border-navy-300/60", className)}
      aria-hidden
    />
  );
}
