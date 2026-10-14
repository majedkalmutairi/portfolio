import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.headline.primary}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#121212",
        color: "#f5f5f5",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 80, fontWeight: 600, letterSpacing: -2 }}>{site.name}</div>
        <div style={{ display: "flex", fontSize: 40, letterSpacing: -1 }}>
          <span>{site.headline.primary}</span>
          <span style={{ color: "#a3a3a3" }}>&nbsp;— {site.headline.secondary}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28 }}>
        <div style={{ fontWeight: 700, letterSpacing: 4 }}>{site.mark}</div>
        <div style={{ color: "#a3a3a3" }}>{site.email}</div>
      </div>
    </div>,
    size,
  );
}
