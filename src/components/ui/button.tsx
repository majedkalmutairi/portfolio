import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cx } from "@/lib/cx";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  arrow?: "chevron" | "external" | "none";
  size?: "md" | "sm";
  variant?: "solid" | "outline" | "text";
  className?: string;
} & Omit<ComponentProps<"button">, "children" | "className">;

const SIZE = {
  md: "h-12 gap-2 px-6 text-base",
  sm: "h-10 gap-1.5 px-5 text-sm",
};

const VARIANT = {
  solid: "rounded-md bg-solid font-medium text-on-solid transition-opacity duration-150 hover:opacity-90",
  outline:
    "rounded-md border border-line-strong font-medium text-fg transition-colors duration-150 hover:bg-hover",
  text: "h-auto gap-1 px-0 text-body-lg text-fg-secondary transition-colors duration-150 hover:text-fg",
};

export function Button({
  children,
  href,
  arrow = "chevron",
  size = "sm",
  variant = "solid",
  className,
  ...rest
}: ButtonProps) {
  const classes = cx("group inline-flex items-center", SIZE[size], VARIANT[variant], className);
  const inner = (
    <>
      {children}
      {arrow === "chevron" ? (
        <ChevronRight
          className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
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
