import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

// The site's container: 1px dashed border, 12px radius, no background. Dashed = "holds things".
export function DashedCard({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cx("rounded-lg border border-dashed border-line", className)} {...rest}>
      {children}
    </div>
  );
}
