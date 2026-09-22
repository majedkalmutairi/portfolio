import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

type MicroLabelProps = ComponentProps<"span"> & {
  /** Mono variant: used for link labels like "VISIT SITE ↗". Lighter weight, tighter tracking. */
  mono?: boolean;
};

// 11px uppercase tracked label. Bold + wide tracking by default; the mono variant is 400 weight.
export function MicroLabel({ mono = false, className, children, ...rest }: MicroLabelProps) {
  return (
    <span
      className={cx(
        "text-micro uppercase text-fg-secondary",
        mono && "font-mono font-normal tracking-mono-label",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
