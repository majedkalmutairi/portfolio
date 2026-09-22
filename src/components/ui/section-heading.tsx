import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  children: string;
  /** Optional right-aligned link, e.g. { href: "/work", label: "View all" }. */
  link?: { href: string; label: string };
  className?: string;
  id?: string;
};

// 34px light heading with tight tracking; an optional small link sits on the same baseline.
export function SectionHeading({ children, link, className, id }: SectionHeadingProps) {
  return (
    <div className={cx("flex items-baseline justify-between gap-6", className)}>
      <h2 id={id} className="text-section text-fg">
        {children}
      </h2>
      {link ? (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1 text-body text-fg-muted transition-colors duration-150 hover:text-fg"
        >
          {link.label}
          <ChevronRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
