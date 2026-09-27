import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

// The page's one column: 768px wide at most, centred, 16px side padding on phones, 24px above.
// A reading width, not a landing-page width — most of why the site feels calm.
export function Container({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-3xl px-4 sm:px-6", className)} {...rest} />;
}
