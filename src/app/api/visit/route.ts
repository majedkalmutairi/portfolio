import { addVisitor, visitorHash } from "@/lib/visitors";

const AUTOMATED = /bot|crawl|spider|headless|lighthouse|preview|fetch/i;

export async function POST(request: Request) {
  const agent = request.headers.get("user-agent") ?? "";
  if (!agent || AUTOMATED.test(agent)) return new Response(null, { status: 204 });

  await addVisitor(await visitorHash(request)).catch(() => false);
  return new Response(null, { status: 204 });
}
