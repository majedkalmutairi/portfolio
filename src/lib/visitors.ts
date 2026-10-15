import { site } from "@/content/site";

const KEY = "visitors";

function redis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function roundVisitors(n: number): number | null {
  if (n < site.counter.showFrom) return null;
  if (n < 100) return Math.floor(n / 10) * 10;
  if (n < 1000) return Math.floor(n / 50) * 50;
  return Math.floor(n / 100) * 100;
}

export async function visitorHash(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const agent = request.headers.get("user-agent") ?? "";
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.VISIT_SALT ?? "";
  const bytes = new TextEncoder().encode([ip, agent, day, salt].join("|"));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function addVisitor(hash: string) {
  const db = redis();
  if (!db) return false;
  const response = await fetch(`${db.url}/pfadd/${KEY}/${hash}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${db.token}` },
    cache: "no-store",
  });
  return response.ok;
}

export async function visitorCount(): Promise<number | null> {
  const db = redis();
  if (!db) return null;
  try {
    const response = await fetch(`${db.url}/pfcount/${KEY}`, {
      headers: { Authorization: `Bearer ${db.token}` },
      next: { revalidate: 3600 },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { result?: unknown };
    const counted = typeof data.result === "number" ? data.result : 0;
    return site.counter.seed + counted;
  } catch {
    return null;
  }
}
