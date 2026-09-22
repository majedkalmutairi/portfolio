import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cx } from "@/lib/cx";

type ButtonProps = {
  children: ReactNode;
  /** Where it goes. External links (http…, mailto:) open in a new tab. */
  href?: string;
  /** `chevron` = "›" (go somewhere on this site) · `external` = "↗" (leaves the site) · `none`. */
  arrow?: "chevron" | "external" | "none";
  className?: string;
} & Omit<ComponentProps<"button">, "children" | "className">;

// Solid pill button: black on light, white on dark. 16px / 500. The one "heavy" element.
export function Button({ children, href, arrow = "chevron", className, ...rest }: ButtonProps) {
  const classes = cx(
    "group inline-flex h-12 items-center gap-2 rounded-lg bg-solid px-6 text-base font-medium text-on-solid",
    "transition-opacity duration-150 hover:opacity-90",
    className,
  );
  const inner = (
    <>
      {children}
      {arrow === "chevron" ? (
        <ChevronRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
      ) : null}
      {arrow === "external" ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:)/.test(href);
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
