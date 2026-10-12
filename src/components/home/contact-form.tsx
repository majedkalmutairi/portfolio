"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { LIMITS, validateContact } from "@/lib/contact";
import { cx } from "@/lib/cx";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const field =
  "w-full rounded-md border border-line bg-transparent px-3 py-2.5 text-body text-fg " +
  "transition-colors duration-150 focus:border-fg-secondary";

export function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const check = validateContact(data);
    if (!check.ok) {
      setState({ kind: "error", message: check.error });
      return;
    }

    setState({ kind: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "");
      form.reset();
      setState({ kind: "sent" });
    } catch (error) {
      const reason =
        error instanceof Error && error.message ? error.message : "The message couldn't be sent.";
      setState({ kind: "error", message: `${reason} You can also write to ${email}.` });
    }
  }

  const sending = state.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="text-body font-medium text-fg">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          maxLength={LIMITS.name}
          autoComplete="name"
          className={field}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="text-body font-medium text-fg">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={LIMITS.email}
          autoComplete="email"
          className={field}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-body font-medium text-fg">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={LIMITS.message}
          className={cx(field, "resize-y")}
        />
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-1">
        <Button type="submit" disabled={sending} className="disabled:opacity-60">
          {sending ? "Sending…" : "Send"}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={cx("text-body", state.kind === "error" ? "text-fg" : "text-fg-secondary")}
        >
          {state.kind === "sent" ? "Message sent." : null}
          {state.kind === "error" ? state.message : null}
        </p>
      </div>
    </form>
  );
}
