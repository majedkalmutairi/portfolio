import type { SVGProps } from "react";
import type { SimpleIcon } from "simple-icons";
import { cx } from "@/lib/cx";

// Interface glyphs come from lucide-react directly (e.g. `import { Sun } from "lucide-react"`).
// Logos come through this file as inline SVG so nothing is fetched from a CDN.

type BrandIconProps = SVGProps<SVGSVGElement> & {
  /** A Simple Icons entry, e.g. `siArduino`. */
  icon: SimpleIcon;
  title?: string;
};

// Renders a Simple Icons logo. Colour follows `currentColor` unless overridden with a class.
export function BrandIcon({ icon, title, className, ...rest }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cx("size-4 shrink-0", className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={icon.path} />
    </svg>
  );
}

// LinkedIn is no longer distributed by Simple Icons (trademark request), so its mark is
// drawn here by hand: a rounded square, the dot, the "i" stem and the "n".
export function LinkedInIcon({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cx("size-4 shrink-0", className)}
      {...rest}
    >
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3v9ZM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75ZM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66Z" />
    </svg>
  );
}
