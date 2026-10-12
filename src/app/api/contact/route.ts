import { site } from "@/content/site";
import { validateContact } from "@/lib/contact";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  times.push(now);
  recent.set(ip, times);
  return times.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (body && typeof body === "object" && "company" in body && String(body.company).trim() !== "") {
    return Response.json({ ok: true });
  }

  const check = validateContact(body);
  if (!check.ok) return Response.json({ error: check.error }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip))
    return Response.json({ error: "Too many messages — please try again later." }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "The form isn't connected yet." }, { status: 503 });

  const { name, email, message } = check.value;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio contact form <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  });

  if (!response.ok) {
    console.error("Resend refused the message:", response.status, await response.text().catch(() => ""));
    return Response.json({ error: "The message couldn't be sent." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
