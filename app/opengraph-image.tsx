import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated Open Graph card — keeps social previews on-brand without a binary
 * asset. Replace this route with a static image when photography is ready.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 44,
              height: 44,
              border: "3px solid #0b1b28",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "#0b1b28",
            }}
          >
            {site.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#125b9e",
              marginBottom: 28,
            }}
          >
            Cargo Consolidation &amp; Global Logistics
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0b1b28",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Moving Cargo.</span>
            <span style={{ color: "#1b3c58" }}>Connecting Business.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid #e4e4e0",
            paddingTop: 28,
            fontSize: 22,
            color: "#5f6874",
          }}
        >
          Ocean · Air · Project Cargo · Customs · Multimodal
        </div>
      </div>
    ),
    size,
  );
}
