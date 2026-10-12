import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

export function DashedCard({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cx("rounded-lg border border-dashed border-line", className)} {...rest}>
      {children}
    </div>
  );
}
