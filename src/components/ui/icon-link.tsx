import type { CSSProperties } from "react";
import { Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import { BrandIcon, LinkedInIcon } from "@/components/ui/icon";
import { cx } from "@/lib/cx";

type Kind = "github" | "linkedin" | "email";

// Each brand's own published colour. GitHub's is near-black, so it flips to white in dark mode.
const BRAND: Record<Kind, { light: string; dark: string; label: string }> = {
  github: { light: "#181717", dark: "#ffffff", label: "GitHub" },
  linkedin: { light: "#0A66C2", dark: "#0A66C2", label: "LinkedIn" },
  email: { light: "#EA4335", dark: "#EA4335", label: "Email" },
};

type IconLinkProps = {
  kind: Kind;
  href: string;
  className?: string;
};

// The three links under the name. Gray at rest; on hover or keyboard focus the icon takes
// its brand colour and lifts 2px. This is the one place colour is allowed that isn't a logo
// itself — because it *is* the logo's colour. Tailwind's `hover:` only fires on devices
// that can hover, so a tap on a phone never leaves the colour stuck on.
export function IconLink({ kind, href, className }: IconLinkProps) {
  const brand = BRAND[kind];
  const style = { "--brand": brand.light, "--brand-dark": brand.dark } as CSSProperties;
  const external = kind !== "email";

  return (
    <a
      href={href}
      aria-label={brand.label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={style}
      className={cx(
        "inline-flex size-8 items-center justify-center rounded-md text-fg-secondary",
        "transition-[color,translate] duration-150 ease-out",
        "hover:-translate-y-0.5 hover:text-(--brand) dark:hover:text-(--brand-dark)",
        "focus-visible:-translate-y-0.5 focus-visible:text-(--brand) dark:focus-visible:text-(--brand-dark)",
        className,
      )}
    >
      {kind === "github" ? <BrandIcon icon={siGithub} className="size-5" /> : null}
      {kind === "linkedin" ? <LinkedInIcon className="size-5" /> : null}
      {kind === "email" ? <Mail className="size-5" strokeWidth={1.75} aria-hidden="true" /> : null}
    </a>
  );
}
