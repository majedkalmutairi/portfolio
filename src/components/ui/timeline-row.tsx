import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type TimelineRowProps = {
  /** Left column, e.g. "2024 — Present". */
  date: string;
  /** Right column: title line, then whatever else. */
  children: ReactNode;
  className?: string;
};

// Two-column typographic timeline: muted date left (~11rem), content right. No lines, no dots.
// Below 640px the date stacks above the content.
export function TimelineRow({ date, children, className }: TimelineRowProps) {
  return (
    <div className={cx("grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6", className)}>
      <p className="text-body text-fg-muted sm:pt-0.5">{date}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

// The title line inside a TimelineRow: 18px semibold.
export function TimelineTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold tracking-tight text-fg">{children}</h3>;
}

// The line under the title: 16px medium (organisation, degree).
export function TimelineSubtitle({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-base font-medium text-fg-secondary">{children}</p>;
}

// A muted detail line (location, note).
export function TimelineDetail({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-body text-fg-muted">{children}</p>;
}
