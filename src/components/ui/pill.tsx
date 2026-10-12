import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type PillProps = {
  label: string;
  variant?: "dashed" | "solid";
  icon?: ReactNode;
  className?: string;
};

export function Pill({ label, variant = "solid", icon, className }: PillProps) {
  return (
    <span
      className={cx(
        "inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 align-middle text-xs font-medium text-fg",
        variant === "dashed" ? "border-dashed border-line-strong" : "border-line bg-surface",
        className,
      )}
    >
      {icon ? <span className="inline-flex shrink-0 [&>svg]:size-3.5">{icon}</span> : null}
      {label}
    </span>
  );
}
