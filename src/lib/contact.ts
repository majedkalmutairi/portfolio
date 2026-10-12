export const LIMITS = { name: 100, email: 200, message: 5000 } as const;

export type ContactInput = { name: string; email: string; message: string };

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(
  raw: unknown,
): { ok: true; value: ContactInput } | { ok: false; error: string } {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email || !message)
    return { ok: false, error: "Please fill in your name, email and message." };
  if (name.length > LIMITS.name) return { ok: false, error: "That name is too long." };
  if (email.length > LIMITS.email || !EMAIL_SHAPE.test(email))
    return { ok: false, error: "That email address doesn't look right." };
  if (message.length > LIMITS.message) return { ok: false, error: "That message is too long." };
  return { ok: true, value: { name, email, message } };
}
