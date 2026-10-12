import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type TimelineRowProps = {
  date: string;
  children: ReactNode;
  className?: string;
};

export function TimelineRow({ date, children, className }: TimelineRowProps) {
  return (
    <div className={cx("grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6", className)}>
      <p className="text-body text-fg-muted sm:pt-0.5">{date}</p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function TimelineTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold tracking-tight text-fg">{children}</h3>;
}

export function TimelineSubtitle({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-base font-medium text-fg-secondary">{children}</p>;
}

export function TimelineDetail({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-body text-fg-muted">{children}</p>;
}
