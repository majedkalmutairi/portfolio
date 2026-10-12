import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

type MicroLabelProps = ComponentProps<"span"> & {
  mono?: boolean;
};

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
