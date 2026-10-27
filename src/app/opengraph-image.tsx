import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card in the site's paper-white style. */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px 112px",
        background: "#ffffff",
        color: "#262626",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 30, color: "#737373", marginBottom: 32 }}>
        {site.name}
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: 960,
        }}
      >
        Small web apps, open source libraries and research.
      </div>
      <div style={{ fontSize: 28, color: "#737373", marginTop: 48 }}>
        {"Independent software from Berlin"}
      </div>
    </div>,
    size,
  );
}
