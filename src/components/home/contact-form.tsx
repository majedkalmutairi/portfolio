"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { LIMITS, validateContact } from "@/lib/contact";
import { cx } from "@/lib/cx";

type Field = "name" | "email" | "message";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; fields: Field[] };

const FIELDS: Field[] = ["name", "email", "message"];

const SAMPLE = { name: "a", email: "a@b.co", message: "a" };

const label = "block text-body text-fg-secondary";

const field =
  "mt-1.5 block w-full rounded-md border border-line-strong bg-transparent px-3 py-2.5 text-base text-fg sm:text-body " +
  "transition-colors duration-150 hover:bg-hover focus-visible:border-fg-secondary aria-invalid:border-fg";

function invalidFields(data: Record<string, FormDataEntryValue>) {
  return FIELDS.filter((key) => !validateContact({ ...SAMPLE, [key]: data[key] }).ok);
}

export function ContactForm({ email }: { email: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === "sending") return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const check = validateContact(data);
    if (!check.ok) {
      const fields = invalidFields(data);
      setState({ kind: "error", message: check.error, fields });
      const first = fields[0] ? form.elements.namedItem(fields[0]) : null;
      if (first instanceof HTMLElement) first.focus();
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
      setState({ kind: "error", message: `${reason} You can also write to ${email}.`, fields: [] });
    }
  }

  function onInput(event: FormEvent<HTMLFormElement>) {
    if (state.kind !== "error" || state.fields.length === 0) return;
    const fields = invalidFields(Object.fromEntries(new FormData(event.currentTarget)));
    if (fields.length === state.fields.length) return;
    setState(fields.length ? { ...state, fields } : { kind: "idle" });
  }

  const sending = state.kind === "sending";
  const speaking = state.kind === "sent" || state.kind === "error";
  const aria = (key: Field) =>
    state.kind === "error" && state.fields.includes(key)
      ? { "aria-invalid": true as const, "aria-describedby": "contact-status" }
      : {};

  return (
    <form onSubmit={onSubmit} onInput={onInput} noValidate aria-busy={sending} className="relative">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            readOnly={sending}
            className={field}
            {...aria("name")}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            readOnly={sending}
            className={field}
            {...aria("email")}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={label}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={3}
            maxLength={LIMITS.message}
            readOnly={sending}
            className={cx(field, "resize-none")}
            {...aria("message")}
          />
        </div>
      </div>

      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <p
          id="contact-status"
          role="status"
          aria-live="polite"
          className={cx(
            "min-w-0 flex-1 text-body text-pretty",
            speaking && "basis-full sm:basis-0",
            state.kind === "error" ? "text-fg" : "text-fg-secondary",
          )}
        >
          {state.kind === "sent" ? "Message sent." : null}
          {state.kind === "error" ? state.message : null}
        </p>
        <Button
          type="submit"
          disabled={sending}
          className="ml-auto shrink-0 justify-center disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send"}
        </Button>
      </div>
    </form>
  );
}
