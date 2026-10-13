import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Container } from "@/components/layout/container";
import { navLinks, site } from "@/content/site";

export function Nav() {
  return (
    <header data-intro-fade="" className="sticky top-0 z-40 border-b border-line bg-bg">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="text-sm font-bold text-fg transition-colors duration-150 hover:text-fg-secondary"
        >
          {site.mark}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-2 min-[360px]:gap-3 sm:gap-5">
          <ul className="flex items-center gap-2.5 min-[360px]:gap-3 sm:gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] whitespace-nowrap text-fg-muted transition-colors duration-150 min-[360px]:text-body hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="h-5 w-px bg-line" aria-hidden="true" />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
