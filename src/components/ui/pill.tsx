import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type PillProps = {
  /** The text inside the chip. */
  label: string;
  /** `dashed` for a chip inside a sentence (the hero bio); `solid` for a tag under a title. */
  variant?: "dashed" | "solid";
  /** Optional logo or glyph shown before the label. */
  icon?: ReactNode;
  className?: string;
};

// 12px / 500 chip. Dashed border = sits inside prose; solid border = a tag.
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
