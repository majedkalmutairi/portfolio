import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = `Project — ${site.shortName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

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
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#8a8a8a" }}>PROJECT</div>
        <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -2, lineHeight: 1.1 }}>
          {project?.name ?? site.shortName}
        </div>
        {project?.hook ? (
          <div style={{ fontSize: 32, color: "#a3a3a3", lineHeight: 1.4, maxWidth: 1000 }}>
            {project.hook}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28 }}>
        <div style={{ fontWeight: 700, letterSpacing: 4 }}>{site.mark}</div>
        <div style={{ color: "#a3a3a3" }}>{site.shortName}</div>
      </div>
    </div>,
    size,
  );
}
