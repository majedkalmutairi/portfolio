import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

export function Container({ className, ...rest }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-3xl px-4 sm:px-6", className)} {...rest} />;
}
